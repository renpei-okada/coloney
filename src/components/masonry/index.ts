import { fromEvent, Subject, timer } from "rxjs";
import { delay, map, switchMap, timeout } from "rxjs/operators";

interface Option {
    t: undefined;
}

class Rect {
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    get top() {
        return this.y;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    constructor(x: number, y: number, width: number, height: number, readonly element?: HTMLElement) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Determines whether or not this rectangle wholly encloses another rectangle or point.
     * @param {Rect} rect
     * @returns {Boolean}
    **/
    contains(rect: Rect) {
        // points don't have width or height
        const otherWidth = rect.width || 0;
        const otherHeight = rect.height || 0;
        return this.x <= rect.x &&
            this.y <= rect.y &&
            this.x + this.width >= rect.x + otherWidth &&
            this.y + this.height >= rect.y + otherHeight;
    }

    /**
     * Determines whether or not the rectangle intersects with another.
    **/
    overlaps(rect: Rect): boolean {
        return this.x < rect.right &&
            this.right > rect.x &&
            this.y < rect.bottom &&
            this.bottom > rect.y;
    }

    getMaximalFreeRects(rect: Rect) {
        // if no intersection, return false
        if (!this.overlaps(rect)) {
            return [this];
        }

        const freeRects = [];

        const thisRight = this.x + this.width;
        const thisBottom = this.y + this.height;
        const rectRight = rect.x + rect.width;
        const rectBottom = rect.y + rect.height;

        // top
        if (this.y < rect.y) {
            freeRects.push(new Rect(
                this.x,
                this.y,
                this.width,
                rect.y - this.y
            ));
        }

        // right
        if (thisRight > rectRight) {
            freeRects.push(new Rect(
                rectRight,
                this.y,
                thisRight - rectRight,
                this.height
            ));
        }

        // bottom
        if (thisBottom > rectBottom) {
            freeRects.push(new Rect(
                this.x,
                rectBottom,
                this.width,
                thisBottom - rectBottom
            ));
        }

        // left
        if (this.x < rect.x) {
            freeRects.push(new Rect(
                this.x,
                this.y,
                rect.x - this.x,
                this.height
            ));
        }

        return freeRects;
    }

    translate(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }

    location(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    canFit(rect: Rect) {
        return this.width >= rect.width && this.height >= rect.height;
    }

    merge(rect: Rect) {
        return new Rect(
            Math.min(rect.x, this.x),
            Math.min(rect.y, this.y),
            Math.max(this.right, rect.right) - Math.min(rect.x, this.x),
            Math.max(this.bottom, rect.bottom) - Math.min(rect.y, this.y)
        );
    }

    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}

let _ = 0;

/**
 * Packer
 * bin-packing algorithm
 */
class Packer {
    spaces: Rect[] = [];
    width = 0;
    height = 0;
    rects: Rect[] = [];
    shiftTargetPoints: { x: number; y: number; }[] = [];
    shiftTargetPointKeys: string[] = [];

    /**
     * @param {Number} width
     * @param {Number} height
     * @param {String} sortDirection
     *   topLeft for vertical, leftTop for horizontal
     */
    constructor(width: number, height: number, readonly segmentLength = 60) {
        this.width = width;
        this.height = height;
        this.reset();
        this.updateShiftTargetsWithGrid(this.segmentLength);
    }

    reset() {
        this.spaces = [
            new Rect(
                0,
                0,
                this.width,
                this.height
            )
        ];
    }

    append(rect: Rect) {
        this.rects.push(rect);
        this.pack(rect);
    }

    // change x and y of rect to fit with in Packer"s available spaces
    pack(rect: Rect) {
        for (const space of this.spaces) {
            if (space.canFit(rect)) {
                rect.x = space.x;
                rect.y = space.y;
                this.updateSpacesWithPlaced(rect);
                return;
            }
        }
    }

    // update spaces with placed rect
    updateSpacesWithPlaced(rect: Rect) {
        // update spaces
        const revisedSpaces: Rect[] = [];
        for (const space of this.spaces) {
            space.getMaximalFreeRects(rect).forEach(x => revisedSpaces.push(x));
        }

        this.spaces = revisedSpaces;
        this.mergeAndSortSpaces();
    }

    mergeAndSortSpaces() {
        // remove redundant spaces
        const rects = this.spaces;
        let i = 0;
        let rect = rects[i];
        /// let ccc = 0;
        // eslint-disable-next-line no-labels
        rectLoop:
        while (rect) {
            let j = 0;
            let compareRect = rects[i + j];

            while (compareRect) {
                if (compareRect === rect) {
                    j++; // next
                }
                else if (compareRect.contains(rect)) {
                    // remove rect
                    rects.splice(i, 1);
                    rect = rects[i]; // set next rect
                    // eslint-disable-next-line no-labels
                    continue rectLoop; // bail on compareLoop
                }
                else if (rect.contains(compareRect)) {
                    // remove compareRect
                    rects.splice(i + j, 1);
                }
                else {
                    j++;
                }
                _++;
                compareRect = rects[i + j]; // set next compareRect
            }
            i++;
            rect = rects[i];
        }

        this.spaces.sort((a, b) => a.y - b.y || a.x - b.x);
    }

    // add a space back
    addSpace(rect: Rect) {
        // 引き延ばせるのなら引き延ばして
        this.spaces.push(rect);
        this.mergeAndSortSpaces();
    }

    public updateShiftTargetPoints(rect: Rect, isForce = false) {
        this.shiftTargetPoints = [];
        this.shiftTargetPointKeys = [];

        const addShiftTarget = (x: number, y: number, boundsSize: number) => {
            if (x !== 0 && x > boundsSize) {
                return;
            }
            // create string for a key, easier to keep track of what targets
            const key = x + "," + y;
            const hasKey = this.shiftTargetPointKeys.indexOf(key) !== -1;
            if (hasKey) {
                return;
            }
            this.shiftTargetPointKeys.push(key);
            this.shiftTargetPoints.push({ x, y });
        };

        this.reset();
        const columnPack = (r: Rect) => {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < this.spaces.length; i++) {
                const space = this.spaces[i];
                const canFitInSpaceColumn = space.x <= r.x &&
                    space.right >= r.right &&
                    space.height >= (r.height - 0.01); // fudge number for rounding error
                if (canFitInSpaceColumn) {
                    r.y = space.y;
                    this.updateSpacesWithPlaced(r);
                    break;
                }
                _++;
            }
        };

        const segment = this.segmentLength;
        const segmentSpan = Math.ceil(rect.width / segment);
        const segs = Math.floor((this.width) / segment);
        const boundsSize = (segs - segmentSpan) * segment;
        // add targets on top
        for (let i = 0; i < segs; i++) {
            addShiftTarget(i * segment, 0, boundsSize);
            _++;
        }

        if (!isForce) this.updateSpacesWithPlaced(rect);

        this.sortItems();

        for (const r of this.rects) {
            if (r === rect && !isForce) {
                continue;
            }
            columnPack(r);
            addShiftTarget(r.x, r.y, boundsSize);
            // add bottom left / top right corner
            const cornerX = r.x;
            const cornerY = r.bottom;
            addShiftTarget(cornerX, cornerY, boundsSize);

            // add targets for each column on bottom / row on right
            const segSpan = Math.round(r.width / segment);
            for (let i = 1; i < segSpan; i++) {
                const segX = r.x + segment * i;
                const segY = cornerY;
                addShiftTarget(segX, segY, boundsSize);
            }
        }
    }

    sortItems() {
        _ += this.rects.length;
        return this.rects.sort((a, b) => a.y - b.y || a.x - b.x);
    }

    public relayout() {
        this.reset();
        for (const item of this.sortItems()) {
            this.pack(item);
        }
    }

    alignColumn(r: Rect) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.spaces.length; i++) {
            const space = this.spaces[i];
            const canFitInSpaceColumn = space.x <= r.x &&
                space.right >= r.right &&
                space.height >= (r.height - 0.01); // fudge number for rounding error
            _++;
            if (canFitInSpaceColumn) {
                r.y = space.y;
                this.updateSpacesWithPlaced(r);
                break;
            }
        }
    }

    alignments(ignore?: Rect) {
        this.reset();

        if (ignore) {
            this.updateSpacesWithPlaced(ignore);
        }

        for (const r of this.sortItems()) {
            if (r === ignore) {
                continue;
            }
            _++;
            this.alignColumn(r);
        }
    }

    updateShiftTargetsWithGrid(segmentHeight: number) {
        this.shiftTargetPoints = [];

        const segment = this.segmentLength;
        const segs = Math.floor((this.width) / segment);
        // add targets on top
        for (let j = 0; j < this.height / segmentHeight; j++) {
            for (let i = 0; i < segs; i++) {
                this.shiftTargetPoints.push({ x: i * segment, y: j * segmentHeight });
                _++;
            }
        }
    }

    shift(fromRect: Rect, x: number, y: number) {
        const getDistance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        let shiftPosition: { x: number; y: number } = { x: 0, y: 0 };
        let minDistance = Infinity;

        for (const target of this.shiftTargetPoints) {
            const distance = getDistance(target.x, target.y, x, y);
            if (distance < minDistance) {
                shiftPosition = target;
                minDistance = distance;
            }
            _++;
        }

        fromRect.location(shiftPosition.x, shiftPosition.y);

        debugDrawPoint(shiftPosition.x, shiftPosition.y);
    }

    push(fromRect: Rect, _x: number, _y: number) {
        // console.log(_x, _y);

        // this.updateShiftTargetPoints(fromRect);
        // this.updateSpacesWithPlaced(fromRect);

        // debugDrawPoints(this.shiftTargetPoints);
        const updateSpaces = () => {
            const p = new Packer(this.width, this.height);
            for (const rect of this.rects) {
                if (rect === fromRect) {
                    continue;
                }
                _++;
                p.updateSpacesWithPlaced(rect);
            }

            this.spaces = p.spaces;
        };

        _ = 0;
        this.shift(fromRect, _x, _y);
        this.alignments(fromRect);
        // this.alignments();
        updateSpaces();
        this.alignColumn(fromRect);
        console.log(_);
    }
}

function debugDrawPoints(targets: { x: number, y: number }[]) {
    // draw points
    for (const point of document.querySelectorAll(".point") || []) {
        point.remove();
    }
    const parent = document.querySelector(".grid");
    for (const t of targets) {
        const div = document.createElement("div");
        parent!.appendChild(div);
        div.classList.add("point");
        div.style.position = "absolute";
        div.style.left = t.x + "px";
        div.style.top = t.y + "px";
        div.style.width = "8px";
        div.style.height = "8px";
        div.style.background = "red";
        div.style.zIndex = "2147483646";
    }
}

function debugDrawPoint(x: number, y: number) {
    for (const point of document.querySelectorAll(".point2") || []) {
        point.remove();
    }
    const parent = document.querySelector(".grid");
    const div = document.createElement("div");
    parent!.appendChild(div);
    div.classList.add("point2");
    div.style.position = "absolute";
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.width = "8px";
    div.style.height = "8px";
    div.style.background = "green";
    div.style.zIndex = "2147483647";
}

export class Masonry {
    packer: Packer;
    options = {
        draggingStyle: {
            boxShadow: "0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)"
        }
    };

    constructor(
        readonly element: HTMLElement,
        readonly children: HTMLElement[],
        options?: Option) {
        this.options = { ...this.options, ...options };
        this.packer = new Packer(1800, 15000, 80);
        this.init();
        this.draw();

        element.style.userSelect = "none";

        let rect: Rect | undefined;
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        const preview = element.appendChild(document.createElement("div")) as HTMLElement;
        preview.style.position = "absolute";
        preview.style.outline = "4px dashed rgba(127,127,127,0.5)";
        preview.style.transition = "all 0.5s";
        const previewBorderSize = 4;
        const drawPreview = (rect: Rect) => {
            preview.style.display = "block";
            preview.style.top = rect.y + previewBorderSize + "px";
            preview.style.left = rect.x + previewBorderSize + "px";
            preview.style.width = rect.width - previewBorderSize * 2 + "px";
            preview.style.height = rect.height - previewBorderSize * 2 + "px";

            return () => {
                preview.style.display = "none";
            };
        };

        let hidePreview = () => { };
        let endDrag = () => { };
        for (const item of children) {
            item.addEventListener("mousedown", e => {
                rect = this.findRectFromElement(item);
                // refrect data
                const _shadow = item.style.boxShadow;
                const _zIndex = item.style.zIndex;
                const _rect = rect;

                item.style.position = "fixed";
                item.style.transition = "all 0s";
                item.style.zIndex = "999999999";
                item.style.boxShadow = this.options.draggingStyle.boxShadow;

                const targetRect = item.getBoundingClientRect();
                const x = e.clientX - (targetRect.left);
                const y = e.clientY - (targetRect.top);
                dragOffsetX = x;
                dragOffsetY = y;

                item.style.left = e.clientX - x + "px";
                item.style.top = (e.clientY - (e.pageY - targetRect.top)) + "px";

                // this.packer.alignments();

                hidePreview = drawPreview(rect);
                endDrag = () => {
                    item.style.boxShadow = _shadow;
                    item.style.zIndex = _zIndex;
                    item.style.top = _rect.y + "px";
                    item.style.left = _rect.x + "px";
                    item.style.position = "absolute";
                    setTimeout(() => {
                        item.style.transition = "all 0.5s";
                    }, 0);
                };
            });
            item.style.userSelect = "none";
        }

        const DRAG_THROTTLE_TIME = 200;
        let _itemDragTime: any;
        let dragTimeout = 0;
        window.addEventListener("mousemove", (e: MouseEvent) => {
            if (rect) {
                const targetRect = element.getBoundingClientRect();
                const x = e.pageX + targetRect.left - dragOffsetX;
                const y = e.pageY + targetRect.top - dragOffsetY;

                this.draw();

                if (rect.element) {
                    rect.element.style.background = "green";
                    rect.element.style.top = e.clientY - dragOffsetY + "px";
                    rect.element.style.left = e.clientX - dragOffsetX + "px";
                }

                const handle = (rect: Rect) => {
                    this.packer.push(rect, x, y);
                    hidePreview = drawPreview(rect);
                };
                const now = new Date() as any;
                const isThrottled = _itemDragTime && (now - _itemDragTime) < DRAG_THROTTLE_TIME;
                if (isThrottled) {
                    clearTimeout(dragTimeout);
                    dragTimeout = setTimeout(() => rect && handle(rect), DRAG_THROTTLE_TIME);
                }
                else {
                    handle(rect);
                    _itemDragTime = now;
                }
            }
        });

        window.addEventListener("mouseup", e => {
            endDrag();
            clearTimeout(dragTimeout);

            if (rect) {
                const x = e.pageX + rect.left - dragOffsetX;
                const y = e.pageY + rect.top - dragOffsetY;

                // this.packer.alignments();
            }
            this.draw();

            hidePreview();
            rect = undefined;
        });
    }

    test() {
        for (const rect of this.packer.rects) {
            const el = rect.element;
            if (el) {
                const size = el.getBoundingClientRect();
                rect.width = size.width;
                rect.height = size.height;
            }
        }

        this.packer.relayout();
        this.draw();
    }

    draw() {
        this.packer.rects.forEach(r => {
            const el = r.element;
            if (!el) return;
            el.style.position = "absolute";
            el.style.left = r.x + "px";
            el.style.top = r.y + "px";
            el.style.opacity = "1";
        });

        // debug
        this.element.querySelectorAll(".debug-item").forEach(x => x.remove());
        this.packer.spaces.forEach(x => {
            const div = document.createElement("div");
            this.element.appendChild(div);
            div.style.position = "absolute";
            div.style.top = x.y + "px";
            div.style.left = x.x + "px";
            div.style.width = x.width + "px";
            div.style.height = x.height + "px";
            div.style.opacity = "1";
            div.style.background = "rgba(255,0,0,0.1)";
            div.classList.add("debug-item");
        });
    }

    public add(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const r = new Rect(rect.x, rect.y, rect.width, rect.height, element);
        this.packer.append(r);
    }

    init() {
        this.packer.reset();
        for (const el of this.children) {
            const rect = el.getBoundingClientRect();
            const r = new Rect(rect.x, rect.y, rect.width, rect.height, el);
            this.packer.append(r);
        }
    }

    findRectFromElement(element: HTMLElement) {
        return this.packer.rects.filter(e => e.element === element)[0];
    }
}

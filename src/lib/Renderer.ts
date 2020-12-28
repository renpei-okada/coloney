import { IRenderer } from "./IRenderer";
import { Color } from "./Color";
import { Vector2D } from "./core/Vector2D";

export class Renderer implements IRenderer {
    public width: number;
    public height: number;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
    }

    public drawCircle(x: number, y: number, r: number, color: Color): void {
        const context = this.context;
        context.fillStyle = color.rgba;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    public drawStrokeCircle(x: number, y: number, r: number, lineWidth: number, color: Color): void {
        const context = this.context;
        context.strokeStyle = color.rgba;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, width: number, color: Color) {
        const context = this.context;
        context.strokeStyle = color.rgba;
        context.beginPath();
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
    }

    public pushMatrix() {
        this.context.save();
    }

    public popMatrix() {
        this.context.restore();
    }

    public translate(x: number, y: number) {
        this.context.translate(x, y);
    }

    public beginPath() {
        this.context.beginPath();
    }

    public closePathFill(color: Color) {
        this.context.closePath();
        this.context.fillStyle = color.rgba;
        this.context.fill();
    }

    public closePathStroke(color: Color) {
        this.context.closePath();
        this.context.strokeStyle = color.rgba;
        this.context.stroke();
    }

    public rotate(angle: number) {
        this.context.rotate(angle);
    }

    public lineTo(x: number, y: number) {
        this.context.lineTo(x, y);
    }

    public moveTo(x: number, y: number) {
        this.context.lineTo(x, y);
    }
}

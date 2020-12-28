
/**
 * @summary 様々な色空間の色を表現するクラス
 */
export class Color {
    // #region private fields
    private _r = 0;
    private _g = 0;
    private _b = 0;
    private _a = 1;
    public hex = "#000000";
    // #endregion

    // #region gettres
    /**
    * RGBAのうちRの値（0~255）
    */
    get r(): number {
        return this._r;
    }

    /**
    * RGBAのうちGの値（0~255）
    */
    get g(): number {
        return this._g;
    }

    /**
    * RGBAのうちBの値（0~255）
    */
    get b(): number {
        return this._b;
    }

    /**
     * RGBAのうちAの値（0~255）
     */
    get a(): number {
        return this._a;
    }

    /**
     * cssの文字列
     */
    get rgba(): string {
        return `rgba(${this._r},${this._g},${this._b},${this._a})`;
    }
    // #endregon

    // #region public methods
    // constructor(hex: string, alpha?: number)
    // constructor(hsv: number[], alpha?: number);
    // constructor(r: number, g: number, b: number);
    // constructor(r: number, g: number, b: number, a: number);
    constructor(r: any, g: number, b: number, a: number) {
        // if (r instanceof Array)
        // {

        // }
        // else if (typeof (r) === "string")
        // {
        //     if (r.length !== 7)
        //     {
        //         throw new Error("不正なカラーコードです。");
        //     }
        //     this._r = parseInt(r.slice(1, 3), 16) & 255;
        //     this._g = parseInt(r.slice(3, 5), 16) & 255;
        //     this._b = parseInt(r.slice(5, 7), 16) & 255;
        //     this._a = g || 1;
        // }
        // else if (g && b)
        // {
        //     this._r = r;
        //     this._g = g;
        //     this._b = b;
        //     this._a = a || 1;
        // }

        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a || 1;
        this.hex = this.toHexString();
    }

    public static fromHsv(hue: number, saturation: number, lightness: number, a = 1): Color {
        const C = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const H = (hue / 60) % 6;
        const X = C * (1 - Math.abs(H % 2 - 1));

        let R = 0;
        let G = 0;
        let B = 0;
        switch (Math.floor(H)) {
            case 0: R = C; G = X; B = 0; break;
            case 1: R = X; G = C; B = 0; break;
            case 2: R = 0; G = C; B = X; break;
            case 3: R = 0; G = X; B = C; break;
            case 4: R = X; G = 0; B = C; break;
            case 5: R = C; G = 0; B = X; break;
        }

        const m = lightness - 0.5 * C;

        return new Color(
            Math.round((R + m) * 255),
            Math.round((G + m) * 255),
            Math.round((B + m) * 255),
            a
        );
    }

    public static fromColorCode(code: string, alpha = 1) {
        if (code.length !== 7) {
            throw new Error("不正なカラーコードです。");
        }
        return new Color(parseInt(code.slice(1, 3), 16) & 255,
            parseInt(code.slice(3, 5), 16) & 255,
            parseInt(code.slice(5, 7), 16) & 255,
            alpha || 1
        );
    }

    /**
     * 16進数文字列へ変換
     */
    public toHexString() {
        return `#${this._r.toString(16)}${this._g.toString(16)}${this._b.toString(16)}`;
    }
    // #endregion
}

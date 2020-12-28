import { Vector2D } from "./core/Vector2D";
import { Random } from "./core/Random";
import { Color } from "./Color";

/// <summary>
///
/// </summary>
export class Food {
    public location: Vector2D;
    public size: number;

    private waveOffcet = 0;
    paintColor: Color;

    /// <summary>
    ///
    /// </summary>
    public constructor(x: number) {
        this.location = new Vector2D(x, 0);

        this.size = Random.next(4, 8);

        this.paintColor = new Color(60, 60 + Random.next(60), 128 + Random.next(127), 255);
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="canvas"></param>
    /// <param name="deltaTime"></param>
    /// <returns></returns>
    public draw(canvas: any, deltaTime: number) {
        this.location.y += 2.0;
        this.waveOffcet += 0.1;

        const y = this.location.y;
        const x = this.location.x + Math.sin(this.waveOffcet) * 10;

        // if (BoidWallPaper.DisplayHeight <= y)
        // {
        //     return false;
        // }
        // canvas.DrawCircle(x, y, Size, paint);

        // paint.Color = new Color(155, 221, 48);
        // canvas.DrawCircle(x, y, 12, paint);
        // paint.Color = new Color(40, 60, 58);
        // canvas.DrawCircle(x, y, 8, paint);
        // paint.Color = new Color(155, 180, 120);
        // canvas.DrawCircle(x, y, 4, paint);

        return true;
    }
}

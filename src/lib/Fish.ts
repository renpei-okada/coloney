import { Vector2D } from "./core/Vector2D";
import { Color } from "./Color";
import { Random } from "./core/Random";
import { Numerics } from "./core/Numerics";
import { IColony } from "./IColoney";
import { IRenderer } from "./IRenderer";

/// <summary>
/// 魚を表現します。
/// </summary>
export class Fish implements IColony {
    /// <summary>
    /// 各セグメントの座標を格納
    /// </summary>
    segmentlocation = Array<Vector2D>(10);

    /// <summary>
    /// プリミティブの座標
    /// </summary>
    location = new Vector2D(0, 0);

    /// <summary>
    /// セグメントの長さ
    /// </summary>
    segLength = 14.0;

    /// <summary>
    /// サイズ
    /// </summary>
    size = 0.22;

    /// <summary>
    /// 色の選択用
    /// </summary>

    /// <summary>
    /// ヒレの角度
    /// </summary>
    finAngle = 0;

    /// <summary>
    /// ヒレの動きの折り返し用
    /// </summary>
    finDirection = 30;

    /// <summary>
    /// 点滅させるセグメントのインデックス
    /// </summary>
    lightSegmentIndex = -1;

    /// <summary>
    /// プリミティブのカラー
    /// </summary>
    color: Color;

    /// <summary>
    /// 点滅しているかどうか
    /// </summary>
    isFlicking = false;

    angle = 0;

    /// <summary>
    /// 点滅の状態を制御
    /// </summary>
    public isFlicking_ = false;
    //         {
    //     get
    //     {
    //         return isFlicking;
    //     }
    //     set
    //     {
    //         if (value && !isFlicking)
    //         {
    //             isFlicking = true;
    //             BeginBrightness();
    //         }
    //         else if (!value)
    //         {
    //             isFlicking = false;
    //         }
    //     }
    // }
    renderer: IRenderer;

    /// <summary>
    /// コンストラクタ
    /// </summary>
    public constructor(
        renderer: IRenderer,
        location: Vector2D = new Vector2D(0, 0),
        color?: Color
    ) {
        this.renderer = renderer;
        this.location = location;

        for (let i = 0; i < 10; i++) {
            this.segmentlocation[i] = new Vector2D(0, 0);
        }
        // paint.Color = Color.Argb(255, 140, 180, 255);
        this.color = color || Random.getRandomColor();
    }

    public rotate(angle: number): void {
        this.angle = angle;
    }

    private beginBrightness() {
        // Task.Run(async () =>
        // {
        //     while (true)
        //     {
        //         if (!isFlicking)
        //         {
        //             return;
        //         }
        //         await Task.Delay(80);
        //         lightSegmentIndex++;
        //         e++;
        //         // オフセット
        //         if (8 < lightSegmentIndex)
        //         {
        //             lightSegmentIndex = 2;
        //             await Task.Delay(800);
        //         }
        //     }
        // });
    }

    vector = new Vector2D(0, 0);

    /// <summary>
    /// 移動量（Vector）をセットします。
    /// </summary>
    /// <param name="vector"></param>
    /// <param name="angle"></param>
    public translate(vector: Vector2D) {
        // this.location.x += vector.x;
        // this.location.y += vector.y;

        this.vector = vector;
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="canvas"></param>
    /// <param name="location"></param>
    /// <param name="angle"></param>
    public draw() {
        this.location.x += this.vector.x;
        this.location.y += this.vector.y;

        this.drawSegment(0, this.location.x, this.location.y);
        for (let i = 0; i < 8; i++) {
            this.drawSegment(i + 1, this.segmentlocation[i].x, this.segmentlocation[i].y);
        }
    }

    /// <summary>
    /// セグメントをひとつづつ描画
    /// </summary>
    /// <param name="canvas">描画用キャンバス</param>
    /// <param name="i">対象の1つ後ろのセグメントのインデックス</param>
    /// <param name="xin">対象のセグメントのx座標</param>
    /// <param name="yin">対象のセグメントのy座標</param>
    private drawSegment(i: number, xin: number, yin: number) {
        const dx = xin - this.segmentlocation[i].x;
        const dy = yin - this.segmentlocation[i].y;
        const angle = Math.atan2(dy, dx);
        const x = this.segmentlocation[i].x = (xin - Math.cos(angle) * this.segLength * this.size);
        const y = this.segmentlocation[i].y = (yin - Math.sin(angle) * this.segLength * this.size);

        // セグメントを光らせる
        if (i === this.lightSegmentIndex) {

            // .paintColor = paint.Color = Config.FishColorList[e % 7];
        }
        else {
            // paint.Color = paint.Color = color;
        }

        // 最初のセグメント
        if (i === 1) {
            // ヒレの描画
            // ヒレを動かす
            this.finAngle = Numerics.lerp(this.finAngle, this.finDirection, 0.04);
            if (this.finAngle >= 13) {
                this.finDirection = 0;
            }
            if (this.finAngle <= 2) {
                this.finDirection = 15;
            }

            this.renderer.drawLine(
                x + Math.cos(angle + Numerics.toRadians(120)) * 10 * this.size,
                y + Math.sin(angle + Numerics.toRadians(120)) * 10 * this.size,
                x + Math.cos(angle + Numerics.toRadians(145 + this.finAngle)) * 45 * this.size,
                y + Math.sin(angle + Numerics.toRadians(145 + this.finAngle)) * 45 * this.size,
                3 * this.size,
                this.color
            );
            this.renderer.drawLine(
                x + Math.cos(angle + Numerics.toRadians(-120)) * 10 * this.size,
                y + Math.sin(angle + Numerics.toRadians(-120)) * 10 * this.size,
                x + Math.cos(angle + Numerics.toRadians(-145 - this.finAngle)) * 45 * this.size,
                y + Math.sin(angle + Numerics.toRadians(-145 - this.finAngle)) * 45 * this.size,
                3 * this.size,
                this.color
            );

            // ヒレ先端の点
            // this.renderer.fill();

            this.renderer.drawCircle(
                x + Math.cos(angle + Numerics.toRadians(145 + this.finAngle)) * 45 * this.size,
                y + Math.sin(angle + Numerics.toRadians(145 + this.finAngle)) * 45 * this.size,
                4 * this.size,
                this.color
            );
            this.renderer.drawCircle(
                x + Math.cos(angle + Numerics.toRadians(-145 - this.finAngle)) * 45 * this.size,
                y + Math.sin(angle + Numerics.toRadians(-145 - this.finAngle)) * 45 * this.size,
                4 * this.size,
                this.color
            );

            this.renderer.drawCircle(
                this.segmentlocation[i].x,
                this.segmentlocation[i].y,
                (10 - i) * 1.2 * this.size,
                this.color
            );
        }
        // 奇数列
        else if (i % 2 === 1) {
            this.renderer.drawCircle(
                this.segmentlocation[i].x,
                this.segmentlocation[i].y,
                1.5 * this.size,
                this.color
            );
            this.renderer.drawStrokeCircle(
                this.segmentlocation[i].x,
                this.segmentlocation[i].y,
                (10 - i) * 1.2 * this.size,
                7,
                this.color
            );
        }
        // 偶数列
        else {
            this.renderer.drawCircle(
                this.segmentlocation[i].x,
                this.segmentlocation[i].y,
                (10 - i) * 0.5 * this.size,
                this.color);
        }
    }
}

import { Vector2D } from "./core/Vector2D";
import { IController } from "./IController";
import { Random } from "./core/Random";
import { Numerics } from "./core/Numerics";
import { Color } from "./Color";
import { IColony } from "./IColoney";
import { IRenderer } from "./IRenderer";

export const CAP_JOINT_COUNT = 10; //  笠のポイントの数
export const ROUND_DEGREE = 360; //  一周の角度
export const HEAD_DETAIL = 30; //  笠の細かさ(描画する角度の閾値)

/// <summary>
/// 海月を表現します。
/// </summary>
export class Jellyfish implements IColony {
    capPointAngle = Array<number>(CAP_JOINT_COUNT); //  笠のそれぞれのポイントの広がり角度

    public capPointAngleBase = 0; //  笠の動きのベース広がり角度
    public capPointAngleBaseSpd = 0; //  笠の動きベースの速度
    public headWitherPower: number; //  笠のしぼみ具合
    public headSize: number; //  笠の大きさ

    paintColor: Color;
    headFillPaintColor: Color;
    location: Vector2D;
    renderer: IRenderer;
    angle = 0;

    /// <summary>
    /// コンストラクタ
    /// </summary>
    public constructor(renderer: IRenderer, location: Vector2D = new Vector2D(0, 0)) {
        this.location = location;
        this.renderer = renderer;
        const col = Random.getRandomColor();
        this.headFillPaintColor = new Color(col.r, col.g, col.b, 0.6);

        this.paintColor = new Color(col.r, col.g, col.b, 0.6);

        //  かさのくねくねの動きの速さを決める
        this.capPointAngleBaseSpd = (0.1 + Random.nextDouble()) * 0.01;
        //  笠の大きさを決める
        this.headSize = 6 + (Random.next(5) + Random.nextDouble());
        //  笠のしぼみ具合を決める
        this.headWitherPower = 0.11;
    }

    vector = new Vector2D(0, 0);

    /**
     * プリミティブを描画します。
     * @param canvas 描画するキャンバス
     * @param location 描画する場所
     * @param angle デルタタイム
     */
    public draw(): void {
        this.renderer.pushMatrix();
        this.renderer.translate(this.location.x, this.location.y);
        this.renderer.rotate(this.angle + Numerics.toRadians(90));

        // 笠のポイントの広がり角度を、末端のポイントに伝える
        // 笠の列のカーブ（角度）を格納した配列を作成
        for (let i = 0; i < CAP_JOINT_COUNT - 1; i++) {
            this.capPointAngle[i] = this.capPointAngle[i + 1] + i;
        }

        this.capPointAngleBase += this.capPointAngleBaseSpd;
        this.capPointAngle[9] = (Math.abs(Math.sin(this.capPointAngleBase)) * 30 + 20);

        this.drawFillHead();
        this.drawHeadFrame();

        this.renderer.popMatrix();
    }

    /// <summary>
    /// 移動量（Vector）をセットします。
    /// </summary>
    /// <param name="vector"></param>
    /// <param name="angle"></param>
    public translate(vector: Vector2D) {
        this.location.x += vector.x;
        this.location.y += vector.y;

        this.vector = vector;
    }

    /// <summary>
    /// 移動量（Vector）をセットします。
    /// </summary>
    /// <param name="vector"></param>
    /// <param name="angle"></param>
    public rotate(angle: number) {
        this.angle = angle;
    }

    /// <summary>
    /// 笠のフレームを描画
    /// </summary>
    /// <param name="canvas">描画するキャンバス</param>
    private drawHeadFrame() {
        this.renderer.beginPath();
        for (let r = 90; r <= 270; r += 30) {
            let x = 0; let y = 0;
            let tx = 0; let ty = 0;
            let p = 1;
            for (let j = 0; j < CAP_JOINT_COUNT; j++) {
                p -= this.headWitherPower;
                const deg = this.capPointAngle[j];
                x += (Math.sin(Numerics.toRadians(deg)) * this.headSize * Math.sin(Numerics.toRadians(r)) * p);
                y += (Math.cos(Numerics.toRadians(deg)) * this.headSize);

                tx += (Math.sin(Numerics.toRadians(deg)) * this.headSize * Math.sin(Numerics.toRadians(r + HEAD_DETAIL)) * p);
                ty += (Math.cos(Numerics.toRadians(deg)) * this.headSize);

                this.renderer.lineTo(x, y);
                this.renderer.lineTo(tx, ty);
            }
        }
        this.renderer.closePathFill(this.paintColor);
    }

    /// <summary>
    /// 笠を描画
    /// </summary>
    /// <param name="canvas">描画するキャンバス</param>
    private drawFillHead() {
        let p = 1;
        let x = 0;
        let y = 0;

        this.renderer.beginPath();
        this.renderer.moveTo(0, 0);

        let r = 90;

        for (let i = 0; i < CAP_JOINT_COUNT; i++) {
            p -= this.headWitherPower;
            const deg = this.capPointAngle[i];
            x += (Math.sin(Numerics.toRadians(deg)) * this.headSize * Math.sin(Numerics.toRadians(r)) * p);
            y += (Math.cos(Numerics.toRadians(deg)) * this.headSize);
            this.renderer.lineTo(x, y);
        }

        p = 1;
        x = 0;
        y = 0;
        r = 270;
        const stack: Vector2D[] = [];
        for (let i = 0; i < CAP_JOINT_COUNT; i++) {
            p -= this.headWitherPower;
            const deg = this.capPointAngle[i];
            x += (Math.sin(Numerics.toRadians(deg)) * this.headSize * Math.sin(Numerics.toRadians(r)) * p);
            y += (Math.cos(Numerics.toRadians(deg)) * this.headSize);
            stack.unshift(new Vector2D(x, y));
        }
        for (const stackPoint of stack) {
            this.renderer.lineTo(stackPoint.x, stackPoint.y);
        }
        this.renderer.closePathFill(this.headFillPaintColor);
    }
}

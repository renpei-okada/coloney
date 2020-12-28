import { Vector2D } from "./core/Vector2D";
import { Food } from "./Food";
import { IController } from "./IController";
import { Random } from "./core/Random";
import { IColony } from "./IColoney";
import { Numerics } from "./core/Numerics";
import { IRenderer } from "./IRenderer";
import { Color } from "./Color";

export class TargetTrackingControllerOption {
    public speedBias = 1;
}

/// <summary>
///
/// </summary>
export class TargetTrackingController<T extends IColony> implements IController<T> {
    colony: T;

    /// <summary>
    /// スピード
    /// </summary>
    public speed = 1.0;

    speedBias = 2;

    /// <summary>
    /// プリミティブの向いている方向
    /// </summary>
    protected angle = 0;

    /// <summary>
    /// プリミティブの目標地点の座標
    /// </summary>
    targetLocation?: Vector2D;

    /// <summary>
    /// トラッキングしている餌
    /// </summary>
    food?: Food = undefined;

    /// <summary>
    /// プリミティブが捕食することができる餌のリスト
    /// </summary>
    protected readonly foods: Food[] = [];

    render: IRenderer;
    smoothCurveRate: number;
    /// <summary>
    /// コンストラクタ
    /// </summary>
    /// <param name="foods"></param>
    public constructor(
        render: IRenderer,
        colony: T,
        foods: Food[],
        speed = 100,
        smoothCurveRate = 0.01
    ) {
        this.render = render;
        this.colony = colony;
        this.foods = foods;
        this.speedBias = speed;
        this.smoothCurveRate = smoothCurveRate;
        this.initTargetLocation();
        // colony.IsFlicking = false;
    }

    c = Random.getRandomColor();

    /// <summary>
    /// 描画処理
    /// </summary>
    /// <param name="canvas">描画するキャンバス</param>
    /// <param name="deltaTime">直前の描画にかかった時間</param>
    /// <returns></returns>
    public update(deltaTime: number) {
        const location = this.colony.location;

        // 捕食できる餌がないかチェックしあればトラッキング
        this.checkFoodAction();

        // 目的地が設定されていなければ目的地を初期化
        if (!this.targetLocation) {
            this.initTargetLocation();
            return;
        }

        let x = this.targetLocation.x - location.x;
        let y = this.targetLocation.y - location.y;

        const angleDiff = Math.atan2(y, x);
        this.angle = Numerics.lerpAngle(this.angle, angleDiff, this.smoothCurveRate);

        // 線形補間した角度をベクトル変換し足すことで、滑らかに大まわりに回転させる
        if (Numerics.dist(this.targetLocation, location) > 100) {
            x = Math.cos(this.angle);
            y = Math.sin(this.angle);
        }

        // 正規化してスピードとデルタタイムを合わせる
        const vector = Numerics.normalize(new Vector2D(x, y));
        const vx = vector.x * this.speed * deltaTime;
        const vy = vector.y * this.speed * deltaTime;

        this.colony.translate(new Vector2D(vx, vy));
        this.colony.rotate(this.angle);
        this.colony.draw();

        // 次回のフレームで初期化させるため
        if (Numerics.dist(this.colony.location, this.targetLocation) <= 20.0) {
            if (this.food) {
                this.foods.splice(this.foods.indexOf(this.food), 1);
            }
            this.targetLocation = undefined;
        }
    }

    /// <summary>
    /// 目的地を初期化します。
    /// </summary>
    public initTargetLocation(location = new Vector2D(Random.next(this.render.width), Random.next(this.render.height))) {
        this.targetLocation = location;
        this.speed = this.speedBias * (1.0 + Random.nextDouble());
    }

    /// <summary>
    /// プリミティブにショックを与える。（入力したところから遠ざける）
    /// </summary>
    /// <param name="inputlocation">入力のあった座標</param>
    public shock(inputlocation: Vector2D) {
        const location = this.colony.location;

        if (Numerics.dist(inputlocation, location) <= 200) {
            // 入力の座標とプリミティブの座標のベクトルの逆の地点を目的地へ設定
            // 速度も上げる
            this.speed = 1200;
            let x = inputlocation.x - location.x;
            let y = inputlocation.y - location.y;

            // 距離が現在地から300fになるよう正規化
            const vec = Numerics.normalize(new Vector2D(x, y));
            x = location.x - vec.x * 300;
            y = location.y - vec.y * 300;
            this.targetLocation = new Vector2D(x, y);
        }
    }

    /// <summary>
    /// エサを目的地に設定し、捕食させる。
    /// </summary>
    public checkFoodAction() {
        // 餌の処理
        if (this.foods.length > 0) {
            // 一番近い餌を格納
            this.food = this.foods[0];
            for (let i = 1; i < this.foods.length; i++) {
                if (Numerics.dist(this.colony.location, this.foods[i].location) < Numerics.dist(this.colony.location, this.food.location)) {
                    this.food = this.foods[i];
                }
            }

            // 距離が300以下なら目的地へ
            if (Numerics.dist(this.colony.location, this.food.location) <= 300.0) {
                this.targetLocation = this.food.location;
                this.speed = 250 * 2;
            }
            else {
                this.food = undefined;
            }
        }
    }
}

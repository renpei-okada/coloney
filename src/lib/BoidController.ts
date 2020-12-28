import { IColony } from "./IColoney";
import { IController } from "./IController";
import { Vector2D } from "./core/Vector2D";
import { Numerics } from "./core/Numerics";

/// <summary>
/// コントローラーを群れとして表現します。
/// </summary>
/// <typeparam name="T"></typeparam>
export class BoidController<T extends IColony> {
    /// <summary>
    /// 群れに属する図形のリスト
    /// </summary>
    public readonly boids: IController<T>[] = [];

    /// <summary>
    /// ボスとなる図形
    /// </summary>
    public readonly boss: T;

    /// <summary>
    /// 図形を制御するコントローラー
    /// </summary>
    public readonly controller: IController<T>;

    thresholdDist = 30;

    r1 = 1; // パラメータ：群れの中心に向かう度合
    r2 = 2; // パラメータ：仲間を避ける度合
    r3 = 1; // パラメータ：群れの平均速度に合わせる度合

    angle = 0;

    /// <summary>
    /// コンストラクタ1
    /// </summary>1
    /// <param name="controller"></param>
    public constructor(controller: IController<T>) {
        this.controller = controller;
        this.boss = controller.colony;
    }

    /// <summary>
    /// 群れとして表現するコントローラーを追加します。
    /// </summary>
    /// <param name="colony"></param>
    public addBoid(controller: IController<T>) {
        controller.targetLocation = undefined;
        this.boids.push(controller);
    }

    /// <summary>
    /// 描画処理
    /// </summary>
    /// <param name="canvas">描画するキャンバス</param>
    /// <param name="deltaTime">直前の描画にかかった時間</param>
    public update(deltaTime: number) {
        for (const item of this.boids) {
            item.checkFoodAction();

            if (!item.targetLocation) {
                this.drawAsBoid(item, deltaTime);
            }
        }

        this.controller.update(deltaTime);
    }

    private drawAsBoid(controller: IController<T>, deltaTime: number) {
        let vx = 0;
        let vy = 0;

        let result = this.getVectorToCenter(controller.colony);
        vx += result.x * this.r1;
        vy += result.y * this.r1;

        result = this.getVectorToAvoid(controller.colony);
        vx += result.x * this.r2;
        vy += result.y * this.r2;

        result = this.getVectorToAverage(controller.colony);
        vx += result.x * this.r3;
        vy += result.y * this.r3;

        vx /= 3;
        vy /= 3;

        vx *= deltaTime * 30;
        vy *= deltaTime * 30;

        vx = Numerics.lerp(controller.colony.vector.x, vx, 0.05);
        vy = Numerics.lerp(controller.colony.vector.y, vy, 0.05);

        controller.colony.translate(new Vector2D(vx, vy));
        controller.colony.draw();
        // colony.draw();
    }

    /// <summary>
    ///
    /// </summary>
    private getVectorToCenter(colony: T): Vector2D {
        let vx = 0; let vy = 0;
        const x = colony.location.x;
        const y = colony.location.y;

        for (const item of this.boids) {
            // 参照が同じであればcontinue
            if (item.colony === colony) {
                continue;
            }
            const location = item.colony.location;
            vx += location.x;
            vy += location.y;
        }

        const count = this.boids.length - 1;
        vx /= count;
        vy /= count;

        vx += this.boss.location.x;
        vy += this.boss.location.y;
        vx /= 2;
        vy /= 2;

        return Numerics.normalize(new Vector2D(vx - x, vy - y));
    }

    /// <summary>
    ///
    /// </summary>
    private getVectorToAvoid(colony: T): Vector2D {
        let vx = 0; let vy = 0;
        for (const item of this.boids) {
            // 参照が同じであればcontinue
            if (item.colony === colony) {
                continue;
            }

            const location = item.colony.location;
            if (Numerics.dist(location, colony.location) < this.thresholdDist) {
                vx -= (location.x - colony.location.x);
                vy -= (location.y - colony.location.y);
            }
        }

        if (Numerics.dist(this.boss.location, colony.location) < this.thresholdDist) {
            vx -= this.boss.location.x - colony.location.x;
            vy -= this.boss.location.y - colony.location.y;
        }

        return Numerics.normalize(new Vector2D(vx, vy));
    }

    /// <summary>
    /// 整列
    /// </summary>
    private getVectorToAverage(colony: T): Vector2D {
        let vx = 0; let vy = 0;
        const x = colony.location.x;
        const y = colony.location.y;
        for (const item of this.boids) {
            // 参照が同じであればcontinue
            if (item.colony === colony) {
                continue;
            }
            const vector = item.colony.vector;
            vx += vector.x;
            vy += vector.y;
        }

        const count = this.boids.length - 1;
        vx /= count;
        vy /= count;

        return Numerics.normalize(new Vector2D(vx, vy));
    }

    public shock(inputLocation: Vector2D) {
        for (const item of this.boids) {
            item.shock(inputLocation);
        }
    }
}

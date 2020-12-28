import { Vector2D } from "./core/Vector2D";
import { IColony } from "./IColoney";

/// <summary>
/// 目的地の座標を更新し、そこへ追従し、図形を描画するメカニズムを提供します。
/// </summary>
export interface IController<T extends IColony>
{
    /// <summary>
    /// 描画する対象の図形。
    /// </summary>
    colony: T;

    speed: number;

    /// <summary>
    ///
    /// </summary>
    targetLocation?: Vector2D;

    /// <summary>
    ///  毎フレーム呼び出すことでアニメーションします。
    /// </summary>
    /// <param name="canvas"></param>
    /// <param name="deltaTime"></param>
    update(deltaTime: number): void;

    initTargetLocation(location: Vector2D): void;

    /// <summary>
    /// エサを目的地に設定し、捕食させる。
    /// </summary>
    checkFoodAction(): void;

    /// <summary>
    /// プリミティブにショックを与える。（入力したところから遠ざける）
    /// </summary>
    /// <param name="inputlocation">入力のあった座標</param>
    shock(inputlocation: Vector2D): void;
}

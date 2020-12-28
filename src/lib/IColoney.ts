import { Vector2D } from "./core/Vector2D";

/**
 * @summary 図形を描画するメカニズムを提供します。
 */
export interface IColony {
    /**
     * @summary 図形の現在の位置座標
     */
    location: Vector2D;

    vector: Vector2D;

    /**
     * 描画します.
     * @param location 場所
     * @param angle 角度
     */
    draw(): void;

    /**
     * 移動しさせます.
     * @param vector 移動量
     */
    translate(vector: Vector2D): void;

    /**
     * 回転させます.
     * @param angle 角度
     */
    rotate(angle: number): void;
}

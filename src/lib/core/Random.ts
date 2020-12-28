import { Color } from "../Color";

const colors = [
    "#3f51b5",
    "#2196f3",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#f44336",
    "#e91e63",
    "#9c27b0"
];

/**
 * @summary 乱数生成を提供します.
 */
export namespace Random
{
    // eslint-disable-next-line no-inner-declarations
    export function next(n1 = 0, n2?: number): number {
        if (!n2) {
            return Math.floor(Math.random() * (n1 + 1));
        }
        if (n2) {
            return Math.floor(Math.random() * (n2 + 1 - n1)) + n1;
        }
        return Math.floor(Math.random() * 1000);
    }

    // eslint-disable-next-line no-inner-declarations
    export function nextDouble(): number {
        return Math.random();
    }

    // eslint-disable-next-line no-inner-declarations
    export function getRandomColor(): Color {
        return Color.fromColorCode(colors[next(colors.length - 1)]);
    }
}

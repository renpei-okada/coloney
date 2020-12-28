<template>
    <div id="app">
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <!-- <canvas style="width: 100%; height: 100%" ref="canvas"></canvas> -->
        <HelloWorld />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import { Renderer } from "./lib/Renderer";
import { TargetTrackingController } from "./lib/TargetTrackingController";
// import {Fish} from "./lib/Fish";
import { Jellyfish } from "./lib/JellyFish";
import { Vector2D } from "./lib/core/Vector2D";
import { Random } from "./lib/core/Random";
import { BoidController } from "./lib/BoidController";
import { Fish } from "./lib/Fish";
import { Color } from "./lib/Color";

@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {
    // private mounted() {
    //     const canvas = this.$refs.canvas as HTMLCanvasElement | undefined;
    //     if (canvas) {
    //         const rect = canvas.getBoundingClientRect();
    //         canvas.width = rect.width;
    //         canvas.height = rect.height;

    //         const context = canvas.getContext("2d");
    //         if (context) {
    //             const renderer = new Renderer(context, rect.width, rect.height);
    //             context.fillStyle = "#00ff00";

    //             // const bubbles: FishController[] = [];
    //             // for (let i = 0; i < 500; i++)
    //             // {
    //             //     bubbles.push(new FishController(renderer, []));
    //             // }

    //             // const bubbles: BubbleEngine[] = [];
    //             // for (let i = 0; i < 600; i++)
    //             // {
    //             //     bubbles.push(new Bubb(renderer));
    //             // }

    //             const colonies: TargetTrackingController<any>[] = [];
    //             for (let i = 0; i < 5; i++) {
    //                 // colonies.push(
    //                 //     new TargetTrackingController(
    //                 //         renderer,
    //                 //         new Jellyfish(
    //                 //             renderer, new Vector2D(
    //                 //                 Random.next(0, rect.width),
    //                 //                 Random.next(0, rect.height)
    //                 //             )),
    //                 //         [],
    //                 //         1
    //                 //     )
    //                 // );
    //             }

    //             const boids: any[] = [];
    //             for (let i = 0; i < 10; i++) {
    //                 const c = Random.getRandomColor();
    //                 const boid = new BoidController(
    //                     new TargetTrackingController(
    //                         renderer,
    //                         new Fish(
    //                             renderer, new Vector2D(
    //                                 Random.next(0, rect.width),
    //                                 Random.next(0, rect.height)
    //                             ), c
    //                         ),
    //                         [],
    //                         10
    //                     )
    //                 );
    //                 boids.push(boid);
    //                 for (let j = 0; j < 7; j++) {
    //                     boid.addBoid(
    //                         new TargetTrackingController(
    //                             renderer,
    //                             new Fish(
    //                                 renderer, new Vector2D(
    //                                     Random.next(0, rect.width),
    //                                     Random.next(0, rect.height)
    //                                 ),
    //                                 c
    //                             ),
    //                             []
    //                         )
    //                     );
    //                 }
    //             }

    //             setInterval(() => {
    //                 context.clearRect(0, 0, rect.width, rect.height);
    //                 for (const item of colonies) {
    //                     item.update(0.1);
    //                 }
    //                 for (const item of boids) {
    //                     item.update(0.1);
    //                 }
    //             }, 1000 / 60);
    //         }
    //     }
    // }
}
</script>

<style lang="scss">
body {
    margin: 0;
}

#app {
    color: #2c3e50;
    height: 100vh;
    width: 100vw;
}
</style>

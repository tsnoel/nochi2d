<template>
    <div @mousedown="down()" @touchstart="down()" @mouseup="up()" @touchstop="up()" id="game"></div>
</template>

<script>
import gameModel from 'models/game';

export default {
    name: 'Nochi2D',
    data() {
        return {
            test: undefined
        };
    },
    mounted() {
        gameModel.play();
    },
    methods: {
        down() {
            this.test = setInterval(() => {
                gameModel.game.scene.keys.default.logo.angle -= 1;
                gameModel.game.scene.keys.default.logo.y -= 1;
            }, 25);
            // console.log(gameModel.game.scene.keys.default.logo);
        },
        up() {
            clearInterval(this.test);
        }
    }
}
</script>

<style>
html,
body,
#app {
    height: 100%;
}

body {
    margin: 0;
    overflow: hidden;
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#app::before {
    background-image: url('../public/assets/bg.png');
    background-repeat: repeat;
    background-size: 10rem;
    content: "";
    filter: grayscale(100%) brightness(20%);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
}

#game {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: 1;
}
</style>

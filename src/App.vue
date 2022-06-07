<template>
    <div @mousedown="down()" @mouseup="up()" id="game"></div>
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
            }, 25);
            console.log(gameModel.game.scene.keys.default.logo.angle);
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
    background: #000;
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

#game {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

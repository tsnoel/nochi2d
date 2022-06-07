<template>
    <div id="game"></div>
</template>

<script>
import gameModel from 'models/game';

export default {
    name: 'Nochi2D',
    data() {
        return {
        };
    },
    mounted() {
        gameModel.play();
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

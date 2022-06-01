<template>
    <ion-phaser
        v-if="initialize"
        :game="game"
        :initialize="initialize"
    />
</template>

<script>
import Phaser from 'phaser';

export default {
    name: 'Nochi2D',
    data() {
        return {
            initialize: false,
            game: {
                width: '100%',
                height: '100%',
                type: Phaser.AUTO,
                mode: Phaser.Scale.RESIZE,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 }
                    }
                },
                scene: {
                    init: function() {
                        this.cameras.main.setBackgroundColor('#24252A');
                    },
                    preload: function() {
                        // this.load.setBaseURL('http://labs.phaser.io');

                        this.load.image('logo', 'assets/sprites/mochi_ball.png');
                        this.load.image('nori', 'assets/particles/nori.png');
                        this.load.image('bg', 'assets/bg.jpg');
                    },
                    create: function() {
                        this.bg = this.add.image(0, 0, 'bg');
                        this.bg.alpha = 0.25;
                        this.bg.setDisplayOrigin(0.5);
                        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);

                        const particles = this.add.particles('nori');

                        const emitter = particles.createEmitter({
                            speed: 100,
                            scale: { start: 0.25, end: 0 }
                            // blendMode: 'ADD'
                        });

                        const logo = this.physics.add.image(400, 100, 'logo');

                        logo.setVelocity(100, 200);
                        logo.setBounce(1, 1);
                        logo.setCollideWorldBounds(true);

                        emitter.startFollow(logo);

                        this.helloWorld = this.add.text(
                            this.cameras.main.centerX,
                            this.cameras.main.centerY,
                            'nochi2d', {
                                font: '40px Arial',
                                fill: '#ffffff00'
                            }
                        );
                        this.helloWorld.setOrigin(0.5);

                        this.textRev = false;
                    },
                    update: function() {
                        if (this.helloWorld.angle &&
                            (this.helloWorld.angle > 40 || this.helloWorld.angle < -40)) {
                            this.textRev = !this.textRev;
                        }


                        if (this.textRev) {
                            this.helloWorld.angle -= 1;
                        } else {
                            this.helloWorld.angle += 1;
                        }

                        // the x,y, width and height of the games world
                        // the true, true, true, true, is setting which side of the world bounding box
                        // to check for collisions

                        this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight, true, true, true, true);

                        this.scale.resize(window.innerWidth, window.innerHeight);

                        this.bg.setDisplayOrigin(0.5);
                        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);
                    }
                }
            }
        };
    },
    mounted() {
        this.initialize = true;
    }
}
</script>

<style>
body {
    margin: 0;
    overflow: hidden;
}
</style>

import Phaser from 'phaser';

class Game {

    constructor() {
        this.width = 160;
        this.height = 144;
        this.parent = 'game';
        this.pixelArt = true;
        // this.aspectRatio = 1;
        this.renderType = Phaser.AUTO;
        this.scaleMode = Phaser.Scale.FIT || 3;
        this.physics = {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        };
        this.scene = {};

        this.setSceneInit();
        this.setScenePreload();
        this.setSceneCreate();
        this.setSceneUpdate();
    }

    play() {
        new Phaser.Game(this);
    }

    setSceneInit() {
        this.scene.init = function() {
            // the x,y, width and height of the games world
            // the true, true, true, true, is setting which side of the world bounding box
            // to check for collisions
            this.physics.world.setBounds(0, 0, 160, 144, true, true, true, true);

            this.cameras.main.setBackgroundColor('#FF0000AA');
        };
    }

    setScenePreload() {
        this.scene.preload = function() {
            this.load.bitmapFont('shortStack', 'assets/fonts/shortStack.png', 'assets/fonts/shortStack.xml');

            this.load.image('logo', 'assets/sprites/mochi_ball.png');
            this.load.image('nori', 'assets/particles/nori.png');
            this.load.image('bg', 'assets/bg.jpg');
        };
    }

    setSceneCreate() {
        this.scene.create = function() {
            this.bg = this.add.image(0, 0, 'bg');
            this.bg.alpha = 0.25;
            this.bg.setDisplayOrigin(0.5);
            this.bg.setDisplaySize(window.innerWidth, window.innerHeight);

            const particles = this.add.particles('nori');

            const emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 0.1, end: 0 }
                // blendMode: 'ADD'
            });

            const logo = this.physics.add.image(0, 0, 'logo');

            logo.setScale(0.5);
            logo.setVelocity(100, 100);
            logo.setBounce(1, 1);
            logo.setCollideWorldBounds(true);

            emitter.startFollow(logo);

            this.nochi = this.add.bitmapText(10, 50,
                'shortStack', 'insert game here');
            this.nochi.setScale(0.25);

            this.textRev = false;
        }
    }

    setSceneUpdate() {
        this.scene.update = function() {
            if (this.nochi.angle &&
                (this.nochi.angle > 40 || this.nochi.angle < -20)) {
                this.textRev = !this.textRev;
            }


            if (this.textRev) {
                this.nochi.angle -= 1;
            } else {
                this.nochi.angle += 1;
            }
        }
    }
}

const game = new Game();

export default game;

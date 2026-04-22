class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {

    this.load.path = "../Assets/";
    this.load.image('Egg', 'Egg.png');
    this.load.image('Double Yolk', 'Double Yolk.png');
    this.load.image('Chef', 'Chef.png');
    this.load.image('Pan pointer', 'Pan pointer.png');
     }

    create() {
        this.add.text(10, 10, "Loading..");
        this.add.image(20, 10, 'Egg');
        this.input.on('pointerdown', () => this.scene.start('body'));
    }
}

class Body extends Phaser.Scene {
    constructor() {
        super('body');
    }
    create() {
        this.add.text(10, 10, "I am the body scene.");
        let box = this.add.text(300, 100,
            `Here
is some
multi-line text.

I hope it shows correctly even though this last line is very long.`
        );

        let thing = this.add.circle(150, 150, 100, 0xff0000);
        this.add.tween({
            targets: thing,
            scale: { from: 0, to: 1 },
            duration: 1000
        });

        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(2000, 255, 0, 0);
        });

        this.time.delayedCall(5000, () => {
            this.scene.start('intro');
        })

        this.input.on('pointerdown', () => this.scene.start('intro'));
    }

    update() { }
}

new Phaser.Game({
    width: 640,
    height: 480,
    scene: [Intro, Body],
});

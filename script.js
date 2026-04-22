class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    preload() {

        // load all image assets
        this.load.path = "../Assets/";
        this.load.image('saveIcon', 'Egg.png');
        this.load.image('Double Yolk', 'Double Yolk.png');
        this.load.image('Chef', 'Chef.png');
        this.load.image('Pan pointer', 'Pan pointer.png');

        // load all sounds
        this.load.path = "../Sounds/";
    }

    create() {

        // text
        this.saveText = this.add.text(10, 10, "This icon indicates the game is saving");
        this.continueText = this.add.text(10, 10, "Press anywhere to continue");
        this.continueText.setAlpha(0);

        // two ovals
        this.oval1 = this.add.ellipse(200, 150, 140, 100, 0xffffff);
        this.oval2 = this.add.ellipse(200, 150, 140, 100, 0xffffff);

        // set random direction with velocities 3 and 4
        this.randomVelocity(this.oval1, 3);
        this.randomVelocity(this.oval2, 4);

        // images
        this.saveIcon = this.add.image(1600, 50, 'saveIcon');
        this.saveIcon.setScale(0.04);

        // continue text fades in
        this.tweens.add({
            targets: this.continueText,
            alpha: 0.6,
            duration: 1000,
            delay: 3000
        });


        // ui scaling
        this.uiScaling();
        this.scale.on("resize", () => {
            this.uiScaling();
        });

        // press to continue 
        this.input.on('pointerdown', () => this.scene.start('Logo'));

    }

    // function to bounce the ovals around
    bounceOvals(obj) {
        obj.x += obj.vx;
        obj.y += obj.vy;

        if (obj.x - obj.width / 2 <= 0 || obj.x + obj.width / 2 >= this.scale.width) {
            obj.vx *= -1;
        }

        if (obj.y - obj.height / 2 <= 0 || obj.y + obj.height / 2 >= this.scale.height) {
            obj.vy *= -1;
        }
    }

    // function to randomize the direction ovals start in
    randomVelocity(obj, speed) {
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    obj.vx = Math.cos(angle) * speed;
    obj.vy = Math.sin(angle) * speed;
    }

    // helper function to scale the ui
    uiScaling() {

        // get the width and height
        const w = this.scale.width;
        const h = this.scale.height;

        // gap is distance between text and save icon
        const padding = Math.max(30, w * 0.02);
        const gap = Math.max(45, w * 0.01);

        // scale font size between 12 and 24
        const saveTextSize = Math.min(24, Math.max(12, Math.floor(w * 0.035)));

        this.saveText.setStyle({
            fontSize: saveTextSize + "px",
            color: "white",
        });

        // scale font size between 24 and 48
        const ContinueTextSize = Math.min(48, Math.max(24, Math.floor(w * 0.035)));

        this.continueText.setStyle({
            fontSize: ContinueTextSize + "px",
            color: "white",
        });


        // set saveText in bottom left
        this.saveText.setOrigin(0, 1);
        this.saveText.setPosition(padding, h - padding);

        // set saveIcon right of saveText
        this.saveIcon.setOrigin(0.5, 0.5);
        this.saveIcon.setPosition(this.saveText.x + this.saveText.displayWidth + gap,
            this.saveText.y - this.saveText.displayHeight / 2);

        // center continueText
        this.continueText.setOrigin(0.5, 0.5);
        this.continueText.setPosition(this.scale.width / 2, this.scale.height / 2);

        this.oval1.setPosition(this.scale.width / 2, this.scale.height / 2);
        this.oval2.setPosition(this.scale.width / 2, this.scale.height / 2);

    }

    update() {

        // rotate the save icon
        this.saveIcon.angle += 2;

        this.bounceOvals(this.oval1);
        this.oval1.angle += 0.75;

        this.bounceOvals(this.oval2);
        this.oval2.angle += 0.75;
    }
}
class Logo extends Phaser.Scene {
    constructor() {
        super('Logo');
    }
    create() {
        
    }
        
    update() {
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    create() {}
}

new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Intro, Logo, Menu],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});

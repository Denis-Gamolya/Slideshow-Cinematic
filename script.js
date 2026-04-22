class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    preload() {
        preloadAssets(this);
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
        randomVelocity(this.oval1, 3);
        randomVelocity(this.oval2, 4);

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
        UIscaling(this);
        this.scale.on("resize", () => {
            UIscaling(this);
        });

        // press to continue 
        this.input.on('pointerdown', () => this.scene.start('Logo'));

    }


    update() {

        // rotate the save icon
        this.saveIcon.angle += 2;

        bounceOvals(this, this.oval1);
        this.oval1.angle += 0.75;

        bounceOvals(this, this.oval2);
        this.oval2.angle += 0.75;
    }
}


// TODO: make logo images transpent
// have thems scale from 0 to whatever for a punch effect
// add sound of egg falling / cracking
// add egg falling down and cracking into a double yolk
// need inbetween frames
// egg falls first then double yolk logo appears
class Logo extends Phaser.Scene {
    constructor() {
        super('Logo');
    }
    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        this.logoDouble = this.add.image(1600, 50, 'Logo_double');
        this.logoDouble.setScale(0.3);
        this.logoDouble.setPosition(w / 2, h / 2);

        this.logoYolk = this.add.image(1600, 50, 'Logo_yolk');
        this.logoYolk.setScale(0.25);
        this.logoYolk.setPosition(w /2, h / 2);

    }
        
    update() {
    }
}

//TODO: 
// menu with chef on left side and 3 buttons you can press on right
// when you hover over have the text change color like in the slide
// music
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

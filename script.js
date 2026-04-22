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
// add sound of egg falling / cracking
// add egg falling down and cracking into a double yolk
// scaling for everything else?
class Logo extends Phaser.Scene {
    constructor() {
        super('Logo');
    }
    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // add 'Double' from logo
        this.logoDouble = this.add.image(1600, 50, 'Logo_double');
        this.logoDouble.setScale(0.0);
        this.logoDouble.setPosition(w / 2, h / 3);

        // punch out double
        this.tweens.add({
            targets: this.logoDouble,
            scaleX: 0.3,
            scaleY: 0.3,
            duration: 400,
            delay: 1550,
            ease: 'Back.out'
        });

        // add 'Yolk' from logo
        this.logoYolk = this.add.image(1600, 50, 'Logo_yolk');
        this.logoYolk.setScale(0);
        this.logoYolk.setPosition(w / 2, h / 2);

        // punch out yolk
        this.tweens.add({
            targets: this.logoYolk,
            scaleX: 0.25,
            scaleY: 0.25,
            duration: 400,
            delay: 1850,
            ease: 'Back.out'
        });


        // add egg
        this.eggWhole = this.add.image(w / 2, -100, 'saveIcon')
        this.eggWhole.setScale(0.15)

        // egg falling effect
        this.tweens.add({
            targets: this.eggWhole,
            angle: 360,
            y: h / 1.3,
            duration: 1200,
            ease: 'Cubic.In',
            onComplete: () => {
                this.cracking();
            }
        });


        // add cracked egg
        this.eggCracked = this.add.image(w / 2, h / 1.3, 'Double Yolk')
        this.eggCracked.setScale(0.22)
        this.eggCracked.setAlpha(0)

    }

    // helper function to transition falling egg into cracked egg
    cracking() {
        this.tweens.add({
            targets: this.eggWhole,
            scaleX: 0.3,
            scaleY: 0.2,
            duration: 80,
            yoyo: true,
            onComplete: () => {                 // after reaching final position make eggWhole invisible
                this.sound.play('eggCrack');
                this.eggWhole.setAlpha(0);      // make eggCracked visible in its place
                this.eggCracked.setAlpha(1);
        
                this.tweens.add({
                    targets: this.eggCracked,
                    scaleX: 0.25,
                    scaleY: 0.25,
                    duration: 180,
                    ease: 'Back.Out',
                });

            }
        })
        this.cameras.main.fadeOut(2500);
        this.time.delayedCall(2200, () => {
            this.scene.start('Menu');
        });
    }

}

//TODO: 
// menu with chef on left side and 3 buttons you can press on right
// when you hover over have the text change color like in the slide
// music
// scaling for everything else?
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() { }
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

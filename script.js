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


// TODO: scaling for everything else?
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
            scaleX: 0.45,
            scaleY: 0.45,
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


    this.time.addEvent({
    delay: 2800,
    callback: this.transition,
    callbackScope: this
});
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
        });
    }

    transition() {
        this.cameras.main.fadeOut(800);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('Menu');
        });
    }
}

//TODO: 
// scaling for everything else?
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;
        // add menu music and loop
        this.sound.play('menuMusic', { loop: true });

        // add chef image
        this.chef = this.add.image(w / 4.7, h / 2 + 40, 'Chef');
        this.chef.setScale(0.45);

        this.startText = this.add.text(w / 1.4, h / 2 - 100, "Start Game");
        this.startText.setStyle({
            fontSize: "48px",
            color: "yellow",
            fontFamily: "Impact",
        }).setInteractive({ useHandCursor: true });

        this.settingsText = this.add.text(w / 1.4, h / 2, "Settings");
        this.settingsText.setStyle({
            fontSize: "48px",
            color: "yellow",
            fontFamily: "Impact",
        }).setInteractive({ useHandCursor: true });

        this.creditsText = this.add.text(w / 1.4, h / 2 + 100, "Credits");
        this.creditsText.setStyle({
            fontSize: "48px",
            color: "yellow",
            fontFamily: "Impact",
        }).setInteractive({ useHandCursor: true });


        // turn into a singular helper function
        this.startText.on("pointerover", () => {
            this.startText.setColor("#00ffff");
            this.sound.play('menuClick');
        });
        this.startText.on("pointerout", () => {
            this.startText.setColor("#ffff00");
        });

        this.settingsText.on("pointerover", () => {
            this.settingsText.setColor("#00ffff");
            this.sound.play('menuClick');

        });
        this.settingsText.on("pointerout", () => {
            this.settingsText.setColor("#ffff00");
        });

        this.creditsText.on("pointerover", () => {
            this.creditsText.setColor("#00ffff");
            this.sound.play('menuClick');
        });
        this.creditsText.on("pointerout", () => {
            this.creditsText.setColor("#ffff00");
        });

    }

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

function bounceOvals(scene, obj) {
    obj.x += obj.vx;
    obj.y += obj.vy;

    if (obj.x - obj.width / 2 <= 0 || obj.x + obj.width / 2 >= scene.scale.width) {
        obj.vx *= -1;
    }

    if (obj.y - obj.height / 2 <= 0 || obj.y + obj.height / 2 >= scene.scale.height) {
        obj.vy *= -1;
    }
}

function randomVelocity(obj, speed) {
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    obj.vx = Math.cos(angle) * speed;
    obj.vy = Math.sin(angle) * speed;
}

function UIscaling(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    const padding = Math.max(30, w * 0.02);
    const gap = Math.max(45, w * 0.01);

    const saveTextSize = Math.min(24, Math.max(12, Math.floor(w * 0.035)));
    scene.saveText.setStyle({
        fontSize: saveTextSize + "px",
        color: "white",
    });

    const continueTextSize = Math.min(48, Math.max(24, Math.floor(w * 0.035)));
    scene.continueText.setStyle({
        fontSize: continueTextSize + "px",
        color: "white",
    });

    scene.saveText.setOrigin(0, 1);
    scene.saveText.setPosition(padding, h - padding);

    scene.saveIcon.setOrigin(0.5, 0.5);
    scene.saveIcon.setPosition(
        scene.saveText.x + scene.saveText.displayWidth + gap,
        scene.saveText.y - scene.saveText.displayHeight / 2
    );

    scene.continueText.setOrigin(0.5, 0.5);
    scene.continueText.setPosition(w / 2, h / 2);

    scene.oval1.setPosition(w / 2, h / 2);
    scene.oval2.setPosition(w / 2, h / 2);
}
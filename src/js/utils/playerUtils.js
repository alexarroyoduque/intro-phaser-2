var playerUtils = {};

playerUtils.createControls = function (gameContext) {
    gameContext.controls = {
        'left': gameContext.game.input.keyboard.addKey(65), //A
        'right': gameContext.game.input.keyboard.addKey(68), //D
        'fire': gameContext.game.input.keyboard.addKey(75), // K
        'jump': gameContext.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
};

playerUtils.createPadControls = function (gameContext) {
    gameContext.padControls = {
        'left': Phaser.Gamepad.XBOX360_DPAD_LEFT,
        'right': Phaser.Gamepad.XBOX360_DPAD_RIGHT,
        'fire': Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
        'jump': Phaser.Gamepad.XBOX360_A
    };
};

playerUtils.setupPlayer = function (player) {
    player.animations.add('standby', [0, 1, 2, 1], 6, true);
    player.animations.add('move', [3, 4, 5, 6, 7, 8, 9, 10, 11], 18, true);
    player.animations.add('fire', [12, 13, 14, 15], 12, true);
    player.body.collideWorldBounds = true;
    player.body.setSize(18, 35, -6, 6);
    player.anchor.setTo(0.3, 0.5);
    player.fireTimer = 0;
    player.health = 1;
};

playerUtils.generatePlayer = function (x, y, gameContext) {
    gameContext.player = gameContext.game.add.sprite(100, 20, 'marco');
    gameContext.game.physics.enable(gameContext.player, Phaser.Physics.ARCADE);
    playerUtils.setupPlayer(gameContext.player);
    gameContext.game.camera.follow(gameContext.player);
};

playerUtils.setBulletBehaviour = function(gameContext, bullet) {
    if (gameContext.key !== 'step1' && gameContext.key !== 'step2') { // previous steps
        bullet.reset(gameContext.player.x, gameContext.player.y - utils.getRandomInt(2, 6));
        bullet.body.velocity.x = utils.getRandomInt(350, 400) * gameContext.player.scale.x;
        bullet.body.velocity.y = utils.getRandomInt(-20, 20);
    } else {
        bullet.reset(gameContext.player.x, gameContext.player.y - 6);
        bullet.body.velocity.x = 400 * gameContext.player.scale.x;
    }
};

playerUtils.fireBullet = function (gameContext) {
    if (gameContext.game.time.now > gameContext.player.fireTimer) {
        var bullet = gameContext.bullets.getFirstExists(false);
        if (bullet) {
            gameContext.shootSound.play('', 0, 0.4, false);
            playerUtils.setBulletBehaviour(gameContext, bullet);
            gameContext.player.fireTimer = gameContext.game.time.now + 200;
            utils.spawnBulletParticles(gameContext, {x: bullet.x, y: bullet.y})
        }
    }
};

// Only for step1, step2, step3, step4, and step5
playerUtils.playerActions = function (gameContext) {
    gameContext.player.body.velocity.x = 0;
    if (gameContext.controls.left.isDown) {
        gameContext.player.body.velocity.x = -150;
        gameContext.player.animations.play('move');
        if (gameContext.player.scale.x > 0) {
            gameContext.player.scale.x = - 1;
            gameContext.player.body.setSize(18, 35, 0, 6);
        }
    } else if (gameContext.controls.right.isDown) {
        gameContext.player.body.velocity.x = 150;
        gameContext.player.animations.play('move');
        if (gameContext.player.scale.x < 0) {
            gameContext.player.scale.x = 1;
            gameContext.player.body.setSize(18, 35, -6, 6);
        }
    } else if (gameContext.controls.fire.isDown && gameContext.player.alive) {
        gameContext.player.animations.play('fire');
        playerUtils.fireBullet(gameContext);
    } else {
        gameContext.player.animations.play('standby');
    }

    if (gameContext.controls.jump.isDown && gameContext.player.body.onFloor()) {
        gameContext.player.body.velocity.y = - 250;
    }
};

playerUtils.playerActionsPad = function (gameContext) {
    gameContext.player.body.velocity.x = 0;
    if (gameContext.controls.left.isDown || gameContext.pad1.isDown(gameContext.padControls.left)) {
        gameContext.player.body.velocity.x = -150;
        gameContext.player.animations.play('move');
        if (gameContext.player.scale.x > 0) {
            gameContext.player.scale.x = - 1;
            gameContext.player.body.setSize(18, 35, 0, 6);
        }
    } else if (gameContext.controls.right.isDown || gameContext.pad1.isDown(gameContext.padControls.right)) {
        gameContext.player.body.velocity.x = 150;
        gameContext.player.animations.play('move');
        if (gameContext.player.scale.x < 0) {
            gameContext.player.scale.x = 1;
            gameContext.player.body.setSize(18, 35, -6, 6);
        }
    } else if ((gameContext.controls.fire.isDown || gameContext.pad1.isDown(gameContext.padControls.fire)) && gameContext.player.alive) {
        gameContext.player.animations.play('fire');
        playerUtils.fireBullet(gameContext);
    } else {
        gameContext.player.animations.play('standby');
    }

    if ((gameContext.controls.jump.isDown || gameContext.pad1.isDown(gameContext.padControls.jump)) && gameContext.player.body.onFloor()) {
        gameContext.player.body.velocity.y = - 250;
    }
};
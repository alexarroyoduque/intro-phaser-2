var playerUtils = {};

playerUtils.createControls = function (gameContext) {
    gameContext.controls = {
        'left': gameContext.game.input.keyboard.addKey(65), //A
        'right': gameContext.game.input.keyboard.addKey(68), //D
        'down': gameContext.game.input.keyboard.addKey(83), //S
        'up': gameContext.game.input.keyboard.addKey(87), //W
        'fire': gameContext.game.input.keyboard.addKey(75), // K
        'jump': gameContext.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
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

playerUtils.fireBullet = function (context) {
    if (context.game.time.now > context.player.fireTimer) {
        var bullet = context.bullets.getFirstExists(false);
        if (bullet) {
            // context.shootSound.play('', 0, 0.4, false);
            bullet.reset(context.player.x, context.player.y - 6);
            bullet.body.velocity.x = 400 * context.player.scale.x;
            context.player.fireTimer = context.game.time.now + 200;
            utils.spawnBulletParticles(context, {x: bullet.x, y: bullet.y})
        }
    }
};

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
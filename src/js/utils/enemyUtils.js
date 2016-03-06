var enemyUtils = {};

enemyUtils.setupAbul = function (enemy) {
    this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.animations.add('default', [0, 1, 2, 3, 4, 5], 10, true);
    enemy.body.collideWorldBounds = true;
    enemy.body.setSize(20, 38);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.health = 3;
    enemy.points = 10;
    enemy.animations.play('default');
};

enemyUtils.setupHelicopter = function (enemy) {
    this.game.physics.enable(enemy, Phaser.Physics.ARCADE, true);
    enemy.animations.add('default', [0, 1, 2, 3], 16, true);
    enemy.body.collideWorldBounds = true;
    enemy.body.setSize(50, 45);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.body.immovable = true;
    enemy.body.allowGravity = false;
    enemy.health = 4;
    enemy.points = 20;
    enemy.shootTime = 1000;
    enemy.animations.play('default');
};

enemyUtils.abulsAttack = function (gameContext) {
    gameContext.abuls.forEach(function (abul) {
        if (gameContext.game.physics.arcade.distanceBetween(abul, gameContext.player) < 250) {
            gameContext.game.physics.arcade.accelerateToObject(abul, gameContext.player, 120, 120, 300);
            // accelerateToObject(objeto, destino, vel, xVelMax, yVelMax)
        } else {
            abul.body.velocity.x = 0;
        }
    }, gameContext);
};

enemyUtils.helicoptersAttack = function (gameContext) {
    gameContext.abuls.forEach(function (abul) {
        if (gameContext.game.physics.arcade.distanceBetween(abul, gameContext.player) < 250) {
            gameContext.game.physics.arcade.accelerateToObject(abul, gameContext.player, 120, 120, 300);
            // accelerateToObject(objeto, destino, vel, xVelMax, yVelMax)
        } else {
            abul.body.velocity.x = 0;
        }
    }, gameContext);
};

enemyUtils.helicopterAttacks = function(helicopter) {
    var helicopterBomb = this.bombs.getFirstExists(false);

    if (this.game.time.now > helicopter.shootTime) {
        if (helicopterBomb) {
            helicopter.shootTime = this.game.time.now + 1500;
            helicopterBomb.reset(helicopter.x, helicopter.y);
        }
    }
};

enemyUtils.addHorizontalTween = function(enemy, initialX, distanceX, time, gameContext) {
    gameContext.game.add.tween(enemy.body)
        .to({
            x: initialX - distanceX
        }, time, Phaser.Easing.Quadratic.InOut)
        .to({
            x: initialX
        }, time, Phaser.Easing.Quadratic.InOut)
        .loop()
        .start();

    gameContext.game.add.tween(enemy.body)
        .to({
            y: enemy.body.y - 20
        }, 1000, Phaser.Easing.Quadratic.InOut)
        .to({
            y: enemy.body.y
        }, 1000, Phaser.Easing.Quadratic.InOut)
        .loop()
        .start();

    gameContext.game.add.tween(enemy.scale)
        .to({
            x: -enemy.scale.x
        }, 10, Phaser.Easing.Linear.None, null, time + 200)
        .to({
            x: enemy.scale.x
        }, 10, Phaser.Easing.Linear.None, null, time + 200)
        .loop()
        .start();
};

enemyUtils.setupBomb = function (bomb) {
    this.game.physics.enable(bomb, Phaser.Physics.ARCADE);
    bomb.body.collideWorldBounds = false;
    bomb.body.setSize(12, 6);
    bomb.anchor.setTo(0.5, 0.5);
    bomb.outOfBoundsKill = true;
    bomb.checkWorldBounds = true;
    bomb.body.allowGravity = true;
    bomb.animations.add('default', [0, 1, 2], 10, true);
    bomb.animations.play('default');
};

enemyUtils.generateBombs = function (gameContext) {
    gameContext.bombs = gameContext.game.add.group();

    gameContext.bombs.createMultiple(5, 'bomb');
    gameContext.bombs.forEach(enemyUtils.setupBomb, gameContext);
};

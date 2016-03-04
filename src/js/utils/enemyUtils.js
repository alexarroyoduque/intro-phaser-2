var enemyUtils = {};

enemyUtils.setupAbul = function (enemy) {
    this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.animations.add('default', [0, 1, 2, 3, 4, 5], 10, true);
    enemy.body.collideWorldBounds = true;
    enemy.body.setSize(20, 38);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.health = 3;
    enemy.animations.play('default');
};

enemyUtils.abulsAttack = function (gameContext) {
    gameContext.abuls.forEach(function (abul) {
        if (gameContext.game.physics.arcade.distanceBetween(abul, gameContext.player) < 250) {
            gameContext.game.physics.arcade.accelerateToObject(abul, gameContext.player, 120, 120, 100);
            // accelerateToObject(objeto, destino, vel, xVelMax, yVelMax)
        } else {
            abul.body.velocity.x = 0;
        }
    }, gameContext);
};
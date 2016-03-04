var collisions = {};

collisions.checkGameCollisions = function (gameContext) {
    gameContext.game.physics.arcade.collide(gameContext.player, gameContext.layer);
    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.layer);

    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.player, collisions.playerIsDamaged, null, gameContext);
    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.bullets, collisions.enemyIsDamaged, null, gameContext);
    gameContext.game.physics.arcade.collide(gameContext.layer, gameContext.bullets, collisions.destroyBullet, null, gameContext);
    // collide(object1, object2, collideCallback, processCallback, callbackContext)
};

collisions.checkParticlesCollisions = function (gameContext) {
    gameContext.game.physics.arcade.collide(gameContext.emitterBullets, gameContext.layer);
    gameContext.game.physics.arcade.collide(gameContext.emitterBlood, gameContext.layer);
};

collisions.destroyBullet = function (bullet) {
    bullet.kill();
};

collisions.playerIsDamaged = function (player) {
    player.damage(1);
};

collisions.enemyIsDamaged = function (enemy, bullet) {
    enemy.damage(1);
    bullet.kill();
    utils.spawnBloodParticles(this, {x: bullet.x, y: bullet.y})
};
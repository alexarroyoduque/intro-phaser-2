var collisions = {};

collisions.checkPlayerCollisions = function (gameContext) {
    gameContext.game.physics.arcade.collide(gameContext.player, gameContext.layer);
    gameContext.game.physics.arcade.collide(gameContext.layer, gameContext.bullets, collisions.destroyBullet, null, gameContext);
    // collide(object1, object2, collideCallback, processCallback, callbackContext)
};

collisions.checkAbulCollisions = function (gameContext) {
    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.layer);

    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.player, collisions.playerIsDamaged, null, gameContext);
    gameContext.game.physics.arcade.collide(gameContext.abuls, gameContext.bullets, collisions.enemyIsDamaged, null, gameContext);
    // collide(object1, object2, collideCallback, processCallback, callbackContext)
};


collisions.checkHelicopterCollisions = function (gameContext) {
    gameContext.game.physics.arcade.collide(gameContext.bombs, gameContext.player, collisions.playerIsDamaged, null, gameContext);
    gameContext.game.physics.arcade.collide(gameContext.helicopters, gameContext.bullets, collisions.enemyIsDamaged, null, gameContext);
    gameContext.game.physics.arcade.collide(gameContext.layer, gameContext.bombs, collisions.destroyBullet, null, gameContext);
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
    if (this.key !== 'step0' && this.key !== 'step1' && this.key !== 'step2' && this.key !== 'step3') {
        this.totalScore+= enemy.points;
        this.scoreText.setText(this.totalScore);
    }
    enemy.damage(1);
    bullet.kill();
    utils.spawnBloodParticles(this, {x: bullet.x, y: bullet.y})

};
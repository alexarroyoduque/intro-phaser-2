var utils = {};

utils.generateGameVars = function(gameContext) {
    //map
    gameContext.bg;
    gameContext.map;
    gameContext.layer;
    gameContext.clouds1;
    gameContext.clouds2;
    gameContext.mountains1;
    gameContext.mountains2;
    //audio
    gameContext.music;
    gameContext.shootSound;
    //player
    gameContext.player;
    //bullets
    gameContext.bullets;
    //buttons
    gameContext.buttons;
    //particles
    gameContext.emitterBlood;
    gameContext.emitterBullets;
    gameContext.emitterRain;
    //score
    gameContext.totalScore;
    gameContext.scoreText;
};

utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utils.setupMistScenario = function (gameContext) {
    gameContext.clouds2 = gameContext.game.add.tileSprite(0, 0, 2000, 400, 'clouds2');
    gameContext.clouds2.alpha = 0.6;
    gameContext.mountains2 = gameContext.game.add.tileSprite(0, 150, 2000, 800, 'mountains2');
    gameContext.mountains1 = gameContext.game.add.tileSprite(0, 20, 2200, 800, 'mountains1');
    gameContext.clouds1 = gameContext.game.add.tileSprite(0, 20, 2000, 400, 'clouds1');
    gameContext.clouds1.alpha = 0.8;
};

utils.updateMistParallax = function (gameContext) {
    gameContext.clouds1.tilePosition.x -= 0.1;
    gameContext.clouds2.tilePosition.x -= 0.3;
    gameContext.mountains1.x = -gameContext.game.camera.x * 0.08;
    gameContext.mountains2.x = -gameContext.game.camera.x * 0.03;
};

utils.createScore = function (gameContext) {
    var textStyle = {
        font: '30px Arial',
        align: 'right',
        fill: '#f3d682',
        stroke: '#000',
        strokeThickness: 3
    };

    gameContext.totalScore = 0;
    gameContext.scoreText = gameContext.game.add.text(620, 15, gameContext.totalScore, textStyle)
    gameContext.scoreText.fixedToCamera = true;
    gameContext.scoreText.anchor.setTo(1, 0);
};

utils.setupBullet = function (bullet) {
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.collideWorldBounds = false;
    bullet.body.setSize(13, 6);
    bullet.anchor.setTo(0.5, 0.5);
    bullet.outOfBoundsKill = true;
    bullet.checkWorldBounds = true;
    bullet.body.allowGravity = false;
};

utils.generateBullets = function (gameContext) {
    gameContext.bullets = gameContext.game.add.group();

    gameContext.bullets.createMultiple(20, 'bullet');
    gameContext.bullets.forEach(utils.setupBullet, gameContext);
};

utils.setupWorld = function (gameContext, bgKey) {
    gameContext.game.physics.startSystem(Phaser.Physics.ARCADE);
    gameContext.game.physics.arcade.gravity.y = 485;
    gameContext.bg = gameContext.game.add.tileSprite(0, 0, 640, 480, bgKey);
    gameContext.bg.fixedToCamera = true;
};

utils.createLevel = function (gameContext, tilemapKey) {
    gameContext.map = gameContext.game.add.tilemap(tilemapKey);
    gameContext.map.addTilesetImage('tiles');
    gameContext.map.setCollisionBetween(0, gameContext.map.tiles.length);
    gameContext.layer = gameContext.map.createLayer('Tiles');
    gameContext.layer.resizeWorld();
    // this.layer.debug = true;
};

utils.generateEmitters = function(gameContext) {
    var gravity = 20,
        maxScale = 1.5,
        minScale = 1;

    gameContext.emitterBlood = gameContext.game.add.emitter(200);
    gameContext.emitterBlood.makeParticles('particles-blood');
    gameContext.emitterBlood.gravity = gravity;
    gameContext.emitterBlood.setXSpeed(-5, 5);
    gameContext.emitterBlood.setRotation(0, 0);

    gameContext.emitterBlood.maxParticleScale = maxScale;
    gameContext.emitterBlood.minParticleScale = minScale;
    gameContext.emitterBlood.setAlpha(0.5, 0.8);

    gameContext.emitterBullets = gameContext.game.add.emitter(30);
    gameContext.emitterBullets.makeParticles('particles-bullet');
    gameContext.emitterBullets.gravity = gravity;
    gameContext.emitterBullets.setXSpeed(-5, 5);
    gameContext.emitterBullets.bounce.x = 0.5;
    gameContext.emitterBullets.bounce.y = 0.5;

};

utils.spawnBloodParticles = function(gameContext, obj) {
    gameContext.emitterBlood.x = obj.x;
    gameContext.emitterBlood.y = obj.y;

    gameContext.emitterBlood.start(true, 8000, null, 4);
};

utils.spawnBulletParticles = function(gameContext, obj) {
    if (gameContext.key !== 'step1') { // step1 without particles
        gameContext.emitterBullets.x = obj.x;
        gameContext.emitterBullets.y = obj.y;

        if (gameContext.player.scale.x < 0) {
            gameContext.emitterBullets.setXSpeed(40, 50);
        } else {
            gameContext.emitterBullets.setXSpeed(-50, -40);
        }

        gameContext.emitterBullets.start(true, 1000, null, 1);
    }
};

utils.generateRain = function (gameContext) {
    gameContext.emitterRain = gameContext.game.add.emitter(300, -100, 400);
    gameContext.emitterRain.makeParticles('particles-rain');

    gameContext.emitterRain.width = gameContext.game.world.width;
    gameContext.emitterRain.angle = 15; // uncomment to set an angle for the rain.


    gameContext.emitterRain.minParticleScale = 0.1;
    gameContext.emitterRain.maxParticleScale = 0.5;

    gameContext.emitterRain.setYSpeed(500, 600);
    gameContext.emitterRain.setXSpeed(-5, 5);

    gameContext.emitterRain.minRotation = 0;
    gameContext.emitterRain.maxRotation = 0;

    gameContext.emitterRain.start(false, 1600, 5, 0);
};
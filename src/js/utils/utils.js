var utils = {};

utils.generateGameVars = function(gameContext) {
    //map
    gameContext.bg;
    gameContext.map;
    gameContext.layer;
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
};

utils.setupBullet = function (bullet) {
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.collideWorldBounds = false;
    bullet.body.setSize(13, 13);
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


utils.setupWorld = function (gameContext) {
    gameContext.game.physics.startSystem(Phaser.Physics.ARCADE);
    gameContext.game.physics.arcade.gravity.y = 485;

    gameContext.bg = gameContext.game.add.tileSprite(0, 0, 640, 480, 'sky');
    gameContext.bg.fixedToCamera = true;
};

utils.createLevel = function (gameContext, tilemapKey) {
    gameContext.map = gameContext.game.add.tilemap('tilemap1');
    gameContext.map.addTilesetImage('tiles');
    gameContext.map.setCollisionBetween(0, gameContext.map.tiles.length);
    gameContext.layer = gameContext.map.createLayer('Tiles');
    gameContext.layer.resizeWorld();
    // this.layer.debug = true;
};

utils.generateEmitters = function(gameContext) {
    var gravity = 200,
        maxScale = 1.5,
        minScale = 0.8;

    gameContext.emitterBlood = gameContext.game.add.emitter(50);
    gameContext.emitterBlood.makeParticles('particles', 0);
    gameContext.emitterBlood.gravity = gravity;
    gameContext.emitterBlood.maxParticleScale = maxScale;
    gameContext.emitterBlood.minParticleScale = minScale;
    gameContext.emitterBlood.setAlpha(0.5, 0.8);

    gameContext.emitterBullets = gameContext.game.add.emitter(100);
    gameContext.emitterBullets.makeParticles('particles', 1);
    gameContext.emitterBullets.gravity = gravity;
};

utils.spawnBloodParticles = function(theGame, obj) {
    theGame.emitterBlood.x = obj.x;
    theGame.emitterBlood.y = obj.y;

    theGame.emitterBlood.start(true, 600, null, 3);
};

utils.spawnBulletParticles = function(theGame, obj) {
    theGame.emitterBullets.x = obj.x;
    theGame.emitterBullets.y = obj.y;

    theGame.emitterBullets.start(true, 600, null, 3);
};

utils.generateRain = function (gameContext) {
    gameContext.emitterRain = gameContext.game.add.emitter(300, 0, 400);
    gameContext.emitterRain.makeParticles('particles', 1);

    gameContext.emitterRain.width = gameContext.game.world.width;
    gameContext.emitterRain.angle = 15; // uncomment to set an angle for the rain.


    gameContext.emitterRain.minParticleScale = 0.1;
    gameContext.emitterRain.maxParticleScale = 0.5;

    gameContext.emitterRain.setYSpeed(300, 500);
    gameContext.emitterRain.setXSpeed(-5, 5);

    gameContext.emitterRain.minRotation = 0;
    gameContext.emitterRain.maxRotation = 0;

    gameContext.emitterRain.start(false, 1600, 5, 0);
};
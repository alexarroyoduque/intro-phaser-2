(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.audio('music', 'assets/audio/ryu-remix.ogg');
      this.load.audio('shootSound', 'assets/audio/shoot.wav');
      this.load.image('player', 'assets/player.png');
      this.load.image('sky', 'assets/scenario/sky.jpg');
      this.load.spritesheet('tiles', 'assets/scenario/tiles.png', 16, 16, 1, 0);
      this.load.tilemap('tilemap1', 'assets/scenario/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('marco', 'assets/character/marco-rossi.png', 55, 50);
      this.load.image('bullet', 'assets/character/bullet.png');
      this.load.spritesheet('abul', 'assets/enemies/abul-abbas.png', 41, 41);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.spritesheet('button', 'assets/menu/button.jpg', 240, 80);
      this.load.spritesheet('button2', 'assets/menu/button2.jpg', 40, 40);

      this.load.spritesheet('particles', 'assets/others/particles.png', 6, 6);


      this.ready = true;
    },

    loadResources: function () {
      // load your assets here
    },

    create: function () {

    },

    update: function () {
      // if (!!this.ready) {
        this.game.state.start('menu');
      // }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['intro-phaser-2'] = window['intro-phaser-2'] || {};
  window['intro-phaser-2'].Preloader = Preloader;

}());

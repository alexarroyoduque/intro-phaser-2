(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      // this.asset = this.add.sprite(320, 240, 'preloader');
      // this.asset.anchor.setTo(0.5, 0.5);
      this.asset = this.add.sprite(226, 200, 'preloader');
      this.assetAlpha = this.add.sprite(226, 200, 'preloader');
      this.assetAlpha.alpha = 0.4;

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.audio('music', 'assets/audio/ryu-remix.ogg');
      this.load.audio('shootSound', 'assets/audio/shoot.wav');
      this.load.image('player', 'assets/player.png');
      this.load.image('sky', 'assets/scenario/sky.jpg');
      this.load.image('sky-mist', 'assets/scenario/sky-mist.jpg');
      this.load.image('clouds1', 'assets/scenario/clouds1.png');
      this.load.image('clouds2', 'assets/scenario/clouds2.png');
      this.load.image('mountains1', 'assets/scenario/mountains1.png');
      this.load.image('mountains2', 'assets/scenario/mountains2.png');
      this.load.spritesheet('tiles', 'assets/scenario/tiles.png', 16, 16, 1, 0);
      this.load.tilemap('tilemap1', 'assets/scenario/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.tilemap('tilemap2', 'assets/scenario/tilemap2.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('marco', 'assets/character/marco-rossi.png', 55, 50);
      this.load.image('bullet', 'assets/character/bullet.png');
      this.load.spritesheet('abul', 'assets/enemies/abul-abbas.png', 41, 41);
      this.load.spritesheet('helicopter', 'assets/enemies/helicopter.png', 71, 48);
      this.load.spritesheet('bomb', 'assets/enemies/bomb.png', 8, 15);
      this.load.spritesheet('button', 'assets/menu/button.jpg', 240, 80);
      this.load.spritesheet('button2', 'assets/menu/button2.jpg', 40, 40);

      this.load.spritesheet('particles-bullet', 'assets/others/particles-bullet.png');
      this.load.spritesheet('particles-blood', 'assets/others/particles-blood.png', 4, 4);
      this.load.spritesheet('particles-rain', 'assets/others/particles-rain.png', 11, 11);


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

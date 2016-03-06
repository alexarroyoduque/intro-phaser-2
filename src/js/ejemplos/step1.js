(function() {
    'use strict';

    function Step1() {}

    Step1.prototype = {

        create: function() {
            utils.generateGameVars(this);
            utils.setupWorld(this, 'sky');
            audioUtils.addAudio(this, 'music');

            // map
            utils.createLevel(this, 'tilemap1');

            // buttons
            interfaceUtils.createGameButtons(this, 'demo');

            // player
            playerUtils.generatePlayer(100, 20, this);
            playerUtils.createControls(this);
            utils.generateBullets(this);

            // enemies
            // abul-abbas
            this.abuls = this.game.add.group();
            this.abuls.create(460, 390, 'abul');
            this.abuls.create(720, 180, 'abul');
            this.abuls.create(880, 530, 'abul');
            this.abuls.create(750, 530, 'abul');
            this.abuls.create(1220, 340, 'abul');
            this.abuls.create(1190, 400, 'abul');
            this.abuls.create(1440, 420, 'abul');
            this.abuls.create(1600, 420, 'abul');
            this.abuls.create(1500, 530, 'abul');
            this.abuls.create(1720, 530, 'abul');
            this.abuls.forEach(enemyUtils.setupAbul, this);
        },

        update: function() {
            collisions.checkPlayerCollisions(this);
            collisions.checkAbulCollisions(this);
            enemyUtils.abulsAttack(this);

            playerUtils.playerActions(this);
        },
        render: function() {
            // this.game.debug.body(this.player);
            // this.game.debug.spriteInfo(this.player, 150, 30);
            // this.game.debug.body(this.abuls.getAt(0));
        }
    };

    window['intro-phaser-2'] = window['intro-phaser-2'] || {};
    window['intro-phaser-2'].Step1 = Step1;
}());

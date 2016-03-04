(function() {
    'use strict';

    function Step2() {}

    Step2.prototype = {

        create: function() {
            utils.generateGameVars(this);
            utils.setupWorld(this);
            audioUtils.addAudio(this, 'music');

            // buttons
            interfaceUtils.createGameButtons(this, 'demo');

            // map
            utils.createLevel(this, 'tilemap1');

            // player
            playerUtils.generatePlayer(100, 20, this);
            playerUtils.createControls(this);
            utils.generateBullets(this);

            // particles
            utils.generateEmitters(this);
            utils.generateRain(this);

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
            collisions.checkGameCollisions(this);
            collisions.checkParticlesCollisions(this);
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
    window['intro-phaser-2'].Step2 = Step2;
}());

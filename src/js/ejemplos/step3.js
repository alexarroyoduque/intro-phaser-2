(function() {
    'use strict';

    function Step3() {}

    Step3.prototype = {

        create: function() {
            utils.generateGameVars(this);
            utils.setupWorld(this, 'sky-mist');
            utils.setupMistScenario(this);
            audioUtils.addAudio(this, 'music');

            // map
            utils.createLevel(this, 'tilemap2');

            // buttons
            interfaceUtils.createGameButtons(this);

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
            this.abuls.create(350, 390, 'abul');
            this.abuls.create(630, 390, 'abul');
            this.abuls.create(700, 340, 'abul');
            this.abuls.create(730, 390, 'abul');
            this.abuls.create(830, 190, 'abul');
            this.abuls.create(950, 315, 'abul');
            this.abuls.create(1060, 150, 'abul');
            this.abuls.create(1250, 390, 'abul');
            this.abuls.create(1420, 260, 'abul');
            this.abuls.create(1600, 190, 'abul');
            this.abuls.create(1670, 190, 'abul');
            this.abuls.create(1900, 190, 'abul');
            this.abuls.create(1375, 390, 'abul');
            this.abuls.create(1580, 390, 'abul');
            this.abuls.create(1700, 390, 'abul');
            this.abuls.forEach(enemyUtils.setupAbul, this);
        },

        update: function() {
            utils.updateMistParallax(this);

            collisions.checkPlayerCollisions(this);
            collisions.checkAbulCollisions(this);
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
    window['intro-phaser-2'].Step3 = Step3;
}());

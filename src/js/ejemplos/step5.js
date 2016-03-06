(function() {
    'use strict';

    function Step5() {}

    Step5.prototype = {

        create: function() {
            utils.generateGameVars(this);
            utils.setupWorld(this, 'sky-mist');
            utils.setupMistScenario(this);
            audioUtils.addAudio(this, 'music');
            utils.createScore(this);

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
            // helicopter
            enemyUtils.generateBombs(this);
            this.helicopters = this.game.add.group();
            this.helicopters.create(600, 150, 'helicopter');
            this.helicopters.create(1400, 80, 'helicopter');
            this.helicopters.create(1850, 100, 'helicopter');
            this.helicopters.forEach(enemyUtils.setupHelicopter, this);
            enemyUtils.addHorizontalTween(this.helicopters.getAt(0), 600, 200, 4000, this);
            enemyUtils.addHorizontalTween(this.helicopters.getAt(1), 1400, 200, 3900, this);
            enemyUtils.addHorizontalTween(this.helicopters.getAt(2), 1850, 180, 3800, this);
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
            collisions.checkHelicopterCollisions(this);
            collisions.checkParticlesCollisions(this);

            enemyUtils.abulsAttack(this);
            this.helicopters.forEachAlive(enemyUtils.helicopterAttacks, this);
            playerUtils.playerActions(this);
        },
        render: function() {
            // this.game.debug.body(this.player);
            // this.game.debug.spriteInfo(this.player, 150, 30);
            // this.game.debug.body(this.helicopters.getAt(0));
        }
    };

    window['intro-phaser-2'] = window['intro-phaser-2'] || {};
    window['intro-phaser-2'].Step5 = Step5;
}());

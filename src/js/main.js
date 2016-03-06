window.addEventListener('load', function() {
    'use strict';

    var ns = window['intro-phaser-2'];
    var game = new Phaser.Game(640, 480, Phaser.AUTO, 'intro-phaser-2-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);
    /* yo phaser:state new-state-files-put-here */
    game.state.add('chapter1', ns.Chapter1);
    game.state.add('step1', ns.Step1);
    game.state.add('step2', ns.Step2);
    game.state.add('step3', ns.Step3);
    game.state.add('step4', ns.Step4);
    game.state.add('step5', ns.Step5);
    game.state.add('step6', ns.Step6);
    game.state.add('step7', ns.Step7);
    game.state.start('boot');
}, false);

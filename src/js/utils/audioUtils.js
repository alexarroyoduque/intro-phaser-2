var audioUtils = {};

audioUtils.addAudio = function(gameContext, musicLevelKey, playMusic) {
    gameContext.game.sound.stopAll();
    gameContext.music = gameContext.game.add.audio(musicLevelKey);
    gameContext.shootSound = gameContext.game.add.audio('shootSound');
    if (playMusic) {
        gameContext.music.play('', 0, 1, true);
    }
};
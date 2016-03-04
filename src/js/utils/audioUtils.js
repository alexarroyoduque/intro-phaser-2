var audioUtils = {};

audioUtils.addAudio = function(gameContext, musicLevelKey) {
    gameContext.game.sound.stopAll();
    gameContext.music = gameContext.game.add.audio(musicLevelKey);
    gameContext.shootSound = gameContext.game.add.audio('shootSound');
    gameContext.music.play('', 0, 1, true);
};
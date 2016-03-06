var interfaceUtils = {};

interfaceUtils.createGameButtons = function (gameContext, resetStateName) {
    gameContext.buttons = gameContext.game.add.group();
    gameContext.buttons.add(gameContext.game.add.button(20, 20, 'button2', function () {
        var stateName = this[1],
            context = this[0];
        context.game.state.start(stateName);
    }, [gameContext, 'menu'], 1, 0, 1));
    gameContext.buttons.add(gameContext.game.add.button(70, 20, 'button2', function () {
        var stateName = this[1],
            context = this[0];
        context.game.state.start(stateName);
    }, [gameContext, gameContext.key], 3, 2, 3));

    gameContext.buttons.add(gameContext.game.add.button(120, 20, 'button2', function () {
        if (!gameContext.musicIsPlaying) {
            gameContext.music.play('', 0, 1, true);
        } else {
            gameContext.music.pause();
        }
        gameContext.musicIsPlaying = !gameContext.musicIsPlaying;
        
    }, [gameContext, gameContext.key], 5, 4, 5));

    gameContext.buttons.forEach(function(button) {
        button.fixedToCamera = true;
        button.alpha = 0.7;
    }, gameContext)
};

interfaceUtils.createDataButton = function (gameContext) {
    gameContext.dataButtons = gameContext.game.add.group();
    gameContext.dataButtons.add(gameContext.game.add.button(300, 20, 'button2', function () {
        localStorage.setItem('totalScore', this.totalScore);
    }, gameContext, 7, 6, 7));

    gameContext.dataButtons.add(gameContext.game.add.button(350, 20, 'button2', function () {
        this.totalScore = parseInt(localStorage.getItem('totalScore'));
        this.scoreText.setText(this.totalScore || 0);
    }, gameContext, 9, 8, 9));

    gameContext.dataButtons.add(gameContext.game.add.button(450, 20, 'button2', function () {
        localStorage.removeItem('totalScore');
        this.totalScore = 0;
        this.scoreText.setText(this.totalScore);
    }, gameContext, 11, 10, 11));

    gameContext.dataButtons.forEach(function(button) {
        button.fixedToCamera = true;
        button.alpha = 0.7;
    }, gameContext)
};
var interfaceUtils = {};

interfaceUtils.createGameButtons = function (gameContext, resetStateName) {
    gameContext.buttons = gameContext.game.add.group();
    gameContext.buttons.add(gameContext.game.add.button(20, 20, 'button2', function () {
        var stateName = this[1],
            context = this[0];
        context.game.state.start(stateName);
    }, [gameContext, 'menu'], 2, 0, 2));
    gameContext.buttons.add(gameContext.game.add.button(70, 20, 'button2', function () {
        var stateName = this[1],
            context = this[0];
        context.game.state.start(stateName);
    }, [gameContext, resetStateName], 3, 1, 3));

    gameContext.buttons.getAt(0).fixedToCamera = true;
    gameContext.buttons.getAt(1).fixedToCamera = true;
};
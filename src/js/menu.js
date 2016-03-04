(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {
    create: function () {
      var centerX = this.game.world.centerX;
      var textStyle = {
          font: '20px Arial',
          align: 'center',
          fill: '#fff'
      };

      function setupButton(button) {
          button.anchor.setTo(0.5, 0.5);
      }

      function setupText(textButton) {
          textButton.anchor.setTo(0.5, 0.5);
      }

      this.game.sound.stopAll();

      // Botones del menu
      this.buttons = this.game.add.group();
      this.texts = this.game.add.group();

      this.buttons.add(this.game.add.button(centerX - 150, 100, 'button', this.goTo, [this, 'demo'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX - 150, 100, 'Resultado: intro 1', textStyle));
      this.buttons.add(this.game.add.button(centerX - 150, 200, 'button', this.goTo, [this, 'step1'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX - 150, 200, 'Refactor', textStyle));
      this.buttons.add(this.game.add.button(centerX - 150, 300, 'button', this.goTo, [this, 'step2'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX - 150, 300, 'Partículas', textStyle));
      this.buttons.add(this.game.add.button(centerX - 150, 400, 'button', this.goTo, [this, 'step3'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX - 150, 400, 'Azar', textStyle));
      this.buttons.add(this.game.add.button(centerX + 150, 100, 'button', this.goTo, [this, 'step4'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX + 150, 100, 'Puntos', textStyle));
      this.buttons.add(this.game.add.button(centerX + 150, 200, 'button', this.goTo, [this, 'step5'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX + 150, 200, 'El enemigo sufre', textStyle));
      this.buttons.add(this.game.add.button(centerX + 150, 300, 'button', this.goTo, [this, 'step6'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX + 150, 300, 'Tweens', textStyle));
      this.buttons.add(this.game.add.button(centerX + 150, 400, 'button', this.goTo, [this, 'step7'], 1, 0, 1));
      this.texts.add(this.game.add.text(centerX + 150, 400, 'Gamepad', textStyle));

      this.buttons.forEach(setupButton, this);
      this.texts.forEach(setupText, this);
    },

    update: function () {},

    goTo: function() {
        var stateName = this[1],
            context = this[0];
        context.game.state.start(stateName);
    }
  };

  window['intro-phaser-2'] = window['intro-phaser-2'] || {};
  window['intro-phaser-2'].Menu = Menu;
}());

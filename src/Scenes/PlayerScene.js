
import Phaser from 'phaser';
import gameOptions from '../Config/gameOptions';

export default class PlayerName extends Phaser.Scene {
  constructor() {
    super('Player');
  }

  preload() {
    this.load.html('nameform', 'assets/text/nameform.html');
    this.load.image('player', 'assets/runner1.png');
    this.load.image('mountain', 'assets/ui/cozy/transparent /background.png');
  }

  create() {
    this.add.image(200, 200, 'mountain');
    this.player = this.physics.add.sprite(200, 450, 'player');

    this.player.setScale(2);
    this.player.setDepth(2);
    this.player.anims.play('walk');
    const text = this.add.text(100, 150, 'Please enter your name', { color: 'purple', fontSize: '20px ' });
    const element = this.add.dom(this.game.config.width / 2, this.game.config.height / 2).createFromCache('nameform');

    element.addListener('click');
    const that = this;

    element.on('click', function (event) {
      if (event.target.name === 'playButton') {
        const inputText = this.getChildByName('nameField');

        //  Have they entered anything?
        if (inputText.value !== '') {
          //  Turn off the click events
          this.removeListener('click');

          //  Hide the login element
          this.setVisible(false);

          //  Populate the text with whatever they typed in
          text.setText(`Welcome ${inputText.value}`);
          gameOptions.playerName.push(inputText.value);
          that.scene.stop('Player');
          that.scene.start('Animate');
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });
  }
}

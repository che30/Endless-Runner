
import Phaser from 'phaser';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.load.image('walk1', 'assets/runner1.png');
    this.load.image('walk2', 'assets/runner2.png');
    this.load.image('walk3', 'assets/runner3.png');
    this.load.image('walk4', 'assets/runner4.png');
    this.load.image('walk5', 'assets/runner5.png');
    this.load.image('walk6', 'assets/runner6.png');
    this.load.image('walk7', 'assets/runner7.png');
    this.load.image('walk8', 'assets/runner8.png');
    this.load.image('instruction','assets/animation.png')
  }

  create() {
    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'walk1', frame: null },
        { key: 'walk2', frame: null },
        { key: 'walk3', frame: null },
        { key: 'walk4', frame: null },
        { key: 'walk5', frame: null },
        { key: 'walk6', frame: null },
        { key: 'walk7', frame: null },
        { key: 'walk8', frame: null },
      ],
      repeat: -1,
      frameRate: 8,
    });


    this.add.text(200, 100, 'Game instructions', { fontSize: 40 });
    this.add.text(200,250,'use this arrow ')
    this.add.text(420,250,'to jump between obstacles')
    this.add.image(380,250,'instruction')


    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Next', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Title');
    });
  }
}

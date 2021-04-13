
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
    this.musicOn = true;
    this.soundOn = true;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.musicOn = !this.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    });

    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.updateAudio();
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }

    if (this.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}

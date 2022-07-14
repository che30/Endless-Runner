import Phaser from 'phaser';

export default class AnimateScene extends Phaser.Scene {
  constructor() {
    super('Animate');
  }

  preload() {
    // load images
    this.load.image('logo', 'assets/logo.png');
    this.load.image('run1', 'assets/runner1.png');
    this.load.image('run2', 'assets/runner2.png');
    this.load.image('run3', 'assets/runner3.png');
    this.load.image('run4', 'assets/runner4.png');
    this.load.image('run5', 'assets/runner5.png');
    this.load.image('run6', 'assets/runner6.png');
    this.load.image('run7', 'assets/runner7.png');
    this.load.image('run8', 'assets/runner8.png');
    this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 150, frameHeight: 108 });
  }

  create() {
    this.anims.create({
      key: 'run',
      frames: [
        { key: 'run1', frame: null },
        { key: 'run2', frame: null },
        { key: 'run3', frame: null },
        { key: 'run4', frame: null },
        { key: 'run5', frame: null },
        { key: 'run6', frame: null },
        { key: 'run7', frame: null },
        { key: 'run8', frame: null },
      ],
      repeat: -1,
      frameRate: 8,
    });
    this.anims.create({
      key: 'right',
      frames: [
        { key: 'run1', frame: null },
        { key: 'run2', frame: null },
        { key: 'run3', frame: null },
        { key: 'run4', frame: null },
        { key: 'run5', frame: null },
        { key: 'run6', frame: null },
        { key: 'run7', frame: null },
        { key: 'run8', frame: null },
      ],
      repeat: -1,
      frameRate: 8,
    });
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNames('bird', { start: 0, end: 1 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.start('Game');
  }
}

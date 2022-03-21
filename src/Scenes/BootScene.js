
import Phaser from 'phaser';
import Apidata from '../ScoreAPI/Apidata';


export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/zenva_logo.png');
  }

  create() {
    const api = new Apidata
    // api.getScores();
    // this.scene.start('GameOver');
    this.scene.start('Preloader');
  }
}

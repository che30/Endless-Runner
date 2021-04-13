
import Phaser from 'phaser';
import gameOptions from '../Config/gameOptions';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    // load images
    this.load.image('back', 'assets/ui/ui_ic/ret.png');
    this.load.image('gameover', 'assets/game_over.png');
    this.load.image('mountain', 'assets/ui/cozy/transparent /background.png');
    this.load.image('leaderboard', 'assets/ui/ui_ic/cdicon.png');
    this.load.image('home', 'assets/ui/ui_ic/levelsel.png');
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
    this.add.image(200, 200, 'mountain');
    this.add.image(400, 300, 'gameover');
    this.scoreText = this.add.text(48, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText.setText(`Score: ${gameOptions.currentScore[0]}`);
    const backbtn = this.add.sprite((this.game.config.width / 8), (this.game.config.height / 4) * 3, 'back');
    backbtn.setScale(0.5);
    backbtn.setInteractive();
    const homebtn = this.add.sprite((this.game.config.width / 2), (this.game.config.height / 4) * 3, 'home');
    homebtn.setScale(0.5);
    homebtn.setInteractive();
    const leader = this.add.sprite((this.game.config.width - 100), (this.game.config.height / 4) * 3, 'leaderboard');
    leader.setScale(0.7);
    leader.setInteractive();

    leader.on('pointerdown', () => {
      this.scene.stop('GameOver');
      this.scene.start('ScoreBoard');
    });
    backbtn.on('pointerdown', () => {
      this.scene.start('Game');
    });
    backbtn.on('pointerover', () => {
      backbtn.setTexture('back2');
    });
    backbtn.on('pointerout', () => {
      backbtn.setTexture('back');
    });
    homebtn.on('pointerdown', () => {
      this.scene.start('Options');
    });
  }
}

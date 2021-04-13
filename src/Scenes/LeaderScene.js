/* eslint-disable  class-methods-use-this */

import Phaser from 'phaser';
import Apidata from '../ScoreAPI/Apidata';

export default class ScoreBoardScene extends Phaser.Scene {
  constructor() {
    super('ScoreBoard');
  }

  preload() {
    // load images
    this.load.image('back', 'assets/ui/ui_ic/ret.png');
    this.load.image('gameover', 'assets/game_over.png');
    this.load.image('mountain', 'assets/ui/cozy/transparent /background.png');
    this.load.image('leaderboard', 'assets/ui/ui_ic/cdicon.png');
    this.load.image('home', 'assets/ui/ui_ic/levelsel.png');
  }

  async create() {
    this.add.image(200, 200, 'mountain');
    this.add.image(400, 300, 'gameover');
    const { game: { config: { width, height } } } = this;
    const midpoint = (width / 8);

    const fontOptions = {
      fontSize: '50px',
      fontStyle: 'bolder',
      fill: '#bc6ff1',
      align: 'center',
      strokeThickness: 10,
      stroke: '#892cdc',
    };
    const titleText = this.add.text(0, (height / 8), 'LOADING SCORES.....', fontOptions);
    titleText.x = midpoint;

    const top = await this.getTopScores();

    fontOptions.fill = '#28abb9';
    fontOptions.stroke = '#2d6187';

    for (let i = 0; i < top.length; i += 1) {
      const { score, user } = top[i];
      const scoreText = this.add.text(0, (height / 8) * (i + 2), `${i + 1}. ${user}  ${score}`, fontOptions);
      scoreText.x = midpoint;
    }

    titleText.text = 'HIGH SCORES';
    const backbtn = this.add.sprite((this.game.config.width / 8), (this.game.config.height / 4) * 3, 'back');
    backbtn.setScale(0.5);
    backbtn.setInteractive();
    const homebtn = this.add.sprite((this.game.config.width / 2), (this.game.config.height / 4) * 3, 'home');
    homebtn.setScale(0.5);
    homebtn.setInteractive();
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

  async getTopScores() {
    const newApidata = new Apidata();
    const scores = await newApidata.getScores();
    const points = scores.map(item => item.score);
    let leaderLength = 5;
    const top5 = [];

    if (scores.length < leaderLength) {
      leaderLength = scores.length;
    }

    for (let i = 0; i < leaderLength; i += 1) {
      const max = Math.max(...points);
      const maxindex = points.indexOf(max);
      top5.push(scores[maxindex]);
      scores.splice(maxindex, 1);
      points.splice(maxindex, 1);
    }

    return top5;
  }
}
/* eslint-enable  class-methods-use-this */
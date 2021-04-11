import  Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload () {
    //load images
   this.load.image('back', 'assets/ui/ui_ic/ret.png');
   this.load.image('gameover', 'assets/game_over.png');
   this.load.image("mountain", "assets/ui/cozy/transparent /background.png")
 }

  create() {
    
    this.add.image(200,200,"mountain")
    // this.add.image(400, 300, 'gameover');
   
    const backbtn = this.add.sprite((game.config.width / 8), (game.config.height / 4) * 3, 'back');
    backbtn.setScale(0.5);
    backbtn.setInteractive();

    backbtn.on('pointerdown', function(){
      this.scene.start('Game')
    }.bind(this));
    backbtn.on('pointerover', () => {
      backbtn.setTexture('back2');
    });
    backbtn.on('pointerout', () => {
      backbtn.setTexture('back');
    });

  }}
  //   const leaderbtn = this.add.sprite((width / 8) * 3, (height / 4) * 3, 'leader');
  //   leaderbtn.setScale(0.5);
  //   leaderbtn.setInteractive();

  //   leaderbtn.on('pointerdown', this.leaderClick.bind(this));
  //   leaderbtn.on('pointerover', () => {
  //     leaderbtn.setTexture('leader2');
  //   });
  //   leaderbtn.on('pointerout', () => {
  //     leaderbtn.setTexture('leader');
  //   });

  //   const logo = this.add.image((width / 4) * 3, (height / 2), 'gameover');
  //   logo.setScale(0.7);

  //   const fontOptions = {
  //     fontSize: '50px',
  //     fontStyle: 'bolder',
  //     fill: '#d2e603',
  //     align: 'center',
  //     strokeThickness: 10,
  //     stroke: '#81b214',
  //   };
  //   this.gameText = this.add.text(40, (height / 4), `Your Score: ${this.sys.game.globals.score}`, fontOptions);
  // }

  // backClick() {
  //   this.sys.game.globals.score = 0;
  //   this.scene.start('Game');
  // }

  // homeClick() {
  //   this.sys.game.globals.score = 0;
  //   this.sys.game.globals.username = '';
  //   this.scene.start('Title');
  // }

  // leaderClick() {
  //   this.sys.game.globals.score = 0;
  //   this.scene.start('ScoreBoard');
  // }

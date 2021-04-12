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
     this.add.image(400, 300, 'gameover');
   
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

  

  }
  
    update(){
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

   }
  
 }
  
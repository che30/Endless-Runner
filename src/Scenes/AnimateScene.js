import 'phaser';
export default class AnimateScene extends Phaser.Scene {
  constructor () {
    super('Animate');
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
    this.load.image('run1','assets/dino/run1.png')
    this.load.image('run2','assets/dino/run2.png')
    this.load.image('run3','assets/dino/run3.png')
    this.load.image('run4','assets/dino/run4.png')
    this.load.image('run5','assets/dino/run5.png')
    this.load.image('run6','assets/dino/run6.png')
    this.load.image('run7','assets/dino/run7.png')
    this.load.image('run8','assets/dino/run8.png')
    this.load.image('cactus1','assets/cactus.png')
    this.load.image('cactus1','assets/cactus.png')
    this.load.image('cactus2','assets/cactus.png')
    this.load.image('cactus3','assets/cactus.png')
    this.load.image('cactus5','assets/cactus.png')
    
      this.load.image("platform", "assets/ui/cozy/transparent /Full-background.png");

  }
         
  create () {
    // this.add.image(400, 300, 'platform');
      // this.add.image(game.config.with/2,game.config.height/2)
      // this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, 'run1');
      // this.player.setScale(0.3)
        // setting player animation
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
              key: 'cactus',
              frames: [
                { key: 'cactus1', frame: null },
                { key: 'cactus2', frame: null },
                { key: 'cactus3', frame: null },
                { key: 'cactus4', frame: null },
                { key: 'cactus5', frame: null },
              ],
              repeat: -1,
              frameRate: 5,
            });
       
            this.scene.start("Game");
  }
};

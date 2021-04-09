import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
    this.add.image(400, 300, 'logo');
      this.load.image("platform", "assets/ui/cozy/transparent /Full-background.png");

      // player is a sprite sheet made by 24x48 pixels
      this.load.spritesheet("player", "assets/runner1.png", {
          frameWidth: 24,
          frameHeight: 48
      });

      // the coin is a sprite sheet made by 20x20 pixels
      this.load.spritesheet("cactus", "cactus.png", {
          frameWidth: 20,
          frameHeight: 20
      });

      // the firecamp is a sprite sheet made by 32x58 pixels
      // this.load.spritesheet("fire", "fire.png", {
      //     frameWidth: 40,
      //     frameHeight: 70
      // });

      // mountains are a sprite sheet made by 512x512 pixels
      // this.load.spritesheet("mountain", "mountain.png", {
      //     frameWidth: 512,
      //     frameHeight: 512
      // });
  }

  create () {
      this.add.image(game.config.with/2,game.config.height/2)
        // setting player animation
        this.anims.create({
          key: "run",
          frames: this.anims.generateFrameNumbers("player", {
              start: 0,
              end: 1
          }),
          frameRate: 8,
          repeat: -1
      });
         // setting coin animation
         this.anims.create({
          key: "rotate",
          frames: this.anims.generateFrameNumbers("cactus", {
              start: 0,
              end: 5
          }),
          frameRate: 15,
          yoyo: true,
          repeat: -1
      });
      
  }
};

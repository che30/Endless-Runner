import 'phaser';
import gameOptions from '../Config/gameOptions.js'
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    
    
      this.load.image("mountain", "assets/ui/cozy/transparent /background.png");
      this.load.image("platform","assets/perte.png")

  }
         
  create () {
    // this.add.image(200,200,"platform")
         // group with all active mountains.
         this.mountainGroup = this.add.group();
 
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // platform pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
         // adding a mountain
         this.addMountains()
          // keeping track of added platforms
        this.addedPlatforms = 0;
 
        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;
         // adding a platform to the game, the arguments are platform width, x position and y position
         this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);
          // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "run1");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setScale(1);
        this.player.setDepth(2);
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){
 
          // play "run" animation if the player is on a platform
          if(!this.player.anims.isPlaying){
            console.log("not playing")
              this.player.anims.play("run");
          }
      }, null, this);
  
      
 
      
  }
  // adding mountains
  addMountains(){
    let rightmostMountain = this.getRightmostMountain();
    if(rightmostMountain < game.config.width * 2){
        let mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), game.config.height + Phaser.Math.Between(0, 100), "mountain");
        mountain.setOrigin(0.5, 1);
        mountain.body.setVelocityX(gameOptions.mountainSpeed * -1)
        this.mountainGroup.add(mountain);
        if(Phaser.Math.Between(0, 1)){
            mountain.setDepth(1);
        }
        mountain.setFrame(Phaser.Math.Between(0, 3))
        this.addMountains()
    }
}
getRightmostMountain(){
  let rightmostMountain = -200;
  this.mountainGroup.getChildren().forEach(function(mountain){
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
  })
  return rightmostMountain;
}

    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX, posY){
      this.addedPlatforms ++;
      let platform;
      if(this.platformPool.getLength()){
          platform = this.platformPool.getFirst();
          platform.x = posX;
          platform.y = posY;
          platform.active = true;
          platform.visible = true;
          this.platformPool.remove(platform);
          let newRatio =  platformWidth / platform.displayWidth;
          platform.displayWidth = platformWidth;
          platform.tileScaleX = 1 / platform.scaleX;
      }
      else{
          platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
          this.physics.add.existing(platform);
          platform.body.setImmovable(true);
          platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
          platform.setDepth(2);
          this.platformGroup.add(platform);
      }
      this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
    update (){
      // recycling platforms
      let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
         // recycling mountains
         this.mountainGroup.getChildren().forEach(function(mountain){
          if(mountain.x < - mountain.displayWidth){
              let rightmostMountain = this.getRightmostMountain();
              mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
              mountain.y = game.config.height + Phaser.Math.Between(0, 100);
              mountain.setFrame(Phaser.Math.Between(0, 3))
              if(Phaser.Math.Between(0, 1)){
                  mountain.setDepth(1);
              }
          }
      }, this);

      // adding new platforms
      if(minDistance > this.nextPlatformDistance){
          let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
          let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
          let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
          let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
          let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
          let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
          this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
      }
  }
 
    
};

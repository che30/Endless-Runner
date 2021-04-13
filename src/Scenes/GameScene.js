
/* eslint-disable no-plusplus */
/* eslint-disable  class-methods-use-this */


import Phaser from 'phaser';
import gameOptions from '../Config/gameOptions';
import Apidata from '../ScoreAPI/Apidata';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.birdSpeed = -350;
    this.birdDelay = 3000;
  }

  preload() {
    // load images

    this.load.image('platform', 'assets/perte.png');
    this.load.spritesheet('mountain', 'assets/ui/cozy/transparent /background.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    // spawn bird
    this.spawnBird();
    // add mountain
    this.add.image(200, 200, 'mountain');
    // group with all active mountains.
    this.mountainGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });
    this.birds = this.physics.add.group();
    this.addedPlatforms = 0;
    // declare score variable
    this.score = 0;
    // display score on screen
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;
    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(this.game.config.width, this.game.config.width / 2,
      this.game.config.height * gameOptions.platformVerticalLimit[1]);
    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition,
      this.game.config.height * 0.7, 'run1');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setScale(2);
    this.player.setDepth(2);
    // add collider between bird and player
    this.physics.add.overlap(this.player, this.birds, (player, birds) => {
      this.checkscore();
      this.score += 6;
      gameOptions.currentScore.push(this.score);
      this.score += 6;
      this.tweens.add({
        targets: birds,
        y: birds.y - 100,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.birds.killAndHide(birds);
          this.birds.remove(birds);
        },
      });
    }, null, this);
    this.platformCollider = this.physics.add.collider(this.player,
      this.platformGroup, () => {
      // play "run" animation if the player is on a platform
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run');
        }
      }, null, this);
    // checking for input
  }

  // adding mountains
  addMountains() {
    const rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < this.game.config.width * 2) {
      const mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350),
        this.game.config.height + Phaser.Math.Between(0, 100), 'mountain');
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    });
    return rightmostMountain;
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0],
        gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]);

    this.input.keyboard.on('keydown-UP', this.jump, this);
    this.input.keyboard.on('keydown-RIGHT', this.jump, this);
    this.input.on('pointerdown', this.jump, this);

    // Sets the jumps to 0 for the double jump
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.x = gameOptions.playerStartPosition;
    const api = new Apidata();
    // game over
    if (this.player.y > this.game.config.height) {
      api.addScore(gameOptions.playerName[0], gameOptions.currentScore[0]);
      this.scene.pause('Game');
      this.scene.start('GameOver');
    }
    // this.player.setVelocityX(135);

    // recycling platforms
    let minDistance = this.game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    // recycling mountains
    this.mountainGroup.getChildren().forEach((mountain) => {
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = this.game.config.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale
       * Phaser.Math.Between(gameOptions.platformHeightRange[0],
         gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = this.game.config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = this.game.config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap,
        minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth,
        this.game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }

  jump() {
    if (this.cursors.up.isDown) {
      if (this.player.body.touching.down || (this.playerJumps > 0
         && this.playerJumps < gameOptions.jumps)) {
        if (this.player.body.touching.down) {
          this.playerJumps = 0;
        }
        this.player.body.setVelocityY(gameOptions.jumpForce * -1);
        this.playerJumps += 1;
        this.checkscore();
        this.score += 4;
        gameOptions.currentScore.push(this.score);
        this.scoreText.setText(`Score: ${this.score}`);
      }
    } else if (this.cursors.right.isDown) {
      // this.player.x

      this.score += 2;
      this.checkscore();
      this.score += 4;
      gameOptions.currentScore.push(this.score);
      this.scoreText.setText(`Score: ${this.score}`);
      this.player.anims.play('right', true);
    }
  }

  checkscore() {
    if (gameOptions.currentScore >= 1) {
      gameOptions.currentScore.pop();
    }
  }

  spawnBird() {
    this.time.addEvent({
      delay: this.birdDelay,
      loop: true,
      callbackScope: this,
      callback: () => {
        const val = Math.random();
        if (val > 0.5) {
          this.generateBird(280);
        } else {
          this.generateBird(360);
        }
      },
    });
  }

  generateBird(y) {
    const bird = this.birds.create(Math.max(Math.random() * 900, 780), y, 'bird');
    bird.setScale(0.4).setOrigin(0, 0);
    bird.setVelocityX(Math.max(--this.birdSpeed, -400));
    bird.setSize(bird.width * 0.4, bird.height * 0.4);
    bird.anims.play('fly');
    this.time.addEvent({
      delay: 4000,
      repeat: 0,
      callbackScope: this,
      callback: () => {
        bird.destroy();
      },
    });
  }
}
/* eslint-enable no-plusplus */
/* eslint-enable  class-methods-use-this */
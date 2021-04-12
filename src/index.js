import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import AnimateScene from './Scenes/AnimateScene'
import GameOverScene from './Scenes/GameOverScene';
import PlayerScene from './Scenes/PlayerScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Animate',AnimateScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Player',PlayerScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
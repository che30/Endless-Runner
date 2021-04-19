import Phaser from 'phaser';
import PreloaderScene from './Scenes/PreloaderScene';

test('1. Test preload scene inheritance from phaser ', () => {
  const testScene = new PreloaderScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
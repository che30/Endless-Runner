import Phaser from 'phaser';
import AnimateScene from './Scenes/AnimateScene';

test('1. Test Animate scene inheritance from phaser ', () => {
  const testScene = new AnimateScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
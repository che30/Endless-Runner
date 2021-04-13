import Phaser from 'phaser';
import BootScene from './Scenes/BootScene';

test('1. Test Boot scene inheritance from phaser ', () => {
  const testScene = new BootScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
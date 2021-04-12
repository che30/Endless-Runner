import Phaser from 'phaser';
import OptionsScene from './Scenes/OptionsScene';

test('1. Test game scene inheritance from phaser ', () => {
  const testScene = new OptionsScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
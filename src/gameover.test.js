import Phaser from 'phaser';
import GameOverScene from './Scenes/GameOverScene';

test('1. Test game scene inheritance from phaser ', () => {
  const testScene = new GameOverScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
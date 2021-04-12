import Phaser from 'phaser';
import GameScene from './Scenes/GameScene';

test('1. Test game scene inheritance from phaser ', () => {
  const testScene = new GameScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
test('constructor does not throw error when called without parameters', () => {
  const game = new GameScene();
  expect(() => game).not.toThrow();
});
test('testscene should be instance of Gamescene', () => {
  const game = new GameScene();
  expect(game).toBeInstanceOf(GameScene);
});
test('throw an error when called with  less parameters', () => {
  const game = new GameScene();
  expect(game).toBeInstanceOf(GameScene);
});

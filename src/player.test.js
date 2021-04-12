import Phaser from 'phaser';
import PlayerName from './Scenes/PlayerScene';

test('1. Test player scene inheritance from phaser ', () => {
  const testScene = new PlayerName();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});
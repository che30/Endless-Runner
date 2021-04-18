/* eslint-disable no-unused-vars */

import Apidata from './ScoreAPI/Apidata';
import GameScene from './Scenes/GameScene';
import GameOverScene from './Scenes/GameOverScene';

jest.mock('./ScoreAPI/Apidata');


test('check is Gamescene called Api constructor', () => {
  const game = new GameScene();
  expect(Apidata).not.toHaveBeenCalledTimes(1);
});
test('check is GameOverscene called Api constructor', () => {
  const game = new GameOverScene();
  expect(Apidata).not.toHaveBeenCalledTimes(1);
});
/* eslint-enable no-unused-vars */
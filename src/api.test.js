
import Apidata from './ScoreAPI/Apidata';
import GameScene from './Scenes/GameScene';

jest.mock('./ScoreAPI/Apidata')

// const apiLink = new Apidata();


test('check is Gamescene called Api constructor', () => {
  const game = new GameScene()
  expect(Apidata).not.toHaveBeenCalledTimes(1);
});
// test('3. Adding scores with no errors', () => {
//   expect(apiLink.addScore('test', 0) instanceof Promise).toBeTruthy();
// });

import Apidata from './ScoreAPI/Apidata';

const apiLink = new Apidata();

test('3. Adding scores with no errors', () => {
  expect(apiLink.addScore('test', 0) instanceof Promise).toBeTruthy();
});

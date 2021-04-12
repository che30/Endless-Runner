export default {

  // platform speed range, in pixels per second
  platformSpeedRange: [230, 230],

  // mountain speed, in pixels per second
  mountainSpeed: 80,

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  // player starting X position
  playerStartPosition: 200,

  // consecutive jumps allowed
  jumps: 2,

  // % of probability a coin appears on the platform
  coinPercent: 25,

  // % of probability a fire appears on the platform
  firePercent: 25,
  // Array to store playerName
  playerName: [],
  // Score Array
  currentScore: [],

};

const lib = require('../lib/read');

const data = lib.read('input.txt');

function parseData(input) {
  const clearedData = input.split('\n');

  return clearedData.map(str => {
    const indexOfLabel = str.indexOf(':');
    return str.slice(indexOfLabel + 1, str.length).trim()
  })
}

const colorRegex = /(\d+)\s+(blue|green|red)/g;
const totalCubesByColor = {
  blue: 14,
  green: 13,
  red: 12,
}

function getIfDrawIsPossible(currentCubesInHandle) {
  const { blue, green, red } = currentCubesInHandle;
  
  const blueIsPossible = blue <= totalCubesByColor.blue;
  const greenIsPossible = green <= totalCubesByColor.green;
  const redIsPossible = red <= totalCubesByColor.red;

  return blueIsPossible && greenIsPossible && redIsPossible;
}

function getTotalCube(input) {
  return input.reduce((acc, curr) => ({
    ...acc,
    [curr[2]]: parseInt(curr[1]) + parseInt(acc[curr[2]])
  }), {
    blue: 0,
    green: 0,
    red: 0
  })
}

function checkDraw(handle) {
  const result = [...handle.matchAll(colorRegex)];
  const totalCubePerColor = getTotalCube(result);

  return getIfDrawIsPossible(totalCubePerColor);
}

function getIfGameIsPossible(game) {
  const draws = game.split(';');
  return draws.every(checkDraw)
}

function getPowerOfFewestCubeNeeded(game) {
  const draws = game.split(';');

  const result =  draws.reduce((acc, round) => {
    const { blue, green, red } = getTotalCube([...round.matchAll(colorRegex)]);

    return {
      blue: blue > acc.blue ? blue : acc.blue,
      green: green > acc.green ? green : acc.green,
      red: red > acc.red ? red : acc.red,
    }
  }, {
    blue: 0,
    green: 0,
    red: 0
  });

  return Object.values(result).reduce((acc, curr) => acc * curr, 1);
}

function countGames(input) {
  return input.reduce((acc, curr, index) => {
    const gameId = index + 1;

    const possibleGames = getIfGameIsPossible(curr);
    const powerNeeded = getPowerOfFewestCubeNeeded(curr);

    return {
      possibleGames: possibleGames ? acc.possibleGames + gameId : acc.possibleGames,
      powerNeeded: acc.powerNeeded + powerNeeded
    };
  }, {
    possibleGames: 0,
    powerNeeded: 0
  });
}

console.time("script");
const result = countGames(parseData(data))
console.log(result)
console.timeEnd("script");










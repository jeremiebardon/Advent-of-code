const lib = require('../lib/read');

const data = lib.read('input.txt');

const wordToDigit = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9'
};

function buildObjectMapping(regexIterator) {
  return regexIterator.reduce((acc, curr) => ({ 
    ...acc, 
    [curr.index]: wordToDigit[curr[0]]
  }), {});
}


function getRegexMatch(str) {
  const mapping = Object.entries(wordToDigit).reduce((acc, [key]) => {
    const regex = new RegExp(key, 'gi');
    const numberMatch = [...str.matchAll(regex)];

    if (!numberMatch?.length) return acc;

    const objectMapping = buildObjectMapping(numberMatch);
    return { ...acc, ...objectMapping };
  }, {});

  const result = Object.getOwnPropertyNames(mapping).map(key => mapping[key]).join('');

  return result
}

const result = data.split('\n')
  .map(str => getRegexMatch(str))
  .reduce((acc, curr) => {
    if (curr.length === 0) return acc;
    const result = curr[0] + curr[curr.length - 1]
    return acc + parseInt(result);
  }, 0);

console.log(result)








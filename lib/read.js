const fs = require('fs');

function read() {
  return fs.readFileSync('input.txt', 'utf8');
}

module.exports = {
  read
}

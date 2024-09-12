const fs = require('fs');

const readFile = (filename) => {
  const data = require(`../data/${filename}.json`);
  return data;
}

const updateFile = (filename, data) => {
  const changedData = JSON.stringify(data);
  fs.writeFileSync(`data/${filename}.json`, changedData);
}

module.exports = {
  readFile: readFile, 
  updateFile: updateFile
}
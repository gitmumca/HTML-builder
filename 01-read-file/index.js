const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');

const fs = require('fs');
const readableStream = fs.createReadStream(pathFile, 'utf-8');
readableStream.on('data', data => console.log(data));

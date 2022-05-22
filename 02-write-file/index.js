const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');

const fs = require('fs');
const readableStream = fs.createWriteStream(pathFile);

const { stdin, stdout } = process;

process.on('exit', () => {
  stdout.write('Come again! See you later!');
});

process.on('SIGINT', function () {
  process.exit();
});

stdin.on('data', data => {
  const str = data.toString();
  if (str.slice(0, str.length-2) == 'exit') {
    process.exit();
  } else {readableStream.write(data); }
});

stdout.write('Please, write the information for the new file. For end click "Ctrl+C" or write "exit"\n');

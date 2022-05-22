
const path = require('path');
const pathOld = path.join(__dirname, 'files');
const pathNew = path.join(__dirname, 'files-copy');
const { stdout } = process;

function copyDir() {
  const fs = require('fs');

  fs.readdir(pathNew, { withFileTypes: true }, function(err, items) {
    if (err) throw err;      
    items.forEach(function(el) {

      fs.unlink(path.join(pathNew, el.name), (err) => {
        if (err) throw err; 
        stdout.write(`Файл успешно удален ${el.name}\n`);
      });        
    });
  });

  fs.promises.mkdir(pathNew, { recursive: true }).then(function() {

    fs.readdir(pathOld, { withFileTypes: true }, function(err, items) {
      if (err) throw err;      
      items.forEach(function(el) {

        fs.copyFile(path.join(pathOld, el.name), path.join(pathNew, el.name), err => {
          if (err) throw err; 
          stdout.write(`Файл успешно скопирован ${el.name}\n`);
        });
      });
    });
  }).catch(function() {
    stdout.write('failed to create directory');
  });
}  

copyDir();


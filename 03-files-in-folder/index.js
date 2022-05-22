const path = require('path');
const pathDir = path.join(__dirname, 'secret-folder');
const { stdout } = process;

const fs = require('fs');
fs.readdir(pathDir, { withFileTypes: true }, function(err, items) {
  if (err) throw err;
 
  items.filter(el => el.isFile()).forEach(function(el) {
    let pathItem = path.join(pathDir, el.name);
    let name = el.name.split('.')[0];
    let ext = path.extname(pathItem).slice(1); 
    
    fs.stat(pathItem, function(name, ext) {
      return function(err, stats) {
        stdout.write(`${name} - ${ext} - ${(stats.size / 1024).toFixed(3)}kb\n`);
      }
    }(name, ext));
    
  });
});
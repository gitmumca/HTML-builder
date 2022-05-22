
const path = require('path');
const pathStyle = path.join(__dirname, 'styles');
const pathProject = path.join(__dirname, 'project-dist', 'bundle.css');
const { stdout } = process;

const fs = require('fs');
fs.readdir(pathStyle, { withFileTypes: true }, function(err, items) {
  if (err) throw err;      
  items.forEach(function(el) {
    if (path.extname(el.name) == '.css') {
      fs.readFile(path.join(pathStyle, el.name), 'utf8', function (err, data) {
        if (err) throw err;
        fs.appendFile(pathProject, '\n' + data.toString(), err => {
          if (err) throw err; 
          stdout.write(`Файл успешно добавлен ${el.name}\n`);
        });
      });
    }
  });
});  

const path = require('path');
const pathProject = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');
const pathComponents = path.join(__dirname, 'components');
const fileHTML = path.join(pathProject, 'index.html');
const fileCSS = path.join(pathProject, 'style.css');
const { stdout } = process;

const fs = require('fs');
// создаем каталог project-dist 
fs.promises.mkdir(pathProject, { recursive: true }).then(function() {

  // создаем каталог project-dist/assets 
  fs.promises.mkdir(path.join(pathProject, 'assets'), { recursive: true }).then(function () {

    // чтение assets
    fs.readdir(pathAssets, { withFileTypes: true }, function(err, itemsAssets) {
      if (err) throw err;      
      itemsAssets.forEach(function(el) {

        // копируем файл в корне assets
        let oldDir = path.join(pathAssets, el.name);
        if (el.isFile()) {
          fs.copyFile(path.join(pathAssets, el.name), path.join(pathProject, 'assets', el.name), err => {
            if (err) throw err; 
            stdout.write(`\n файл скопирован ${el.name}`);
          });
        // копируем каталоги в assets  
        } else {
          // создаем каталоги в project-dist/assets
          let newDir = path.join(pathProject, 'assets', el.name);
          fs.promises.mkdir(newDir, { recursive: true }).then(function () {
            fs.readdir(oldDir, { withFileTypes: true }, function(err, itemsFile) {
              itemsFile.forEach(function(elFile) {
                fs.copyFile(path.join(oldDir, elFile.name), path.join(newDir, elFile.name), err => {
                  if (err) throw err; 
//                  stdout.write(`\n 3/файл скопирован ${elFile.name}`);
                });
              });  
            }); 
          }).catch(function() {
            stdout.write(`\n 4/err создания ${newDir}`);
          });
        }    
      });
    });
    
  }).catch(function() {
    stdout.write('\n 3/err создания project-dist/assets');
  });

  // копируем шаблон в index.html
  fs.copyFile(path.join(__dirname, 'template.html'), fileHTML, err => {
    if (err) throw err; 
    stdout.write('\n 2/template.html скопирован в index.html');

    let dataWriteHTML;
    // вставляем .html в {{}}
    fs.readdir(pathComponents, { withFileTypes: true }, function(err, items) {
      if (err) throw err;   
      stdout.write('\n 2.1/читаем каталог');
      
      fs.readFile(fileHTML, 'utf8', function (err, dataWriteHTML) {
        if (err) throw err; 
        stdout.write('\n 2.2/открыт index.html');

        items.forEach(function(el) {
          if (path.extname(el.name) == '.html') {
            fs.readFile(path.join(pathComponents, el.name), 'utf8', function (err, data) {
              if (err) throw err;
              let regExp = new RegExp('{{' + (el.name).split('.')[0] + '}}', 'g');
              dataWriteHTML = dataWriteHTML.replace(regExp, data);

              stdout.write(`\n 2.3/открыт ${el.name}`);
              fs.writeFile(fileHTML, dataWriteHTML, 'utf8', function (err) {
                if (err) throw err; 
                stdout.write(`\n html - ${el.name}`);
              });
              stdout.write(`\n 2.4/записан ${el.name}`);
            });  
          }  
        });
      });
    });  
  });
}).catch(function() {
  stdout.write('\n 1/err создания project-dist');
});

// добавляем .css в файл style.css
fs.readdir(pathStyles, { withFileTypes: true }, function(err, items) {
  if (err) throw err;      
  items.forEach(function(el) {
    if (path.extname(el.name) == '.css') {
      fs.readFile(path.join(pathStyles, el.name), 'utf8', function (err, data) {
        if (err) throw err;
        fs.appendFile(fileCSS, data + '\n', err => {
          if (err) throw err; 
//          stdout.write(`\n 5/css добавлен ${el.name}`);
        });
      });
    }
  });
});  




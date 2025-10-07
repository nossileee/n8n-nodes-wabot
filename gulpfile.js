// gulpfile.js
const { task, src, dest } = require('gulp');
const path = require('path');

// Esta tarefa copia a pasta 'icons' para dentro da pasta 'dist'
function copyIcons() {
  const source = path.resolve('icons', 'wabot.png'); // Caminho do seu ícone
  const destination = path.resolve('dist', 'icons'); // Pasta de destino
  return src(source).pipe(dest(destination));
}

task('copy-assets', copyIcons);
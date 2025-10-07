const path = require('path');
const { src, dest, task, parallel } = require('gulp');

// Copia ícones dos nodes -> dist/nodes
function copyNodeAssets() {
  const from = path.resolve('nodes', '**', '*.{png,svg}');
  const to = path.resolve('dist', 'nodes');
  return src(from, { allowEmpty: true }).pipe(dest(to));
}

// Copia ícones das credenciais -> dist/credentials
function copyCredentialAssets() {
  const from = path.resolve('credentials', '**', '*.{png,svg}');
  const to = path.resolve('dist', 'credentials');
  return src(from, { allowEmpty: true }).pipe(dest(to));
}

// Gera a task "copy-assets" (usada pelo seu npm run build)
task('copy-assets', parallel(copyNodeAssets, copyCredentialAssets));

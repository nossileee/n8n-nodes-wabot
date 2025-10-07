// gulpfile.js
const path = require('path');
const { task, src, dest } = require('gulp');

function copyAssets() {
  const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
  const nodeDestination = path.resolve('dist', 'nodes');
  return src(nodeSource).pipe(dest(nodeDestination));
}

task('copy-assets', copyAssets);
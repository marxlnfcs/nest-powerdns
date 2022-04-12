const fs = require('fs');
const path = require('path');

// copy files to dist folder
for(let file of ['README.md', 'package.json', 'LICENSE', '.npmignore']){
    fs.copyFileSync(file, path.join(__dirname, 'dist', file));
}

// read package.json
const packageJson = path.join(__dirname, 'dist/package.json');
const packageJsonContent = JSON.parse(fs.readFileSync(packageJson).toString());

// remove all scripts and directories
delete packageJsonContent['scripts'];
delete packageJsonContent['directories'];

// remove all devDependencies
delete packageJsonContent.devDependencies;

// save package.json
fs.writeFileSync(packageJson, JSON.stringify(packageJsonContent, null, 3));
'use strict';

const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '../package.json');
const manifestJsonPath = path.join(__dirname, '../public/manifest.json');
const sharedConstsPath = path.join(__dirname, '../src/models/constants.ts');
const packageJson = require('../package.json');
const manifestJson = require('../public/manifest.json');

function logErrorInfo() {
  console.error('Please run one of the following:');
  console.error('  yarn bump patch');
  console.error('  yarn bump minor');
  console.error('  yarn bump major');
}

if (process.argv.length !== 3) {
  console.error('ERR: missing expected argument!');
  logErrorInfo();
  process.exit(1);
}

let newVersionArr = packageJson.version.split('.');
switch (process.argv[2]) {
case 'patch':
  newVersionArr[2]++;
  break;
case 'minor':
  newVersionArr[1]++;
  newVersionArr[2] = 0;
  break;
case 'major':
  newVersionArr[0]++;
  newVersionArr[1] = 0;
  newVersionArr[2] = 0;
  break;
default:
  console.error(`ERR: Invalid argument: ${process.argv[2]}.`);
  logErrorInfo();
  process.exit(1);
}

let newVersion = newVersionArr.join('.');
packageJson.version = newVersion;
manifestJson.version = newVersion;

fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
  if (err) return console.error(err);
  console.log(`Bumped package.json to ${newVersion}.`);
});

fs.writeFile(manifestJsonPath, JSON.stringify(manifestJson, null, 2), (err) => {
  if (err) return console.error(err);
  console.log(`Bumped manifest.json to ${newVersion}.`);
});

fs.readFile(sharedConstsPath, 'utf8', (err, sharedData) => {
  if (err) return console.error(err);
  const bumpedSharedData = sharedData.replace(/\d+\.\d+\.\d+/, newVersion);
  fs.writeFile(sharedConstsPath, bumpedSharedData, 'utf8', (err) => {
    if (err) return console.error(err);
  });
  console.log(`Bumped VERSION in shared.ts to ${newVersion}.`);
});

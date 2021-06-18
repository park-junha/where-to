'use strict';

const fs = require('fs').promises;
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const MANIFEST_JSON_PATH = path.join(__dirname, '../public/manifest.json');
const SHARED_CONSTS_PATH = path.join(__dirname,
  '../src/models/constants.ts');

if (process.argv.length !== 3) {
  console.error('Missing expected argument (version number to check)');
  process.exit(1);
}

async function getVersions() {
  const packageJson = await fs.readFile(PACKAGE_JSON_PATH, 'utf8',
    () => {});
  const manifestJson = await fs.readFile(MANIFEST_JSON_PATH, 'utf8',
    () => {});
  const consts = await fs.readFile(SHARED_CONSTS_PATH, 'utf8', () => {});

  return [
    JSON.parse(packageJson).version,
    JSON.parse(manifestJson).version,
    consts.match(/\d+\.\d+\.\d+/g)[0]
  ];
};

async function checkBump() {
  try {
    const versions = await getVersions();
    if (versions.some(v => v === undefined)){
      throw 'One or more of the versions in package.json, ' +
        'manifest.json, and constants.ts are undefined.';
    };

    if (new Set(versions).size !== 1) {
      throw 'Versions in package.json, manifest.json, and ' +
        'constants.ts are inconsistent.';
    };

    if (process.argv[2] === versions[0]) {
      throw `Source code versions are at ${versions[0]} and needs bumps.`
    }
  } catch(err) {
    throw err;
  };
};

checkBump().catch((err) => {
  console.error(err);
  process.exit(1);
});

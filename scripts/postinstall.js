#!/usr/bin/env node

const { copySync } = require('fs-extra');
// const git = require('simple-git/promise')(__dirname + '/../');

copySync(__dirname + '/../node_modules/ftb-cmp/dist/collection/assets/', __dirname + '/../src/assets', { overwrite: false });
// git.add(__dirname + '/../src/assets');

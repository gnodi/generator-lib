'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@gnodi/lib', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts({'lib.name': 'test'})
      .on('end', done)
    ;
  });

  it('should create files', () => {
    assert.file([
      'package.json',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'index.js',
      'LICENSE',
      'README.md',
      '.travis.yml'
    ]);
  });

  it('should create files from given prompt values', () => {
    assert.fileContent('README.md', /^# @gnodi\/test/);
  });
});

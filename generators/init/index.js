'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.package = this.fs.readJSON(
      this.destinationPath('package.json')
    );
  }

  install() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', '"Initialize project"']);
    this.spawnCommandSync('git', ['remote', 'add', 'origin', this.package.repository.url]);
    this.spawnCommandSync('git', ['push', 'origin', 'master']);
  }
}

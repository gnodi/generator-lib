'use strict';

const chalk = require('chalk');
const yosay = require('yosay');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Set option allowing to skip the installation step.
    this.option('skipInstall');
  }

  prompting() {
    const pack = this.fs.readJSON(this.destinationPath('package.json'), {});
    const author = pack.author && pack.author.match(/^([^<]*)<([^>]*)>\s*\(([^)]*)\)/);
    const defaults = {
      lib: {
        name: (pack.name && pack.name.split('/')[1]) || this.appname,
        description: pack.description || '',
        dev: true
      },
      author: {
        name: (author && author[1] && author[1].trim()) || 'John Doe',
        email: (author && author[2]) || 'john.doe@gnodi.com',
        url: (author && author[3]) || 'https://github.com/gnodi'
      }
    };

    // Define prompt.
    return this.prompt([
      {
        type: 'input',
        name: 'lib.name',
        message: 'Your lib name',
        default: defaults.lib.name
      },
      {
        type: 'input',
        name: 'lib.description',
        message: 'A description of your lib',
        default: defaults.lib.description
      },
      {
        type: 'confirm',
        name: 'lib.dev',
        message: 'Is it a dev dependency?',
        default: defaults.lib.dev
      },
      {
        type: 'input',
        name: 'author.name',
        message: 'Your name',
        default: defaults.author.name
      },
      {
        type: 'input',
        name: 'author.email',
        message: 'Your email',
        default: defaults.author.email
      },
      {
        type: 'input',
        name: 'author.url',
        message: 'Your URL',
        default: defaults.author.url
      }
    ]).then((answers) => {
      // Format answers.
      const formattedAnswers = {};

      Object.keys(answers).forEach((key) => {
        const answer = answers[key];
        const keySections = key.split('.');
        let answerProperty = formattedAnswers;

        keySections.forEach((section, i) => {
          if (i === keySections.length - 1) {
            answerProperty[section] = answer;
          } else if (!answerProperty[section]) {
            answerProperty[section] = {};
          }

          answerProperty = answerProperty[section];
        });
      });

      this.params = formattedAnswers;

      // Add date parameter.
      this.params.date = new Date();
    });
  }

  writing() {
    // Copy boilerplate files.
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.params
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      this.params
    );
    this.fs.copyTpl(
      this.templatePath('-package.json'),
      this.destinationPath('package.json'),
      this.params
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.params
    );
    this.fs.copy(
      this.templatePath('travis.yml'),
      this.destinationPath('.travis.yml')
    );
  }

  install() {
    if (!this.options.skipInstall) {
      // Install dependencies.
      this.npmInstall();
    }
  }

  /* eslint-disable class-methods-use-this, no-console */
  end() {
    console.log(yosay(
      chalk.bold.green('Congratulations!') +
      chalk.green(' You') +
      chalk.green(' have') +
      chalk.green(' successfully') +
      chalk.green(' generated') +
      chalk.green(' a') +
      chalk.green(' gnodi') +
      chalk.green(' lib!')
    ));
    console.log(chalk.bold('Follow these steps to finalize the initialization:'));
    console.log('1-Create the repository on github with no readme and gitignore files at:');
    console.log(chalk.cyan('   https://github.com/organizations/gnodi/repositories/new'));
    console.log('2-Enable the repository on travis at:');
    console.log(chalk.cyan('   https://travis-ci.org/profile/gnodi'));
    console.log('3-Execute the generator initialization command:');
    console.log(chalk.cyan('   yo @gnodi/lib:init'));
  }
  /* eslint-enable class-methods-use-this, no-console */
};

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
    // Define prompt.
    return this.prompt([
      {
        type: 'input',
        name: 'lib.name',
        message: 'Your lib name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'lib.description',
        message: 'A description of your lib',
        default: ''
      },
      {
        type: 'confirm',
        name: 'lib.dev',
        message: 'Is it a dev dependency?',
        default: true
      },
      {
        type: 'input',
        name: 'author.name',
        message: 'Your name',
        default: 'John Doe'
      },
      {
        type: 'input',
        name: 'author.email',
        message: 'Your email',
        default: 'john.doe@gnodi.com'
      },
      {
        type: 'input',
        name: 'author.url',
        message: 'Your URL',
        default: 'https://github.com/gnodi'
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

    console.log(yosay(chalk.bold.green('Congratulations!')));
  }
}

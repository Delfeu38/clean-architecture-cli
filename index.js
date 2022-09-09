#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';

// todo check language

const questions = [
    {
        type: 'list',
        name: 'command',
        message: 'Clean Architecture CLI',
        choices: ['createFolder', 'sonar', '']
    },
    {
        type: 'input',
        name: 'arg',
        message: 'argument'
    }
];

if (process.argv.length > 3) {
    const command = process.argv[2];
    const arg = process.argv[3];
    executeCmd(command, arg);
} else {
    inquirer.prompt(questions).then(answer => {
        executeCmd(answer.command, answer.arg);
    });
}

function executeCmd(command, arg) {
    if (command === 'createFolder') {
        createFolder(arg)
    }
}


function createFolder(pathDirectory) {
    // todo check if path is lower case and contains only hyphenss
    console.log('createFolder ' + pathDirectory);
    if (fs.existsSync(pathDirectory)) return;

    fs.mkdirSync(pathDirectory, {recursive: true});
    fs.mkdirSync(pathDirectory + '/data');
    fs.mkdirSync(pathDirectory + '/domain');
    fs.mkdirSync(pathDirectory + '/presentation');

    const directory = /[^/]*$/.exec(pathDirectory)[0];

    // todo make class name in camel-case

    fs.writeFileSync(pathDirectory + '/domain/' + directory + '.use-case.ts', `export class ${directory}UseCase {}`);
}
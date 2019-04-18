const exec = require('child_process').exec;
const params = require('minimist')(process.argv.slice(2));

const APPS_PATH = require('../consts/appsPath');
const DEPENDENCY = require('../consts/dependency');

function run() {
    console.log(params, 'params');

    const {app, action} = params;

    const actionString = `${formatDownAction(app)}${action === 'down' ? '' : ' && ' + formatUpAction(app)}`;

    console.log(actionString, 'actionString');
    exec(actionString, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.error(err);
            process.exit(1);
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout:\n${stdout}`);
        console.log(`stderr:\n${stderr}`);
        process.exit(0);
    });
}

module.exports = { run };

function formatUpAction(app) {
    let actionString = '';

    for (let i = 0; i < DEPENDENCY[app].length; i++) {
        if (actionString !== '') actionString += ' && ';
        actionString += getUpAction(DEPENDENCY[app][i]);
    }

    return actionString;
}

function formatDownAction(app) {
    let actionString = '';

    for (let i = DEPENDENCY[app].length - 1; i >= 0; i--) {
        if (actionString !== '') actionString += ' && ';
        actionString += getDownAction(DEPENDENCY[app][i]);
    }

    return actionString;
}

function getUpAction(app) {
    return `${goToPath(APPS_PATH[app])}${dockerUp()}`;
}

function getDownAction(app) {
    return `${goToPath(APPS_PATH[app])}${dockerDown()}`;
}

function dockerUp() {
    return ' && docker-compose up -d';
}

function dockerDown() {
    return ' && docker-compose down';
}

function goToPath(path) {
    return `cd ${path}`;
}
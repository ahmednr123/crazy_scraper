const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');

const logger = require('./logger');
const t_color = require('./t_color');
const script = require('../script');

class _events extends events {};

let e = new _events();

let cli = {};

let _interface = null;

e.on('start', (str) => {
    cli.responders.start(str);
})

e.on('help', (str) => {
    cli.responders.help();
})

e.on('quit', () => {
    process.exit(0);
})

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

cli.responders = {};

cli.responders.start = async (str) => {
    let arr = str.split(' ');
    
    if(has(script, arr[1])){
        logger.log('Starting script: ' + arr[1], {Font:'Yellow'})
        await script[arr[1]]();
    } else
        console.log(t_color.make({Font:'Red', Background:'White'}) , "Script '"+arr[1]+"' not found")

    makePrompt();
}

cli.responders.help = () => {
    console.log('Start a scraper script')
    console.log('Start [script name]')
    makePrompt();
}

cli.processInput = (str) => {

    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

    if (str) {
        let uniqueInput = ['start', 'help', 'quit'];

        let matchFound = false;
        let counter = 0;
        uniqueInput.some((input) => {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;

                e.emit(input, str);
                return true;
            }
        })

        if (!matchFound){
            console.log('Sorry, try again!');
            makePrompt();
        }

    }
}

cli.init = () => {
    console.log(t_color.make({Font:'Cyan'}), "The CLI is running")

    makePrompt();
}

function makePrompt() {
    _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\n> '
    });

    _interface.prompt();

    _interface.on('line', (str) => {
        console.log();
        _interface.close();
        cli.processInput(str);
    });
}

module.exports = cli;
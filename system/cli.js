const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events')

const logger = require('./logger');
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

e.on('_prompt', () => {
    if(_interface)
        _interface.prompt();
})

e.on('quit', () => {
    process.exit(0);
})

cli.responders = {};

cli.responders.start = async (str) => {
    let arr = str.split(' ');
    logger.log('Starting script: ' + arr[1], {Font:'Yellow'})
    await script[arr[1]]();
    e.emit('_prompt');
}

cli.responders.help = () => {
    console.log('Start a scraper script')
    console.log('Start [script name]')
    e.emit('_prompt');
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

        if (!matchFound)
            console.log('Sorry, try again!')

    }
}

cli.init = () => {

    console.log('\x1b[34m%s\x1b[0m', "The CLI is running")

    _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\n> '
    });

    _interface.prompt();

    _interface.on('line', (str) => {

        _interface.pause();
        console.log();
        
        cli.processInput(str);
    });

    _interface.on('close', () => {
        process.exit(0);
    });

}

module.exports = cli;
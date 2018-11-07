const readline = require('readline');

const utils = {}

utils.extractEmails = (str) => {
    return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

module.exports = utils;
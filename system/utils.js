const readline = require('readline');

const utils = {}

utils.extractEmails = (str) => {
    return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

utils.input = (question) => {
	const rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});

	return new Promise((resolve, reject) => {
		rl.question(question, (answer) => {
			resolve(answer)
			rl.close();
		})
	})
}

module.exports = utils;
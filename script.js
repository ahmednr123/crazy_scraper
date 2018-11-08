const utils = require('./system/utils')
const sc = require('./system/scraper')
const logger = require('./system/logger')

const script = {}

script.ex = async() => {

	let url = 'https://www.actcorp.in/customer-care';
	
	await sc.init();
	
	await sc.goto(url);

	let html = sc.bodyHTML;
	logger.log_arr("Extracted", utils.extractEmails(html));
}

module.exports = script;
const utils = require('./system/utils')
const Scraper = require('./system/scraper')

const script = {}

script.email_extractor = () => {
	let url = 'https://www.actcorp.in/customer-care';
	
	const sc = new Scraper();
	sc.goto(url);
	
	document = sc.document;

	let html = document.body.innerHTML;

	logger.log_arr("Extracted", utils.extractEmails(html));
}

module.exports = script;
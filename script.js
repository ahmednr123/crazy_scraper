const utils = require('./system/utils')
const sc = require('./system/scraper')

const script = {}

script.ex = async() => {
	let url = 'https://www.actcorp.in/customer-care';
	
	await sc.init();
	
	await sc.goto(url);

	//document = sc.document;

	let html = sc.document.body.innerHTML;
	console.log('YOLO');

	logger.log_arr("Extracted", utils.extractEmails(html));
}

module.exports = script;
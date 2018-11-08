const utils = require("./system/utils")
const sc = require("./system/scraper")
const logger = require("./system/logger")

const t_color = require("./system/t_color")

const script = {}

script.ex = async() => {

	let search_term = await utils.input("Enter the search term: ");
	search_term = search_term.trim();

	if(search_term.length == 0){
		console.log(t_color.make({Font:'Red', Background:'White'}), "Cannot search an empty string");
		return;
	}

	let url = "https://duckduckgo.com/?q=" + search_term.split(' ').join('+');
	
	await sc.init();
	
	await sc.goto(url);

	//await sc.page.screenshot({path: 'sc.png'});

	let result_json = await sc.page.evaluate(() => {
		let results = document.getElementsByClassName('result__body');
		
		//return results[0].getElementsByClassName('result__a')[0].textContent + results[0].getElementsByClassName('result__a')[0].getAttribute('href');
		let final_out = [];

		for(let i = 0; i < results.length; i++){
			let json = {name: '', url: ''};
			json.name = results[i].getElementsByClassName('result__a')[0].textContent;
			json.url = results[i].getElementsByClassName('result__a')[0].getAttribute('href');
			console.log(json.name + " " + json.url);
			final_out.push(json);
		}

		return final_out;
	});

	for(let i = 0; i < result_json.length; i++)
		logger.log("\n\tName: " + result_json[i].name + ",\n\t Link: " + result_json[i].url);

	//let html = sc.bodyHTML;
	//logger.log_arr("Extracted", utils.extractEmails(html));
}

module.exports = script;
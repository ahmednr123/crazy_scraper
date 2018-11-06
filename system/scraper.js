const puppeteer = require('puppeteer');
const logger = require('./logger');

let url = 'https://www.actcorp.in/customer-care';
let emails = [];

function extractEmails(str) {
    return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    logger.web_log('Connecting...', url, {Font:'Yellow'});
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    /*await page.evaluate(() => {
        return document;
    });*/

    //await browser.close();
})();
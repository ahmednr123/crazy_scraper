const puppeteer = require('puppeteer');
const logger = require('./logger');

/*let url = 'https://www.actcorp.in/customer-care';

const scraper = async(script) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    logger.web_log('Connecting...', url, {Font:'Yellow'});
    await page.goto(url, {waitUntil: 'networkidle2'});

    const document = await page.evaluate(() => {
        return document;
    });

    script(document);

    await browser.close();
};

const scraper = {};

scraper.browser = null;
scraper.page = null;

scraper.url = null

scraper.init = () => {
    if(scraper)
    return 0;
}*/

class Scraper{

    constructor(){
        let browser = null;
        let page = null;

        await (async() => {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox']
            });

            logger.log('Creating new page', {Font:'Yellow'})
            page = await browser.newPage();

            
        })();

        this.browser = browser;
        this.page = page;
        
    }

    goto(url) {
        this.url = url;
        let document = null;

        console.log('1');

        await (async() => {
            logger.web_log('Connecting...', url, {Font:'Yellow'});
            await page.goto(url, {waitUntil: 'networkidle2'});
            document = await page.evaluate(() => document);
            console.log('2');
        })();
        
        this.document = document;

        console.log('3');
        
        
    }

}

module.exports = Scraper;
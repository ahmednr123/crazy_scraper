const puppeteer = require('puppeteer');
const logger = require('./logger');

const utils = require('./utils')

const scraper = {}

scraper.browser = null;
scraper.page = null;
scraper.document = null;
scraper.bodyHTML = null;

scraper.init = async() => {
    scraper.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    logger.log('Creating new page', {Font:'Yellow'})
    scraper.page = await scraper.browser.newPage();
}

scraper.goto = async(url) => {
    logger.web_log('Connecting...', url, {Font:'Yellow'});
    await scraper.page.goto(url, {waitUntil: 'networkidle2'});
    scraper.bodyHTML = await scraper.page.evaluate(() => document.body.innerHTML);
}

scraper.close = async() => {
    await scraper.browser.close();
}

module.exports = scraper;
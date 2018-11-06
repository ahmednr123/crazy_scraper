const puppeteer = require('puppeteer');
const fs = require('fs');

let url = '';
let emails = [];

function extractEmails(str) {
    return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    await page.evaluate(() => {
        let html = document.body.innerHTML;
        emails.concat(extractEmails(html));
    });

    //fs.writeFileSync('problem_meta.json', json_str, 'utf8');

    await browser.close();
})();
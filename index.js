const puppeteer = require('puppeteer');
const fs = require('fs/promises');
// const website = 'https://www.bestbuy.ca/en-ca/product/sonos-arc-sound-bar-black/14597172';
const website = 'https://www.amazon.ca/dp/B09F1QQZM2';

// puppeteer tutorial https://youtube.com/watch?v=lgyszZhAZOI&feature=shares
async function scrapeBestBuy() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.click('#reviews');
    await page.waitForSelector('.reviewTitle_1qq1j span', {visible: true});
    await page.screenshot({ path: "website.png", fullPage: true });
    const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.reviewContent_XCspv p span')).map(x => x.textContent)
    });
    console.log(reviews);
    await fs.writeFile('reviews.txt', reviews.join('\r\n'));
    await browser.close();
}

async function scrapeAmazon() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.screenshot({ path: "website.png", fullPage: true });
    const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div.a-expander-content.reviewText.review-text-content.a-expander-partial-collapse-content > span')).map(x => x.textContent)
    });
    console.log(reviews);
    await fs.writeFile('reviews.txt', reviews.join('\r\n'));
    await browser.close();
}

// scrapeBestBuy();
scrapeAmazon();
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const testWebsite = 'https://www.bestbuy.ca/en-ca/product/sonos-arc-sound-bar-black/14597172';
// const testWebsite = 'https://www.amazon.ca/dp/B09F1QQZM2';

// puppeteer tutorial https://youtube.com/watch?v=lgyszZhAZOI&feature=shares
function callThisOne(website) {
    let reviewSelector;
    if (website.includes('bestbuy')) {
        reviewSelector = '.reviewContent_XCspv p span';
    }
    else if (website.includes('amazon')) {
        reviewSelector = 'div.a-expander-content.reviewText.review-text-content.a-expander-partial-collapse-content > span';
    }
    (async () => {
        console.log(await scrapeWebsite(website, reviewSelector))
    })()
}

async function scrapeWebsite(website, reviewSelector) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    if (website.includes('bestbuy')) {
        await page.click('#reviews');
        await page.waitForSelector('.reviewTitle_1qq1j span', {visible: true});
    }
    await page.screenshot({ path: "website.png", fullPage: true });
    const reviews = await page.evaluate((reviewSelector) => {
        return Array.from(document.querySelectorAll(reviewSelector)).map(x => x.textContent)
    }, reviewSelector);
    await fs.writeFile('reviews.txt', reviews.join('\r\n'));
    await browser.close();
    return reviews;
}

callThisOne(testWebsite);
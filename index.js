const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const website = 'https://www.bestbuy.ca/en-ca/product/samsung-hw-b450-zc-300-watt-2-1-channel-sound-bar-with-wireless-subwoofer/16000037';

// puppeteer tutorial https://youtube.com/watch?v=lgyszZhAZOI&feature=shares
async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.click('#reviews');
    // currently doesn't wait long enough
    // await page.waitForSelector('.reviewTitle_1qq1j span', {visible: true});
    await delay(2000);
    await page.screenshot({ path: "bestbuy.png", fullPage: true });
    const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".reviewContent_XCspv p span")).map(x => x.textContent)
    });
    console.log(reviews);
    await fs.writeFile('reviews.txt', reviews.join('\r\n'));
    await browser.close();
}

start();

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
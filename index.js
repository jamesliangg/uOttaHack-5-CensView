const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const website = 'https://www.bestbuy.ca/en-ca/product/samsung-hw-b450-zc-300-watt-2-1-channel-sound-bar-with-wireless-subwoofer/16000037';

// puppeteer tutorial https://youtube.com/watch?v=lgyszZhAZOI&feature=shares
async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    // await page.screenshot({ path: "bestbuy.png", fullPage: true });
    const reviews = ['great product','terrible product','okay product'];
    await fs.writeFile('reviews.txt', reviews.join('\r\n'));
    await browser.close();
}

start();
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', (request, response) => {
    response.send('Olá mundo')
});


app.listen(3000, () => {
    console.log('Servidor subiu')
});

; (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');


    //await browser.close();
})();
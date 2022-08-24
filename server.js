// Imports necessários
const express = require('express');
const puppeteer = require('puppeteer');

// Instanciando o express
const app = express();

// Criando um requisição GET
app.get('/', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');
    // Captura de dados
    const lenovos = await page.evaluate(() => {
        //Declarando variaveis
        var notebooks = []
        var notebook = {}
        var count = 1
        var length = document.querySelectorAll('body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div').length

        //Percorrendo o HTML e coletando os dados de cada notebook
        while (count < length) {
            //Criando o objeto que armazenará as informações de cada notebook
            notebook = {
                id: count,
                title: document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.caption > h4:nth-child(2) > a`).getAttribute('title'),
                price: document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.caption > h4.pull-right.price`).innerText,
                url: "https://webscraper.io" + document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.caption > h4:nth-child(2) > a`).getAttribute('href'),
                description: document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.caption > p`).innerText,
                reviews: document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.ratings > p.pull-right`).innerText,
                rate: document.querySelector(`body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div:nth-child(${count}) > div > div.ratings > p:nth-child(2)`).getAttribute('data-rating')
            },
                //Salvando o objeto na lista de notebooks
                notebooks.push(notebook)
            count = count + 1
        };

        return notebooks;
    })
    //retornando a lista de notebooks para cliente
    response.send(lenovos)
});
//await browser.close();

// Declarando a porta para o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor subiu, acesse em: http://localhost:${port}`)
});
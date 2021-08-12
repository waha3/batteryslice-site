'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const url = 'http://www.ksjll.com';

module.exports = async () => {
  const browser = await puppeteer.launch();

  const sleep = num => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, num * 1000);
    });
  };

  async function downloadImage(list) {
    const page = await browser.newPage();

    for (const i of list) {
      for (const j of i) {
        const source = await page.goto(j.imgUrl);
        const directory = path.resolve(
          process.cwd(),
          'app/public/images/spider'
        );
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }

        try {
          fs.writeFileSync(
            path.resolve(directory, `${j.productId}.jpg`),
            await source.buffer()
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async function getProducts() {
    const page = await browser.newPage();
    await page.goto(url);

    const productClassSelector = '.hjnavleft > ul > li';

    const productClassList = await page.evaluate(productClassSelector => {
      const list = Array.from(document.querySelectorAll(productClassSelector));
      return list.map(item => item.innerText);
    }, productClassSelector);

    const productDetailSelector = '.hjnavcn .hjone';
    const productDetail = await page.evaluate(productDetailSelector => {
      const list = Array.from(document.querySelectorAll(productDetailSelector));

      let id = 0;
      const detailList = list.map(item => {
        const inner = Array.from(item.querySelectorAll('.inner'));

        return inner.map(childItem => {
          const imgUrl = childItem.querySelector('img').src;
          const productId = ++id;
          return {
            imgUrl,
            title: childItem.querySelector('.albumtitle').innerText,
            link: childItem.querySelector('.albumtitle a').href,
            productId,
          };
        });
      });
      return detailList;
    }, productDetailSelector);

    const detailDescSelector = '.maincontent nav p';
    const descList = [];

    for (const i of productDetail) {
      for (const j of i) {
        await sleep(0.1);
        await page.goto(j.link);

        const data = await page.$$eval(
          detailDescSelector,
          options => options.map(option => option.innerText),
          j
        );
        descList.push({
          p: data,
          productId: j.productId,
        });
      }
    }
    await downloadImage(productDetail);
    await browser.close();

    return {
      productClassList,
      productDetail,
      descList,
    };
  }

  return getProducts();
};

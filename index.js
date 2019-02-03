const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const url = ctx.request.query.u
  console.log(ctx.request.query)
  ctx.body = await crawler(url)
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(bodyParser())
    .listen(process.env.PORT || 3000)

const puppeteer = require('puppeteer');
const LAUNCH_OPTION = process.env.DYNO ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : { headless: false };

const crawler = async (url) => {
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const newsTitles = await page.evaluate(() => {
    // const elenemts = document.querySelectorAll('.itemlist .title > a');
    const elenemts = document.querySelectorAll('title');
    return [].map.call(elenemts, el => el.innerText);
  });
  const jpgBuf = await page.screenshot({ fullPage: true, type: 'jpeg' });

  await browser.close();
  return jpgBuf;
}

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.assert(ctx.request.query.u, 403, 'Parameter u is required!');
  const url = ctx.request.query.u
  const status = await crawler(url)
  status.headers.forEach((v) => {
      ctx.set(v.key, v.value)
  });
  ctx.body = status.body
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .listen(process.env.PORT || 3000)

const puppeteer = require('puppeteer');
const LAUNCH_OPTION = process.env.HEADLESS ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : { headless: false };

const crawler = async (url) => {
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  page.setViewport({width: 1200, height: 800});

  await page.goto(url, { waitUntil: 'networkidle2' });
  const bufScreenshot = await page.screenshot({ fullPage: true, type: 'png'});

  await browser.close();
  return {
    body: bufScreenshot,
    headers: [
      {key: 'Content-Type', value: 'image/png'},
      {key: 'Content-Disposition', value: 'inline'},
    ]
  }
}

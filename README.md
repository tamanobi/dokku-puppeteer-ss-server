# dokku-puppeteer-ss-server
Simple screenshot server. Visit https://your-server/?u=https://www.google.co.jp, and get a screenshot of www.google.co.jp.

- dokku
- koa
- puppeteer
- Google Chrome

This supports Japanese because it uses [Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan).

# setup
1. `yarn install`

# usage(local)
1. `HEADLESS=1 node index.js`
1. visit http://localhost and add `?u=https://www.google.com` to query parameter

# dependencies
- https://github.com/F4-Group/dokku-apt

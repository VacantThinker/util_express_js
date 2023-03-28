
## how to use ?

#### dir
```text
router/
  notice.router.js
  open.router.js
  
xxx.js                  <===
util.express.js
```

#### in xxx.js, --> node xxx.js --> generator util.express.js file
```javascript
geneUtilExpressJs()
```

#### util.express.js

```javascript
function setupRouterList(app, passdata) {
  const noticeRouter = require('./router/notice.router.js');
  const openRouter = require('./router/open.router.js');
  app.use('/notice', noticeRouter(passdata));
  app.use('/open', openRouter(passdata));
}
module.exports = {
  setupRouterList: setupRouterList
};
```

#### in your app.js (express)

```javascript
require('./util.express').setupRouterList(app, passdata);
```

---

## works
#### geneUtilExpressJs()
```javascript
/**
 *
 * you must have router dir
 *
 * and your router file like this
 *
 * eg: router/user.router.js
 *
 *     router/xxxx.router.js
 *
 *
 * read router/ dir,
 *
 * gene util.express.js file
 *
 * file content like below:
 *
 *
 * function setupRouterList(app, passdata) {
 *
 * const noticeRouter = require('./router/notice.router.js');
 *
 * const openRouter = require('./router/open.router.js');
 *
 * app.use('/notice', noticeRouter(passdata));
 *
 * app.use('/open', openRouter(passdata));
 *
 * }
 *
 * module.exports = {setupRouterList: setupRouterList};
 *
 * @param filename util.express.js is the default name
 * @param logIt
 */
function geneUtilExpressJs(
    filename = null,
    logIt = false,
) {}
```



---

## how to install ?
```shell
npm install @vacantthinker/util_express_js -D
```



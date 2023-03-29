
## how to use ?

#### dir
```text
express-project/
  server/
    router/
      notice.router.js
      open.router.js
  
    util.express.js  <=== (generator by xxx.js geneUtilExpressJs() )
    app.js (const app = express() )
  
  xxx.js  <=== (node xxx.js)
```

#### in xxx.js
```javascript
const {geneUtilExpressJs} = require('@vacantthinker/util_express_js');
geneUtilExpressJs()
```

#### generator util.express.js
```shell
node xxx.js
```

#### util.express.js

```javascript
'use strict';

function setupRouterList(app, passdata) {
  const noticeRouter = require('./router/notice.router.js');
  const openRouter = require('./router/open.router.js');
  app.use('/notice', noticeRouter(passdata));
  app.use('/open', openRouter(passdata));
}
module.exports = {
  setupRouterList: setupRouterList
}
```

#### in your app.js (express)

```javascript
require('./util.express').setupRouterList(app, passdata);
app.listen(3000, async () => {
  console.log(`running 3000`);
});
```

---


## how to install ?
```shell
npm install @vacantthinker/util_express_js -D
```



const fs = require('fs');
const path = require('path');
const stringList = {
  // 'router'
  string_router: 'router',
  // 'server'
  string_server: 'server',
  // 'util.express.js'
  filename_util_express: 'util.express.js',
};

/**
 * read dir router/
 *
 * router/
 *
 * notice.router.js
 *
 * open.router.js
 *
 * conver to -->
 *
 * const noticeRouter = require('./router/notice.router.js');
 *
 * app.use('/notice', noticeRouter(passdata));
 *
 *
 * @param pathRouter
 * @param logIt
 * @returns {*}
 */
function geneText(
    pathRouter,
    logIt = false) {

  let filenameList = fs.readdirSync(pathRouter);
  const textArr = [];
  let lineEnter = `\n`;
  textArr.pushItem = function(...values) {
    values.forEach((value) => {
      textArr.push(value);
      textArr.push(lineEnter);
    });
  };
  textArr.pushItem(`function setupRouterList(app, passdata) {`);
  filenameList.forEach((filename) => {
    let reg = /.+(?=\.router\.js)/;
    let mat = filename.match(reg);
    let routerName = mat[0];
    const string_router = stringList.string_router;
    let line1 = `const ${routerName}Router = `;
    let line2 = `require('./${string_router}/${filename}');`;
    textArr.pushItem(line1.concat(line2));
  });
  filenameList.forEach((filename) => {
    let reg = /.+(?=\.router\.js)/;
    let mat = filename.match(reg);
    let routerName = mat[0];

    let line2 = `app.use('/${routerName}', ${routerName}Router(passdata));`;
    textArr.pushItem(line2);
  });
  textArr.pushItem(`}`);
  textArr.pushItem(`module.exports = `);
  textArr.pushItem(`{setupRouterList: setupRouterList}`);

  const reduce = textArr.reduce((str, value) => {
    return str.concat(value);
  }, '');
  if (logIt) {
    console.log(`reduce=\n`, reduce, `\n`);
  }
  return reduce;
}

function getPath(pathRouter, filename) {
  let basename = path.basename(pathRouter);
  let pathLevelUp = pathRouter.replace(basename, '');
  return path.join(pathLevelUp, filename);
}

/**
 * if pathRouter === null,
 *
 * return path.join(process.cwd(), 'server', 'router')
 *
 * @param logIt
 * @returns {string}
 */
function findPathRouter(logIt = false) {
  const pathRoot = process.cwd();

  const pathRouter = path.join(pathRoot,
      stringList.string_server, stringList.string_router);
  if (logIt) {
    console.log(`pathRouter=\n`, pathRouter, `\n`);
  }
  return pathRouter;
}

/**
 *
 * @param pathRouter if null, findPathRouter()
 * @param logIt
 */
function geneUtilExpressJs(
    pathRouter = null,
    logIt = false,
) {
  if (pathRouter === null) {
    pathRouter = findPathRouter(logIt);
  }

  const data = geneText(pathRouter, logIt);
  let pathFile = getPath(pathRouter, stringList.filename_util_express);
  fs.writeFileSync(pathFile, data);

}

module.exports = {
  geneUtilExpressJs: geneUtilExpressJs,
};
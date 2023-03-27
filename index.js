function geneText(
    nameRouter = null,
    logIt = false) {

  if (nameRouter === null) {
    nameRouter = 'router'
  }

  const fs = require('fs');
  const path = require('path');
  let filenameList = fs.readdirSync(path.join(nameRouter));
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

    let line1 = `const ${routerName}Router = require('./${nameRouter}/${filename}');`;
    textArr.pushItem(line1);
  });
  filenameList.forEach((filename) => {
    let reg = /.+(?=\.router\.js)/;
    let mat = filename.match(reg);
    let routerName = mat[0];

    let line2 = `app.use('/${routerName}', ${routerName}Router(passdata));`;
    textArr.pushItem(line2);
  });

  textArr.pushItem(`}`);
  textArr.pushItem(`module.exports = {setupRouterList: setupRouterList};`);

  const reduce = textArr.reduce((str, value) => {
    return str.concat(value);
  }, '');

  if (logIt) {
    console.log(`reduce`);
    console.log(reduce);
  }

  return reduce;
}

function writeTextToFile(
    filename = 'util.express.js',
    data = null,
    logIt = false) {

  if (data === null) {
    data = geneText(null, logIt);
  }

  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(filename), '');
  fs.writeFileSync(path.join(filename), data);
}

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
) {
  if (filename === null) {
    filename = 'util.express.js'
  }

  writeTextToFile(filename, null, logIt);
}

module.exports = {
  geneUtilExpressJs: geneUtilExpressJs,
};
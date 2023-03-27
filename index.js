function geneText(
    nameRouter = 'router',
    logIt = false) {

  const fs = require('fs');
  const path = require('path');
  let filenameList = fs.readdirSync(path.join(nameRouter));
  const textArr = [];
  let lineEnter = `\n`;
  textArr.pushItem = function(...values) {
    values.forEach((value) => {
      textArr.push(value);
      textArr.push(lineEnter);
    })
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
    console.log(`reduce\n`, reduce);
  }

  return reduce;
}

function writeTextToFile(
    filename = 'util.express.js',
    data = geneText()) {

  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(filename), '')
  fs.writeFileSync(path.join(filename), data)
}

/**
 *
 * you must have router dir
 *
 * and your router file like this
 *
 * eg: user.router.js
 *
 * @param filename util.express.js is the default name
 */
function geneUtilExpressJs(
    filename = 'util.express.js'
) {

  writeTextToFile(filename)
}

module.exports = {
  geneUtilExpressJs: geneUtilExpressJs
}
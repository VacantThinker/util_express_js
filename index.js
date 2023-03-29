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
 * find dir/ level up
 *
 * eg: xxx-project/server/router/
 *
 * return xxx-project/server/
 *
 * @param pathTarget
 * @param filename
 * @returns {string}
 */
function getPathByLevelUp(
    pathTarget = null,
    filename = null) {

  if (pathTarget === null) {
    pathTarget = findPathTarget();
  }

  const basename = path.basename(pathTarget);
  const pathLevelUp = pathTarget.replace(basename, '');
  if (filename === null) {
    return pathLevelUp;
  } else {
    return path.join(pathLevelUp, filename);
  }
}

/**
 * if pathRouter === null,
 *
 * return path.join(process.cwd(), 'server', 'router')
 *
 * @returns {string}
 */
function findPathTarget() {
  const pathRoot = process.cwd();

  const pathTarget = path.join(pathRoot,
      stringList.string_server, stringList.string_router);
  console.log(`pathTarget=\n`, pathTarget, `\n`);
  return pathTarget;
}

/**
 * create an array, save text
 * @param pathTarget
 * @param callbacks
 * @returns {*}
 */
function handleTextArr(pathTarget, ...callbacks) {
  const textArr = [];

  const filenameList = fs.readdirSync(pathTarget);
  callbacks.forEach((callback) => {
    filenameList.forEach((filename) => {
      const text = callback(filename);
      if (Array.isArray(text)) {
        Array.from(text).forEach((value) => {
          textArr.push(value);
        });
      } else {
        textArr.push(text);
      }
    });
  });

  const reduce = textArr.reduce((str, value) => {
    return str.concat(value);
  }, '');
  return reduce;
}

/**
 *
 * please make sure, you have router/ dir
 *
 * eg: router/notice.router.js
 *
 * generator file 'util.express.js'
 *
 * @param pathTarget if null, findPathTarget()
 */
function geneUtilExpressJs(
    pathTarget = null,
) {
  if (pathTarget === null) {
    pathTarget = findPathTarget();
  }

  const dirName = stringList.string_router
  const reduce = handleTextArr(pathTarget, (filename) => {
    const reg = /.+(?=\.router\.js)/;
    const mat = filename.match(reg);
    const routerName = mat[0];

    const line = `const ${routerName}Router = require('./${dirName}/${routerName}.router.js');
  app.use('/${routerName}', ${routerName}Router(passdata));

  `
    return line
  })

  const text =
`'use strict';

function setupRouterList(app, passdata) {
  ${reduce}
}

module.exports = {
  setupRouterList: setupRouterList,
};
`

  const file = getPathByLevelUp(pathTarget, stringList.filename_util_express);
  fs.writeFileSync(file, text);
  console.log(`file=\n`, file, `\n`);
  console.log(`text=\n`, text, `\n`);
}

module.exports = {
  geneUtilExpressJs: geneUtilExpressJs,
};
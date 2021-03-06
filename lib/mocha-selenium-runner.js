
var webdriver = require('selenium-webdriver');

By = webdriver.By;
until = webdriver.until;

var Mocha = require('mocha'),
    mocha = new Mocha();
    fs = require('fs'),
    path = require('path'),
    testDir = './tests',
    webdrivers = [];

function resetTests(suite) {
  Object.keys( require.cache ).forEach( function( file ) {
    delete require.cache[ file ];
  } );;
  // It should be possible to reuse the existing Mocha instance and re-reading
  // the files, but this will have to do for now.
  // See https://github.com/mochajs/mocha/issues/995 for more information
  mocha = new Mocha({});
  readTests(mocha);
}

function readTests(mocha) {
  // Add each .js file to the mocha instance
  fs.readdirSync(testDir).filter(function(file){
      // Only keep the .js files
      return file.substr(-3) === '.js';
  }).forEach(function(file) {
      mocha.addFile(
          path.join(testDir, file)
      );
  });
}

function runTest(i, drivers) {
  if (i >= drivers.length) {
    process.exit();
  }
  // Expose the current driver to the tests
  global.driver = drivers[i];
  // Expose the name of the driver/browser for convenience
  global.driverName= webdrivers[i].name;
  if (i > 0) resetTests();
  mocha.run().on('end', () => {
    driver.quit().then(() => {
      runTest(++i, drivers);
    });
  });
}

module.exports = {

  /**
   * Set the path to the tests directory. Defaults to ./tests
   */
  setTestDirectory(testDirectory) {
    testDir = testDirectory;
  },

  /**
   * Add a selenium webdriver.
   * @param driverName the name of the browser
   */
  addWebdriver(driverName) {
    webdrivers.push({
      driver: new webdriver.Builder().forBrowser(driverName).build(),
      name: driverName
    });
  },

  /**
   * Run the tests
   */
  start() {
    readTests(mocha);
    // wait until the drivers have started
    Promise.all(webdrivers.map(webdriver => {
      return webdriver.driver;
    })).then(data => {
      runTest(0, data);
    });
  }
}

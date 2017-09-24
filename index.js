
var mochaRunner = require('./lib/mocha-selenium-runner');

//mochaRunner.addWebdriver('chrome');
mochaRunner.addWebdriver('firefox');
mochaRunner.addWebdriver('chrome');
mochaRunner.start();

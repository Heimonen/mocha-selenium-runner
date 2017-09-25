
# mocha-selenium-runner

A proof of concept. Runs Selenium tests written in Mocha and supports running the tests with multiple browsers.

## Installation

```bash
npm install mocha-selenium-runner --save
```

Install selenium webdrivers for your desired browsers, for instance with brew:

```bash
$ brew install selenium-server-standalone
$ brew install chromedriver
```

## Running the tests

Create a folder, for instance "tests" in root of your project. Put your test files there.
Initialize mocha-selenium-runner in for instance index.js:

```javascript
let mochaRunner = require('mocha-selenium-runner');
mochaRunner.setTestDirectory('./tests');
mochaRunner.addWebdriver('chrome');
mochaRunner.addWebdriver('firefox');
mochaRunner.start();
```

And run the tests with:
```bash
node index.js
```

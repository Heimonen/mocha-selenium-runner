
describe('As a user', function() {
  console.log('test started');
  describe('Test Dashboard', function() {
    this.timeout(5000);
    it('should be possible to create a feed', function(done) {
      driver.get('https://getflowbox.com/dashboard').then(() => {
        done();
      });
      //driver.findElement(By.className('flbx-button')).click();
      //driver.wait(until.titleIs('webdriver - Google Search'), 1000);
      //test();
    });

    it('should be possible to close and cancel the feed creation modal', (done) => {
      // woho!
      done();
    });
  });
});

//.sendKeys('webdriver');

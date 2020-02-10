const { Capabilities, Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');

const { assert } = require('chai');

require('geckodriver');
require('chromedriver');

async function getFirefoxDriver() {
    // configure Options
    const options = new firefox.Options();
    options.setPreference('dom.disable_beforeunload', true);
    // use headless mode
    options.headless();

    const capabilities = Capabilities.firefox();
    capabilities.setAcceptInsecureCerts(true);
    capabilities.setAlertBehavior('accept');

    // configure ServiceBuilder
    const service = new firefox.ServiceBuilder();

    // build driver using options and service
    let driver = await new Builder()
        .forBrowser('firefox')
        .withCapabilities(capabilities);
    driver = driver.setFirefoxOptions(options).setFirefoxService(service);
    driver = driver.build();

    return driver;
}

async function getChromeDriver() {
    // configure Options
    const options = new chrome.Options();
    options.addArguments("--log-level=3");
    options.addArguments("--silent");
    // options.setPreference('dom.disable_beforeunload', true);
    // use headless mode
    options.headless();

    const capabilities = Capabilities.chrome();
    capabilities.setAcceptInsecureCerts(true);
    capabilities.setAlertBehavior('accept');

    // configure ServiceBuilder
    const service = new chrome.ServiceBuilder();

    // build driver using options and service
    let driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(capabilities);
    driver = driver.setChromeOptions(options).setChromeService(service);
    driver = driver.build();

    return driver;
}

// we can change this after we make TEST_BROWSER available in jenkins pipeline
async function getDriver(TEST_BROWSER = 'firefox') {
    // assert.isNotEmpty(TEST_BROWSER, 'TEST_BROWSER is not defined');
    console.log(`Browser: ${TEST_BROWSER}`);

    let driver;
    if (TEST_BROWSER === 'firefox') {
        driver = await getFirefoxDriver();
    } else if (TEST_BROWSER === 'chrome') {
        driver = await getChromeDriver();
    } else {
        assert.isTrue(false, `Unsupported browser ${BROWSER_TO_TEST}`);
    }
    return driver;
}

module.exports = {
    getDriver,
};

const { expect } = require('@playwright/test');
const { LoginPage } = require('./login-page');

exports.HomePage = class HomePage {
constructor(page){
    this.page = page;
    this.accountDropdown = page.locator("//a//strong[contains(text(),'Account')]");
    this.loginLink = page.locator("//a[contains(text(),'Login')]");
}

async clickAccountLink(){
    await this.accountDropdown.click();
}

async clickLoginLink(){
    await this.loginLink.click();
}

}
const { expect } = require('@playwright/test');
const { DashboardPage } = require('./dashboard-page');

exports.LoginPage = class LoginPage {
constructor(page){
    this.page = page;
    this.emailTextbox = page.locator("#email");
    this.passwordTextbox = page.locator("#password");
    this.loginButton = page.locator("#submitBTN");
}

async login(email, password){
   await this.emailTextbox.type(email);
   await this.passwordTextbox.type(password);
   await this.loginButton.click();
}

}
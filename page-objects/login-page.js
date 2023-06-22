const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
constructor(page){
    this.page = page;
    this.emailTextbox = page.locator("#email");
    this.passwordTextbox = page.locator("#password");
    this.loginButton = page.locator("#submitBTN");
    this.loginForm = page.locator("#login");
}

async login(email, password){
   await this.emailTextbox.type(email);
   await this.passwordTextbox.type(password);
   await this.loginButton.click();
}

}
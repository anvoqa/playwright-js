const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {
constructor(page){
    this.page = page;
}

async getUsernameTitle(name){
    return page.locator("//h6/strong[text()='" + name + "']");
}


}
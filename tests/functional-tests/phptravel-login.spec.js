const { test, expect } = require('@playwright/test');
import { loginUser } from '../../commons/test-data';
import { appUrl } from '../../commons/global-constants';
const { HomePage } = require('../../page-objects/home-page');
const { LoginPage } = require('../../page-objects/login-page');

test('Login success', async ({ page }) => {

    //Step 01: Go to home page
    await page.goto(appUrl.homePageUrl);
  
    //Step 02: Click Account >> Login
    const homePage = new HomePage(page);
    await homePage.clickAccountLink();
    await homePage.clickLoginLink();

    //Step 03: Input email, password and click Login
    const loginPage = new LoginPage(page);
    await loginPage.login(loginUser.loginEmail, loginUser.loginPassword);

    //Step 04: Verify that user is landed to Dashboard page, and welcome text contain user's name
    await expect(page).toHaveURL(appUrl.dashboardUrl);
    await expect(page.locator("//h6/strong[text()='" + loginUser.userName + "']")).toBeVisible();
  });
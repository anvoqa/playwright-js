/*
This file contains a functional UI test to verify that user  is able to login to an application successfully

Application Under Test (AUT): https://phptravels.net/ (this base url is added to playwright.config.js file)

Test steps:
  1. Navigate to Homepage
  2. Expand the Account menu on the top-right corner >> click Login
  3. From Login page, input email, password and click Login
  4. Verify that login is successful: user's name displays in the Dashboard page
*/


const { test, expect } = require('@playwright/test');
import { loginUser } from '../../commons/test-data';
import { appUrl } from '../../commons/global-constants';
const { HomePage } = require('../../page-objects/home-page');
const { LoginPage } = require('../../page-objects/login-page');

test('Login success', async ({ page }) => {
 
    //Step 01: Navigate to Homepage
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
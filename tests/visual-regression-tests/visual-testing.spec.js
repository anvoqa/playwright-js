/*
This file contains test to verify that the visual look of pages or important elements/sections match with pre-defined snapshot baselines

Snapshots (baselines) are generated when this class run the first time.

AUT: https://phptravels.net/ (this base url is added to playwright.config.js file)

Test cases:

 1. Homepage:
  - Searchbox section
  - Featured Hotels section
  - Featured Flights section
  - Featured Tours section
  - Recommended Cars section

 2. Login page: Login form
 
 3. Dashboard page: full page
*/

import { test, expect } from '@playwright/test';
import { loginUser } from '../../commons/test-data';
import { appUrl, pageUI } from '../../commons/global-constants';
const { HomePage } = require('../../page-objects/home-page');
const { LoginPage } = require('../../page-objects/login-page');

test('Home Page visual tests', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto(appUrl.homePageUrl);
    await expect(homePage.searchBox).toHaveScreenshot(pageUI.homePage.searchBox);
    await expect(homePage.featuredHotelsSection).toHaveScreenshot(pageUI.homePage.featuredHotels);
    await expect(homePage.featuredFlightsSection).toHaveScreenshot(pageUI.homePage.featuredFlights);
    await expect(homePage.featuredToursSection).toHaveScreenshot(pageUI.homePage.featuredTours);
    await expect(homePage.recommendedCarsSection).toHaveScreenshot(pageUI.homePage.recommendedCars);
});

test('Login Page visual test - Login form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(appUrl.loginUrl);
    await expect(loginPage.loginForm).toHaveScreenshot(pageUI.loginPage.loginForm);
  });

  test('Dashboard Page visual test', async ({ page }) => {
    //Pre-condition: Login
    const loginPage = new LoginPage(page);
    await page.goto(appUrl.loginUrl);
    await loginPage.login(loginUser.loginEmail, loginUser.loginPassword);

    //Verify visual look of Dashboard page
    await expect(page).toHaveURL(appUrl.dashboardUrl);
    await expect(page).toHaveScreenshot(
        {
        fullPage: true, animations: 'disabled'
        },
        pageUI.dashboardPage.fullPage
        );
  });
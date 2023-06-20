const { test, expect } = require('@playwright/test');

test('Login success', async ({ page }) => {

    //Variables
    const baseUrl = "https://phptravels.net/";
    const dashboardUrl = baseUrl + "dashboard";

    const firstName = "Playwright";
    const lastName = "Practice";
    const loginEmail = "playwrighttester@phptravels.com";
    const loginPassword = "demouser";

    //Locators
    const accountDropdown = page.locator("//a//strong[contains(text(),'Account')]");
    const loginLink = page.locator("//a[contains(text(),'Login')]");

    const emailTextbox = page.locator("#email");
    const passwordTextbox = page.locator("#password");
    const loginButton = page.locator("#submitBTN");

    const usernameTitle = page.locator("//h6/strong[text()='" + firstName + " " + lastName + "']");

    //Step 01: Go to home page
    await page.goto(baseUrl);
  
    //Step 02: Click Account >> Login
    await accountDropdown.click();
    await loginLink.click();

    //Step 03: Input email, password and click Login
    await emailTextbox.type(loginEmail);
    await passwordTextbox.type(loginPassword);
    await loginButton.click();

    //Step 04: Verify that user is landed to Dashboard page, and welcome text contain user's name
    await expect(page).toHaveURL(dashboardUrl);
    await expect(usernameTitle).toBeVisible();
  });
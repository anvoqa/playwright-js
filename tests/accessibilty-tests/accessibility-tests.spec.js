/*
This file demonstrates how to write tests to scan the accessibility issues of the entire page or of a specific element in a webpage
After scanning the accessibility issues, the assert is used to validate if there is any violation in the results

Application Under Test: https://phptravels.net/
*/
const { test, expect } = require('@playwright/test');
import { appUrl, accessibilityKnownIssuesSnapShots } from '../../commons/global-constants';
const AxeBuilder = require('@axe-core/playwright').default;

/*
Test scenario 1: Scan the search section of the Homepage
Since the test was failed from the beginning, an assumption is made that these are the known issues.
Therefore, a snapshot is generated containing CSS selectors which uniquely identify each element with a violation of the rule in the analysis.
The following execution will compare the results with this snapshot to make sure that there is no new a11y issue of this search section.
The scanning results are also attached to the html report of the test run
*/
test('Scan the a11y issues for search box with a specific standard: WCAG2A', async ({ page }, testInfo) => {
    await page.goto(appUrl.homePageUrl);
    await page.locator(".ShowSearchBox").waitFor();
    const a11yScanResults = await new AxeBuilder({ page })
        .include(".ShowSearchBox")
        .withTags(['wcag2a'])
        .analyze();

    expect(violationFingerprints(a11yScanResults)).toMatchSnapshot(accessibilityKnownIssuesSnapShots.searchBox);

    //Export the scan results as a test attachment
    await testInfo.attach('search-box-scan-results', {
        body: JSON.stringify(a11yScanResults, null, 2),
        contentType: 'application/json'
    });
});

/*
Test scenario 2: Scan the Login form of the Login page
The test will navigate to Login page
Scan the accessibilities of the Login form, then assert that there is no violation in the results
*/
test('Scan the a11y issues of Login form', async ({ page }, testInfo) => {
    await page.goto(appUrl.homePageUrl + appUrl.loginUrl);
    await page.locator("#login").waitFor();
    const a11yScanResults = await new AxeBuilder({ page })
        .include("#login")
        .withTags(['wcag2a'])
        .analyze();

    expect(a11yScanResults.violations).toEqual([]);
});

/*
According to the playwright's doc: https://playwright.dev/docs/accessibility-testing, 
the enire violation array shouldn't be used to bypass knonw issues.
Instead, this function is created to only returns the figgerprint of the violations, 
which contain only enough information to uniquely identiy the issue.
*/
function violationFingerprints(accessibilityScanResults) {
    const violationFingerprints = accessibilityScanResults.violations.map(violation => ({
        rule: violation.id,
        // These are CSS selectors which uniquely identify each element with
        // a violation of the rule in question.
        targets: violation.nodes.map(node => node.target),
    }));

    return JSON.stringify(violationFingerprints, null, 2);
}
[![Playwright Tests](https://github.com/anvoqa/playwright-js/actions/workflows/playwright.yml/badge.svg)](https://github.com/anvoqa/playwright-js/actions/workflows/playwright.yml)

# playwright-js <img src="https://playwright.dev/img/playwright-logo.svg" title="Playwright" alt="Playwright" width="50" height="50"/>

## Introduction
This test framework is developed using Playwright, one of the top choices for front-end test developmenet that has been emerged recently. The chosen programming language is **JavaScript**

The framework contains the following tests:
- Functional tests
- Visual regression tests
- API tests
- Accessibility tests

## Structure and Components
- `commons`: Contains the classes (e.g. basePage  TBD) and values (e.g. appUrl, file name, etc.) that can be used across the other classes and test file
- `pages-objects`: each class represents a specific page in the application under test. Each page contains the elements and methods that interact with those elements
- `tests`: Contains all the tests spec files and has the following folders
  - `accessibility-tests`: contains tests that automatically scan some accessibility issues of an entire page, or a specific part of a page
  - `api-tests`: contains tests to validate CRUD operations of API endpoints
  - `functional-tests`: contains tests to validate user flows of a web application
  - `visual-regression-tests`: contains tests to validate the UI of an entire page, or a specific element. It has a sub-folder `visual-testing.spec.js-snapshot` containing snapshots basedline of those tests
- `playwright.config.js`: Used to configure the test runner on local as well as CI environment (e.g. parallel execution, browsers & viewports, etc.)

## How to run tests locally
- Install node.js
- Clone this repository
- cd to project folder, run `npm init playwright@latest` and follow the instructions to install packages for playwright
- Run all the tests under \tests folder using command `npx playwright test`
- View test report by using command `npx playwright show-report`

## CI with Github Actions
There are 2 worklows set up for this repository:
- `playwright.yml` is used to trigger the test run on every push or new PR to `master` branch. The workflow is created by default when Playwright was being installed. When a push or new PR event occurs, the workflow will:
  - Create an latest ubuntu instance
  - Checkout the repo
  - Install node 16, Playwright and its dependencies and browsers
  - Execute all tests
  - Upload test reports if there is any failed tests
- `update-snapshots.yml` is used to trigger the test run on a PR when a comment `/update-snapshots` is added to that PR.
  - The purpose of this condition is to update snapshots of visual regression tests when there is any changes in the PR that impact the snapshot comparision
  - Thanks to Mazzarolo Matteo who wrote [this article](https://mmazzarolo.com/blog/2022-09-09-visual-regression-testing-with-playwright-and-github-actions/) to explain in details what the workflow does
  - Make sure the workflow has the permission to commit update (snapshots) to the PRs. Otherwise, it will fail at the last step `uses: stefanzweifel/git-auto-commit-action@v4`

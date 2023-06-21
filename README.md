[![Playwright Tests](https://github.com/anvoqa/playwright-js/actions/workflows/playwright.yml/badge.svg)](https://github.com/anvoqa/playwright-js/actions/workflows/playwright.yml)

# playwright-js

## Introduction
This test framework is developed using Playwright, one of the top choices for front-end test developmenet that has been emerged recently.

The tests have been written in JavaScript

## Structure and Components
`pages`

`tests`

`CI` Github Actions are being used as CI to trigger the test run on every push or new PR to `master` branch. When installing playwright, I used the default .yml file provided by Playwright. When a push or PR event occurs, the workflow will create an latest ubuntu instance -> checkout the repo -> install node 16, install dependencies -> run tests -> upload test reports
## How to run tests locally
- Clone this repository
- Install node.js
- cd to project folder, run `npm init playwright@latest` and follow the instructions to install packages for playwright
- Run all the tests under \tests folder using command `npx playwright test`
- View test report by using command `npx playwright show-report`

## Potential Improvements

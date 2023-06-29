import { faker } from '@faker-js/faker';
const { DateTime } = require("luxon");

export const loginUser = {
    userName: "Demo User",
    loginEmail: "user@phptravels.com",
    loginPassword: "demouser"
}

export const apiAuthCredential = {
    "username": "admin",
    "password": "password123"
}

export const bookingDetails = {
    "firstname": "Playwright",
    "lastname": "Practice",
    "totalprice": 123,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2023-07-01",
        "checkout": "2023-07-15"
    },
    "additionalneeds": "Breakfast"
}

export const bookingDetailsDynamic = {
    "firstname": faker.person.firstName(),
    "lastname": faker.person.lastName(),
    "totalprice": faker.number.int(1000),
    "depositpaid": true,
    "bookingdates": {
        "checkin": DateTime.now().toFormat('yyyy-MM-dd'),
        "checkout": DateTime.now().plus({day: 15}).toFormat('yyyy-MM-dd')
    },
    "additionalneeds": "Breakfast"
}
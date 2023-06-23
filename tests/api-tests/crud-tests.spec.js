/* 
This file contains the API test that perform CRUD (create, read, update, delete) operations 
on a demo booking API called 'restful-booker'

The end to end flow is created as the following:

1. Create a booking using a POST request to `/booking` endpoint. The data in request body is generated randomly using faker and luxon library
After sending request, verify that:
    - Status code is 200, status message is OK
    - The 'booking' object in response body contains the same data as the request body
A booking id is also generated in the response body. Store the booking id in the bookingId variable to be used in the later requests

2. Get the created booking using a gET request to `booking/:bookingId` endpoint.
After sending request, verify that:
    - Status code is 200, status message is OK
    - The 'booking' object in response body contains the same data as the request body

**Pre-condition for PUT, PATCH and DELETE request**
PUT, PATCH and DELETE require authentication in order to modify or delete the resource. Therefore, a POST request with username & password needs to be sent
to get the token. The token is stored in a variable `token` and will be used in the `Cookie` property of headers of those requests

3. Update the entire boking created above using a PUT request to `booking/:bookingId` endpoint. 
A new booking data is created (to simplify the data setup, a new object is created using the same data as POST request, only firstname and lastname are different)

After sending request, verify that:
    - Status code is 200, status message is OK
    - The 'booking' object in response body contains the same data as the request body

4. Partially update the created booking using a PATCH request to `booking/:bookingId` endpoint.
After sending request to update the totalPrice, verify that:
    - Status code is 200, status message is OK
    - The 'booking' object in response body contains the same data as the request body

5. Delete the created booking using a DELETE request to `booking/:bookingId` endpoint.
After sending request, verify that:
    - Status code is 201, status message is 'Created'
    - Sending a GET request to `booking/:bookingId` endpoint will return 404 error to ensure the booking does not exist
*/


// @ts-check
const { test, expect } = require('@playwright/test');
import { apiEndPoints } from '../../commons/global-constants';
import * as testData from'../../commons/test-data';
import { faker } from '@faker-js/faker';

const authenticationEndPoints = apiEndPoints.baseUrl + apiEndPoints.authentication;
const bookingEndPoints = apiEndPoints.baseUrl + apiEndPoints.booking;

test('Test booking CRUD', async ({ request }) => {
    //Send POST Request and get the response
    const postResponse = await request.post(bookingEndPoints, {
        data: testData.bookingDetailsDynamic
    });

    //Verify the status code and message from the response
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    //Verify response body
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.booking).toEqual(testData.bookingDetailsDynamic);

    //Store booking id to be used for below requests
    let bookingId = postResponseBody.bookingid;


    //Send GET Request and get the response
    const getResponse = await request.get(bookingEndPoints + "/" + bookingId);

    //Verify the status code and message from the response
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    
    //Verify response body
    const getResponseBody = await postResponse.json();
    expect(getResponseBody.booking).toEqual(testData.bookingDetailsDynamic);


    //Need authentication before sending PUT, PATCH, and DELETE request
    const authReponse = await request.post(authenticationEndPoints, {
        data: testData.apiAuthCredential
        });
    let token = (await authReponse.json()).token;

     

    //Create a new booking object for PUT request
    let newBooking = testData.bookingDetailsDynamic;
    newBooking.firstname = "Playwright";
    newBooking.lastname = "Practice";

    //Send PUT Request and get the response
    const putRequest = await request.put(bookingEndPoints + "/" + bookingId, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: newBooking
    });

    //Verify the status code and message from the response
    expect(putRequest.ok()).toBeTruthy();
    expect(putRequest.status()).toBe(200);

    //Verify response body
    expect(await putRequest.json()).toEqual(newBooking);


    //Generate new totalPrice for PATCH request
    newBooking.totalprice = faker.number.int(1000);
    
    //Send PATCH Request and get the response
    const patchRequest = await request.put(bookingEndPoints + "/" + bookingId, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: newBooking
    });

    //Verify the status code and message from the response
    expect(patchRequest.ok()).toBeTruthy();
    expect(patchRequest.status()).toBe(200);

    //Verify response body
    expect(await patchRequest.json()).toEqual(newBooking);
    

    //Send DELETE Request and get the response
    const deleteRequest = await request.delete(bookingEndPoints + "/" + bookingId, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    //Verify the status code and message from the response
    expect(deleteRequest.statusText()).toBe('Created');
    expect(deleteRequest.status()).toBe(201);

    //Send a GET request to make sure the booking does not exist
    const getResponsePostDelete = await request.get(bookingEndPoints + "/" + bookingId);
    expect(getResponsePostDelete.ok()).toBeFalsy;
    expect(getResponsePostDelete.status()).toBe(404);
});

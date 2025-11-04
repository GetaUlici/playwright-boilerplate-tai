import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://api.practicesoftwaretesting.com';

test('create account test', async ({ request }) => {
  let randomEmail = faker.internet.email();
  let randomPsw = `${faker.internet.password()}1!`;

  const requestBody = {
    first_name: 'John',
    last_name: 'Doe',
    address: {
      street: 'Street 1',
      city: 'City',
      state: 'State',
      country: 'Country',
      postal_code: '1234AA',
    },
    phone: '0987654321',
    dob: '1970-01-01',
    password: randomPsw,
    email: randomEmail,
  };
  const response = await request.post(`${baseUrl}/users/register`, {
    data: requestBody,
  });

  const respBody = await response.json();

  expect(respBody.email).toBe(randomEmail);
  expect(requestBody.password).toBe(randomPsw);

  expect(response.status()).toBe(201);
});

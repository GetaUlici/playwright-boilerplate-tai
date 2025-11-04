import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://api.practicesoftwaretesting.com';
const randomEmail = faker.internet.email();
const randomPsw = `${faker.internet.password()}1!`;

test.describe('post user login', async () => {
  test.beforeAll(async ({ request }) => {
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
  });

  test('post user login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users/login`, {
      data: {
        password: randomPsw,
        email: randomEmail,
      },
    });
    expect(response.status()).toBe(200);
  });
});

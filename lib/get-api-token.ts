import { expect, APIRequestContext } from '@playwright/test';

const baseUrl = 'https://api.practicesoftwaretesting.com';

export const getJwtToken = async (
  request: APIRequestContext,
  email: string,
  psw: string
): Promise<string> => {
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
    password: 'SuperSecure@123',
    email: 'john@doe.example',
  };
  await request.post(`${baseUrl}/users/register`, {
    data: requestBody,
  });

  const response = await request.post(`${baseUrl}/users/login`, {
    data: {
      email: 'john@doe.example',
      password: 'SuperSecure@123',
    },
  });
  expect(response.status()).toBe(200);
  const loginResponseBody = await response.json();
  return loginResponseBody.access_token;
};

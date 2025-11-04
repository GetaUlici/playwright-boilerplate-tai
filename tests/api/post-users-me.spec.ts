import { test, expect } from '@playwright/test';
import { getJwtToken } from '../../lib/get-api-token.ts';

const baseUrl = 'https://api.practicesoftwaretesting.com';

let jwtToken = '';

test.describe('Bearer JWT get users/me test', async () => {
  test.beforeAll(async ({ request }) => {
    jwtToken = await getJwtToken(request, 'john@doe.example', 'SuperSecure@123');
  });

  test('test authenticated get /users/me endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    expect(response.status()).toBe(200);
  });
});

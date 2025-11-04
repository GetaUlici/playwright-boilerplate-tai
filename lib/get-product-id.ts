import { APIRequestContext, expect } from '@playwright/test';

const baseUrl = 'https://api.practicesoftwaretesting.com';

export const getProductId = async (request: APIRequestContext) => {
  const response = await request.get(`${baseUrl}/products`);

  const respBody = await response.json();
  expect(response.status()).toBe(200);
  return respBody.data[0].id;
};

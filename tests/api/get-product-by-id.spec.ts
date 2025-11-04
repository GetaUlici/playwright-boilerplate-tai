import { test, expect } from '@playwright/test';
import { getProductId } from '../../lib/get-product-id.ts';

const baseUrl = 'https://api.practicesoftwaretesting.com';

test('Create and get product by id test', async ({ request }) => {
  const newProductId = await getProductId(request);
  const response = await request.get(`${baseUrl}/products/${newProductId}`);

  expect(response.status(), 'Expected status 200 for GET product').toBe(200);

  const respBody = await response.json();
  expect(respBody).toHaveProperty('id', newProductId);
  expect(respBody).toHaveProperty('name');
  expect(respBody).toHaveProperty('price');
  expect(respBody).toHaveProperty('category_id');
});

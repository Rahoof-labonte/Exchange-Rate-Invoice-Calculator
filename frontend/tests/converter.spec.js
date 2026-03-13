import { test, expect } from '@playwright/test';

test('USD to JPY conversion', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('input[name="usd_amount"]', '100');
  await page.fill('input[name="rate"]', '2.5');

  await page.selectOption('select[name="rate_source"]', 'Manual');

  await page.click('button:has-text("Convert")');

  const result = page.locator('text=JPY Amount');
  await expect(result).toBeVisible();

});
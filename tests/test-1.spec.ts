import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ascendion.com/');
  await page.locator('#menu-item-23192 a').filter({ hasText: 'Careers' }).click();
  await page.getByRole('link', { name: 'North America & Mexico' }).click();
  await page.getByRole('link', { name: 'Explore jobs' }).click();

  



  await page.locator('.elementor-icon-wrapper > .elementor-icon').click();
  await page.getByRole('link', { name: 'Apply now' }).click();
  await page.getByRole('link', { name: 'North America & Mexico' }).click();
  await page.getByRole('link', { name: 'Explore jobs' }).click();
  await page.locator('.elementor-icon-wrapper > .elementor-icon').click();
  await page.getByRole('textbox', { name: 'Location' }).click();
  await page.getByRole('option', { name: 'Ashburn' }).click();
});
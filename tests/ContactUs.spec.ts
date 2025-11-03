import { test, expect } from '@playwright/test';
import { HomePage } from './PageObjects/HomePage';
import { ContactUsPage } from './PageObjects/ContactUs';

test('Contact Us link', async ({ page }) => {
    const home = new HomePage(page);
    await home.openHomePage();// Usa path relativo ya que baseURL está configurado
    await home.clickContactUsLink();
    await page.locator("(//div[contains(text(),'General inquiry')])[1]").click();
    //expect(page.locator("(//fieldset[@class='form-columns-2'])[1]/descendant::input[@name='firstname']")).toBeVisible();

});

test('Services', async ({ page }) => {
    const home = new HomePage(page);
    const contactUs = new ContactUsPage(page);
    await home.openHomePage();// Usa path relativo ya que baseURL está configurado
    await home.clickContactUsLink();
    await contactUs.selecServiceOption();
    await contactUs.fillFormServices();
});

test('Services Excel', async ({ page }) => {
    const home = new HomePage(page);
    const contactUs = new ContactUsPage(page);
    await home.openHomePage();// Usa path relativo ya que baseURL está configurado
    await home.clickContactUsLink();
    await contactUs.selecServiceOption();    
    await contactUs.fillFormServicesJSONData();
}

);
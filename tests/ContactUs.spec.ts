import { test, expect } from '@playwright/test';
import { HomePage } from './PageObjects/HomePage';
import { ContactUsPage } from './PageObjects/ContactUs';

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
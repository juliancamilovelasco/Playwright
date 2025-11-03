import { Locator, Page } from "@playwright/test";

export class HomePage {

    private readonly page: Page;
    private readonly contactUsLink: Locator    

    constructor(page: Page){    
        this.page = page;
        this.contactUsLink = page.locator('//div[@id="ekit-megamenu-main-menu"]//a[contains(text(),"Contact us")]');
    }

/**
 * Opens the home page using the baseURL from the configuration.
 */
     async openHomePage() {
         await this.page.goto('/');
     }

     /**
      * Clicks on the 'Contact Us' link in the navigation menu.
      */
    async clickContactUsLink(){
        await this.contactUsLink.click();
    }   
}
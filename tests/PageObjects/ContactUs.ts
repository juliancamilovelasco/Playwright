import { expect, Locator, Page } from "@playwright/test";
import * as XLSX from 'xlsx';

interface UserData {
    phone: any;
    email: string;
    tel: string;
}

export class ContactUsPage {

    private readonly page: Page;
    private readonly option: Locator;
    private readonly email: Locator;
    private readonly phone: Locator;
    private readonly confirmation: Locator;
    private readonly submit: Locator;
    private readonly ConfrimationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.option = page.locator("(//div[contains(text(),'Services')])[1]");
        this.email = page.locator("(//fieldset[@class='form-columns-1'])[7]/descendant::input[@name='email']");
        this.phone = page.locator("(//fieldset[@class='form-columns-1'])[8]/descendant::input[@inputmode='tel']");
        this.confirmation = page.locator("(//fieldset[@class='form-columns-1'])[11]/descendant::input");
        this.submit = page.getByRole('button', { name: 'Submit' })
        this.ConfrimationMessage = page.locator("//div[contains(text(),'Thanks for submitting the form')]");
    }
    /**
     * Selects the 'Services' option from the contact options.
     */
    async selecServiceOption() {
        await this.option.click();
    }
    /**
     * Fills the form with hardcoded data.
     */
    async fillFormServices() {
        try {
            await this.email.focus();
            await this.email.fill('testing@qa.com');
            await this.phone.fill('1234567890');
            await this.confirmation.click();
            await this.submit.click();
            await expect(this.ConfrimationMessage).toBeVisible();
            await this.ConfrimationMessage.waitFor({ state: 'visible' });
            await this.ConfrimationMessage.scrollIntoViewIfNeeded();
            await this.ConfrimationMessage.highlight();
            await this.page.screenshot({ path: 'screenshots/ContactUsFormSubmission.png' });
            console.log('✅ Form sended successfully and confirmation message is visible.');
        } catch (error) {
            console.error('❌ There was an error trying to fill out the form:', error);
            await this.page.screenshot({ path: 'screenshoots/Error_ContactUsForm.png' });
            throw error;
        }
    }

    /**
     * Gets the test data from the Excel file.
     * @returns JSON array with the test data.
     */
    getTestData(): UserData[] {
        const excelFilePath = 'tests/TestData.xlsx';
        const workbook = XLSX.readFile(excelFilePath);
        const sheetName = 'DataSheet';
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData as UserData[];
    }

    /**
     * Fills the form using data from the JSON file.
     */
    async fillFormServicesJSONData() {
        let index = 1;
        try {
            const screenshootName = 'ContactUsFormSubmission';
            const jsonData = this.getTestData();
            for (const row of jsonData) {
                await this.email.focus();
                await this.email.fill(row.email);
                await this.phone.focus();
                await this.phone.fill(String(row.phone));
                await this.confirmation.click();
                await this.submit.click();
                await expect(this.ConfrimationMessage).toBeVisible();
                await this.ConfrimationMessage.waitFor({ state: 'visible' });
                await this.ConfrimationMessage.scrollIntoViewIfNeeded();
                await this.ConfrimationMessage.highlight();
                 await this.page.screenshot({ path: `screenshots/${screenshootName}_afterX${index}.png` });
                index++;
                console.log('✅ Form sended successfully and confirmation message is visible.');
                await this.page.reload();
            }
        } catch (error) {
            console.error('❌ There was an error trying to fill out the form:', error);
            await this.page.screenshot({ path: `screenshots/Error_${index}.png` });
            throw error;
        }
    }
}

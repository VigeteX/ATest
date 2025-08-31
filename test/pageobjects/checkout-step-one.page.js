import { expect } from '@wdio/globals'

class CheckoutStepOne {
    get firstNameInput() { return $('input[placeholder="First Name"]') }
    get lastNameInput() { return $('input[placeholder="Last Name"]') }
    get postalCodeInput() { return $('input[placeholder="Zip/Postal Code"]') }
    get continueBtn() { return $('input[name="continue"]') }

    async fillForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.postalCodeInput.setValue(postalCode)
        await this.continueBtn.click()

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('checkout-step-two.html')
    }
}

export default new CheckoutStepOne()
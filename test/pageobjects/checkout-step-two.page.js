import { expect } from '@wdio/globals'

class CheckoutStepTwo {
    get summaryItem() { return $('.cart_item') }
    get finishBtn() { return $('button[name="finish"]') }

    async finishCheckout() {
        await this.finishBtn.click()

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('checkout-complete.html')
    }
}

export default new CheckoutStepTwo()
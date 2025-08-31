import { expect } from '@wdio/globals'

class CheckoutComplete {
    get completeMsg() { return $('.complete-header') }
    get backToProductsBtn() { return $('button[name="back-to-products"]') }

    async backToInventory() {
        await this.backToProductsBtn.click()

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('/inventory.html')
    }
}

export default new CheckoutComplete()
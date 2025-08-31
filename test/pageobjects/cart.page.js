
class CartPage {
    get cartItem() { return $('.cart_item') }
    get cartItems() { return $$('div.cart_item') }
    get checkoutBtn() { return $('button[name="checkout"]') }

    async getFirstCartItemName() {
        const item = await $('.cart_item_label .inventory_item_name')
        return item.getText()
    }
    
    async open() {
        await $('a.shopping_cart_link').click()
        await browser.waitUntil(async () => (await browser.getUrl()).includes('/cart.html'), {
            timeout: 5000,
            timeoutMsg: 'Не удалось перейти на страницу корзины'
        })
    }

    async goToCheckout() {
        await this.checkoutBtn.click()
    }

    async expectError(message) {
        await expect(this.errorMsg).toBeDisplayed()
        const text = await this.errorMsg.getText()
        expect(text).toContain(message)
    }
}
export default new CartPage()
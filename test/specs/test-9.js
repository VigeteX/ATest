import loginPage from '../pageobjects/login.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Checkout without products', () => {    
    it('Checkout', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        await cartPage.open()
        
        const items = await cartPage.cartItems
        expect(items.length).toBe(0)

        await cartPage.goToCheckout()
        await cartPage.expectError('Your cart is empty')

        const currentUrl = await browser.getUrl()
        console.log('После клика на Checkout, перешли на URL:', currentUrl)
        expect(currentUrl).toContain('checkout-step-one.html')
    })
})
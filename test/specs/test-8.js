import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkoutStepOne from '../pageobjects/checkout-step-one.page.js'
import checkoutStepTwo from '../pageobjects/checkout-step-two.page.js'
import checkoutComplete from '../pageobjects/checkout-complete.page.js'


describe('Valid Checkout', () => {
    it('Checkout', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        const itemName = await $('.inventory_item_name').getText()
        await inventoryPage.addItemToCart(itemName)
        await inventoryPage.expectBadgeCount(1)

        await inventoryPage.openCart()
        await expect(cartPage.cartItem).toBeDisplayed()

        await cartPage.goToCheckout()
        await checkoutStepOne.fillForm('Firstname', 'Lastname', '12345')

        await expect(checkoutStepTwo.summaryItem).toBeDisplayed()
        await checkoutStepTwo.finishCheckout()

        await expect(checkoutComplete.completeMsg).toHaveText('Thank you for your order!')
        await checkoutComplete.backToInventory()

        const cartBadges = await $$('.shopping_cart_badge')
        expect(cartBadges.length).toBe(0)
    })
})
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import { expect } from '@wdio/globals'

describe('Saving the card after logout', () => {
    it('Cart', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        const itemName = await $('.inventory_item_name').getText()
        await inventoryPage.addItemToCart(itemName)
        await inventoryPage.expectBadgeCount(1)

        await inventoryPage.openMenu()
        await inventoryPage.logout()

        await loginPage.expectFieldsEmpty()

        await loginPage.login('standard_user', 'secret_sauce')
        await inventoryPage.openCart()

        const cartItemName = await cartPage.getFirstCartItemName()
        expect(cartItemName).toBe(itemName)
    })
})
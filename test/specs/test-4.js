import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import { expect } from '@wdio/globals'

describe('Logout', () => {
    it('Login', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        await inventoryPage.openMenu()
        await inventoryPage.checkMenuItems()
        await inventoryPage.logout()

        await loginPage.checkLink('https://www.saucedemo.com/')
        await loginPage.expectFieldsEmpty()
    })
})
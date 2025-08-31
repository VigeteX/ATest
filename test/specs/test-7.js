import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Footer Links', () => {
    it('Footer', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        await inventoryPage.openTwitter()
        await inventoryPage.openFacebook()
        await inventoryPage.openLinkedIn()
    })
})
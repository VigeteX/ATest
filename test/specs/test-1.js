import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Valid Login', () => {
    it('Login', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
        
        await inventoryPage.isLoaded()
    })
})
import loginPage from '../pageobjects/login.page.js'

describe('Login with invalid login', () => {
    it('Login', async () => {
        await loginPage.open()
        await loginPage.login('standarD_user', 'secret_sauce')
        await loginPage.assertInvalidError()
    })
})
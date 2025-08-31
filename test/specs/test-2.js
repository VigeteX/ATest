import loginPage from '../pageobjects/login.page.js'

describe('Login with invalid password', () => {
    it('Login', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'wrong_password')
        await loginPage.assertInvalidError()
    })
})
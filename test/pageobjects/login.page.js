
class LoginPage {
    get usernameInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get loginButton() { return $('#login-button') }
    get errorMessage() { return $('h3[data-test="error"]') }
    get usernameErrorIcon() { return $('input[data-test="username"] + svg.error_icon') }
    get passwordErrorIcon() { return $('input[data-test="password"] + svg.error_icon') }

    async open() {
        await browser.url('https://www.saucedemo.com/')
    }

    async login(username, password) {
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.loginButton.click()
    }

    async assertInvalidError() {
        await expect(this.errorMessage).toBeDisplayed()
        await expect(this.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        )
        await expect(this.usernameErrorIcon).toBeDisplayed()
        await expect(this.passwordErrorIcon).toBeDisplayed()
        let classAttr = await this.usernameInput.getAttribute('class')
        expect(classAttr).toBe('input_error form_input error')
        classAttr = await this.passwordInput.getAttribute('class')
        expect(classAttr).toBe('input_error form_input error')
    }

    async expectFieldsEmpty() {
        await expect(this.usernameInput).toHaveValue('')
        await expect(this.passwordInput).toHaveValue('')
    }

    async checkLink(link) {
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(link)
    }
}
export default new LoginPage()
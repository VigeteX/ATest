import assert from 'assert'

describe('Login with invalid login', () => {    
    it('Login', async () => {
        await browser.url(`https://www.saucedemo.com/`)

        // ---------- Step 1: Enter valid login ----------
        const usernameInput = await $('input[placeholder="Username"]')
        await usernameInput.setValue('standarD_user')

        const usernameValue = await usernameInput.getValue()
        assert.strictEqual(usernameValue, 'standarD_user', 'Логин не введён корректно')

        // ---------- Step 2: Enter invalid password ----------
        const passwordInput = $('input[placeholder="Password"]')
        await passwordInput.setValue('secret_sauce')

        const passwordValue = await passwordInput.getValue()
        assert.strictEqual(passwordValue, 'secret_sauce', 'Пароль не введён корректно')
        // Проверка, что пароль скрыт точками
        const type = await passwordInput.getAttribute('type')
        assert.strictEqual(type, 'password', 'Пароль не скрыт (не отображается точками)')

        // ---------- Step 3: Click "Login" ----------
        const loginBtn = await $('input[name="login-button"]')
        await loginBtn.click()

        // Проверяем, что появилось сообщение об ошибке
        const errorMsg = await $('h3[data-test="error"]')
        assert.ok(await errorMsg.isDisplayed(), 'Сообщение об ошибке не отображается')

        const errorText = await errorMsg.getText()
        assert.strictEqual(
            errorText,
            'Epic sadface: Username and password do not match any user in this service',
            'Текст ошибки не соответствует ожидаемому'
        )
        // "Х" логин
        const usernameErrorIcon = await $('input[data-test="username"] + svg.error_icon')
        assert.ok(await usernameErrorIcon.isDisplayed(), 'Иконка крестика рядом с полем логина не отображается')
        // "Х" пароль
        const passwordErrorIcon = await $('input[data-test="password"] + svg.error_icon')
        assert.ok(await passwordErrorIcon.isDisplayed(), 'Иконка крестика рядом с полем пароля не отображается')
        
        // красный логин
        const usernameClass = await usernameInput.getAttribute('class')
        //assert.ok(usernameClass.includes('input_error form_input error'), 'Поле логина не подсвечено красным')
        assert.strictEqual(usernameClass, 'input_error form_input error', 'Классы поля логина не совпадают')
        
        // красный пароль
        const passwordClass = await passwordInput.getAttribute('class')
        //assert.ok(passwordClass.includes('input_error form_input error'), 'Поле пароля не подсвечено красным')
        assert.strictEqual(passwordClass, 'input_error form_input error', 'Классы поля логина не совпадают')
    })
})
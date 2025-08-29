import assert from 'assert'

describe('Logout', () => {    
    it('Login', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()

        const burgerbtn = await $('button[id="react-burger-menu-btn"]')
        await burgerbtn.click()

        const menu = await $('div[class="bm-menu-wrap"]')
        await menu.waitForDisplayed({ timeout: 5000 }) // ждём до 5 секунд
        const menuHidden = await menu.getAttribute('aria-hidden')
        assert.strictEqual(menuHidden, 'false', 'Ожидалось что меню будет видно после клика на Burger')


        const menuItems = await $$('nav.bm-item-list a')
        assert.strictEqual(menuItems.length, 4, 'Ожидалось 4 пункта меню после клика на Burger')
        // Проверяем, что каждый пункт видим
        for (const item of menuItems) {
            assert.ok(await item.isDisplayed(), `Пункт меню ${await item.getText()} не отображается`)
        }

        //Выходим из акка
        const logoutbtn = await $('a[id="logout_sidebar_link"]')
        await logoutbtn.click()

        // Проверка, на екране странца входа
        const currentUrl = await browser.getUrl()
        assert.ok(
            currentUrl.includes('https://www.saucedemo.com/'),
            `Ожидался переход на https://www.saucedemo.com/, но получили ${currentUrl}`
        )

        // Проверка, что поле пустое
        assert.strictEqual(await UN.getValue(), '', 'Поле Username не пустое')
        assert.strictEqual(await PS.getValue(), '', 'Поле Password не пустое')

    })
})
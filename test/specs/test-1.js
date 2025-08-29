import assert from 'assert'

describe('Valid Login', () => {    
    it('Login', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        const UNvalue = await UN.getValue()
        assert.strictEqual(UNvalue, 'standard_user', 'Логин не введён корректно')
        
        await PS.addValue('secret_sauce')
        const PSvalue = await PS.getValue()
        assert.strictEqual(PSvalue, 'secret_sauce', 'Пароль не введён корректно')
        const type = await PS.getAttribute('type')
        assert.strictEqual(type, 'password', 'Пароль не скрыт (не отображается точками)')
        await LOG.click()
        
        const currentUrl = await browser.getUrl()
        assert.ok(
            currentUrl.includes('/inventory.html'),
            `Ожидался переход на /inventory.html, но получили ${currentUrl}`
        )

        // Проверка, что товары видны
        const firstProduct = await $('.inventory_item_name')
        assert.ok(await firstProduct.isDisplayed(), 'Товары не отображаются на странице')

        // Проверка, что корзина видна
        const cartIcon = await $('a.shopping_cart_link')
        assert.ok(await cartIcon.isDisplayed(), 'Корзина не отображается')
    })
})
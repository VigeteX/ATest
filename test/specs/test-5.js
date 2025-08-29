import assert from 'assert'

describe('Saving the card after logout ', () => {    
    it('Cart', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()

        const removebtn = await $('button[name="remove-sauce-labs-backpack"]') 
        if (await removebtn.isExisting()) {
            // Если товар уже добавлен, сначала кликаем "Remove"
            await removebtn.click()
        }
        const addbtn = await $('button[name="add-to-cart-sauce-labs-backpack"]')

        // Получаем контейнер товара (родителя)
        const priceBar = await addbtn.parentElement() // поднимаемся к .pricebar
        const itemDescription = await priceBar.parentElement() // поднимаемся к .inventory_item_description
        const itemName = await itemDescription.$('.inventory_item_name').getText()

        await addbtn.click()
        const cartIcon = await $('a.shopping_cart_link')
        let badge = await $('.shopping_cart_badge')
        assert.equal(await badge.getText(), '1', 'После добавления товара в корзину, бейджик должен быть = 1')
        
        
        //-----logaut----
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

        //relogin
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()

        await cartIcon.click()
        //Провепрка что мы в корзине
        assert.ok((await browser.getUrl()).includes('/cart.html'),'Ожидался переход на страницу корзины')

        //Провепрка что в корзине тот же айтем что мы выбрале перед выходом из акка
        const cartItemName = await $('.cart_item_label .inventory_item_name').getText()
        assert.strictEqual(cartItemName, itemName, 'В корзине не тот товар, который был добавлен')

    })
})
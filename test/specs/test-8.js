import assert from 'assert'

describe('Valid Checkout', () => {    
    it('Checkout', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()
        
        // Проверка: мы попали на inventory
        const currentUrl = await browser.getUrl()
        assert.ok(
            currentUrl.includes('/inventory.html'),
            `Ожидался переход на /inventory.html, но получили ${currentUrl}`
        )

        // ---------- Step 1 ----------
        const addbtn = await $('button[name="add-to-cart-sauce-labs-backpack"]')
        await addbtn.click()

        const cartIcon = await $('a.shopping_cart_link')
        let badge = await $('.shopping_cart_badge')
        assert.equal(await badge.getText(), '1', 'После добавления товара в корзину, бейджик должен быть = 1')

        // ---------- Step 2 ----------
        await cartIcon.click()
        assert.ok(
            (await browser.getUrl()).includes('/cart.html'),
            'Ожидался переход на страницу корзины'
        )
        const cartItem = await $('.cart_item')
        assert.ok(await cartItem.isDisplayed(), 'Ожидалось, что товар появится в корзине')

        // ---------- Step 3 ----------
        const checkoutbtn = await $('button[name="checkout"]')
        await checkoutbtn.click()
        assert.ok(
            (await browser.getUrl()).includes('/checkout-step-one.html'),
            'Ожидался переход на checkout-step-one.html'
        )

        // ---------- Step 4, 5, 6 ----------
        const fninput = await $('input[placeholder="First Name"]')
        const sninput = await $('input[placeholder="Last Name"]')
        const pcinput = await $('input[placeholder="Zip/Postal Code"]')

        await fninput.addValue('Firstname')
        await sninput.addValue('Lastname')
        await pcinput.addValue('12345')

        assert.equal(await fninput.getValue(), 'Firstname')
        assert.equal(await sninput.getValue(), 'Lastname')
        assert.equal(await pcinput.getValue(), '12345')

        // ---------- Step 7 ----------
        const continueinput = await $('input[name="continue"]')
        await continueinput.click()
        assert.ok(
            (await browser.getUrl()).includes('/checkout-step-two.html'),
            'Ожидался переход на checkout-step-two.html (Overview)'
        )
        const summaryItem = await $('.cart_item')
        assert.ok(await summaryItem.isDisplayed(), 'Ожидался товар в Overview')

        // ---------- Step 8 ----------
        const finishbtn = await $('button[name="finish"]')
        await finishbtn.click()
        assert.ok(
            (await browser.getUrl()).includes('/checkout-complete.html'),
            'Ожидался переход на checkout-complete.html'
        )
        const completeMsg = await $('.complete-header')
        assert.equal(await completeMsg.getText(), 'Thank you for your order!')

        // ---------- Step 9 ----------
        const backbtn = await $('button[name="back-to-products"]')
        await backbtn.click()
        assert.ok(
            (await browser.getUrl()).includes('/inventory.html'),
            'Ожидался возврат на страницу инвентаря'
        )

        // Проверка: корзина пуста
        const cartBadges = await $$('.shopping_cart_badge')
        assert.equal(cartBadges.length, 0, 'Ожидалось, что корзина будет пустой')
    })
})
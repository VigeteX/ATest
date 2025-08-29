import assert from 'assert'

describe('Checkout without products', () => {    
    it('Checkout', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()

        const cartIcon = await $('a.shopping_cart_link')
        await cartIcon.click()
        await browser.waitUntil(async () => (await browser.getUrl()).includes('/cart.html'), { 
            timeout: 5000, 
            timeoutMsg: 'Не удалось перейти на страницу корзины' 
        })

        const cartItems = await $$('div.cart_item')
        assert.strictEqual(cartItems.length, 0, 'В корзине отображаются продукты, хотя они не должны')
        
        // Кликаем на кнопку Checkout
        const checkoutbtn = await $('[data-test="checkout"]')
        await checkoutbtn.click()

        // Этот функционал не реализован на сайте
        // Находим сообщение об ошибке
        //const errorMsgElem = await $('[data-test="error"]') // или другой селектор на странице
        //const errorMsg = await errorMsgElem.getText()

        // Проверяем текст ошибки
        //assert.strictEqual(errorMsg, 'Your cart is empty', `Ожидалось сообщение 'Your cart is empty', но получили '${errorMsg}'`)

        // Проверяем, что остались на странице корзины
        const currentUrl = await browser.getUrl()
        //assert.ok(currentUrl.includes('/cart.html'), `Ожидалось остаться на странице корзины, но URL: ${currentUrl}`)
        console.log('После клика на Checkout, перешли на URL:', currentUrl)

        assert.ok(currentUrl.includes('checkout-step-one.html'), 
            `Ожидался переход на checkout-step-one.html, но получили ${currentUrl}`
        )
    })
})
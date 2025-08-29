import assert from 'assert'

describe('Sorting', () => {    
    it('Products', async () => {
        // ---------- Precondition ----------
        await browser.url(`https://www.saucedemo.com/`)
        
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await LOG.click()

        // ---------- Sorting ----------
        
        const twitterbtn = await $('a[href="https://twitter.com/saucelabs"]')
        const facebookbtn = await $('a[href="https://www.facebook.com/saucelabs"]')
        const linkedinbtn = await $('a[href="https://www.linkedin.com/company/sauce-labs/"]')

        //twitter проверка
        twitterbtn.click()
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 5000, timeoutMsg: 'Новая вкладка не открылась' }
        )
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])

        let currentUrl = await browser.getUrl()
        assert.ok(currentUrl.includes('https://x.com/saucelabs'), `Ожидался переход на Twitter/X, но получили ${currentUrl}`)
        //назад
        await browser.switchToWindow(handles[0])
        await browser.pause(1000)

        //facebook проверка
        facebookbtn.click()
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 2,
            { timeout: 5000, timeoutMsg: 'Новая вкладка не открылась' }
        )
        handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[2])

        currentUrl = await browser.getUrl()
        assert.ok(currentUrl.includes('https://www.facebook.com/saucelabs'), `Ожидался переход на facebookb, но получили ${currentUrl}`)
        await browser.pause(1000)

        //назад
        await browser.switchToWindow(handles[0])
        await browser.pause(1000)

        //linkedin проверка
        linkedinbtn.click()
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 3,
            { timeout: 5000, timeoutMsg: 'Новая вкладка не открылась' }
        )
        handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[3])
        
        currentUrl = await browser.getUrl()
        assert.ok(currentUrl.includes('https://www.linkedin.com/company/sauce-labs/'), `Ожидался переход на linkedin, но получили ${currentUrl}`)
        
        await browser.pause(1000)

        await browser.closeWindow()
        await browser.pause(1000)
        await browser.closeWindow()
        await browser.pause(1000)
        await browser.closeWindow()
        await browser.pause(1000)
        await browser.closeWindow()
        await browser.pause(1000)
    })
})
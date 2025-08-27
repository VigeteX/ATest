import { browser, expect } from '@wdio/globals'
import assert from 'assert'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    xit('should login with valid credentials', async () => {
        //browser.url(`https://webdriver.io/docs/gettingstarted/#initiate-a-webdriverio-setup`)
        browser.url(`https://www.google.com`)
        await browser.pause(1000)
        const t = await browser.getTitle()
        assert.strictEqual(t,'Google')

        //let input = await $('#search_input_react')
        //let input = await $('input[name="gLFyf"]')
        const input = await $('textarea[name="q"]')
        await input.addValue('test')
         await browser.pause(1000)
        await input.addValue(' and test')
         await browser.pause(1000)
        await input.setValue('not test')
         await browser.pause(5000)
    })
    xit('should login with valid credentials', async () => {
        browser.url(`https://www.google.com`)
        const luckyBtn = await $('input[name="btnI"]')
        // $('input[class="RNmpXc"]')
        // $('.RNmpXc')

        //await luckyBtn.waitForClickable({ timeout: 5000 }) // подождать пока не можно будет кликать. Указан максимум в 5 сек
        //await luckyBtn.scrollIntoView() // чтобы прокрутить к кнопке
        //await luckyBtn.click() // кликнуть

        await browser.execute(el => el.click(), await luckyBtn)
        await browser.pause(5000)
    })
    https://webdriver.io/
    it('should login with valid credentials', async () => {
        browser.url(`https://webdriver.io/`)
        const Dbtn = await $('button[aria-label="Toggle navigation bar"]')
        const Bbtn = await $('button[class="clean-btn toggleButton_aRVy"]')
        //await browser.maximizeWindow()
        //await browser.setWindowSize(1920, 1080)
        await browser.pause(2000)
        await Dbtn.click()
        await browser.pause(1000)
        //await Bbtn.click()
        await browser.execute(el => el.click(), await Bbtn)
        await browser.pause(1000)
        await browser.execute(el => el.click(), await Bbtn)
        await browser.pause(1000)
    })
})

//npx wdio run ./wdio.conf.js
//npx wdio run ./wdio.conf.js --spec basic.js
//npx wdio run ./wdio.conf.js --spec ./test/specs/basic.js
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

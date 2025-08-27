import { browser, expect } from '@wdio/globals'
import assert from 'assert'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {    
    it('should login with valid credentials', async () => {
        browser.url(`https://www.saucedemo.com/inventory.html`)
        await browser.pause(1000)
        const UN = await $('input[placeholder="Username"]')
        const PS = await $('input[placeholder="Password"]')
        const LOG = await $('input[name="login-button"]')
        
        await UN.addValue('standard_user')
        await PS.addValue('secret_sauce')
        await browser.pause(1000)
        await LOG.click()
        
        await browser.pause(1000)
        const addbtn = await $('button[name="add-to-cart-sauce-labs-backpack"]')
        await addbtn.click()
        
        await browser.pause(1000)
        const cartbtn = await $('a[class="shopping_cart_link"]')
        await cartbtn.click()
        
        await browser.pause(1000)
        const checkoutbtn = await $('button[name="checkout"]')
        await checkoutbtn.click()
        
        await browser.pause(1000)
        const fninput = await $('input[placeholder="First Name"]')
        fninput.addValue('firstname')
        const sninput = await $('input[placeholder="Last Name"]')
        sninput.addValue('lastname')
        const pcinput = await $('input[placeholder="Zip/Postal Code"]')
        pcinput.addValue('postcode@gmail.com')

        await browser.pause(1000)
        const continueinput = await $('input[name="continue"]')
        await continueinput.click()

        await browser.pause(1000)
        const finishbtn = await $('button[name="finish"]')
        await finishbtn.click()
        
        await browser.pause(1000)
        const backbtn = await $('button[name="back-to-products"]')
        await backbtn.click()

        await browser.pause(1000)
    })
})
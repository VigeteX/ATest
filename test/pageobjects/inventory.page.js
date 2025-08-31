import { expect } from '@wdio/globals'

class InventoryPage {
    get cartIcon() { return $('.shopping_cart_link') }
    
    get burgerBtn() { return $('#react-burger-menu-btn') }
    get menuWrap() { return $('.bm-menu-wrap') }
    get menuItems() { return $$('nav.bm-item-list a') }
    get logoutBtn() { return $('#logout_sidebar_link') }
    get badge() { return $('.shopping_cart_badge') }

    get sortSelect() { return $('select[data-test="product-sort-container"]') }
    get items() { return $$('div.inventory_item[data-test="inventory-item"]') }

    get twitterBtn() { return $('a[href*="twitter.com/saucelabs"]') }
    get facebookBtn() { return $('a[href*="facebook.com/saucelabs"]') }
    get linkedinBtn() { return $('a[href*="linkedin.com/company/sauce-labs"]') }


    async isLoaded() {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory.html')

        const items = await $$('.inventory_item_name');
        await expect(items[0]).toBeDisplayed();
        
        await expect(this.cartIcon).toBeDisplayed()
    }

    async openCart() {
        const cartBtn = await this.cartIcon
        await cartBtn.click()
    }

    async addItemToCart(itemName) {
        const item = await $(`.inventory_item*=${itemName}`)
        const addBtn = await item.$('.pricebar button.btn_inventory')
        await addBtn.click()
    }

    async getFirsInventoryItemName(){
        const item = await $('.inventory_item_label .inventory_item_name')
        return item.getText()
    }
    
    async openMenu() {
        await this.burgerBtn.click()
        await this.menuWrap.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => (await this.menuWrap.getAttribute('aria-hidden')) === 'false',
            {
                timeout: 5000,
                timeoutMsg: 'Меню не стало видимым (aria-hidden не false)'
            }
        )
        await expect(this.menuWrap).not.toHaveAttribute('aria-hidden', 'true')
    }

    async checkMenuItems(expectedCount = 4) {
        const items = await this.menuItems
        await expect(items).toBeElementsArrayOfSize(expectedCount)
        for (const item of items) {
            await expect(item).toBeDisplayed()
        }
    }
    async logout() {
        await this.logoutBtn.click()
    }

    async expectBadgeCount(count) {
        const exists = await this.badge.isExisting();
        if (count === 0) {
            expect(exists).toBe(false);
        } else {
            expect(exists).toBe(true);
            const text = await this.badge.getText();
            expect(text).toBe(`${count}`);
        }
        await expect(this.badge).toHaveText(`${count}`)
    }

    async sortProducts(value) {
        await this.sortSelect.selectByAttribute('value', value)
    }

    async getAllItems() {
        const elems = await this.items
        return elems.map(item => ({
            getName: async () => (await item.$('[data-test="inventory-item-name"]')).getText(),
            getPrice: async () => parseFloat((await item.$('[data-test="inventory-item-price"]').getText()).replace('$', ''))
        }))
    }


    async openSocialLink(button, expectedUrlPart) {
        await button.scrollIntoView()
        await button.click()

        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
            timeout: 5000,
            timeoutMsg: `Новая вкладка для соцссылки не открылась`
        })

        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])

        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain(expectedUrlPart)

        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
    }

    async openTwitter() {
        await this.openSocialLink(this.twitterBtn, 'x.com/saucelabs')
    }

    async openFacebook() {
        await this.openSocialLink(this.facebookBtn, 'facebook.com/saucelabs')
    }

    async openLinkedIn() {
        await this.openSocialLink(this.linkedinBtn, 'linkedin.com/company/sauce-labs')
    }
}
export default new InventoryPage()
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
        const sortSelect = await $('select[data-test="product-sort-container"]')

        const sortOptions = [
            { value: 'lohi', type: 'price', order: 'asc' },
            { value: 'hilo', type: 'price', order: 'desc' },
            { value: 'az', type: 'name', order: 'asc' },
            { value: 'za', type: 'name', order: 'desc' },
        ]

        for (const option of sortOptions) {
            // Выбираем опцию сортировки
            await sortSelect.selectByAttribute('value', option.value)

            // Ждём, пока товары загрузятся
            await browser.waitUntil(async () => {
                const items = await $$('div.inventory_item[data-test="inventory-item"]')
                return items.length > 0
            }, { timeout: 5000, timeoutMsg: 'Товары не загрузились после выбора сортировки' })

            // Берём все товары
            const items = await $$('div.inventory_item[data-test="inventory-item"]')
            
            //console.log(items)
            if (!Array.isArray(items) || items.length === 0) {
                throw new Error('Не найдено товаров для сортировки')
            }
            
            if (option.type === 'name') {
                const names = []
                for (const item of items) {
                    const nameElem = await item.$('[data-test="inventory-item-name"]')
                    const name = await nameElem.getText()
                    names.push(name)
                }
                
                const sortedNames = [...names].sort((a, b) => option.order === 'asc'? a.localeCompare(b): b.localeCompare(a))
                expect(names).toEqual(sortedNames)
            }

            if (option.type === 'price') {
                const prices = []
                for (const item of items) {
                    const priceElem = await item.$('[data-test="inventory-item-price"]')
                    const priceText = await priceElem.getText()
                    prices.push(parseFloat(priceText.replace('$', '')))
                }

                const sortedPrices = [...prices].sort((a, b) => option.order === 'asc' ? a - b : b - a)
                expect(prices).toEqual(sortedPrices)
            }
        }
    })
})
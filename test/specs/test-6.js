import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import { expect } from '@wdio/globals'

describe('Sorting', () => {
    it('Products', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

    
        const sortOptions = [
            { value: 'lohi', type: 'price', order: 'asc' },
            { value: 'hilo', type: 'price', order: 'desc' },
            { value: 'az', type: 'name', order: 'asc' },
            { value: 'za', type: 'name', order: 'desc' },
        ]

        for (const option of sortOptions) {
            await inventoryPage.sortProducts(option.value)

            const items = await inventoryPage.getAllItems()
            if (option.type === 'name') {
                const names = await Promise.all(items.map(i => i.getName()))
                const sortedNames = [...names].sort((a, b) =>
                    option.order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
                )
                await expect(names).toEqual(sortedNames)
            }

            if (option.type === 'price') {
                const prices = await Promise.all(items.map(i => i.getPrice()))
                const sortedPrices = [...prices].sort((a, b) =>
                    option.order === 'asc' ? a - b : b - a
                )
                await expect(prices).toEqual(sortedPrices)
            }
        }
    })
})
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const { family } = event.context.params

    try {
        const allFruits = await $fetch('https://www.fruityvice.com/api/fruit/all')
        const filteredFruits = allFruits.filter((fruit: any) => fruit.family.toLowerCase() === family.toLowerCase())

        return {
            family,
            fruits: filteredFruits
        }
    } catch (error) {
        event.res.statusCode = 500
        return { error: 'Error fetching data from remote API' }
    }
})

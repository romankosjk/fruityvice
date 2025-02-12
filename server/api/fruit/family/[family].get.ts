import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const { family } = event.context.params

    try {
        const allFruits = await $fetch(`https://www.fruityvice.com/api/fruit/family/${family}`)
        return {
            family,
            fruits: allFruits
        }
    } catch (error) {
        event.res.statusCode = 500
        return { error: 'Error fetching data from remote API' }
    }
})

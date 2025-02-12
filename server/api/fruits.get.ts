export default defineEventHandler(async (event) => {
    const apiUrl = 'https://www.fruityvice.com/api/fruit/all'
    try {
        const data = await $fetch(apiUrl)
        return data
    } catch (error) {
        event.res.statusCode = 500
        return { error: 'Error fetching data from remote API' }
    }
})

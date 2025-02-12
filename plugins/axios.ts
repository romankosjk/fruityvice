import axios from 'axios'

export default defineNuxtPlugin(() => {
    const instance = axios.create({
        baseURL: 'https://www.fruityvice.com/api',
    })

    return {
        provide: {
            axios: instance
        }
    }
})

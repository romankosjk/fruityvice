import { defineStore } from 'pinia'

export const useFruitStore = defineStore('fruit', {
    state: () => ({
        fruits: [] as Array<{
            id: number
            name: string
            genus: string
            family: string
            order: string
            nutritions: {
                carbohydrates: number
                protein: number
                fat: number
                calories: number
                sugar: number
            }
        }>,
        isLoading: false,
        error: null as string | null,
    }),
    actions: {
        async getFruits() {
            this.isLoading = true
            this.error = null
            try {
                const config = useRuntimeConfig(); // Получаем глобальный конфиг
                const apiBase = config.public.apiBase; // Сохраняем API-URL
                const data = await $fetch(`${apiBase}/api/fruit/all`) // Используем глобальный API-URL
                this.fruits = data

            } catch (err: any) {
                this.error = err.message || 'Error fetching fruits'
            } finally {
                this.isLoading = false
            }
        }
    }
})

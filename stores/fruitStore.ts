import { defineStore } from 'pinia'
import { fetchFruits } from '~/api/fruits'

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
                const data = await fetchFruits()
                this.fruits = data
            } catch (err: any) {
                this.error = err.message || 'Error fetching fruits'
            } finally {
                this.isLoading = false
            }
        }
    }
})

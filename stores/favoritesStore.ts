import { defineStore } from 'pinia';

export interface Fruit {
    id: number;
    name: string;
    genus: string;
    family: string;
    order: string;
    nutritions: {
        carbohydrates: number;
        protein: number;
        fat: number;
        calories: number;
        sugar: number;
    };
}

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as Fruit[],
    }),
    actions: {
        addFruit(fruit: Fruit) {
            if (!this.favorites.find((f) => f.id === fruit.id)) {
                this.favorites.push(fruit);
            }
        },
        removeFruit(fruitId: number) {
            this.favorites = this.favorites.filter((f) => f.id !== fruitId);
        },
    },
});

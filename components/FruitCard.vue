<template>
  <div class="card">
    <h3>{{ fruit.name }}</h3>
    <p>
      <strong>Family:</strong>
      <a @click="goToGroup" class="link">{{ fruit.family }}</a>
    </p>
    <p><strong>Genus:</strong> {{ fruit.genus }}</p>
    <p><strong>Order:</strong> {{ fruit.order }}</p>
    <ul>
      <li>Calories: {{ fruit.nutritions.calories }}</li>
      <li>Fat: {{ fruit.nutritions.fat }}</li>
      <li>Sugar: {{ fruit.nutritions.sugar }}</li>
      <li>Carbohydrates: {{ fruit.nutritions.carbohydrates }}</li>
      <li>Protein: {{ fruit.nutritions.protein }}</li>
    </ul>
    <div class="buttons">
      <button v-if="!isFavorite" @click="addToFavorites">Add to favorites</button>
      <button v-else @click="removeFromFavorites">Remove from favorites</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useFavoritesStore } from '~/stores/favoritesStore'

interface Fruit {
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
}

const props = defineProps<{
  fruit: Fruit
}>()

const router = useRouter()
const favoritesStore = useFavoritesStore()
const isFavorite = ref(favoritesStore.favorites.some(f => f.id === props.fruit.id))

watch(
  () => favoritesStore.favorites,
  () => {
    isFavorite.value = favoritesStore.favorites.some(f => f.id === props.fruit.id)
  },
  { deep: true }
)

const addToFavorites = () => {
  favoritesStore.addFruit(props.fruit)
}

const removeFromFavorites = () => {
  favoritesStore.removeFruit(props.fruit.id)
}

const goToGroup = () => {
  router.push(`/group/${encodeURIComponent(props.fruit.family)}`)
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  width: 200px;
  margin-bottom: 16px;
}
.link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.buttons {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

<template>
  <div>
    <h1>Fruits group: {{ family }}</h1>

    <div class="filter-panel" v-if="fruits.length">
      <h2>Filters</h2>
      <div v-for="(range, nutrient) in filters" :key="nutrient" class="filter-group">
        <label :for="nutrient">{{ nutrient }}</label>
        <input
          type="range"
          :id="nutrient + '-max'"
          v-model.number="filters[nutrient].max"
          :min="rangeBounds[nutrient].min"
          :max="rangeBounds[nutrient].max"
          step="0.1"
        />
        <span>{{ filters[nutrient].max }}</span>
      </div>
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="grid">
      <FruitCard
        v-for="fruit in filteredFruits"
        :key="fruit.id"
        :fruit="fruit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FruitCard from '~/components/FruitCard.vue'

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

const config = useRuntimeConfig(); // Получаем глобальный конфиг
const apiBase = config.public.apiBase; // Сохраняем API-URL

const route = useRoute()
const family = route.params.family as string

const fruits = ref<Fruit[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const filters = reactive({
  calories: { max: 40 },
  fat: { max: 0.4 },
  sugar: { max: 4.5 },
  carbohydrates: { max: 9 },
  protein: { max: 1.3 }
})

const rangeBounds = {
  calories: { min: 0, max: 100 },
  fat: { min: 0, max: 10 },
  sugar: { min: 0, max: 20 },
  carbohydrates: { min: 0, max: 50 },
  protein: { min: 0, max: 10 }
}

const filteredFruits = computed(() => {
  return fruits.value.filter(fruit => {
    const n = fruit.nutritions
    return (
      n.calories <= filters.calories.max &&
      n.fat <= filters.fat.max &&
      n.sugar <= filters.sugar.max &&
      n.carbohydrates <= filters.carbohydrates.max &&
      n.protein <= filters.protein.max
    )
  })
})

const fetchFruitsByFamily = async () => {
  isLoading.value = true
  error.value = null
  try {
    const data: any = await $fetch(`${apiBase}/api/fruit/family/${encodeURIComponent(family)}`)
    fruits.value = data
  } catch (err: any) {
    error.value = err.message || 'Errors loading'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFruitsByFamily()
})
</script>

<style scoped>
.filter-panel {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.filter-group label {
  width: 120px;
  text-transform: capitalize;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.error {
  color: red;
  margin-bottom: 16px;
}
</style>

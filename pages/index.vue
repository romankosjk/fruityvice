<template>
  <div>
    <h1>Fruit Explorer</h1>

    <div class="filter-panel">
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

    <div v-if="fruitStore.isLoading">Loading...</div>
    <div v-if="fruitStore.error" class="error">{{ fruitStore.error }}</div>

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
import { onMounted, reactive, computed } from 'vue'
import { useFruitStore } from '~/stores/fruitStore'
import FruitCard from '~/components/FruitCard.vue'

const fruitStore = useFruitStore()

onMounted(() => {
  fruitStore.getFruits()
})

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
  return fruitStore.fruits.filter(fruit => {
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

.card {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  width: 200px;
}

.error {
  color: red;
  margin-bottom: 16px;
}
</style>
``` ▋

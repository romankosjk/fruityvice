<template>
  <div>
    <h1>Favorites</h1>
    <div v-if="favoritesStore.favorites.length === 0">No favorite fruits yet.</div>
    <div class="grid">
      <FruitCard
        v-for="fruit in favoritesStore.favorites"
        :key="fruit.id"
        :fruit="fruit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favoritesStore'
import FruitCard from '~/components/FruitCard.vue'

const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

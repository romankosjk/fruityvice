<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li v-if="favoritesStore.favorites.length > 0"><NuxtLink to="/favorites">Favorites</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favoritesStore'

const favoritesStore = useFavoritesStore()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  color: #333;
  border-bottom: 1px solid #ddd;
}
nav ul {
  display: flex;
  list-style: none;
  gap: 16px;
}
nav ul li {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
}
nav ul li a {
  color: #333;
  text-decoration: none;
}
nav ul li a:hover {
  text-decoration: underline;
}
</style>

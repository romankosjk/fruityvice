export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        const favoritesStore = useFavoritesStore();
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            favoritesStore.favorites = JSON.parse(savedFavorites);
        }

        favoritesStore.$subscribe((mutation, state) => {
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        });
    });
});

export const fetchFruits = async () => {
    const response = await $fetch('/api/fruits')
    return response
}

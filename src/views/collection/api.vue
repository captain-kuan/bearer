<template>
  <div>{{ api }}</div>
</template>

<script setup lang="ts">
const route = useRoute();
const api = computed(() => {
  return route?.params?.api;
});
</script>

<style scoped></style>

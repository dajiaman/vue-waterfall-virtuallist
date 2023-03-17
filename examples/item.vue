<script lang="ts" setup>
const props = defineProps(["item"]);
</script>

<template>
  <div>
    <img
      :src="item['images']['474x']['url']"
      fetchpriority="auto"
      loading="auto"
    />
  </div>
</template>

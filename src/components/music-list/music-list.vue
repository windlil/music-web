<script setup lang="ts">
defineProps<{
  musicList: any
}>()
</script>

<template>
  <div class="music-list">
    <ul>
      <li v-for="item in musicList" :key="item.id" class="list-item">
        123
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.music-list {
  ul {
    display: flex;
    flex-direction: column;
  }
}
</style>

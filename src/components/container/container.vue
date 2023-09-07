<script setup lang="ts">
defineProps<{
  title: string
  pB?: string
}>()
</script>

<template>
  <div class="container">
    <p class="title">
      {{ title }}
    </p>
    <div class="content" :style="{ paddingBottom: pB }">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .title {
    padding: 2px 0;
    padding-left: 4px;
    font-size: 12px;
    color: #c1c1c1;
    border-left: 4px solid #82158b;
  }

  .content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
  }
}
</style>

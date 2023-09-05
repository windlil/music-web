<script setup lang="ts">
import HomeHeader from './components/home-header.vue'
import HomeMain from './components/home-main.vue'
</script>

<template>
  <div class="home">
    <HomeHeader />
    <div class="border" />
    <HomeMain />
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 0 15px;
  padding-top: 20px;
  margin-bottom: 100px;
}

.border {
    width: 100%;
    height: 4px;
    background: linear-gradient(357deg, rgba(69,30,62,1) 36%, rgba(122,9,110,1) 61%);
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function reback() {
  router.push('/')
}
</script>

<template>
  <div class="NotFound">
    <h1>404</h1>
    <div class="button" @click="reback">
      返回
    </div>
  </div>
</template>

<style scoped lang="scss">
.NotFound {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

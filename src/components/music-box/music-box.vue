<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

defineProps<{
  musicData: any
}>()

const router = useRouter()

function toDetail(musicData: any) {
  router.push({
    path: '/detail-song',
    query: {
      id: musicData.id,
    },
  })
}
</script>

<template>
  <div class="music-box" @click="toDetail(musicData)">
    <img :src="musicData.picUrl" alt="">
    <div class="music-info">
      <span>
        {{ musicData.name }}
      </span>
    </div>
    <div class="icon-container">
      <Icon class="icon" icon="material-symbols:play-circle" />
    </div>
    <div class="mask" />
  </div>
</template>

<style scoped lang="scss">
.music-box {
  position: relative;
  width: 31%;
  height: 100px;
  margin: 5px 0;
  border-radius: 12px;
  background-color: #3c3c3c;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  .music-info {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    position: absolute;
    padding: 4px;
    bottom: 0;
    font-size: 10px;
    background-color: #212121b1;
    overflow: hidden;
    z-index: 9;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .icon-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;

    .icon {
      font-size: 25px;
      color: #000000d0;
    }
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #ffffff31;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import HomeHeader from './components/home-header.vue'
import HomeMain from './components/home-main.vue'
import useMusicStore from '@/store/modules/music'

const musictore = useMusicStore()
const { currentPlayMusicId, currentPlayMusicData } = storeToRefs(musictore)
const router = useRouter()

const playIcon = computed(() => {
  return currentPlayMusicData.value.status ? 'heroicons-outline:pause' : 'material-symbols:play-circle-rounded'
})

function toDetail() {
  router.push({
    path: '/detail-song',
    query: {
      id: currentPlayMusicId.value,
    },
  })
}
</script>

<template>
  <div class="home">
    <div v-if="currentPlayMusicId" class="controls">
      <Icon class="icon" :icon="playIcon" />
      <div class="currentMusic" @click="toDetail">
        <div class="music-name">
          正在播放：
          {{ currentPlayMusicData.name }}
        </div>
      </div>
    </div>
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

  .controls {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    background-color: #000000;
    border: 4px solid #3c0340;
    box-shadow: 0 0 15px #27072a;
    border-radius: 28px;
    .icon {
      color: #cecece;
      font-size: 18px;
      margin-right: 10px;
    }

    .currentMusic {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
    }
  }
}

.border {
  width: 100%;
  height: 4px;
  background: linear-gradient(357deg, rgba(69,30,62,1) 36%, rgba(122,9,110,1) 61%);
}
</style>

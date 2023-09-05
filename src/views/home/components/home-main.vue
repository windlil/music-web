<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/store/modules/home'
import Container from '@/components/container/container.vue'
import MusicBox from '@/components/music-box/music-box.vue'
import MusicList from '@/components/music-list/music-list.vue'

const homeStore = useHomeStore()

function getHomeData() {
  homeStore.getPpersonalizeder()
  homeStore.getNewSong()
}
getHomeData()
const { personalized } = storeToRefs(homeStore)
</script>

<template>
  <div class="home-main">
    <Container class="container" title="热门推荐">
      <template v-for="(item) in personalized" :key="item.id">
        <MusicBox :music-data="item" />
      </template>
    </Container>
    <Container class="container" title="最新歌曲">
      <MusicList />
    </Container>
  </div>
</template>

<style scoped lang="scss">
.home-main {
  .container {
    margin-top: 15px;
  }
}
</style>

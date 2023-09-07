<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import useMusicStore from '@/store/modules/music'

const audioRef = ref<HTMLAudioElement>()
const musicStore = useMusicStore()
const { enterplayList } = storeToRefs(musicStore)

interface Music {
  url: string
  status: boolean
}

const url = ref<string>()

function playMusic(musicData: Music) {
  url.value = musicData.url
  if (musicData.status) {
    nextTick(() => {
      musicStore.setPlayList(enterplayList.value)
      musicStore.setPlayStatus(true)
      audioRef.value?.play()
    })
  } else {
    musicStore.setPlayStatus(false)
    audioRef.value?.pause()
  }
}

function handleTimeUpdate() {
  const currentTime = audioRef.value?.currentTime as number
  musicStore.setCurrentTime(currentTime)
}
</script>

<template>
  <div class="app">
    <RouterView @play-music="playMusic" />
    <audio ref="audioRef" :src="url" :ontimeupdate="handleTimeUpdate" />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  background-color: #0e0e0e;
  position: relative;
}
</style>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const audioRef = ref<HTMLAudioElement>()

interface Music {
  url: string
  status: boolean
}

const url = ref<string>()

function playMusic(musicData: Music) {
  url.value = musicData.url
  if (musicData.status) {
    nextTick(() => {
      audioRef.value?.play()
    })
  } else {
    audioRef.value?.pause()
  }
}
</script>

<template>
  <div class="app">
    <RouterView @play-music="playMusic" />
    <audio ref="audioRef" :src="url" />
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

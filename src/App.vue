<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useLoginStore } from './store/modules/login'
import useMusicStore from '@/store/modules/music'

const audioRef = ref<HTMLAudioElement>()
const musicStore = useMusicStore()

const loginStore = useLoginStore()
loginStore.getLoginStatus()

interface Music {
  url: string
  status: boolean
}

const url = ref<string>()

function playMusic(musicData: Music) {
  url.value = musicData.url
  if (musicData.status) {
    nextTick(() => {
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

function clickProgress(currentTime: any) {
  audioRef.value!.currentTime = currentTime / 1000
}
</script>

<template>
  <div class="app">
    <RouterView @play-music="playMusic" @click-progress="clickProgress" />
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

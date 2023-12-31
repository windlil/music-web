<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import useMusicStore from '@/store/modules/music'
import { fetchMusicUrl, fetchMusicDetail } from '@/server/modules/detail'
import { getCompleteName } from '@/utils'
import { getPlayListPreAndNext } from '@/utils/getPlayListSort'

const emits = defineEmits(['playMusic', 'clickProgress'])

const musicStore = useMusicStore()
const { currentPlayMusicId, currentPlayMusicData, enterMusicId, currentPlayList } = storeToRefs(musicStore)
const route = useRoute()
const router = useRouter()
const musicData = ref()
const musicDetail = ref()
const songs = ref()
const url = ref()
const musicPlayAllTime = ref()
const isCurrentMusicPlay = ref(((currentPlayMusicId.value as any) === route.query.id))
const audioPlayStatus = ref(isCurrentMusicPlay.value && currentPlayMusicData.value.status)

musicStore.setEnterMusicId(route.query.id as any)

watch(() => route.query, async () => {
  musicStore.setEnterMusicId(route.query.id as any)
  await getMusicUrlAndDetail(route.query.id)
  getPreAndNextSong()
  play(true)
})

watch(() => currentPlayMusicData.value.currentTime, () => {
  if (currentPlayMusicData.value.currentTime >= (musicPlayAllTime.value / 1000)) {
    toNext()
  }
})

const sliderValue = ref(0)

function setSliderValue() {
  if (enterMusicId.value === currentPlayMusicId.value) {
    sliderValue.value = (currentPlayMusicData.value.currentTime * 1000 / musicPlayAllTime.value) * 100
  } else {
    sliderValue.value = 0
  }
  return sliderValue.value
}

const inerval = setInterval(() => {
  setSliderValue()
}, 500)

function onChange(value: any) {
  const currentTime = (value / 100) * musicPlayAllTime.value
  emits('clickProgress', currentTime)
}

const isPlay = computed(() => {
  return audioPlayStatus.value ? 'play' : ''
})

async function getMusicUrlAndDetail(id: any) {
  musicData.value = await fetchMusicUrl<any>(id)
  musicDetail.value = await fetchMusicDetail(id)
  songs.value = musicDetail.value.songs[0]
  url.value = musicData.value.data[0].url
  musicPlayAllTime.value = songs.value.dt
  console.log('getMusicUrlAndDetail', url.value)
}

function back() {
  router.back()
}

function play(next = false) {
  if (next) {
    musicStore.setCurrentPlayMusic(route.query.id as any)
    audioPlayStatus.value = true
    emits('playMusic', {
      url: url.value,
      status: audioPlayStatus.value,
    })
    musicStore.setcurrentPlayMusicData({
      name: songs.value.al.name,
    })
  } else {
    musicStore.setCurrentPlayMusic(route.query.id as any)
    audioPlayStatus.value = !audioPlayStatus.value
    emits('playMusic', {
      url: url.value,
      status: audioPlayStatus.value,
    })
    musicStore.setcurrentPlayMusicData({
      name: songs.value.al.name,
    })
  }
}

function formatTime(time: number) {
  if (enterMusicId.value !== currentPlayMusicId.value) {
    return '00:00'
  }
  const seconds = time / 1000
  let minute: number | string = Math.floor(seconds / 60)
  let second: number | string = Math.floor(seconds) % 60
  if (minute < 10) {
    minute = `0${minute}`
  }
  if (second < 10) {
    second = `0${second}`
  }
  return `${minute}:${second}`
}

const playIcon = computed(() => {
  return audioPlayStatus.value ? 'heroicons-outline:pause' : 'material-symbols:play-circle-outline'
})

const preAndNext = reactive({
  pre: {} as any,
  next: {} as any,
})

function getPreAndNextSong() {
  const { pre, next } = getPlayListPreAndNext(currentPlayList.value, Number(enterMusicId.value))
  preAndNext.pre = pre
  preAndNext.next = next
}

function toPre() {
  router.replace({
    path: '/detail-song',
    query: {
      id: preAndNext.pre.id,
    },
  })
}

function toNext() {
  router.replace({
    path: '/detail-song',
    query: {
      id: preAndNext.next.id,
    },
  })
}

onMounted(() => {
  getMusicUrlAndDetail(route.query.id)
  getPreAndNextSong()
})

onBeforeUnmount(() => {
  clearInterval(inerval)
})
</script>

<template>
  <div v-if="songs && url" class="detail">
    <div class="back" @click="back">
      <Icon icon="ic:baseline-arrow-back-ios" />
    </div>
    <div class="pic" :class="isPlay">
      <img :src="songs?.al?.picUrl" alt="">
    </div>
    <div class="info">
      <p class="song-name">
        {{ songs.name }}
      </p>
      <p class="artists">
        {{ getCompleteName(songs.ar) }}
      </p>
    </div>
    <div class="slider">
      <div class="time">
        {{ formatTime(currentPlayMusicData.currentTime * 1000) }}
      </div>
      <van-slider v-model="sliderValue" active-color="pink" @change="onChange" />
      <div class="time">
        {{ formatTime(musicPlayAllTime) }}
      </div>
    </div>
    <div class="control">
      <Icon class="icon" icon="ic:baseline-skip-previous" @click="toPre" />
      <Icon class="icon center" :icon="playIcon" @click="play(false)" />
      <Icon class="icon" icon="ic:baseline-skip-next" @click="toNext" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 25px;
    color: #656565;
  }

  .slider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 290px;
    margin-top: 50px;

    .time {
      margin: 0 12px;
      color: #989898;
      font-size: 12px;
    }
  }

  .pic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #000000;
    box-shadow: 0 0 10px 4px #d519bf;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .song-name {
      width: 240px;
      height: 20px;
      text-align: center;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .artists {
      margin-top: 5px;
      font-size: 12px;
      color: #949494;
    }
  }

  .control {
    margin-top: 20px;

    .center {
      font-size: 39px;
    }
  }
}

audio {
  display: none;
}

.icon {
  font-size: 35px;
  color: #9b9b9b;
  margin: 10px 20px;
}

@keyframes wave {
  0% {
    box-shadow: 0 0 10px 4px #d519bf;
  }
  50% {
    box-shadow: 0 0 10px 12px #d519bf;
  }
  100% {
    box-shadow: 0 0 10px 4px #d519bf;
  }
}

.play {
  animation: wave 3s linear infinite;
}

:deep(.van-slider__button) {
  width: 10px;
  height: 10px;
}

.van-slider {
  background-color: #515151;
}
</style>

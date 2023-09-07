import { defineStore } from 'pinia'

const musicStore = defineStore('musicStore', {
  state: () => ({
    currentPlayMusicId: 0,
    currentPlayMusicData: {
      name: '',
      status: false,
      currentTime: 0,
    },
    enterMusicId: 0,
    currentPlayList: [''],
    preAndNext: {
      pre: '',
      next: '',
    },
  }),
  actions: {
    setCurrentPlayMusic(id: number) {
      this.currentPlayMusicId = id
    },
    setcurrentPlayMusicData(data: any) {
      const { name } = data
      this.currentPlayMusicData.name = name
    },
    setPlayStatus(sta: boolean) {
      this.currentPlayMusicData.status = sta
    },
    setCurrentTime(time: number) {
      this.currentPlayMusicData.currentTime = time
    },
    setEnterMusicId(id: number) {
      this.enterMusicId = id
    },
    setPlayList(arr: any[]) {
      this.currentPlayList = arr
    },
    setPreAndNextMusic(data: any) {
      this.preAndNext = data
    },
  },
})

export default musicStore

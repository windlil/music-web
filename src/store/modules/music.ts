import { defineStore } from 'pinia'

const musicStore = defineStore('musicStore', {
  state: () => ({
    currentPlayMusic: 0,
  }),
  actions: {
    setCurrentPlayMusic(id: number) {
      this.currentPlayMusic = id
    },
  },
})

export default musicStore

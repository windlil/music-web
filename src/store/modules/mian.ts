import { defineStore } from 'pinia'
import useStorage from '@/utils/stoarge'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    useCurrentIndex: useStorage.get('current_index') ?? 0,
  }),
  actions: {
    setCurrentIndex(index: number) {
      this.useCurrentIndex = index
      useStorage.set('current_index', index)
    },
  },
})

import { defineStore } from 'pinia'
import { fetchLoginStatus } from '@/server/modules/login'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    loginStatus: false,
  }),
  actions: {
    async getLoginStatus() {
      const data = await fetchLoginStatus()
      console.log(data)
    },
  },
})

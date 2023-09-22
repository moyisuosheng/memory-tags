import { defineStore } from 'pinia'

// defineStore 函数返回值本质是一个Hooks
export const useimgStore = defineStore('img', {
  state: () => ({
    count: 0
  }),

  actions: {
    increment() {
      this.count++
      // console.log(0)
    }
  },

  getters: {
    doubleCount() {
      return this.count * 2
    }
  }
})
export const imgStore = useimgStore()

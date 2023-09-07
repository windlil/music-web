class Storage {
  private storage
  constructor(type: 'local' | 'session') {
    if (type === 'local') {
      this.storage = localStorage
    } else if (type === 'session') {
      this.storage = sessionStorage
    }
  }

  get(key: string) {
    const res = this.storage?.getItem(key)
    if (res) {
      return JSON.parse(res)
    }
  }

  set(key: string, value: any) {
    this.storage?.setItem(key, JSON.stringify(value))
  }

  remove(key: string) {
    const res = this.get(key)
    if (res) {
      this.storage?.removeItem(key)
    }
  }
}

const useStorage = new Storage('session')

export default useStorage

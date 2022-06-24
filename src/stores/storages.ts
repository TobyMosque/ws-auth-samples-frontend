import { StorageLike } from 'pinia-plugin-persistedstate'
import { discard } from 'src/utils'

export const cookieStorage: StorageLike = {
  getItem (key: string) {
    discard({ key })
    return ''
  },
  setItem (key: string, value: string) {
    discard({ key, value })
    return
  }
}
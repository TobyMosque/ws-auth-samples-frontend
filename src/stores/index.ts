import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import PiniaPersistedStatePlugin from 'pinia-plugin-persistedstate'
import { cookieStorage } from './storages'
import { Cookies } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */



export default store(({ ssrContext }) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  pinia.use(({ options }) => {
    if (!options.persist || typeof options.persist === 'boolean') {
      return;
    } 
    if (options.persist.storage === cookieStorage) {
      options.persist.storage = {
        getItem (key: string) {
          return JSON.stringify(cookies.get(key))
        },
        setItem (key: string, value: string) {
          const obj = JSON.parse(value);
          cookies.set(key, obj, { path: '/', sameSite: 'Lax', secure: true })
        }
      }
    }
  })
  pinia.use(PiniaPersistedStatePlugin)
  return pinia
})

import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { createQuasarCookiesPersistedState } from 'pinia-plugin-persistedstate/quasar';
import { Cookies } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({ ssrContext }) => {
  const pinia = createPinia();

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  pinia.use(createQuasarCookiesPersistedState(cookies, null, {
    cookiesOptions: { path: '/', sameSite: 'Lax', secure: true }
  }))
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  // const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  // const realCookieStorage: StorageLike = {
  //   getItem(key: string) {
  //     return JSON.stringify(cookies.get(key));
  //   },
  //   setItem(key: string, value: string) {
  //     const obj = JSON.parse(value);
  //     cookies.set(key, obj, { path: '/', sameSite: 'Lax', secure: true });
  //   },
  // };
//
  // function swapStorage (source: StorageLike, target: StorageLike) {
  //   pinia.use(({ options }) => {
  //     if (!options.persist || typeof options.persist === 'boolean' || Array.isArray(options.persist)) {
  //       return;
  //     }
  //     if (options.persist.storage === source) {
  //       options.persist.storage = target
  //     }
  //   });
  // }
//
  // swapStorage(cookieStorage, realCookieStorage);
  // pinia.use(PiniaPersistedStatePlugin);
  // swapStorage(realCookieStorage, cookieStorage);
  return pinia;
});

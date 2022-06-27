import { boot } from 'quasar/wrappers';
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router;
  }
}

export default boot(({ store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  store.use(() => ({
    $router: router,
  }));
});

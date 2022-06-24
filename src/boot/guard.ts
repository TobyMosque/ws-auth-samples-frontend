import { boot } from 'quasar/wrappers';
import { useAppStore } from 'src/stores/app';

export default boot(({ store, router }) => {
  const appStore = useAppStore(store)
  router.beforeEach((to) => {
    const records = to.matched.filter(record => record.meta.auth)
    if (records.length > 0) {
      if (!appStore.isLogged()) {
        return {
          path: '/login',
          query: { redirect: to.fullPath }
        }
      }

      const roles = records
        .filter(record => typeof record.meta.auth === 'string')
        .map(record => record.meta.auth as string)
      if (roles.length > 0) {
        for (const role of roles) {
          if (!appStore.isOnRole(role)) {
            return {
              path: '/home'
            }
          }
        }
      }
    }
  })
});

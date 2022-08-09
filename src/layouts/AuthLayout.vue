<template>
  <q-layout view="lHh Lpr lFf" class="bg-main l-clean">
    <q-page-container>
      <q-page class="row">
        <div class="col flex flex-center relative-position layout-auth">
          <img
            alt="Quasar logo"
            class="absolute-center"
            :src="`images/quasar-logo-${dark ? 'dark' : 'light'}.svg`"
          />
        </div>
        <div
          class="col col-auto shadow-up-2 relative-position bg-content l-clean__page-container"
        >
          <q-toolbar class="text-primary">
            <q-space></q-space>
            <locale-switch></locale-switch>
          </q-toolbar>
          <div class="l-clean__page-form q-pa-xl absolute-center">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount } from 'vue';
import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { defineAsyncComponent } from 'vue';

export const authLayoutStoreName = 'authLayout';
export const useAuthLayoutStore = defineStore(authLayoutStoreName, {});
export type AuthLayoutStore = ReturnType<typeof useAuthLayoutStore>;

export default defineComponent({
  name: 'AuthLayout',
  components: {
    'locale-switch': defineAsyncComponent(
      () => import('src/components/LocaleSwitch.vue')
    ),
  },
  setup() {
    const store = useAuthLayoutStore();
    onBeforeUnmount(() => store.$dispose());

    const $q = useQuasar();
    const dark = computed(() => $q.dark.isActive);
    return {
      dark,
    };
  },
});
</script>

<style lang="scss">
.l-clean {
  .l-clean {
    &__page-container {
      width: 540px !important;
    }
    &__page-form {
      width: 100%;
    }
    @media (max-width: $breakpoint-sm-max) {
      &__page-container {
        width: 100% !important;
      }
    }
  }
}
</style>

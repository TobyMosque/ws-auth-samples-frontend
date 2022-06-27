<template>
  <q-page class="p-is-on-role row items-center justify-evenly">
    {{ auth }}
    <q-btn :to="'/home'" color="primary" label="Home Page"></q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const isOnRolePageStoreName = 'isOnRolePage';
export const useIsOnRolePageStore = defineStore(isOnRolePageStoreName, {});
export type IsOnRolePageStore = ReturnType<typeof useIsOnRolePageStore>;

export default defineComponent({
  name: 'IsOnRolePage',
  setup() {
    const store = useIsOnRolePageStore();
    onBeforeUnmount(() => store.$dispose());

    const route = useRoute();
    const auth = computed(() => route.meta.auth as string);
    return {
      auth,
    };
  },
});
</script>

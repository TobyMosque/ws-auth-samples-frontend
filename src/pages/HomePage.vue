<template>
  <q-page class="p-home row items-center justify-evenly">
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue';
import { defineStore } from 'pinia';

export const homePageStoreName = 'homePage';
export const useHomePageStore = defineStore(homePageStoreName, {});
export type HomePageStore = ReturnType<typeof useHomePageStore>;

export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useHomePageStore()
    onBeforeUnmount(() => store.$dispose())
  }
});
</script>

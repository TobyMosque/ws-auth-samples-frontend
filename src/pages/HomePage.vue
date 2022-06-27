<template>
  <q-page class="p-home row items-center justify-evenly">
    <div class="row">
      <q-btn @click="getProfile" color="primary" label="Get Profile"></q-btn>
      <q-btn
        v-if="isOnRole('admin')"
        @click="isAdmin"
        color="primary"
        label="Is Admin?"
      ></q-btn>
      <q-btn
        v-if="isOnRole('developer')"
        @click="isDeveloper"
        color="primary"
        label="Is Developer?"
      ></q-btn>
    </div>
    <div class="row">
      <q-btn
        v-if="isOnRole('admin')"
        :to="'/is-admin'"
        color="primary"
        label="Admin Page"
      ></q-btn>
      <q-btn
        v-if="isOnRole('developer')"
        :to="'/is-developer'"
        color="primary"
        label="Developer Page"
      ></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue';
import { defineStore } from 'pinia';
import { useAppStore } from 'src/stores/app';

export const homePageStoreName = 'homePage';
export const useHomePageStore = defineStore(homePageStoreName, {
  actions: {
    async getProfile() {
      const { data } = await this.$defaultApi.getProfile();
      console.log(data);
    },
    async isAdmin() {
      const { data } = await this.$defaultApi.isAdmin();
      console.log(data);
    },
    async isDeveloper() {
      const { data } = await this.$defaultApi.isDeveloper();
      console.log(data);
    },
  },
});
export type HomePageStore = ReturnType<typeof useHomePageStore>;

export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useHomePageStore();
    onBeforeUnmount(() => store.$dispose());

    const appStore = useAppStore();
    const { isOnRole } = appStore;

    const { getProfile, isAdmin, isDeveloper } = store;
    return {
      getProfile,
      isAdmin,
      isDeveloper,
      isOnRole,
    };
  },
});
</script>

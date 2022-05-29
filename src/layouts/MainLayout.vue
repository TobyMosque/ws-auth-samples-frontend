<template>
  <q-layout class="l-main" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <essential-link
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <locale-switch></locale-switch>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

interface LinkList {
  title: string
  caption: string
  icon: string
  link: string
}

export const authLayoutStoreName = 'mainLayout';
export const useMainLayoutStore = defineStore(authLayoutStoreName, {
  state: () => ({
    leftDrawerOpen: false
  }),
  getters: {
    linksList (): LinkList[] {
      return [
        {
          title: this.$t('l-main.docs'),
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: this.$t('l-main.github'),
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: this.$t('l-main.discord'),
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: this.$t('l-main.forum'),
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: this.$t('l-main.twitter'),
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: this.$t('l-main.facebook'),
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        },
        {
          title: this.$t('l-main.awesome.title'),
          caption: this.$t('l-main.awesome.caption'),
          icon: 'favorite',
          link: 'https://awesome.quasar.dev'
        }
      ]
    }
  },
  actions: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = this.leftDrawerOpen
    }
  }
});
export type MainLayoutStore = ReturnType<typeof useMainLayoutStore>;

export default defineComponent({
  name: 'MainLayout',
  components: {
    'essential-link': defineAsyncComponent(() => import('src/components/EssentialLink.vue')),
    'locale-switch': defineAsyncComponent(() => import('src/components/LocaleSwitch.vue')),
  },
  setup () {
    const store = useMainLayoutStore()
    onBeforeUnmount(() => store.$dispose())

    const { leftDrawerOpen } = storeToRefs(store)
    const essentialLinks = computed(() => store.linksList)
    const { toggleLeftDrawer } = store

    return {
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer
    }
  }
});
</script>

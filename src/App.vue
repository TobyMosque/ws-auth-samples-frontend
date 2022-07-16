<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup () {
    if (process.env.SERVER) {
      const quasar = useQuasar()
      quasar.dark.set(true)
    }
  }
});
</script>

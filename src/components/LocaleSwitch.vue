<template>
  <div class="c-locale-switch">
    <q-fab
      v-model="fab"
      :label="$t('c-locale-switch.title')"
      external-label
      vertical-actions-align="right"
      :icon="icon"
      direction="down"
    >
      <q-fab-action
        label-position="left"
        icon="img:flags/pt-BR.svg"
        @click="set('pt-BR')"
        :label="$t('c-locale-switch.ptbr')"
        external-label
      />
      <q-fab-action
        label-position="left"
        icon="img:flags/en-US.svg"
        @click="set('en-US')"
        :label="$t('c-locale-switch.enus')"
        external-label
      />
    </q-fab>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useAppStore } from 'src/stores/app';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LocaleSwitch',
  setup() {
    const fab = ref(false);
    const quasar = useQuasar();
    const i18n = useI18n();

    const appStore = useAppStore();
    const { locale } = storeToRefs(appStore);
    const icon = computed(() => `img:flags/${locale.value}.svg`);

    async function set(val: 'pt-BR' | 'en-US') {
      i18n.locale.value = val;
      function getLang() {
        switch (val) {
          case 'pt-BR':
            return import('quasar/lang/pt-BR');
          case 'en-US':
            return import('quasar/lang/en-US');
        }
      }

      const lang = await getLang();
      quasar.lang.set(lang as never);
      locale.value = val;
    }
    return {
      fab,
      icon,
      set,
    };
  },
});
</script>

<style lang="scss">
.c-locale-switch {
  --size: 42px;
  --mini: 32px;
  .q-btn--fab {
    padding: 0;
    margin: 6px;
    width: var(--size);
    height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
    .q-fab__icon-holder,
    img {
      width: var(--size);
      height: var(--size);
    }
  }
  .q-btn--fab-mini {
    padding: 0;
    margin: 4px;
    width: var(--mini);
    height: var(--mini);
    min-width: var(--mini);
    min-height: var(--mini);
    img {
      width: var(--mini);
      height: var(--mini);
    }
  }
}
</style>

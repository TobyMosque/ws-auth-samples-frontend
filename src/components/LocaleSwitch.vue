<template>
  <q-page-sticky
    position="bottom-right"
    class="c-locale-switch"
    :offset="[18, 18]"
  >
    <q-fab
      v-model="fab"
      :label="$t('c-locale-switch.title')"
      external-label
      vertical-actions-align="right"
      :icon="icon"
      direction="up"
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
  </q-page-sticky>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LocaleSwitch',
  setup() {
    const fab = ref(false);
    const quasar = useQuasar();
    const i18n = useI18n();

    const locale = ref(quasar.lang.isoName)
    const icon = computed(() => `img:flags/${locale.value}.svg`);

    async function set(val: ('pt-BR' | 'en-US')) {
      i18n.locale.value = val;
      function getLang () {
        switch (val) {
          case 'pt-BR': return import('quasar/lang/pt-BR');
          case 'en-US': return import('quasar/lang/en-US');
        }
      }
      
      const lang = await getLang();
      quasar.lang.set(lang as never);
      locale.value = val
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
  .q-btn--fab {
    padding: 0;
    .q-fab__icon-holder,
    img {
      width: 56px;
      height: 56px;
    }
  }
  .q-btn--fab-mini {
    padding: 0;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>

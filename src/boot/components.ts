import { boot } from 'quasar/wrappers';
import { defineAsyncComponent } from 'vue';

export default boot(({ app }) => {
  app.component(
    'qc-input',
    defineAsyncComponent(() => import('components/brand/QcInput.vue'))
  );
});

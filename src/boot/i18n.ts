import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { Quasar } from 'quasar'

function configureI18n({ lang = '' } = {}) {
  return createI18n({
    locale: lang || Quasar.lang.isoName,
    globalInjection: true,
    messages,
  });
}

type I18nGlobal = ReturnType<typeof configureI18n>['global'];
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface PiniaCustomProperties {
    $t: I18nGlobal['t'];
    // $tc: I18nGlobal['tc'];
    $te: I18nGlobal['te'];
    $tm: I18nGlobal['tm'];
    $n: I18nGlobal['n'];
    $d: I18nGlobal['d'];
  }
}

export default boot(({ app, store }) => {
  const i18n = configureI18n();

  // Set i18n instance on app
  app.use(i18n);
  store.use(() => ({
    $t: i18n.global.t.bind(i18n.global),
    $te: i18n.global.te.bind(i18n.global),
    $tm: i18n.global.tm.bind(i18n.global),
    $n: i18n.global.n.bind(i18n.global),
    $d: i18n.global.d.bind(i18n.global),
  }));
});

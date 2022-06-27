// This is just an example,
// so you can safely delete all default props below
import actions from './actions';
import fields from './fields';

export default {
  roles: {
    developer: 'Developer',
    admin: 'Admin',
    user: 'User',
  },
  validations: {
    compare: '{field} and {other} do not match',
    email: 'The {field} field is not a valid e-mail address',
    required: 'The {field} field is required',
    strength: 'Password is too weak, please improve your strength',
  },
  fields: fields,
  actions: actions,
  'l-main': {
    docs: 'Docs',
    github: 'Github',
    discord: 'Discord Chat Channel',
    forum: 'Forum',
    twitter: 'Twitter',
    facebook: 'Facebook',
    awesome: {
      title: 'Quasar Awesome',
      caption: 'Community Quasar projects',
    },
  },
  'p-login': {
    title: 'Login into the System',
    fields: {
      userName: '@:fields.userName',
      password: '@:fields.password',
    },
    actions: {
      forget: '@:actions.forget',
      login: '@:actions.login',
    },
  },
  'c-locale-switch': {
    title: 'Idioma',
    ptbr: 'Português',
    enus: 'Inglês',
  },
};

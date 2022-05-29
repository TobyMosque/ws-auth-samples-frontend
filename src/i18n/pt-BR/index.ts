// This is just an example,
// so you can safely delete all default props below
import actions from './actions'
import fields from './fields'

export default {
  roles: {
    developer: 'Desenvolvedor',
    admin: 'Administrador',
    user: 'Usuário',
  },
  validations: {
    compare: '{field} e {other} não são iguais',
    email: 'O campo {field} não possui um email válido',
    required: 'O campo {field} é requerido',
    strength: 'Senha é muito fraca, por favor torne ela mais forte',
  },
  fields: fields,
  actions: actions,
  'l-main': {
    docs: 'Documentação',
    github: 'Github',
    discord: 'Canal de Chat no Discord',
    forum: 'Fórum',
    twitter: 'Twitter',
    facebook: 'Facebook',
    awesome: {
      title: 'Incrível Quasar',
      caption: 'Projetos Quasar feitos pela Comunidade',
    },
  },
  'p-login': {
    title: 'Acessar o Sistema',
    fields: {
      userName: '@:fields.userName',
      password: '@:fields.password',
    },
    actions: {
      forget: '@:actions.forget',
      login: '@:actions.login'
    },
  },
  'c-locale-switch': {
    title: 'Idiom',
    ptbr: 'Portuguese',
    enus: 'English'
  },
};

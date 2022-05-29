import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { inject, InjectionKey } from 'vue';
import {
  AuthApi,
  UserApi,
  RoleApi,
  UserRoleApi,
  SessionApi,
  PersonApi,
  CompanyApi,
  JobApi,
  DefaultApi
} from 'api';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: AxiosInstance,
    $authApi: AuthApi,
    $userApi: UserApi,
    $roleApi: RoleApi,
    $userRoleApi: UserRoleApi,
    $sessionApi: SessionApi,
    $personApi: PersonApi,
    $companyApi: CompanyApi,
    $jobApi: JobApi,
    $defaultApi: DefaultApi
  }
}

export const apiKey: InjectionKey<AxiosInstance> = Symbol('api-key')
export const authApiKey: InjectionKey<AuthApi> = Symbol('auth-api-key')
export const userApiKey: InjectionKey<UserApi> = Symbol('user-api-key')
export const roleApiKey: InjectionKey<RoleApi> = Symbol('role-api-key')
export const userRoleApiKey: InjectionKey<UserRoleApi> = Symbol('user-api-key')
export const sessionApiKey: InjectionKey<SessionApi> = Symbol('session-api-key')
export const personApiKey: InjectionKey<PersonApi> = Symbol('person-api-key')
export const companyApiKey: InjectionKey<CompanyApi> = Symbol('company-api-key')
export const jobApiKey: InjectionKey<JobApi> = Symbol('job-api-key')
export const defaultApiKey: InjectionKey<DefaultApi> = Symbol('default-api-key')
export function useApi () {
  return {
    api: inject(apiKey),
    authApi: inject(authApiKey),
    userApi: inject(userApiKey),
    roleApi: inject(roleApiKey),
    userRoleApi: inject(userRoleApiKey),
    sessionApi: inject(sessionApiKey),
    personApi: inject(personApiKey),
    companyApi: inject(companyApiKey),
    jobApi: inject(jobApiKey),
    defaultApi: inject(defaultApiKey)
  }
}

export default boot(({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const url = 'http://localhost:3000'
  const api = axios.create({ baseURL: url }) as never;
  
  const authApi = new AuthApi(undefined, url, api);
  const userApi = new UserApi(undefined, url, api);
  const roleApi = new RoleApi(undefined, url, api);
  const userRoleApi = new UserRoleApi(undefined, url, api);
  const sessionApi = new SessionApi(undefined, url, api);
  const personApi = new PersonApi(undefined, url, api);
  const companyApi = new CompanyApi(undefined, url, api);
  const jobApi = new JobApi(undefined, url, api);
  const defaultApi = new DefaultApi(undefined, url, api);

  app.provide(apiKey, api)
  app.provide(authApiKey, authApi)
  app.provide(userApiKey, userApi)
  app.provide(roleApiKey, roleApi)
  app.provide(userRoleApiKey, userRoleApi)
  app.provide(sessionApiKey, sessionApi)
  app.provide(personApiKey, personApi)
  app.provide(companyApiKey, companyApi)
  app.provide(jobApiKey, jobApi)
  app.provide(defaultApiKey, defaultApi)

  store.use(() => ({
    $api: api,
    $authApi: authApi,
    $userApi: userApi,
    $roleApi: roleApi,
    $userRoleApi: userRoleApi,
    $sessionApi: sessionApi,
    $personApi: personApi,
    $companyApi: companyApi,
    $jobApi: jobApi,
    $defaultApi: defaultApi
  }))
});

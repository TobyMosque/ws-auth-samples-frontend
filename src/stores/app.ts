import { defineStore } from 'pinia';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { cookieStorage } from './storages';

export const appStoreName = 'counter';
export const useAppStore = defineStore(appStoreName, {
  state: () => ({
    token: '',
    locale: '',
  }),
  getters: {
    decoded: (state) => {
      if (!state.token) {
        return null;
      }
      return jwtDecode(state.token) as JwtPayload & { roles: string[] };
    },
    expiresAt(): Date | null | undefined {
      if (!this.decoded || !this.decoded.exp) {
        return null;
      }
      const { exp } = this.decoded;
      return new Date(exp * 1000);
    },
  },
  actions: {
    isLogged() {
      if (!this.expiresAt) {
        return false;
      }
      return this.expiresAt.getTime() > new Date().getTime();
    },
    isOnRole(role: string) {
      if (!this.decoded?.roles?.length) {
        return false;
      }
      return this.decoded.roles.includes(role);
    },
  },
  persist: {
    storage: cookieStorage,
  },
});
export type AppStore = ReturnType<typeof useAppStore>;

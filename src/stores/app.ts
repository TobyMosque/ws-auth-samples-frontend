import { defineStore } from 'pinia';
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { discard } from 'src/utils';

export const appStoreName = 'counter'
export const useAppStore = defineStore(appStoreName, {
  state: () => ({
    token: ''
  }),
  getters: {
    decoded: (state) => {
      if (!state.token) {
        return null;
      }
      return jwtDecode(state.token) as (JwtPayload & { roles: string[] })
    },
    expiresAt (): Date | null | undefined {
      if (!this.decoded || !this.decoded.exp) {
        return null;
      }
      const { exp } = this.decoded
      return new Date(exp * 1000)
    }
  },
  actions: {
    isLogged () {
      if (!this.expiresAt) {
        return false
      }
      return this.expiresAt.getTime() > new Date().getTime()
    },
    isOnRole (role: string) {
      if (!this.decoded?.roles?.length) {
        return false;
      }
      return this.decoded.roles.includes(role)
    },
    async refresh () {
      try {
        const { data } = await this.$authApi.refresh({ withCredentials: true });
        this.token = data
      } catch (err) {
        this.token = ''
        discard({ err })
      }
    }
  }
});
export type AppStore = ReturnType<typeof useAppStore>;

<template>
  <div class="p-login">
    <h5 class="q-my-md">{{$t('p-login.title')}}</h5>
    <q-separator></q-separator>
    <q-form ref="form" class="row q-col-gutter-sm">
      <div class="col col-12">
        <qc-input v-model="userName" :label="$t('p-login.fields.userName')" :rules="validation.userName"></qc-input>
      </div>
      <div class="col col-12">
        <qc-input type="password" v-model="password" :label="$t('p-login.fields.password')" :rules="validation.password"></qc-input>
      </div>
      <div class="col col-5">
        <q-btn class="full-width" flat color="primary" :label="$t('p-login.actions.forget')" @click="forget"></q-btn>
      </div>
      <div class="col col-7">
        <q-btn class="full-width" color="positive" :label="$t('p-login.actions.login')" @click="login" :loading="loading"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useValidation } from 'src/composables/validations';
import { useAppStore } from 'src/stores/app';

export const loginPageStoreName = 'loginPage';
export const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({
    userName: '',
    password: '',
    loading: false
  }),
  actions: {
    forget () {
      console.log('forget: not implemented yet')
    },
    async login () {
      const appStore = useAppStore();
      const { data } = await this.$authApi.login({
        username: this.userName,
        password: this.password
      }, { withCredentials: true });
      appStore.token = data.accessToken
      this.$router.push('home')
    }
  }
});
export type LoginPageStore = ReturnType<typeof useLoginPageStore>;

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useLoginPageStore()
    onBeforeUnmount(() => store.$dispose())

    const { userName, password } = storeToRefs(store)
    const { forget, login, loading } = store

    const validation = useValidation({
      userName: {
        required: true,
        email: true,
      },
      password: {
        required: true
      }
    }, 'p-login.fields')

    return {
      userName,
      password,
      loading,
      forget,
      login,
      validation
    }
  }
});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from '@/services/auth'

const email:Ref<string> = ref('');
const password:Ref<string>  = ref('');
const loading:Ref<boolean> = ref(false);
const router = useRouter();
const message:Ref<string> = ref('');
const payload:Ref<Login> = ref({ email: '', password: ''});
interface Login {
  email: string;
  password: string;
}
let response:Ref = ref();

const submitLogin = async () => {
  message.value = '';
  loading.value = true;
  payload.value.email = email.value;
  payload.value.password = password.value;
  response.value = await auth(payload.value);
  if(response.value){
    router.push('/admin/painel');
  }else{
    message.value = 'Email ou senha incorretos';
  }
  loading.value = false;
};

</script>

<template>
  <section class="bg-red-mid w-full h-dvh flex justify-center items-center">
    <img class="h-96 w-96 shadow-inherit" src="../img/login-car.png" alt="">
    <form v-motion-pop-visible @:submit.prevent="submitLogin" class="w-72 flex flex-col gap-3 p-2">
      <div class="flex flex-col">
        <label class="text-white-yellow" for="">EMAIL</label>
        <input v-model="email" class="focus:outline-none focus:border-white border border-black h-7" type="text">
      </div>
      <div class="flex flex-col">
        <label class="text-white-yellow" for="">SENHA</label>
        <input v-model="password" class="focus:outline-none focus:border-white border border-black h-7" type="password">
      </div>
      <small v-if="message" class="bg-black text-red-700">{{ message }}</small>
      <button :disabled="loading" class="hover:bg-zinc-900 transition ease-in-out delay-150 bg-zinc-800 h-7 border-black border text-white-yellow shadow-md flex justify-center items-center">
        <span v-if="!loading">LOGIN</span>
        <img class="w-5 h-5" v-if="loading" src="../img/loading.gif" alt="">
      </button>
    </form>
  </section>
</template>
<style>

</style>
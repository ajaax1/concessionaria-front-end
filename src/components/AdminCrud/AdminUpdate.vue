<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed, ref, ComputedRef, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type admin from '../../types/adminTypes/admin';
import adminUpdate from '../../services/adminCrud/adminUpdate';
import adminShow from '../../services/adminCrud/adminShow';
import habilidadeIndex from '../../services/habilidadeCrud/habilidadeIndex';

let admins: Ref<admin> = ref();
let name: Ref<string> = ref('');
let email: Ref<string> = ref('');
const router = useRouter();
let messages: Ref = ref({ name: [], email: [], password: [], confirm: [], habilidades: []  });
let password: Ref<string> = ref('');
let confirm: Ref<string> = ref('');
let loading: Ref<boolean> = ref(false);
let habilidades: Ref = ref([]);
let habilidade_id: Ref<number> = ref({ id: '', nome: '' });
let habilidades_submit: Ref<number[]> = ref([]);
let response = null;
let id = router.currentRoute.value.params.id;

onMounted(async () => {
    loading.value = true;
    habilidades.value = await habilidadeIndex()
    admins.value = await adminShow(id);
    if(admins.value == false){
        router.push('/admin/painel/config');
    }
    if(admins.value.habilidades.length > 0){
        admins.value.habilidades.forEach(element => {
            habilidades_submit.value.push({
                id: element.id,
                nome: element.nome
            });
        });
    }
    loading.value = false;
    name.value = admins.value.name;
    email.value = admins.value.email;
})

const payload: ComputedRef = computed(() => {
    return {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm: confirm.value,
        habilidades: habilidades_submit.value
    }
})

const habilidadesSubmit = () => {
    if (habilidades_submit.value.some(element => element.id == habilidade_id.value.id)) {
        habilidade_id.value = {
            id: '',
            nome: ''
        };
        return;
    }
    habilidades_submit.value.push(habilidade_id.value);
    habilidade_id.value = {
        id: '',
        nome: ''
    };
}

const deleteHabilidade = (index: number) => {
    habilidades_submit.value.splice(index, 1);
}


const submit = async () => {
    loading.value = true;
    messages.value = { name: [], email: [], password: [], confirm: [], habilidades: [] };
    response = await adminUpdate(payload.value, id);
    if (response == true) {
        router.push('/admin/painel/config');
    }
    console.log(response);
    messages.value = {
        name: response.name ?? [],
        email: response.email ?? [],
        password: response.password ?? [],
        confirm: response.confirm ?? [],
        habilidades: response.habilidades ?? []
    }
    loading.value = false;
}
</script>
<template>
    <div class="bg-gray-100 rounded-lg shadow-2xl min-h-screen w-full p-5">
        <div class="w-full flex justify-center gap-2 items-center mb-5">
            <span class="text-black font-bold text-2xl">ADMIN</span>
            <RouterLink to="/admin/painel/config"
                class="bg-sky-700 shadow-lg rounded-sm h-8 w-20 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                VOLTAR</RouterLink>
        </div>
        <form @submit.prevent="submit" class="flex flex-col gap-1 h-full items-center mt-10">
            <div class="flex flex-col w-64">
                <label class="text-black" for="">Nome</label>
                <input
                    :class="{ 'border-red-700': messages.name[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                    v-model="name" type="text">
                <small class="text-red-700">{{ messages.name[0] }}</small>
            </div>
            <div class="flex flex-col w-64">
                <label class="text-black" for="">Email</label>
                <input
                    :class="{ 'border-red-700': messages.email[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                    v-model="email" type="text">
                <small class="text-red-700">{{ messages.email[0] }}</small>
            </div>
            <div class="flex flex-col w-64 mb-1">
                <label class="text-black" for="">Habilidades</label>
                <select @change="habilidadesSubmit" v-model="habilidade_id"
                    :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true, 'w-full': true, 'border-red-700': messages.habilidades[0] !== undefined }">
                    <option :value="{
                        id: '',
                        nome: ''
                    }" selected>Selecione as habilidades</option>
                    <option v-for="habilidade in habilidades" :key="habilidade.id" :value="habilidade">{{
                        habilidade.nome }}</option>
                </select>
                <small class="text-red-700">{{ messages.habilidades[0] }}</small>
            </div>
            <div class="flex justify-start w-64 gap-2">
                <ul class="flex flex-col gap-1">
                    <li class="text-xs rounded-md inline-flex p-1 bg-slate-200 gap-2 items-center max-w-max"
                        v-for="(habilidade, index) in habilidades_submit" :key="index">
                        {{ habilidade.nome }}
                        <div @click="deleteHabilidade(index)" class="bg-red-700 cursor-pointer">
                            <img src="/src/icons/delete.svg" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col w-64">
                <label class="text-black" for="">Senha</label>
                <input
                    :class="{ 'border-red-700': messages.password[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                    v-model="password" type="password">
                <small class="text-red-700">{{ messages.password[0] }}</small>
            </div>
            <div class="flex flex-col w-64">
                <label class="text-black" for="">Confirmar Senha</label>
                <input
                    :class="{ 'border-red-700': messages.confirm[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                    v-model="confirm" type="password">
                <small class="text-red-700">{{ messages.confirm[0] }}</small>
            </div>
            <small v-show="message"
                :class="[{ 'text-red-700': message != 'ADMIN CRIADO COM SUCESSO' }, { 'text-green-700': message == 'ADMIN CRIADO COM SUCESSO' }]">{{
                    message }}</small>
            <button :disabled="loading" @click="submit"
                class="bg-sky-700 shadow-lg rounded-sm h-8hover:brightness-75 transition duration-300 flex justify-center items-center w-64 h-8">
                <span class="text-white" v-if="!loading">ENVIAR</span>
                <img v-if="loading" class="w-5" src="/src/img/loading.gif" alt="">
            </button>
        </form>
    </div>
</template>
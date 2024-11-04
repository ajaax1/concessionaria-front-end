<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed, ref, ComputedRef, Ref } from 'vue';
import { useRouter } from 'vue-router';
import opcionalCreate from '../../services/opcionalCrud/opcionalCreate';

const router = useRouter();
let messages = ref({
    nome: [],
});
let nome = ref<string>('');
let loading: Ref<boolean> = ref(false);
let response = null;

const payload: ComputedRef = computed(() => {
    return {
        nome: nome.value,
    }
})

const submit = async () => {
    loading.value = true;
    messages.value = {
        nome: [],
    };
    response = await opcionalCreate(payload.value);
    if (response == true) {
        router.push('/admin/painel/opcionais');
    }
    messages.value = {
        nome: response.nome ?? [],
    }
    loading.value = false;
}
</script>
<template>
    <div class="bg-gray-100 rounded-lg shadow-2xl h-screen flex flex-col w-full p-5">
        <div class="w-full flex justify-center gap-2 items-center mb-5">
            <span class="text-black font-bold text-2xl">OPCIONAIS</span>
            <RouterLink to="/admin/painel/opcionais"
                class="bg-sky-700 shadow-lg rounded-sm h-8 w-20 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                VOLTAR</RouterLink>
        </div>
        <form @submit.prevent="submit" class="h-full flex flex-col items-center">
            <div class="flex flex-col w-[250px] mb-1">
                <label class="text-black" for="">Nome</label>
                <input
                    :class="{ 'border-red-700': messages.nome[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                    v-model="nome" type="text">
                <small class="text-red-700">{{ messages.nome[0] }}</small>
            </div>
            <button :disabled="loading" @click="submit"
                class="mt-2 bg-sky-700 shadow-lg rounded-sm hover:brightness-75 transition duration-300 flex justify-center items-center w-[250px] h-8">
                <span class="text-white" v-if="!loading">ENVIAR</span>
                <img v-if="loading" class="w-5" src="/src/img/loading.gif" alt="">
            </button>
        </form>
    </div>
</template>
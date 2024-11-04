<script lang="ts" setup>
import { Ref, ref, computed, defineProps, watch } from 'vue';
import marcaCreate from '../../services/marcaCrud/marcaCreate';
import categoriaCreate from '../../services/categoriaCrud/categoriaCreate';
import opcionalCreate from '../../services/opcionalCrud/opcionalCreate';

let response;
let messages = ref('');
let loading: Ref<boolean> = ref(false);
let nameSubmit: Ref<string> = ref('');
const emit = defineEmits(['toggleModal']);
const props = defineProps<{
    show: boolean;
    name: string;
}>();

let localShow: Ref<boolean> = ref(props.show);

watch(() => props.show, (newVal) => {
    localShow.value = newVal;
});

const toggleModal = () => {
    localShow.value = !localShow.value;
    emit('toggleModal', localShow.value);
};

const payloadCategory = computed(() => ({
    nome: nameSubmit.value,
}));

const payloadMarca = computed(() => ({
    nome: nameSubmit.value,
}));

const payloadOpcional = computed(() => ({
    nome: nameSubmit.value,
}));

const submit = async () => {
    loading.value = true;
    if (props.name === 'Categoria') {
        response = await categoriaCreate(payloadCategory.value);
        if(response != true) {
            messages.value = response.nome;
        }else{
            localShow.value = false;
            emit('toggleModal', localShow.value);
        }
    } else if (props.name === 'Marca') {
        response = await marcaCreate(payloadMarca.value);
        if(response != true) {
            messages.value = response.nome;
        }else{
            localShow.value = false;
            emit('toggleModal', localShow.value);
        }
    } else if (props.name === 'Opcional') {
        response = await opcionalCreate(payloadMarca.value);
        if(response != true) {
            messages.value = response.nome;
        }else{
            localShow.value = false;
            emit('toggleModal', localShow.value);
        }
    } 
    loading.value = false;
};
</script>

<template>
    <div @click.self="toggleModal" v-if="localShow"
        class="flex justify-center items-center bg-black/50 fixed top-0 right-0 h-full w-full">
        <div class="bg-gray-100 rounded-lg shadow-2xl flex flex-col p-5">
            <div class="w-full flex justify-center gap-2 items-center mb-5">
                <span class="text-black font-bold text-2xl">{{ name }}</span>
            </div>
            <form @submit.prevent="submit" class="h-full flex flex-col items-center">
                <div class="flex flex-col w-[250px] mb-1">
                    <label class="text-black" for="">Nome</label>
                    <input
                        :class="{ 'border-red-700': messages != '', 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="nameSubmit" type="text">
                    <small class="text-red-700">{{ messages[0] }}</small>
                </div>
                <button :disabled="loading" @click="submit"
                    class="bg-sky-700 shadow-lg rounded-sm hover:brightness-75 transition duration-300 flex justify-center items-center w-[250px] h-8">
                    <span class="text-white" v-if="!loading">ENVIAR</span>
                    <img v-if="loading" class="w-5" src="/src/img/loading.gif" alt="">
                </button>
            </form>
        </div>
    </div>
</template>

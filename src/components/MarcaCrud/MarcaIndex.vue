<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { onMounted } from 'vue';
import type marca from '@/types/marcaTypes/marca';
import marcaDelete from '@/services/marcaCrud/marcaDelete';
import marcaIndex from '@/services/marcaCrud/marcaIndex';
import { useRouter } from 'vue-router'
import marcaPesquisar from '@/services/marcaCrud/marcaPesquisar';

let datas: Ref<Array<marca>> = ref([]);
let loading: Ref<boolean> = ref(false);
let response: Ref<boolean> = ref(false);
let router = useRouter();
let modal: Ref = ref(false);
let marca_id: Ref = ref();
let pesquisa: Ref<string> = ref('');

onMounted(async () => {
    loading.value = false;
    datas.value = await marcaIndex();
    loading.value = true;
})

const deleteMarca = async () => {
    response.value = await marcaDelete(marca_id.value);
    if(response.value != true){
        alert(response.value.message);
        return;
    }
    router.go(0);
}

const pesquisar = async () => {
    loading.value = false;
    if (pesquisa.value == '') {
        datas.value = await marcaIndex();
    } else {
        datas.value = await marcaPesquisar(pesquisa.value);
    }
    loading.value = true;
}


const openModal = (id: number) => {
    modal.value = !modal.value;
    marca_id.value = id;
}

</script>
<template>
    <AdminDelete />
    <img v-if="!loading" class="w-10 h-10 mt-28" src="/src/img/loading.gif" alt="">
    <div v-if="loading" class="bg-gray-100 rounded-lg shadow-2xl w-full p-5 min-h-screen o">
        <div class="w-full flex justify-center gap-2 items-center mb-5">
            <span class="text-black font-bold text-2xl">MARCAS</span>
            <RouterLink to="/admin/painel/marca-create"
                class="bg-sky-700 shadow-lg rounded-sm h-8 w-20 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                CRIAR</RouterLink>
        </div>
        <div v-if="loading" class="w-full flex justify-center flex-col sm:rounded-lg  text-gray-500">
            <form @submit.prevent="pesquisar" class="w-full flex justify-end mb-1 gap-1 items-center">
                <input v-model="pesquisa" class="pl-1 border h-8 shadow-md rounded-sm" type="text">
                <button @click="pesquisar" to="/admin/painel/create"
                    class="bg-sky-700 shadow-lg rounded-sm h-8 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">PESQUISAR</button>
            </form>
            <table class="text-sm min-w-[350px]">
                <thead class="text-xs text-white uppercas">
                    <tr class="bg-sky-800 border-b border-gray-700">
                        <th class="px-6 py-4">NOME</th>
                        <th class="px-6 py-4">DATA CRIAÇÃO</th>
                        <th class="px-6 py-4">OPÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b bg-sky-950 border-gray-700" v-for="marca in datas" :key="marca.id">
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white text-center">{{ marca.nome }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white text-center">{{ marca.created_at }}</td>
                        <td class="px-6 py-4 flex justify-center">
                            <RouterLink :to="`/admin/painel/marca-update/${marca.id}`"
                                class="bg-sky-700 text-white h-6 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded-l-sm">
                                <img src="/src/icons/config.svg" alt="">    
                            </RouterLink>
                            <button @click="openModal(marca.id)"
                                class="bg-red-700 text-white h-6 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded-r-sm">
                                <img src="/src/icons/delete.svg" alt="">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <div @click.self="openModal" v-if="modal"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div class="bg-white p-5 w-[500px] text-center">
                <span class="text-black font-bold text-2xl">Tem certeza que deseja deletar?</span>
                <div class="flex justify-center gap-2 mt-5">
                    <button @click="openModal"
                        class="bg-sky-700 shadow-lg rounded-sm h-8 w-24 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                        CANCELAR</button>
                    <button @click="deleteMarca"
                        class="bg-red-700 shadow-lg rounded-sm h-8 w-24 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                        DELETAR
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
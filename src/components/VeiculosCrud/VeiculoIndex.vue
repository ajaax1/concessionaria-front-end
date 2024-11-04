<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { onMounted } from 'vue';
import type veiculo from '@/types/veiculoTypes/veiculo';
import veiculoDelete from '@/services/veiculoCrud/veiculoDelete';
import veiculoIndex from '@/services/veiculoCrud/veiculoIndex';
import { useRouter } from 'vue-router'
import veiculoPesquisar from '@/services/veiculoCrud/veiculoPesquisar';

let datas: Ref<Array<veiculo>> = ref([]);
let loading: Ref<boolean> = ref(false);
let response: Ref<boolean> = ref(false);
let router = useRouter();
let pesquisa: Ref<string> = ref('');

onMounted(async () => {
    loading.value = false;
    datas.value = await veiculoIndex();
    loading.value = true;
})

const deleteVeiculo = async (id: number) => {
    response.value = await veiculoDelete(id);
    if(response.value != true){
        alert(response.value.message);
        return;
    }
    router.go(0);
}

const pesquisar = async () => {
    loading.value = false;
    if (pesquisa.value == '') {
        datas.value = await veiculoIndex();
    } else {
        datas.value = await veiculoPesquisar(pesquisa.value);
    }
    loading.value = true;
}

</script>
<template>
    <AdminDelete />
    <img v-if="!loading" class="w-10 h-10 mt-28" src="/src/img/loading.gif" alt="">
    <div v-if="loading" class="bg-gray-100 rounded-lg shadow-2xl w-full p-5 min-h-screen o">
        <div class="w-full flex justify-center gap-2 items-center mb-5">
            <span class="text-black font-bold text-2xl">VEICULOS</span>
            <RouterLink to="/admin/painel/veiculo-create"
                class="bg-sky-700 shadow-lg rounded-sm h-8 w-20 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                CRIAR</RouterLink>
        </div>

        <div v-if="loading" class="w-full flex flex-col justify-center sm:rounded-lg  text-gray-500">
            <form @submit.prevent="pesquisar" class="w-full flex justify-end mb-1 items-center gap-1">
                <input v-model="pesquisa" class="pl-1 border h-8 shadow-md rounded-sm" type="text">
                <button @click="pesquisar" to="/admin/painel/create"
                    class="bg-sky-700 shadow-lg rounded-sm h-8 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">PESQUISAR</button>
            </form>
            <table class="text-left text-sm min-w-[600px]">
                <thead class="text-xs text-white uppercas">
                    <tr class="bg-sky-800 border-b border-gray-700">
                        <th class="px-6 py-4">NOME</th>
                        <th class="px-6 py-4">MARCA</th>
                        <th class="px-6 py-4">CATEGORIA</th>
                        <th class="px-6 py-4">ANO</th>
                        <th class="px-6 py-4">PREÇO</th>
                        <th class="px-6 py-4">STATUS</th>
                        <th class="px-6 py-4">DATA CRIAÇÃO</th>
                        <th class="px-6 py-4 text-center">OPÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b bg-sky-950 border-gray-700" v-for="veiculo in datas" :key="veiculo.id">
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.nome }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.marca && veiculo.marca.nome ? veiculo.marca.nome : 'NENHUMA' }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.categoria && veiculo.categoria.nome ? veiculo.categoria.nome : 'NENHUMA' }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.ano }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.preco }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.status }}</td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ veiculo.created_at }}</td>
                        <td class="px-6 py-4 flex">
                            <RouterLink :to="`/admin/painel/veiculo-update/${veiculo.id}`"
                                class="bg-sky-700 text-white h-6 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded-l-sm">
                                <img src="/src/icons/config.svg" alt="">
                            </RouterLink>
                            <button @click="deleteVeiculo(veiculo.id)"
                                class="bg-red-700 text-white h-6 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded-r-sm">
                                <img src="/src/icons/delete.svg" alt="">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
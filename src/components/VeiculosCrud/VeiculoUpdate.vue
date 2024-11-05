<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { computed, ref, ComputedRef, Ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import veiculoUpdate from '../../services/veiculoCrud/veiculoUpdate';
import marcasIndex from '../../services/marcaCrud/marcaIndex';
import categoriaIndex from '../../services/categoriaCrud/categoriaIndex';
import opcionalIndex from '../../services/opcionalCrud/opcionalIndex';
import SmallModal from '../common/SmallModal.vue';
import veiculoShow from '../../services/veiculoCrud/veiculoShow';
import draggable from 'vuedraggable'
import config from '../../services/config';

const router = useRouter();
let messages = ref({
    nome: [],
    marca_id: [],
    categoria_id: [],
    modelo: [],
    ano: [],
    cor: [],
    preco: [],
    descricao: [],
    status: [],
    quilometragem: [],
    opcionaisVeiculo: [],
    nomeMarca: [],
    nomeCategoria: [],
    nomeOpcional: [],
    cambio: []
});
let datas = ref({});
let nome: Ref = ref('');
let cambio: Ref = ref('');
let imagens = ref([]);
let imagens_submit = ref([]);
let marca_id: Ref = ref('');
let marcas: Ref = ref([]);
let categorias: Ref = ref([]);
let opcionais: Ref = ref([]);
let opcionais_submit: Ref = ref([]);
let opcional = ref({
    id: '',
    nome: ''
});
let categoria_id: Ref = ref('');
let modelo: Ref = ref('');
let ano: Ref = ref('');
let cor: Ref = ref('');
let preco: Ref = ref('');
let descricao: Ref = ref('');
let status = ref<'USADO' | 'NOVO' | 'SEMINOVO' | ''>('');
let quilometragem = ref('');
let loading: Ref<boolean> = ref(false);
let response = null;
let showBrand: Ref = ref(false);
let showCategory: Ref = ref(false);
let showOpcional: Ref = ref(false);
let id = router.currentRoute.value.params.id;
const payload: ComputedRef = computed(() => {
    return {
        nome: nome.value,
        marca_id: marca_id.value,
        modelo: modelo.value,
        ano: ano.value,
        cor: cor.value,
        preco: preco.value,
        descricao: descricao.value,
        status: status.value,
        quilometragem: quilometragem.value,
        categoria_id: categoria_id.value,
        opcionaisVeiculo: opcionais_submit.value,
        cambio: cambio.value
    }
})

onMounted(async () => {
    loading.value = true;
    marcas.value = await marcasIndex();
    categorias.value = await categoriaIndex();
    opcionais.value = await opcionalIndex();
    datas.value = await veiculoShow(id);
    if(datas.value.descricao == null){
        datas.value.descricao = '';
    }
    nome.value = datas.value.nome;
    if (datas.value.marca_id != null) {
        marca_id.value = datas.value.marca_id;
    }
    if (datas.value.categoria_id != null) {
        categoria_id.value = datas.value.categoria_id;
    }
    if (datas.value.imagens != null) {
        datas.value.imagens.forEach(element => {
            imagens.value.push({
                file: null,
                preview: config.url + '/storage/' + element.url
            }
            );
        });
    }
    modelo.value = datas.value.modelo;
    ano.value = datas.value.ano;
    cor.value = datas.value.cor;
    preco.value = datas.value.preco;
    descricao.value = datas.value.descricao;
    status.value = datas.value.status.toUpperCase();
    quilometragem.value = datas.value.quilometragem;
    cambio.value = datas.value.cambio;
    datas.value.opcionais.forEach(element => {
        opcionais_submit.value.push({
            opcional_id: element.id,
            nome: element.nome
        });
    });
    loading.value = false;
})

const opcionaisSubmit = () => {
    let opcionalSubmit = {
        opcional_id: opcional.value.id,
        nome: opcional.value.nome
    }
    for (let opcionais_index of opcionais_submit.value) {
        if (opcionais_index.opcional_id == opcionalSubmit.opcional_id) {
            opcional.value = {
                id: '',
                nome: ''
            }
            return;
        }
    }
    opcionais_submit.value.push(opcionalSubmit);
    opcional.value = {
        id: '',
        nome: ''
    }
}

const deleteOpcional = (index: string) => {
    opcionais_submit.value.splice(index, 1);
}

const submit = async () => {
    loading.value = true;
    imagens_submit.value = imagens.value.map((element: any) => {
        if (element.file) {
            return element.file;
        } else if (element.preview) {
            return element.preview.replace(config.url + '/storage/', '');
        }
    });
    response = await veiculoUpdate(payload.value, id, imagens_submit.value);
    if (response == true) {
        router.push('/admin/painel/veiculos');
    }
    messages.value = {
        nome: response.nome ?? [],
        marca_id: response.marca_id ?? [],
        categoria_id: response.categoria_id ?? [],
        modelo: response.modelo ?? [],
        ano: response.ano ?? [],
        cor: response.cor ?? [],
        preco: response.preco ?? [],
        descricao: response.descricao ?? [],
        status: response.status ?? [],
        quilometragem: response.quilometragem ?? [],
        opcionaisVeiculo: response.opcionaisVeiculo ?? [],
        cambio: response.cambio ?? []
    }
    loading.value = false;
}

const isBrandModelOpen = async (value: boolean) => {
    showBrand.value = value;
    marcas.value = await marcasIndex();
}

const isCategoryModelOpen = async (value: boolean) => {
    showCategory.value = value;
    categorias.value = await categoriasIndex();
}

const isOpcionalModelOpen = async (value: boolean) => {
    showOpcional.value = value;
    opcionais.value = await opcionalIndex();
}

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const newFiles = Array.from(target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        imagens.value = [...imagens.value, ...newFiles];
    }
};

const removeImage = (preview) => {
    const index = imagens.value.findIndex(image => image.preview === preview);
    if (index !== -1) {
        imagens.value.splice(index, 1);
    }
};

</script>
<template>
    <div class="bg-gray-100 rounded-lg shadow-2xl min-h-screen flex flex-col w-full p-5">
        <div class="w-full flex justify-center gap-2 items-center mb-5">
            <span class="text-black font-bold text-2xl">VEICULOS</span>
            <RouterLink to="/admin/painel/veiculos"
                class="bg-sky-700 shadow-lg rounded-sm h-8 w-20 hover:brightness-75 transition duration-300 flex justify-center items-center text-white">
                VOLTAR</RouterLink>
        </div>
        <form @submit.prevent="submit" class="h-full flex flex-col items-center">
            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Nome</label>
                    <input
                        :class="{ 'border-red-700': messages.nome[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="nome" type="text">
                    <small class="text-red-700">{{ messages.nome[0] }}</small>
                </div>
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Marcas</label>
                    <div class="flex items-center gap-1">
                        <select v-model="marca_id"
                            :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'w-full': true, 'pl-1': true, 'border-red-700': messages.marca_id[0] !== undefined }">
                            <option value="" selected>Selecione uma marca</option>
                            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}
                            </option>
                        </select>
                        <button @click.prevent="showBrand = !showBrand"
                            class="bg-green-700 text-white h-8 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded">
                            <img src="/src/icons/add.svg" alt="">
                        </button>
                    </div>
                    <small class="text-red-700">{{ messages.marca_id[0] }}</small>
                </div>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Modelo</label>
                    <input
                        :class="{ 'border-red-700': messages.modelo[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="modelo" type="text">
                    <small class="text-red-700">{{ messages.modelo[0] }}</small>
                </div>

                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Ano</label>
                    <input
                        :class="{ 'border-red-700': messages.ano[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="ano" type="text" v-mask="'####/####'">
                    <small class="text-red-700">{{ messages.ano[0] }}</small>
                </div>
            </div>

            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Cor</label>
                    <input
                        :class="{ 'border-red-700': messages.cor[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="cor" type="text">
                    <small class="text-red-700">{{ messages.cor[0] }}</small>
                </div>

                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Preço</label>
                    <input
                        :class="{ 'border-red-700': messages.preco[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="preco" type="text">
                    <small class="text-red-700">{{ messages.preco[0] }}</small>
                </div>
            </div>

            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Quilometragem</label>
                    <input
                        :class="{ 'border-red-700': messages.quilometragem[0] !== undefined, 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="quilometragem" type="text">
                    <small class="text-red-700">{{ messages.quilometragem[0] }}</small>
                </div>
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Status</label>
                    <select
                        :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true, 'border-red-700': messages.status[0] !== undefined }"
                        v-model="status">
                        <option value="">Selecione um status</option>
                        <option value="USADO">Usado</option>
                        <option value="NOVO">Novo</option>
                        <option value="SEMINOVO">Seminovo</option>
                    </select>
                    <small class="text-red-700">{{ messages.status[0] }}</small>
                </div>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Opcionais</label>
                    <div class="flex items-center gap-1">
                        <select @change="opcionaisSubmit" v-model="opcional"
                            :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true, 'w-full': true, 'border-red-700': messages.opcionaisVeiculo[0] !== undefined }">
                            <option :value="{
                                id: '',
                                nome: ''
                            }" selected>Selecione um opcional</option>
                            <option v-for="opcional in opcionais" :key="opcional.id" :value="opcional">{{ opcional.nome
                                }}</option>
                        </select>
                        <button @click.prevent="showOpcional = !showOpcional"
                            class="bg-green-700 text-white h-8 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded">
                            <img src="/src/icons/add.svg" alt="">
                        </button>
                    </div>
                    <small class="text-red-700">{{ messages.opcionaisVeiculo[0] }}</small>
                </div>
                <div class="flex flex-col sm:w-1/2 w-full mb-1">
                    <label class="text-black" for="">Categoria</label>
                    <div class="flex items-center gap-1">
                        <select v-model="categoria_id"
                            :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true, 'w-full': true, 'border-red-700': messages.categoria_id[0] !== undefined }">
                            <option value="" selected>Selecione uma categoria</option>
                            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{
                                categoria.nome }}</option>
                        </select>
                        <button @click.prevent="showCategory = !showCategory"
                            class="bg-green-700 text-white h-8 p-2 hover:brightness-75 transition duration-300 flex justify-center items-center text-xs font-bold rounded">
                            <img src="/src/icons/add.svg" alt="">
                        </button>
                    </div>
                    <small class="text-red-700">{{ messages.categoria_id[0] }}</small>
                </div>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-col">
                <ul class="flex flex-col gap-1">
                    <li v-motion-pop class="hover:brightness-75 text-xs rounded-md inline-flex p-1 bg-slate-200 gap-2 items-center max-w-max"
                        v-for="(opcional, index) in opcionais_submit" :key="index">
                        {{ opcional.nome }}
                        <div @click="deleteOpcional(index)" class="bg-red-700 cursor-pointer">
                            <img src="/src/icons/delete.svg" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sm:w-[500px] w-full">
                <div class="flex flex-col w-full mb-1">
                    <label class="text-black" for="">Câmbio</label>
                    <select
                        :class="{ 'border': true, 'h-8': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true, 'border-red-700': messages.cambio[0] !== undefined }"
                        v-model="cambio">
                        <option value="">Selecione um câmbio</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatico">Automático</option>
                        <option value="Automatizado">Automatizado</option>
                    </select>
                    <small class="text-red-700">{{ messages.cambio[0] }}</small>
                </div>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col w-full mb-1">
                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file"
                            class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-sky-700 hover:brightness-75 transition duration-300">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-white"><span class="font-semibold">Click to upload</span> or
                                    drag and drop</p>
                                <p class="text-xs text-white">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" accept="image/*"
                                @change="handleFileUpload" multiple />
                        </label>
                    </div>
                </div>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-wrap">
                <draggable v-model="imagens" tag="transition-group">
                    <template #item="{ element }">
                        <div v-motion-pop class="w-28 h-28 mb-8">
                            <img class="w-full h-full" :src="element.preview" alt="Imagem" />
                            <button class="w-full bg-sky-700 text-sm text-white"
                                @click.prevent="removeImage(element.preview)">REMOVER</button>
                        </div>
                    </template>
                </draggable>
            </div>
            <div class="flex sm:w-[500px] w-full gap-2 flex-col sm:flex-row justify-around">
                <div class="flex flex-col w-full mb-1">
                    <label class="text-black" for="">Descrição</label>
                    <textarea
                        :class="{ 'border-red-700': messages.descricao[0] !== undefined, 'border': true, 'min-h-32': true, 'shadow-md': true, 'rounded-sm': true, 'pl-1': true }"
                        v-model="descricao"></textarea>
                    <small class="text-red-700">{{ messages.descricao[0] }}</small>
                </div>
            </div>

            <button :disabled="loading" @click="submit"
                class="bg-sky-700 shadow-lg rounded-sm h-8hover:brightness-75 transition duration-300 flex justify-center items-center w-64 h-8 mt-2">
                <span class="text-white" v-if="!loading">ENVIAR</span>
                <img v-if="loading" class="w-5" src="/src/img/loading.gif" alt="">
            </button>
        </form>
    </div>
    <SmallModal @toggleModal="isBrandModelOpen" :show="showBrand" name="Marca" />
    <SmallModal @toggleModal="isCategoryModelOpen" :show="showCategory" name="Categoria" />
    <SmallModal @toggleModal="isOpcionalModelOpen" :show="showOpcional" name="Opcional" />
</template>
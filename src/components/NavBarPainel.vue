<script setup lang="ts">
const props = defineProps({
    showNav: Boolean
});

</script>
<template>
    <div :class="['bg-gray-100', 'h-auto', 'flex-col', 'w-52', 'p-2', 'gap-2', {'lg:fixed':props.showNav}, {'-translate-x-full':props.showNav},{'duration-300':props.showNav},'flex','absolute','lg:static','min-w-max']">
        <div class="w-full">
            <RouterLink to="/admin/painel" class="bg-sky-700 shadow-lg rounded-sm h-8 w-full hover:brightness-75 transition duration-300 flex justify-center items-center text-white">DADOS</RouterLink>
        </div>
        <div class="w-full">
            <RouterLink to="/admin/painel/config" class="bg-sky-700 shadow-lg rounded-sm h-8 hover:brightness-75 transition duration-300 flex justify-center items-center text-white w-full">ADMIN</RouterLink>
        </div> 
        <div class="w-full">
            <RouterLink to="/admin/painel/veiculos" class="bg-sky-700 shadow-lg rounded-sm h-8 hover:brightness-75 transition duration-300 flex justify-center items-center text-white w-full">VEÍCULOS</RouterLink>
        </div> 
        <div class="w-full">
            <RouterLink to="/admin/painel/marcas" class="bg-sky-700 shadow-lg rounded-sm h-8 hover:brightness-75 transition duration-300 flex justify-center items-center text-white w-full">MARCAS</RouterLink>
        </div> 
        <div class="w-full">
            <RouterLink to="/admin/painel/categorias" class="bg-sky-700 shadow-lg rounded-sm h-8 hover:brightness-75 transition duration-300 flex justify-center items-center text-white w-full">CATEGORIAS</RouterLink>
        </div>
        <div class="w-full">
            <RouterLink to="/admin/painel/opcionais" class="bg-sky-700 shadow-lg rounded-sm h-8 hover:brightness-75 transition duration-300 flex justify-center items-center text-white w-full">OPCIONAIS</RouterLink>
        </div> 
    </div>
</template>
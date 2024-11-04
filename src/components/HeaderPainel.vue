<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logout from '@/services/logout.ts';

const router = useRouter();
let showNav:Ref<boolean> = ref(false);
let path:Ref<string> = ref('/src/icons/menu.svg');
let name:Ref<string|null> = ref(localStorage.getItem('name'));
let response:Ref<boolean>= ref(false);
const emit = defineEmits({
    'toggleNav':null
});

const toggleNav = () => {
    showNav.value = !showNav.value;
    if(showNav.value == false){
        path.value = '/src/icons/menu.svg';
    }else{
        path.value = '/src/icons/close.svg';
    }
    emit('toggleNav');
}

const logoutButton = async () => {
    response.value = await logout();
    if(response.value){
        router.push('/');
    }
}
</script>

<template>
    <header class="w-full bg-gray-100 flex justify-between shadow-md shadow-slate-200 pl-5 pr-5 items-center h-14">
        <img @click="toggleNav" class=" cursor-pointer" :src="path" alt="">
        <div class="flex gap-2">
            <span class="text-black">{{ name }}</span>
            <img @click="logoutButton" class="cursor-pointer" src="/src/icons/logout.svg" alt="">    
        </div>
    </header>
</template>
<style scoped>

</style>
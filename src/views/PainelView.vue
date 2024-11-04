<script setup lang="ts">
import NavBarPainel  from '../components/NavBarPainel.vue';
import HeaderPainel from '../components/HeaderPainel.vue'; 
import { ref } from 'vue';
import type { Ref} from 'vue';

let showNav:Ref<boolean> = ref(false);
const toggleNav = () => {
    showNav.value = !showNav.value;
}

</script>
<template>
    <section class="flex flex-col">
            <HeaderPainel @toggleNav="toggleNav"/>
        <div class="flex w-full min-h-screen h-full">
            <NavBarPainel :showNav="showNav" />
            <div class="w-full flex-1 flex p-2 justify-center">
                <RouterView/>
            </div>   
        </div>
    </section>
</template>

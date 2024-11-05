<script setup lang="ts">
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <header class="w-full">
      <nav class="w-full flex justify-center bg-slate-100 h-16 pl-10">
        <ul class="max-w-screen-xl w-full flex gap-10 h-full items-center">
          <li class="text-black">
            <RouterLink to="/">Início</RouterLink>
          </li>
          <li class="text-black">
            <RouterLink to="">Contato</RouterLink>
          </li>
          <li class="text-black">
            <RouterLink to="">Sobre Nós</RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="w-full">
      <section>
        <img class="w-full" src="../img/car-banner.png" alt="">
      </section>
      <section class="flex justify-center w-full p-10">
        <div class="max-w-screen-xl w-full flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-3xl">Buscar Carros</span>
            <input class="shadow-md text-black w-72 focus:outline-none focus:border-red-950 focus:border-2 border border-black h-7" placeholder=" pesquisar..." type="text">
          </div>
          <select class="p-2 shadow-md" name="" id="">
            <option value="">Ano mais novo</option>
            <option value="">Menor preço</option>
            <option value="">Maior preço</option>
            <option value="">Menor KM</option>
          </select>
        </div>  
      </section>
    </main>
  </div>
</template>

<style>
</style>
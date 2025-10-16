<script setup>
import { Suspense } from 'vue';
import { RouterView } from 'vue-router';
import HomeView from '@/view/Home.vue'
</script>

<template>
  <!-- <RouterView /> -->

  <!-- menggunakan Suspense -->
   <Suspense>
    <template #default> <!-- render HomeView jika data sudah ada -->
      <HomeView />
    </template>
    <template #fallback> <!-- render fallback jika data belum ada -->
      <div>Loading...</div>
    </template>
   </Suspense>

</template>

<style scoped>
</style>
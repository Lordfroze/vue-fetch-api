<script setup>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const page = ref(1) 

function nextPage () {
	page.value++;
}

onBeforeMount(() => {
	console.log('onBeforeMount')
})

onMounted(() => {
	console.log('onMounted')
})

onBeforeUpdate(() => {
	console.log('onBeforeUpdate')
})

onUpdated(() => {
	console.log('onUpdated')
})

onBeforeUnmount(() => {
	console.log('onBeforeUnmount')
})

onUnmounted(() => {
	console.log('onUnmounted')
})
</script>

<template>
	<main>
		{{ page }}
		 <button @click="nextPage">Next Page</button>
		<div class="product-grid">
			<ProductCard />
		</div>
		<div class="pagination">
			<Pagination />
		</div>
	</main>
</template>

<style scoped>
.product-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	width: 80%;
	margin: 0 auto;
}


.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}


</style>
<script setup>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

import { ref } from 'vue';
import axios from 'axios'; // import axios

const products = ref([]); // membuat state products dengan nilai awal array kosong

// menggunakan await secara langsung untuk dirender dengan Suspense
products.value = await axios
.get('http://localhost:3000/products')
.then((res) => res.data);
console.log(products.value);
</script>

<template>
	<main>
		<!-- {{ products }} -->
		<div class="product-grid">
			<!-- menampilkan setiap product menggunakan v-for dan passing product sebagai props ke ProductCard -->
			<ProductCard v-for="product in products" :key="product.id" :product="product" />
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
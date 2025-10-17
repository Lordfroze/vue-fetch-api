<script setup>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

import { ref, watch } from 'vue'; // import ref dan watch dari vue
import axios from 'axios'; // import axios

const products = ref([]); // membuat state products dengan nilai awal array kosong
const page = ref(1); // membuat state page dengan nilai awal 1
const limit = ref(8); // membuat state limit dengan nilai awal 8

// menggunakan await secara langsung untuk dirender dengan Suspense
products.value = await axios
.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`) // mengubah url dengan page dan limit
.then((res) => res.data);

// membuat fungsi watch untuk menampilkan data product ketika page / limit berubah
watch(page, async () => {
	// menambahkan await untuk menunggu data product dari server
	products.value = await axios
	.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`) // mengubah url dengan page dan limit
	.then((res) => res.data);
});

console.log(products.value);
</script>

<template>
	<main>
		<!-- {{ products }} -->
		<div class="product-grid">
			<!-- menampilkan setiap product menggunakan v-for dan passing product sebagai props ke ProductCard -->
			 <!-- karena menggunakan axios, data product ada di dalam property data -->
			<ProductCard v-for="(product, index) in products.data" 
			:key="index" 
			:product="product" />
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
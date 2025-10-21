<script setup>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
import Loading from '@/components/Loading.vue'
import ProductForm from '@/components/ProductForm.vue'

import { ref, watchEffect } from 'vue'; // import ref dan watch dari vue
import axios from 'axios'; // import axios

const products = ref([]); // membuat state products dengan nilai awal array kosong
const page = ref(1); // membuat state page dengan nilai awal 1
const limit = ref(8); // membuat state limit dengan nilai awal 8
const isLoading = ref(true); // membuat state isLoading dengan nilai awal true

async function fectchdata() {
	const API_URL = `http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`; // membuat state API_URL dengan nilai awal http://localhost:3000/products
	try {
		isLoading.value = true; // mengubah nilai isLoading menjadi true sebelum data product di load
		const response = await axios.get(API_URL);
		products.value = response.data;
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false; // mengubah nilai isLoading menjadi false setelah data product di load
	}
}

// Membuat watcher effect untuk memanggil fectchdata setiap kali page atau limit berubah
watchEffect(() => {
	fectchdata(); // memanggil fectchdata
});

// Membuat fungsi changePage
function changePage(newPage) {
	if (newPage < 1) return; // jika newPage kurang dari 1, maka return
	if (newPage > products.value.pages) return; // return jika newPage lebih besar dari pages,variabel pages didapatkan dari respon server http://localhost:3000/products?_page=1&_per_page=8
	page.value = newPage; // mengubah nilai page dengan newPage
}

</script>


<template>
	<!-- menampilkan loading spinner ketika isLoading true -->
		<div v-if="isLoading">
			<Loading />
		</div>

	<main v-else>
		<ProductForm /> <!-- menampilkan form product -->
		<div class="product-grid">
			<!-- menampilkan setiap product menggunakan v-for dan passing product sebagai props ke ProductCard -->
			 <!-- karena menggunakan axios, data product ada di dalam property data -->
			<ProductCard v-for="(product, index) in products.data" 
			:key="index" 
			:product="product" />
		</div>
		<div class="pagination"> <!-- menampilkan pagination -->
			<!-- mengirimkan page dan totalPages ke Pagination -->
			 <!-- mengirimkan changePage ke Pagination -->
			<Pagination 
			:page= "page"
			:totalPages = "products.pages"
			@change-Page="changePage"
			/>
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
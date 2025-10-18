<script setup>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
import Loading from '@/components/Loading.vue'

import { onMounted, ref, watch } from 'vue'; // import ref dan watch dari vue
import axios from 'axios'; // import axios

const products = ref([]); // membuat state products dengan nilai awal array kosong
const page = ref(1); // membuat state page dengan nilai awal 1
const limit = ref(8); // membuat state limit dengan nilai awal 8
const API_URL = `http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`; // membuat state API_URL dengan nilai awal http://localhost:3000/products
const isLoading = ref(true); // membuat state isLoading dengan nilai awal true

// menggunakan await secara langsung untuk dirender dengan Suspense
// products.value = await axios
// .get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`) // mengubah url dengan page dan limit
// .then((res) => res.data);

// membuat onMounted untuk menampilkan data product ketika halaman pertama kali di load
onMounted(async () => {
	try{
		isLoading.value = true; // mengubah nilai isLoading menjadi true sebelum data product di load
		// menambahkan await untuk menunggu data product dari server
		products.value = await axios.get(API_URL).then((res) => res.data);
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false; // mengubah nilai isLoading menjadi false setelah data product di load
	}
	
});

// membuat fungsi watch untuk menampilkan data product ketika page / limit berubah
watch(page, async () => {
	try{
		isLoading.value = true; // mengubah nilai isLoading menjadi true sebelum data product di load
		// menambahkan await untuk menunggu data product dari server
		products.value = await axios.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`).then((res) => res.data);
	}
	 catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false; // mengubah nilai isLoading menjadi false setelah data product di load
	}
});

console.log(products.value);

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
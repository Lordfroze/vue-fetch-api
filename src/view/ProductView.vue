<script setup>
import { onMounted, ref } from 'vue'; // import onMounted dan ref dari vue
import { useRoute, useRouter } from 'vue-router'; // import useRoute dan useRouter dari vue-router
import axios from 'axios'; // import axios dari axios
import ProductForm from '@/components/ProductForm.vue'; // import ProductForm dari @/components/ProductForm.vue

const route = useRoute(); // memanggil useRoute dan assign ke route
const router = useRouter(); // memanggil useRouter dan assign ke router

const id = route.params.id; // mengambil id dari route params
const product = ref({}); // membuat ref product dengan nilai awal {}
const API_URL = `http://localhost:3000/products/${id}`; // membuat endpoint API_URL

onMounted(() => { // onMounted akan dijalankan setelah component di render
	fetchData(); // fetchData akan dijalankan setelah component di render
});

// fungsi menampilkan data product dari API
async function fetchData() { // fetchData akan dijalankan setelah component di render
	try {
		const response = await axios.get(API_URL); // fetch data dari API_URL
		product.value = response.data; // assign data ke product.value
	} catch (error) { // catch error jika terjadi error
		console.error(error); // log error ke console
	}
}

// membuat fungsi update data product ke API
async function updateProduct(product) {
	try {
		await axios.put(API_URL, product); // mengupdate data product ke API_URL method sesuai api dari jsonserver
		router.push('/'); // redirect ke halaman utama setelah mengupdate data product
	} catch (error) {
		console.error(error);
	}
}

// fungsi menghapus data product dari API
async function deleteProduct() {
	try {
		await axios.delete(API_URL); // menghapus data product dari API_URL method sesuai api dari jsonserver
		router.push('/'); // redirect ke halaman utama setelah menghapus data product
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
	<div class="product-detail">
		<h2>{{ product.title }}</h2>
		<img :src="product.image" :alt="product.title" class="product-image" />
		<p>{{ product.description }}</p>
		<p>Rp{{ product.price }}</p>
		<ProductForm :product="product" @update-product="updateProduct" /> <!--menampilkan form edit product dengan membuat prop product dan emit update-product ke <ProductForm>-->
		<router-link to="/" class="back-button">Back</router-link> <!-- tombol back -->
		<button @click="deleteProduct" class="delete-button">Delete</button> <!-- tombol delete -->
	</div>
</template>

<style scoped>
.product-detail {
	margin-top: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f9f9f9;
	text-align: center;
}

.product-image {
	max-width: 100%;
	height: auto;
	margin-bottom: 10px;
}

.product-detail p {
	margin-bottom: 5px;
}

.product-detail button {
	margin-top: 10px;
	padding: 10px 20px;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.back-button {
	display: inline-block;
	padding: 8px 16px;
	background-color: #007bff;
	color: #fff;
	text-decoration: none;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.back-button:hover {
	background-color: #0056b3;
}

.delete-button {
	display: inline-block;
	padding: 8px 16px;
	background-color: #ff0000;
	color: #fff;
	text-decoration: none;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.delete-button:hover {
	background-color: #b30000;
}
</style>
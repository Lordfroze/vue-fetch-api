<script setup>
import { ref, defineEmits, watchEffect, computed } from 'vue'; // import ref, defineEmits, watchEffect, computed dari vue

const props = defineProps({
	product: Object,
});

// membuat ref title, description, price, image, id dengan nilai awal sesuai src/data/rest.json
const title = ref(props.product?.title || '');
const description = ref('');
const price = ref('');
const image = ref('');
const id = ref('');

// membuat watcher untuk props.product
// watcher akan dijalankan setiap kali props.product berubah
// watcher akan mengupdate nilai ref title, description, price, image, id dengan nilai dari props.product
watchEffect(() => {
	title.value = props.product?.title; // tanda ? berarti jika props.product.title ada nilai, maka assign ke title.value, jika tidak ada, assign ke ''
	description.value = props.product?.description;
	price.value = props.product?.price;
	image.value = props.product?.image;
	id.value = props.product?.id;
});

const showForm = ref(false); // membuat ref showForm dengan nilai awal false
const isUpdate = computed(() => !!props.product); // mengecek kondisi apakah props.product ada nilai atau tidak

const emit = defineEmits(['create-product', 'update-product']); // membuat emit create-product dan update-product

// Membuat fungsi saveProduct
function saveProduct() {
	const formData = {
		title: title.value,
		description: description.value,
		price: price.value,
		image: image.value,
	};
	if (isUpdate.value) { // jika isUpdate bernilai true
		emit('update-product', formData); // maka menjalankan emit update-product
	} else {  // jika isUpdate bernilai false
		emit('create-product', formData); // menjalankan emit create-product
	}
}
</script>

<template>
	<div class="form-container">
        <!-- tombol toggle form mengecek apakah isUpdate bernilai true atau false, jika true maka menampilkan tombol Edit, jika false maka menampilkan tombol Add -->
		<button @click="showForm = !showForm">
			{{ isUpdate ? 'Edit' : 'Add' }} Product
		</button>
		<div v-if="showForm" class="product-form"> <!-- menampilkan form product jika showForm bernilai true -->
			<form @submit.prevent="saveProduct"> <!-- mencegah submit form default,dan memanggil fungsi saveProduct -->
				<label for="title">Title:</label>
				<input type="text" id="title" v-model="title" required />
				<label for="description">Description:</label>
				<input type="text" id="description" v-model="description" required />
				<label for="price">Price:</label>
				<input type="number" id="price" v-model="price" required />
				<label for="image">Image:</label>
				<input type="text" id="image" v-model="image" required />
				<button type="submit">Save</button> <!-- tombol save -->
				<button type="button" @click="showForm = false">Close</button> <!-- tombol close -->
			</form>
		</div>
	</div>
</template>

<style scoped>
.form-container {
	text-align: center;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.form-container button {
	padding: 10px 20px;
	margin-top: 10px;
	background-color: #28a745;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.2s;
}

.form-container button:hover {
	background-color: #218838;
	transform: translateY(-2px);
}

.form-container button:focus {
	outline: none;
}

.form-container button:active {
	transform: translateY(1px);
	background-color: #1e7e34;
}

.product-form {
	margin-top: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	max-width: 400px;
	margin: 0 auto;
	text-align: left;
}

.product-form label {
	display: block;
	margin-bottom: 5px;
}

.product-form input[type='text'],
.product-form input[type='number'] {
	width: calc(100% - 20px);
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.product-form button {
	padding: 10px 20px;
	margin-top: 10px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.product-form button:hover {
	background-color: #0056b3;
}

.product-form button[type='submit'] {
	background-color: #28a745;
}

.product-form button[type='submit']:hover {
	background-color: #218838;
}

.product-form button[type='button'] {
	background-color: #dc3545;
}

.product-form button[type='button']:hover {
	background-color: #c82333;
}
</style>
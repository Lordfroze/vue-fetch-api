<script setup>
const props = defineProps({
	page: Number,
	totalPages : Number,
});

const emit = defineEmits(['change-Page']); // mendefinisikan event change-Page ,defineEmits berfungsi untuk mendefinisikan event yang akan diemit

function changePage(newPage){ // 
	emit('change-Page', newPage); // emit atau panggil event change-Page berisi newPage
}

</script>


<template>
    <button class="pagination-button" id="prevPage" @click="changePage(page - 1)" v-show="page > 1"> &lt;</button>
	<span> Page {{ page }} </span>
    <button class="pagination-button" id="nextPage" @click="changePage(page + 1)" v-show="page < totalPages"> &gt;</button>
</template>

<style scoped>
.pagination-button {
	background-color: #fff;
	color: #00b894;
	padding: 8px 12px;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	font-size: 16px;
	margin: 0 5px;
}
</style>
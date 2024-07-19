<script setup>
import ExpenseFormUpdate from '../components/ExpenseFormUpdate.vue';
</script>



<template>
  <main class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6 col-md-8">
        <h1 class="title mb-0 my-5">Modifier la dépense</h1>
        <ExpenseFormUpdate />
      </div>
    </div>
  </main>
</template>



<style scoped>
.title {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
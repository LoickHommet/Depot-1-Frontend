
<script setup>
import ExpensesList from '../components/ExpensesList.vue';
</script>



<template>
  <div class="expenses-list-page">
    <h1>Liste des Dépenses</h1>
    <ExpensesList />
  </div>
</template>



<style scoped>
.expenses-list-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
}
</style>

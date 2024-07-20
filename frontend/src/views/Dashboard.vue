<script setup>
import { onMounted, ref } from 'vue';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart.vue';
import { useExpenseService } from '../services/expenseService.js';

const { fetchMonthlyExpenses } = useExpenseService();

const monthlyExpenses = ref([]);

async function loadChartsData() {
  monthlyExpenses.value = await fetchMonthlyExpenses();
}

// Initialize data when the component is mounted
onMounted(() => {
  loadChartsData();
});
</script>

<template>
  <div>
    <MonthlyExpensesChart />
  </div>
</template>

<style scoped>
/* Add any styles for the dashboard here */
</style>a

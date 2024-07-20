<template>
  <div>
    <MonthlyExpensesChart />
    <DoughnutChart />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import { useExpenseService } from '../services/expenseService.js';

const { fetchMonthlyExpenses, fetchCategoryExpenses } = useExpenseService();

const monthlyExpenses = ref([]);
const categoryExpenses = ref([]);

async function loadChartsData() {
  monthlyExpenses.value = await fetchMonthlyExpenses();
  categoryExpenses.value = await fetchCategoryExpenses();
}

onMounted(() => {
  loadChartsData();
});
</script>

<style scoped>

</style>

<script setup>
import { ref, onMounted } from 'vue';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import { useExpenseService } from '../services/expenseService.js';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

const { fetchMonthlyExpenses, fetchCategoryExpenses } = useExpenseService();
const router = useRouter();



const monthlyExpenses = ref([]);
const categoryExpenses = ref([]);

async function loadChartsData() {
  monthlyExpenses.value = await fetchMonthlyExpenses();
  categoryExpenses.value = await fetchCategoryExpenses();
}

// Initialize data when the component is mounted
onMounted(() => {
  loadChartsData();
});
</script>

<template>
  <div class="dashboard-container">
    <div class="top-bar">
        <RouterLink  to="/expensesList" class="boutonDashboard" data-test-id="BordAside">Voir la liste des dépenses</RouterLink>
        <RouterLink  to="/addExpense" class="boutonDashboard" data-test-id="BordAside">Ajouter une dépense</RouterLink>
    </div>
    <div class="cards-container">
      <div class="card ">
        <h2 class="card-title">Dépenses Mensuelles</h2>
        <MonthlyExpensesChart />
      </div>
      <div class="card">
        <h2 class="card-title">Dépenses par Catégorie</h2>
        <DoughnutChart />
      </div>
    </div>
  </div>
</template>



<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  gap: 10px;
}

.boutonDashboard {
  transition: all 0.15s ease-in-out;
  border: none;
  height: 48px;
  padding: 8px 24px;
  border-radius: 5px;
  color: #fff; 
  background-color: rgba(var(--blue-color));
  box-shadow: 0px 0px 5px 2px rgba(66, 165, 245, 0.5); 
  text-decoration: none; 
  display: flex;
  align-items: center;
  justify-content: center;
}


.cards-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  height: 28em;
}

.cardMonthly{
    max-width: 200px;
}

.cardCategory{
    max-width: 400px;
}

.card-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
  color: #333;
}

</style>

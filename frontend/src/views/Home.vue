<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>Bienvenue sur votre tableau de bord des dépenses</h1>
      <p>Gérez vos dépenses efficacement et visualisez vos données financières en un coup d'œil.</p>
    </div>

    <div class="statistics-section" v-if="auth">
      <h2>Statistiques Résumées</h2>
      <div class="statistics-cards">
        <div class="stat-card">
          <h3>Total des dépenses ce mois-ci</h3>
          <p>{{ totalMonthlyExpenses }} €</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useExpenseService } from '../services/expenseService.js';


const { fetchMonthlyExpenses } = useExpenseService();

const totalMonthlyExpenses = ref(0);
const remainingBudget = ref(0);

async function loadHomeData() {
  try {
    const monthlyExpenses = await fetchMonthlyExpenses();
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthExpenses = monthlyExpenses.filter(expense => expense.month === currentMonth);
    
    totalMonthlyExpenses.value = currentMonthExpenses.reduce((total, expense) => total + parseFloat(expense.total), 0);

  } catch (error) {
    console.error("Erreur lors de la récupération des données pour la page d'accueil:", error);
  }
}

onMounted(() => {
  loadHomeData();
});
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}



.statistics-section {
  text-align: center;
  margin-bottom: 40px;
}

.statistics-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.stat-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
}

</style>

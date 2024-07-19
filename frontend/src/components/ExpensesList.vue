<script setup>
import { onMounted } from 'vue';
import { useExpenseService } from '../services/expenseService.js';
import Select from '../components/Select.vue';
import { RouterLink } from 'vue-router';


const { expenses, categories, selectedCategory, groupedExpenses, fetchExpenses, viewDetails, editExpense, deleteExpense } = useExpenseService();

function confirmDelete(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
        deleteExpense(id);
    }
}


function formatMonth(month) {
  return month
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

onMounted(fetchExpenses);
</script>

<template>
    <div>
        <div class="filters">
            <Select v-model="selectedCategory" @change="fetchExpenses">
                <option value="">Toutes les catégories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </Select>
        </div>
        <div class="expenses">
            <div v-for="(monthData, month) in groupedExpenses" :key="month" class="month-group">
                <div class="card-month">
                    <span class="month">{{ formatMonth(month) }}</span>
                    <span class="total">Total: {{ monthData.total.toFixed(2) }} €</span>
                </div>
                <div v-for="expense in monthData.expenses" :key="expense.id" class="expense-card">
                    <div class="card-content">
                        <p>Montant: {{ expense.amount }} €</p>
                        <p>Catégorie: {{ expense.category }}</p>
                        <div class="actions">
                            <RouterLink :to="`/details/${expense.id}`" class="action-link">🔍</RouterLink>
                            <button @click="editExpense(expense.id)">✏️</button>
                            <button @click="confirmDelete(expense.id)">🗑️</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.filters {
    margin-bottom: 20px;
}

.expenses {
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    overflow-y: auto;
}

.month-group {
    margin-bottom: 30px;
}

.expense-card {
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.card-month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(217, 176, 176, 0.448);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.card-month .month {
    font-size: 1.2em;
    font-weight: bold;
}

.card-month .total {
    font-size: 0.9em;
    font-weight: normal;
    color: #555;
}

.card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useExpenseService } from '../services/expenseService.js';
import { RouterLink } from 'vue-router';

const { fetchCategories, categories, selectedCategory, groupedExpenses, fetchExpenses, viewDetails, editExpense, deleteExpense } = useExpenseService();

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

onMounted(async () => {
    console.log('onMounted called');  // Ajoutez ce log pour vérifier l'appel de onMounted
    await fetchCategories();
    await fetchExpenses();
    console.log('Categories after fetchCategories:', categories.value);  // Ajoutez ce log pour vérifier les catégories après le fetch
});

// Ajoutez des logs pour le watcher
watch(selectedCategory, async () => {
    console.log('selectedCategory changed:', selectedCategory.value);  // Ajoutez ce log pour vérifier la catégorie sélectionnée
    await fetchExpenses();
});
</script>

<template>
    <div>
        <div class="filters">
            <select v-model="selectedCategory">
                <option value="">Toutes les catégories </option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
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
                            <RouterLink :to="`/edit-expense/${expense.id}`" class="action-link">✏️</RouterLink>
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
select{
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    height: 48px;
    padding: 10px 16px;
    background-color: unset;
    border: 1px solid rgba(var(--grey-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
    font-family: 'Poppins', sans-serif;
}
select:hover{
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}
select.error{
    border: 1px solid rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}
select.error:hover{
    outline: 3px solid rgba(var(--red-color), 0.6);
}
option{
    transition: all 0.15s ease-in-out;
    background-color: rgba(var(--white-color));
}
</style>

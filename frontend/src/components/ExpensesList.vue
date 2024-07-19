<script setup>
import { onMounted } from 'vue';
import { useExpenseService } from '../services/expenseService.js';

const { expenses, categories, selectedCategory, groupedExpenses, fetchExpenses, viewDetails, editExpense, deleteExpense } = useExpenseService();

function confirmDelete(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
        deleteExpense(id);
    }
}

onMounted(fetchExpenses);
</script>

<template>
    <div>
        <div class="filters">
            <label for="category-filter">Filtrer par catégorie:</label>
            <select v-model="selectedCategory" @change="fetchExpenses">
                <option value="">Toutes les catégories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
        </div>
        <div class="expenses">
            <div v-for="(expenses, month) in groupedExpenses" :key="month" class="month-group">
                
                <div class="card-month"><h2>{{ month }}</h2></div>
                <div v-for="expense in expenses" :key="expense.id" class="expense-card">
                    <div class="card-content">
                        <p>Montant: {{ expense.amount }} €</p>
                        <p>Catégorie: {{ expense.category }}</p>
                        <div class="actions">
                            <button @click="viewDetails(expense)">🔍</button>
                            <button @click="editExpense(expense)">✏️</button>
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
.expense-month {
    background: rgba(255, 255, 255, 0.448);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
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

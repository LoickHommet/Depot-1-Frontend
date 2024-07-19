<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExpenseService } from '../services/expenseService.js';
import Button from '../components/Button.vue';

const route = useRoute();
const router = useRouter();
const { fetchExpenseDetails, updateExpense, categories, expenseDetails } = useExpenseService();
const expense = ref({});

// Initialisation des données lorsque le composant est monté
onMounted(async () => {
    console.log('id:', route.params.id);
  const expenseId = route.params.id;
  await fetchExpenseDetails(expenseId);
  expense.value = { ...expenseDetails.value };
  console.log('Expense:', expense.value);
console.log('Expense amount:', expense.amount)
});

async function updateExpenseFrom() {
  try {
    await updateExpense(expense.value);
    router.push('/'); 
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la dépense:", error);
  }
}
;
function goBack() {
  router.go(-1);
}
</script>

<template>
  <div class="edit-expense">
    <h1>Modifier la dépense</h1>
    <form @submit.prevent="updateExpenseFrom">
      <div class="form-group">
        <label for="amount">Montant:</label>
        <input type="number" v-model.number="expense.amount" value="" id="amount" required />
      </div>
      <div class="form-group">
        <label for="text">Catégorie:</label>
        <input type="text" v-model.category="expense.category" id="category" required />
        
      </div>
      <div class="form-group">
        <label for="date">Date:</label>
        <input type="date" v-model="expense.date" id="date" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="expense.description" id="description"></textarea>
      </div>
      <Button :type="'submit'" :text="'Enregistrer les modifications'" :classSup="'w-100 mb-3'" />
      <Button :type="'button'" @click="goBack" :text="'Annuler'" :classSup="'w-100 mb-3'" />

    </form>
  </div>
</template>



<style scoped>
.edit-expense {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


input:not([type="radio"]) {
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    border: 1px solid rgba(var(--grey-color));
    height: 48px;
    padding: 10px 24px;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
    width: 100%;
}

input:hover {
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}

input:focus {
    outline: 3px solid rgba(var(--blue-color), 0.6);
}

input::file-selector-button {
    display: none;
}

input.error {
    border: 1px solid rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}

input.error:focus {
    outline: 3px solid rgba(var(--red-color), 0.6);
}

input[type="radio"] {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
</style>

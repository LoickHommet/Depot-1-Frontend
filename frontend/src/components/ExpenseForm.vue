<script setup>
import { ref } from 'vue';
import Button from '../components/Button.vue';
import { useExpenseService } from '../services/expenseService.js';
import { useAuthService } from '../services/authService.js';


const { auth } = useAuthService();

const amount = ref('');
const category = ref('');
const date = ref('');
const description = ref('');

const { addExpense } = useExpenseService();


async function submitForm() {

    try {

        if (!auth.value || !auth.value.id) {
            console.error("Utilisateur non authentifié ou ID utilisateur manquant");
            return;
        }

        await addExpense({
            amount: amount.value,
            category: category.value,
            date: date.value,
            description: description.value,
            user_id: auth.value.id,
        });

        // Réinitialiser les champs après soumission
        amount.value = '';
        category.value = '';
        date.value = '';
        description.value = '';
    } catch (error) {
        console.error("Erreur lors de l'ajout de la dépense:", error);
    }
}
</script>


<template>
    <form @submit.prevent="submitForm">
        <div class="form-group mb-2 my-4">
            <input type="number" placeholder="Montant" v-model="amount" id="amount" required />
        </div>
        <div class="form-group mb-2 my-4">
            <input type="text" placeholder="Catégorie" v-model="category" id="category" required />
        </div>
        <div class="form-group mb-2 my-4">
            <input type="date" placeholder="" v-model="date" id="date" required />
        </div>
        <div class="form-group mb-2 my-4">
            <input type="text" placeholder="Description" v-model="description" id="description" />
        </div>
        <div class="form-group mb-2 my-4">
            <Button :type="'submit'" :text="'Ajouter Dépense'" :classSup="'w-100 mb-3'" />
        </div>
    </form>

</template>


<style scoped>
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

label {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
}
</style>
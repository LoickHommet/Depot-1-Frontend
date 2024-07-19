<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExpenseService } from '../services/expenseService.js';
import Button from '../components/Button.vue';

const route = useRoute();
const router = useRouter();
const { fetchExpenseDetails, expenseDetails } = useExpenseService();

onMounted(() => {
    const expenseId = route.params.id;
    fetchExpenseDetails(expenseId);
});

const formattedDate = computed(() => {
    if (expenseDetails.value) {
        return new Date(expenseDetails.value.date).toLocaleDateString();
    }
    return '';
});

function goBack() {
    router.go(-1);
}
</script>

<template>
    <div class="details-container">
        <h1>Détails de la dépense</h1>
        <div v-if="expenseDetails" class="details">
            <div class="detail-item">
                <strong class="detail-label">Montant:</strong>
                <span class="detail-value">{{ expenseDetails.amount }} €</span>
            </div>
            <div class="detail-item">
                <strong class="detail-label">Catégorie:</strong>
                <span class="detail-value">{{ expenseDetails.category }}</span>
            </div>
            <div class="detail-item">
                <strong class="detail-label">Date:</strong>
                <span class="detail-value">{{ formattedDate }}</span>
            </div>
            <div class="detail-item">
                <strong class="detail-label">Description:</strong>
                <span class="detail-value">{{ expenseDetails.description }}</span>
            </div>
            <Button @click="goBack" :text="'Retour'" :classSup="'w-100 mb-3'" />
        </div>
        <div v-else class="loading">
            <p>Chargement des détails...</p>
        </div>
    </div>
</template>


<style scoped>
.details-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
}

.details {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.detail-item {
    border-bottom: 2px solid rgba(var(--blue-color));
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail-item:last-child {
    border-bottom: none;
}

.detail-label {
    font-weight: bold;
}

.detail-value {
    color: #333;
    font-size: 1.2em;
}

.loading {
    text-align: center;
    font-size: 1.2em;
    color: #777;
}
</style>

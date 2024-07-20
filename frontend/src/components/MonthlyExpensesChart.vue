<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" ref="barChart" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useExpenseService } from '../services/expenseService.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.dataset.label}: ${context.raw} €`;
                }
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Mois'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Somme d\'argent (€)'
            },
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return value + ' €'; // Ajouter le symbole euro aux étiquettes de l'axe y
                }
            }
        }
    }
});

const { fetchMonthlyExpenses } = useExpenseService();

const chartData = ref({
    labels: [], 
    datasets: [
        {
            label: 'Dépenses Mensuelles', 
            backgroundColor: '#42A5F5',
            data: [] // Les données seront mises à jour dynamiquement
        }
    ]
});

const chartRef = ref(null);

async function updateMonthlyData() {
    try {
        const data = await fetchMonthlyExpenses();
        console.log("Fetched Monthly Expenses Data:", data);

        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        const labels = data.map(expense => monthNames[expense.month - 1]);
        const chartDataValues = data.map(expense => parseFloat(expense.total)); // Convertir les totaux en nombres

        // Initialiser et mettre à jour les données du graphique
        chartData.value = {
            labels: labels,
            datasets: [
                {
                    label: 'Dépenses Mensuelles',
                    backgroundColor: '#42A5F5',
                    data: chartDataValues
                }
            ]
        };

        // Forcer la mise à jour du graphique
        if (chartRef.value && chartRef.value.chartInstance) {
            chartRef.value.chartInstance.update(); // Forcer la mise à jour
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données mensuelles:", error);
    }
}

onMounted(() => {
    updateMonthlyData();
});

watch(chartData, (newVal) => {
    if (chartRef.value && chartRef.value.chartInstance) {
        chartRef.value.chartInstance.update(); // Forcer la mise à jour
    }
}, { deep: true });
</script>

<style scoped>
.chart-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}
</style>

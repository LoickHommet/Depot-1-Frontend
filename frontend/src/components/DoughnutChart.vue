<template>
  <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" ref="doughnutChart" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useExpenseService } from '../services/expenseService.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartOptions = ref({
  responsive: true,
  plugins: {
      legend: {
          position: 'top'
      },
      tooltip: {
          callbacks: {
              label: function (context) {
                  return `${context.label}: ${context.raw} €`;
              }
          }
      }
  }
});

const { fetchCategoryExpenses } = useExpenseService();

const chartData = ref({
  labels: [],
  datasets: [
      {
          backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
          ],
          data: []
      }
  ]
});

const chartRef = ref(null);

async function updateCategoryData() {
  try {
      const data = await fetchCategoryExpenses();

      const labels = data.map(expense => expense.name); 
      const chartDataValues = data.map(expense => parseFloat(expense.total)); 

      chartData.value = {
          labels: labels,
          datasets: [
              {
                  backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9F40',
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9F40'
                  ],
                  data: chartDataValues
              }
          ]
      };
      if (chartRef.value && chartRef.value.chartInstance) {
          chartRef.value.chartInstance.update();
      }
  } catch (error) {
      console.error("Erreur lors de la mise à jour des données des catégories:", error);
  }
}

onMounted(() => {
  updateCategoryData();
});

watch(chartData, (newVal) => {
  if (chartRef.value && chartRef.value.chartInstance) {
      chartRef.value.chartInstance.update();
  }
}, { deep: true });
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
</style>

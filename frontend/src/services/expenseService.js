import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const base_url = "http://localhost";

function useExpenseService() {
  const router = useRouter();
  const expenses = ref([]);
  const categories = ref([]);
  const selectedCategory = ref("");
  const groupedExpenses = ref({});

  async function fetchExpenses() {
    try {
      const response = await axios.get(`${base_url}/api/expenses`, {
        params: {
          category: selectedCategory.value,
        },
      });
      expenses.value = response.data;
      groupExpensesByMonth();

      // Fetch unique categories for the filter
      const categoriesResponse = await axios.get(`${base_url}/api/categories`);
      categories.value = categoriesResponse.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des dépenses:", error);
    }
  }

  function groupExpensesByMonth() {
    groupedExpenses.value = expenses.value.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(expense);
      return acc;
    }, {});
  }

  async function addExpense(expense) {
    try {
      const response = await axios.post(`${base_url}/api/addExpenses`, expense);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense:", error);
      throw error;
    }
  }

  return {
    expenses,
    categories,
    selectedCategory,
    groupedExpenses,
    fetchExpenses,
    addExpense,

  };
}

export { useExpenseService };

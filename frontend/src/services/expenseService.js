import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "./authService.js";

const { auth } = useAuthService();
const base_url = "http://localhost";

function useExpenseService() {
  const router = useRouter();
  const expenses = ref([]);
  const categories = ref([]);
  const selectedCategory = ref("");
  const groupedExpenses = ref({});
  const expenseDetails = ref(null);

  async function fetchExpenses() {
    try {
      const response = await axios.get(`${base_url}/api/expenses`, {
        params: {
          user_id: auth.value.id,
          category: selectedCategory.value,
        },
      });
      expenses.value = response.data;
      groupExpensesByMonth();
    } catch (error) {
      console.error("Erreur lors de la récupération des dépenses:", error);
    }
  }

  async function fetchExpenseDetails(id) {
    try {
      const response = await axios.get(`${base_url}/api/expenses/${id}`);
      expenseDetails.value = response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la dépense:",
        error
      );
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get(`${base_url}/api/expenses/categories`, {
        params: {
          user_id: auth.value.id,
        },
      });
      categories.value = response.data;
      console.log(categories.value);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  }


  async function deleteExpense(id) {
    try {
      await axios.delete(`${base_url}/api/expenses/delete/${id}`);
      await fetchExpenses(); // Refresh the list after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression de la dépense:", error);
    }
  }


  function groupExpensesByMonth() {
    groupedExpenses.value = expenses.value.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = {
          total: 0,
          expenses: [],
        };
      }
      acc[month].expenses.push(expense);
      acc[month].total += parseFloat(expense.amount);
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

  async function updateExpense(expense) {
    try {
      await axios.put(`${base_url}/api/expenses/edit/${expense.id}`, expense);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la dépense:", error);
      throw error;
    }
  }

  return {
    expenses,
    expenseDetails,
    categories,
    selectedCategory,
    groupedExpenses,
    fetchExpenses,
    fetchExpenseDetails,
    fetchCategories,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}

export { useExpenseService };

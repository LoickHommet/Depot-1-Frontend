import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const base_url = "http://localhost";

function useExpenseService() {
  const router = useRouter();
  async function addExpense(expense) {
    try {

      const response = await axios.post(`${base_url}/api/expenses`, expense);

    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense:", error);
      throw error;
    }
  }

  return { addExpense };
}

export { useExpenseService };

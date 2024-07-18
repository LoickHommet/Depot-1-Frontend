import axios from "axios";
import { ref } from "vue";

const base_url = "http://localhost";
const auth = ref(null);

function useAuthService() {
  async function connect(email, password) {
    try {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      auth.value = response.data;
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error; 
    }
  }

  return { auth, connect };
}

export { useAuthService };

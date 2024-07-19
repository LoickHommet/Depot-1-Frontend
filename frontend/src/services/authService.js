import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const base_url = "http://localhost";
const auth = ref(null);

function useAuthService() {
  async function connect(email, password) {
    try {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      auth.value = response.data.user;
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error; 
    }
  }

  async function disconnect() {
    try {
      await axios.post(`${base_url}/api/logout`);
      auth.value = null; // Réinitialisation de l'authentification côté client
      router.push('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
  }

  return { auth, connect, disconnect };
}

export { useAuthService };

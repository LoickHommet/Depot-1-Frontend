<script setup>
import Button from '../components/Button.vue';
import { ref } from "vue";
import Joi from "joi";
import { useRouter } from "vue-router";
import axios from "axios";
import Cookies from 'js-cookie';

const router = useRouter();

// Références pour les inputs
const firstname = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Références pour les erreurs
const errorFirstname = ref('');
const errorName = ref('');
const errorEmail = ref('');
const errorPassword = ref('');
const errorConfirmPassword = ref('');

const schema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    'string.empty': 'Le prénom est requis',
    'string.min': 'Le prénom doit avoir au moins 2 caractères'
  }),
  name: Joi.string().min(2).required().messages({
    'string.empty': 'Le nom est requis',
    'string.min': 'Le nom doit avoir au moins 2 caractères'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'L\'email est requis',
    'string.email': 'L\'email doit être valide'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Le mot de passe est requis',
    'string.min': 'Le mot de passe doit avoir au moins 6 caractères'
  }),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'Les mots de passe doivent correspondre',
    'any.empty': 'La confirmation du mot de passe est requise'
  })
});

// Fonction pour gérer l'inscription
const inscription = async () => {
  // Réinitialiser les messages d'erreur
  errorFirstname.value = '';
  errorName.value = '';
  errorEmail.value = '';
  errorPassword.value = '';
  errorConfirmPassword.value = '';

  // Valider les données du formulaire
  const { error, value } = schema.validate({ firstname: firstname.value, name: name.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value }, { abortEarly: false });

  if (error) {
    // Gérer les erreurs de validation
    error.details.forEach((detail) => {
      switch (detail.context.key) {
        case 'firstname':
          errorFirstname.value = detail.message;
          break;
        case 'name':
          errorName.value = detail.message;
          break;
        case 'email':
          errorEmail.value = detail.message;
          break;
        case 'password':
          errorPassword.value = detail.message;
          break;
        case 'confirmPassword':
          errorConfirmPassword.value = detail.message;
          break;
      }
    });
    return;
  }

  try {
    // Envoyer les données au serveur
    axios.defaults.baseURL = 'http://localhost/api/register'; 
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    axios.defaults.withCredentials = true;

    const response = await axios.post('http://localhost/api/register', value);
    router.push('/login');
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
};
</script>


<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
        <form @submit.prevent="inscription()" class="col-12 col-lg-6 col-md-8">
            <h1 class="title mb-0 my-5" data-test-h1="h1-login">Inscription</h1>
            <div class="form-group mb-2 my-4">
                <input :placeholder="'Prénom'" :error="errorFirstname" :type="'text'" v-model="firstname" />
            </div>
            <div class="form-group mb-2 my-4">
                <input :placeholder="'Nom'" :error="errorName" :type="'text'" v-model="name" />
            </div>
            <div class="form-group mb-2 my-4">
                <input :placeholder="'Email'" :error="errorEmail" :type="'email'" v-model="email" />
            </div>
            <div class="form-group mb-2 my-4">
                <input :placeholder="'Mot de passe'" :error="errorPassword" :type="'password'" v-model="password" />
            </div>
            <div class="form-group mb-2 my-4">
                <input :placeholder="'Confirmation du mot de passe'" :error="errorConfirmPassword" :type="'password'" v-model="confirmPassword" />
            </div>  
            <Button :type="'submit'" :text="'Inscription'" :classSup="'w-100 mb-3'" />
        </form>
        </div>
    </main>
</template>

<script>
export default {
    
}
</script>
<style scoped>
input:not([type="radio"]){
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    border: 1px solid rgba(var(--grey-color));
    height: 48px;
    padding: 10px 24px;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
    width: 100%;
}
input:hover{
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}
input:focus{
    outline: 3px solid rgba(var(--blue-color), 0.6);
}
input::file-selector-button{
    display: none;
}
input.error{
    border: 1px solid rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}
input.error:focus{
    outline: 3px solid rgba(var(--red-color), 0.6);
}
input[type="radio"]{
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
label{
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
}
</style>
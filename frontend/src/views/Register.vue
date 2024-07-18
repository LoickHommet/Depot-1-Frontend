<script setup>
import Button from '../components/Button.vue';
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
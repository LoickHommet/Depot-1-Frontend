<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <RouterLink class="brand title" to="/">BudgetVue</RouterLink>
        <RouterLink class="profil-link px-3 py-2">Profil</RouterLink>
        <RouterLink class="ms-auto me-2 linkAsBtn" to="/login">Connexion</RouterLink>
        <RouterLink  class="linkAsBtn" to="/register">Inscription</RouterLink>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
nav{
    padding: 16px 8px;
    box-shadow: 2px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
.brand{
    text-decoration: none;
    color: rgba(var(--blue-color));
    font-weight: 700;   
}
.profil-link{
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    color: rgba(var(--blue-color));
    font-weight: 700;
    border-radius: 5px;
}
.profil-link:hover{
    transition: all 0.3s ease-in-out;
    background-color: rgba(var(--blue-color));
    color: white;
}
</style>

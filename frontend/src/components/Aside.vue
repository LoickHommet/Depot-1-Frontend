<script setup>
import { RouterLink } from 'vue-router';
import { useAuthService } from '../services/authService';
const {auth, disconnect} = useAuthService();
import Button from './Button.vue';
</script>

<template>
    <aside>
        <nav>
            <ul class="navbar-nav me-auto text-center">
                <li class="nav-item">
                    <RouterLink to="/" data-test-id="accueilAside">Accueil</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink  to="/dashboard" data-test-id="BordAside">Dashboard</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink  to="/expensesList" data-test-id="BordAside">ExpensesList</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink  to="/addExpense" data-test-id="BordAside">AddExpense</RouterLink>
                </li>
            </ul>
        </nav>
        <div class="mt-auto mb-4 text-center">
            <Button v-if="auth" :text="'Déconnexion'" :color="'red'" @click="disconnect()" data-test-id="deconnexion"/>
        </div>
    </aside>
</template>

<style scoped>
aside{
    padding-top: 20px;
    min-width: 175px;
    width: 175px;
    max-width: 175px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--grey-light-color));
}
nav{
    width: 100%;
}
.no-collapsed {
    transition: all 0.3s ease;
    margin-left: 0;
}
.collapsed {
    transition: all 0.3s ease;
    margin-left: -175px;
}
a{
    transition: all 0.3s ease;
    padding: 11px 24px!important;
    color: rgba(var(--background-grey-color));
    display: block;
    text-decoration: none;
}
a:hover{
    color: white;
    background-color: rgba(var(--blue-color));
}
img{
    width: 35px;
}
</style>
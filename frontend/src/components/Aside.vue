<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <aside>
        <nav>
            <ul class="navbar-nav me-auto text-center">
                <li class="nav-item">
                    <RouterLink to="/" data-test-id="accueilAside">Accueil</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/Bord" data-test-id="BordAside">Bord</RouterLink>
                </li>
            </ul>
        </nav>
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
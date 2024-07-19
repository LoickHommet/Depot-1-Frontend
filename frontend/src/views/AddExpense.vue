<script setup>
import ExpenseForm from '../components/ExpenseForm.vue';
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 2rem;
}
</style>


<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-6 col-md-8">
                <h1 class="title mb-0 my-5">Ajouter une Dépense</h1>
                <ExpenseForm />
            </div>
        </div>
    </main>
</template>
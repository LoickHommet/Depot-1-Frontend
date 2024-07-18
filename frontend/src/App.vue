
<template>
  <div id="app">
    <Aside />
    <div class="container-custom">
    <Header />
    <RouterView />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    Header,
    Aside
  },
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
@import '@/assets/style.css';
.container-custom{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    max-height: 100%;
}
.no-collapsed-r {
    transition: all 0.3s ease;
    margin-right: 0;
}
.collapsed-r{
    transition: all 0.3s ease;
    margin-right: -175px;
}
</style>

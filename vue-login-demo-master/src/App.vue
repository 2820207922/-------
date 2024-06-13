<template>
  <div id="app">
    <top-bar-a/>
    <router-view />
    <tab-bar/>
  </div>
</template>

<script>
import topBarA from './components/second/topBar/topBarA.vue';
import tabBar from './components/second/tabBar/tabBar.vue';
export default {
  name: 'App',
  components: {
    topBarA,
    tabBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

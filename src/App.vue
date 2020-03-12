<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      
    }
  },

  created() {
    // 初始化用户信息
    this.$store.commit('initUser')
  },
}
</script>

<style>
@import "../public/css/base.css";

</style>

<template>
  <div id="app">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      router
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
export default {
  name: "App",
  components: {
    NavMenu: NavMenu,
  },
};
</script>

<style>
</style>

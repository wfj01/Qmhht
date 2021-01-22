<template>
  <div id="app">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      router
      style="width:20%"
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <router-view id="routerview"/>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
import menulist from './utils/menuList';
export default {
  name: "App",
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      activeIndex: "aa",
      menuData: menulist
    };
  },
  mounted(){
    this.$router.push('/')
  }
};
</script>

<style>
@import './public/iconfont.css';
#app{
  display: flex;
  justify-content: flex-start;
  border: 1px solid #cccccc;
}
#routerview{
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #F2F2F2;
}
</style>

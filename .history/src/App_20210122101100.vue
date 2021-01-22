<template>
  <div id="app" v-if="routerPath === '/Login'? '' :'appclass'">
    <el-menu
      v-if="routerPath != '/Login'"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      router
      style="width: 20%"
      class="aa"
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <router-view id="routerview" />
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
import menulist from "./utils/menuList";
export default {
  name: "App",
  components: {
    NavMenu: NavMenu,
    activeIndex: 0,
  },
  data() {
    return {
      routerPath: "",
      activeIndex: "TablePage",
      menuData: menulist,
    };
  },
  mounted() {
    this.routerPath = this.$route.path;
    console.log("this.$route.path", this.$route.path);
    this.$router.push("/");
  },
};
</script>

<style>
@import "./public/iconfont.css";
#app {
  display: flex;
  justify-content: flex-start;
}
.appclass{
  border: 1px solid #cccccc;
}
#routerview {
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
}
.aa {
  height: 604px;
  overflow-y: overlay;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}
.aa::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>

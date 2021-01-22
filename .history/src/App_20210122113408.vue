<template>
  <div id="app">
    <!-- <el-menu
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
    <router-view id="routerview" :class="routerPath === '/Login'? '' :'widstyle1' " />
     -->
    <MsitePage v-if="islogin" :navMenus="menuData"></MsitePage>
    <LoginPage v-else></LoginPage>
  </div>
</template>

<script>
import LoginPage from "@/view/login/login";
import MsitePage from "@/view/msite.vue";
import menulist from "@/utils/menuList";
export default {
  name: "App",
  components: {
    LoginPage: LoginPage,
  },
  data() {
    return {
      menuData: menulist,
      islogin:false
    };
  },
  mounted() {
    this.islogin = localStorage.getItem("islogin");
  },
};
</script>

<style>
@import "./public/iconfont.css";
#app {
  display: flex;
  justify-content: flex-start;
}

.widstyle {
  width: 80%;
}

.widstyle1 {
  width: 100%;
}

.appclass {
  border: 1px solid #cccccc;
}
#routerview {
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

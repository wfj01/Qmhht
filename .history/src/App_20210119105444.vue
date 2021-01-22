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
export default {
  name: "App",
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      activeIndex: "aa",
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "aa",
            icon: "el-icon-message",
            alias: "一级菜单",
          },
        },
        {
          //一级
          entity: {
            id: 1,
            name: "systemManage",
            icon: "el-icon-message",
            alias: "两级菜单",
          },
          //二级
          childs: [
            {
              entity: {
                id: 3,
                name: "authManage",
                icon: "el-icon-loading",
                alias: "权限管理",
                value: { path: "/hello" },
              },
            },
            {
              entity: {
                id: 4,
                name: "roleManage",
                icon: "el-icon-bell",
                alias: "角色管理",
                value: "/system/role",
              },
            },
            {
              entity: {
                id: 2,
                name: "menuManage",
                icon: "el-icon-edit",
                alias: "菜单管理",
                value: "/system/menu",
              },
            },
            {
              entity: {
                id: 5,
                name: "groupManage",
                icon: "el-icon-mobile-phone\r\n",
                alias: "分组管理",
                value: "/system/group",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 6,
            name: "userManage",
            icon: "el-icon-news",
            alias: "三级菜单",
          },
          //二级
          childs: [
            {
              entity: {
                id: 7,
                name: "accountManage",
                icon: "el-icon-phone-outline\r\n",
                alias: "帐号管理",
                value: "",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 14,
                    name: "emailManage",
                    icon: "el-icon-sold-out\r\n",
                    alias: "邮箱管理",
                    value: "/content/email",
                  },
                },
                {
                  entity: {
                    id: 13,
                    name: "passManage",
                    icon: "el-icon-service\r\n",
                    alias: "密码管理",
                    value: "/content/pass",
                  },
                },
              ],
            },
            {
              entity: {
                id: 8,
                name: "integralManage",
                icon: "el-icon-picture",
                alias: "积分管理",

                value: "/user/integral",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 40,
            name: "contentManage",
            icon: "iconfont icon-shangchuan",
            alias: "上传",
          },
          //er级
          childs: [
            {
              entity: {
                id: 41,
                name: "UploadFile",
                icon: "iconfont icon-anzhuo",
                alias: "上传App",
              },
            },
          ],
        },
      ],
    };
  },
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
}
</style>

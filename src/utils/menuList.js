const menulist = [{
    //一级
    entity: {
      id: 0,
      name: "MenuList",
      icon: "el-icon-message",
      alias: "菜单列表",
    },
    childs: [{
      entity: {
        id: 0,
        name: "TablePage",
        icon: "el-icon-refrigerator",
        alias: "菜单列表",
      },
    }]
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
    childs: [{
        entity: {
          id: 3,
          name: "NoticePage",
          icon: "el-icon-chat-dot-round",
          alias: "公告列表",
        },
      },
      {
        entity: {
          id: 4,
          name: "OrderList",
          icon: "el-icon-document",
          alias: "订单列表",
        },
      },
      {
        entity: {
          id: 2,
          name: "MapPage",
          icon: "el-icon-edit",
          alias: "菜单管理",
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
    childs: [{
        entity: {
          id: 7,
          name: "accountManage",
          icon: "el-icon-phone-outline\r\n",
          alias: "帐号管理",
          value: "",
        },
        //三级
        childs: [{
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
      icon: "el-icon-upload",
      alias: "上传",
    },
    //er级
    childs: [{
      entity: {
        id: 41,
        name: "UploadFile",
        icon: "el-icon-upload",
        alias: "上传App",
      },
    }, ],
  },
  {
    //一级
    entity: {
      id: 50,
      name: "SettingPage",
      icon: "el-icon-setting",
      alias: "系统设置",
    }
  }
]

export default menulist;

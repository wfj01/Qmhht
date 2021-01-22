import {
  ConfigUrl
} from './config.js';

const ApiList = {
  // 上传文件接口
  getUploadApp: ConfigUrl + "MultiFileUpload",

  // 提交表单数据
  getFormText: ConfigUrl + "api/UnloadApp/MultiFileAppUploadd",

  // 加载表格数据
  getTableList: ConfigUrl + "api/FoodList/QueryfoodList",

  // 提交菜单
  getCaidanList: ConfigUrl + 'api/FoodList/PostFoodText',

  // 删除菜单数据
  removeList: ConfigUrl+"api/FoodList/PostRemoveList",

  // 加载公告列表
  GetNoticeList:ConfigUrl+"api/Notice/QueryNotice",

  // 增加一条公告
  AddNoticeText:ConfigUrl+"api/Notice/PostNoticeText",

  // 更新一条公告
  UpdataNoticeText:ConfigUrl+"api/Notice/UpDataNoticeText",
}

export default ApiList;

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
}

export default ApiList;

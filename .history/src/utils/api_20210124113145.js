import {
  ConfigUrl
} from './config.js';

const ApiList = {

  // 登录接口
  getLoginPage:ConfigUrl+'api/LoginPage/getUser',

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

  // 更新菜单一条数据
  UpdataCaidanList:ConfigUrl+'api/FoodList/UpDataNoticeText',

  // 筛选菜单数据
  ShaiXuanCaidanList:ConfigUrl+'api/FoodList/ShaiXuanfoodList',

  // 加载公告列表
  GetNoticeList:ConfigUrl+"api/Notice/QueryNotice",

  // 增加一条公告
  AddNoticeText:ConfigUrl+"api/Notice/PostNoticeText",

  // 更新一条公告
  UpdataNoticeText:ConfigUrl+"api/Notice/UpDataNoticeText",

  // 筛选一条公告
  ShaixuanNoticeText:ConfigUrl+'api/Notice/ShaixuanNotice',

  // 删除一条公告
  DeleteNoticeText:ConfigUrl+"api/Notice/PostRemoveList",

  // 加载订单列表
  LoaddataOrderList:ConfigUrl+"api/Order/QueryOrderList",

  // 删除一条订单数据
  DeleteOrderList:ConfigUrl+"api/Order/DeleteOrder",

  // 获取验证码
  loadImageData:ConfigUrl+'api/GetAuthCode/GetAuthCode',

  // 疫情地图接口
  getloaddataMap:ConfigUrl+'api/YiqingMap/SpreadQuery',
}

export default ApiList;

import axios from '@/config/axios'
/*
 * 登陆接口
 * */
export const login = data => axios({
  url: 'api/cjtpay-system-web/login',
  data
})
export const userMenu = data => axios({
  url: 'api/cjtpay-system-web/system/menu/user/list',
  data
})
/*
 * 登出接口
 * */
export const signOutData = data => axios({
  url: 'api/cjtpay-system-web/logout',
  data
})
/*
 * 登出接口
 * */
export const editpass = data => axios({
  url: 'api/cjtpay-system-web/updatePwd',
  data
})
/*
 * 获取当前登录用户
 * */
export const user = data => axios({
  url: 'api/cjtpay-system-web/currentUser',
  data
})
export const uuserCode = data => axios({
  url: 'api/cjtpay-system-web/system/user/userCode',
  data
})

export const ubindingCode = data => axios({
  url: 'api/cjtpay-system-web/system/user/bindingCode',
  data
})

/*
 * 菜单管理接口
 * */
// 表格
export const tableData = data => axios({
  url: 'api/cjtpay-system-web/system/menu/list',
  data
})
// 菜单树
export const menuTree = data => axios({
  url: 'api/cjtpay-system-web/system/menu/role/tree',
  data
})
// 角色下拉菜单
export const menuSelect = data => axios({
  url: 'api/cjtpay-system-web/system/menu/role/list',
  data
})
// 菜单信息接口
export const detailData = data => axios({
  url: 'api/cjtpay-system-web/system/menu/detail',
  data
})
// 新增
export const addMenu = data => axios({
  url: 'api/cjtpay-system-web/system/menu/add',
  data
})
// 修改
export const editMenu = data => axios({
  url: 'api/cjtpay-system-web/system/menu/edit',
  data
})
// 删除
export const deleteMenu = data => axios({
  url: 'api/cjtpay-system-web/system/menu/delete',
  data
})
/*
 * 角色管理接口
 * */
// 表格
export const roleData = data => axios({
  url: 'api/cjtpay-system-web/system/role/list',
  data
})
// 新增
export const addRole = data => axios({
  url: 'api/cjtpay-system-web/system/role/add',
  data
})
// 角色信息接口
export const detailRole = data => axios({
  url: 'api/cjtpay-system-web/system/role/detail',
  data
})
// 修改
export const editlRole = data => axios({
  url: 'api/cjtpay-system-web/system/role/edit',
  data
})
// 删除
export const deletelRole = data => axios({
  url: 'api/cjtpay-system-web/system/role/delete',
  data
})
// 保存角色信息
export const updatelRole = data => axios({
  url: 'api/cjtpay-system-web/system/role/updateRoleMenu',
  data
})
// 判断角色是否使用
export const ifUse = data => axios({
  url: 'api/cjtpay-system-web/system/role/checkRoleUser',
  data
})

/*
 * 用户管理接口
 * */
// 表格
export const accountData = data => axios({
  url: 'api/cjtpay-system-web/system/user/list',
  data
})
// 新增
export const addUserData = data => axios({
  url: 'api/cjtpay-system-web/system/user/add',
  data
})
// 单个账号信息接口
export const detailUser = data => axios({
  url: 'api/cjtpay-system-web/system/user/detail',
  data
})
// 修改
export const editUserData = data => axios({
  url: 'api/cjtpay-system-web/system/user/update',
  data
})
// 删除
export const delUserData = data => axios({
  url: 'api/cjtpay-system-web/system/user/delete',
  data
})
// 读取用户角色关系
export const userData = data => axios({
  url: 'api/cjtpay-system-web/system/role/user/list',
  data
})
// 分配角色保存
export const updateUserData = data => axios({
  url: 'api/cjtpay-system-web/system/user/updateUserRole',
  data
})
// 区域分配
export const regionList = data => axios({
  url: 'api/cjtpay-system-web/system/region/user/tree',
  data
})
// 保存用户区域关系
export const upRegList = data => axios({
  url: 'api/cjtpay-system-web/system/user/updateRegion',
  data
})
// 启用
export const allOpen = data => axios({
  url: 'api/cjtpay-system-web/system/user/allOpen',
  data
})
// 停用
export const allLocked = data => axios({
  url: 'api/cjtpay-system-web/system/user/allLocked',
  data
})
// 重置密码
export const resetPsd = data => axios({
  url: 'api/cjtpay-system-web/system/user/resetPsd',
  data
})
/*
 * 字典管理
 * */
// 字典信息列表
export const diccList = data => axios({
  url: 'api/cjtpay-system-web/system/dic/list',
  data
})
// 字典信息树列表
export const dicList = data => axios({
  url: 'api/cjtpay-system-web/system/dic/public/list',
  data
})
// 新增
export const addDic = data => axios({
  url: 'api/cjtpay-system-web/system/dic/add',
  data
})
// 获取实体
export const detailDic = data => axios({
  url: 'api/cjtpay-system-web/system/dic/detail',
  data
})
// 修改
export const editDic = data => axios({
  url: 'api/cjtpay-system-web/system/dic/edit',
  data
})
// 删除
export const deleteDic = data => axios({
  url: 'api/cjtpay-system-web/system/dic/delete',
  data
})

/*
 * 区域管理
 * */
// 全部城市信息树
export const regAllList = data => axios({
  url: 'api/cjtpay-system-web/system/region/allTree',
  data
})
// 已开通城市信息树----有结构
export const regList = data => axios({
  url: 'api/cjtpay-system-web/system/region/tree',
  data
})
// 已开通城市信息树----无结构
export const regListA = data => axios({
  url: 'api/cjtpay-system-web/system/region/list',
  data
})
// 一键开通
export const regOpend = data => axios({
  url: 'api/cjtpay-system-web/system/region/allOpend',
  data
})
/*
 * 小区管理接口
 * */
// 表格
export const villageData = data => axios({
  url: 'api/cjtpay-system-web/item/list',
  data
})
// 小区区域树
export const villageTree = data => axios({
  url: 'api/cjtpay-system-web/system/region/tree',
  data
})
// 获取数据实体
export const detailVill = data => axios({
  url: 'api/cjtpay-system-web/item/detail',
  data
})
// 启用
export const openVill = data => axios({
  url: 'api/cjtpay-system-web/item/open',
  data
})
// 停用
export const closeVill = data => axios({
  url: 'api/cjtpay-system-web/item/close',
  data
})
// 审核接口
export const checkVill = data => axios({
  url: 'api/cjtpay-system-web/item/check',
  data
})
/*
 * 物业公司管理接口
 * */
// 表格
export const companyData = data => axios({
  url: 'api/cjtpay-system-web/company/list',
  data
})
// 区域树
export const companyTree = data => axios({
  url: 'api/cjtpay-system-web/system/region/tree',
  data
})
// 获取数据实体
export const detailCom = data => axios({
  url: 'api/cjtpay-system-web/company/detail',
  data
})
// 启用
export const openCom = data => axios({
  url: 'api/cjtpay-system-web/company/open',
  data
})
// 停用
export const closeCom = data => axios({
  url: 'api/cjtpay-system-web/company/close',
  data
})
// 审核
export const checkCom = data => axios({
  url: 'api/cjtpay-system-web/company/check',
  data
})
// 附加权限
export const menuChec = data => axios({
  url: 'api/cjtpay-system-web/company/menu',
  data
})
// 附加权限提交
export const updateMenuChec = data => axios({
  url: 'api/cjtpay-system-web/company/updateMenu',
  data
})
// // 小区物业左侧区域树
// export const leftRegionTree = data => axios({
//   url: 'api/cjtpay-system-web/system/region/currentUser/tree',
//   data
// })
// // 小区物业左侧区域树
// export const getUserTree = data => axios({
//   url: 'api/cjtpay-system-web/system/region/currentUser/regionTree',
//   data
// })
// 统计分析
export const statistical = data => axios({
  url: 'api/cjtpay-system-web/system/region/findRegionCompanyItemStatistics',
  data
})
// *******************
//system 
export const SallLocked = data => axios({
  url: '/api/cjtpay-system-web/system/user/allLocked',
  data
})
export const SallOpen = data => axios({
  url: '/api/cjtpay-system-web/system/user/allOpen',
  data
})
// /api/cjtpay-system-web/system/user/list
export const Slist = data => axios({
  url: '/api/cjtpay-system-web/system/role/list',
  data
})

export const Sdelete = data => axios({
  url: '/api/cjtpay-system-web/system/role/delete',
  data
})
// sysjues
export const Rlist = data => axios({
  url: '/api/cjtpay-system-web/system/role/list',
  data
})
export const Rdelete = data => axios({
  url: '/api/cjtpay-system-web/system/role/delete',
  data
})
//sysxinn
export const Madd = data => axios({
  url: '/api/cjtpay-system-web/commercial/add',
  data
})
export const Mlist = data => axios({
  url: '/api/cjtpay-system-web/system/menu/user/list',
  data
})
//Statistics
export const UuserStatistics = data => axios({
  url: '/api/cjtpay-system-web/statistic/userStatistics',
  data
})
//sysguan
export const UcreateUserRole = data => axios({
  url: '/api/cjtpay-system-web/system/user/createUserRole',
  data
})
export const Rolist = data => axios({
  url: '/api/cjtpay-system-web/system/role/list',
  data
})
//commoditydd
export const Orderlist = data => axios({
  url: '/api/cjtpay-system-web/commodity/order/list',
  data
})
//cddming
export const Orderdetail = data => axios({
  url: '/api/cjtpay-system-web/commodity/order/detail',
  data
})
//Pconfig

export const PqueryQuotaPdd = data => axios({
  url: '/api/cjtpay-system-web/commercial/queryQuotaPdd',
  data
})
export const PupdateQuotaPdd = data => axios({
  url: '/api/cjtpay-system-web/commercial/updateQuotaPdd',
  data
})

//commoditylb
export const Commstatus = data => axios({
  url: '/api/cjtpay-system-web/commodity/status',
  data
})
export const Commlist = data => axios({
  url: '/api/cjtpay-system-web/commodity/list',
  data
})
export const CommwholesalePrice = data => axios({
  url: '/api/cjtpay-system-web/commodity/wholesalePrice',
  data
})
export const Commdelete = data => axios({
  url: '/api/cjtpay-system-web/commodity/delete',
  data
})
//clbxinz
export const Commadd = data => axios({
  url: '/api/cjtpay-system-web/commodity/add',
  data
})
//clbbz   Commstatus
export const Commupdate = data => axios({
  url: '/api/cjtpay-system-web/commodity/update',
  data
})
export const Commdetail = data => axios({
  url: '/api/cjtpay-system-web/commodity/detail',
  data
})
//deal
export const Paylistt = data => axios({
  url: '/api/cjtpay-system-web/payment/order/list',
  data
})
export const PayresendNotice = data => axios({
  url: '/api/cjtpay-system-web/payment/order/resendNotice',
  data
})

//distributor
export const Dealist = data => axios({
  url: '/api/cjtpay-system-web/dealer/list',
  data
})

export const DeaupdateBalance = data => axios({
  url: '/api/cjtpay-system-web/dealer/updateBalance',
  data
})
export const DearunAmounQuery = data => axios({
  url: '/api/cjtpay-system-web/dealer/runAmounQuery',
  data
})

export const DeadepositSetting = data => axios({
  url: '/api/cjtpay-system-web/dealer/depositSetting',
  data
})
export const DearunAmountSetting = data => axios({
  url: '/api/cjtpay-system-web/dealer/runAmountSetting',
  data
})




//jingxiaojia
export const Deadd = data => axios({
  url: '/api/cjtpay-system-web/dealer/add',
  data
})
//dismingx
export const DecollectionScheduled = data => axios({
  url: '/api/cjtpay-system-web/dealer/collectionSchedule',
  data
})
//disbianji
export const Deadetail = data => axios({
  url: '/api/cjtpay-system-web/dealer/detail',
  data
})
export const Deaupdate = data => axios({
  url: '/api/cjtpay-system-web/dealer/update',
  data
})
//user
export const commerciallist = data => axios({
  url: '/api/cjtpay-system-web/commercial/list',
  data
})
//actdetails
export const commpersonalDetails = data => axios({
  url: '/api/cjtpay-system-web/commercial/personalDetails',
  data
})
export const commaccountQuota = data => axios({
  url: '/api/cjtpay-system-web/commercial/accountQuota',
  data
})
export const commqueryAccount = data => axios({
  url: '/api/cjtpay-system-web/commercial/queryAccount',
  data
})
export const commqueryAccountBank = data => axios({
  url: '/api/cjtpay-system-web/commercial/queryAccountBank',
  data
})
export const commquerydetailsBank = data => axios({
  url: '/api/cjtpay-system-web/commercial/detailsBank',
  data
})
export const commqueryupdateBank = data => axios({
  url: '/api/cjtpay-system-web/commercial/updateBank',
  data
})


//increase  Dealist commpersonalDetails
export const commercialreset = data => axios({
  url: '/api/cjtpay-system-web/commercial/password/reset',
  data
})
export const commercialupdate = data => axios({
  url: '/api/cjtpay-system-web/commercial/personalDetails/update',
  data
})
//quota
export const CommupdateQuota = data => axios({
  url: '/api/cjtpay-system-web/commercial/updateQuota',
  data
})
export const CommqueryQuota = data => axios({
  url: '/api/cjtpay-system-web/commercial/queryQuota',
  data
})
//zhuangt 1.commqueryAccount
export const CommupdateAccount = data => axios({
  url: '/api/cjtpay-system-web/commercial/updateAccount',
  data
})
//transaction
export const StdealerTransaction = data => axios({
  url: '/api/cjtpay-system-web/statistic/dealerTransaction',
  data
})
export const StplatformData = data => axios({
  url: '/api/cjtpay-system-web/statistic/platformData',
  data
})
export const StchannelStatistics = data => axios({
  url: '/api/cjtpay-system-web/statistic/channelStatistics',
  data
})
//reflect
export const Winlist = data => axios({
  url: '/api/cjtpay-system-web/payment/withdraw/list',
  data
})
export const Winaudit = data => axios({
  url: '/api/cjtpay-system-web/payment/withdraw/audit',
  data
})
export const WitqueryMoney = data => axios({
  url: '/api/cjtpay-system-web/payment/withdraw/queryMoney',
  data
})
export const WitqueryMoneyQuota = data => axios({
  url: '/api/cjtpay-system-web/payment/withdraw/queryMoneyQuota',
  data
})
export const Witadd = data => axios({
  url: '/api/cjtpay-system-web/payment/withdraw/add',
  data
})
//payaudit
export const Shoplist = data => axios({
  url: '/api/cjtpay-system-web/payment/shopCheck/list',
  data
})
export const Shopcheck = data => axios({
  url: '/api/cjtpay-system-web/payment/shopCheck/check',
  data
})
//routement
export const Paylist = data => axios({
  url: '/api/cjtpay-system-web/payment/link/list',
  data
})
export const Paydetail = data => axios({
  url: '/api/cjtpay-system-web/payment/link/detail',
  data
})
export const Payupdate = data => axios({
  url: '/api/cjtpay-system-web/payment/link/update',
  data
})
export const Paydelete = data => axios({
  url: '/api/cjtpay-system-web/payment/link/delete',
  data
})
export const Payadd = data => axios({
  url: '/api/cjtpay-system-web/payment/link/add',
  data
})
//upment
export const Uplist = data => axios({
  url: '/api/cjtpay-system-web/payment/upstream/list',
  data
})
export const Upupdate = data => axios({
  url: '/api/cjtpay-system-web/payment/upstream/update',
  data
})
export const Upadd = data => axios({
  url: '/api/cjtpay-system-web/payment/upstream/add',
  data
})
export const Updetail = data => axios({
  url: '/api/cjtpay-system-web/payment/upstream/detail',
  data
})
//cocard
export const Balist = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/list',
  data
})
export const UPfileCode = data => axios({
  url: '/api/cjtpay-commercial-web/upload/fileCode',
  data
})

export const Badetail = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/detail',
  data
})
export const Baupdate = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/update',
  data
})
export const Badelete = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/delete',
  data
})
export const Baadd = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/add',
  data
})
export const BankdealerCode = data => axios({
  url: '/api/cjtpay-system-web/payment/bank/dealerCode',
  data
})
//account
export const AClist = data => axios({
  url: '/api/cjtpay-system-web/account/list',
  data
})
export const Aaudit = data => axios({
  url: '/api/cjtpay-system-web/account/audit',
  data
})
export const ApayTest = data => axios({
  url: '/api/cjtpay-system-web/account/payTest',
  data
})
//in
export const Dealerlist = data => axios({
  url: '/api/cjtpay-system-web/dealer/list',
  data
})
export const Commreadd = data => axios({
  url: '/api/cjtpay-system-web/commercial/add',
  data
})
export const Menuadd = data => axios({
  url: '/api/cjtpay-system-web/system/role/menu/add',
  data
})
//huidao
export const PAYpayTest = data => axios({
  url: '/api/cjtpay-system-web/system/pay/payTest',
  data
})
export const PAYgetOrder = data => axios({
  url: '/api/cjtpay-system-web/system/pay/getOrder',
  data
})
//00
export const Quupdate = data => axios({
  url: '/api/cjtpay-system-web/system/dic/quota/update',
  data
})
//Trading
export const CommtransactionLog = data => axios({
  url: '/api/cjtpay-system-web/commercial/transactionLog',
  data
})
export const Commquota = data => axios({
  url: '/api/cjtpay-system-web/commercial/quota',
  data
})
//Recharge
export const Relist = data => axios({
  url: '/api/cjtpay-system-web/recharge/list',
  data
})
export const Readd = data => axios({
  url: '/api/cjtpay-system-web/recharge/add',
  data
})
export const Reaudit = data => axios({
  url: '/api/cjtpay-system-web/recharge/audit',
  data
})
export const Redetail = data => axios({
  url: '/api/cjtpay-system-web/recharge/detail',
  data
})
export const Reupdate = data => axios({
  url: '/api/cjtpay-system-web/recharge/update',
  data
})
export const ReownerExport = data => axios({
  url: '/api/cjtpay-system-web/recharge/ownerExport',
  data
})
//PDD
export const PDlist = data => axios({
  url: '/api/cjtpay-system-web/system/pdd/list',
  data
})
export const PDdelete = data => axios({
  url: '/api/cjtpay-system-web/system/pdd/delete',
  data
})
//PDDpay
export const pddUserlist = data => axios({
  url: '/api/cjtpay-system-web/system/pddUser/list',
  data
})
export const pddUserdelete = data => axios({
  url: '/api/cjtpay-system-web/system/pddUser/delete',
  data
})
//PDDlink
export const pddpayList = data => axios({
  url: '/api/cjtpay-system-web/system/pddUser/payList',
  data
})
//Pddshang
export const pinduoduolist = data => axios({
  url: '/api/cjtpay-system-web/pinduoduo/list',
  data
})
export const pinduoduodelete = data => axios({
  url: '/api/cjtpay-system-web/pinduoduo/delete',
  data
})
export const pinduoduoad = data => axios({
  url: '/api/cjtpay-system-web/pinduoduo/add',
  data
})
//acount
export const USupdateBalance = data => axios({
  url: '/api/cjtpay-system-web/system/user/updateBalance',
  data
})
export const USupdateRating = data => axios({
  url: '/api/cjtpay-system-web/system/user/updateRating',
  data
})
export const UserqueryLinks = data => axios({
  url: '/api/cjtpay-system-web/system/user/queryLinks',
  data
})
export const UseraddLink = data => axios({
  url: '/api/cjtpay-system-web/system/user/addLink',
  data
})
export const UserrunAmounQuery = data => axios({
  url: '/api/cjtpay-system-web/system/user/runAmounQuery',
  data
})
export const UserrunAmountSetting = data => axios({
  url: '/api/cjtpay-system-web/system/user/runAmountSetting',
  data
})
export const UserdepositSetting = data => axios({
  url: '/api/cjtpay-system-web/system/user/depositSetting',
  data
})
export const UpfileCode = data => axios({
  url: '/api/cjtpay-commercial-web/upload/fileCode',
  data
})










































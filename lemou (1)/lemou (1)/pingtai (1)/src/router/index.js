import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
nprogress.configure({
  showSpinner: false
})
const tagCurrent = store.state.tag.tagCurrent

Vue.use(Router)

const router = new Router({
  // mode: 'history', // 去掉路由前#号
  routes: [{
      path: '/',
      redirect: '/login' // 重定向
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/Createorder',
      name: 'Createorder',
      component: () => import('@/views/Createorder'),
    },

    {
      path: '/index',
      name: 'index',
      component: () => import('@/pages/index'),
      redirect: tagCurrent.value || '/index',
      children: [{
          path: '/index',
          name: 'index',
          component: () => import('@/views/transaction'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/systemMenu',
          name: 'systemMenu',
          component: () => import('@/views/menuw'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/Statistics',
          name: 'Statistics',
          component: () => import('@/views/Statistics'),
          meta: {
            title: '用户统计'
          }
        },
        {
          path: '/agentName',
          name: 'agentName',
          component: () => import('@/views/agentName'),
          meta: {
            title: '代理管理'
          }
        },
        {
          path: '/DistributorName',
          name: 'DistributorName',
          component: () => import('@/views/DistributorName'),
          meta: {
            title: '经销商管理'
          }
        },
        {
          path: '/transaction',
          name: 'transaction',
          component: () => import('@/views/transaction'),
          meta: {
            title: '交易统计'
          }
        },
        {
          path: '/Pconfig',
          name: 'Pconfig',
          component: () => import('@/views/Pconfig'),
          meta: {
            title: '拼多多配置'
          }
        },
        {
          path: '/Pddshop',
          name: 'Pddshop',
          component: () => import('@/views/Pddshop'),
          meta: {
            title: '拼多多商品'
          }
        },
        {
          path: '/Pddshang',
          name: 'Pddshang',
          component: () => import('@/views/Pddshang'),
          meta: {
            title: '拼多多商品配置'
          }
        },
        {
          path: '/Pddpay',
          name: 'Pddpay',
          component: () => import('@/views/Pddpay'),
          meta: {
            title: '拼多多买家'
          }
        },
        {
          path: '/Pddlink',
          name: 'Pddlink',
          component: () => import('@/views/Pddlink'),
          meta: {
            title: '拼多多链接'
          }
        },
        {
          path: '/systemRole',
          name: 'systemRole',
          component: () => import('@/views/role'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/systemUser',
          name: '"systemUser"',
          component: () => import('@/views/acount'),
          meta: {
            title: '管理员管理'
          }
        },
        {
          path: '/downloadAPP',
          name: '"downloadAPP"',
          component: () => import('@/views/downloadAPP'),
          meta: {
            title: 'APP下载'
          }
        },
        {
          path: '/systemDictionaries',
          name: 'systemDictionaries',
          component: () => import('@/views/dataDictionary'),
          meta: {
            title: '字典管理'
          }
        },
        {
          path: '/system',
          name: 'system',
          component: () => import('@/views/system'),
          meta: {
            title: '系统参数'
          }
        },
        {
          path: '/Channel',
          name: 'Channel',
          component: () => import('@/views/Channel'),
          meta: {
            title: '限额每日通道'
          }
        },
        {
          path: '/sysjues',
          name: 'sysjues',
          component: () => import('@/views/sysjues'),
          meta: {
            title: '角色列表'
          }
        },
        {
          path: '/sysxinn',
          name: 'sysxinn',
          component: () => import('@/views/sysxinn'),
          meta: {
            title: '新增角色'
          }
        },

        {
          path: '/sysguan',
          name: 'sysguan',
          component: () => import('@/views/sysguan'),
          meta: {
            title: '新增管理员'
          }
        },
        {
          path: '/commoditydd',
          name: 'commoditydd',
          component: () => import('@/views/commoditydd'),
          meta: {
            title: '商品订单'
          }
        },
        {
          path: '/cddming',
          name: 'cddming',
          component: () => import('@/views/cddming'),
          meta: {
            title: '成交明细'
          }
        },
        {
          path: '/commoditylb',
          name: 'commoditylb',
          component: () => import('@/views/commoditylb'),
          meta: {
            title: '商品列表'
          }
        },
        {
          path: '/clbxinz',
          name: 'clbxinz',
          component: () => import('@/views/clbxinz'),
          meta: {
            title: '新增商品'
          }
        },
        {
          path: '/clbbz',
          name: 'clbbz',
          component: () => import('@/views/clbbz'),
          meta: {
            title: '商品编辑'
          }
        },
        {
          path: '/tbrenw',
          name: 'tbrenw',
          component: () => import('@/views/tbrenw'),
          meta: {
            title: '淘宝任务商品'
          }
        },
        {
          path: '/tbxinz',
          name: 'tbxinz',
          component: () => import('@/views/tbxinz'),
          meta: {
            title: '新增淘宝商品'
          }
        },
        {
          path: '/tbbj',
          name: 'tbbj',
          component: () => import('@/views/tbbj'),
          meta: {
            title: '编辑淘宝商品'
          }
        },
        {
          path: '/tbshenh',
          name: 'tbshenh',
          component: () => import('@/views/tbshenh'),
          meta: {
            title: '审核口令'
          }
        },
        {
          path: '/tbcz',
          name: 'tbcz',
          component: () => import('@/views/tbcz'),
          meta: {
            title: '淘宝充值记录'
          }
        },
        {
          path: '/tbdp',
          name: 'tbdp',
          component: () => import('@/views/tbdp'),
          meta: {
            title: '淘宝店铺列表'
          }
        },
        {
          path: '/tbdpxz',
          name: 'tbdpxz',
          component: () => import('@/views/tbdpxz'),
          meta: {
            title: '淘宝店铺新增'
          }
        },
        {
          path: '/deal',
          name: 'deal',
          component: () => import('@/views/deal'),
          meta: {
            title: '成交订单'
          }
        },
        {
          path: '/distributor',
          name: 'distributor',
          component: () => import('@/views/distributor'),
          meta: {
            title: '经销商列表'
          }
        },
        {
          path: '/serviceName',
          name: 'serviceName',
          component: () => import('@/views/serviceName'),
          meta: {
            title: '客服管理'
          }
        },
        {
          path: '/jingxiaojia',
          name: 'jingxiaojia',
          component: () => import('@/views/jingxiaojia'),
          meta: {
            title: '添加经销商'
          }
        },
        {
          path: '/dismingx',
          name: 'dismingx',
          component: () => import('@/views/dismingx'),
          meta: {
            title: '经销商明细'
          }
        },
        {
          path: '/disbianji',
          name: 'disbianji',
          component: () => import('@/views/disbianji'),
          meta: {
            title: '编辑经销商'
          }
        },
        {
          path: '/reflect',
          name: 'reflect',
          component: () => import('@/views/reflect'),
          meta: {
            title: '提现记录'
          }
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('@/views/account'),
          meta: {
            title: '账户列表'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user'),
          meta: {
            title: '用户列表'
          }
        },
        {
          path: '/actdetails',
          name: 'actdetails',
          component: () => import('@/views/actdetails'),
          meta: {
            title: '用户账号详情'
          }
        },
        {
          path: '/increasebg',
          name: 'increasebg',
          component: () => import('@/views/increasebg'),
          meta: {
            title: '编辑用户信息'
          }
        },
        {
          path: '/increase',
          name: 'increase',
          component: () => import('@/views/increase'),
          meta: {
            title: '新增用户'
          }
        },
        {
          path: '/quota',
          name: 'quota',
          component: () => import('@/views/quota'),
          meta: {
            title: '用户每日额度'
          }
        },
        {
          path: '/zhuangt',
          name: 'zhuangt',
          component: () => import('@/views/zhuangt'),
          meta: {
            title: '编辑用户状态'
          }
        },
        {
          path: '/payaudit',
          name: 'payaudit',
          component: () => import('@/views/payaudit'),
          meta: {
            title: '付款审核'
          }
        },
        {
          path: '/routement',
          name: 'routement',
          component: () => import('@/views/routement'),
          meta: {
            title: '路由管理'
          }
        },
        {
          path: '/upment',
          name: 'upment',
          component: () => import('@/views/upment'),
          meta: {
            title: '上游管理'
          }
        },
        {
          path: '/cocard',
          name: 'cocard',
          component: () => import('@/views/cocard'),
          meta: {
            title: '归集卡模块'
          }
        },
        {
          path: '/jingx',
          name: 'jingx',
          component: () => import('@/views/jingx'),
          meta: {
            title: '经销商交易统计'
          }
        },
        {
          path: '/Recharge',
          name: 'Recharge',
          component: () => import('@/views/Recharge'),
          meta: {
            title: '充值审核'
          }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  nprogress.start()
  // document.title = `兰众云物管-平台端v2.0`
  if (to.path != '/layout') {
    store.commit('ADD_TAG', {
      label: to.meta.title,
      value: to.path,
      query: to.query,
      close: true
    })
  }
  next()
})
router.afterEach(() => {
  nprogress.done()
})
export default router

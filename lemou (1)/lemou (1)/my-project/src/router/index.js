import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import home from '@/components/home.vue'
import Money from '@/components/money.vue'
import order from '@/components/order.vue'
import Me from '@/components/me.vue'
import Register from '@/components/register.vue'
import RegLogin from '@/components/regLogin.vue'
import username from '@/components/username.vue'
import bankcard from '@/components/bankcard.vue'
import bianjibank from '@/components/bianjibank.vue'
import paymentswitch from '@/components/paymentswitch.vue'
import downpayment from '@/components/downpayment.vue'
import xinyong from '@/components/xinyong.vue'
import jiaoxue from '@/components/jiaoxue.vue'
import quanxian from '@/components/quanxian.vue'
import enterdd from '@/components/enterdd.vue'
import wangzhuan from '@/components/wangzhuan.vue'
import enterxx from '@/components/enterxx.vue'
import paymented from '@/components/paymented.vue'
import paymentcode from '@/components/paymentcode.vue'
import changepassword from '@/components/changepassword.vue'
import shipped from '@/components/shipped.vue'
import completed from '@/components/completed.vue'
import tbdetails from '@/components/tbdetails.vue'
import mwanc from '@/components/mwanc.vue'
import download from '@/components/download.vue'
import Submitted from '@/components/Submitted.vue'
import Cash from '@/components/Cash.vue'
import Cashbj from '@/components/Cashbj.vue'
import CodeS from '@/components/CodeS.vue'
import WXcode from '@/components/WXcode.vue'
import Flashcode from '@/components/Flashcode.vue'
import Memess from '@/components/Memess.vue'
import orderOD from '@/components/orderOD.vue'
import paymentedOD from '@/components/paymentedOD.vue'
import homeOD from '@/components/homeOD.vue'
import BGorder from '@/components/BGorder.vue'
import Pddpay from '@/components/Pddpay.vue'
import Pdalipay from '@/components/Pdalipay.vue'
import Pdweix from '@/components/Pdweix.vue'
import jvhe from '@/components/jvhe.vue'
import SolidCode from '@/components/SolidCode.vue'
import MoneCode from '@/components/MoneCode.vue'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/home',
        name: 'homeOD',
        component: homeOD
      }]
    },
    {
      path: '/CodeS',
      name: 'CodeS',
      component: CodeS
    },
    {
      path: '/jvhe',
      name: 'jvhe',
      component: jvhe
    },
    {
      path: '/Flashcode',
      name: 'Flashcode',
      component: Flashcode
    },
    {
      path: '/Pdalipay',
      name: 'Pdalipay',
      component: Pdalipay
    },
    {
      path: '/Pdweix',
      name: 'Pdweix',
      component: Pdweix
    },
    {
      path: '/Pddpay',
      name: 'Pddpay',
      component: Pddpay
    },
    {
      path: '/WXcode',
      name: 'WXcode',
      component: WXcode
    },
    {
      path: '/Cash',
      name: 'Cash',
      component: Cash
    },
    {
      path: '/Cashbj',
      name: 'Cashbj',
      component: Cashbj
    },

    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/paymented',
      name: 'paymented',
      component: paymented,
      children: [{
          path: '/paymented',
          name: 'paymentedOD',
          component: paymentedOD
        },
        {
          path: '/Submitted',
          name: 'Submitted',
          component: Submitted
        },
        {
          path: '/mwanc',
          name: 'mwanc',
          component: mwanc
        },
        {
          path: '/money',
          name: 'money',
          component: Money
        },
      ]
    },
    {
      path: '/tbdetails',
      name: 'tbdetails',
      component: tbdetails
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [{
          path: '/order',
          name: 'orderOD',
          component: orderOD
        },
        {
          path: '/shipped',
          name: 'shipped',
          component: shipped
        },
        {
          path: '/BGorder',
          name: 'BGorder',
          component: BGorder
        },
        {
          path: '/completed',
          name: 'completed',
          component: completed
        }
      ]
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      children: [{
        path: '/me',
        name: 'Memess',
        component: Memess
      }]
    },

    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    {
      path: '/SolidCode',
      name: 'SolidCode',
      component: SolidCode
    },
    {
      path: '/MoneCode',
      name: 'MoneCode',
      component: MoneCode
    },
    {
      path: '/downpayment',
      name: 'downpayment',
      component: downpayment
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: changepassword
    },
    {
      path: '/xinyong',
      name: 'xinyong',
      component: xinyong
    },
    {
      path: '/paymentcode',
      name: 'paymentcode',
      component: paymentcode
    },
    {
      path: '/quanxian',
      name: 'quanxian',
      component: quanxian
    },
    {
      path: '/wangzhuan',
      name: 'wangzhuan',
      component: wangzhuan
    },
    {
      path: '/enterxx',
      name: 'enterxx',
      component: enterxx
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/jiaoxue',
      name: 'jiaoxue',
      component: jiaoxue
    },
    {
      path: '/enterdd',
      name: 'enterdd',
      component: enterdd
    },
    {
      path: '/paymentswitch',
      name: 'paymentswitch',
      component: paymentswitch
    },
    {
      path: '/username',
      name: 'username',
      component: username
    },
    {
      path: '/bankcard',
      name: 'bankcard',
      component: bankcard
    },
    {
      path: '/bianjibank',
      name: 'bianjibank',
      component: bianjibank
    },
    {
      path: '/regLogin',
      name: 'regLogin',
      component: RegLogin
    }

  ]
})

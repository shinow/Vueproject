import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import a from '@/components/a'
import commproblem from '@/views/commproblem'
import Deposit from '@/views/Deposit'
import Rechargey from '@/views/Deposit/Rechargey'
import home from '@/views/home'
import login from '@/views/login'
import Register from '@/views/login/Register'
import me from '@/views/me'
import Paycode from '@/views/me/Paycode'
import newspro from '@/views/me/newspro'
import Invitefd from '@/views/me/Invitefd'
import Invitefdcode from '@/views/me/Invitefdcode'
import Productrate from '@/views/me/Productrate'
import Setup from '@/views/me/Setup'
import security from '@/views/me/security'
import changelogin from '@/views/me/changelogin'
import Payzhi from '@/views/me/Payzhi'
import changepay from '@/views/me/changepay'
import payalicode from '@/views/me/payalicode'
import WXcode from '@/views/me/WXcode'
import Flashcode from '@/views/me/Flashcode'
import bankcard from '@/views/me/bankcard'
import bianjibank from '@/views/me/bianjibank'
import MoneCode from '@/views/me/MoneCode'
import Pdodo from '@/views/me/Pdodo'
import jvhee from '@/views/me/jvhee'
import Chaddress from '@/views/me/Chaddress'
import SolidCode from '@/views/me/SolidCode'
import Gesture from '@/views/me/Gesture'
import orders from '@/views/orders'
import Paymentswitch from '@/views/me/Paymentswitch'
import Ongoing from '@/views/home/Ongoing'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Chaddress',
      name: 'Chaddress',
      component: Chaddress
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Pdodo',
      name: 'Pdodo',
      component: Pdodo
    },
    {
      path: '/MoneCode',
      name: 'MoneCode',
      component: MoneCode
    },
    {
      path: '/SolidCode',
      name: 'SolidCode',
      component: SolidCode
    },
    {
      path: '/jvhee',
      name: 'jvhee',
      component: jvhee
    },
    {
      path: '/bianjibank',
      name: 'bianjibank',
      component: bianjibank
    },
    {
      path: '/bankcard',
      name: 'bankcard',
      component: bankcard
    },
    {
      path: '/Flashcode',
      name: 'Flashcode',
      component: Flashcode
    },
    {
      path: '/WXcode',
      name: 'WXcode',
      component: WXcode
    },
    {
      path: '/payalicode',
      name: 'payalicode',
      component: payalicode
    },
    {
      path: '/changepay',
      name: 'changepay',
      component: changepay
    },
    {
      path: '/Gesture',
      name: 'Gesture',
      component: Gesture
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/a',
      name: 'a',
      component: a
    },
    {
      path: '/Payzhi',
      name: 'Payzhi',
      component: Payzhi
    },
    {
      path: '/changelogin',
      name: 'changelogin',
      component: changelogin
    },
    {
      path: '/security',
      name: 'security',
      component: security
    },
    {
      path: '/Setup',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/Productrate',
      name: 'Productrate',
      component: Productrate
    },
    {
      path: '/Invitefdcode',
      name: 'Invitefdcode',
      component: Invitefdcode
    },
    {
      path: '/Invitefd',
      name: 'Invitefd',
      component: Invitefd
    },
    {
      path: '/newspro',
      name: 'newspro',
      component: newspro
    },
    {
      path: '/commproblem',
      name: 'commproblem',
      component: commproblem
    },
    {
      path: '/Paymentswitch',
      name: 'Paymentswitch',
      component: Paymentswitch,
    },
    {
      path: '/Ongoing',
      name: 'Ongoing',
      component: Ongoing,
    }, {
      path: '/Deposit',
      name: 'Deposit',
      component: Deposit,
    },
    {
      path: '/Paycode',
      name: 'Paycode',
      component: Paycode,
    },
    {
      path: '/Rechargey',
      name: 'Rechargey',
      component: Rechargey,
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    }
  ]
})

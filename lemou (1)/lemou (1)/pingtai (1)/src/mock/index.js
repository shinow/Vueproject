import Mock from 'mockjs'
import {baseUrl} from '@/config/env'
import cityInfo from '@/assets/city-data'

const tableData = {
    "total":70,
    "resCode":2000,
    "dagl|50": [{
        "number": /(00012)[1-6]{4}/,
        'name': /[A-Z]{8}(公司)/,
        'item':/[A-Z]{8}(项目)/,
        'address':'@last',
        'icon':/[A-Z]{8}(机构)/,
        'url':'@last',
        'data':'@date("yyyy-MM-dd")',
        'status':/(已|未)(归档)/,
        'date':'@date("yyyy-MM-dd")'
    }],
    'addSelect|3':[{
        "number": /(00012)[1-6]{4}/,
        'name': /[A-Z]{8}(公司)/,
        'item':/[A-Z]{8}(项目)/,
    }],
    'img-list|2':[{
        'date':'@date("yyyy-MM-dd")',
        'name': /[A-Z]{8}(图片)/
    }],
    'doc-list|2':[{
        'date':'@date("yyyy-MM-dd")',
        'name': /[A-Z]{8}(文件)/
    }],
    'upload':[{
        'date':'@date("yyyy-MM-dd")',
        'name': /[A-Z]{8}(文件)/
    }]
}

const tree = [{
        label: '系统管理',
        children: [{
          label: '系统管理',
          children: [{
            label: '菜单管理',
          },{
            label: '角色管理'
          },{
            label: '账号管理'
          },{
            label: '数据字典'
          }]
        },{
          label: '基础数据',
          children: [{
            label: '区域管理',
          },{
            label: '物业公司管理'
          },{
            label: '小区管理'
          }]
        },{
          label: '统计分析'
        }]
      }]

const tree1 = [{
        id: 1,
        label: '全国',
        children: [{
          id: 2,
          label: '山西',
          children: [{
            label: '太原',
          },{
            label: '临汾'
          },{
            label: '吕梁'
          },{
            label: '晋中'
          }]
        },{
          id: 3,
          label: '河北',
          children: [{
            label: '石家庄',
          }]
        },{
          id: 4,
          label: '河南'
        }]
      }]

const selects = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      
const menuList = [
  {
    menuName: "系统管理",
    menuIcon: "fz-ad-icon-test",
    menuSubLink: [
      {
        menuName: "菜单管理",
        menuUrl: "/customer/adhost"
      },
      {
        menuName: "角色管理",
        menuUrl: "/customer/channel"
      },
      {
        menuName: "账号管理",
        menuUrl: "/customer/channel"
      },
      {
        menuName: "数据字典",
        menuUrl: "/customer/channel"
      }
    ]
  },
  {
    menuName: "基础数据",
    menuIcon: "fz-ad-guanggao",
    menuSubLink: [
      {
        menuName: "区域管理",
        menuUrl: "/ad/add"
      },
      {
        menuName: "物业公司管理",
        menuUrl: "/ad/check"
      },
      {
        menuName: "小区管理",
        menuUrl: "/ad/check"
      }
    ]
  },
  {
    menuName: "统计分析",
    menuIcon: "fz-ad-guanggao"
  }
]

// 配置延时
Mock.setup({
  timeout: '200-500'
})

// 配置拦截
Mock.mock(`${baseUrl}tableData`, tableData)
Mock.mock(`${baseUrl}tree`, tree)
Mock.mock(`${baseUrl}selects`, selects)
Mock.mock(`${baseUrl}tree1`, tree1)
Mock.mock(`${baseUrl}treeAll`, cityInfo)
Mock.mock(`${baseUrl}menuList`, menuList)

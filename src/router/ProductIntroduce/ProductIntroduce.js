export default[
  {
    path:'ProductIntroduce',
    meta:{
      title:'产品介绍'
    },
    component:resolve => require(['@/pages/FilterProduct/ProductIntroduce'], resolve),
    children:[
      {
        path:'Passer',
        meta:{
          title:'通行客'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Passer'], resolve),
      },
      {
        path:'PaymentProperty',
        meta:{
          title:'智能缴费'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/PaymentProperty'], resolve),
      },
      {
        path:'SalaryManager',
        meta:{
          title:'贷发工资'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/SalaryManager'], resolve),
      },
      {
        path:'Zjyf',
        meta:{
          title:'租金月付'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Zjyf'], resolve),
      },
      {
        path:'Attendance',
        meta:{
          title:'考勤管理'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Attendance'], resolve),
      },
      {
        path:'Breakfast',
        meta:{
          title:'早餐颂'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Breakfast'], resolve),
      },
      {
        path:'Repair',
        meta:{
          title:'报修'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Repair'], resolve),
      },
      {
        path:'Welfare',
        meta:{
          title:'福利社'
        },
        component:resolve => require(['@/pages/FilterProduct/ProductIntroduce/Welfare'], resolve),
      }
    ]
  },
]

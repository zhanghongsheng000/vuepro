export default [
  {
    path:'noticeList',
    meta:{
      title:'物业通知'
    },
    component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeList'], resolve),
  },

  {
    path:'noticeDetails',
    meta:{
      title:'物业通知详情'
    },
    component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeDetails'], resolve)
  },
   {
    path:'noticeSend',
    meta:{
      title:'物业发消息'
    },
    component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeSend'], resolve)
  },
  {
    path:'noticeListjjs',
    meta:{
      title:'居金所通知列表'
    },
    component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeListjjs'], resolve),
  },
  {
    path:'noticeDetailsjjs',
    meta:{
      title:'居金所通知详情'
    },
    component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeDetailsjjs'], resolve)
  },
]

import AccountManager from "../../Public/AccountManagerPublic";
import PropertyBaseInfo from "../../Public/PropertyBaseInfo";
export default  [
  {
    path:"Property",
   /* name:"Property",*/
    meta:{
      title:'物业公司'
    },
    redirect:'Property/PaymentManager',
    component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/index'], resolve),
    children:[
      //...PropertyBaseInfo,
      {
        path:"PaymentManager",
        name:"PaymentManager",
        meta:{
          title:'收缴费管理'
        },
        redirect:'PaymentManager/configPayment',
        component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/index'], resolve),
        children:[
          {
            path:"configPayment",
            name:"configPayment",
            meta:{
              title:'配置缴费项'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/configPayment'], resolve)
          },
          {
            path:"setPaymentStandard",
            name:"setPaymentStandard",
            meta:{
              title:'设定缴费标准'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/setPaymentStandard'], resolve)
          },
          {
            path:"createPaymentNotice",
            name:"createPaymentNotice",
            meta:{
              title:'生成缴费公告'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/createPaymentNotice'], resolve)
          },
          {
            path:"releasePaymentNotice",
            name:"releasePaymentNotice",
            meta:{
              title:'发布缴费公告'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/releasePaymentNotice'], resolve)
          },
          {
            path:"searchPaymentNotice",
            name:"searchPaymentNotice",
            meta:{
              title:'缴费公告查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/searchPaymentNotice'], resolve)
          },
          {
            path:"paymentNoticeDetail",
            name:"paymentNoticeDetail",
            meta:{
              title:'缴费公告详情'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/paymentNoticeDetail'], resolve)
          },
          {
            path:"createPropertyPaymentNotice",
            name:"createPropertyPaymentNotice",
            meta:{
              title:'生成物业费缴费公告'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/createPropertyPaymentNotice'], resolve)
          },
          {
            path:"searchPaymentRecord",
            name:"searchPaymentRecord",
            meta:{
              title:'缴费记录查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/searchPaymentRecord'], resolve)
          },
          {
            path:"searchArrearsRecord",
            name:"searchArrearsRecord",
            meta:{
              title:'未交费记录查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/PaymentManager/searchArrearsRecord'], resolve),
          }
        ]
      },
      {
        path:"AccountsManager",
        name:"AccountsManager",
        meta:{
          title:'账务管理'
        },
        redirect:'AccountsManager/accountsManage',
        component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Property/AccountsManager/index'], resolve),
        children:[
          ...AccountManager
        ]
      }
    ]
  },

  {
    path: 'Renter',
    /*name: 'Renter',*/
    meta: {
      title: '智慧物业租客'
    },
    redirect:'Renter/PropertyPayment',
    component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Renter/index'], resolve),
    children:[
      /*{
        path: "",
        name: "index",
        meta: {
          title: '智慧物业租客'
        },
        component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Renter/index/index'], resolve)
      },*/
//    {
//      path: "",
//      name: "EnterpriseCentre",
//      meta: {
//        title: '企业中心'
//      },
//      component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Renter/EnterpriseCentre/EnterpriseCentre'], resolve)
//    },
//    ...AccountManager,
      {
        path: "PropertyPayment",
        name: "PropertyPayment",
        meta: {
          title: '物业缴费'
        },
        component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Renter/PropertyPayment/PropertyPayment'], resolve)
      },
      {
        path: "paymentRecord",
        name: "paymentRecord",
        meta: {
          title: '查看缴费记录'
        },
        component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/Renter/PropertyPayment/paymentRecord'], resolve)
      }
    ]
  }
]

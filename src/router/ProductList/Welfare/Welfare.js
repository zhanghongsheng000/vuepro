export default [
  {
    path:'PayRule',
    meta:{
      title:'消费规则'
    },
    redirect:'PayRule/payRuleConfig',
    component: () => import('@/pages/ProductList/Welfare/PayRule/index'),
    children:[
      {
        path:'payRuleConfig',
        meta:{
          title:'消费规则配置'
        },
        component: () => import('@/pages/ProductList/Welfare/PayRule/payRuleConfig'),
      },
    ]
  },
  {
    path:'Recharge',
    meta:{
      title:'充值对账'
    },
    redirect:'Recharge/rechargeAndRecord',
    component: () => import('@/pages/ProductList/Welfare/Recharge/index'),
    children:[
      {
        path:'rechargeAndRecord',
        meta:{
          title:'充值对账'
        },
        component: () => import('@/pages/ProductList/Welfare/Recharge/rechargeAndRecord'),
      },
      {
        path:'orderDetail',
        meta:{
          title:'账单明细'
        },
        component: () => import('@/pages/ProductList/Welfare/Recharge/orderDetail'),
      },
      {
        path:'recharge',
        meta:{
          title:'充值'
        },
        component: () => import('@/pages/ProductList/Welfare/Recharge/recharge'),
      },
      {
        path:'setRemindAmount',
        meta:{
          title:'金额不足提醒设置'
        },
        component: () => import('@/pages/ProductList/Welfare/Recharge/setRemindAmount'),
      }
    ]
  },
  {
    path:'InvoiceManager',
    meta:{
      title:'发票管理'
    },
    redirect:'InvoiceManager/makeInvoice',
    component: () => import('@/pages/ProductList/Welfare/InvoiceManager/index'),
    children:[
      {
        path:'index',
        meta:{
          title:'开发票'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/index'),
      },
      {
        path:'makeInvoice',
        meta:{
          title:'开发票'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/makeInvoice'),
      },
      {
        path:'companyIdentify',
        meta:{
          title:'企业资质认证'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/companyIdentify'),
      },
      {
        path:'waitAuditing',
        meta:{
          title:'等待审核'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/waitAuditing'),
      },
      {
        path:'identifyNopass',
        meta:{
          title:'审核未通过'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/identifyNopass'),
      },
      {
        path:'identifyNopassTitle',
        meta:{
          title:'审核未通过'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/identifyNopassTitle'),
      },
      {
        path:'makeInvoiceMessage',
        meta:{
          title:'开发票'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/makeInvoiceMessage'),
      },
      {
        path:'invoiceRecord',
        meta:{
          title:'发票记录'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/invoiceRecord'),
      },
      {
        path:'invoiceRiseManager',
        meta:{
          title:'发票抬头管理'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/invoiceRiseManager'),
      },
      {
        path:'importInvoicer',
        meta:{
          title:'批量导入发票抬头'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/importInvoicer'),
      },
      {
        path:'receivingAddressManager',
        meta:{
          title:'收货地址管理'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/receivingAddressManager'),
      },
      {
        path:'supplyQualifice',
        meta:{
          title:'收货地址管理'
        },
        component: () => import('@/pages/ProductList/Welfare/InvoiceManager/supplyQualifice'),
      }
    ]
  },
  {
    path:'welfareReport',
    meta:{
      title:'消费报告'
    },
    component: () => import('@/pages/ProductList/Welfare/WelfareReport/welfareReport'),
  },
]

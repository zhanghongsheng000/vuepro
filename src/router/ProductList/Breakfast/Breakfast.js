export default [
  {
    path: 'Property',
    /* name: 'Property',*/
    meta: {
      title: '物业公司'
    },
    redirect:'Property/setMealStatistics',
    component: resolve => require(['@/pages/ProductList/Breakfast/Property/index'], resolve),
    children: [
      {
        path:'SetMealStatistics',
        meta:{
          title:'套餐销售统计'
        },
        redirect:'SetMealStatistics/SetMealStatistics',
        component: resolve => require(['@/pages/ProductList/Breakfast/Property/SetMealStatistics/index'], resolve),
        children:[
          {
            path:'SetMealStatistics',
            meta:{
              title:'套餐销售统计'
            },
            component: resolve => require(['@/pages/ProductList/Breakfast/Property/SetMealStatistics/setMealStatistics'], resolve),
          },
          {
            path:'OrderList',
            meta:{
              title:'套餐销售统计详情'
            },
            component: resolve => require(['@/pages/ProductList/Breakfast/Property/SetMealStatistics/orderList'], resolve),
          }
        ]
      },
      {
        path:'ShareProfitByMonth',
        meta:{
          title:'分润查询'
        },
        redirect:'ShareProfitByMonth/ShareProfitByMonth',
        component: resolve => require(['@/pages/ProductList/Breakfast/Property/ShareProfitByMonth/index'], resolve),
        children:[
          {
            path:'ShareProfitByMonth',
            meta:{
              title:'分润查询'
            },
            component: resolve => require(['@/pages/ProductList/Breakfast/Property/ShareProfitByMonth/shareProfitByMonth'], resolve),
          },
          {
            path:'ShareProfitByMonthDetails',
            meta:{
              title:'分润查询详情'
            },
            component: resolve => require(['@/pages/ProductList/Breakfast/Property/ShareProfitByMonth/shareProfitByMonthDetails'], resolve),
          },
          {
            path:'ShareProfitOrderList',
            meta:{
              title:'分润查询订单列表'
            },
            component: resolve => require(['@/pages/ProductList/Breakfast/Property/ShareProfitByMonth/shareProfitOrderList'], resolve),
          }
        ]
      },
    ]
  }


]


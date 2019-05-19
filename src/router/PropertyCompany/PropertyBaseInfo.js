export default [
  {
    path:"LandlordManager",
/*    name:"LandlordManager",*/
    meta:{
      title:'房东管理'
    },
    redirect:'LandlordManager/addLandlord',
    component: resolve => require(['@/pages/PropertyCompany/CustomerManager/LandlordManager/index'], resolve),
    children:[
      {
        path:"addLandlord",
/*        name:"addLandlord",*/
        meta:{
          title:'新增房东'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/LandlordManager/addLandlord'], resolve)
      },
      {
        path:"importLandlord",
/*        name:"importLandlord",*/
        meta:{
          title:'导入房东'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/LandlordManager/importLandlord'], resolve)
      },
      {
        path:"searchLandlord",
 /*       name:"searchLandlord",*/
        meta:{
          title:'房东查询'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/LandlordManager/searchLandlord'], resolve)
      }
    ]
  },
  {
    path:"RenterManager",
/*    name:"RenterManager",*/
    meta:{
      title:'租客管理'
    },
    redirect:'RenterManager/addRenter',
    component: resolve => require(['@/pages/PropertyCompany/CustomerManager/RenterManager/index'], resolve),
    children:[
      {
        path:"addRenter",
/*        name:"addRenter",*/
        meta:{
          title:'新增租客'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/RenterManager/addRenter'], resolve)
      },
      {
        path:"importRenter",
/*        name:"importRenter",*/
        meta:{
          title:'导入租客'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/RenterManager/importRenter'], resolve)
      },
      {
        path:"serachRenter",
/*        name:"serachRenter",*/
        meta:{
          title:'租客查询'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/RenterManager/searchRenter'], resolve)
      }
    ]
  }
]

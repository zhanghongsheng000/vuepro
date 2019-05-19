export default [
  {
    path:"HouseManager",
/*    name:"HouseManager",*/
    meta:{
      title:'房产管理'
    },
    redirect:'HouseManager/myBuildingList',
    component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/HouseManager/index'], resolve),
    children:[
      {
        path:"myBuildingGroups",
/*        name:"myBuildingGroups",*/
        meta:{
          title:'楼盘详情'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/HouseManager/myBuildingGroups'], resolve)
      },
      {
        path:"myBuildingList",
/*        name:"myBuildingList",*/
        meta:{
          title:'我的楼盘'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/HouseManager/myBuildingList'], resolve)
      }
    ]
  },
  {
    path:"LandlordManager",
/*    name:"LandlordManager",*/
    meta:{
      title:'房东管理'
    },
    redirect:'LandlordManager/addLandlord',
    component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/LandlordManager/index'], resolve),
    children:[
      {
        path:"addLandlord",
/*        name:"addLandlord",*/
        meta:{
          title:'新增房东'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/LandlordManager/addLandlord'], resolve)
      },
      {
        path:"importLandlord",
/*        name:"importLandlord",*/
        meta:{
          title:'导入房东'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/LandlordManager/importLandlord'], resolve)
      },
      {
        path:"searchLandlord",
 /*       name:"searchLandlord",*/
        meta:{
          title:'房东查询'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/LandlordManager/searchLandlord'], resolve)
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
    component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/RenterManager/index'], resolve),
    children:[
      {
        path:"addRenter",
/*        name:"addRenter",*/
        meta:{
          title:'新增租客'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/RenterManager/addRenter'], resolve)
      },
      {
        path:"importRenter",
/*        name:"importRenter",*/
        meta:{
          title:'导入租客'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/RenterManager/importRenter'], resolve)
      },
      {
        path:"serachRenter",
/*        name:"serachRenter",*/
        meta:{
          title:'租客查询'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/RenterManager/searchRenter'], resolve)
      }
    ]
  },
  {
    path: "AccountInformation",
    name: "AccountInformation",
    meta: {
      title: '账户资料'
    },
    redirect:'AccountInformation/enterpriceInformation',
    component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/AccountInformation/index'], resolve),
    children: [
      {
        path: "alterPassword",
        name: "alterPassword",
        meta: {
          title: '修改密码'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/AccountInformation/alterPassword'], resolve)
      },
      {
        path: "enterpriceInformation",
        name: "enterpriceInformation",
        meta: {
          title: '企业信息'
        },
        component: resolve => require(['@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/AccountInformation/enterpriceInformation'], resolve)
      }
    ]
  }
]

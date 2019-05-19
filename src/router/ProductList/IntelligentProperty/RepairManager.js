import AccountManager from "../../Public/AccountManagerPublic";
import PropertyBaseInfo from "../../Public/PropertyBaseInfo";
export default  [
  {
    path:"PropertyRepair",
    /* name:"Property",*/
    meta:{
      title:'物业公司'
    },
    redirect:'PropertyRepair/repairList',
    component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/index'], resolve),
    children:[
      {
            path:"repairList",
            // name:"configPayment",
            meta:{
              title:'报修列表'
            },
            component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/repairList'], resolve)
      },
      {
        path:"repairListDetails",
        // name:"configPayment",
        meta:{
          title:'报修详情'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/repairListDetails'], resolve)
      },
      {
        path:"servicesConfigure",
        // name:"configPayment",
        meta:{
          title:'服务项配置'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/servicesConfigure'], resolve)
      },
      {
        path:"servicesAdd",
        // name:"configPayment",
        meta:{
          title:'服务项配置添加'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/servicesAdd'], resolve)
      },
      {
        path:"editServices",
        // name:"configPayment",
        meta:{
          title:'服务项配置编辑'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/editServices'], resolve)
      },
      {
        path:"materialsConfigure",
        // name:"configPayment",
        meta:{
          title:'物料管理配置'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/materialsManagerConfigure'], resolve)
      },
      {
        path:"materialsConfigureAdd",
        // name:"configPayment",
        meta:{
          title:'物料管理配置添加'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/materialsConfigureAdd'], resolve)
      },
      {
        path:"materialsEdit",
        // name:"configPayment",
        meta:{
          title:'物料管理配置编辑'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/materialsEdit'], resolve)
      },
      {
        path:"repairOrderStatis",
        // name:"configPayment",
        meta:{
          title:'报修订单统计'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/repairOrderStatis'], resolve)
      },
      {
        path:"repairOrderStatisDetails",
        // name:"configPayment",
        meta:{
          title:'报修订单统计详情'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/repairOrderStatisDetails'], resolve)
      },
      {
        path:"declarRegistration",
        // name:"configPayment",
        meta:{
          title:'报单登记'
        },
        component: resolve => require(['@/pages/IntelligentProperty/RepairManager/Property/declarRegistration'], resolve)
      },
    ]
  },
]

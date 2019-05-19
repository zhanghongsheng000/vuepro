import PropertyBaseInfo from "./PropertyBaseInfo";
import Passer from '../ProductList/IntelligentProperty/Passer'
import PaymentProperty from '../ProductList/IntelligentProperty/PaymentProperty'
import RepairManager from '../ProductList/IntelligentProperty/RepairManager'
import Breakfast from '../ProductList/Breakfast/Breakfast'
import AccountManager from '../Public/AccountManagerPublic'
import ProductIntroduce from "../ProductIntroduce/ProductIntroduce"
import PropertyNotice from "./PropertyNotice/PropertyNotice"
import PropertyCompanyMessage from "./PropertyCompanyMessage/PropertyCompanyMessage"
import PropertyBaseRepair from "./PropertyBaseRepair";


export default [
  {
    path: '/PropertyCompany',
    name: 'indexProperty',
    meta: {
      title: '物业公司'
    },
    redirect: 'PropertyCompany/index',
    component: resolve => require(['@/pages/PropertyCompany/index_property'], resolve),
    children: [
      {
        path: 'index',
        meta: {
          title: '首页'
        },
        component: resolve => require(['@/pages/PropertyCompany/Index/index'], resolve),
      },
      ...ProductIntroduce,
      {
        path: "HouseManager",
        /*    name:"HouseManager",*/
        meta: {
          title: '房产管理'
        },
        redirect: 'HouseManager/myBuildingList',
        component: resolve => require(['@/pages/PropertyCompany/HouseManager/index'], resolve),
        children: [
          {
            path: "myBuildingDetail",
            /*        name:"myBuildingGroups",*/
            meta: {
              title: '仪表盘'
            },
            component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/index'], resolve),
            children:[
              {
                path: "myBuildingDetail/:buildingId",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '仪表盘'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/myBuildingDetail'], resolve)
              },
              {
                path: "roomInfo",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '房间信息'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/roomInfo'], resolve)
              },
              {
                path: "companyInfo",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '租客公司信息'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/companyInfo'], resolve)
              },
              {
                path: "customerInfo",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '人员信息'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/customerInfo'], resolve)
              },
              {
                path: "renterCompanyInfo",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '租客公司详情'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/renterCompanyInfo'], resolve)
              },
              {
                path: "noReceiveRepairList",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '未接单报修列表'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/noReceiveRepairList'], resolve)
              },
              {
                path: "RepairListDeatils",
                /*        name:"myBuildingGroups",*/
                meta: {
                  title: '未接单报修列表详情'
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingDetail/repairListDetails'], resolve)
              },
            ]
          },
          {
            path: "importBuildingGroup",
            /*        name:"myBuildingGroups",*/
            meta: {
              title: '楼盘导入'
            },
            component: resolve => require(['@/pages/PropertyCompany/HouseManager/importBuildingGroup'], resolve)
          },
          {
            path: "myBuildingList",
            /*        name:"myBuildingGroups",*/
            meta: {
              title: '写字楼列表'
            },
            component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingList'], resolve)
          },
          {
            path: 'buildingGroupManager',
            meta: {
              title: "楼盘管理"
            },
            redirect: 'buildingGroupManager/buildingGroupManager',
            component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/index'], resolve),
            children: [
              {
                path: 'buildingGroupManager',
                meta: {
                  title: "楼盘管理"
                },
                redirect: 'buildingGroupManager/buildingGroupManager',
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingGroupManager/index'], resolve),
                children: [
                  {
                    path: 'buildingGroupManager',
                    meta: {
                      title: "楼盘管理"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingGroupManager/buildingGroupManager'], resolve),
                  },
                  {
                    path: 'addBuildingGroup',
                    meta: {
                      title: "添加楼盘"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingGroupManager/addBuildingGroup'], resolve),
                  },
                  {
                    path: 'editBuildingGroup',
                    meta: {
                      title: "编辑楼盘"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingGroupManager/editBuildingGroup'], resolve),
                  }
                ]
              },
              {
                path: 'buildingManager',
                meta: {
                  title: "写字楼管理"
                },
                redirect: 'buildingManager/buildingManager',
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingManager/index'], resolve),
                children: [
                  {
                    path: 'addBuilding',
                    meta: {
                      title: "添加写字楼"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingManager/addBuilding'], resolve),
                  },
                  {
                    path: 'editBuilding',
                    meta: {
                      title: "编辑写字楼"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingManager/editBuilding'], resolve),
                  },
                  {
                    path: 'buildingManager',
                    meta: {
                      title: "写字楼列表"
                    },
                    component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/buildingManager/buildingManager'], resolve),
                  }
                ]
              },
              {
                path: 'floorManager',
                meta: {
                  title: "楼层管理"
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/floorManager'], resolve),
              },
              {
                path: 'roomManager',
                meta: {
                  title: "房间管理"
                },
                component: resolve => require(['@/pages/PropertyCompany/HouseManager/buildingGroupManager/roomManager'], resolve),
              },

            ]
          }
        ]
      },
      {
        path: 'CustomerManager',
        meta: {
          title: '客户管理'
        },
        component: resolve => require(['@/pages/PropertyCompany/CustomerManager/index'], resolve),
        redirect: 'CustomerManager',
        children: [
          ...PropertyBaseInfo,
          {
            path: "importRenterAndBuildingGroup",
            /*        name:"myBuildingGroups",*/
            meta: {
              title: '楼盘导入'
            },
            component: resolve => require(['@/pages/PropertyCompany/CustomerManager/importRenterAndBuildingGroup'], resolve)
          },
        ]
      },
    /*  {
        path: 'RepairManager',
        meta: {
          title: '报修管理'
        },
        component: resolve => require(['@/pages/PropertyCompany/repairManager/index'], resolve),
        redirect: 'repairManager',
        children: [
          ...PropertyBaseRepair,
          {
            path: "repairList",
            /!*        name:"myBuildingGroups",*!/
            meta: {
              title: '报修列表'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/repairList'], resolve)
          },
          {
            path: "openRepairManager",
            /!*        name:"myBuildingGroups",*!/
            meta: {
              title: '开通报修'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/openRepairManager'], resolve)
          },
          {
            path: "repairListDetails",
            /!*        name:"myBuildingGroups",*!/
            meta: {
              title: '报修单详情'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/repairListDetails'], resolve)
          },
          {
            path: "repairOrderStatis",
            /!*        name:"myBuildingGroups",*!/
            meta: {
              title: '报修订单统计'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/repairOrderStatis'], resolve)
          },
          {
            path: "repairOrderStatisDetails",
            /!*        name:"myBuildingGroups",*!/
            meta: {
              title: '报修订单统计详情'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/repairOrderStatisDetails'], resolve)
          },
          {
            path: "declarRegistration",
            /!*        name:"declarRegistration",*!/
            meta: {
              title: '报单登记'
            },
            component: resolve => require(['@/pages/PropertyCompany/RepairManager/declarRegistration'], resolve)
          },
        ]
      },*/
      {
        path: 'PropertyManageSystem',
        meta: {
          title: '物业系统管理'
        },
        component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/index'], resolve),
        children: [
          {
            path: 'IntelligentProperty',
            meta: {
              title: '智慧物业'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/IntelligentProperty/index'], resolve),
            children: [
              {
                path: "Passer",
                /*        name:"myBuildingList",*/
                meta: {
                  title: '通行客'
                },
                component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/IntelligentProperty/Passer/index'], resolve),
                redirect: 'Passer/Property',
                children: [
                  ...Passer
                ]
              },
              {
                path: "PaymentProperty",
                /*        name:"myBuildingList",*/
                meta: {
                  title: '智能缴费'
                },
                redirect: 'PaymentProperty/Property',
                component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/IntelligentProperty/PaymentProperty/index'], resolve),
                children: [
                  ...PaymentProperty
                ]
              },
              {
                path: "RepairManager",
                /*        name:"myBuildingList",*/
                meta: {
                  title: '报修管理'
                },
                redirect: 'RepairManager/PropertyRepair',
                component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/IntelligentProperty/RepairManager/index'], resolve),
                children: [
                  ...RepairManager
                ]
              },
            ]
          },
          {
            path: "Breakfast",
            /*        name:"myBuildingList",*/
            meta: {
              title: '早餐颂'
            },
            redirect: 'Breakfast/Property',
            component: resolve => require(['@/pages/PropertyCompany/PropertyProduct/Breakfast/index'], resolve),
            children: [
              ...Breakfast
            ]
          },

          /*{
            path:"NoSencePasser",
            /!*        name:"myBuildingList",*!/
            meta:{
              title:'无感通行'
            },
            component: resolve => require(['@/pages/PropertyCompany/HouseManager/myBuildingList'], resolve)
          },*/
        ]
      },
      ...AccountManager,
      {
        path: 'PropertyCompanyManager',
        /* name: 'Renter',*/
        meta: {
          title: '物业公司管理'
        },
        redirect: '/PropertyCompanyManager/companyInfo',
        component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/index'], resolve),
        children: [
          {
            path: 'companyInfo',
            /* name: 'Renter',*/
            meta: {
              title: '企业信息'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/companyInfo'], resolve),
          },
          {
            path: 'companyMessage',
            /* name: 'Renter',*/
            meta: {
              title: '消息管理'
            },
            redirect: 'companyMessage/propertyCompanyMessage',
            ///PropertyCompany/PropertyCompanyManager/companyMessage/companyMessage
            //PropertyCompany/PropertyCompanyManager/companyMessage/propertyCompanyMessage/propertyCompanyMessage_receive
            component: () => import('@/pages/PropertyCompany/PropertyCompanyManager/companyMessage'),
            children: [
              ...PropertyCompanyMessage
            ]
          },
          {
            path: 'permissionsManager',
            /* name: 'Renter',*/
            meta: {
              title: '权限管理'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/permissionsManager'], resolve),
          },
//        {
//          path: 'employeeManager',
//          /* name: 'Renter',*/
//          meta: {
//            title: '员工管理'
//          },
//          component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/employeeManager'], resolve),
//        },
          {
            path: 'PropertyCompanyEmployeeManager',
            meta: {
              title: '员工管理'
            },
            //CommonCompany/CommonCompanyManager/CommonCompanyEmployeeManager/CommonCompanyEmployeeManager
            //PropertyCompany/PropertyCompanyManager/PropertyCompanyEmployeeManager/propertyCompanyEmployeeManager
            redirect: 'PropertyCompanyEmployeeManager/PropertyCompanyEmployeeManager',
            component: () => import('@/pages/PropertyCompany/PropertyCompanyManager/PropertyCompanyEmployeeManager/index'),
            children: [
              {
                path: 'PropertyCompanyEmployeeManager',
                meta: {
                  title: '员工管理'
                },
                component: () => import('@/pages/PropertyCompany/PropertyCompanyManager/PropertyCompanyEmployeeManager/propertyCompanyEmployeeManager'),
              },
              {
                path: 'importEmployee',
                meta: {
                  title: '导入员工'
                },
                component: () => import('@/pages/PropertyCompany/PropertyCompanyManager/PropertyCompanyEmployeeManager/importEmployee'),
              }
            ]
          },
          {
            path: 'positionManager',
            /* name: 'Renter',*/
            meta: {
              title: '职位管理'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/positionManager'], resolve),
          },
          {
            path: 'powerManager',
            /* name: 'Renter',*/
            meta: {
              title: '权限管理'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/powerManager'], resolve),
          },
          {
            path: 'departmentManager',
            /* name: 'Renter',*/
            meta: {
              title: '部门管理'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/departmentManager'], resolve),
          },
/*          {
            path: 'accountSett',
            meta: {
              title: '账户设置'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/accountSett'], resolve),
          },*/
          {
            path:'accountSett',
            meta:{
              title:'账户设置'
            },
            component:()=>import('@/pages/PropertyCompany/PropertyCompanyManager/accountSett/index'),
            redirect:'accountSett/PropertyCompanyChangeMobile',
            children:[
              {
                path:'PropertyCompanyChangeMobile',
                meta:{
                  title:'更换手机号'
                },
                component:()=>import('@/pages/PropertyCompany/PropertyCompanyManager/accountSett/PropertyCompanyChangeMobile'),
              },
              {
                path:'PropertyCompanyChangeManager',
                meta:{
                  title:'更换管理员'
                },
                component:()=>import('@/pages/PropertyCompany/PropertyCompanyManager/accountSett/PropertyCompanyChangeManager'),
              },
            ]
          },
          {
            path: 'modifyPassword',
            /* name: 'Renter',*/
            meta: {
              title: '修改密码'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/modifyPassword'], resolve),
          },
          {
            path: 'editCompanyInfo',
            /* name: 'Renter',*/
            meta: {
              title: '编辑公司信息'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyManager/editCompanyInfo'], resolve),
          },
        ]
      },
      {
        path: 'PropertyCompanyNotice',
        /* name: 'Renter',*/
        meta: {
          title: '物业通知'
        },
        redirect: '/PropertyCompanyNotice/noticeList',
        component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/index'], resolve),
        children: [
          {
            path: 'noticeList',
            /* name: 'Renter',*/
            meta: {
              title: '物业通知列表'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeList'], resolve),
          },
          {
            path: 'noticeSend',
            /* name: 'Renter',*/
            meta: {
              title: '物业通知发送页'
            },
            component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyNotice/noticeSend'], resolve),
          },
        ]
      },
      /*      {
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
            },*/
      {
        path: 'Mnangement',
        meta: {
          title: "招商管理"
        },
        redirect: 'Mnangement/onePointBusiness',
        component: resolve => require(['@/pages/PropertyCompany/Mnangement/index'], resolve),
        children: [
          {
            path: 'onePointBusiness',
            meta: {
              title: "一键招商"
            },
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/onePointBusiness'], resolve),
          },
          {
            path: 'rentDateRemind',
            meta: {
              title: "租期提醒"
            },
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/rentDateRemind'], resolve),
          },
          {
            path: 'rentDateDetail',
            meta: {
              title: "租期详情"
            },
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/rentDateDetail'], resolve),
          },
          {
            path: 'rentManager',
            meta: {
              title: "租约管理"
            },
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/rentManager'], resolve),
          },
          {
            path: 'remindDateConfig',
            meta: {
              title: "提醒日期配置"
            },
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/remindDateConfig'], resolve),
          },
          {
            path: 'editMessage',
            meta: {
              title: "楼盘信息"
            },
            redirect: 'editMessage/editBuildingGroup',
            component: resolve => require(['@/pages/PropertyCompany/Mnangement/editMessage/index'], resolve),
            children: [
              {
                path: 'editBuildingGroup',
                meta: {
                  title: "楼盘信息"
                },
                component: resolve => require(['@/pages/PropertyCompany/Mnangement/editMessage/editBuildingGroup'], resolve),
              },
              {
                path: 'editBuilding',
                meta: {
                  title: "写字楼信息"
                },
                component: resolve => require(['@/pages/PropertyCompany/Mnangement/editMessage/editBuilding'], resolve),
              },
              {
                path: 'editRoom',
                meta: {
                  title: "房间信息"
                },
                component: resolve => require(['@/pages/PropertyCompany/Mnangement/editMessage/editRoom'], resolve),
              },
            ]
          }
        ]
      },

      {
        path: 'ThirdPartyBusiness',
        /* name: 'Renter',*/
        meta: {
          title: '第三方业务管理'
        },
        component: resolve => require(['@/pages/PropertyCompany/ThirdPartyBusiness/thirdPartyBusiness'], resolve),
      },
      {
        path: 'ShareProfit',
        meta: {
          title: '分润管理'
        },
        redirect:'ShareProfit/ShareProfit',
        component: resolve => require(['@/pages/PropertyCompany/ShareProfit/index'], resolve),
        children:[
          {
            path: 'ShareProfit',
            meta: {
              title: "分润管理"
            },
            component: resolve => require(['@/pages/PropertyCompany/ShareProfit/shareProfit'], resolve),
          },
          {
            path: 'monthlyIncome',
            meta: {
              title: "月收益查询"
            },
            component: resolve => require(['@/pages/PropertyCompany/ShareProfit/monthlyIncome'], resolve),
          },
          {
            path: 'dailyIncome',
            meta: {
              title: "日收益查询"
            },
            component: resolve => require(['@/pages/PropertyCompany/ShareProfit/dailyIncome'], resolve),
          },
          {
            path: 'IncomeDetails',
            meta: {
              title: "收益明细查询"
            },
            component: resolve => require(['@/pages/PropertyCompany/ShareProfit/IncomeDetails'], resolve),
          },
        ]
      },
      {
        path: 'StatisticalAnalysis',
        /* name: 'Renter',*/
        meta: {
          title: '统计分析'
        },
        component: resolve => require(['@/pages/PropertyCompany/StatisticalAnalysis/statisticalAnalysis'], resolve),
      },
      ...PropertyNotice,
    ]
  }

]


export default [
  {
    path: 'Property',
   /* name: 'Property',*/
    meta: {
      title: '物业公司'
    },
    redirect:'Property/Passer',
    component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/index'], resolve),
    children: [
      {
        path:'Passer',
        meta:{
          title:'通行客'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/Passer/Passer'], resolve),
      },
       {
        path:"PropertyEmployeeManagement",
       /* name:"PropertyEmployeeManagement",*/
		    redirect:'Passer',
//     redirect:'PropertyEmployeeManagement/RenterEmployeeApply',
        meta:{
          title:'员工管理'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/PropertyEmployeeManagement/index'], resolve),
        children:[
          {
            path:"PropertyEmployeeApply",
           // name:"PropertyEmployeeApply",
            meta:{
              title:'员工申请'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/PropertyEmployeeManagement/PropertyEmployeeApply'], resolve)
          },
          {
            path:"PropertyEmployeeApplyRecord",
            //name:"PropertyEmployeeApplyRecord",
            meta:{
              title:'员工申请记录'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/PropertyEmployeeManagement/PropertyEmployeeApplyRecord'], resolve)
          }
        ]
      },
      {
        path:"CustomerUserManager",
        /*name:"CustomerUserManager",*/
        meta:{
          title:'人员管理'
        },
        redirect:'CustomerUserManager/searchCustomerUser',
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/index'], resolve),
        children:[
          {
            path:"searchCustomerUser",
            //name:"searchCustomerUser",
            meta:{
              title:'人员查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/searchCustomerUser'], resolve)
          },
          {
            path:"customerUserInOutInfo",
            //name:"customerUserInOutInfo",
            meta:{
              title:'出入记录查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/customerUserInOutInfo'], resolve)
          },
          {
            path:"currentPasserInfo",
            //name:"currentPasserInfo",
            meta:{
              title:'实时通行信息'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/currentPasserInfo'], resolve)
          },
          {
            path:"currentPasserInfoDetial",
            //name:"currentPasserInfoDetial",
            meta:{
              title:'实时通行信息详情'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/currentPasserInfoDetial'], resolve)
          },
          {
            path:"currentBuildingCustomerUser",
            //name:"currentBuildingCustomerUser",
            meta:{
              title:'实时大楼人员'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CustomerUserManager/currentBuildingCustomerUser'], resolve)
          }
        ]
      },
      {
        path:"CompanyApprova",
  /*      name:"CompanyApprova",*/
        meta:{
          title:'入驻公司审批'
        },
        redirect:'CompanyApprova/CompanyApprova',
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CompanyApprova/index'], resolve),
        children:[
          {
            path:"CompanyApprova",
            //name:"CompanyApprova",
            meta:{
              title:'入驻公司审批'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/CompanyApprova/companyApprove'], resolve),
          }
        ]
      },
      {
        path:"PasserConfig",
    /*    name:"PasserConfig",*/
        meta:{
          title:'通行客配置'
        },
        redirect:'PasserConfig/PasserConfig',
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/PasserConfig/index'], resolve),
        children:[
          {
            path:"PasserConfig",
            //name:"PasserConfig",
            meta:{
              title:'通行客配置'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/PasserConfig/passerConfig'], resolve),
          }
        ]
      },
      {
        path:'IcCardManager',
        meta:{
          title:'IC卡管理'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/IcCardManager/icCardManager'], resolve),
      },
      {
        path:'TempPasserCard',
        meta:{
          title:'发放临时通行证'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Property/TempPasserCard/tempPasserCard'], resolve),
      }
    ]
  },

  {
    path: 'Renter',
   /* name: 'Renter',*/
    meta: {
      title: '租客公司'
    },
    redirect:'Renter/RenterEmployeeManagement',
    component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/index'], resolve),
    children: [
      {
        path:'Passer',
        meta:{
          title:'通行客'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/Passer/Passer'], resolve),
      },
      {
        path:"RenterEmployeeManagement",
       /* name:"RenterEmployeeManagement",*/
		    redirect:'Passer',
//     redirect:'RenterEmployeeManagement/RenterEmployeeApply',
        meta:{
          title:'员工管理'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterEmployeeManagement/index'], resolve),
        children:[
          {
            path:"RenterEmployeeApply",
           // name:"RenterEmployeeApply",
            meta:{
              title:'员工申请'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterEmployeeManagement/RenterEmployeeApply'], resolve)
          },
          {
            path:"RenterEmployeeApplyRecord",
            //name:"RenterEmployeeApplyRecord",
            meta:{
              title:'员工申请记录'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterEmployeeManagement/RenterEmployeeApplyRecord'], resolve)
          }
        ]
      },
      {
        path:"RenterCurrentManagement",
        //name:"RenterCurrentManagement",
        meta:{
          title:'通行管理'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterCurrentManagement/index'], resolve),
        children:[
          {
            path:"RenterEmployeeInoutRecordSearch",
            //name:"RenterEmployeeInoutRecordSearch",
            meta:{
              title:'员工出入记录查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterCurrentManagement/RenterEmployeeInoutRecordSearch'], resolve),
          },
          {
            path:"RenterVisitorInoutRecordSearch",
          /*  name:"RenterVisitorInoutRecordSearch",*/
            meta:{
              title:'来客通行记录查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterCurrentManagement/RenterVisitorInoutRecordSearch'], resolve),
          },
          {
            path:"RenterVisitorInoutPasscheckSearch",
            //name:"RenterVisitorInoutPasscheckSearch",
            meta:{
              title:'来客通行通行证查询'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterCurrentManagement/RenterVisitorInoutPasscheckSearch'], resolve),
          },
        ]
      },
      {
        path:'TempPasserCard',
        meta:{
          title:'发放临时通行证'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/TempPasserCard/tempPasserCard'], resolve),
      }
      /*{
        path:"RenterDepartmentManagement",
       /!* name:"RenterDepartmentManagement",*!/
        meta:{
          title:'部门管理'
        },
        component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterDepartmentManagement/index'], resolve),
        children:[
          {
            path:"RenterDepartmentManagement",
            name:"RenterDepartmentManagement",
            meta:{
              title:'部门管理'
            },
            component: resolve => require(['@/pages/IntelligentProperty/Passer/Renter/RenterDepartmentManagement/RenterDepartmentManagement'], resolve),
          }
        ]
      }*/
    ]
  },


]


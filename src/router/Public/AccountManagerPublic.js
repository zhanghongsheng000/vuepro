export default
[
  {
    path:'accountsManage',// 账务管理
    component:()=>import('@/components/zwgl/index'),
    meta:{
      title:'账务管理'
    }
  },
  {
    path:'accountsManage/nameConfirm',// 账务管理 实名认证
    component:()=>import('@/components/zwgl/nameConfirm'),
    meta:{
      title:'实名认证'
    }
  },
  {
    path:'accountsManage/setPaw',// 账务管理 设置交易密码
    component:()=>import('@/components/zwgl/setPaw'),
    meta:{
      title:'设置交易密码'
    }
  },
  {
    path:'accountsManage/bindcard-one',// 账务管理 绑卡1
    component:()=>import('@/components/zwgl/bindcard-one'),
    meta:{
      title:'绑卡'
    }
  },
  {
    path:'accountsManage/bindcard-two',// 账务管理 绑卡2
    component:()=>import('@/components/zwgl/bindcard-two'),
    meta:{
      title:'绑卡'
    }
  },
  {
    path:'accountsManage/bindcard-twos',// 账务管理 绑卡3
    component:()=>import('@/components/zwgl/bindcard-twos'),
    meta:{
      title:'绑卡'
    }
  },
  {
    path:'accountsManage/bindcard-four',// 账务管理 绑卡4
    component:()=>import('@/components/zwgl/bindcard-four'),
    meta:{
      title:'绑卡'
    }
  },
  {
    path:'accountsManage/extract-one',// 账务管理 提现1
    component:()=>import('@/components/zwgl/extract-one'),
    meta:{
      title:'提现'
    }
  },
  {
    path:'accountsManage/extract-two',// 账务管理 提现2
    component:()=>import('@/components/zwgl/extract-two'),
    meta:{
      title:'提现'
    }
  },
  {
    path:'accountsManage/recharge-one',// 账务管理 充值1
    component:()=>import('@/components/zwgl/recharge-one'),
    meta:{
      title:'充值'
    }
  },
  {
    path:'accountsManage/recharge-two',// 账务管理 充值2
    component:()=>import('@/components/zwgl/recharge-two'),
    meta:{
      title:'充值'
    }
  },
]

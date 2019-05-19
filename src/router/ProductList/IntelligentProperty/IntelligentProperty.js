import Passer from './Passer'
import PaymentProperty from './PaymentProperty'
import RepairManager from './RepairManager'

export default [
  {
    path: '/IntelligentProperty/Passer',
    /* name: '/IntelligentProperty/Passer',*/
    meta: {
      title: '通行客'
    },
    redirect: '/IntelligentProperty/Passer/Property',
    component: resolve => require(['@/pages/IntelligentProperty/Passer/index'], resolve),
    children: [
      ...Passer
    ]
  },
  {
    path: '/IntelligentProperty/PaymentProperty',
    /* name: '/IntelligentProperty/PaymentProperty',*/
    redirect: '/IntelligentProperty/PaymentProperty/Property',
    meta: {
      title: '物业缴费'
    },
    component: resolve => require(['@/pages/IntelligentProperty/PaymentProperty/index'], resolve),
    children: [
      ...PaymentProperty
    ]
  },
  {
    path: '/IntelligentProperty/RepairManager',
    /* name: '/IntelligentProperty/PaymentProperty',*/
    redirect: '/IntelligentProperty/RepairManager/Property',
    meta: {
      title: '报修管理'
    },
    component: resolve => require(['@/pages/IntelligentProperty/RepairManager/index'], resolve),
    children: [
      ...RepairManager
    ]
  }
]

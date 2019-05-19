import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  state:{
    token:'',
    currentRouter:'',
    //公司名称
    companyName:'',
    productIdNameDectonary:{
/*      '1':{
        name:'智慧物业',
        path:'IntelligentProperty',
        introPath:'ProductIntroduce/IntelligentProperty'
      },*/
      '2':{
        name:'贷发工资',
        path:'SalaryManager',
        introPath:'ProductIntroduce/SalaryManager'
      },
      '3':{
        name:'租金月付',
        path:'Zjyf',
        introPath:'ProductIntroduce/Zjyf'
      },
      '5':{
        name:'智能缴费',
        path:'PaymentProperty',
        introPath:'ProductIntroduce/PaymentProperty'
      },
      '6':{
        name:'通行客',
        path:'Passer',
        introPath:'ProductIntroduce/Passer'
      },
      '7':{
        name:'考勤管理',
        path:'AttendanceManager',
        introPath:'ProductIntroduce/Attendance'
      },
      '8':{
        name:'早餐颂',
        path:'Breakfast',
        introPath:'ProductIntroduce/Breakfast'
      },
      '9':{
        name:'报修管理',
        path:'PropertyRepair',
        introPath:'ProductIntroduce/Repair'
      },
      // '10':{
      //   name:'福利社',
      //   path:'Welfare',
      //   introPath:'ProductIntroduce/Welfare'
      // }
    },
    //修改之后，只要是物业角色，统统跳转到物业首页。其他角色都跳转到普通公司页面
    toRouter:{
      '0_10':'/CommonCompany',//临时角色，进入普通公司页面
      '1_20':'/PropertyCompany',//物业公司首页
      '5_20':'/PropertyCompany',//物业公司首页
      '6_30':'/PropertyCompany',//物业公司首页
      '5_30':'/PropertyCompany',//物业公司首页
      '8_36':'/PropertyCompany',//物业公司首页
      '9_38':'/PropertyCompany',//物业公司首页
      '6_33':'/CommonCompany',//管家婆(智慧物业首页)
      '6_31':'/CommonCompany',//管家婆(智慧物业首页)
      '5_31':'/CommonCompany',//管家婆(智慧物业首页)
      '1_22':'/',//'包租翁',
      '5_22':'/',//'包租翁',
      '6_32':'/',//'包租翁',
      '2_24':'/CommonCompany',//'薪管家首页',
      '1_21':'/CommonCompany',//'企业之家',
      '5_21':'/CommonCompany',//'企业之家',
      '6_21':'/CommonCompany',//'企业之家',
      '2_29':'/CommonCompany',//'企业之家',
      '2_27':'/CommonCompany',//'薪管家领导',
      '2_26':'/CommonCompany',//'薪管家人事',
      '2_25':'/CommonCompany',//'薪管家财务'
      '7_34':'/CommonCompany',//'考勤管理'
      '10_39':'/CommonCompany'//'考勤管理'
    },
    //修改之后，只要是物业角色，统统跳转到物业首页。其他角色都跳转到普通公司页面
    businessHomeToRouter:{
      '20':'/PropertyCompany',//物业公司首页
      '30':'/PropertyCompany',//物业公司首页
      '36':'/PropertyCompany',//物业公司首页
      '38':'/PropertyCompany',//物业公司首页
      '21':'/CommonCompany',//其他公司
//'22':'/',//其他公司
//'23':'/',//'其他公司
      '24':'/CommonCompany',//其他公司
      '25':'/CommonCompany',//其他公司
      '26':'/CommonCompany',//其他公司
      '27':'/CommonCompany',//其他公司
//'28':'/SalaryManager/cw/home',//
      '29':'/CommonCompany',//其他公司

      '31':'/CommonCompany',//其他公司
      //'32':'',//其他公司
      '33':'',//其他公司
      '34':'/CommonCompany',//其他公司
      '39':'/CommonCompany',//其他公司
    },
    permissionRouter:{
      '20':'/PropertyCompany',//物业公司首页
      '30':'/PropertyCompany',//物业公司首页
      '36':'/PropertyCompany',//物业公司首页
      '38':'/PropertyCompany',//物业公司首页
      '21':'/CommonCompany',//其他公司
      //'22':'/',//其他公司
      //'23':'/',//其他公司
      '24':'/CommonCompany',//其他公司
      '25':'/CommonCompany',//其他公司
      '26':'/CommonCompany',//其他公司
      '27':'/CommonCompany',//其他公司
      //'28':'/SalaryManager/cw/home',//
      '29':'/CommonCompany',//其他公司
      '30':'/CommonCompany',// 其他公司
      '31':'/CommonCompany',//其他公司
      '34':'/CommonCompany',//其他公司
      '39':'/CommonCompany'//其他公司
    }
  },
  getters:{},
  mutations:{},
  actions:{}
})

export default store

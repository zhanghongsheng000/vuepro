// noinspection JSAnnotator
import Vue from 'vue'
// noinspection JSAnnotator
import Router from 'vue-router'
import Login from '@/pages/public/login'
import Register from '@/pages/public/register'
import RegisterOld from '@/pages/public/register-old'
import RegisterZjyf from '@/pages/public/register-zjyf'

//物业公司专属菜单，包括：楼盘管理，租客管理，房东管理，物业公司管理，招商管理，第三方业务管理，分润管理，统计分析
import PropertyCompany from "./PropertyCompany/PropertyCompany"
//一般公司信息，包括：通知公告，企业中心（企业信息，消息管理，权限管理，账户设置），物业公司信息，公司管理（员工管理，部门管理）
import CommonCompany from "./CommonCompany/CommonCompany"


import store from '../store/'
Vue.use(Router)
// noinspection JSAnnotator
const router =  new Router({
  mode:'history',
  base:'/jujinsuo/',
  linkActiveClass:'active',
  routes: [
    {
      path:'/',
      name:'Login',
      meta: {
        title: '登录'
      },
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      meta: {
        title: '注册'
      },
      component:Register
    },
    {
      path:'/registerold',
      name:'Registerold',
      meta: {
        title: '之前注册'
      },
      component:RegisterOld
    },
    {
      path:'/register-zjyf',
      name:'RegisterZjyf',
      meta: {
        title: '租金月付注册'
      },
      component:RegisterZjyf
    },
    {
      path:'/temp',
      name:'temp',
      meta: {
        title: '选择写字楼层'
      },
      component: resolve => require(['@/pages/public/choseMaterial.vue'], resolve),
    },
    {
      path:'/test',
      name:'test',
      meta: {
        title: '选择写字楼层'
      },
      component: resolve => require(['@/pages/public/choseMaterial.vue'], resolve),
    },
    //物业公司信息管理
    ...PropertyCompany,

    //普通公司信息管理
    ...CommonCompany,
    //物业公司 和 普通公司 物业通知(首页的物业通知)

  ]
})

router.beforeEach((to, from, next) => {
  //将将要跳转的路由写入store，方便生成面包屑
  router.app.$store.state.currentRouter = to;
  //判断是否需要弹出提示登录信息。保证在所有状况下，关于登录和用户的信息只弹出一次。每次弹出登录信息都需要设置为false
  let onlyOnePropFlag = true;
  console.log('打印地址',to.path)
  //控制跳转登录的一级跳转 产品_角色-路由 字典 主键为产品_角色
  let toRouter = router.app.$store.state.toRouter;
  //检验是否有权限跳入子页面的 角色-路由  字典 主键为角色。是每个角色的根路由
  let permissionRouter = router.app.$store.state.permissionRouter;
  //实际要跳转进入的页面。角色-路由  字典 主键为角色 是每个角色的首页路由
  let businessHomeToRouter = router.app.$store.state.businessHomeToRouter;
  //产品介绍字典表。查看要跳入的路由中，是否有产品介绍字典中的path，如果有的话，判断用户的产品ID中是否有这个产品的ID，如果有的话，就跳入，没有的话进入产品介绍页面
  let productIdNameDectonary = router.app.$store.state.productIdNameDectonary;
  //获取用户信息
  let info =  JSON.parse(sessionStorage.getItem('info')) || {}
  let roleList = info.roleList?info.roleList:[];
  //数组，用来存储根据用户权限可以进入的页面
  let checkRouterArray = [];
  //是否需要检验产品的标记。默认为true
  let ifCheckProduct = true;
  //如果用户角色为空，则可以进入居金所页面（普通公司）
  if(roleList.length==0){
    checkRouterArray.push('/CommonCompany')
    //ifCheckProduct = false;
  }
  else{
    //循环用户角色列表，然后查询字典获取用户可以进入的路由
    for(let o in roleList){
      //根据产品_角色-路由 字典字典获取 可进入路由
      let keyCheckRouterArrayByToRouter = roleList[o]['baseProductId']+'_'+roleList[o]['customerRoleId'];
      let routerBytoRouter = toRouter[keyCheckRouterArrayByToRouter];
      checkRouterArray.push(routerBytoRouter)
      //根据角色-路由  字典 再次获取可以进入的路由，这个路由是检验是否有权限进入这个页面
      let keyCheckRouterArrayByPemsRouter = roleList[o]['customerRoleId'];
      let routerByPemsRouter = permissionRouter[keyCheckRouterArrayByPemsRouter];
      checkRouterArray.push(routerByPemsRouter)
    }
  }
  //是否必须进入登录页面的标记。默认为true
  let flag = true;
  //如果是进入注册或者登录（添加登录页面是怕出现无限循环）页面，则开闸放人~
  if(to.name ==='Login' || to.name === 'RegisterZjyf' || to.name === 'Register' || to.name === 'Registerold'){
    flag = false;
    ifCheckProduct = false;
  }
  //如果可以获取用户信息，且有可进入的一级页面，则进行权限检测。
  else if(info !== undefined){
    console.log('权限表',checkRouterArray)
    //检验将要进入的路由路径是否包含权限中的根路由地址，如果包含，则说明有权限，如果不包含则说明没有权限。
    console.log('目标路由',to.path)
    if(checkRouterArray.length !== 0){
      flag = false;
      for(let c in checkRouterArray){
        if(to.path.indexOf(checkRouterArray[c])!==-1){
          //console.log(to.path,)
          flag = false;
          break;
        }
      }
    }
    if(flag){
        if(onlyOnePropFlag){
          router.app.$message.error('没有进入当前页面的权限，请切换用户！')
          //这种情况下，就不要再次提示登录了
          onlyOnePropFlag = false;
        }
    }
  }
  if(flag){
    if(onlyOnePropFlag){
      router.app.$message.error('请登录或注册！')
    }
    next({
      name:"Login"
    })
  }
  else{
    if(ifCheckProduct){
      //路由中是否有包含产品路由的标记。默认为无
      let flagProduct = false;
      //当前路径中包含的产品路由，默认为空
      let currentProductPath='';
      //当前路径中包含的产品路由的所属的产品的ID
      let currentProductId = '';
      for(let o in productIdNameDectonary){
        //如果路由中包含产品标记，则需要标记置为true

        if(to.path.indexOf(productIdNameDectonary[o].path)!=-1){
          console.log('目标地址',to.path)
          console.log('产品介绍页面',productIdNameDectonary[o].introPath)
          if(to.path.indexOf(productIdNameDectonary[o].introPath)==-1){
            flagProduct = true;
            currentProductPath = productIdNameDectonary[o].path;
            currentProductId = o;
            console.log('需要检验的产品ID',currentProductId)
            break;
          }
          else{
            flagProduct = false;
            continue;
          }

        }
        else{
          continue;
        }
      }
      //是否进入产品介绍页面的标记，默认为false
      let flagProductInfo = false;
      //如果路径中有路由标记，则需要检验，用户角色中是否有这款产品
      if(flagProduct && currentProductId!=''){
        //如果角色表为空，则直接进入产品介绍页面
        if(roleList.length==0){
          flagProductInfo = true;
        }
        else {
          for(let p in roleList){
            if(roleList[p].baseProductId && roleList[p].baseProductId==currentProductId){
              flagProductInfo = false;
              break;
            }
            else{
              flagProductInfo = true;
              continue;
            }
          }

        }

      }
      //如果需要进入产品介绍页，则进入。
      if(flagProductInfo){
        //基础路由，根据to.path来获取
        let baseRouter = '/CommonCompany/';
        if(to.path.indexOf('/PropertyCompany')!=-1){
          baseRouter = '/PropertyCompany/'
        }
        next({path:baseRouter+productIdNameDectonary[currentProductId].introPath,query:{productRouter:to.path}})
      }
      else{
        next()
      }
    }
    else{
      next();
    }
  }
})

export default router

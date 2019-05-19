<template>
  <div class="leftNav" id="leftNav">  <!--:style="{height:treeHeight}"-->
    <el-menu
      background-color="#3487fa"
      text-color="#ffffff"
      class="el-menu-demo"
      mode="vertical"
      menu-trigger="click"
      active-text-color="#ffffff"
      :unique-opened=true
      :router=true
      @open="handleOpen">
      <el-menu-item index="/CommonCompany" id="index"><span class="nav_returnIndex"></span>首页</el-menu-item>
      <el-submenu :index="getFullPath('/CommonCompanyManager')">
        <template slot="title">公司管理</template>
        <el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyDepartmentManager')">部门管理</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyPositionManager')">职位管理</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyPowerManager')">权限管理</el-menu-item>-->
        <el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyEmployeeManager')">员工管理</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyManager/AttendanceManager')">考勤管理</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyImportingEmployees')">导入员工</el-menu-item>-->
      </el-submenu>
      <el-submenu :index="getFullPath('/CommonCompanyProduct')">
        <template slot="title">业务管理</template>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/Zjyf')">租金月付</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/SalaryManager')">贷发工资</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/IntelligentProperty/Passer')">通行客</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/IntelligentProperty/PaymentProperty')">智能缴费</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/RepairManager')">报修管理</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyProduct/Welfare')">福利社</el-menu-item>
        <!--<el-submenu :index="getFullPath('/CommonCompanyProduct/IntelligentProperty')">
          <template slot="title">智慧物业</template>

        </el-submenu>-->
      </el-submenu>
      <el-menu-item :index="getFullPath('/accountsManage')">财务管理</el-menu-item>
      <el-menu-item :index="getFullPath('/CommonCompanyNotice')">通知公告</el-menu-item>
      <el-submenu :index="getFullPath('/CommonCompanyCenter')">
        <template slot="title">企业中心</template>
        <el-menu-item :index="getFullPath('/CommonCompanyCenter/CommonCompanyInfo')">企业信息</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyCenter/CommonCompanyMessage')">消息管理</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/CommonCompanyCenter/CommonCompanyPermissions')">权限管理</el-menu-item>-->
        <el-menu-item :index="getFullPath('/CommonCompanyCenter/CommonCompanyInfoSet')">账户设置</el-menu-item>
        <el-menu-item :index="getFullPath('/CommonCompanyCenter/CommonCompanyModifyPassword')">修改密码</el-menu-item>
      </el-submenu>
      <el-menu-item :index="getFullPath('/CommonCompanyPropertyInfo')">物业公司信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "property-head-vertical",
    data() {
      return {
        //左侧树高度
        treeHeight:'',
        //基本路由
        base: "/CommonCompany",
        //默认活动路由
        activeIndex: '/IntelligentProperty/PaymentProperty/Property/HouseManager/myBuildingList',
        //面包屑导航
        crumbList: [],
        //公司名称
        companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
        meauList:[
          {
            name:'居金所首页',
            elementText:'',
            path:'/BusinessHome',
            children:[]
          },
          {
            name:'公司管理',
            elementText:'',
            path:'/HouseManager/myBuildingList',
            children:[
              {
                name:'部门管理',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'员工管理',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              }
            ]
          },
          {
            name:'业务管理',
            elementText:'',
            path:'/LandlordManager/addLandlord',
            children:[
              {
                name:'租金月付',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'贷发工资',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'智慧物业',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[
                  {
                    name:'智能缴费',
                    elementText:'',
                    path:'/HouseManager/myBuildingList',
                    children:[]
                  },
                  {
                    name:'通行客',
                    elementText:'',
                    path:'/HouseManager/myBuildingList',
                    children:[]
                  }
                ]
              }
            ]
          },
          {
            name:'财务管理',
            elementText:'',
            path:'/PaymentManager/configPayment',
            children:[]
          },
          {
            name:'通知公告',
            elementText:'',
            path:'/PaymentManager/configPayment',
            children:[]
          },
          {
            name:'企业中心',
            elementText:'',
            path:'/PaymentManager/configPayment',
            children:[
              {
                name:'企业信息',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'消息管理',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'权限管理',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              },
              {
                name:'账户设置',
                elementText:'',
                path:'/HouseManager/myBuildingList',
                children:[]
              }
            ]
          },
          {
            name:'物业公司信息',
            elementText:'',
            path:'/AccountsManager/accountsManage',
            children:[]
          }
        ],
        //用户真实姓名
        userRealName: this.$local.sefetch('info') ? this.$local.sefetch('info').userRealName : '',
        isShow: true
      };
    },
    computed:{
      // getter
      get: function () {
        return this.base
      },
      // setter
      set: function (currentPath) {
        this.base += currentPath;
      }
    },
    watch: {
      '$route' (route) {
        this.getRoutePath()
        if(this.$router.history.current.meta.title!=='物业公司'){
          this.isShow = true;
        }
/*        this.$nextTick(function(){
          console.log('卷高',document.body.scrollHeight)
          this.treeHeight = document.body.scrollHeight-75;
          this.treeHeight = this.treeHeight+'px';
        })*/
      }
    },
    methods: {
      handleOpen(key, keyPath){
        console.log(key, keyPath);
      },
      getRoutePath() {
        //var router = this.$store.state.currentRouter
        var router = this.$router.history.current
        this.crumbList = [];
        for(let o in router.matched){
          let temp = {};
          temp.path = router.matched[o].path;
          temp.name = router.matched[o].meta.title;
          this.crumbList.push(temp)
        }

      },
      getFullPath(currentPath){
        return this.base + currentPath;
      },
      handleCircular() {
        let cache = [];
        let keyCache = []
        return function(key, value) {
          if (typeof value === 'object' && value !== null) {
            var index = cache.indexOf(value);
            if (index !== -1) {
              return '[Circular ' + keyCache[index] + ']';
            }
            cache.push(value);
            keyCache.push(key || 'root');
          }
          return value;
        }
      },
      //退出登录
      quitLogin(){
        this.$local.sesave("info", null)
        this.$local.sesave("pwdInit", null)
        this.$local.sesave("isID", null)
        this.$local.sesave("isBank", null)
        this.$local.sesave("identity", null)
        this.$router.push("/")
      },
      //返回首页
      returnToBusinessHome(){
        this.$router.push({path:'/BusinessHome'})
      }
    },
    mounted:function(){
      console.log(this.$router)
      this.getRoutePath()
      if(this.$router.history.current.meta.title=='物业公司'){
        this.isShow = false;
      }
/*      this.$nextTick(function(){
        this.treeHeight = document.body.scrollHeight+'px';
      })*/
    }
  }
</script>

<style scoped lang="less">
  .leftNav{
    width:151px;
    float:left;
  }
</style>
<style lang="less">
  /*修改组件样式，所以放到全局中*/
  #leftNav{
    width:220px;
    background-color: #1168e1;
    .el-submenu .el-menu-item{
      min-width:100px;
    }
    .el-menu--horizontal {
      /*background-color: #515e93;*/
    }
    .el-menu-item, .el-submenu__title{
      height:45px;
      line-height:45px;
    }
    .el-menu--horizontal{
      border-bottom:none;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
      background-color:#3487fa;
    }
    a:visited{
      color:white;
    }
    .el-menu-item{
      padding:0px 5px;
    }
    /*风格颜色部分*/
    /*被选中菜单的颜色*/
    .el-menu-item .is-active{
      background-color: #ffffff!important;
      color:#1168e1!important;
    }
    .el-submenu__title i{
      color:#fff;
    }
    ul[role='menubar']>li{
      font-size:16px;
      background-color:#1168e1!important;
      border-bottom:solid #ffffff 1px;
    }
    ul[role='menubar']>li>div,ul[role='menu']>li>div{
      font-size:16px;
      background-color:#1168e1!important;
    }
    ul[role='menu']>li>div{
      font-size:14px;
      background-color:#1168e1!important;
      border-bottom:solid #3487fa 1px;
    }
    ul[role='menu']>li{
      font-size: 14px;
      color: #ffffff!important;
      background-color: #3b7df1!important;
      border-bottom: solid 1px #fff;
    }
    ul[role='menu']>li:last-child{
      border-bottom: none;
    }
    ul[role='menu']>li>ul[role='menu']>li{
      font-size:14px;
      color:#bfd4fd!important;
      background-color:#3487fa!important;
    }
    ul[role='menu']>li:hover{
      background-color:#e8eaff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
      border-left: 1px solid #888888;
    }
    ul[role='menu']>li>ul[role='menu']>li:hover{
      background-color: #e8eaff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*一级菜单选中效果*/
    ul[role='menubar']>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*二级菜单选中效果*/
    ul[role='menu']>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
    }
    /*三级菜单选中效果*/
    ul[role='menu']>li>ul[role='menu']>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
  }
/*  #index{
    background: linear-gradient(#86b7fc,#3b8bfa);
    height:55px;
    line-height:55px;
  }*/
</style>

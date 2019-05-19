<template>
  <div class="header PasserPropertyHead">
    <!--    <div class="top_wraper">
          <div class="proper_top">
            <span class="top_left">欢迎，{{companyName}},{{userRealName}}  <span class="quitLogin" @click="returnToBusinessHome">返回首页</span>  <span class="quitLogin" @click="quitLogin">退出</span></span>
            <span class="top_right">
              <span class="service">联系客服</span>
              <span class="downloadApp">居金所APP</span>
            </span>
          </div>
        </div>-->
    <!--    <div class="logo_wraper">
          <div class="proper_logo">
            <div class="logo_right">
              {{companyName}},{{userRealName}}
              <span class="quiteBtn" @click="quitLogin"></span>
            </div>
          </div>
        </div>-->
    <div class="nav_wraper">
      <div class="proper_nav">
        <div class="index_nav_container">
          <el-menu
            background-color="#ffffff"
            text-color="#000000"
            class="el-menu-demo"
            mode="horizontal"
            :router=true
            @open="handleOpen">
            <!--   <el-menu-item index="/BusinessHome"><span class="nav_returnIndex"></span>居金所首页</el-menu-item>-->
            <!--           <el-submenu :index="getFullPath('/HouseManager/myBuildingList')">
                         <template slot="title">房产管理</template>
                         <el-menu-item :index="getFullPath('/HouseManager/myBuildingList')" >我的楼盘</el-menu-item>
                       </el-submenu>
                       <el-submenu :index="getFullPath('/LandlordManager/addLandlord')">
                         <template slot="title">房东管理</template>
                         <el-menu-item :index="getFullPath('/LandlordManager/addLandlord')">新增房东</el-menu-item>
                         <el-menu-item :index="getFullPath('/LandlordManager/importLandlord')">导入房东</el-menu-item>
                         <el-menu-item :index="getFullPath('/LandlordManager/searchLandlord')">房东查询</el-menu-item>
                         &lt;!&ndash;            <el-menu-item :index="getFullPath('/LandlordManager/editLandlord')">房东变更</el-menu-item>&ndash;&gt;
                       </el-submenu>
                       <el-submenu :index="getFullPath('/RenterManager/addRenter')">
                         <template slot="title">租客管理</template>
                         <el-menu-item :index="getFullPath('/RenterManager/addRenter')">新增租客</el-menu-item>
                         <el-menu-item :index="getFullPath('/RenterManager/importRenter')">导入租客</el-menu-item>
                         <el-menu-item :index="getFullPath('/RenterManager/serachRenter')">租客查询</el-menu-item>
                         &lt;!&ndash;            <el-menu-item :index="getFullPath('/RenterManager/editRenter')">租客变更</el-menu-item>&ndash;&gt;
                       </el-submenu>-->
            <el-menu-item :index="getFullPath('/Passer')">通行客</el-menu-item>
            <el-submenu :index="getFullPath('/CustomerUserManager/searchCustomerUser')">
              <template slot="title">人员管理</template>
              <el-menu-item :index="getFullPath('/CustomerUserManager/searchCustomerUser')">人员查询</el-menu-item>
              <el-menu-item :index="getFullPath('/CustomerUserManager/customerUserInOutInfo')">出入记录查询</el-menu-item>
              <el-menu-item :index="getFullPath('/CustomerUserManager/currentPasserInfo')">实时通行信息</el-menu-item>
              <!--<el-menu-item :index="getFullPath('/CustomerUserManager/currentPasserInfoDetial')">实时通行详情</el-menu-item>-->
              <el-menu-item :index="getFullPath('/CustomerUserManager/currentBuildingCustomerUser')">实时大楼人员
              </el-menu-item>
            </el-submenu>
            <!-- <el-submenu :index="getFullPath('/CustomerEmployeeManager/customerEmployeeManager')">
               <template slot="title">员工管理</template>
               <el-menu-item :index="getFullPath('/CustomerEmployeeManager/customerEmployeeManager')">员工管理</el-menu-item>
             </el-submenu>
             <el-submenu :index="getFullPath('/CustomerDepartmentManager/customerDepartmentManager')">
               <template slot="title">部门管理</template>
               <el-menu-item :index="getFullPath('/CustomerDepartmentManager/customerDepartmentManager')">部门管理</el-menu-item>
             </el-submenu>-->
            <el-menu-item :index="getFullPath('/CompanyApprova/CompanyApprova')">入驻公司审批</el-menu-item>

            <!--<el-submenu :index="getFullPath('/CompanyApprova/CompanyApprova')">
              <template slot="title">入驻公司审批</template>
              <el-menu-item :index="getFullPath('/CompanyApprova/CompanyApprova')">入驻公司审批</el-menu-item>
            </el-submenu>-->
            <el-menu-item :index="getFullPath('/PasserConfig/PasserConfig')">通行客配置</el-menu-item>

            <!--<el-submenu :index="getFullPath('/PasserConfig/PasserConfig')">
              <template slot="title">通行客配置</template>
              <el-menu-item :index="getFullPath('/PasserConfig/PasserConfig')">通行客配置</el-menu-item>
            </el-submenu>-->

             <el-submenu :index="getFullPath('/PropertyEmployeeManagement/PropertyEmployeeManagement')" >
              <template slot="title">员工管理</template>
              <el-menu-item :index="getFullPath('/PropertyEmployeeManagement/PropertyEmployeeApply')" >员工申请</el-menu-item>
              <el-menu-item :index="getFullPath('/PropertyEmployeeManagement/PropertyEmployeeApplyRecord')" >员工申请记录</el-menu-item>
            </el-submenu>
            <!--            <el-submenu :index="getFullPath('/AccountInformation/accountsMaterial')">
                          <template slot="title">账户资料</template>
                          <el-menu-item :index="getFullPath('/AccountInformation/alterPassword')">修改密码</el-menu-item>
                          <el-menu-item :index="getFullPath('/AccountInformation/enterpriceInformation')">企业信息</el-menu-item>
                        </el-submenu>-->
            <el-menu-item :index="getFullPath('/IcCardManager')">IC卡管理</el-menu-item>
            <el-menu-item :index="getFullPath('/TempPasserCard')">发放临时通行证</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="clear10"></div>
    <div class="crumbsNav_wraper" v-if="isShow">
      <div class="crubsNav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(crumb,index) in crumbList " :key="index" :to="{ path: crumb.path }">
            {{crumb.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "PropertyHead",
    data() {
      return {
        //基本路由
        base: "/PropertyCompany/PropertyManageSystem/IntelligentProperty/Passer/Property",
        //默认活动路由
        activeIndex: '/PropertyCompany/PropertyManageSystem/IntelligentProperty/Passer/Property/Passer',
        //面包屑导航
        crumbList: [],
        //公司名称
        companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
        //用户真实姓名
        userRealName: this.$local.sefetch('info') ? this.$local.sefetch('info').userRealName : '',
        isShow: false
      };
    },
    computed: {
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
      '$route'(route) {
        this.getRoutePath()
        if (this.$router.history.current.meta.title !== '物业公司') {
          //this.isShow = true;
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      getRoutePath() {
        //var router = this.$store.state.currentRouter
        var router = this.$router.history.current;
        this.crumbList = [];
        for (let o in router.matched) {
          let temp = {};
          temp.path = router.matched[o].path;
          temp.name = router.matched[o].meta.title;
          this.crumbList.push(temp)
        }
      },
      getFullPath(currentPath) {
        return this.base + currentPath;
      },
      handleCircular() {
        let cache = [];
        let keyCache = []
        return function (key, value) {
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
      quitLogin() {
        this.$local.sesave("info", null)
        this.$local.sesave("pwdInit", null)
        this.$local.sesave("isID", null)
        this.$local.sesave("isBank", null)
        this.$local.sesave("identity", null)
        this.$router.push("/")
      },
      //返回首页
      returnToBusinessHome() {
        this.$router.push({path: '/BusinessHome'})
      }
    },
    mounted: function () {
      this.getRoutePath()
      if (this.$router.history.current.meta.title == '物业公司') {
        this.isShow = false;
      }
      this.activeIndex = this.$router.history.current.fullPath;
    }
  }
</script>

<style lang="less" scoped>
  .header {
    .quitLogin {
      cursor: pointer;
    }
    .returnIndex {
      display: block;
      height: 60px;
      position: absolute;
      width: 160px;
      cursor: pointer;
    }
    width: 100%;
    .top_wraper {
      width: 100%;
      background-color: #f9f9f9;
      box-shadow: 0 0 1px #777777;
      .proper_top {
        width: 1250px;
        height: 32px;
        margin-left: auto;
        margin-right: auto;
        line-height: 32px;
      }
      .top_left {
        text-indent: 20px;
        display: inline-block;
        float: left;
        color: #515e93;
      }
      .top_right {
        display: inline-block;
        float: right;
        color: #515e93;
        padding-right: 20px;
        span {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          margin-left: 20px;
        }
        .downloadApp {
          background-image: url("../../../../assets/img/IntelligentProperty/downAppLogo.png");
          background-repeat: no-repeat;
          background-position: 0px 8px;
          padding-left: 13px;
        }
      }
    }
    .logo_wraper {
      width: 100%;
      height: 84px;
      .proper_logo {
        /*        width:1200px;*/
        margin-top: 30px;
        height: 55px;
        margin-left: auto;
        margin-right: auto;
        background-image: url("../../../../assets/img/IntelligentProperty/propertyLogo.png");
        background-position: 20px 0px;
        background-repeat: no-repeat;
        .logo_left {
          margin-left: 200px;
          line-height: 55px;
          font-family: '宋体';
          font-size: 50px;
          color: #515e93;
          font-weight: bold;
          text-align: left;
          float: left;
        }
        .logo_right {
          height: 100%;
          line-height: 70px;
          font-size: 14px;
          color: #717aa4;
          text-align: left;
          padding-right: 20px;
          float: right;
          font-family: '黑体';
          .quiteBtn {
            background-image: url("../../../../assets/img/IntelligentProperty/quiteBtn.png");
            width: 30px;
            height: 40px;
            display: inline-block;
            background-position: 0px 26px;
            cursor: pointer;
            background-repeat: no-repeat;
          }
        }
      }
    }
    .nav_wraper {
      width: 100%;
      height: 35px !important;
      .proper_nav {
        .index_nav_container {
          /*  width:1200px;*/
          /*  float:right;*/
        }
        .nav_returnIndex {
          display: inline-block;
          height: 35px;
          line-height: 35px;
          width: 30px;
          float: left;
          cursor: pointer;
          background-image: url('../../../../assets/img/IntelligentProperty/returnIndex.png');
          background-repeat: no-repeat;
          background-position: 0px 21px;
        }
        /* width:1200px;*/
        margin-left: auto;
        margin-right: auto;
      }
    }
    .crumbsNav_wraper {
      width: 100%;
      .crubsNav {
        /* width:1200px;*/
        margin-left: auto;
        margin-right: auto;
        border-bottom: solid 1px grey;
        .el-breadcrumb {
          font-size: 12px;
          height: 32px;
          line-height: 32px;
          padding-left: 20px;
        }
      }
    }

  }
</style>
<style lang="less">
  .PasserPropertyHead {
    /*修改组件样式，所以放到全局中*/
    .proper_nav {
      ul[role='menubar'] {
        height: 36px;
        font-size:16px!important;
      }
      ul[role='menubar'] > li {
        height: 35px;
        line-height:35px;
      }
      ul[role='menubar']>li:hover {
        border-bottom: solid 2px #1168e1 !important;
        background-color: rgb(204, 204, 204)!important;
        /*        color:white!important;*/
      }
      ul[role='menubar'] > li.is-active {
        border-bottom: solid 2px #1168e1 !important;
      }
      ul[role='menubar'] > li.is-active>div {
        border:none!important;
      }
      ul[role='menubar'] > li > div {
        height: 35px !important;
        line-height: 35px !important;
        border:none!important;
      }
      ul[role="menu"]>li:hover{
        background-color: rgb(204, 204, 204)!important;
        color:white!important;
      }
    }
  }


</style>

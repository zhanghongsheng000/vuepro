<template>
  <div class="header">
    <!--<div class="logo_wraper">-->
      <!--&lt;!&ndash;<div class="proper_logo">&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;<a class="returnIndex" @click="returnToBusinessHome"></a>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;<div class="logo_right">&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;{{companyName}},{{userRealName}}&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<span class="quiteBtn" @click="quitLogin"></span>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <div class="nav_wraper">
      <div class="proper_nav" id="proper_nav">
        <div class="index_nav_container">
          <el-menu
            background-color="#fff"
            text-color="#666"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="hover"
            active-text-color="#1168e1"
            :router=true
            @open="handleOpen">
            <!--<el-menu-item index=""><span class="nav_returnIndex"></span>居金所首页</el-menu-item>-->
             <!--<el-submenu :index="getFullPath('IntelligentProperty/Passer/Renter')" >
             	<template slot="title"  >通行客</template>
              <el-menu-item :index="getFullPath('/Passer')">通行客</el-menu-item>
            </el-submenu>-->
            <el-menu-item :index="getFullPath('/Passer')">通行客</el-menu-item>
            <el-submenu :index="getFullPath('/RenterEmployeeManagement/RenterEmployeeManagement')" >
              <template slot="title">员工管理</template>
              <el-menu-item :index="getFullPath('/RenterEmployeeManagement/RenterEmployeeApply')" >员工申请</el-menu-item>
              <el-menu-item :index="getFullPath('/RenterEmployeeManagement/RenterEmployeeApplyRecord')" >员工申请记录</el-menu-item>
            </el-submenu>
            <el-submenu :index="getFullPath('/RenterCurrentManagement/RenterEmployeeInoutRecordSearch')">
              <template slot="title">通行管理</template>
              <el-menu-item :index="getFullPath('/RenterCurrentManagement/RenterEmployeeInoutRecordSearch')">员工出入记录查询</el-menu-item>
              <el-menu-item :index="getFullPath('/RenterCurrentManagement/RenterVisitorInoutRecordSearch')">来客通行记录查询</el-menu-item>
              <el-menu-item :index="getFullPath('/RenterCurrentManagement/RenterVisitorInoutPasscheckSearch')">来客通行证查询</el-menu-item>
            </el-submenu>
            <el-menu-item :index="getFullPath('/TempPasserCard')">发放临时通行证</el-menu-item>
            <!--<el-submenu :index="getFullPath()">-->
              <!--<template slot="title">企业中心</template>-->
              <!--<el-menu-item :index="getFullPath('')">企业中心</el-menu-item>-->
            <!--</el-submenu>-->
          </el-menu>
        </div>
      </div>
    </div>
    <div class="clear10"></div>
    <!--<div class="crumbsNav_wraper" v-if="isShow">-->
      <!--<div class="crubsNav">-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item v-for="(crumb,index) in crumbList " :key="index" :to="{ path: crumb.path }">{{crumb.name}}</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
  export default {
    name: "PropertyHead",
    data() {
      return {
        //基本路由
        base:"/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer/Renter",
        //默认活动路由
        activeIndex: '',
        //面包屑导航
        crumbList:[],
        //公司名称
        companyName:this.$local.sefetch('info')?this.$local.sefetch('info').companyName:'',
        //用户真实姓名
        userRealName:this.$local.sefetch('info')?this.$local.sefetch('info').userRealName:'',
        isShow:true
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
        if(this.$router.history.current.meta.title!=='租客公司'){
          this.isShow = true;
        }
      }
    },
    methods: {
      handleOpen(key, keyPath){
        console.log(key, keyPath);
      },
      getRoutePath() {
        var router = this.$store.state.currentRouter
        //var router = this.$router.history
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
      this.getRoutePath()
      if(this.$router.history.current.meta.title=='租客公司'){
        this.isShow = false;
      }
      this.activeIndex = this.$router.history.current.fullPath;
    }
  }
</script>

<style lang="less" scoped>
  .header{
    background: #fff;
    .quitLogin{
      cursor:pointer;
    }
    .el-menu-demo{
      background-color: #ffffff;
      background-size: 100% 60px;
    }
    .returnIndex{
      display:block;
      height:60px;
      position:absolute;
      width:160px;
      cursor:pointer;
    }
    width:100%;
    .top_wraper{
      width:100%;
      background-color:#ffffff;
      box-shadow: 0 0 1px #777777;
      .proper_top{
        width:1200px;
        height:32px;
        margin-left:auto;
        margin-right:auto;
        line-height:32px;
      }
      .top_left{
        text-indent:20px;
        display:inline-block;
        float:left;
        color:#515e93;
      }
      .top_right{
        display:inline-block;
        float:right;
        color:#515e93;
        padding-right:20px;
        span{
          display:inline-block;
          height:32px;
          line-height:32px;
          margin-left:20px;
        }
        .downloadApp{
          background-image:url("../../../../assets/img/IntelligentProperty/downAppLogo.png");
          background-repeat: no-repeat;
          background-position:0px 8px;
          padding-left:13px;
        }
      }
    }
    .nav_wraper{
      width:100%;
      height:35px;
      background-color: #ffffff;
      background-size: 100% 60px;
      .proper_nav{
        .index_nav_container{
          width:1040px;
          float:left;
        }
        .nav_returnIndex{
          display:inline-block;
          height:35px;
          line-height:35px;
          width:20px;
          float:left;
          cursor:pointer;
          background-image:url('../../../../assets/img/IntelligentProperty/returnIndex.png');
          background-repeat:no-repeat;
          background-position:0px 22px;
          padding-right: 12px;
        }
        /*width:1200px;*/
        margin-left:auto;
        margin-right:auto;
      }
    }
    .crumbsNav_wraper{
      width:100%;
      .crubsNav{
        /*width:1200px;*/
        margin-left:auto;
        margin-right:auto;
        border-bottom:solid 1px grey;
        .el-breadcrumb {
          font-size:12px;
          height: 32px;
          line-height: 32px;
          padding-left:20px;
        }
      }
    }
  }
</style>
<style lang="less">
  /*修改组件样式，所以放到全局中*/
    #proper_nav {
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
</style>

<template>
  <div>
    <div class="header">
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
              :default-active="activeIndex"
              :router=true>
              <el-submenu :index="getFullPath('/RenterEmployeeManagement/RenterEmployeeManagement')" >
                <template slot="title">考勤配置</template>
                <el-menu-item :index="getFullPath('/AttendanceConfig/AttendanceConfig')" >班制管理</el-menu-item>
                <el-menu-item :index="getFullPath('/AttendanceConfig/AttendanceGroup')" >考勤组管理</el-menu-item>
              </el-submenu>
              <el-submenu :index="getFullPath('/RenterCurrentManagement/RenterEmployeeInoutRecordSearch')">
                <template slot="title">考勤统计</template>
                <el-menu-item :index="getFullPath('/AttendanceStatistics/AttendanceByMonth')">月考勤</el-menu-item>
                <el-menu-item :index="getFullPath('/AttendanceStatistics/AttendanceByDay')">日考勤</el-menu-item>
                <el-menu-item :index="getFullPath('/AttendanceStatistics/AttendanceReset')">重新计算考勤</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </div>
      <div class="clear30"></div>
    </div>
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text">{{title}}</span>
    </div>
    <router-view></router-view>
  </div>


</template>

<script>
  export default {
    name: "PropertyHead",
    data() {
      return {
        title: '班制管理',
        //基本路由
        base:"/CommonCompany/CommonCompanyManager/AttendanceManager",
        //默认活动路由
        activeIndex: '/CommonCompany/CommonCompanyManager/AttendanceManager/AttendanceConfig/AttendanceConfig',
      }
    },
    watch: {
      '$route'(route) {
        this.title = this.$router.history.current.meta.title
      }
    },
    methods: {
      getFullPath(currentPath){
        return this.base + currentPath;
      }
    },
    mounted:function(){
      this.title = this.$router.history.current.meta.title
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
          width: 100%;
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

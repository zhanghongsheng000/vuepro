<template>
  <div class="wraper welFareCon">
    <div class="header Welfare">
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
              <el-menu-item :index="getFullPath('/PayRule' +
               '/payRuleConfig')">消费规则配置</el-menu-item>
              <el-menu-item :index="getFullPath('/Recharge/rechargeAndRecord')">充值对账</el-menu-item>
              <el-submenu :index="getFullPath('/CustomerUserManager/searchCustomerUser')">
                <template slot="title">发票管理</template>
                <el-menu-item :index="getFullPath('/InvoiceManager/makeInvoice')">开发票</el-menu-item>
                <el-menu-item :index="getFullPath('/InvoiceManager/invoiceRecord')">发票记录</el-menu-item>
                <el-menu-item :index="getFullPath('/InvoiceManager/invoiceRiseManager')">发票抬头管理</el-menu-item>
                <el-menu-item :index="getFullPath('/InvoiceManager/receivingAddressManager')">收货信息管理
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="getFullPath('/welfareReport')">消费报告</el-menu-item>
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
    <div class="content welFareIndex">
      <router-view></router-view>
    </div>
  </div>


</template>

<script>
  export default {
    name: "PropertyHead",
    data() {
      return {
        //基本路由
        base: "/CommonCompany/CommonCompanyProduct/Welfare",
        //默认活动路由
        activeIndex: '/CommonCompany/CommonCompanyProduct/Welfare/Recharge/rechargeAndRecord',
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
  .wraper {
    width: 100%;
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
            background-image: url("../../../assets/img/IntelligentProperty/downAppLogo.png");
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
          background-image: url("../../../assets/img/IntelligentProperty/propertyLogo.png");
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
              background-image: url("../../../assets/img/IntelligentProperty/quiteBtn.png");
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
            background-image: url('../../../assets/img/IntelligentProperty/returnIndex.png');
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
    .content {
      /* width: 1200px;*/
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      font-size: 16px;
      .currentName {
        line-height: 80px;
      }
    }
  }

</style>
<style lang="less">
  .welFareCon {
    height:100%;
    .notShow {
      display: none;
    }
    .content{
      min-height:420px;
    }
    .welFareIndex {
      .el-form-item {
        margin-bottom: 22px;
      }
      .el-dialog {
        border-radius: 10px;
      }
      .el-table::before {
        background-color: white;
      }
      .el-upload__tip {
        float: right;
        color: #0a36e8;
      }
      .el-table th {
        text-align: center;
      }
      .cell {
        text-align: center;
      }
    }
  }
  .Welfare {
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

npm<script src="../../router/index.js"></script>
<template>
  <div class="leftNav" id="leftNavProperty">
    <el-menu
      background-color="#3487fa"
      text-color="#ffffff"
      class="el-menu-demo"
      mode="vertical"
      menu-trigger="click"
      :unique-opened=true
      :router=true
      @open="handleOpen">
      <el-menu-item index="/PropertyCompany" id="index"><span class="nav_returnIndex"></span>首页</el-menu-item>
      <el-submenu :index="getFullPath('/HouseManager')">
        <template slot="title">楼盘管理</template>
        <!--<el-menu-item :index="getFullPath('/HouseManager')">我的楼盘</el-menu-item>-->
        <ul>
          <li
            class="buildingList"
            v-for="building,index in buildingList"
            :key="building.buildingId"
            :title="building.buildingName"
            @click="goToBuildingPage(building)">
            {{building.buildingName}}
          </li>
        </ul>
        <el-menu-item :index="getFullPath('/HouseManager/buildingGroupManager')">楼盘管理</el-menu-item>
         <el-menu-item :index="getFullPath('/HouseManager/importBuildingGroup')">楼盘导入</el-menu-item>
      </el-submenu>
      <el-submenu :index="getFullPath('/CustomerManager')">
        <template slot="title">客户管理</template>
        <el-menu-item :index="getFullPath('/CustomerManager/RenterManager')">租客管理</el-menu-item>
        <el-menu-item :index="getFullPath('/CustomerManager/LandlordManager')">房东管理</el-menu-item>
        <el-menu-item :index="getFullPath('/CustomerManager/importRenterAndBuildingGroup')">租客导入(含写字楼)</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/CustomerManager/LandlordManager/searchLandlord')">人员管理</el-menu-item>-->
      </el-submenu>
      <el-submenu :index="getFullPath('/PropertyManageSystem')">
        <template slot="title">物业系统管理</template>
        <el-menu-item :index="getFullPath('/PropertyManageSystem/IntelligentProperty/Passer')">通行客</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyManageSystem/IntelligentProperty/RepairManager')">报修管理</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyManageSystem/IntelligentProperty/PaymentProperty')">智能缴费
        </el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyManageSystem/Breakfast')">早餐颂
        </el-menu-item>
        <!--<el-submenu :index="getFullPath('/PropertyManageSystem/IntelligentProperty')">
          <template slot="title">智慧物业</template>

        </el-submenu>-->
        <!-- <el-menu-item :index="getFullPath('/PropertyManageSystem/searchLandlord')">无感通行</el-menu-item>-->
      </el-submenu>
      <el-menu-item :index="getFullPath('/accountsManage')">财务管理</el-menu-item>
      <el-submenu :index="getFullPath('/PropertyCompanyManager')">
        <template slot="title">物业公司管理</template>
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/companyInfo')">企业信息</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/companyMessage')">消息管理</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/departmentManager')">部门管理</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/positionManager')">职位管理</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/PropertyCompanyManager/powerManager')">权限管理</el-menu-item>-->
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/PropertyCompanyEmployeeManager')">员工管理</el-menu-item>
        <!--<el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyEmployeeManager')">员工管理</el-menu-item>-->

       <!-- <el-menu-item :index="getFullPath('/PropertyCompanyManager/permissionsManager')">权限管理</el-menu-item>-->
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/accountSett')">账户设置</el-menu-item>
        <el-menu-item :index="getFullPath('/PropertyCompanyManager/modifyPassword')">修改密码</el-menu-item>
      </el-submenu>
      <el-menu-item :index="getFullPath('/Mnangement')">招商管理</el-menu-item>
      <el-menu-item :index="getFullPath('/ThirdPartyBusiness')">第三方业务管理</el-menu-item>
      <el-menu-item :index="getFullPath('/ShareProfit')">分润管理</el-menu-item>
      <el-menu-item :index="getFullPath('/StatisticalAnalysis')">统计分析</el-menu-item>
      <!--<el-submenu :index="getFullPath('/RepairManager')">
        <template slot="title">报修管理</template>
        <el-menu-item :index="getFullPath('/RepairManager/TollConfigure')">收费项配置</el-menu-item>
        <el-menu-item :index="getFullPath('/RepairManager/repairList')" >报修列表</el-menu-item>
        &lt;!&ndash;<el-menu-item :index="getFullPath('/RepairManager/noReceiveRepairList')" >未接单报修列表</el-menu-item>&ndash;&gt;
        <el-menu-item :index="getFullPath('/RepairManager/repairOrderStatis')">报修订单统计</el-menu-item>
        <el-menu-item :index="getFullPath('/RepairManager/declarRegistration')">报单登记</el-menu-item>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "property-head-vertical",
    data() {
      return {
        //基本路由
        base: "/PropertyCompany",
        //默认活动路由
        activeIndex: '/PropertyCompany',
        //面包屑导航
        crumbList: [],
        //公司名称
        companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
        //写字楼列表
        buildingList: [],
        meauList: [
          {
            name: '居金所首页',
            elementText: '',
            path: '/BusinessHome',
            children: []
          },
          {
            name: '公司管理',
            elementText: '',
            path: '/HouseManager/myBuildingList',
            children: [
              {
                name: '部门管理',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '员工管理',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              }
            ]
          },
          {
            name: '业务管理',
            elementText: '',
            path: '/LandlordManager/addLandlord',
            children: [
              {
                name: '租金月付',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '贷发工资',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '智慧物业',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: [
                  {
                    name: '智能缴费',
                    elementText: '',
                    path: '/HouseManager/myBuildingList',
                    children: []
                  },
                  {
                    name: '通行客',
                    elementText: '',
                    path: '/HouseManager/myBuildingList',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            name: '财务管理',
            elementText: '',
            path: '/PaymentManager/configPayment',
            children: []
          },
          {
            name: '通知公告',
            elementText: '',
            path: '/PaymentManager/configPayment',
            children: []
          },
          {
            name: '企业中心',
            elementText: '',
            path: '/PaymentManager/configPayment',
            children: [
              {
                name: '企业信息',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '消息管理',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '权限管理',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              },
              {
                name: '账户设置',
                elementText: '',
                path: '/HouseManager/myBuildingList',
                children: []
              }
            ]
          },
          {
            name: '物业公司信息',
            elementText: '',
            path: '/AccountsManager/accountsManage',
            children: []
          }
        ],
        //用户真实姓名
        userRealName: this.$local.sefetch('info') ? this.$local.sefetch('info').userRealName : '',
        isShow: true
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
          this.isShow = true;
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      getRoutePath() {
        //var router = this.$store.state.currentRouter
        var router = this.$router.history.current
        this.crumbList = [];
        for (let o in router.matched) {
          let temp = {};
          temp.path = router.matched[o].path;
          temp.name = router.matched[o].meta.title;
          this.crumbList.push(temp)
        }

      },
      //根据公司ID获取写字楼
      getBuildingListByCompanyId() {
        this._http(
          '/building/getBuildingListByCompanyId',
          'get',
          {companyId: this.$local.sefetch('info').companyId},
          data => {
            //提供数据，并且写入返回对象
            this.buildingList = data.result
          },
          false
        )
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
      //跳转到写字楼鞋面
      goToBuildingPage(building) {
        this.$router.push({
          path: '/PropertyCompany/HouseManager/myBuildingDetail/myBuildingDetail/' + building.buildingId,
          query: building
        })
      },
      /*工具方法*/
      _http(url, type, params, callback200) {
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else {
                /*this.$message({
                  showClose: true,
                  message: data.result ? data.result : data.resultCodeDesc,
                  type: 'error'
                });*/
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }
        else if (type == "post") {

        }

      },
      //返回首页
      returnToBusinessHome() {
        this.$router.push({path: '/PropertyCompany'})
      }
    },
    mounted: function () {
      this.getRoutePath()
      if (this.$router.history.current.meta.title == '物业公司') {
        this.isShow = false;
      }
      this.getBuildingListByCompanyId();
    }
  }
</script>

<style scoped lang="less">
  .leftNav {
    width: 151px;
    float: left;
    li.buildingList {
      height: 35px;
      line-height: 35px;
      text-indent: 40px;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li.buildingList:hover {
      background-color: #e8eaff;
      color: #3487fa;
    }
  }
</style>
<style lang="less">
  /*修改组件样式，所以放到全局中*/
  #leftNavProperty {
    width: 220px;
    .el-submenu .el-menu-item {
      min-width: 100px;
    }
    .el-menu--horizontal {
      /*background-color: #515e93;*/
    }
    .el-menu-item, .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
    .el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      background-color: #3487fa;
    }
    a:visited {
      color: white;
    }
    .el-menu-item {
      padding: 0px 5px;
    }
    /*风格颜色部分*/
    /*被选中菜单的颜色*/
    .el-menu-item .is-active {
      background-color: #ffffff !important;
      color: #1168e1 !important;
    }
    .el-submenu__title i {
      color: #fff;
    }
    ul[role='menubar'] > li {
      font-size: 16px;
      background-color: #1168e1 !important;
      border-bottom: solid #ffffff 1px;
    }
    ul[role='menubar'] > li > div, ul[role='menu'] > li > div {
      font-size: 16px;
      background-color: #1168e1 !important;
    }
    ul[role='menu'] > li > div {
      font-size: 14px;
      background-color: #1168e1 !important;
      border-bottom: solid #3487fa 1px;
    }
    ul[role='menu'] > li {
      font-size: 14px;
      color: #ffffff !important;
      background-color: #3b7df1 !important;
      border-bottom: solid 1px #fff;
    }
    ul[role='menu'] > li:last-child {
      border-bottom: none;
    }
    ul[role='menu'] > li > ul[role='menu'] > li {
      font-size: 14px;
      color: #bfd4fd !important;
      background-color: #3487fa !important;
    }
    ul[role='menu'] > li:hover {
      background-color: #e8eaff !important;
      color: #1168e1 !important;
      box-shadow: 0px 0px 13px 2px #888888;
      border-left: 1px solid #888888;
    }
    ul[role='menu'] > li > ul[role='menu'] > li:hover {
      background-color: #e8eaff !important;
      color: #1168e1 !important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*一级菜单选中效果*/
    ul[role='menubar'] > li.is-active {
      background-color: #fff !important;
      color: #1168e1 !important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*二级菜单选中效果*/
    ul[role='menu'] > li.is-active {
      background-color: #fff !important;
      color: #1168e1 !important;
    }
    /*三级菜单选中效果*/
    ul[role='menu'] > li > ul[role='menu'] > li.is-active {
      background-color: #fff !important;
      color: #1168e1 !important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
  }

</style>

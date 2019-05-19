<template>
  <div id="accountSett">
    <div class="headNav">
      <ul>
        <router-link tag="li" :to="{path:'/PropertyCompany/PropertyCompanyManager/accountSett/PropertyCompanyChangeMobile'}">更换手机号</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/PropertyCompanyManager/accountSett/PropertyCompanyChangeManager'}">更换管理员</router-link>

      </ul>
    </div>
    <div class="router">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: "index",
    data() {
      return {
        flag: 1,
        pathArray: {
          1: 'PropertyCompanyChangeMobile',
          2: 'PropertyCompanyChangeManager',
        }
      }
    },
    methods: {
      tab(index) {
        this.flag = index;
        this.$router.push({
          path: this.pathArray[this.flag]
        });
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  #accountSett {
    .headNav {
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-bottom: solid #e5e5e5 1px;
      ul {
        li {
          float: left;
          width: 120px;
          text-align: center;
          font-size: 15px;
          cursor: pointer;
        }
        li.active {
          border-bottom: solid #3387f9 2px;
        }
      }
    }
    .router{
      margin-top: -1px;
    }
    .el-table .cell {
      text-align: center;
    }
    .el-table th {
      white-space: nowrap;
      overflow: hidden;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-align: left;
    }
  }
</style>
<style lang="less">
  #accountSett {
    .el-table .cell {
      text-align: center!important;
    }
    .el-table th {
      text-align: center!important;
    }
  }
</style>

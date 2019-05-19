<template>
  <div id="repairManager">
    <div class="headNav">
      <ul>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/IntelligentProperty/RepairManager/PropertyRepair/repairList">报修列表</router-link>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/IntelligentProperty/RepairManager/PropertyRepair/servicesConfigure">服务项配置</router-link>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/IntelligentProperty/RepairManager/PropertyRepair/materialsConfigure">物料管理配置</router-link>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/IntelligentProperty/RepairManager/PropertyRepair/repairOrderStatis">报修订单统计</router-link>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/IntelligentProperty/RepairManager/PropertyRepair/declarRegistration">报单登记</router-link>

      </ul>
    </div>
    <div class="clear10"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        flag:1,
        pathArray:{
          1:'repairListDetails',
          2:'servicesConfigure',
          3:'materialsConfigure',
          4:'repairOrderStatis',
          5:'declarRegistration',
        }
      }
    },
    methods:{
      tab(index){
        this.flag = index;
        this.$router.push({path:this.pathArray[this.flag]});
      }
    }
  }

</script>

<style scoped lang="less">
  #repairManager {
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
  }
</style>


<template>
  <div id="BreakfastHead">
    <div class="headNav">
      <ul>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/Breakfast/Property/SetMealStatistics">套餐销售统计</router-link>
        <router-link tag="li" to="/PropertyCompany/PropertyManageSystem/Breakfast/Property/ShareProfitByMonth">分润查询</router-link>
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
          1:'SetMealStatistics',
          2:'ShareProfitByMonth'
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
  #BreakfastHead {
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

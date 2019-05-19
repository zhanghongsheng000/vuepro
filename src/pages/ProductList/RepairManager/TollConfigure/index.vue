<template>
  <div id="RenterManager">
    <div class="headNav">
      <ul>
        报修首页
        <!--<li :class="{active:flag==1}" @click="tab(1)">添加租客</li>
        <li :class="{active:flag==2}" @click="tab(2)">导入租客</li>
        <li :class="{active:flag==3}" @click="tab(3)">查询租客</li>-->
        <!--<router-link tag="li" >添加租客</router-link>to="/PropertyCompany/CustomerManager/RenterManager/addRenter"-->
        <!--<router-link tag="li" to="/PropertyCompany/RepairManager/TollConfigure/servicesConfigure">服务项配置</router-link>-->
        <!--<router-link tag="li" to="/PropertyCompany/RepairManager/TollConfigure/materialsManagerConfigure">物料管理配置</router-link>-->
      </ul>
    </div>
    <div class="clear10"></div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        flag:1,
        pathArray:{
          1:'servicesCongigure',
          2:'materialsManagerConfigure',
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
  #RenterManager {
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

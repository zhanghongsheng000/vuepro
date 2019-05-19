<template>
  <div id="RenterManager">
    <div class="headNav">
      <ul>
        <!--<li :class="{active:flag==1}" @click="tab(1)">添加租客</li>
        <li :class="{active:flag==2}" @click="tab(2)">导入租客</li>
        <li :class="{active:flag==3}" @click="tab(3)">查询租客</li>-->
        <router-link tag="li" to="/PropertyCompany/CustomerManager/RenterManager/addRenter">添加租客</router-link>
        <router-link tag="li" to="/PropertyCompany/CustomerManager/RenterManager/importRenter">导入租客</router-link>
        <router-link tag="li" to="/PropertyCompany/CustomerManager/RenterManager/serachRenter">查询租客</router-link>
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
          1:'addRenter',
          2:'importRenter',
          3:'serachRenter'
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

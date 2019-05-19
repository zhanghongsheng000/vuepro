<template>
  <div id="remindDateConfig">
    <div class="headNav">
      <ul>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/onePointBusiness'}" disabled>一键招商</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/rentDateRemind'}" disabled>租期提醒</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/remindDateConfig'}" disabled>提醒日期配置</router-link>
      </ul>
    </div>
    <div class="top-cont clearfix">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">提醒日期配置</span>
      </div>
    </div>
    <el-form :inline="true" :model="remindDate" class="demo-form-inline">
      <el-form-item label="提醒日期">
        <el-input v-model="remindDate.configValue"  clearable  @clear="clearData" placeholder="请填写提醒日期"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchRenter">保存</el-button>
      </el-form-item>
    </el-form>
    <div class="clear20"></div>
  </div>

</template>
<script>
  export default {
    name: "index",
    data() {
      return {
        shopId:this.$local.sefetch('info').companyId,
        remindDate:{
          configValue:''
        },
      }
    },
    created(){
      this.getPropertyConfigByShopId()
    },
    methods: {
      clearData(){
        this.remindDate.configValue = '';
      },
      //提交查询
      handleSearchRenter(){
        this.propertyConfig()
      },
      //获取配置信息
      getPropertyConfigByShopId(){
        this.remindDate.shopId = this.shopId;
        this.$httpPasser.get(
          'attractInvestment/getPropertyConfigByShopId',
          {params:{
            shopId:this.shopId
            }}
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.remindDate.configValue = res.data.result.value;
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
            this.remindDate.configValue = '';
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      },
      //提交配置信息
      propertyConfig(){
        this.remindDate.shopId = this.shopId;
        this.$httpPasser.post(
          'attractInvestment/propertyConfig',
          this.remindDate
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.$message.success(res.data.resultCodeDesc)
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
            this.remindData.configValue = '';
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      },
    }
  }
</script>

<style lang="less" scoped="scoped">
  #remindDateConfig{
    .headNav {
      width: 100%;
      height: 37px;
      line-height: 35px;
      border-bottom: solid #e5e5e5 1px;
      margin-bottom: 30px;
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
      /*padding: 30px;*/
    }
  }
</style>
<style lang="less">
</style>

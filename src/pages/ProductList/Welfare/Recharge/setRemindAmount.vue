<template>
  <div id="setRemindAmount">
    <div style="padding-top: 10px;">
      <div class="top-title">
        <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
        <span class="top-text">金额不足提醒设置</span>
      </div>
      <div class="setRemindContent common">
        <div class="stepContent">
          <div class="contentLeft">
            <div class="stepNum">1</div>
          </div>
          <div class="contentRight">
            <div class="contentRightTitle">设置金额</div>
            <div class="contentRightContent">低于
              <el-input v-model="minMoneyNum" placeholder="" clearable maxlength="50"></el-input>
              元时短信提醒
            </div>
          </div>
          <div class="clear20"></div>
        </div>
        <div class="stepContent">
          <div class="contentLeft">
            <div class="stepNum">2</div>
          </div>
          <div class="contentRight">
            <div class="contentRightTitle">设置接收提醒的人员</div>
            <div class="contentRightContent">
              <el-select v-model="employeeId" placeholder="请选择">
                <el-option
                  v-for="item in employeeList"
                  :key="item.employeeId"
                  :label="item.name"
                  :value="item.employeeId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="clear20"></div>
        </div>
        <div class="stepContent">
          <div class="contentLeft">
          </div>
          <div class="contentRight">
            <!--<el-button @click="clearData">取消</el-button>-->
            <el-button type="primary" @click="setAccountRemind">保存</el-button>
          </div>
          <div class="clear20"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "set-remind-amount",
    data() {
      return {
        shopId:this.$local.sefetch('info').companyId,
        minMoneyNum: '',
        employeeId:'',
        employeeList:[]
      }
    },
    created(){
      this.getEmployeeByShopIdNoPage();
      this.getAccountRemind();
    },
    methods: {
      backHandle() {
//        this.$router.back()
        this.$router.push({
        	path:'./rechargeAndRecord'
        });
      },
      //设置提醒金额
      setAccountRemind(){
        this.$httpPasser.post(
          'welfareWeb/setAccountRemind',
          {
            shopId:this.shopId,
            amount:this.minMoneyNum,
            employeeId:this.employeeId,
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.$message.success(res.data.resultCodeDesc);
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      },
      //获取员工列表
      getEmployeeByShopIdNoPage(){
        this.$httpPasser.post(
          'welfareWeb/getEmployeeByShopIdNoPage',
          {
            shopId:this.shopId
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.employeeList = res.data.result;
          }
          else if(res.data.resultCode == "204"){
            this.employeeList = [];
            this.$message.success(res.data.resultCodeDesc)
          }else{
            this.$message.success(res.data.resultCodeDesc)
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      },
      //取消
      clearData(){
        this.minMoneyNum = '';
        this.emplayeeId = '';
      },
      //获取预警金额
      getAccountRemind(){
        this.$httpPasser.post(
          'welfareWeb/getAccountRemind',
          {
            shopId:this.shopId
          }
        ).then(res=>{
          if(res.data.resultCode==200){
            this.minMoneyNum = res.data.result.warningAmount
            this.employeeId = res.data.result.employeeId
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #setRemindAmount {
    .top-title .top-text {
      margin-left: 15px;
    }
    .common {
      margin-left: 25px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
    .setRemindContent {
      .stepContent {
        margin-left: 5px;
        .contentLeft {
          width: 25px;
          height: 25px;
          float: left;
          .stepNum {
            height: 25px;
            width: 25px;
            line-height: 25px;
            border-radius: 50%;
            background-color: #43a0ff;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
          }
        }
        .contentRight {
          float: left;
          margin-left: 13px;
          font-size: 14px;
          text-align: left;
          .contentRightTitle {
            line-height: 25px;
          }
          .contentRightContent {
            line-height: 80px;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  #setRemindAmount {
    .setRemindContent {
      .stepContent {
        .contentRight {
          .contentRightContent {
            .el-input {
              display: inline-block;
              width: 80px;
              margin-left: 5px;
              margin-right: 5px;
            }
            .el-select{
              .el-input {
                width: 100%;
                margin-left: 0px;
                margin-right: 0px;
              }
            }
          }
        }
      }
    }
  }
</style>

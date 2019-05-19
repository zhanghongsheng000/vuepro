<template>
  <div class="mainPart myAccounts">
    <div class="header"></div>
    <div class="clear30"></div>
    <div class="middle">
      <div class="left-cont fl">
        <div class="companyName">物业公司：石家庄昌盛物业有限公司</div>
        <div class="remainder">余额：<i>10000000000</i>元</div>
      </div>
      <div class="right-cont fr">
        <a href="javascript:;" class="link-item item-icon1" @click="toBindCardOne"></a>
        <a href="javascript:;" class="link-item item-icon2"></a>
        <a href="javascript:;" class="link-item item-icon3"></a>
        <a href="javascript:;" class="link-item item-icon4"></a>
      </div>
    </div>
    <div class="tables">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
  export default {
    name: "my-accounts",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
      toBindCardOne(){
        this.$router.push({name:'bindCardOne'})
      }
    }
  }
</script>

<style scoped lang="less">
  .myAccounts{
    .header{
      height:352px;
      background:url("../../../../../assets/img/IntelligentProperty/myAccounts.png");
    }
    .middle{
      .left-cont{
        float:left;
        width:40%;
        height:130px;
        line-height:65px;
        .companyName{
          font-size:14px;
          color:black;
        }
        .remainder{
          font-size:13px;
          i{
            font-size:40px;
            color:#ec6632;
          }
        }
      }
      .right-cont{
        .link-item{
          display:inline-block;
          width: 120px;
          height: 120px;
          margin-left:30px;
        }
        .item-icon1{background:url("../../../../../assets/img/SalaryManager/item-icon1.png");}
        .item-icon2{background:url("../../../../../assets/img/SalaryManager/item-icon2.png");}
        .item-icon3{background:url("../../../../../assets/img/SalaryManager/item-icon3.png");}
        .item-icon4{background:url("../../../../../assets/img/SalaryManager/item-icon4.png");}
      }
    }
    .tables{
      line-height:35px;
      text-align:center;
    }
  }
  .content{
    .currentName{
      display:none;
    }
  }

</style>
<style lang="less">

</style>

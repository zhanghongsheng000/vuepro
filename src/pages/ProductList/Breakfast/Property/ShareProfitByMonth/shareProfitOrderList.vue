<template>
  <div class="rscont shareProfitOrderList" id="tablestyle">
    <div class="main-cont">
      <div class="common pt50">
        <div class="back">
          <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
          <span style="margin-left:20px;font-size:15px;">{{monthDate}}{{setmealName}}订单列表</span>
        </div>
        <div class="main-box">
          <div class="tables">
            <el-table :data="profistList" style="width: 100%" :empty-text=text>
              <el-table-column type="index"  label="编号" :index="indexMethod" width="50"></el-table-column>
              <el-table-column prop="orderNum" label="订单号" ></el-table-column>
              <el-table-column prop="orderDate" label="下单时间"  width="160"></el-table-column>
              <el-table-column prop="setmealNum"  label="订单内套餐总数量（份)" width="170"></el-table-column>
              <el-table-column prop="thisSetmealNum"  :label="labelNum"   width="170"></el-table-column>
              <el-table-column prop="setmealAmount"  label="订单内套餐总金额（元）"  width="180"></el-table-column>
              <el-table-column prop="thisSetmealAmount"  :label="labelTotalprice"  width="170"></el-table-column>
            </el-table>
          </div>
          <div class="clearfix">
            <div class="fl" style="padding-top:25px;">
              <div class="clearfix" >
                <div class="pages fl" >
                  <el-pagination
                    @current-change=" handleCurrentChange"
                    background
                    :current-page.sync="pageParams.pageIndex"
                    layout="prev, pager, next"
                    :page-count="pageParams.pageTotal">
                  </el-pagination>
                </div>
                <div class="fl pagestyle">
                  <span>共{{this.pageParams.pageTotal}}页，当前第{{this.pageParams.pageIndex}}页,每页{{this.pageParams.pageSize}}条，共{{this.pageParams.totalRecord}}条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order-list",
    data(){
      return{
      	text:'正在加载，请稍候',
        getParams: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        },
        monthDate:'',//处理后的月份
        monthes:this.$route.query.monthDate,//获取到的月份
        setmealName:this.$route.query.setmealName,//套餐名称
        labelNum:'其中'+ this.$route.query.setmealName +'数量',
        labelTotalprice:'其中'+ this.$route.query.setmealName +'金额（元）',
        pageParams: {
          pageIndex:1,//当前第几页
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          pageSize:30,
        },
        profistList:[]
      }
    },
    methods:{
      getShareProfitOrederList(){
        this.$httpPasser.post("settlement/getOrderSetmealDetailByMonth",{
          shopId:this.getParams.shopId,
          setmealId:this.$route.query.setmealId,
          date:this.$route.query.monthDate,
          pageIndex:this.pageParams.pageIndex,
          pageSize:this.pageParams.pageSize
        }).then((res)=>{
          if(res.data.resultCode == "200"){
            this.$message.success("查询成功");
            this.profistList = res.data.result
            this.pageParams.pageTotal = res.data.pageTotal;
            this.pageParams.totalRecord = res.data.totalRecord;
          }else if(res.data.resultCode == "204"){
            this.$message.success(res.data.resultCodeDesc);
            this.pageParams.pageTotal = res.data.pageTotal;
            this.pageParams.totalRecord = res.data.totalRecord;
            this.profistList = []
            this.text = '暂无数据'
          }else{
          	 this.text = '暂无数据'
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      indexMethod(index) {
        return (this.pageParams.pageIndex - 1)*parseInt(this.pageParams.pageSize) + 1 + index;
      },
      dealMonthes(){
        let tempMonth = [];
        tempMonth = this.monthes.split('至');
        this.monthDate = tempMonth[0].split('-')[0] + "年" + tempMonth[0].split('-')[1] + "月" + tempMonth[0].split('-')[2] + '日' +'至'+ tempMonth[1].split('-')[0] + '年' + tempMonth[1].split('-')[1] + '月' + tempMonth[1].split('-')[2] + '日';
      },
      handleCurrentChange(){
        this.pageParams.pageIndex = index;
        this.getShareProfitOrederList();
      },
      backHandle(){//返回上一页
        this.$router.back()
      },

    },
    computed: {
      num() {
        return parseInt(this.pages.totalRecord)
      }
    },
    created(){
      this.getShareProfitOrederList()
      this.dealMonthes()
    }
  }
</script>

<style lang="less" scoped>
  .shareProfitOrderList{
    .common{
      width:100%!important;
    }
    .form-item:nth-child(2){
      margin-left: 20px;
    }
    .pagestyle{
      line-height:30px;
    }
    .improveButton{
      color:#e44f4f;
    }
    .line-height-40{
      line-height: 40px;
    }
    .back{
      padding-bottom: 10px;
    }
  }
  .shareProfitOrderList {
    .pt50 {
      padding-top: 10px;
    }
    .top-title {
      margin-bottom: 20px;
      .line {
        height: 1px;
        background-color: #ccc;
        margin-bottom: -17px;
      }
      .top-text {
        margin-left: 25px;
        font-size: 15px;
        background-color: #fff;
        padding: 0 4px;
        line-height: 30px;
      }
    }
    .main-box {
      .forms-cont {
        padding-bottom: 30px;
        padding-left: 30px;
      }
      .btns {
        padding: 20px 20px 20px;
      }
    }
    .entry-cocnt {
      .siteml {
        width: 140px;
        text-align: right;
        margin-right: 10px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .sitemr {
        width: 217px;
      }
    }
  }
</style>
<style lang="less">
  .rsysmancontainer {
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .is-left {
      text-align: left !important;
    }
    .el-table th > .cell {
      text-align: left !important;
    }
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
      text-align:center;
    }
    .el-table th, .el-table tr{
      text-align:center;
    }
  }
  #tablestyle{
    .el-table .cell{
      text-align: center;
    }
  }
</style>




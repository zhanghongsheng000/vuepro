<template>
  <div class="rscont shareProfitMonthDetails" id="tablestyle">
    <div class="main-cont">
      <div class="common pt50">
        <div class="back">
          <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
          <span style="margin-left:20px;font-size:15px;">{{monthDate}}套餐销售统计表</span>
        </div>
        <div class="main-box">
          <div class="tables">
            <el-table :data="profistList.setmealList" style="width: 100%" border show-summary :summary-method="getSummaries" :empty-text=text>
              <el-table-column type="index" label="编号" :index="indexMethod" width="50"></el-table-column>
              <el-table-column prop="setmealName" label="套餐名称" width="80"></el-table-column>
              <el-table-column prop="setmealNumber" label="套餐数量（份）" width="120"></el-table-column>
              <el-table-column prop="dealPrice" label="单价（元）" width="92"></el-table-column>
              <el-table-column prop="saleAmount" label="合计金额（元）" width="120"></el-table-column>
              <el-table-column prop="propertyProportions" label="物业分成比例" width="134"></el-table-column>
              <el-table-column prop="propertyAmount" label="物业分润应收（元）" width="120"></el-table-column>
              <el-table-column prop="propertyWechatFee" label="微信手续费（元）" width="120"></el-table-column>
              <el-table-column prop="propertyRealPay" label="物业分润实收（元）" width="120"></el-table-column>
              <el-table-column fixed="right" label="详情" width="80">
                <template slot-scope="scope">
                  <el-button size="small" @click="toshareProfitOrderList(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clearfix">
            <div class="fl" style="padding-top:25px;">
              <div class="clearfix">
                <div class="pages fl">
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
    name: "share-profig-datails",
    data() {
      return {
        // monthDate:this.$router.query.monthDate,
        text:'正在加载，请稍候',
        getParams: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate,
          status: this.$route.query.status ? this.$route.query.status : false,
          settlementId: this.$route.query.settlementId ? this.$route.query.settlementId : false,
        },
        monthDate: '',//处理后的月份
        monthes: this.$route.query.settlementMonthDesc,//获取到的月份
        pageParams: {
          pageIndex: 1,//当前第几页
          pageTotal: 0,//总页数
          totalRecord: 0,//总条数
          pageSize: 30,
        },
        proportions: '',//分润比例
        profistList: []
      }
    },
    methods: {
      getProfitMonthDatails() {//查询月份
        let param = {}
        if(this.getParams.settlementId){
          param = {
            settlementId: this.getParams.settlementId,
            pageIndex: this.pageParams.pageIndex,
            pageSize: this.pageParams.pageSize
          }
        }
        else{
          param = {
            shopId: this.getParams.shopId,
            startTime:this.getParams.startDate,
            endTime:this.getParams.endDate,
            status: this.getParams.status,
            pageIndex: this.pageParams.pageIndex,
            pageSize: this.pageParams.pageSize
          }
        }
        this.$httpPasser.post("orderStatisticsController/getStatisticsByMonth", param).then((res) => {
          if (res.data.resultCode == "200") {
            this.profistList = res.data.result;
            this.$message.success("查询成功")
            this.pageParams.pageTotal = res.data.pageTotal;
            this.pageParams.totalRecord = res.data.totalRecord;
          } else if (res.data.resultCode == "204") {
            this.$message.success(res.data.resultCodeDesc)
            this.profistList = [];
            this.text = "暂无数据";
            this.pageParams.pageTotal = res.data.pageTotal;
            this.pageParams.totalRecord = res.data.totalRecord;
          } else {
          	this.text = "暂无数据";
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 4) {
            sums[index] = this.profistList.totalSaleAmount;
            return;
          }
          if (index === 3) {
            sums[index] = '-';
            return;
          }
          if (index === 5) {
            sums[index] = '-';
            return;
          }
          if(index===6){
            sums[index] = this.profistList.totalAmount
          }
          if(index===7){
            sums[index] = this.profistList.totalWechatAmount
          }
          if(index===8){
            sums[index] = this.profistList.totalRealPay
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      indexMethod(index) {
        return (this.pageParams.pageIndex - 1) * 30 + 1 + index;
      },
      dealMonthes() {
        let tempMonth = [];
        tempMonth = this.monthes.split('-');
        this.monthDate = tempMonth[0] + "年" + tempMonth[1] + "月" + tempMonth[2] + '日' + tempMonth[4] + '年' + tempMonth[5] + '月' + tempMonth[6] + '日';
      },
      handleCurrentChange() {
        this.pageParams.pageIndex = index;
        this.getProfitMonthDatails();
      },
      backHandle() {//返回上一页
        this.$router.back()
      },
      toshareProfitOrderList(row) {
        this.$router.push({
          path: 'shareProfitOrderList',
          query: {
            setmealId: row.setmealId,
            monthDate: this.monthes.replace(/--/g,'至'),
            setmealName: row.setmealName
          }
        })
      }
    },
    computed: {},
    created() {
      this.dealMonthes();
      this.getProfitMonthDatails();
    },
  }
</script>

<style lang="less" scoped>
  .shareProfitMonthDetails {
    .common {
      width: 100% !important;
    }
    .form-item:nth-child(2) {
      margin-left: 20px;
    }
    .pagestyle {
      line-height: 30px;
    }
    .improveButton {
      color: #e44f4f;
    }
    .line-height-40 {
      line-height: 40px;
    }
    .back {
      padding-bottom: 10px;
    }
  }

  .shareProfitMonthDetails {
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
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
      text-align: center;
    }
    .el-button [class*=el-icon-] + span {
      margin-left: 2px;
    }
    .el-button span {
      margin-left: 1px;
    }
  }

  #tablestyle {
    .el-table .cell {
      text-align: center;
    }
  }
</style>




<template>
  <div class="rscont shareProfitMonth" id="tablestyle">
    <div class="main-cont">
      <div class="title">
        分润查询
      </div>
      <div class="common pt10">
        <div class="main-box">
          <div class="forms-cont clearfix">
            <span class="monthstyle fl">开始日期：</span>
            <div class="form-item fl">
              <el-date-picker v-model="startDate" type = 'date' value-format = "yyyy-MM-dd"  placeholder="请选择开始日期"></el-date-picker>
            </div>
            <span class="monthstyle fl">结束日期：</span>
            <div class="form-item fl">
              <el-date-picker v-model="endDate" type = 'date' value-format = "yyyy-MM-dd"  placeholder="请选择结束日期"></el-date-picker>
            </div>
            <div class="form-item fl btnstyle">
              <el-button type="primary" @click="queryBtn">查询</el-button>
            </div>
          </div>
          <div class="tables">
            <el-table :data="profistList" style="width: 100%" :empty-text=text>
              <el-table-column type="index"  label="编号" :index="indexMethod" width="50"></el-table-column>
              <el-table-column prop="settlementMonthDesc" label="结算期间" ></el-table-column>
              <el-table-column prop="status" label="分润情况" ></el-table-column>
              <el-table-column prop="settlementDateDesc"  label="分润日期"></el-table-column>
              <el-table-column prop="saleAmount"  label="销售金额"></el-table-column>
              <el-table-column prop="totalAmount"  label="分润金额应收（元）" header-align="left"></el-table-column>
              <el-table-column prop="totalWechatFee"  label="微信手续费（元）" header-align="left"></el-table-column>
              <el-table-column prop="totalRealpay"  label="分润金额实收（元）" header-align="left"></el-table-column>
              <el-table-column fixed="right" label="详情" width="70">
                <template slot-scope="scope">
                  <el-button  size="mini" @click="toshareProfitByMonthDetails(scope.row)">详情</el-button>
                </template>
              </el-table-column>
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
        name: "share-profig",
      data(){
          return{
          	text:'正在加载，请稍候',
            getParams: {
              shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
            },
            startDate:'',//选择开始月份
            endDate:'',//选择结束月份
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
        queryBtn(){//查询月份
          this.$httpPasser.post("settlement/getSettlementList",{
            shopId:this.getParams.shopId,
            startDate:this.startDate,
            endDate:this.endDate,
            pageIndex:this.pageParams.pageIndex,
            pageSize:this.pageParams.pageSize
          }).then((res)=>{
            if( res.data.resultCode =="200"){
              this.profistList = res.data.result;
              for(let o in this.profistList){
                this.profistList[o].settlementDateDesc = this.profistList[o].settlementDateDesc.slice(0,10);
              }
              this.pageParams.pageTotal = res.data.pageTotal;
              this.pageParams.totalRecord = res.data.totalRecord;
              this.$message.success("查询成功")
            }else if(res.data.resultCode =="204"){
            	this.text ="暂无数据"
              this.profistList = [];
              this.pageParams.pageTotal = res.data.pageTotal;
              this.pageParams.totalRecord = res.data.totalRecord;
              this.$message.success(res.data.resultCodeDesc);
            }else{
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
            }
          })
        },
        indexMethod(index) {//编号
          return (this.pageParams.pageIndex - 1)*30 + 1 + index;
        },
        //分页回调方法
        handleCurrentChange(index){
          this.pageParams.pageIndex = index;
          this.queryBtn();
        },
        toshareProfitByMonthDetails(row){//跳转详情
          let query = {}
          if(row.settlementId==null){
            query = {
              shopId:row.shopId,
              startDate:row.startDate,
              endDate:row.endDate,
              status:row.status=='未结算'?'N':'Y',
              settlementMonthDesc:row.settlementMonthDesc
            }
          }
          else{
            query = {
              settlementId:row.settlementId,
              settlementMonthDesc:row.settlementMonthDesc
            }
          }
          this.$router.push({
              path: 'shareProfitByMonthDetails', query
            })
        }
      },
      computed: {
      },
      created(){
        this.queryBtn();
      }
    }
</script>

<style lang="less" scoped>
  .shareProfitMonth{
    .btnstyle{
      margin-left:30px;
    }
    .title{
      line-height: 45px;
      height: 45px;
      font-size: 16px;
      margin-left:10px;
    }
    .monthstyle{
      font-size: 14px;
      font-weight: 700;
      margin-left:10px;
      padding-top: 10px;
    }
    .common{
      width:100%!important;
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
  }
    .shareProfitMonth {
      .pt50 {
        padding-top: 20px;
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
  }
  #tablestyle{
    .el-table .cell{
      text-align: center;
    }
  }
</style>




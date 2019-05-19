<template>
  <div id="rechargeAndRecord">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">充值对账</span>
      </div>
    </div>
    <div class="acountBalance numberCommon">
      <div class="title common">福利社账户余额</div>
      <div class="balance common">
        <div class="balanceLeft">
          <span>{{welfareBalance.toString().split('.')[0]}}</span>
          <span>.{{welfareBalance.toString().split('.')[1]}}</span>
          <span>元</span>
        </div>
        <div class="balanceRight">
          <el-button type="primary" @click="goToRecharge">立即充值</el-button>
        </div>
        <div style="clear:both;height:6px;width:100%;border:none;"></div>
      </div>
      <div class="setRemind common" @click="goToSetRemind">
        设置金额不足提醒
      </div>
    </div>
    <div style="padding-top: 30px;">
      <div class="line"></div>
    </div>
    <div class="acountBalance numberCommon">
      <div class="title common">福利社账单</div>
      <div class="tabButton common">
        <div class="tabButtonLeft" @click="setTableType(0)" :class="'tabButtonChosed'|ifChosed(0,tableTypeFlag)">已出账单
        </div>
        <div class="tabButtonRight" @click="setTableType(1)" :class="'tabButtonChosed'|ifChosed(1,tableTypeFlag)">未出账单
        </div>
        <div style="clear:both;height:1px;width:100%;border:none;"></div>
      </div>
      <div class="orderTips common" v-if="tableTypeFlag==0">
        <div>每月<span class="orderDate">1日</span>出账单</div>
        <div class="setEmail">通过设置邮箱账户，可定期收取到账单相关的邮件 <span @click="showSetEmail">设置</span></div>
      </div>
      <div class="rechargeTable" v-if="tableTypeFlag==0">
        <el-table :data="readyOrder" style="width: 98%" ref="customerUserIdList" :empty-text="textReady">
          <el-table-column prop="peroid" label="结算周期" width="220"></el-table-column>
          <el-table-column prop="consumptionAmount" label="消耗金额(元)"></el-table-column>
          <el-table-column prop="refundAmount" label="退款金额(元)"></el-table-column>
          <el-table-column prop="rechargeAmount" label="充值金额(元)"></el-table-column>
          <el-table-column prop="previousBalance" label="上月结余(元)"></el-table-column>
          <el-table-column prop="currentBalance" label="本月结余(元)"></el-table-column>
          <el-table-column fixed="right" label="操作" width="220">
            <template slot-scope="scope">
              <!--v-if="scope.row.flag=='N'" -->
              <el-button @click="openClick(scope.$index, scope.row)" type="primary"
                         size="small">账单明细
              </el-button>
              <el-button @click="openClick(scope.$index, scope.row)" type="danger"
                         size="small">确认账单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rechargeTable" v-if="tableTypeFlag==1">
        <div class="common">
          <div class="formItem">
            <div class="itemTitle">交易类型</div>
            <div>
              <el-select v-model="orderSearchParams.type" placeholder="请选择交易类型">
                <el-option v-for="item,index in tradingType" :key="index" :label="item.name"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="clear20"></div>
          </div>
          <div class="formItem">
            <div class="itemTitle">交易时间</div>
            <div>
              <div class="paramsButton">
                <el-date-picker
                  v-model="orderSearchParams.dateRange"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <!--<div class="paramsButton">
                <el-button plain>今天</el-button>
              </div>
              <div class="paramsButton">
                <el-button plain>本周</el-button>
              </div>
              <div class="paramsButton">
                <el-button plain>本月</el-button>
              </div>-->
              <div class="paramsButton">
                <el-button type="primary" @click="getBillDetail">查询</el-button>
              </div>
            </div>
            <div class="clear20"></div>
          </div>
        </div>
        <el-table :data="notReadyOrder" style="width: 98%" ref="customerUserIdList" :empty-text="textNoReady">
          <el-table-column prop="date" label="交易时间" width="220"></el-table-column>
          <el-table-column prop="flowId" label="资金流水ID(元)"></el-table-column>
          <el-table-column prop="orderId" label="企业订单号"></el-table-column>
          <el-table-column prop="flowType" label="交易类型"></el-table-column>
          <el-table-column prop="operater" label="操作人"></el-table-column>
          <el-table-column prop="oprationNum" label="操作金额(元)"></el-table-column>
          <el-table-column prop="flowContent" label="交易内容"></el-table-column>
        </el-table>
      </div>
      <div class="clearfix">
        <div class="pagination fl">
          <el-pagination background layout="prev, pager, next" :total="1" @current-change="1"
                         :page-size="30"></el-pagination>
        </div>
        <div class="fl pagestyle font12">
          <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span>
        </div>
      </div>
      <el-dialog
        title="设置接收账单的邮箱"
        :visible.sync="dialogVisible"
        width="26%"
        >
        <div class="setEmailDialog">
          <div class="setEmailTips">
            <div>设置邮箱后，我们将定期为您发送账单相关的邮件。（如未能收取到，请将</div>
            <div>"jujinsuo1@163.com"添加到您的白名单中</div>
          </div>
          <div class="clear20"></div>
          <div class="setEmailInput">
            <!--<div>邮箱列表（最多可设置5个）</div>-->
            <div>邮箱列表</div>
            <div>
              <el-input v-model="recieveEmail" placeholder="请输入邮箱地址"></el-input>
              <el-button type="primary" @click="setRecieveEmail">添加邮箱</el-button>
            </div>
          </div>
         <!-- <div class="clear20"></div>-->
         <!-- <div class="receiveEmailUl">
            <div class="receiveEmailList">
            <span class="receiveEmailListLeft">
              2528269@163.com
            </span>
              <span class="receiveEmailListRight">
                 <el-button type="primary" plain size="mini">删除</el-button>
            </span>
            </div>
          </div>-->
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import getUrl from '@/assets/js/global'
  import {$gPasserUrl} from '@/assets/js/gUrl'

  export default {
    data() {
      return {
        shopId:this.$local.sefetch('info').companyId,
        invoiceTotal: "0.00",
        //余额
        welfareBalance:'0.00',
        //交易类型
        tradingType: [],
        //已出账单数据
        readyOrder: [],
        //未出账单数据
        notReadyOrder: [
        ],
        //未出账单搜索条件
        orderSearchParams: {
          operation:'N',
          hopId:this.$local.sefetch('info').companyId,
          type: '',
          begainDate: '',
          endDate: '',
          dateRange: '',
          pageIndex:1,
          pageSize:30,
        },
        textReady: '数据正在加载。。',
        textNoReady: '数据正在加载。。',
        //底部表格的状态,0代表 已出账单  1代表 未出账单
        tableTypeFlag: 0,
        pagetotal: 0, //列表总条数
        pageNow: 1, //当前页码
        pageTotal: 0, //总页数
        pageSize:30,
        pageIndex: 1,
        //弹窗flag
        dialogVisible: false,
        //接收邮箱
        recieveEmail:'',
      }
    },
    methods: {
      //设置表格类型
      setTableType(flag) {
        this.tableTypeFlag = flag;
      },
      //获取交易类型
      getTradingType() {
        this.$httpPasser.post(
          'welfareWeb/getTradingType',
          {}
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.tradingType = res.data.result;
          }
          else {
            this.$message.error(res.data.resultCodeDesc);
          }
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      //获取已出账单列表
      getSettlementList() {
        this.$httpPasser.post(
          'welfareWeb/getBillDetail',
          {
            shopId: this.shopId,
            operation:"Y",
            pageIndex:this.pageIndex,
            pageSize:this.pageSize
          }
        ).then((res) => {
          if (res.data.resultCode == "200") {
              this.readyOrder = res.data.result;
          }
          else if(res.data.resultCode == '204') {
            this.readyOrder = []
            this.textReady = '暂无数据';
            this.$message.success(res.data.resultCodeDesc);
          }else{
            this.textReady = '暂无数据';
            this.$message.success(res.data.resultCodeDesc);
          }
        }).catch((err) => {
          this.textReady = err.error;
          this.$message.error(err.error)
        })
      },
      //获取未出账单列表
      getBillDetail(){
        this.orderSearchParams.shopId = this.shopId;
        this.$httpPasser.post(
          'welfareWeb/getBillDetail',
          this.orderSearchParams
        ).then(res=>{
          if(res.data.resultCode==200){
            if (this.res.data.result.length && this.res.data.result.length > 0) {
              this.notReadyOrder = res.data.result;
            }
            else {
              this.notReadyOrder = []
              this.textNoReady = '暂无数据';
            }
          }
          else{
            this.textNoReady = res.data.resultCodeDesc;
            this.$message.error(res.data.resultCodeDesc);
          }
        }).catch(err=>{
          this.textNoReady = err.error;
          this.$message.error(err.error)
        })
      },
      //跳转到充值页面
      goToRecharge() {
        this.$router.push('./recharge')
      },
      //跳转到设置提醒页面
      goToSetRemind() {
        this.$router.push('./setRemindAmount')
      },
      //关闭弹窗回调
      handleClose() {

      },
      //显示设置邮箱弹窗
      showSetEmail() {
        this.dialogVisible = true;
        this.$httpPasser.post("welfareWeb/getBillEmail",{
          shopId:this.shopId,
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.recieveEmail = res.data.result;
          }
        })
      },
      //设置接收邮箱
      setRecieveEmail(){
        this.$httpPasser.post(
          'welfareWeb/setBillEmail',
          {
            email:this.recieveEmail,
            shopId:this.shopId
          }
        ).then(
          res=>{
            if(res.data.resultCode==200){
              this.$message.success(res.data.resultCodeDesc)
              this.dialogVisible = false;
            }
            else{
              this.$message.error(res.data.resultCodeDesc)
            }
          }
        ).catch(err=>{
          this.$message.error(err)
        })
      },
      //获取余额
      getWelfareBalance(){
        this.$http2.get(
          'welfare/getWelfareBalance',
          {
            params:{
              shopId:this.shopId,
            }
          }
        ).then(res=>{
          if(res.data.resultCode==200){
            if(res.data.result.welfareBalance == 0)
            this.welfareBalance = "0.00"
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      }
    },
    created() {
      //获取交易类型
      this.getTradingType()
      //获取已出账单金额
      this.getSettlementList()
      //获取未出账单金额
//      this.getBillDetail()
      //获取余额
      this.getWelfareBalance();
    },
    mounted() {
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    },
    watch: {},
    filters: {
      ifChosed: function (value, flagValue, flagStandard) {
        if (flagValue == flagStandard) {
          return value;
        }
        else {
          return ''
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #rechargeAndRecord {
    .pagination {
      padding-bottom: 20px;
    }
    .pagestyle {
      line-height: 30px;
    }
    .line {
      height: 1px;
      background-color: #ccc;
    }
    .numberCommon {
      .common {
        margin-left: 25px;
        background-color: #fff;
        padding: 0 4px;
        line-height: 30px;
      }
      .title {
        font-size: 20px;
        line-height: 45px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .balance {
        .balanceLeft {
          color: #2068e0;
          font-size: 30px;
          float: left;
          span + span {
            color: #2068e0;
            font-size: 14px;
            position: relative;
            left: -10px;
          }
          span + span + span {
            margin-left: 2px;
          }
        }
        .balanceRight {
          float: left;
          margin-left: 45px;
        }
      }
      .setRemind {
        height: 30px;
        width: 124px;
        background-color: #f1faff;
        cursor: pointer;
        color: #2068e0;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        border-radius: 5px;
      }
      .tabButton {
        div {
          border: solid 1px #969696;
          height: 34px;
          width: 94px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
        }
        .tabButtonLeft {
          float: left;
          border-right: none;
          color: #969696;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .tabButtonRight {
          float: left;
          border-left: none;
          border-color: #969696;
          color: #969696;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .tabButtonChosed {
          color: #2068e0 !important;
          border: solid 1px #2068e0 !important;
        }
      }
      .orderTips {
        font-size: 14px;
        color: #676767;
        div {
          line-height: 35px;
          height: 35px;
        }
        .orderDate {
          color: #2068e0;
        }
        .setEmail {
          span {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #f1faff;
            color: #2068e0;
            line-height: 30px;
            font-size: 12px;
            text-align: center;
            border-radius: 5px;
            margin-left: 10px;
          }

        }
      }
      .rechargeTable {
        margin-top: 25px;
        .formItem {
          height: 40px;
          line-height: 40px;
          .itemTitle {
            width: 80px;
            font-size: 14px;
            float: left;
          }
          div + div {
            float: left;
          }
          .paramsButton {
            float: left;
            margin-right: 10px;
          }
        }
      }
      .line {
        text-align: center;
      }
      .clearfix {
        margin-top: 10px;
      }
    }
    .top-title {
      margin-bottom: 0px !important;
    }
  }
</style>
<style lang="less">
  #rechargeAndRecord {
    .el-form-item__content {
      display: inline-block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-alert__icon {
      width: 32px;
      font-size: 32px;
    }
    .el-alert__content {
      margin-top: -20px;
    }
    .el-alert {
      padding: 18px 16px;
    }
    .el-dialog__header {
      border-bottom: solid 1px #999999;
    }
    .setEmailDialog {
      padding: 0 10px 0 10px;
      .setEmailTips {
        font-size: 13px;
        color: #999999;
        line-height: 25px;
      }
      .setEmailInput {
        color: #000000;
        line-height: 30px;
        .el-input {
          width: 72%;
        }
        .el-button--primary {
          margin-left: 10px;
          float:right;
        }
      }
      .receiveEmailUl{
        .receiveEmailList{
          border-bottom:solid 1px #999999;
          height:45px;
          line-height:45px;
          .receiveEmailListLeft{
            float:left;
            font-size:15px;
            color:#000000;
          }
          .receiveEmailListRight{
            float:right;
          }
        }
      }

    }
    .el-table__fixed-right::before, .el-table__fixed::before{
      background: #fff;
    }

  }
</style>

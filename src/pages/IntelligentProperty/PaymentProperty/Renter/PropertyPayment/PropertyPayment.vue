<template>
  <div class="PropertyPayment" id="PropertyPayment">
  	<div style="padding-top: 30px;">
			<div class="top-title">
				<div class="line"></div>
				<span class="top-text">未缴费记录</span>
			</div>
		</div>
    <div class="mainTable" v-for="paymentResult,index in paymentResults" :key="index">
      <div class="clear50 companyName">
        物业公司：{{paymentResult.companyName}}——未缴费记录
      </div>
      <el-table
        :data="paymentResult.recordList"
        style="width: 100%"
        @expand-change="handleExpandChange"
        ref="paymentResultsTable"
        row-class-name="get-row-class">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="resultTable">
                <div class="resultTbody" style="height: 200px">
                  <el-form-item v-for="(item,index) in feeList" :key="index">
                    <div class="resultBlock managementFee" >
                      <div class="resultContent">
                        <ul>
                          <li v-if="item.amount">缴费金额：{{item.amount}}元</li>
                          <li v-if="item.date">缴费日期：{{item.amount}}</li>
                          <li v-if="item.feeStandard">缴费标准：{{item.feeStandard}}{{item.unit}}</li>
                          <li v-for="item in item.item">{{item.name}}:{{item.value}}</li>
                          <!--<li>房间面积：{{props.row.managementFeeHouseArea}}㎡</li>-->
                          <!--<li>缴费区间：{{props.row.managementFeeRegion}}</li>-->
                          <!--<li>月份合计：{{props.row.managementFeeMonthSum}}</li>-->
                          <!--<li>应缴物业费：{{props.row.managementFeeStressPayment}}元</li>-->
                        </ul>
                      </div>
                      <div class="typeName" >
                        <span style="color: #333;">{{item.feeItemName}}</span>
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="写字楼名称" prop="buildingName">
        </el-table-column>
        <el-table-column label="房间" prop="buildingRoomName">
        </el-table-column>
        <el-table-column label="缴费日期" prop="payDate">
        </el-table-column>
        <el-table-column label="应缴" prop="realPay">
        </el-table-column>
        <el-table-column label="实缴" prop="total">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini"  @click="handleRowClick(scope.row,index)">查看明细</el-button>
            <el-button size="mini" @click="createCode($event,scope.row)">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clear20"></div>
      <el-button type="primary" round @click="payAllBuilding(index)" v-if="paymentResults[index].recordList.length !=0 ">全部缴费</el-button>
      <el-button type="primary" round @click="toPaymentRecord">查看缴费记录</el-button>
      <div v-if="src != ''" style="display: inline-block">
        <img :src="src" style="vertical-align: middle">
        温馨提示：请使用通行客APP扫码支付，付款成功之后手动刷新页面。
      </div>
    </div>
    <el-dialog
      title="输入密码"
      :visible.sync="passwordDialog"
      width="30%"
      center>
      <el-input v-model="paymentParams.password" placeholder="请输入交易密码" clearable></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="passwordDialog = false">取 消</el-button>
    <el-button type="primary" @click="ensureSubmitPayment">确认缴费</el-button>
  </span>
    </el-dialog>
    <div class="clear50"></div>
  </div>
</template>

<script>
  import footer from '@/components/public/footer'
  import md5 from 'js-md5';
  import axios from '@/assets/js/axios'
  import gUrl from '@/assets/js/gUrl'

  export default {
    name: "index",
    components: {
      'v-footer': footer
    },
    data() {
      return {
        gUrl:gUrl,
        src:"",//二维码
        feeList:[],
        tableFee:[],//新接口返回的所有数据
        //获取楼盘列表参数，物业公司ID
        companyId: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : ''
        },
        //用户ID
        userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        //用户名称
        userName: this.$local.sefetch('info') ? this.$local.sefetch('info').userName : '',
        //用户电话
        userTel: this.$local.sefetch('info') ? this.$local.sefetch('info').telPhone : '',
        //输入密码对话框
        passwordDialog: false,
        //总页数，用来控制是否显示分页
        pageTotal: 0,
        //以buildingId为KEY来存储缴费详情
        FeeDetial: {},
        paymentResults: [],
        companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
        //唯一标识
        identity: '',
        //时间戳
        times: new Date().getTime(),
        //sign 采用 用户名+身份唯一码+时间戳+MAC  4个参数按照顺序md5 加密后的字符串
        sign: '',
        //账务信息
        accountInfo: {
          //余额
          amount: 0,
          //时间
          createtime: '',
          identityid: '',
          pay_account_id: '',
          //以下三项缺一不可，否则跳去账务页面绑卡
          //是否绑卡
          isBankCardAuth: '',
          //是否实名认证
          isIdCardAuth: '',
          //是否设置交易密码
          pwdInit: '',
          status: ''
        },
        //缴费参数
        paymentParams: {
          //银行卡号
          cardId: '',
          //未交费信息主键
          feeNoticeBuildingId: '',
          //交易密码
          password: '',
          //用户ID
          customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : ''
        },
      }
    },
    methods: {
      createCode(event,row){
        event.stopPropagation();
        this.$http.post('qrCode/payCode',{
          feeNoticeBuildingRoomIdList:row.feeNoticeRoomId
        }).then((res)=>{
          this.src = 'data:image/png;base64,' + res.data.result
//          this.src = 'data:image/'+res.data
        })
      },
      toDetails(row, column, cell){

      },
      payAllBuilding(index){
        let roomIds=[]
        for(let o in this.paymentResults[index].recordList){
           roomIds.push(this.paymentResults[index].recordList[o].feeNoticeRoomId)
        }
        this.$http.post('qrCode/payCode',{
          feeNoticeBuildingRoomIdList:roomIds
        }).then((res)=>{
          this.src = 'data:image/png;base64,' + res.data.result
        })
      },

      //表格的ref值。用于为表格的ref值添加index后缀，以方便调用
      setTableRef(index){
        return 'paymentResultsTable_'+index;
      },
      //查找所有缴费记录方法，初始化页面时运行
      selectAllFeeRecord() {
        let tempParams = {};
        tempParams.companyId = this.companyId.companyId;
        tempParams.year = 0;
        this._http('businessProperty/getBusinessUnFeeRecord', 'get', tempParams, data => {
          this.paymentResults =data.result
          console.log(  this.paymentResults)
          //通过原生JS修改展开按钮
          let temp = document.getElementsByTagName('tr')
          //$nextTick是DOM一次渲染结束之后的回调方法
          //VUE的页面渲染很多是异步的。所以这里需要放到$nextTick中
          this.$nextTick(function () {
            for (let i = 1; i < temp.length; i++) {
              let temp2 = temp[i].getElementsByTagName('td')[0].getElementsByTagName('div')[0]
              temp2.innerHTML = '<div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div>'
              temp2.getElementsByTagName('div')[0].onclick = function () {
                if (this.style.transform && this.style.transform == 'rotate(0deg)') {
                  this.style.transform = 'rotate(90deg)'
                }
                else if (this.style.transform && this.style.transform == 'rotate(90deg)') {
                  this.style.transform = 'rotate(0deg)'
                }
                else {
                  this.style.transform = 'rotate(90deg)'
                }
              }
            }
          })
        })
      },
      //row为当前展开行，expandedRows为所有已经展开的行。展开表格行方法
      handleExpandChange(row, expandedRows) {
        if(expandedRows.length>1){
          expandedRows.shift()
        }
        /*//如果所有已展开行包含当前展开行，则说明是展开操作，执行查询。否则不执行
        let index = expandedRows.indexOf(row)
        if(index!==-1){
          //console.log(row.feeNoticeBuildingId)
          this.getFeeRecordDetial(row.feeNoticeBuildingId)
        }*/
      },
      //获取缴费详情
      getFeeRecordDetial(feeNoticeRoomId, callBack) {
        this._http('propertyCompany/getFeeNoticeRoomDetail', 'get', {
          feeNoticeRoomId: feeNoticeRoomId
        }, data => {
          this.feeList = data.result
          //this.FeeDetial[feeNoticeRoomId] = data.result.FeeTerm;
          callBack();
        })
      },
      //根据index判断是否有white类
      getIsWhite(index) {
        if (index % 2 == 0) {
          return ''
        }
        else {
          return 'white'
        }
      },
      //行点击事件
      handleRowClick(row,index) {
//        let text = cell.getElementsByTagName("span")[0]
//        if(text.innerHTML =="展开"){
//          text.innerHTML = "收起"
//        }else{
//          text.innerHTML = "展开"
//        }

        this.getFeeRecordDetial(row.feeNoticeRoomId, () => {
          this.$refs['paymentResultsTable'][index].toggleRowExpansion(row)
        })
        console.log(index)
      },
      //跳转到未交费记录
      toPaymentRecord() {
        this.$router.push({path: 'paymentRecord'})
      },
      //获取唯一标识
      getIdentity(callback) {
        this._http_account(
          'asset/register',
          'get',
          {userId: this.userId},
          (data) => {
            this.identity = data.result;
            callback();
          }
        )
      },
      //获取账务信息
      getAccountInfo() {
        this._http_account(
          'asset/getInfo',
          'get',
          {
            identity: this.identity,
            createtime: this.times,
            sign: md5(this.userName + this.userTel + this.times + this.identity + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
          },
          (data) => {
            this.accountInfo = data.result;
            if (this.accountInfo.isIdCardAuth == 'false') {
              this.$message.error('您还没有进行实名认证，请进入账务页面进行实名认证')
            }
            else if (this.accountInfo.isBankCardAuth == 'false') {
              this.$message.error('您还没有绑定银行卡，请进入账务页面绑定银行卡')
            }
            else if (this.accountInfo.pwdInit == 'false') {
              this.$message.error('您还没有设置交易密码，请进入账务页面设置交易密码')
            }
            else {
              this.getCardInfo(()=>{
                this.passwordDialog = true;
              })
            }


          }
        )
      },
      //获取银行卡
      getCardInfo(callback) {
        var that = this;
        this._http_account(
          'userBankCard/getUserBankCard',
          'get',
          {
            identity: this.identity,
            createtime: this.times,
            sign: md5(this.userName + this.userTel + this.times + this.identity + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
          },
          (data) => {
            that.paymentParams.cardId = data.result.bankCode;
            callback()
          },
          '未能获取您的银行卡号！'
        )
      },
      //缴费
      doPayment(row) {
        //获取账务信息
//        this.paymentParams.feeNoticeBuildingId = row.feeNoticeBuildingId
//        this.getIdentity( ()=> {
//          this.getAccountInfo()
//        });
//        for(let o in this.paymentResults){
//          for(let j in this.paymentResults[o].recordList){
//
//          }
//        }
      },
      //提交缴费信息
      ensureSubmitPayment() {
        var that = this;
        this._http(
          'propertyCompany/payment',
          'get',
          this.paymentParams,
          (data) => {
            that.passwordDialog = true;
            that.$message.success('缴费成功！')
            that.$router.push({path: 'paymentRecord'});
          }
        )
      },
      /*工具方法*/
      _http(url, type, params, callback200) {
        if (type == "get") {
          this.$http.get(
            url, {
              params: params
            }
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        } else if (type == "post") {

        }

      },
      /*账务相关接口*/
      _http_account(url, type, params, callback200,specialMessage) {
        if (type == "get") {
          this.$http2.get(
            url, {
              params: params
            }
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if(specialMessage){
                  this.$message({
                    showClose: true,
                    message: specialMessage,
                    type: 'error'
                  });
                }
                else{
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        } else if (type == "post") {

        }

      }
    },
    mounted() {
      this.selectAllFeeRecord();
    },
  }
</script>

<style lang="less" scoped>
  #PropertyPayment {
    width: 100%;
    background-image:none;
    background-color: white;
    .mainTable {
      min-height: 450px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
    }
    .companyName {
      text-indent: 15px;
      line-height: 50px;
      font-size: 15px;
    }
    line-height: 25px;
    .resultTable {
      .resultThead {
        height: 45px;
        line-height: 45px;
      }
      background-color: #e8e8e8;
      span {
        display: inline-block;
      }
      .left {
        text-indent: 20px;
      }
      .right {
        float: right;
        margin-right: 20px;
      }
      .resultTbody {
        height: 200px;
        display: table;
        width: 100%;
        .resultBlock {
          position: relative;
          display: table-cell;
          border: solid 1px #cccbcb;
          border-right: none;
          width: 16%;
          overflow: hidden;
          .resultContent {
            margin-right: 15px;
            margin-left: 15px;
            margin-top: 15px;
            font-size: 13px;
            color: rgb(96, 98, 102);
          }
          .typeName {
            position: absolute;
            bottom: 0px;
            right: 0px;
            height: 60px;
            width: 50px;
            background-repeat: no-repeat;
            background-position: 10px 0px;
            line-height: 90px;
            overflow: hidden;
            margin-right: 10px;
            text-align: center;
          }
        }
        .resultBlock:last-child {
          border-right: solid 1px #cccbcb;
        }
        .white {
          background-color: white;
        }
      }
    }
    .clear20 {
      height: 20px;
      clear: both;
      width: 100%;
    }
    .el-pagination {
      text-align: center;
    }
  }

  .Renter_container {
    .Payment_head {
      .content_box {
        padding: 270px 0 100px 0;
        .Payment_content {
          margin: 0 auto;
          img {
            width: 451px;
            height: 37px;
            margin: 62px 0 40px 69px;
          }
          p {
            font-size: 10.5px;
            line-height: 18px;
            margin-left: 69px;
            color: #FFFFFF;
          }
        }
      }
    }
    .company1 {
      font-size: 14px;
      padding: 27px 0 20px 0;
    }
    .Payment_part {
      padding: 20px 0 0 0;
      .icon {
        padding-bottom: 10px;
        img {
          vertical-align: middle;
        }
        span {
          padding: 3px 0 0 4px;
        }
      }
    }
    .pagin {
      text-align: center;
      padding: 20px 0;
    }
    .black {
      background: #3b3b3b;
    }
  }
  #PropertyPayment{
  	width: 1040px;
  }
</style>
<style lang="less">
  #PropertyPayment {
    .mainPart .el-table {
      text-align: center;
    }

    .el-table__expanded-cell[class*=cell] {
      padding: 0;
    }

    .el-form-item__content {
      line-height: 30px;
      position: relative;
      font-size: 14px;
    }
    .resultTable .resultTbody .resultBlock:last-child {
      height: 200px;
      width: 208px;
      border: 1px solid #dedede;
      margin: 5px 0;
    }
    .resultTable .resultTbody .resultBlock .resultContent {
      margin: 0;
      padding-left: 6px;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .resultTable .resultTbody .resultBlock {
      border: none;
    }
    .el-table th>.cell{
      text-align: center;
    }
    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
      border:none;
    }
    .el-table__expand-icon>.el-icon{
      visibility:hidden;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
      padding-left: 0;
      margin-left: -30px;
    }
    .el-table--border, .el-table--group{
      border:none;
    }
  }

</style>

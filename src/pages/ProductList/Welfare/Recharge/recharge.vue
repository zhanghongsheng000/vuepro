<template>
  <div id="recharge">
    <div style="padding-top: 10px;">
      <div class="top-title">
        <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
        <span class="top-text">充值</span>
      </div>
    </div>
    <div>
      <div class="line"></div>
    </div>
    <div class="clear20"></div>
    <div class="tipAndBalance common">
      <div class="rechargeTip">*充值金额可以开增值税普通发票以及增值税专用发票</div>
      <div class="rechargeBalance">当前账户可用余额：0元</div>
    </div>
    <div>
      <div class="line"></div>
    </div>
    <div class="rechargeType common">
      <div class="rechargeTypeCell">
        <div class="rechargeCellLeft">公司名称</div>
        <div class="rechargeCellRight">{{companyName}}</div>
        <div class="clear5"></div>
      </div>
      <div class="rechargeTypeCell">
        <div class="rechargeCellLeft" style="line-height:70px;">支付方式</div>
        <div class="rechargeCellRight">
          <div class="rechargeTypeTd recommendType" @click="chosedRechargeType(0)"
               :class="'rechargeTypeTdChosed' | ifChosed(rechargeType,0)">
            <div class="tdLeft scan"></div>
            <div class="tdRight">
              <div class="tdRightTitle">扫码支付</div>
              <div class="tdRightLittle">微信&nbsp;|&nbsp;支付宝</div>
            </div>
            <div class="labelFlag">
              <i class="el-icon-upload-success el-icon-check"></i>
            </div>
          </div>
          <div class="rechargeTypeTd" @click="chosedRechargeType(1)"
               :class="'rechargeTypeTdChosed' | ifChosed(rechargeType,1)">
            <div class="tdLeft outLine"></div>
            <div class="tdRight">
              <div class="tdRightTitle" style="margin-top:25%;">线下支付</div>
            </div>
            <div class="labelFlag">
              <i class="el-icon-upload-success el-icon-check"></i>
            </div>
          </div>
        </div>
        <div class="clear30"></div>
      </div>
      <div class="rechargeTypeCell" v-if="rechargeType==0">
        <div class="rechargeCellLeft" style="line-height:55px;">充值金额</div>
        <div class="rechargeCellRight">
          <div v-for="item,index in cardList" :key="index" class="rechargeValueTd" @click="chosedRechargeValue(item.shoppingCardId)"
               :class="'rechargeValueTdChosed' | ifChosed(moneyId,item.shoppingCardId)">
            {{item.shoppingCardAmount}}
            <span style="font-size:13px;">元</span>
          </div>
        </div>
        <div class="clear20"></div>
      </div>
      <div class="rechargeTypeCell" v-if="rechargeType==0">
        <div class="rechargeCellLeft"></div>
        <div class="rechargeCellRight">
          <el-button type="primary" @click="payCode">立即充值</el-button>
        </div>
      </div>

      <div class="rechargeTypeCell" v-if="rechargeType==1">
        <div class="rechargeCellLeft"></div>
        <div class="rechargeCellRight">
          <div class="rechargeOutLineTip">
            *因线下汇款方式到账时间会有延误，强烈建议采用微信、支付宝
          </div>
          <div class="clear20"></div>
          <div class="outLineStep">
            <div class="outLineStepLeft">1</div>
            <div class="outLineStepRight">
              请打款到居金所收款银行
              <div class="clear10"></div>
              <div class="stepList">
                <span class="stepListTitle">收款银行</span>
                <span  class="bold black">招商银行股份有限公司郑州东三环支行</span>
              </div>
              <div class="stepList">
                <span class="stepListTitle">收款账号</span>
                <span class="bold black">12290596235142325</span>
              </div>
              <div class="stepList">
                <span class="stepListTitle">开户名称</span>
                <span  class="bold black">河南居金所房地产营销策划有限公司</span>
              </div>
              <div class="stepList">
               *最低汇款金额为1000元
              </div>
            </div>
            <div class="clear20"></div>
          </div>
          <div class="outLineStep">
            <div class="outLineStepLeft">2</div>
            <div class="outLineStepRight">
              将汇款信息发送到我们的邮箱
              <div class="clear10"></div>
              <div class="stepList">
                汇款之后请您将 <span class="black">居金所企业账号、贵公司名称、汇款人姓名、汇款金额、汇款时间、汇款银行账号信息或 <i class="bold">汇款底单</i></span>
              </div>
              <div class="stepList">
                发送至企业级服务中心邮箱 <i class="bold black">jjs@jjs.com</i>
              </div>
            </div>
            <div class="clear20"></div>
          </div>
          <div class="outLineStep">
            <div class="outLineStepLeft">3</div>
            <div class="outLineStepRight">
              充值至您的账户
              <div class="clear10"></div>
              <div class="stepList">
               我们会于每个工作日16点查账，并在确认到账后<i class="bold black">一个工作日内</i>充值到居金所企业账户中
              </div>
            </div>
            <div class="clear20"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="支付二维码"
      :visible.sync="dialogVisible"
      width="18%">
      <div style="text-align:center;">
        <img :src="src" alt="">
        <div>请使用通行客扫描二维码完成支付</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "set-remind-amount",
    data() {
      return {
        rechargeType: 0,
        //支付金额
        moneyId: '',
        //购物卡列表
        cardList:[],
        //二维码弹窗FALG
        dialogVisible:false,
        //充值二维码
        src:'',
        companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
      }
    },
    created(){
      this.getShoppingCardList()
    },
    methods: {
      backHandle() {
//        this.$router.back()
        this.$router.push({
        	path:'./rechargeAndRecord'
        })
      },
      //切换支付方式
      chosedRechargeType(flag) {
        this.rechargeType = flag;
      },
      //选择支付金额
      chosedRechargeValue(id) {
        this.moneyId = id;
      },
      //获取电子购物卡
      getShoppingCardList(){
        this.$http2.post(
          'welfareWeb/getRechargeAmount',
          {
            isCompany:'Y'
          }
        ).then(res=>{
          if(res.data.resultCode==200){
            this.cardList = res.data.result;
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch(
          err=>{
            this.$message.error(err)
          }
        )
      },
      //生成支付二维码  Qrcode/payCode
      payCode(){
        if(this.moneyId == ''){
          this.$message.error("请选择充值金额")
        }else{
          this.dialogVisible = true;
          this.$httpPasser.post(
            'Qrcode/payCode',
            {
              shopId:this.$local.sefetch('info').companyId,
              shoppingCardId:this.moneyId
            }
          ).then(res=>{
            if(res.data.resultCode==200){
              this.src = 'data:image/png;base64,' + res.data.result
            }
            else{
              this.$message.error(res.data.resultCodeDesc)
            }
          }).catch(
            err=>{
              this.$message.error(err)
            }
          )
        }
      }
    },
    filters: {
      ifChosed(chosedClass, rechargeType, currentFlag) {
        let re = '';
        if (currentFlag == rechargeType) {
          re = chosedClass
        }
        return re;
      },
    }
  }
</script>

<style scoped lang="less">
  #recharge {
    .top-title .top-text {
      margin-left: 15px;
    }
    .top-title {
      margin-bottom: 0px;
    }
    .common {
      margin-left: 25px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
    .line {
      height: 1px;
      background-color: #ccc;
    }
    .tipAndBalance {
      font-size: 14px;
      .rechargeTip {
        background-color: #f3fdff;
        display: inline-block;
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
        padding-right: 30px;
        color: #0268d4;
      }
      .rechargeBalance {
        line-height: 75px;
      }
    }
    .rechargeType {
      font-size: 14px;
      color: #6d6d6d;
      .rechargeTypeCell {
        line-height: 45px;
        .rechargeCellLeft {
          float: left;
          width: 80px;
          height: 45px;
        }
        .rechargeCellRight {
          float: left;
          .rechargeTypeTd {
            cursor: pointer;
            float: left;
            position: relative;
            height: 70px;
            width: 165px;
            border: solid 1px #dcdcdc;
            margin-right: 20px;
            .labelFlag {
              display: none;
            }
            .tdLeft {
              width: 28%;
              height: 100%;
              float: left;
            }
            .scan {
              background-image: url("../../../../assets/images/public/recharge_one.png");
              background-repeat: no-repeat;
              background-position: 100% 36%;
            }
            .outLine {
              background-image: url("../../../../assets/images/public/recharge_two.png");
              background-repeat: no-repeat;
              background-position: 100% 46%;
            }
            .tdRight {
              float: left;
              .tdRightTitle {
                height: 20px;
                color: #000000;
                line-height: 20px;
                font-size: 20px;
                margin-top: 20%;
                padding-left: 10px;
              }
              .tdRightLittle {
                padding-left: 10px;
                font-size: 12px;
                height: 12px;
                line-height: 12px;
                margin-top: 5px;
                color: #c5c5c5;
              }
            }
          }
          .recommendType {
            background-image: url("../../../../assets/images/public/remind.png");
            background-repeat: no-repeat;
            background-position: 5% 0;
          }
          .rechargeTypeTdChosed {
            overflow: hidden;
            border: solid 1px #479eff !important;
            .labelFlag {
              display: block !important;
              position: absolute;
              right: -17px;
              bottom: -7px;
              width: 46px;
              height: 26px;
              background: #479eff;
              text-align: center;
              transform: rotate(-45deg);
              box-shadow: 0 1px 1px #ccc;
              i {
                color: #ffffff;
                transform: rotate(45deg);
                position: absolute;
                left: 40%;
              }
            }
          }
          .rechargeValueTd {
            cursor: pointer;
            float: left;
            position: relative;
            height: 55px;
            line-height: 55px;
            text-align: center;
            font-size: 25px;
            width: 165px;
            border: solid 1px #dcdcdc;
            margin-right: 20px;
          }
          .rechargeValueTdChosed {
            border: solid 1px #479eff;
            color: #479eff;
          }
          .rechargeOutLineTip {
            color: #e4666e;
            font-size: 13px;
            line-height: 20px;
          }
          .outLineStep{
            .outLineStepLeft{
              float:left;
              height:25px;
              width:25px;
              border-radius:50%;
              line-height:30px;
              text-align:center;
              color:#0661d4;
              border:solid #0661d4 1px;
              background-color: #eeffff;
            }
            .outLineStepRight{
              line-height:25px;
              font-size:16px;
              float:left;
              color:#000000;
              margin-left:15px;
              .stepList{
                color: #636363;
                line-height:30px;
                font-size:14px;
                .stepListTitle{
                  width:80px;
                }
                .bold{
                  font-weight:bold;
                }
                .black{
                  color:#000000;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  #recharge {
  }
</style>

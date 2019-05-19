<template>
  <div id="Invoice">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">开发票</span>
      </div>
    </div>
    <div class="openInvoice">
      <img src="../../../../assets/img/Welfare/money.png">
      <span class="total">可开发票总额</span>
      <div class="invoice_money">
        <span class="makeInvioceMoney" id="makeInvioceMoney" style="display: none">{{unFinishAmount}}</span>
        <span class="moneyStyle">
          <span class="invoiceMoney">{{invoiceMoney}}</span>.
          <span class="invoiceFinallTwo">{{invoiceFinallTwo}}元</span>
        </span>
      </div>
      <div class="money_condition">
        <span>累计充值{{rechargeAmount}}元，已开发票{{finishAmount}}元</span>
      </div>
    </div>
    <div class="make_invoice" style="margin-left: 45px;margin-top: 25px">
      <el-button  type="primary" @click = "setIn" :disabled="disabled">开发票</el-button>
      <div v-if="status == '' || status == null" style="display: inline-block;">
        <span>您的企业资质尚未认证，暂不能申请发票，请先认证</span>
        <el-button type="primary" plain size="mini" @click="toCompanyIdentify">去认证</el-button>
      </div>
      <div v-if="status == 'W'" style="display: inline-block;">
        <span  @click="waitAuditing" style="text-decoration: underline;cursor: pointer">审核中</span>
      </div>
      <div v-if="status == 'Y'" style="display: inline-block;">
        <span  @click="waitAuditing" style="text-decoration: underline;cursor: pointer;color: #409EFF;">查看企业资质认证</span>
      </div>
      <div v-if="status == 'N'" style="display: inline-block;">
        <span  @click="tonoPass" style="text-decoration: underline;cursor: pointer;color: #f56c6c">认证失败，请重新认证</span>
      </div>
    </div>

  </div>
</template>
<script>
  import getUrl from '@/assets/js/global'
  import { $gPasserUrl } from '@/assets/js/gUrl'
  export default {
    data() {
      return {
        shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        rechargeAmount:"0.00",//总金额
        invoiceMoney:'',//元
        invoiceFinallTwo:'',//角分
        totalmoney:'0.00',//累计充值金额
        finishAmount:'0.00',//已开发票金额
        unFinishAmount:'',//可开发票金额
        status:'',//企业资质认证状态
        disabled:true,
      }
    },
    methods: {
      getCertificationDetail(){
        this.$httpPasser.post('welfareWeb/getCertificationDetail', {
          shopId: this.shopId
        }).then(
          res => {
            if(res.data.resultCode == 200) {
              this.status = res.data.result.status;
              if(this.status == "Y"){
                this.disabled = false
              }
            } else {
//              this.$message.error(res.data.resultCodeDesc)
            }
          }
        ).catch(
          (err) => {
            this.$message.error(err)
          }
        )
      },
      waitAuditing(){
        this.$router.push({
          path:"./waitAuditing"
        })
      },
      tonoPass(){
        this.$router.push({
          path:'./identifyNopass'
        })
      },
      setIn(){
        this.$router.push({
          path:'./makeInvoiceMessage'
        })
      },
      //企业资质认证
      toCompanyIdentify(){
        this.$router.push({
          path:'./companyIdentify'
        })
      },
      getInvoiceAmount(){
        this.$httpPasser.post("welfareWeb/getInvoiceAmount",{
          shopId:this.shopId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.rechargeAmount = res.data.result.rechargeAmount
            if(this.unFinishAmount == 0){
              this.invoiceMoney = "0"
              this.invoiceFinallTwo ="00"
            }
            this.finishAmount = res.data.result.finishAmount
            this.unFinishAmount = res.data.result.unFinishAmount
          }else{
            this.rechargeAmount = 0.00
            this.finishAmount = 0.00
            this.unFinishAmount = 0.00
          }
        })
      },
    },
    created() {
      this.getInvoiceAmount()
      this.getCertificationDetail()
    },
    mounted() {
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
      let moneystyle = document.getElementById("makeInvioceMoney").innerHTML
      let newArray = moneystyle.split('.')
      this.invoiceMoney = newArray[0]
      this.invoiceFinallTwo = newArray [1]
    },
    watch:{
    }
  }
</script>
<style lang="less" scoped>
  #Invoice{
    .openInvoice{
      margin-left: 28px;
      img{
        vertical-align: middle;
      }
      .total{
        display: inline-block;
        line-height: 20px;
        font-size: 14px;
        position: absolute;
        margin-top: 4px;
        margin-left:5px;
      }
      .moneyStyle{
        color: #1168e1;
        .invoiceMoney{
          margin-left:20px;
          font-size: 36px;
        }
        .invoiceFinallTwo{

        }
      }
      .invoice_money{
        padding-top: 15px;
      }
      .money_condition{
        padding-top: 20px;
        margin-left:20px;
        span{
          font-size: 14px;
        }
      }
    }
    .make_invoice{
      span{
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        font-size:14px;
        color: #333;
      }
    }
  }
</style>
<style lang="less">
  #Invoice{
    .el-form-item__content{
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
    .el-alert__icon{
      width:32px;
      font-size: 32px;
    }
    .el-alert__content{
      margin-top: -20px;
    }
    .el-alert{
      padding: 18px 16px;
    }
  }
</style>

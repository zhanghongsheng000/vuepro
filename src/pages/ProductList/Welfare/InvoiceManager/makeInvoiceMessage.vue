<template>
    <div id="makeInvoiceMessage">
      <div style="padding-top: 30px;">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">填写发票信息</span>
        </div>
      </div>
      <div class="back">
        <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
        <span style="margin-left:20px;font-size:15px;">开发票</span>
      </div>
      <div class="stpe">
        <div class="partOne">
          <span class="num">1</span><span class="title">填写开发票的金额</span>
        </div>
        <div class="moneynum">
          <span>开发票金额</span>
          <el-input v-model="amount" placeholder="请输入金额"></el-input>
          <span>元</span>
        </div>
        <div class="partOne">
          <span class="num">2</span><span class="title">选择发票抬头</span>
        </div>
        <div class="moneynum">
          <el-select v-model="typeValue" placeholder="请选择发票类型" @change="changeType">
            <el-option
              v-for="item in invoiceTypeList"
              :key="item.typeValue"
              :label="item.typeName"
              :value="item.typeValue">
            </el-option>
          </el-select>
          <el-select v-model="invoiceTitleId" placeholder="请选择发票抬头">
            <el-option
              v-for="item in invoiceTitleList"
              :key="item.invoiceTitleId"
              :label="item.invoiceTitle"
              :value="item.invoiceTitleId">
            </el-option>
          </el-select>
        </div>
        <div class="partOne">
          <span class="num">3</span><span class="title">选择收货地址</span>
        </div>
        <div class="moneynum">
          <el-select v-model="shopAddressId" placeholder="选择收货地址">
            <el-option
              v-for="item in getAddressList"
              :key="item.shopAddressId"
              :label="item.label"
              :value="item.shopAddressId">
            </el-option>
          </el-select>
          <span v-if="getAddressList == ''|| getAddressList == null" style="color: #0f71ca;margin-left: 5px" @click="addAddress">还没有收货地址，去新增收货地址</span>
        </div>
      </div>
      <el-button type="primary"  @click="sureMakeInvoice" style="margin-left: 60px">开发票</el-button>
    </div>
</template>
<script>
    export default {
      data(){
        return{
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          amount:'',
          typeValue:'',//发票类型
          invoiceTitleId:'',//发票抬头
          shopAddressId:'',//收货地址
          invoiceTypeList:[],//发票类型列表
          invoiceTitleList:[],//发票抬头列表 里面的字段不确定
          getAddressList:[],//收货地址列表
        }
      },
      methods:{
        getInvoiceType(){
          this.$httpPasser.post('welfareWeb/getInvoiceType',{
          }).then((res)=>{
            this.invoiceTypeList = res.data.result;
          })
        },
        changeType(){
          this.invoiceTitleList =[]
          this.invoiceTitleId = ''
          this.getInvoiceTitleList()
        },
        getInvoiceTitleList(){//获取发票列表
          this.$httpPasser.post("welfareWeb/getInvoiceTitleList",{
            shopId:this.shopId,
            type:this.invoiceTitleId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.invoiceTitleList = res.data.result.list
            }else if(res.data.resultCode == "204"){
              this.invoiceTitleList = []
            }else{
              this.$message.error(res.data.resultCodeDesc)
            }
          })
        },
        getAddress(){
          this.$httpPasser.post("welfareWeb/getAddressList",{
            shopId:this.shopId,
          }).then((res)=>{
            if(res.data.resultCode == "200"){
              this.getAddressList = res.data.result
              for(let o in this.getAddressList){
                this.getAddressList[o].label = this.getAddressList[o].address+ ' ' +  this.getAddressList[o].addressee + ' ' +this.getAddressList[o].telephone
              }
            }else if(res.data.resultCode == "204"){
              this.getAddressList = [];
            }
          })
        },
        sureMakeInvoice(){//开发票
          this.$httpPasser.post("welfareWeb/addInvoice",{
            amount:this.amount,
            invoiceTitleId:this.invoiceTitleId,
            shopAddressId:this.shopAddressId,
            shopId:this.shopId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.$message.success(res.data.resultCodeDesc)
            }else{
              this.$message.error(res.data.resultCodeDesc)
            }
          })
        },

        backHandle(){
            this.$router.push({
              path:'./makeInvoice'
            })
        },
        addAddress(){
          this.$router.push({
            path:"./receivingAddressManager"
          })
        }
      },
      created(){
        this.getInvoiceType()
        this.getAddress()
      }
    }
</script>

<style lang="less" scoped>
  #makeInvoiceMessage{
    .stpe{
      margin-top: 40px;
      margin-left:20px;
      .num{
        display: inline-block;
        padding: 3px 9px;
        background: #2d84fc;
        border-radius: 50%;
        color: #fff;
        margin-right: 10px;
      }
      .title{
        font-size: 14px;
      }
      .moneynum{
        padding:20px 38px;
        span{
          font-size:14px;
        }
      }
    }
  }
</style>
<style lang="less">
  #makeInvoiceMessage{
    .el-input{
      width:150px;
    }
    .el-select{
      .el-input{
        width:220px;
      }
    }
  }
</style>

<template>
  <div id="payRuleConfig">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">消费规则配置</span>
      </div>
    </div>
    <div class="mask-box">
      <div class="entry-cocnt">
        <div class="sitem clearfix">
          <div class="siteml fl">可用日期：</div>
          <div class="sitemr fl">
            国家规定法定工作日
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml fl">可预订期限：</div>
          <div class="sitemr fl">
            <el-input v-model="getResult.bookingDays" placeholder="请输入整数天数" disabled></el-input>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml fl">可购买产品数量限额：</div>
          <div class="sitemr fl">
            每人每天只能购买 <el-input v-model="getResult.perPersonPerDayBuyCount" placeholder="请输入整数" style="width: 110px;"></el-input>个套餐
          </div>
          <span class="red" v-if="ifshowError">请输入整数</span>
        </div>
        <div class="sitem clearfix">
          <div class="siteml  fl">每单限额：</div>
          <div class="sitemr fl">
            <el-input v-model="getResult.staffOrderLimit" placeholder=" 请输入金额（元）"></el-input>
          </div>
          <span class="red" v-if="ifshowErrors">请输入数字</span>
        </div>
        <div class="sitem clearfix">
          <div class="siteml  fl">是否启用：</div>
          <div class="sitemr fl" >
            <el-radio v-model="getResult.status" label="Y">启用</el-radio>
            <el-radio v-model="getResult.status" label="N">停用</el-radio>
          </div>
        </div>
        <el-button  type="primary" @click = "ruleConfig" style="margin-left: 169px">保 存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {$gDownLoad} from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import gUrl from '@/assets/js/gUrl'

  export default {
    data(){
      return{
        shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        getResult:{
          bookingDays:"1",
          perPersonPerDayBuyCount:"",//每人每天可购买商品数
          staffOrderLimit:'',//每天限额
          status:"Y",//停用还是启用
          type:'1',//1为添加 2为编辑
          staffLimitId:'',
        },
        ifshowError:false,
        ifshowErrors:false,
      }
    },
    methods:{

      ruleConfig(){
        if(this.getResult.staffLimitId == '' || this.getResult.staffLimitId == null){
          if(Math.round(this.getResult.perPersonPerDayBuyCount) != this.getResult.perPersonPerDayBuyCount && isNaN(this.getResult.staffOrderLimit) == true){
            this.ifshowError = true
            this.ifshowErrors = true
          }else if(isNaN(this.getResult.staffOrderLimit) == true && Math.round(this.getResult.perPersonPerDayBuyCount) === this.getResult.perPersonPerDayBuyCount){
            this.ifshowError = false
            this.ifshowErrors = true
          }else if(isNaN(this.getResult.staffOrderLimit) != true && Math.round(this.getResult.perPersonPerDayBuyCount) != this.getResult.perPersonPerDayBuyCount){
            this.ifshowError = true
            this.ifshowErrors = false
          }else{
            this.ifshowError = false
            this.ifshowErrors = false
            this.getResult.type = 1
            this.$httpPasser.post("welfareWeb/saveStaffLimit",{
              bookingDays:this.getResult.bookingDays,
              perPersonPerDayBuyCount:this.getResult.perPersonPerDayBuyCount,
              staffOrderLimit:this.getResult.staffOrderLimit,
              shopId:this.shopId,
              status:this.getResult.status,
              type:this.getResult.type,
              staffLimitId:this.getResult.staffLimitId,
            }).then((res)=>{
              if(res.data.resultCode == "200"){
                this.$message.success("配置成功")
              } else{
                this.$message.error(res.data.resultCodeDesc)
              }
            })
          }
        }else{
          this.getResult.type = 2

          if(Math.round(this.getResult.perPersonPerDayBuyCount) != this.getResult.perPersonPerDayBuyCount && isNaN(this.getResult.staffOrderLimit) == true){
            this.ifshowError = true
            this.ifshowErrors = true
          }else if(isNaN(this.getResult.staffOrderLimit) == true && Math.round(this.getResult.perPersonPerDayBuyCount) === this.getResult.perPersonPerDayBuyCount){
            this.ifshowError = false
            this.ifshowErrors = true
          }else if(isNaN(this.getResult.staffOrderLimit) != true && Math.round(this.getResult.perPersonPerDayBuyCount) != this.getResult.perPersonPerDayBuyCount){
            this.ifshowError = true
            this.ifshowErrors = false
          }
          else{
            this.ifshowError = false
            this.ifshowErrors = false
            this.$httpPasser.post("welfareWeb/saveStaffLimit",{
            bookingDays:this.getResult.bookingDays,
            perPersonPerDayBuyCount:this.getResult.perPersonPerDayBuyCount,
            staffOrderLimit:this.getResult.staffOrderLimit,
            shopId:this.shopId,
            status:this.getResult.status,
            type:this.getResult.type,
            staffLimitId:this.getResult.staffLimitId,
          }).then((res)=>{
            if(res.data.resultCode == "200"){
                this.$message.success("配置成功")
            } else{
                this.$message.error(res.data.resultCodeDesc)
            }
          })
          }
        }
      },
      getConfig(){
        this.$httpPasser.post("welfareWeb/getStaffLimit",{
          shopId:this.shopId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.getResult = res.data.result
          }

        })
      }
    },
    created() {
      this.getConfig()
    },
  }
</script>

<style lang="less" scoped>
  #payRuleConfig{
    .entry-cocnt .siteml{
      width: 160px;
      text-align: right;
      margin-right: 10px;
      line-height: 40px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .entry-cocnt .sitemr{
      width: 320px;
      line-height: 40px;
      font-size: 14px;
    }
    .red{
      line-height: 37px;
      font-size: 14px;
      color: #ff0000;
    }
  }
</style>
<style lang="less">
  #payRuleConfig{
    .el-input{
      width:220px;
    }
    .el-select{
      .el-input{
        width:220px;
      }
    }
  }
</style>

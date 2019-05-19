<template>
  <!--<div style="font-size:15px;line-height:35px;color:rgb(165, 170, 179);text-align:center;">
    智能缴费功能正在完善，敬请期待！
  </div>-->
  <div id="PasserProductIntroduce">
    <div class="pageTitle">
      <div class="passenger_container">
        <div class="passenger">
          <h2>什么是智能缴费?</h2>
          <div class="clear20"></div>
          <p>
            智能缴费是一款辅助物业公司对写字楼房间产生的水、电、暖、气和物业费实现代收代付的软件系统。针对特定时间段内写字楼房间产生相应的费用，物业管理人员通过系统发布缴费公告，并将缴费信息清晰准确的推送给房间的房东和租客，房东或租客通过银行卡网上缴费，缴费完毕后生成电子收款收据和缴费记录。系统即时完成费用汇总并形成缴费记录和欠费记录清单。
          </p>
        </div>
        <div style="text-indent:80px;">
          <el-button round type="primary" @click="openBreakfast">立刻开通</el-button>
        </div>
        <div class="clear20"></div>
      </div>

    </div>
    <div class="">

    </div>
  </div>
</template>

<script>
  export default {
    name: "passer",
    data() {
      return {
        openParams: {
          shopId: this.$local.sefetch('info').companyId,
          customerUserId: this.$local.sefetch('info').userId,
          userId: this.$local.sefetch('info').userId
        },
        info:this.$local.sefetch('info')?this.$local.sefetch('info'):{},
        productPath:this.$route.query.productRouter
      }
    },
    methods: {
      //获取产品列表接口
      getProductList(callBack) {
        this.$httpPasser.get('production/selectProdutionBycompanyId',
          {params:
              {
                companyId:this.openParams.shopId,
                customerUserId:this.openParams.customerUserId
              }
          }

        ).then((res) => {
          if(res.data.resultCode == 200) {
            this.productList = res.data.result;
            if(callBack){
              callBack(res.data)
            }
          }
        }).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      openBreakfast() {
        this.$httpPasser.get(
          'orderStatisticsController/openBreakfast',
          {params:this.openParams}
        ).then(
          res=>{
            if(res.data.resultCode == 200) {
              this.$message.success(res.data.resultCodeDesc)
              this.getProductList((data)=>{
                let roleList = data.result.userRoleList;
                delete this.info.roleList;
                this.info.roleList = roleList;
                this.$local.sesave('info',this.info)
                this.$router.push({path:this.productPath})
              })
            } else if(res.data.resultCode == 204) {
              this.$message.warning(res.data.resultCodeDesc)
              // alert(this.productPath)
              this.$router.push({path:this.productPath})
            }
          }
        ).catch(
          (err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          }
        )
      }
    },
    created(){
      console.log(this.productPath)
    }
  }
</script>

<style  lang="less" scoped>
  #PasserProductIntroduce{
    min-height:650px;
    width:100%;
    background: url(../../../assets/images/public/PaymentProperty_bg.png) no-repeat;
    /*background-position: 275px -24px;*/
    .passenger_container {
      width: 100%;
      .passenger {
        width: 708px;
        min-height: 300px;
        background-size: 708px;
        padding-left: 80px;
        h2 {
          line-height: 80px;
          height:80px;
          font-size:45px;
          font-weight:normal;
        }
        p {
          line-height: 30px;
          font-size:14px;
          width: 400px;
          text-indent: 2em;
        }
        button {
          margin-top: 80px;
          margin-left: 10px;
          background: #1168E1;
          color: #FFFFFF;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
        }
      }
    }
  }

</style>


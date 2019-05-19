<template>
  <div id="PasserProductIntroduce">
    <div class="pageTitle">
      <div class="passenger_container">
        <div class="passenger">
          <h2>什么是早餐颂?</h2>
          <div class="clear20"></div>
          <p>
            早餐颂是河南居金所房地产营销策划有限公司开发的一款针对写字楼白领通过手机APP下单订购早餐，
            利用物联网技术，在办公楼下10秒扫码取餐的一款互联网产品。
            物业公司为写字楼安装电子设备，订餐人员通过下载早餐颂APP，进行下单订购早餐，第二天扫码取餐。
            从而实现白领每天上班有早餐元气满满开启一天工作，再也不用为早起做早餐，排队买早餐而发愁。
            一键下单，10秒取餐，一周无忧。
            早餐颂致力于成为中国最大品种最丰富的早餐外卖平台，早餐不将就就选早餐颂。
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
    background: url(../../../assets/images/public/breakfast_produce.png) no-repeat;
    background-position: 275px -24px;
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

<template>
  <div id="PasserProductIntroduce">
    <div class="pageTitle">
      <div class="passenger_container">
        <div class="passenger">
          <h2>什么是福利社?</h2>
          <div class="clear20"></div>
          <p>
            福利社是一款精良的产品
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
          'welfareWeb/openWelfare',
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

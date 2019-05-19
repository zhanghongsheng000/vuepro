<template>
	<div id="PasserProductIntroduce">
		<div class="pageTitle">
			<div class="passenger_container">
				<div class="passenger">
					<h2>什么是通行客?</h2>
          <div class="clear20"></div>
					<p>通行客是基于物联网技术实现高效通行和安全通行的一款互联网产品，是人员通行的电子通行证。其中商务写字楼通行是产品的一个重要场景。 物业公司为写字楼安装电子闸机，通行人员下载通行客APP，进行实名认证后生成二维码电子钥匙，在闸机刷码即可打开写字楼闸机通行。通行客实现物业对写字楼的高效化和精准化管理。通行客-为安全高效通行而生。
					</p>
				</div>
        <div style="text-indent:80px;">
          <el-button round type="primary" @click="openPasser">立刻开通</el-button>
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
					customerUserId: this.$local.sefetch('info').userId
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
			openPasser() {
        this.$httpPasser.get(
          'production/openPassenger',
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
    background: url(../../../assets/images/index/passenger.png) no-repeat;
    background-position: 377px 215px;
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

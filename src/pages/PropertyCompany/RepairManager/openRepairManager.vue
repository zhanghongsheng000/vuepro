<template>
    <div id="openRepairManager">
        <div class="openRepairManager">
          <h1>物业报修管理</h1>
          <p>物业报修管理是居金所推出的方便写字楼物业公司向写字楼企业提供物业报修服务的一款移动互联网产品。
            写字楼企业随时通过通行客APP向物业公司发起报修服务申请，
            物业公司根据报修服务申请内容将维修任务分配给相关物业员工，物业员工上门为企业提供维修服务，
            并通过系统自动生成报修费用，写字楼企业在维修服务完成后通过通行客APP支付维修服务费用，
            并对服务进行评价。物业报修管理产品全程电子化控制报修服务，提高报修服务质量，提升报修效率，把控维修过程，自动核算报修费用，为物业提过新的服务渠道和盈利点，是实现物业多经营的一项重要措施。</p>
          <div class="btn">
            <el-button type="primary" round @click="openProduct">立即开通</el-button>
          </div>

        </div>
    </div>
</template>

<script>
  import gUrl from '@/assets/js/gUrl'

  export default {
    data() {
      return{

      }
    },
    methods: {
      openProduct(){
        this.$httpPasser.post("production/openRepair",{
          shopId:this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success(res.data.result)
          }else{
            this.$message.error(res.data.result)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped >
    #openRepairManager{
      width:1040px;
      height:700px;
      background:url("../../../assets/img/repair/baoxiu.png") ;
      background-size:370px 693px ;
      background-repeat: no-repeat;
      background-position: right bottom;
      .openRepairManager{
        padding-left: 60px;
        h1{
          padding-top: 60px;
          font-size: 48px;
          font-weight: normal;
        }
        p{
          margin-top: 50px;
          font-size: 14px;
          width: 570px;
          line-height: 25px;
        }
        .btn{
          padding-top: 40px;
        }
      }
    }
</style>


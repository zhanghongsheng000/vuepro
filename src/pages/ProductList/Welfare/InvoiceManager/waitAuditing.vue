<template>
  <div id="waitAuditing">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">企业资质认证</span>
      </div>
    </div>
    <div class="back">
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
      <!--<span style="margin-left:20px;font-size:15px;">提交资料</span>-->
    </div>
    <div v-if="Message.status == 'W'">
      <el-steps :active="2" align-center>
        <el-step title="提交资料" :description = Message.applyTime ></el-step>
        <el-step title="等待审核" description="3个工作日内审核完成"></el-step>
        <el-step title="通知结果" description="结果将发送至提交者手机"></el-step>
      </el-steps>
    </div>
    <div class="Message">
      <ul>
        <li>
          <span>公司名称:</span> <span>{{Message.shopName}}</span>
        </li>
        <li>
          <span>营业执照:</span>
          <span style="display: inline-block;width: 200px;height: 300px;">
            <img :src="gImgUrl+Message.path" alt="" style="width: 100%;height: 100%;">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import getUrl from '@/assets/js/global'
  import gUrl from '@/assets/js/gUrl'

  export default {
    data() {
      return {
        shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        gImgUrl: "",
        Message:{
          shopName: "", //企业名称
          path:'',
          getInTime:'',
          applyTime:'',
          status:''
        }
      }
    },
    methods: {
      getCertificationDetail(){
        this.$httpPasser.post('welfareWeb/getCertificationDetail', {
          shopId: this.shopId
        }).then(
          res => {
            if(res.data.resultCode == 200) {
              this.Message = res.data.result;
              console.log(this.Message)
            } else {
              this.$message.error(res.data.resultCodeDesc)
            }
          }
        ).catch(
          (err) => {
            this.$message.error(err)
          }
        )
      },
      backHandle(){
//        this.$router.back()
        this.$router.push({
          path:'./makeInvoice'
        })
      }
    },
    created() {
      this.getCertificationDetail()
    },
    mounted() {
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    }
  }
</script>
<style lang="less" scoped>
  #waitAuditing{
    .Message{
      ul {
        li {
          clear: both;
          line-height: 32px;
          font-size: 14px;
          span:first-child {
            display: inline-block;
            width: 150px;
            text-align: right;
            margin-right: 10px;
            float: left;
          }
          span:last-child {
            display: inline-block;
            text-align: left;
            margin-left: 10px;
            float: left;
            width: 620px;
          }
        }
      }
    }
  }

</style>

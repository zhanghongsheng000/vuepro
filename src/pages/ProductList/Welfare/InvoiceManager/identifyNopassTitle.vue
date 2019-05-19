<template>
  <div id="identifyNopassTitle">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">重新补充资质</span>
      </div>
    </div>
    <el-alert
      title="认证未通过"
      type="error"
      show-icon
      :closable="false"
    >
    </el-alert>
    <div class="NopassReason">
      未通过原因：请提供清楚的营业执照复印件并加盖清楚的企业公章（红色）
    </div>
    <div class="Message">
      <el-form>
        <el-form-item label="发票抬头">
          <el-input placeholder="" v-model="Message.shopName" disabled></el-input>
        </el-form-item>
        <el-form-item label="营业执照" >
          <div class="item-ipt fl" id="addrent">
            <el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :limit="1" :on-success="peripheryPicDelete" :show-file-list="false">
              <img v-if="Message.path" :src="gImgUrl+Message.path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="clearfix"></div>
          <span class="red">请重新上传复印件图片</span>
          <div class="request">
            <span>请上传[营业执照]的扫描复印件或照片</span>
            <span>支持.jpg .jpeg格式,图片限制是10M</span>
            <span class="red">仅支持上传复印件，复印件需加盖红色公章</span>
            <span>资质图片需要清晰可见，并承诺资料真实有效</span>
          </div>
          <el-button size="mini" type="primary" @click = "checkPhoto">查看示例</el-button>
        </el-form-item>
        <el-button  type="primary" @click = "setIn" style="margin-left: 68px">提交</el-button>
      </el-form>
      <el-dialog
        title="示例"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
      >
        <div class="inputstyle">
          <img src="../../../../assets/img/Welfare/template.png" style="width: 300px;height: 500px;">
        </div>
      </el-dialog>
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
        gImgUrl: "",
        Message:{
          shopName: this.$route.query.invoiceTitle, //企业名称
          path:'',

        },
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        dialogVisible:false,
        upLoadData: { //图片上传参数
          file: '',
          type: 'company',
          objectId: 0
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
      //图片上传之前限制
      beforeAvatarUpload(file) { //图片上传之前限制
        this.upLoadData.file = file
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10
        if(!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if(!isLt10M) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return(isJPG || isPNG) && isLt10M;
      },
      peripheryPicDelete(response, file, fileList) { //营业执照上传成功回调方法
        if(response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          //this.currentRow.licensePicture = URL.createObjectURL(file.raw);
          this.Message.path = response.result;
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      checkPhoto(){
        this.dialogVisible = true
      },
      setIn(){
        if(this.Message.shopName == ''){
          this.$message.error("请输入公司名称")
        }else if(this.Message.path==""){
          this.$message.error("请上传营业执照照片")
        }else{
          this.$httpPasser.post("welfareWeb/certificate",{
            imgUrl:this.Message.path,
            shopId:this.shopId,
            shopName:this.Message.shopName
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.$router.push({
                path:'./waitAuditing'
              })
            }else{
              this.$message.error(res.data.resultCodeDesc)
            }
          })
        }
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
  #identifyNopassTitle{
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
      margin-left: 146px;
      margin-top: 40px;
      .request{
        width:300px;
      }
      span{
        display: block;
        color: #999;
        line-height: 30px;
      }
    }
    .el-form-item{
      width:600px;
    }
    .red{
      color: #ff0011 !important;
    }
    .inputstyle{
      img{
        width:120px;
        height:200px;
      }
    }
    .NopassReason{
      font-size: 13px;
      line-height: 18px;
      color: #f56c6c;
      position: relative;
      margin-top: -30px;
      margin-left: 55px;
    }
  }
</style>
<style lang="less">
  #identifyNopassTitle{
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

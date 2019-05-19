<template>
  <div id="companyIdentify">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">企业资质认证</span>
      </div>
    </div>
    <div class="back">
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">开发票</span>
    </div>
    <el-steps :active="1" align-center>
      <el-step title="提交资料"></el-step>
      <el-step title="等待审核"></el-step>
      <el-step title="通知结果"></el-step>
    </el-steps>
    <div class="Message">
      <el-form>
        <el-form-item label="公司名称">
          <el-input placeholder="公司名称" v-model="Message.shopName" clearable></el-input>
          <div class="request">
            <span>请填写证件上的企业名称或机构名称</span>
          </div>
        </el-form-item>
        <el-form-item label="营业执照" >
          <div class="item-ipt fl" id="addrent">
            <el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload"  :on-success="peripheryPicDelete" :show-file-list="false">
              <img v-if="Message.path" :src="gImgUrl+Message.path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="clearfix"></div>
          <div class="request">
            <span>请上传[营业执照]的扫描复印件的照片</span>
            <span>支持.jpg .png格式,图片限制是10M</span>
            <span class="red">仅支持上传复印件，复印件需加盖红色公章</span>
            <span>资质图片需要清晰可见，并承诺资料真实有效</span>
          </div>
          <el-button size="mini" type="primary" @click = "checkPhoto">查看示例</el-button>
        </el-form-item>
        <el-button  type="primary" @click = "setIn" style="margin-left: 68px;">提交</el-button>
      </el-form>
      <el-dialog
        title="示例"
        :visible.sync="dialogVisible"
        width="600px"
        :modal-append-to-body='false'
      >
        <div class="inputstyle" style="text-align: center">
          <!--<img src="../../../assets/img/passenger/banner_title.png" />-->
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
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        Message:{
          shopName: "", //企业名称
          path:'',
        },
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
            } else {

            }
          }
        ).catch(
          (err) => {
            this.$message.error(err)
          }
        )
      },
      backHandle(){
        this.$router.push({
          path:'./makeInvoice'
        })
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
  #companyIdentify{
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
  }
</style>
<style lang="less">
  #companyIdentify{
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
  }
</style>

<template>
  <div id="supplyQualifice">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">补充资质</span>
      </div>
    </div>
    <div class="back">
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
      <!--<span style="margin-left:20px;font-size:15px;">开发票</span>-->
    </div>
    <div class="Message">
      <span class="red">"{{Message.shopName}}"发票抬头需补充资质，审核通过后可使用</span>
      <el-form>
        <el-form-item>

        </el-form-item>
        <el-form-item label="营业执照" >
          <div class="item-ipt fl" id="addrent">
            <el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData"
                       :beforeUpload="beforeAvatarUpload"
                       :on-success="peripheryPicDelete" :show-file-list="false" :on-remove="handleRemove">
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
        <el-button  type="primary" @click = "setIn" style="margin-left: 68px">提交</el-button>
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
        company:'公司名称',
        gImgUrl: "",
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        Message:{
          shopName: this.$route.query.invoiceTitle, //企业名称
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
      backHandle(){
//      this.$router.back();
				this.$router.push({
					path:'./invoiceRiseManager'
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
      handleRemove(){
        console.log(1111)
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
        this.$httpPasser.post("welfareWeb/certificate",{
          imgUrl:this.Message.path,
          shopId:this.shopId,
          shopName:this.Message.shopName
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success(res.data.resultCodeDesc)
          }else{
            this.$message.error(res.data.resultCodeDesc)
          }
        })
      }
    },
    created() {

    },
    mounted() {
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    }
  }
</script>
<style lang="less" scoped>
  #supplyQualifice{
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
      position: absolute;
      margin-top: -33px;
      margin-left: 55px;
    }
  }
</style>
<style lang="less">
  #supplyQualifice{
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

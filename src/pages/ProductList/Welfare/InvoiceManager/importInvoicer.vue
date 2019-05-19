<template>
  <div id="importInvoicer">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">批量导入发票抬头</span>
      </div>
    </div>
    <div class="back">
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">开发票</span>
    </div>
    <div class="stpe">
      <div class="partOne">
        <span class="num">1</span><span class="title">下载模板，批量填写发票抬头</span>
      </div>
      <div class="moneynum">
        <a :href="downloadExcelUrl" >
          <el-button slot="trigger"  type="primary" style="margin-right: 10px">Excel模板下载</el-button>
        </a>
      </div>
      <div class="partOne">
        <span class="num">2</span><span class="title">上传填写好的发票抬头列表</span>
      </div>
      <div class="moneynum">
        <el-upload style="float: left;margin-right: 10px"
                   class="upload-demo"
                   :action="gUrl+'upload/uploadExcel'"
                   :show-file-list="isShowFile"
                   :on-success="handleUploadSuccess"
                   :beforeUpload="beforeAvatarUpload"
                   :file-list="fileList">
          <el-button  type="primary"  @click="getCurrentIndex()">选择附件</el-button>
        </el-upload>
        <el-button type="primary"  @click="uploadICcardList">上传到服务器</el-button>
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
        downloadExcelUrl: $gDownLoad + '导入IC卡模板.xlsx',
        isShowFile:false,
        gUrl:gUrl,
        fileList: [],
        icCardListPath:'',
        invoicetype:'',//发票类型
        invoicetype1:'',//发票抬头
        address:'',//收货地址
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },
    methods:{
      backHandle(){
        this.$router.back()
      },
      //文件上傳前的鉤子
      beforeAvatarUpload(file){
        {
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
          const extension = testmsg === 'xls'
          const extension2 = testmsg === 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 100
          if(!extension && !extension2) {
            this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
            });
          }
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
          }
          return extension || extension2 && isLt2M
        }
      },
      //上传文件成功钩子
      handleUploadSuccess(response,fileList){
        let path = response.result
        this.icCardListPath = path;
        //this.tableData.tableData[this.currentIndex]['path'] = path;
        this.$message.success('添加成功')
      },
      uploadICcardList(){//导入IC卡
        this.$httpPasser.post("excel/importICCard",{
          grantUserId:this.grantUserId,
          path:this.icCardListPath,
          shopId:this.shopId,
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success(res.data.result)
          }else{
            this.$message.error(res.data.resultCodeDesc)
          }

        })
      },
    }
  }
</script>

<style lang="less" scoped>
  #importInvoicer{
    .stpe{
      margin-top: 40px;
      margin-left:20px;
      .num{
        display: inline-block;
        padding: 3px 9px;
        background: #409EFF;
        border-radius: 50%;
        color: #fff;
        margin-right: 10px;
      }
      .title{
        font-size: 14px;
      }
      .moneynum{
        padding:20px 38px;
        span{
          font-size:14px;
        }
      }
    }
  }
</style>
<style lang="less">
  #importInvoicer{
    .el-input{
      width:150px;
    }
    .el-select{
      .el-input{
        width:220px;
      }
    }
  }
</style>

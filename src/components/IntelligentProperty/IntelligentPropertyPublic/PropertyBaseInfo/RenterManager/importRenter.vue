<template>
  <div class="mainPart importRenter">
    <div class="downLoadTemplate">
      <a :href="downloadExcelUrl"><el-button slot="trigger" size="small" type="primary">Excel模板下载</el-button></a>
    </div>

    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :on-remove="handleRemove"
      :on-change="handleOnChange"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :data="type"
      name="file"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" :disabled="isCanUpload"  type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件</div>
    </el-upload>
  </div>


</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  export default {
    data(){
      return{
        currentName:"导入房东",
        action:gUrl+'business/importExcel',
        //产品ID
        productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
        fileList: [],
        type:{
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          type:2,
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
        },
        downloadExcelUrl:gUrl+'business/exportExcel?companyId='+this.$local.sefetch('info').companyId+'&type='+'2'
      }
    },
    computed:{
      isCanUpload:function(){
        let flag = true;
        if(this.fileList.length>0){
          flag = false;
        }
        return flag;
      }
    },
    methods: {
      submitUpload() {
        let checkType = true;
        let illegalSuffix = '';
        for(let o in this.fileList){
          let temp = this.fileList[o].name.split('.')
          if(temp[temp.length-1]!=='xls' && temp[temp.length-1]!=='xlsx'){
            checkType = false;
            illegalSuffix = temp[temp.length-1];
          }
        }
        if(!checkType){
          this.$message.error('您选择了错误的文件格式（.'+illegalSuffix+'），只能上传.xls/.xlsx文件')
        }
        else{
          this.$refs.upload.submit();
        }
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      //上传成功
      handleSuccess(reponse){
        this.$message.success(reponse.data)
      },
      //上传失败
      handleError(err){
        this.$message.error(err)
      },
      //更改上传文件时的钩子
      handleOnChange(file,fileList){
        this.fileList = fileList;
      }
    },
    created:function(){
      //根据产品ID修改当前导入租客调用的地址
      if(this.productId=='5'){
        this.action = gUrl+'business/importExcel';
      }
      else if(this.productId=='6'){
        this.action = $gPasserUrl+'business/importExcel';
      }
    }
  }
</script>

<style scoped lang="less">
  .importRenter{
    width:500px;
    .downLoadTemplate{
      float:left;
      margin-right:20px;
    }
    padding-bottom:50px;
  }
</style>
<style lang="less">
  .importRenter{
    .el-upload__tip{
      float: right;
      color: #0a36e8;
    }

  }
</style>

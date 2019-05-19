<template>
  <div id="importBuildingGroup">
    <div style="padding-top:30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">导入楼盘</span>
      </div>
    </div>
    <div class="downLoadTemplate">
      <a :href="downloadExcelUrl"><el-button slot="trigger" size="small" type="primary">Excel模板下载</el-button></a>
    </div>
		<div class="downLoadTemplate">
      <a :href="actions + 'business/exportRoom?companyId=' + type.shopId" class="primary"><el-button slot="trigger" size="small" type="primary">楼盘数据下载</el-button></a>
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :headers="uploadHead"
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
    <div style="height:2px;clear:both;"></div>
    <div class="tipDiv">
      <div class="tipHead"><h5>注意事项</h5></div>
      <div class="tipContent">
        <ul class="tipUl">
          <li>一.请严格按照样例数据格式填写</li>
          <li>二.【房间面积】为非必填字段。其他字段必须填写</li>
          <li>三.按照模板填写导入数据后，请删除样例数据</li>
        </ul>
      </div>
    </div>
  </div>


</template>

<script>
  import gUrl from '@/assets/js/gUrl'

  import {$gPasserUrl} from '@/assets/js/gUrl'
  import {$gDownLoad} from '@/assets/js/gUrl'
  export default {
    data(){
      return{
        currentName:"导入楼盘",
        action:$gPasserUrl+'buildingRoom/importBuilding',
        actions:'',
        //产品ID
        fileList: [],
        type:{
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        },
        downloadExcelUrl:$gDownLoad+'XX物业写字楼统计表样例.xls',
        //上传头部
        uploadHead:{'token':this.$local.sefetch('info')?this.$local.sefetch('info').token:''}
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
    created() {
        this.actions = $gPasserUrl;
//			this.actions = "http://txkapi.jiatob.com/";
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
      	if(reponse.resultCode == "200"){
      		this.$message.success(reponse.resultCodeDesc)
      	}else if(reponse.resultCode == "204"){
      		this.$message.success(reponse.resultCodeDesc)
      	}else{
      		this.$message.error(reponse.resultCodeDesc)
      	}

      },
      //上传失败
      handleError(err){
        this.$message.error(err)
      },
      //更改上传文件时的钩子
      handleOnChange(file,fileList){
        this.fileList = fileList;
      }
    }
  }
</script>

<style scoped lang="less">
  #importBuildingGroup{
    .downLoadTemplate{
      float:left;
      margin-right:20px;
    }
    padding-bottom:50px;
  }
</style>
<style lang="less">
  #importBuildingGroup{
    .el-upload-list::before {
      content:'';
      display:block;
      width:100%;
      height:1px;
      clear:both;
    }
    .el-upload__tip{
      float:left;
      margin-left:15px;
      color: #0a36e8;
    }
    .el-button{
      float:left;
    }
    .el-upload{
      float:left;
    }
    .tipDiv{
      width:500px;
      margin-top:15px;
      /*background-color:#ececec38;*/
      padding-top:0px;
      padding-bottom:0px;
      border-color:#e7eaec;
      border-style: solid solid solid;
      border-width: 1px 1px 1px;
      .tipHead{
        display: inline-block;
        font-size: 16px;
        color: #676a6c;
        padding-left: 10px;
        padding-right: 10px;
        font-weight:bold;
        padding:14px 20px 0px;
        h5{
          display: inline-block;
          font-size: 14px;
          margin: 0 0 7px;
          padding: 0;
          text-overflow: ellipsis;
          float: left;
        }
      }
      .tipContent{
        padding: 6px 20px 5px;
        /*border-color: #e7eaec;
        -o-border-image: none;
        border-image: none;
        border-style: solid solid none;
        border-width: 1px 0;*/
        .tipUl{
          li{
            text-indent:10px;
            font-size:14px;
            height:45px;
            border-radius:5px;
            border:solid 1px #bce8f1;
            background-color: rgb(217, 237, 247);
            line-height:45px;
            color: #31708f;
            margin-bottom: 15px;
          }
        }
      }

    }


  }
</style>

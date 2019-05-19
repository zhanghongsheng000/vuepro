<template>
  <div class="mainPart importRenter">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text">导入员工</span>
    </div>
    <div class="downLoadTemplate">
      <a :href="downloadExcelUrl">
        <el-button slot="trigger" size="small" type="primary">Excel模板下载</el-button>
      </a>
    </div>

    <el-upload style="float: left;"
      class="upload-demo"
      ref="upload"
      :action="action"
      :on-remove="handleRemove"
      :on-change="handleOnChange"
      :file-list="fileList"
      :headers="uploadHead"
      :on-success="handleSuccess"
      :on-error="handleError"
      :data="type"
      name="file"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" :disabled="isCanUpload" type="success" @click="submitUpload">
        上传到服务器
      </el-button>
      <!--<div style="clear: both;"></div>-->
    </el-upload>
    <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件</div>
    <el-dialog
      title="导入失败的员工"
      :visible.sync="dialogVisible"
      width="45%">
      <el-table
        :data="importResult"
        style="width: 100%">
        <el-table-column prop="department" label="部门" width="70"></el-table-column>
        <el-table-column prop="code" label="工号" width="70"></el-table-column>
        <el-table-column prop="name" width="70" label="姓名"></el-table-column>
        <el-table-column prop="sex" width="50" label="性别" header-align="left"></el-table-column>
        <el-table-column prop="position" width="50" label="职位"></el-table-column>
        <el-table-column prop="entryTime" label="入职时间" width="110"></el-table-column>
        <el-table-column prop="workTime" label="转正时间" width="110"></el-table-column>
        <el-table-column prop="telphohe" label="手机号码" width="112"></el-table-column>
        <el-table-column prop="idCode" label="身份证号码"></el-table-column>
        <el-table-column prop="errMsg" label="错误原因"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import {$gDownLoad} from '@/assets/js/gUrl'
  export default {
    data() {
      return {
        currentName: "导入员工",
        action: $gPasserUrl + 'employee/importEmployee',
        //产品ID
        productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
        fileList: [],
        type: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          /*  type:2,
            productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',*/
        },
        downloadExcelUrl: $gDownLoad + '员工表.xls',
        importResult: [],
        dialogVisible:false,
        //上传头部
        uploadHead:{'token':this.$local.sefetch('info')?this.$local.sefetch('info').token:''}
      }
    },
    computed: {
      isCanUpload: function () {
        let flag = true;
        if (this.fileList.length > 0) {
          flag = false;
        }
        return flag;
      }
    },
    methods: {
      submitUpload() {
        let checkType = true;
        let illegalSuffix = '';
        for (let o in this.fileList) {
          let temp = this.fileList[o].name.split('.')
          if (temp[temp.length - 1] !== 'xls' && temp[temp.length - 1] !== 'xlsx') {
            checkType = false;
            illegalSuffix = temp[temp.length - 1];
          }
        }
        if (!checkType) {
          this.$message.error('您选择了错误的文件格式（.' + illegalSuffix + '），只能上传.xls/.xlsx文件')
        }
        else {
          this.$refs.upload.submit();
        }
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      //上传成功
      handleSuccess(reponse) {
        if (reponse.result!=null || reponse.result.length>0) {
          this.importResult = [];
          let temp = reponse.result;
          for (let o in temp) {
            temp[o].employee.errMsg = temp[o].errMsg;
            this.importResult.push(temp[o].employee);
          }
          this.dialogVisible = true;
        }
        else {
          this.$message.success(reponse.result)
        }
      },
      //上传失败
      handleError(err) {
        this.$message.error(err)
      },
      //更改上传文件时的钩子
      handleOnChange(file, fileList) {
        this.fileList = fileList;
      }
    },
    created: function () {
      //根据产品ID修改当前导入租客调用的地址
      this.action = $gPasserUrl + 'employee/importEmployee';
      /*if(this.productId=='5'){
        this.action = gUrl+'business/importExcel';
      }
      else if(this.productId=='6'){
        this.action = $gPasserUrl+'business/importExcel';
      }*/
    }
  }
</script>

<style scoped lang="less">
  .importRenter {
    .downLoadTemplate {
      float: left;
      margin-right: 20px;
    }
    padding-bottom: 50px;
  }
</style>
<style lang="less">
  .importRenter {
    .el-upload__tip {
      float: left;
      color: #0a36e8;
      margin-left:20px;
    }
  }
</style>

<template>
  <div class="rscont" id="tempPasserCardManager">
    <div class="main-cont">
      <div class="pt50">
        <div class="top-title font14" style="text-align:left;">
          <div class="line"></div>
          <span class="top-text">发放临时通行证</span>
        </div>
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item fl">
              <el-input v-model.trim="searchTempPasserCardParams.employeeName" placeholder="员工姓名" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-input v-model.trim="searchTempPasserCardParams.visitorName" placeholder="访客姓名" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-input v-model.trim="searchTempPasserCardParams.visitorTelphone" placeholder="访客手机号码" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="getTempPasscardList(true)">查询</el-button>
            </div>
            <div class="form-item fr">
            </div>
          </div>
          <div class="clear20"></div>
          <div class="tables">
            <el-table :data="tempPasserCardInfo.result" style="width: 100%" v-if="tableFlag">
              <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="employeeName" label="员工姓名" width="90"></el-table-column>
              <el-table-column prop="department" label="员工部门" width="90"></el-table-column>
              <el-table-column prop="visitorName" label="访客姓名" width="90"></el-table-column>
              <el-table-column prop="visitorTelphone" width="100" label="访客手机号"></el-table-column>
              <el-table-column prop="visitorCompanyName" label="访客公司"></el-table-column>
              <el-table-column prop="createtime" label="发卡时间"></el-table-column>
              <el-table-column prop="status" label="卡状态"></el-table-column>
            </el-table>
          </div>
          <div class="clear20"></div>
          <div class="clearfix">
            <div class="pages fl">
              <el-pagination background layout="prev, pager, next" :page-count="tempPasserCardInfo.pageTotal" @current-change="pagesChange"></el-pagination>
            </div>
            <div class="fl pagestyle font12">
              <span>共{{tempPasserCardInfo.pageTotal}}页，当前第{{tempPasserCardInfo.pageIndex}}页,每页{{tempPasserCardInfo.pageSize}}条，共{{tempPasserCardInfo.totalRecord}}条</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-box" >
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableFlag:true,
        searchTempPasserCardParams:{
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          pageIndex:1,
          pageSize:30,
          employeeName:'',
          visitorName:'',
          visitorTelphone:''
        },
        tempPasserCardInfo:{
          pageTotal:0,
          pageIndex:0,
          pageSize:30,
          totalRecord:0,
          result:[]
        }
      }
    },
    methods: {
      indexMethod(index) {//编号
        return (this.tempPasserCardInfo.pageIndex-1)*30 + 1 + index;
      },
      getTempPasscardList(reflag){
        if(reflag){
          this.searchTempPasserCardParams.pageIndex = 0;
        }
        this._httpPasser(
          'temporaryPasser/getTempPasscardList',
          'get',
          this.searchTempPasserCardParams,
          (res)=>{
            this.tempPasserCardInfo = res;
          },
          true,
          ()=>{
            delete this.tempPasserCardInfo.result;
            this.tableFlag = false;
            this.$nextTick(function(){
              this.tempPasserCardInfo.result = [];
              this.tableFlag = true;
            })

          }
        )
      },
      pagesChange(index) {//分页
        this.searchTempPasserCardParams.pageIndex = index
        this.getTempPasscardList()
      },
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn,callback204) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if(callback204){
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if(callback204){
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }

      }
    },
    watch:{
    },
    computed: {
    },
    created() {
      this.getTempPasscardList();
    },
  }
</script>
<style lang="less" scoped>
  #tempPasserCardManager {
    padding-top: 20px;
    .sex{
      line-height:38px;
    }
    .banner {
      height: 250px;
      background: url("../../../../../assets/img/SalaryManager/ygbanner.png") center center no-repeat;
      .ban-text {
        padding-top: 100px;
        text-align: center;
        color: #fff;
        font-size: 60px;
      }
    }
    .pt50 {
      /* width: 1200px;*/
    }
    .top-title {
      margin-bottom: 20px;
      .line {
        height: 1px;
        background-color: #ccc;
        margin-bottom: -17px;
      }
      .top-text {
        margin-left: 25px;
        font-size: 14px;
        background-color: #fff;
        padding: 0 4px;
        line-height: 30px;
      }
    }
    .main-box {
      .forms-cont {
        padding-bottom: 30px;
        padding-left: 30px;
      }
      .form-item {
        width: 120px;
        margin-right: 15px;
      }
      .btns {
        padding: 20px 20px 20px;
      }
    }
    .entry-cocnt {
      .siteml {
        width: 140px;
        text-align: right;
        margin-right: 10px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .sitemr {
        width: 217px;
      }
    }
    .pagestyle{
      line-height: 30px;
    }
    .usertype{
      margin-top: 10px;
    }
  }
</style>
<style lang="less">
  #tempPasserCardManager{
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
</style>

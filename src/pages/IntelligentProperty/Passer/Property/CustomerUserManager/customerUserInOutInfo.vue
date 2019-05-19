<template>
  <div class="mainPart" id="customerUserInOutInfo">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">出入记录查询</span>
      </div>
    </div>
    <buildingCascader @buildingParam="buildingParam"></buildingCascader>
    <div class="clearfix">
     <div class="fl" style="margin-right:5px;">
       <el-input
         clearable
         v-model="searchCustomerUserInOutParams.shopName"
         placeholder="公司名称">
       </el-input>
     </div>
      <div class="fl">
        <el-date-picker
          v-model="searchCustomerUserInOutParams.beginTime"
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="开始时间"
          default-time="12:00:00">
        </el-date-picker>
        <el-date-picker
          v-model="searchCustomerUserInOutParams.endTime"
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="截止时间"
          default-time="12:00:00">
        </el-date-picker>
        <el-button type="primary" @click="handleSearchCustomerInOut">查询</el-button>
      </div>
    </div>
    <div class="clear20"></div>
    <el-table
      :data="customerUserInOutInfo.customerUserInOutList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号" :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="buildingName"
        label="写字楼名称">
      </el-table-column>
      <el-table-column
        prop="floorName"
        label="楼层">
      </el-table-column>
      <el-table-column
        prop="roomName"
        label="房间">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="departName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="InOrOut"
        label="进出">
      </el-table-column>
      <el-table-column
        prop="doorName"
        label="大门">
      </el-table-column>
      <el-table-column
        prop="passagewayName"
        label="通道">
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="searchCustomerUserInOutParams.pageIndex"
          layout="prev, pager, next"
          :page-count="customerUserInOutInfo.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle font12">
        <span>总共{{this.customerUserInOutInfo.pageTotal}}页,当前第{{this.customerUserInOutInfo.pageIndex}}页，每页30条，共{{this.customerUserInOutInfo.totalRecord}}条</span>
      </div>
    </div>


  </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'
  export default {
    name: "search-customer-user",
    data() {
      return {
        //搜索参数
        searchCustomerUserInOutParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          buildingId: '',
          buildingFloorId: '',
          buildingRoomId: '',
          shopName: '',
          beginTime: '',
          endTime: '',
          pageIndex: 1,
          pageSize: 30
        },
        //出入人员信息
        customerUserInOutInfo: {
          pageIndex:1,//当前第几页
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          isLastPage: 'Y',
          customerUserInOutList: [

          ]
        },
        //日期插件数据
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }],
        }
      }
    },
    components: {
      buildingCascader: buildingCascader
    },
    methods: {
      indexMethod(index) {//编号
        return (this.customerUserInOutInfo.pageIndex - 1)*30 + 1 + index;
      },
      //点击查询钩子方法
      handleSearchCustomerInOut(){
        console.log(this.searchCustomerUserInOutParams)
        this.getPersonByCondition()
      },
      //根据条件查询客户方法
      getPersonByCondition(){
        this._httpPasser(
          'personnelManagement/entryAndExitRecord',
          'get',
          this.searchCustomerUserInOutParams,
          data=>{
            this.customerUserInOutInfo = data;
            this.customerUserInOutInfo.customerUserInOutList = this.customerUserInOutInfo.result;
            this.customerUserInOutInfo.totalRecord = data.totalRecord;
          },
          true,
          ()=>{
            //先删除这个数组，然后再通过$set进行设置，否则很容易似乎VUE无法监听到对象中的数组的清空
            delete(this.customerUserInOutInfo.customerUserInOutList)
            this.$set(this.customerUserInOutInfo,'customerUserInOutList',[])
            this.customerUserInOutInfo.pageTotal = 0;
          }
        )
      },
      /*
        分页部分的方法
        * */
      //点击分页钩子方法
      handleCurrentChange(index) {
        this.searchCustomerUserInOutParams.pageIndex = index;
        this.getPersonByCondition()
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam) {
        if (buildingParam.buildingId) {
          this.searchCustomerUserInOutParams.buildingId = buildingParam.buildingId;
        }
        else{
          this.searchCustomerUserInOutParams.buildingId = "";
        }
        if (buildingParam.buildingFloorId) {
          this.searchCustomerUserInOutParams.buildingFloorId = buildingParam.buildingFloorId
        }
        else{
          this.searchCustomerUserInOutParams.buildingFloorId = "";
        }
        if (buildingParam.buildingRoomId) {
          this.searchCustomerUserInOutParams.buildingRoomId = buildingParam.buildingRoomId
        }
        else{
          this.searchCustomerUserInOutParams.buildingRoomId = "";
        }
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
                    message: data.result ? data.result : data.resultCodeDesc,
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
                  message: data.result ? data.result : data.resultCodeDesc,
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
                    message: data.result ? data.result : data.resultCodeDesc,
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
                  message: data.result ? data.result : data.resultCodeDesc,
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
    created:function(){
      this.getPersonByCondition()
    }
  }
</script>

<style lang="less" scoped>
  #customerUserInOutInfo {
      .pagestyle{
        line-height: 30px;
      }
  }
  /*.top-title {
    margin-bottom: 20px;
    .line {
      height: 1px;
      background-color: #ccc;
      margin-bottom: -17px;
    }
    .top-text {
      margin-left: 25px;
      font-size: 15px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
  }*/
</style>
<style lang="less">
  #customerUserInOutInfo {
    .el-input__inner {
      max-width: 606px;
    }

  }
</style>

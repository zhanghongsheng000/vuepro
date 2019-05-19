<template>
  <div class="mainPart" id="searchCustomerUser">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">人员查询</span>
      </div>
    </div>
    <buildingCascader @buildingParam="buildingParam"></buildingCascader>
    <div class="clearfix">
      <div class="fl" style="margin-right:5px;">
        <el-input
          clearable
          v-model="searchCustomerParams.companyName"
          placeholder="公司名称">
        </el-input>
      </div>
      <div class="fl">
        <el-button type="primary" @click="handleSearchCustomer">查询</el-button>
      </div>
    </div>
    <div class="clear20"></div>
    <el-table
      :data="customerList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"  :index="indexMethod" >
      </el-table-column>
      <el-table-column
        prop="buildingName"
        label="写字楼名称">
      </el-table-column>
      <!-- 20180906修改 -->
      <el-table-column
        type="index"
        label="楼层"
        prop="floorName"
      >
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
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page.sync="searchCustomerParams.pageIndex"
        layout="prev, pager, next"
        :page-count="customerInfo.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle font12">
        <span>总共{{this.customerInfo.pageTotal}}页,当前第{{this.customerInfo.pageIndex}}页，每页30条，共{{this.customerInfo.totalRecord}}条</span>
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
        //多条件搜索人员参数
        searchCustomerParams:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          buildingId:'',
          buildingFloorId:'',
          buildingRoomId:'',
          companyName:'',
          pageIndex:1,
          pageSize:30
        },
        //人员信息
        customerInfo: {
          pageIndex:1,//当前第几页
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          isLastPage:'Y',
          customerList:[

          ]
        },
      }
    },
    components: {
      buildingCascader: buildingCascader
    },
    methods: {
      indexMethod(index) {//编号
        return (this.searchCustomerParams.pageIndex - 1)*30 + 1 + index;
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam) {
        if (buildingParam.buildingId) {
          this.searchCustomerParams.buildingId = buildingParam.buildingId;
        }
        else{
          this.searchCustomerParams.buildingId = "";
        }
        if (buildingParam.buildingFloorId) {
          this.searchCustomerParams.buildingFloorId = buildingParam.buildingFloorId
        }
        else{
          this.searchCustomerParams.buildingFloorId = "";
        }
        if (buildingParam.buildingRoomId) {
          this.searchCustomerParams.buildingRoomId = buildingParam.buildingRoomId
        }
        else{
          this.searchCustomerParams.buildingRoomId = "";
        }
      },
      //根据条件查询按钮钩子
      handleSearchCustomer() {
        this.getPersonByCondition()
      },
      //根据条件查询客户方法
      getPersonByCondition() {//列表
        this._httpPasser(
          'propertyCompany/getPersonByCondition',
          'get',
          this.searchCustomerParams,
          data => {
            this.customerInfo = data;
            this.customerInfo.customerList = [];
            this.customerInfo.totalRecord = data.totalRecord;
            for(let o in this.customerInfo.result){
              this.customerInfo.customerList.push(this.editNullData(this.customerInfo.result[o]))
            }
            console.log(this.customerInfo)

          },
          'true',
          //如果请求数据为空，则清除数据
          ()=>{
            //这种写法是错误的。
            //this.customerInfo.customerList = []
            //先删除这个数组，然后再通过$set进行设置，否则很容易似乎VUE无法监听到对象中的数组的清空
            delete(this.customerInfo.customerList)
            this.$set(this.customerInfo,'customerList',[])
            this.customerInfo.pageTotal = 0;

          }
        )
      },
      //点击分页钩子方法
      handleCurrentChange(index) {
        this.searchCustomerParams.pageIndex = index;
        this.getPersonByCondition()
      },
      /*通行客工具方法*/
      //处理Null数据
      editNullData(obj){
        let temp = {};
        for(let o in obj){
          if(obj[o] === null){
            temp[o] = '';
          }
          else{
            temp[o] = obj[o]
          }
        }
        return temp;
      },
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
    computed:{
      customerList:function(){
        return this.customerInfo.customerList;
      }
    },
    mounted:function(){
      //初始化页面时查询一次人员
      this.getPersonByCondition()
      this.customerInfo.customerList = []
    }
  }
</script>

<style lang="less" scoped>
  #searchCustomerUser {
      .pagestyle{
        line-height: 30px;
      }
  }
 /* .top-title {
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
  }*/
</style>
<style lang="less">
  #searchCustomerUser {
    .el-input__inner {
      max-width: 606px;
    }

  }
</style>

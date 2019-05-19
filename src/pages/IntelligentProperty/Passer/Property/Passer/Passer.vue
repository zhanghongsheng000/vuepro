<template>
  <div class="RenterPasser"  id="RenterPasser">
    <div class="rscont lktxjlcxcontainer">
      <div class="main-cont">
        <div class="pt50">
          <div class="top-title font14" style="text-align:left;">
            <div class="line"></div>
            <span class="top-text">通行客</span>
          </div>
          <div>
            <div class="fl_section">
              <span style="line-height: 30px;font-size: 14px;">员工姓名：</span>
              <input v-model="userName" placeholder="请输入员工姓名" class="employname">
            </div>
            <div class="fl_section">
              <el-select v-model="flag" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="已开通" value="Y"></el-option>
                <el-option label="未开通" value="N"></el-option>
              </el-select>
            </div>
            <div class="fl_section" @click="getEmployeeByConditionList(1)">
              <el-button type="primary">查询</el-button>
            </div>
          </div>
          <div class="main-box">
            <div class="tables">
              <el-table :data="employeeList" style="width: 98%" @selection-change="handleSelectionChange"
                        ref="customerUserIdList" :empty-text=text>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="workCode" label="工号"></el-table-column>
                <el-table-column prop="name" label="姓名" width='100'></el-table-column>
                <el-table-column prop="sex" label="性别" width='55'></el-table-column>
                <el-table-column prop="telphone" label="手机号码" width='200'></el-table-column>
                <el-table-column prop="idCard" label="身份证号码"></el-table-column>
                <el-table-column prop="passerCardList" label="通行证" width='120'>
                  <template slot-scope="scope">
                   <span v-for="passerItem,index in scope.row.passerCardList" style="display:block;" :key="index">{{passerItem.buildingName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="passerCardList" label="状态" width='80'>
                  <template slot-scope="scope">
                    <span v-if="scope.row.flag=='N'"
                               size="small">未开通
                    </span>
                    <span v-if="scope.row.flag=='Y'"
                          size="small">已开通
                    </span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="通行客" width="150">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.flag=='N'" @click="openClick(scope.$index, scope.row)" type="text"
                               size="small">开通通行客
                    </el-button>
                    <el-button v-if="scope.row.flag=='Y'" @click="openClick(scope.$index, scope.row)" type="text"
                               size="small">编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="fr btnstyle">
              <el-button type="primary"  @click="batchOpenPasser">批量开通</el-button>
              <el-button type="primary"  @click="batchOpenPasser(true)">全部开通</el-button>
            </div>

          </div>

          <div class="clearfix">
            <div class="pagination fl">
              <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange" :page-size="pages"></el-pagination>
            </div>
            <div class="fl pagestyle font12">
              <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span></div>
          </div>
          <el-dialog
            title="选择通行证"
            :visible.sync="dialogVisibleBuilding"
            :modal-append-to-body='false'
            width="45%" style='text-align: left;'>
            <el-checkbox-group v-model="buildingList">
              <el-checkbox v-for="building,index in passerCardList" :key="index" :label="building.buildingId">
                {{building.buildingName}}
              </el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleBuilding = false">取 消</el-button>
              <el-button type="primary" @click="ensureBuildingChose">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="警告"
            :visible.sync="dialogVisibleWarning"
            :modal-append-to-body='false'
            width="30%">
            批量操作的通行证发放通行证，会覆盖原有通行证，确认进行此操作吗？
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleWarning = false">取 消</el-button>
              <el-button type="primary" @click="openPasser">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Footer from '@/components/public/footer'

  export default {
    components: {
      logFooter: Footer
    },
    data() {
      return {
      	text:'正在加载，请稍候',
        pages:30,
        getRenterParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        },
        departmentId: '', //部门id
        userName: '', //员工姓名
        flag: '', //选择开通未开通的状态
        pagetotal: 0, //列表总条数
        pageNow: 1, //当前页码
        pageTotal: 0, //总页数
        pageIndex: 1,
        employeeList: [], //列表
        customerUserIdList: [], //用户编号
        employname: '', //用户名（员工姓名）
        departmentId: '', //部门id
        //通行证列表
        passerCardList: [],
        dialogVisibleBuilding: false,
        dialogVisibleWarning:false,
        buildingList: [],
        //是否为批量开通，默认为否
        isBatch:false,
        //是否为全部开通，默认为否
        isAll:false
      }
    },
    created() {
      //查看物业是否有未设置通行证的楼盘和法人，如果有的话，后台自动添加，前台不需要任何操作
      this.openPropertyCompangyConfigCard()
      this.getEmployeeByConditionList(1); //列表
      //获取写字楼列表
      this.getBuildingListByCompanyId()
    },
    methods: {
      indexMethod(index) { //编号
        return (this.pageNow - 1) * 30 + 1 + index;
      },
      handleSelectionChange(selection) { //选中列
        this.customerUserIdList = [];
        for (let o in selection) {
          this.customerUserIdList.push(selection[o].customerUserId)
        }
      },
      //确定楼盘的选择
      ensureBuildingChose(){
        //如果是批量操作，则显示确定警告
        if(this.isBatch){
          this.dialogVisibleWarning = true;
        }
        else{
          this.openPasser()
        }
      },
      getEmployeeByConditionList(pageIndex) { //加载列表
        this.$httpPasser.post('employee/getPropertyEmployeeByCondition', {
          companyId: this.getRenterParams.companyId,
          departmentId: this.departmentId,
          userName: this.userName,
          pageIndex: pageIndex,
          pageSize: '30',
          flag: this.flag
        }).then((res) => {
          if (res.data.resultCode == '200') {
            this.employeeList = res.data.result.employeeList
            this.customerUserIdList = [];
            this.pagetotal = res.data.totalRecord;
            this.pageTotal = res.data.pageTotal;
          } else if (res.data.resultCode == '204') {
          	this.employeeList = [];
          	this.text ='暂无数据'
            this.vistorRecordList = res.data.result
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'success'
            });
          } else {
          	this.text ='暂无数据'
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        }).catch(err => {
          console.log(err)
        })
      },
      openClick(index, row) { //单条开通通行客
        this.dialogVisibleBuilding = true;
        this.buildingList = [];
        for(let o in row.passerCardList){
          if(row.passerCardList[o]!=null){
            this.buildingList.push(row.passerCardList[o].buildingId)
          }
        }
        this.isBatch = false;
        this.isAll = false;
        this.customerUserIdList = [];
        this.customerUserIdList.push(row.customerUserId);
      },
      //批量开通通行客
      batchOpenPasser(ifAll){
        if(ifAll){
          this.isAll = true;
        }
        else{
          this.isAll = false;
        }
        this.dialogVisibleBuilding = true;
        this.isBatch = true;
        this.buildingList = [];
      },
      //开通通行客,参
      openPasser() {
        this.dialogVisibleWarning = false;
        this.dialogVisibleBuilding = false;
        //开通所有通行客
        if(this.isAll){
          this.dialogVisibleBuilding = false;
          this.$httpPasser.post(
            'production/openPassengerForAllPropertyEmployee',
            {
              shopId: this.$local.sefetch('info').companyId,
              buildingIdList: this.buildingList
            }
          ).then(
            (res)=>{
              if(res.data.resultCode==200){
                this.$message.success(res.data.resultCodeDesc)
                this.getEmployeeByConditionList(1)
              }
              else{
                this.$message.error(res.data.resultCodeDesc)
              }
            }
          )
        }
        //批量或者单条开通通行客
        else{
          this.$httpPasser.post("production/openPassengerForPropertyEmployee", {
              customerUserIdList: this.customerUserIdList,
              shopId: this.getRenterParams.companyId,
              buildingIdList: this.buildingList
            }
          ).then((res) => {
            if (res.data.resultCode == 200) {
              this.$message({
                showClose: true,
                message: "开通成功",
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
            }
            this.getEmployeeByConditionList(this.pageNow)
          })
        }

      },
      pagesChange(currentPage) { //分页
        this.pageNow = currentPage
        this.getEmployeeByConditionList(currentPage)
      },
      //获取通行证
      getBuildingListByCompanyId() {
        this._httpPasser(
          'building/getBuildingListByCompanyId',
          'get',
          {companyId: this.getRenterParams.companyId},
          data => {
            for(let o in data.result){
              if(data.result[o]!=null){
                this.passerCardList[o] = data.result[o]
              }
            }
          }
        )
      },
      //查看物业是否有未设置通行证的楼盘和法人，如果有的话，后台自动添加，前台不需要任何操作
      openPropertyCompangyConfigCard(){
        this._httpPasser(
          'production/openPropertyCompangyConfigCard',
          'get',
          {
            shopId: this.$local.sefetch('info').companyId,
            userId:this.$local.sefetch('info').userId
          },
          data => {
          }
        )
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
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
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
                if (callback204) {
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
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
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
    computed: {
      num() {
        return parseInt(this.pagetotal)
      }
    },
  }
</script>
<style lang="less" scoped>
  #RenterPasser{
    margin-top: -30px;
  }
  .RenterPasser {
    text-align: center;
    p {
      color: #dedede;
    }
    padding: 10px 0 10px 0;
    width: 100%;
    min-height: 86%;
    .rscont {
      .pt50 {
        padding-top: 20px;
        /*width: 1400px;*/
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
        padding-bottom: 80px;
        padding-top: 50px;
        .btn-style {
          padding-bottom: 120px;
        }
      }
      .employname {
        border: 1px solid #dcdfe6;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
      }
      .fl_section {
        float: left;
        margin-left: 20px;
      }
    }
    .pagination {
      padding-bottom: 20px;
    }
    .pagestyle {
      line-height: 30px;
    }
    .btnstyle {
      margin: 20px 80px 0 0;
    }
  }
</style>

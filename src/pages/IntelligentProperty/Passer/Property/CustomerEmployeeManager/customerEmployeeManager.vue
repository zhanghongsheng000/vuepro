<template>
  <div class="rscont" id="customerEmployeeManager">
    <div class="main-cont">
      <div class="common pt50">
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item fl">
              <el-select v-model.trim="searchEmployeeParams.departmentId" clearable placeholder="部门">
                <el-option
                  v-for="item,index in departmentInfo.departmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.customerDepartmentId">
                </el-option>
              </el-select>
            </div>
            <div class="form-item fl">
              <el-input v-model.trim="searchEmployeeParams.userName" placeholder="请输入姓名" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="handleSearchEmployee">查询</el-button>
            </div>
            <div class="form-item fr">
            </div>
          </div>
          <div class="clear20"></div>
          <div class="tables">
            <el-table :data="employeeInfo.employeeList" style="width: 100%"
                      @selection-change="handleSelectionChange" :empty-text=text>
              <el-table-column fixed type="selection"></el-table-column>
              <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="departmentName" label="部门" width="90"></el-table-column>
              <el-table-column prop="name" width="100" label="姓名"></el-table-column>
              <el-table-column prop="sex" width="100" label="性别"></el-table-column>
              <el-table-column prop="telphone" label="手机号码"></el-table-column>
              <el-table-column label="通行证">
                <template slot-scope="scope">
                  <span v-for="item,index in scope.row.passerCardList" :key="index">
                    {{item.buildingName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handleEditEmployeeShow(scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleDeleteSignalEmployeeShow(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clear20"></div>
          <div class="clearfix">
            <div class="pages fl">
              <el-pagination background layout="prev, pager, next" :page-count="employeeInfo.pageTotal" @current-change="pagesChange"></el-pagination>
            </div>
            <div class="fl pagestyle">
              <span>共{{this.employeeInfo.pageTotal}}页，当前第{{this.employeeInfo.pageIndex}}页,每页30条，共{{this.employeeInfo.totalRecord}}条</span>
            </div>
          </div>


          <div class="btns">
            <el-button type="primary" round @click="handleAddEmployeeShow">新增员工</el-button>
            <el-button type="primary" round @click="handleDeleteBatchEmployeeShow">删除员工</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-box">
      <el-dialog title="添加员工"  v-loading="loading2"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :visible.sync="dialogVisibleAddEmployee" width="464px" top="50px" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">部门：</div>
            <div class="sitemr fl">
              <el-select v-model="employeeAddParams.new_customer_department_id" clearable placeholder="部门">
                <el-option
                  v-for="item,index in departmentInfo.departmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.customerDepartmentId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">员工姓名：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="employeeAddParams.name" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">手机号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="employeeAddParams.telphone" placeholder="请输入手机号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">性别：</div>
            <div class="sitemr fl sex">
              <el-radio v-model="employeeAddParams.sex" label="男">男</el-radio>
              <el-radio v-model="employeeAddParams.sex" label="女">女</el-radio>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl sex">通行证：</div>
            <div class="sitemr fl sex">
              <el-checkbox-group v-model="employeeAddParams.passerCardIdList">
                <el-checkbox v-for="item,index in passerCardList" :key="index" :label="item.buildingId">{{item.buildingName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAddEmployee = false">取 消</el-button>
          <el-button type="primary" @click="handleAddEmployee">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑员工" :visible.sync="dialogVisibleEditEmployee" width="464px" top="50px" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">部门：</div>
            <div class="sitemr fl">
              <el-select v-model="employeeEditParams.new_customer_department_id" clearable placeholder="部门">
                <el-option
                  v-for="item,index in departmentInfo.departmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.customerDepartmentId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">员工姓名：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="employeeEditParams.name" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">手机号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="employeeEditParams.telphone" placeholder="请输入手机号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">性别：</div>
            <div class="sitemr fl sex">
              <el-radio v-model="employeeEditParams.sex" label="男">男</el-radio>
              <el-radio v-model="employeeEditParams.sex" label="女">女</el-radio>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl sex">通行证：</div>
            <div class="sitemr fl sex">
              <el-checkbox-group v-model="employeeEditParams.passerCardList">
                <el-checkbox v-for="item,index in passerCardList" :key="index" :label="item.buildingId">{{item.buildingName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEditEmployee = false">取 消</el-button>
          <el-button type="primary" @click="handleEditEmployee">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="删除员工" :visible.sync="dialogVisibleDeleteEmployee" width="30%">
        <span>您确定要删除吗</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDeleteEmployee = false">取 消</el-button>
          <el-button type="primary" @click="handleDeleteBatchEmployee">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      	text:'正在查询，请稍候',
        companyId:{
          businessExtendShopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        },
        loading2:false,
        //搜索员工参数
        searchEmployeeParams:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          //产品ID
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
          pageIndex:1,
          pageSize:30,
          departmentId:'',
          userName:''
        },
        //员工信息
        employeeInfo:{
          pageIndex:0,//当前页
          pageSize:30,//每页条数
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          employeeList:[]
        },
        //新增员工参数
        employeeAddParams:{
          userId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          new_customer_department_id:'',
          name:'',
          telphone:'',
          sex:'',
          //是否是物业公司，0为是。
          isProperty:0,
          passerCardIdList:[]
        },
        //修改员工参数
        employeeEditParams:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          old_customer_department_id:'',
          new_customer_department_id:'',
          npm:'',
          name:'',
          telphone:'',
          sex:'',
          passerCardList:[]
        },
        //通行证里列表
        passerCardList:[
          /*{
            buildingName:'',
            buildingId:''
          }*/
        ],
        //表格选中的row的列表
        selectionRowArray:[],
        //删除员工参数
        deleteEmployeeParams:{
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          //产品ID
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
          employeeIdList:[]
        },
        //部门信息
        departmentInfo:{
          departmentList:[
            /*{
              departmentCode: null,
              departmentId: 40,
              departmentName: "技术部",
              type:"部门"
            }*/
          ]
        },

        dialogVisibleAddEmployee: false,//弹层显示隐藏
        dialogVisibleEditEmployee: false,//弹层显示隐藏
        dialogVisibleDeleteEmployee: false,//弹层显示隐藏
      }
    },
    methods: {
      indexMethod(index) {//编号
        return (this.employeeInfo.pageIndex - 1)*30 + 1 + index;
      },
      //查询按钮钩子
      handleSearchEmployee(){
        this.getEmployeeByCondition()
      },
      //获取员工列表
      getEmployeeByCondition(){
        this._httpPasser(
          'employee/getEmployeeByCondition',
          'get',
          this.searchEmployeeParams,
          data=>{
            this.employeeInfo = data
            console.log(this.employeeInfo)
            this.employeeInfo.employeeList = data.result.employeeList;

          },
          'false',
          ()=>{
          	this.text = "暂无数据"
            delete(this.employeeInfo.employeeList)
            this.$set(this.employeeInfo,'employeeList',[]);
            this.employeeInfo.pageTotal = 0
          },
        )
      },
      //获取部门列表
      getDepartment() {//公司部门列表
        this._httpPasser(
          'company/getDepartmentByCompanyId',
          'get',
          this.companyId,
          data=>{
            this.departmentInfo.departmentList = data.result.departmentList;
            console.log(this.departmentInfo.departmentList)
          }
        )
      },
      //选择员工钩子方法
      handleSelectionChange(selection) {//复选框选中的时候触发
        this.selectionRowArray = selection;
      },

      //显示新增员工对话框
      handleAddEmployeeShow(){
        //重置新增员工参数
        this.dialogVisibleAddEmployee = true;
        for(let o in this.employeeAddParams){
          this.employeeAddParams[o]= '';
        }
        this.employeeAddParams.userId = this.$local.sefetch('info')?this.$local.sefetch('info').userId:'';
        this.employeeAddParams.companyId = this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'';
        this.employeeAddParams.passerCardIdList = [];
        this.employeeAddParams.isProperty = 0;
      },
      //新增员工方法钩子
      handleAddEmployee(){
        //console.log(this.employeeAddParams)
        this._httpPasser(
          'employee/addPropertyEmployee',
          'post',
          this.employeeAddParams,
          data=>{
            this.dialogVisibleAddEmployee = false;

            this.getEmployeeByCondition();
          }
        )
      },

      //显示编辑员工对话框
      handleEditEmployeeShow(row){
        this.dialogVisibleEditEmployee = true;
        for(let o in row){
          this.employeeEditParams[o] = row[o]
        }
        //打开编辑窗口时，给旧部门ID赋值
        this.employeeEditParams.old_customer_department_id = this.employeeEditParams.customerDepartmentId;
        //给新部门赋值
        this.employeeEditParams.new_customer_department_id = this.employeeEditParams.customerDepartmentId;
        //给通行证赋值
        let temp = this.employeeEditParams.passerCardList;
        if(temp.length>0){
          let tempArray = []
          for(let o in temp){
            tempArray.push(temp[o].buildingId)
          }
          this.employeeEditParams.passerCardList = tempArray;
        }
        //修改参数员工ID名称
        this.employeeEditParams.customer_employee_id = this.employeeEditParams.employeeId;


      },
      //编辑员工钩子
      handleEditEmployee(row){
        this.employeeEditParams.passerCardIdList = this.employeeEditParams.passerCardList
        this._httpPasser(
          'employee/updateManegerEmployee',
          'post',
          this.employeeEditParams,
          data=>{
            this.dialogVisibleEditEmployee = false;
            this.getEmployeeByCondition();
          }
        )
      },

      //单个删除员工显示对话框
      handleDeleteSignalEmployeeShow(row){
        this.deleteEmployeeParams.employeeIdList = [];
        this.deleteEmployeeParams.employeeIdList.push(row.employeeId);
        this.dialogVisibleDeleteEmployee = true;
      },
      //批量删除员工显示对话框
      handleDeleteBatchEmployeeShow(row){
        this.deleteEmployeeParams.employeeIdList = [];
        for(let o in this.selectionRowArray){
          this.deleteEmployeeParams.employeeIdList.push(this.selectionRowArray[o].employeeId)
        }
        if(this.deleteEmployeeParams.employeeIdList.length<=0){
          this.$message({
            showClose: true,
            message: '请选择员工',
            type: 'error'
          });
        }
        else{
          this.dialogVisibleDeleteEmployee = true;
        }
      },
      //批量删除员工钩子
      handleDeleteBatchEmployee(){
        /*/employee/batchDeleteEmployee*/
        this.dialogVisibleDeleteEmployee = false;
        this.batchDeleteEmployee()
      },
      //删除员工
      batchDeleteEmployee(){
        this._httpPasser(
          'employee/deleteEmployee',
          'post',
          this.deleteEmployeeParams,
          data=>{
            this.getEmployeeByCondition();
          }
        )
      },
      //获取通行证
      getBuildingListByCompanyId(){
        this._httpPasser(
          'building/getBuildingListByCompanyId',
          'get',
          {companyId:this.companyId.businessExtendShopId},
          data=>{
            this.passerCardList = data.result;
          }
        )
      },
      pagesChange(index) {//分页
        this.searchEmployeeParams.pageIndex = index
        this.getEmployeeByCondition()
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
      employeeEditParams:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          console.log("b.c: "+val.c, oldVal.c);//但是这两个值打印出来却都是一样的
        },
        deep:true
      }
    },
    computed: {
      num() {
        return parseInt(this.pagetotal)
      }
    },
    created() {
      this.getDepartment()//获取部门
      this.getEmployeeByCondition()//初始化获取员工
      this.getBuildingListByCompanyId();
    },
  }
</script>
<style lang="less" scoped>
  #customerEmployeeManager {
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
        font-size: 18px;
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
  }
</style>
<style lang="less">
  #customerEmployeeManager{
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }

</style>

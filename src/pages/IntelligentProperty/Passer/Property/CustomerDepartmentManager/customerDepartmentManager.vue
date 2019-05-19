<template>
  <div class="mainPart" id="customerDepartmentManager">
    <el-table :data="departmentInfo.departmentList" style="width: 100%" :empty-text=text>
      <el-table-column type="index" width="50" label="编号" :index="indexMethod" >
      </el-table-column>
      <el-table-column prop="departmentName" label="部门名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDepartmentShow(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDeleteSingalDepartmentShow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change=" handleCurrentChange"
          background
          :current-page.sync="departmentSearchParams.pageIndex"
          layout="prev, pager, next"
          :page-count="departmentInfo.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle">
        <span>共{{this.departmentSearchParams.pageTotal}}页，当前第{{this.departmentSearchParams.pageIndex}}页,每页30条，共{{this.departmentSearchParams.totalRecord}}条</span>
      </div>
    </div>
    <div class="clear20"></div>
    <el-button type="primary" size="small" @click="handleAddDepartmentShow">新增部门</el-button>

    <!--新增编辑部门dialog窗口-->

    <el-dialog
      title="新增部门"
      :visible.sync="dialogAddVisible"
      width="30%">
      <el-input v-model="departmentAddInfo.departmentName"  placeholder="请输入部门名称" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑部门dialog窗口-->
    <el-dialog
      title="编辑部门"
      :visible.sync="dialogEditVisible"
      width="30%">
      <el-input v-model="departmentEditInfo.departmentName"  placeholder="请输入部门名称" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除部门dialog窗口-->
    <el-dialog
      title="删除部门"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      您确认要删除这个部门吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditQuantityDepartment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "customer-department-manager",
    data() {
      return {
      	text:'正在查询，请稍候',
        departmentSearchParams: {
          companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          pageIndex:0,//当前页
          pageSize:30,//每页条数
          pageTotal:0,//总页数
          totalRecord:0,//总条数
        },
        //部门信息
        departmentInfo: {
          pageTotal: 0,
          departmentList: [
            /*{
              departmentCode: null,
              departmentId: 40,
              departmentName: "技术部",
              type:"部门"
            }*/
          ]
        },

        //新增部门信息
        departmentAddInfo:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          departmentName:'',
          //1为部门，2为子公司
          type:'1'
        },
        //弹出窗口控制部分
        dialogAddVisible:false,

        //编辑部门部分信息
        dialogEditVisible:false,
        //新增部门信息
        departmentEditInfo:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          departmentId:'',
          departmentName:'',
          //1为部门，2为子公司
          type:'1'
        },

        //删除部门信息确认窗口
        dialogDeleteVisible:false,
        //删除部门信息参数
        departmentDeleteInfo:{
          departmentId:'',
          customerId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
        }
      }
    },
    methods: {
      indexMethod(index) {//编号
        return (this.departmentSearchParams.pageIndex - 1)*30 + 1 + index;
      },
      //分页方法
      handleCurrentChange(index) {
        this.departmentSearchParams.pageIndex = index;
        this.queryDepartmentByCompanyId();
      },
      //查询部门方法
      queryDepartmentByCompanyId() {
        this._httpPasser(
          'company/queryDepartmentByCompanyId',
          'get',
          this.departmentSearchParams,
          data => {
            if(data.result != null){
              this.departmentInfo.departmentList = data.result.departmentList
              this.departmentInfo.pageTotal = data.pageTotal;
              this.departmentSearchParams.pageTotal = data.pageTotal;
              this.departmentSearchParams.totalRecord = data.totalRecord;
            }
            else{
            	this.text = '暂无数据'
              delete(this.departmentInfo.departmentList)
              this.$set(this.departmentInfo,'departmentList',[]);
              this.departmentInfo.pageTotal = 0
            }
          },
          false,
          ()=>{
          	this.text = '暂无数据'
            delete(this.departmentInfo.departmentList)
            this.$set(this.departmentInfo,'departmentList',[]);
            this.departmentInfo.pageTotal = 0
          }
        )
      },
      //显示编辑部门窗口钩子方法
      handleEditDepartmentShow(row) {
        this.departmentEditInfo.departmentName = row.departmentName;
        this.departmentEditInfo.departmentId = row.departmentId
        this.dialogEditVisible = true;
      },
      //编辑部门窗口钩子方法
      handleEditDepartment(){
        this.saveDepartment(this.departmentEditInfo,'编辑成功',()=>{
          this.dialogEditVisible = false;
        })
      },

      //显示删除单条数据窗口钩子方法
      handleDeleteSingalDepartmentShow(row) {
        this.departmentDeleteInfo.departmentId = row.departmentId;
        this.dialogDeleteVisible = true;
      },
      //删除部门钩子方法
      handleEditQuantityDepartment() {
        this.deleteDepartment(()=>{
          this.dialogDeleteVisible = false;
          this.queryDepartmentByCompanyId();
        })
      },
      //显示新增部门窗口钩子方法
      handleAddDepartmentShow() {
        this.dialogAddVisible = true;
        //重置部门信息
        for(let o in this.departmentAddInfo){
          this.departmentAddInfo[o] = '';
        }
        this.departmentAddInfo.companyId = this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'';
        this.departmentAddInfo.type = 1;
      },
      //新增部门钩子方法
      handleAddDepartment(){
        this.saveDepartment(this.departmentAddInfo,'新增成功',()=>{
          this.dialogAddVisible = false;
        })
      },
      //保存部门 obj为参数列表
      saveDepartment(obj,string200,callBack200){
        this._httpPasser(
          'company/saveDepartment',
          'get',
          obj,
          data=>{
            if(string200){
              this.$message.success(string200)
            }
            else{
              this.$message.success('成功')
            }
            this.queryDepartmentByCompanyId();
            if(callBack200){
              callBack200();
            }
          }
        )

      },
      //删除部门方法
      deleteDepartment(callback200){
        this._httpPasser(
          'company/deleteDepartment',
          'get',
          this.departmentDeleteInfo,
          data=>{
            this.$message.success(data.resultCodeDesc);
            if(callback200){
              callback200();
            }
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
    mounted: function () {
      this.queryDepartmentByCompanyId()
    }
  }
</script>

<style scoped lang="less">
  #customerDepartmentManager {
    .pagestyle{
      line-height:30px;
    }
  }
</style>
<style lang="less">
  #customerDepartmentManager {

  }
</style>

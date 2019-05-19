<template>
  <div class="PropertyDepartmentManager">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">部门管理</span>
      </div>
    </div>
    <div class="tables">
      <el-table :data="tableData" style="width: 100%" :empty-text=text>
        <el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
        <el-table-column prop="departmentName" label="部门" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"  @click="editsure(scope.$index,scope.row)" round>编辑</el-button>
            <el-button size="mini"  @click="deletesure(scope.row)" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix">
      	<div class="pagination fl" >
        	<el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange" :page-size="pages"></el-pagination>
      	</div>
      	<div class="fl pagestyle"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span></div>
    	<div class="buttons fr">
    		<el-button type="primary" @click="increase" round>新增部门</el-button>
    	</div>
    </div>

    <!--新增部门弹框-->
    <el-dialog
      title="新增部门"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body='false'
    >
      <div class="inputstyle">
        <span>部门名称：</span>
        <el-input placeholder="请输入新增部门名称" v-model.trim="currentRow.departmentName" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensure">确 定</el-button>
          </span>
    </el-dialog>
    <!--编辑部门弹框-->
    <el-dialog
      title="编辑部门"
      :visible.sync="dialogVisible1"
      width="30%"
      :modal-append-to-body='false'
    >
      <div class="inputstyle">
        <span>部门名称：</span>
        <el-input placeholder="请输入部门名称" v-model.trim="newdepartmentName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="ensureedit">确 定</el-button>
          </span>
    </el-dialog>
    <!--删除部门弹框-->
    <el-dialog
      title="删除部门"
      :visible.sync="dialogVisible2"
      width="30%"
      :modal-append-to-body='false'
    >
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="delete1">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "common-company-department-manager",
    data() {
      return {
      	text : "正在加载，请稍候",
      	pages:30,
        getRenterParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        },
        dialogVisible: false,//添加部门弹框
        dialogVisible1:false,//编辑部门弹框
        dialogVisible2:false,//删除部门弹框
        newdepartmentName:'',//编辑部门名称
        departmentId:'',//部门id
        pagetotal: '',//列表总条数
        pageNow: 1,//当前页码
        pageTotal:0,//总页数
        totalRecord:0,//总记录数
        tableData: [],
        currentRow:{
          departmentName:'',//部门名称
        },
        pagetotal: '',//列表总条数
      }
    },
    created(){
      this.getDepartmentList(1);//获取部门列表
    },
    methods:{
      indexMethod(index) {//编号
        return (this.pageNow - 1)*30 + 1 + index;
      },
      getDepartmentList(pageIndex){//获取部门列表
        this.$httpPasser.post('company/queryDepartmentByCompanyId',{
          companyId:this.getRenterParams.companyId,
          pageSize: '30',
          pageIndex: pageIndex
        }).then((res)=>{
          console.log(res.data)
          if(res.data.resultCode=='200'){
            this.tableData=res.data.result?res.data.result.departmentList:''
            this.pagetotal=res.data.totalRecord
            this.pageTotal = res.data.pageTotal;
            console.log(this.pagetotal)
          } else{
          	this.text ="暂无数据"
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      increase(){
        this.currentRow.departmentName='';
        this.dialogVisible=true;
      },
      ensure(){//确定添加部门
        if(this.currentRow.departmentName==''){
          this.$message({
            showClose: true,
            message: "部门名称不能为空",
            type: 'error'
          });
        }else{
          this.$httpPasser.post('company/saveDepartment',{
            companyId:this.getRenterParams.companyId,
            departmentName:this.currentRow.departmentName,
            type:'1'
          }).then((res)=>{
            console.log(res.data)
            if(res.data.resultCode=='200'){
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
              this.dialogVisible = false;
              this.getDepartmentList(1);
            }else{
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
              this.dialogVisible = false;
            }
          })
        }
      },
      deletesure(row){//单条删除部门
        this.dialogVisible2=true;
        this.departmentId=row.departmentId;
      },
      delete1(){
        this.$httpPasser.post('company/deleteDepartment',{
          departmentId:this.departmentId,
          customerId:this.getRenterParams.customerId
        }).then((res)=>{
          if(res.data.resultCode=='200'){
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getDepartmentList(this.pageNow);
            this.dialogVisible2=false;
          }else if(res.data.resultCode=='204'){
            this.getDepartmentList(this.pageNow);
            this.dialogVisible2=false;
          }else{
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
            this.dialogVisible2=false;
          }
        })
      },
      editsure(index,row){//编辑部门弹框
        console.log(row)
        this.dialogVisible1=true;
        this.departmentId=row.departmentId;
        this.newdepartmentName=row.departmentName;
      },
      ensureedit(){
        if(this.newdepartmentName==''){
          this.$message({
            showClose: true,
            message: "部门名称不能为空",
            type: 'error'
          });
        }else{
          this.$httpPasser.post('company/saveDepartment',{
            companyId:this.getRenterParams.companyId,
            departmentName:this.newdepartmentName,
            departmentId:this.departmentId,
            type:'1'
          }).then((res)=>{
            if(res.data.resultCode=='200'){
              this.$message({
                showClose: true,
                message: '编辑成功',
                type: 'success'
              });
              this.dialogVisible1 = false;
              this.getDepartmentList(this.pageNow);
            }
            else if(res.data.resultCode=='204'){
              this.getDepartmentList(this.pageNow);
            }
            else{
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
              this.dialogVisible1 = false;
            }
          })
        }
      },
      pagesChange(currentPage) {//分页
        this.pageNow = currentPage;
        this.getDepartmentList(currentPage)
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
  .PropertyDepartmentManager{
    width: 1040px;
    padding-top: 30px;
    .tables{
      margin-bottom: 10px;
    }
    .pagination{
      margin-bottom: 10px;
    }
    .buttons{
      padding-bottom: 30px;
      margin-right: 20px;
      margin-top: 10px;
    }
    .pagestyle{
      line-height:30px;
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

  }

</style>
<style lang="less">
  .PropertyDepartmentManager{
    .el-input {
      width: 69%;
    }
    .inputstyle {
      padding: 5px 10px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
    .el-table th{
      padding: 12px 0;
    }
  }
</style>

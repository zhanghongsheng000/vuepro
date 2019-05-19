<template>
  <div class="PropertyDepartmentManager">
    <div class="top-title" style="padding-top: 30px;">
      <div class="line"></div>
      <span class="top-text">职位管理</span>
    </div>
    <div class="tables">
      <el-table :data="tableData" style="width: 100%" :empty-text=text>
        <el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
        <el-table-column prop="name" label="职位" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"  @click="editsure(scope.$index,scope.row)" round>编辑</el-button>
            <el-button size="mini"  @click="deletesure(scope.row)" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<div class="clearfix">
      <div class="pagination fl" >
        <el-pagination layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>
      </div>
      <div class="fl pagestyle"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span></div>
    </div>-->


    <div class="buttons fr">
      <el-button type="primary" @click="increase" round>新增职位</el-button>
    </div>

    <!--新增职位弹框-->
    <el-dialog
      title="新增职位"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body='false'
    >
      <div class="inputstyle">
        <span>职位名称：</span>
        <el-input placeholder="请输入新职位门名称" v-model.trim="currentRow.name" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensure">确 定</el-button>
          </span>
    </el-dialog>
    <!--编辑职位弹框-->
    <el-dialog
      title="编辑职位"
      :visible.sync="dialogVisible1"
      width="30%"
      :modal-append-to-body='false'
    >
      <div class="inputstyle">
        <span>职位名称：</span>
        <el-input placeholder="请输入职位名称" v-model.trim="newName" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="ensureedit">确 定</el-button>
          </span>
    </el-dialog>
    <!--删除职位弹框-->
    <el-dialog
      title="删除职位"
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
      	text:'正在加载，请稍候',
        getRenterParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        },
        dialogVisible: false,//添加职位弹框
        dialogVisible1:false,//编辑职位弹框
        dialogVisible2:false,//删除职位弹框
        newName:'',//编辑职位名称
        customerPostId:'',//职位id
        pagetotal: '',//列表总条数
        pageNow: 1,//当前页码
        pageTotal:0,//总页数
        totalRecord:0,//总记录数
        tableData: [],
        currentRow:{
          name:'',//职位名称
        },
        pagetotal: '',//列表总条数
      }
    },
    created(){
      this.getDepartmentList();//获取职位列表
    },
    methods:{
      indexMethod(index) {//编号
        return (this.pageNow - 1)*30 + 1 + index;
      },
      getDepartmentList(){//获取职位列表
        this.$httpPasser.post('companyPost/list',{
          shopId:this.getRenterParams.companyId,
        }).then((res)=>{
          console.log(res.data)
          if(res.data.resultCode=='200' && res.data.result !=null&& res.data.result !=''){
            this.tableData=res.data.result
          } else{
          	this.text ="暂无数据";
          	this.tableData =[]
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      increase(){
        this.currentRow.name='';
        this.dialogVisible=true;
      },
      ensure(){//确定添加职位
        if(this.currentRow.name==''){
          this.$message({
            showClose: true,
            message: "职位名称不能为空",
            type: 'error'
          });
        }else{
          this.$httpPasser.post('companyPost/add',{
            businessExtendShopId:this.getRenterParams.companyId,
            name:this.currentRow.name,
          }).then((res)=>{
            console.log(res.data)
            if(res.data.resultCode=='200'){
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
              this.dialogVisible = false;
              this.getDepartmentList();
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
      deletesure(row){//单条删除职位
        this.dialogVisible2=true;
        this.customerPostId=row.customerPostId;
      },
      delete1(){
        this.$httpPasser.post('companyPost/delete',{
          id:this.customerPostId,
//        customerId:this.getRenterParams.customerId
        }).then((res)=>{
          if(res.data.resultCode=='200'){
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getDepartmentList();
            this.dialogVisible2=false;
          }else if(res.data.resultCode=='204'){
            this.getDepartmentList();
            this.dialogVisible2=false;
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
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
      editsure(index,row){//编辑职位弹框
        console.log(row)
        this.dialogVisible1=true;
        this.customerPostId=row.customerPostId;
        this.newName=row.name;
      },
      ensureedit(){
        if(this.name==''){
          this.$message({
            showClose: true,
            message: "职位名称不能为空",
            type: 'error'
          });
        }else{
          this.$httpPasser.post('companyPost/update',{
            businessExtendShopId:this.getRenterParams.companyId,
            name:this.newName,
            customerPostId:this.customerPostId,
          }).then((res)=>{
            if(res.data.resultCode=='200'){
              this.$message({
                showClose: true,
                message: '编辑成功',
                type: 'success'
              });
              this.dialogVisible1 = false;
              this.getDepartmentList();
            }
            else if(res.data.resultCode=='204'){
            	this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
              this.dialogVisible1 = false;
              this.getDepartmentList();
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
    },
  }
</script>

<style lang="less" scoped>
  .PropertyDepartmentManager{
    width: 1040px;
    .tables{
      margin-bottom: 10px;
    }
    .pagination{
      margin-bottom: 10px;
    }
    .buttons{
      padding-bottom: 30px;
      margin: 20px 20px 10px;
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
  }
</style>

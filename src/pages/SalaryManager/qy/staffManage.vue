<template>
  <div class="rscont staffMcontainer">
    <div class="banner">
      <div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
    </div>
    <div class="main-cont">
      <div class="common pt50">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">部门管理</span>
        </div>
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item ">
              <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
            </div>
          </div>
          <div class="tables">
            <el-table :data="staffList" align="left">
              <el-table-column type="index" label="编号" width="100" header-align="left" :index="indexMethod"></el-table-column>
              <el-table-column prop="departmentName" label="部门名称" header-align="left"></el-table-column>
              <el-table-column prop="type" label="部门类型" header-align="left"></el-table-column>
              <el-table-column fixed="right" label="操作" width="200" header-align="left">
                <template slot-scope="scope">
                  <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clearfix">
            <div class="pages fl" v-if="num>0?true:false">
              <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>
            </div>
            <div class="fl pagestyle"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.totalRecord}}条数据</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-box">
      <el-dialog title="添加部门" :visible.sync="dialogFormVisible" width="464px" top="100px" @close="closeEvent" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">部门名称：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newName" placeholder="请输入部门名称" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">部门类型：</div>
            <div class="sitemr fl">
              <el-select v-model="depType" clearable placeholder="请选择部门类型">
                <el-option
                  v-for="item,index in departmentList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Preservation">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑部门" :visible.sync="dialogFormVisible2" width="464px" top="100px" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">部门名称：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newName2" placeholder="请输入部门名称" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">部门类型：</div>
            <div class="sitemr fl">
              <el-select v-model="depType2" clearable placeholder="请选择部门类型">
                <el-option
                  v-for="item,index in departmentList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="Preservation2">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,//弹层显示隐藏
        depType: '',//部门当前选择的类型
        newName: '',//部门名称
        departmentList: [//列表
          {
            departmentName: '部门',
            departmentId: 1
          },
          {
            departmentName: '子公司',
            departmentId: 2
          },
        ],
        pagetotal: '',//分页总条数
        pageNow: 1,//当前页码
        pageTotal:0,//总页数
        totalRecord:0,//总记录数
        staffList: [],//部门列表
        dialogFormVisible2: false,//编辑部门
        newName2:'',//编辑部门名称
        depType2:'',//编辑部门名称
        bumenId:''//部门ID
      }
    },
    created() {
      this.getstaffList(1)
    },
    methods: {
      closeEvent(){//添加部门  取消的时候清空数据
        this.newName=''
        this.depType=''
      },
      indexMethod(index) {
        return (this.pageNow - 1)*30 + 1 + index;
      },
      Preservation2(){//编辑部门的时候函数
        if( this.newName2==''){
          this.$message({
            showClose: true,
            message:'请输入部门名称',
            type: 'error'
          });
        }else if(this.depType2==''){
          this.$message({
            showClose: true,
            message:'请选择部门类型',
            type: 'error'
          });
        }else{
          let companyId = this.$local.sefetch('info').companyId
          this.$http.post('company/saveDepartment', {
            companyId,
            departmentName: this.newName2,//部门名称
            type: this.depType2,//部门类型
            departmentId:this.bumenId
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.newName2 = ''
                this.depType2 = ''
                this.dialogFormVisible2 = false
                this.$message({
                  showClose: true,
                  message: '编辑成功',
                  type: 'success'
                });
                this.getstaffList(1)
              }  else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      Preservation() {//添加部门保存
        if( this.newName==''){
          this.$message({
            showClose: true,
            message:'请输入部门名称',
            type: 'error'
          });
        }else if(this.depType==''){
          this.$message({
            showClose: true,
            message:'请选择部门类型',
            type: 'error'
          });
        }else{
          let companyId = this.$local.sefetch('info').companyId
          this.$http.post('company/saveDepartment', {
            companyId,
            departmentName: this.newName,//部门名称
            type: this.depType//部门类型
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.newName = ''
                this.depType = ''
                this.dialogFormVisible = false
                this.$message({
                  showClose: true,
                  message: '添加部门成功',
                  type: 'success'
                });
                this.getstaffList(1)
              }  else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
        }

      },
      getstaffList(pagnum) {//获取部门列表
        let companyId = this.$local.sefetch('info').companyId
        this.$http.post('company/queryDepartmentByCompanyId', {
          companyId,
          pageIndex:pagnum
        })
          .then(res => {
            let data = res.data
            console.log(data)
            if (data.resultCode == '200') {
              this.staffList = data.result.departmentList
              this.pagetotal=data.totalRecord
              this.pageTotal = data.pageTotal;
              this.totalRecord = data.totalRecord;
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            }  else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteClick(row) {//删除
        console.log(row)
        let customerId = this.$local.sefetch('info').userId
        this.$http.post('company/deleteDepartment', {
          departmentId:row.departmentId,
          customerId
        })
          .then(res => {
            let data = res.data
            console.log(data)
            if (data.resultCode == '200') {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.getstaffList(1)
            }  else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      editClick(row) {//编辑
        this.dialogFormVisible2=true
        this.newName2=row.departmentName
        // this.depType2=row.type
        for(var i=0;i<this.departmentList.length;i++){
          if(this.departmentList[i].departmentName==row.type){
            this.depType2=this.departmentList[i].departmentId
          }
        }
        this.bumenId=row.departmentId
      },
      pagesChange(currentPage) {//分页
        this.getstaffList(currentPage);
        this.pageNow = currentPage;
      }
    },
    computed: {
      num() {
        return parseInt(this.pagetotal)
      }
    }
  }
</script>
<style lang="less" scoped>
  .rscont {
    .tables {
      min-height: 300px;
    }
    .banner {
      height: 250px;
      background: url("../../../assets/img/SalaryManager/ygbanner.png") center center no-repeat;
      .ban-text {
        padding-top: 100px;
        text-align: center;
        color: #fff;
        font-size: 60px;
      }
    }
    .pt50 {
      padding-top: 50px;
      width: 1400px;
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
      line-height:30px;
    }
  }
</style>
<style lang="less">
  .staffMcontainer{
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .is-left{
      text-align:left !important;
    }
    .el-table th>.cell {
      text-align: left !important;
    }
  }
</style>

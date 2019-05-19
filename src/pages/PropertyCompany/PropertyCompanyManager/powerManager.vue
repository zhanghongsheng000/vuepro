<template>
  <div class="rscont powerManager">
    <div class="main-cont">
      <div class="common">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">权限管理</span>
        </div>
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item fl">
              <el-input v-model.trim="queryName" placeholder="请输入名称" clearable></el-input>
            </div>
            <div class="form-item fl" style="width: 66px;">
              <el-button type="primary" @click="queryBtn">查询</el-button>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="addEvent">添加</el-button>
            </div>
          </div>
          <div class="tables">
            <el-table :data="RolePermissionList" style="width: 100%" :empty-text=text>
              <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="roleName" label="名称" ></el-table-column>
              <el-table-column prop="tempStr" label="拥有权限" ></el-table-column>
              <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                  <el-button @click="deleteRole" type="text" size="small" >删除</el-button>
                  <el-button type="text" size="small" @click="editClick(scope.row)" >编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clearfix">
            <div class="fl" style="padding-top:25px;">
              <div class="clearfix" >
                <div class="pages fl" >
                  <el-pagination
                    @current-change=" handleCurrentChange"
                    background
                    :current-page.sync="pageParams.pageIndex"
                    layout="prev, pager, next"
                    :page-count="pageParams.pageTotal">
                  </el-pagination>
                </div>
                <div class="fl pagestyle">
                  <span>共{{this.pageParams.pageTotal}}页，当前第{{this.pageParams.pageIndex}}页,每页{{this.pageParams.pageSize}}条，共{{this.pageParams.totalRecord}}条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-box">
      <!--删除弹层-->
      <el-dialog
        title="是否删除"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
      >
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRoleSure">确 定</el-button>
          </span>
      </el-dialog>
      <!--添加弹层-->
      <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible1"
        width="30%"
        :modal-append-to-body='false'>
        <el-input v-model.trim="roleName" placeholder="角色名称" clearable></el-input>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check-change="handleCheckChange">
        </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="deleteRoleSure">确 定</el-button>
          </span>
      </el-dialog>
      <!--编辑弹层-->
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible2"
        width="30%"
        :modal-append-to-body='false'>
        <div class="inputstyle">
          <span>名称：</span>
          <el-input placeholder="请输入名称" v-model.trim="rolename" clearable></el-input>
        </div>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check-change="handleCheckChange"
          :modal-append-to-body='false'>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="deleteRoleSure">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      	text:'正在加载，请稍候',
        productId:this.$local.sefetch('productInfo').productId?this.$local.sefetch('productInfo').productId:6,
        shopId:this.$local.sefetch('info').companyId,
        userId:this.$local.sefetch('info').userId,
        parentId:'',
        isShowAll:"Y",
        queryName: '',//查询姓名
        RolePermissionList:'',//列表
        pageParams: {
          pageIndex:1,//当前第几页
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          pageSize:30,
        },
        roleName:'',//添加时的角色名称
        //添加
        rolename:'',//编辑时名称
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        dialogVisible: false,
        dialogVisible1:false,
        dialogVisible2:false,
      }
    },
    created() {
      this.getRolePermissionList();
    },
    methods: {
      indexMethod(index) {//编号
        return (this.pageParams.pageIndex - 1)*30 + 1 + index;
      },
      getMenuList(){
        this.$httpPasser.post("permission/getMenuList",{
          shopId:this.shopId,
          customerUserId:this.userId,
          parentId:this.parentId,
          isShowAll:this.isShowAll
        }).then((res)=>{
          if(res.data.resultCode == '200'){

          }
        })
      },
      queryBtn(){//查询事件

      },
      addEvent(){//添加事件
        this.dialogVisible1 = true;
        this.getMenuList();
      },
      deleteRole(row){//删除事件
        this.dialogVisible = true;
      },
      deleteRoleSure(row){
        this.$httpPasser.post("permission/deleteRole",{
          shopId:this.shopId,
          roleIds:row.roleIds,
        }).then((res)=>{

        })
      },
      editClick(){//编辑事件
        this.dialogVisible2 = true;
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data.label, checked, indeterminate);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: 'region1'}, {name: 'region2'}]);
        }
        if (node.level > 3) return resolve([]);
        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      getRolePermissionList() {//获取列表
        this.$httpPasser.post('permission/getRoleList', {
          shopId: this.shopId,
          pageIndex:this.pageParams.pageIndex,
          pageSize:this.pageParams.pageSize
        }).then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.RolePermissionList = data.result;
              for(let i in data.result){
                data.result[i].tempStr ='';
                for(let j in data.result[i].permissionList){
                  result[i].tempStr = result[i].tempStr + result[i].permissionList[j].permissionName + ' ';
                }
              }
              this.pageParams.pageTotal = data.pageTotal;
              this.pageParams.totalRecord = data.totalRecord;
            }  else {
            	this.text ="暂无数据"
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
      //分页回调方法
      handleCurrentChange(index){
        this.pageParams.pageIndex = index;
        this.getRolePermissionList();
      },
    },
    computed: {

    }
  }
</script>
<style lang="less" scoped>
  .common{
    width:100%!important;
  }
  .pagestyle{
    line-height:30px;
  }
  .improveButton{
    color:#e44f4f;
  }
  .line-height-40{
    line-height: 40px;
  }
  .rscont {
    .banner {
      height: 250px;
      .ban-text {
        padding-top: 100px;
        text-align: center;
        color: #fff;
        font-size: 60px;
      }
    }
    .top-title {
      margin-top: 30px;
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

  }
</style>
<style lang="less">
  .powerManage {
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .is-left {
      text-align: left !important;
    }
    .el-table th > .cell {
      text-align: left !important;
    }
    .el-table th{
      padding: 12px 0;
    }
  }

</style>

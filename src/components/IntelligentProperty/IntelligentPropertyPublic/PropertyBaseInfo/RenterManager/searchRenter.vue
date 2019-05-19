<template>
  <div class="mainPart searchLandlord">
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="房间">
        <el-input v-model="searchParams.resultName" placeholder="房间" @focus="showChosingDialog('search')"></el-input>
      </el-form-item>
      <el-form-item label="租客姓名">
        <el-input v-model="searchParams.name" placeholder="租客姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchParams.telphone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchRenter">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="clear20"></div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%" :empty-text=text>
      <el-table-column
        type="selection"
        label="选择"
        width="55">
      </el-table-column>
      <el-table-column
        label="房间Id"
        class-name="notShow"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房间名称"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingRoomName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="租客姓名"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.mobilephone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="公司名称"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSingalDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page.currentPageNum"
          layout="prev, pager, next"
          :page-count="page.pageTotal">
        </el-pagination>
      </div>
      <div class="fl"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页10条，共{{this.page.totalRecord}}条</span></div>
    </div>
    <div class="clear20"></div>
    <el-button size="mini" type="primary" @click="showDelete">删除租客</el-button>
    <el-button type="primary" size="mini" @click="handleAdd">新增租客</el-button>
    <el-dialog
      :title="operationName"
      :visible.sync="dialogVisible"
      width="30%">

      <el-form :model="currentRow" :rules="rules" ref="currentRow">
        <el-form-item label="房间名称" :label-width="formLabelWidth" prop="buildingRoomName">
          <el-input v-model="currentRow.buildingRoomName" auto-complete="off"
                    @focus="showChosingDialog('operation')"></el-input>
        </el-form-item>
        <el-form-item label="租客姓名" :label-width="formLabelWidth" prop="customerName">
          <el-input v-model="currentRow.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="mobilephone">
          <el-input v-model="currentRow.mobilephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="companyName">
          <el-input v-model="currentRow.companyName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEdit('currentRow')">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisibleRoom"
      width="60%">
      <buildingCascader @buildingParam="buildingParam" v-if="hackReset"></buildingCascader>
      <el-button type="success" @click="handleDialogSubmit()">确定</el-button>
    </el-dialog>

    <el-dialog
      title="确定要删除吗？"
      :visible.sync="dialogVisibleDelete"
      width="20%">
      <el-button type="primary" @click="dialogVisibleDelete=false">取消</el-button>
      <el-button type="danger" @click="handleDialogDeleteSubmit()">确定</el-button>
    </el-dialog>
  </div>


</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'

  export default {
    data() {
      return {
      	text:'正在加载，请稍候',
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        //因为添加和修改公用一个弹窗，所以写成活的
        operationName: '添加租客',
        //产品ID
        productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
        //类型 1 物业 2租客 3,4房东
        type: 2,
        //搜索条件，作为搜索的参数
        searchParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          //类型 1 物业 2租客 3,4房东
          type: 2,
          buildingGroupId: '',
          buildingId: '',
          buildingFloorId: '',
          buildingRoomId: '',
          resultName: '',
          name: '',
          telphone: '',
          pageIndex: '1',
          pageSize:30
        },
        //当前编辑的行，作为编辑和添加的参数。
        currentRow: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          //产品ID
          productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
          //房间名称
          buildingRoomName: '',
          //房间ID(新增时，这个参数为新房间ID，编辑时为旧房间ID)
          buildingRoomId: '',
          //旧房间ID，编辑时用来暂存数据
          oldBuildingRoomId: '',
          //新房间ID
          newBuildingRoomId: '',
          //租客姓名
          customerName: '',
          telphone: '',
          companyName: '',
          //0添加、1修改
          operation: 1,
          //类型 1 物业 2租客 3,4房东
          type: 2
        },
        //分页相关属性
        page: {
          //当前页码
          currentPageNum: 0,
          //总页码
          pageTotal: 0,
          totalRecord:0//总条数
        },
        //用户ID数组，用来作为删除的参数
        customIdArray: [],
        //弹出对话框相关数据
        dialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        //楼盘弹出对话框标记
        dialogVisibleRoom: false,
        //删除确认框标记
        dialogVisibleDelete: false,
        //表格数据
        tableData: [
          //demo 不要删除，是返回数据的DEMO
          //{buildingRoomName: "A座1层101", telphone: "15694861861", companyName: "天际", customerName: "张若曦"}
        ],
        rules: {
          customerName: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 50, message: '姓名长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          buildingRoomName: [
            {required: true, message: '请选择房间', trigger: 'submit'}
          ],
          mobilephone: [
            {required: true, message: '输入手机号码', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur'}
          ]
        },
        //选择房间的dialog的状态。默认为新增  add为新增或编辑，search为搜索
        dialogChoseRoomState: 'operation', //'search'
        //强制刷新选择房间组件
        hackReset: false,

      }
    },
    computed: {
      httpCurrent: function () {
        if (this.productId == '5') {
          return this.$http;
        }
        else if (this.productId == '6') {
          return this.$httpPasser;
        }
      }
    },
    components: {
      buildingCascader: buildingCascader
    },
    methods: {
      handleSearchRenter() {
        this._http(
          'business/getLandlordTenantListByConditions',
          'get',
          this.editObjToParams(this.searchParams),
          (data) => {
            this.page.pageTotal = data.pageTotal;
            this.tableData = data.result.landlordTenantList;
            this.page.totalRecord =data.totalRecord;//总记录数
          },
          true,
          ()=>{
          	this.text ='暂无数据'
            this.tableData = [];
          }
        )
      },
      //显示编辑客户接口
      handleEdit(index, row) {
        this.operationName = '编辑租客';
        this.operation = 1;
        this.dialogVisible = true;
        for (let o in row) {
          this.currentRow[o] = row[o]
        }
        //暂存旧房间ID。
        this.currentRow.oldBuildingRoomId = this.currentRow.roomId ? this.currentRow.roomId : this.currentRow.buildingRoomId;
        //companyId作为主键ID，存入customerId
        //this.currentRow.companyId = this.currentRow.customerId
        //将操作类型设置为1
        this.currentRow.operation = 1;
      },
      //单条删除
      handleSingalDelete(index, row) {
        this.customIdArray = [];
        this.dialogVisibleDelete = true;
        this.customIdArray.push(row.customerId)
      },
      //显示选择房间对话框
      showChosingDialog(state) {
        //强制刷新房间组件
        this.refleshRoomComponent()
        this.dialogChoseRoomState = state;
        this.dialogVisibleRoom = true;
      },
      //隐藏选择房间对话框
      hideChosingDialog() {
        this.dialogVisibleRoom = false;
      },
      //修改客户信息
      handleSubmitEdit(currentRow) {
        this.$refs[currentRow].validate((valid) => {
          //出参入参不一致，所以需修改

          this.currentRow.telphone = this.currentRow.mobilephone
          if(this.operation == 0){
            //设置新房间ID
            this.currentRow.newBuildingRoomId = this.currentRow.buildingRoomId;
          }
          //如果操作类型是编辑，则修改新旧房间ID参数
          else if(this.operation == 1){
            //设置新房间ID
            this.currentRow.newBuildingRoomId = this.currentRow.buildingRoomId;
            this.currentRow.buildingRoomId = this.currentRow.oldBuildingRoomId;
          }
          if (valid) {
            this._http('business/saveLandlordTenant','get',this.currentRow,(data)=>{
              this.$message.success('修改成功！')
              this.dialogVisible = false;
              this.handleSearchRenter()
            })
          } else {
            this.$message.error('请填写必填项！')
            return false;
          }
        });
      },

      emptyObjCurrentRow() {
        var temp = {};
        for (let o in this.currentRow) {
          this.currentRow[o] = '';
        }
        this.currentRow.companyId = this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '';
        this.currentRow.operation = 1;
        this.currentRow.productId = this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '';
        this.currentRow.type = this.type;
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam) {
        //如果是新增选择房间，则修改currentRow中的roomId
        if (this.dialogChoseRoomState == 'operation') {
          if (buildingParam.buildingRoomId) {
            this.currentRow.buildingRoomId = buildingParam.buildingRoomId;
            this.currentRow.buildingRoomName = buildingParam.buildingRoomName;
          }
        }
        //如果是搜索选择房间，则修改搜索参数中的楼盘，写字楼，房间ID
        else if (this.dialogChoseRoomState == 'search') {
          this.searchParams.buildingGroupId = '';
          this.searchParams.buildingId = '';
          this.searchParams.buildingFloorId = '';
          this.searchParams.buildingRoomId = '';
          this.searchParams.buildingRoomName = '';
          if (buildingParam.buildingGroupId) {
            this.searchParams.buildingGroupId = buildingParam.buildingGroupId;
            this.searchParams.resultName = buildingParam.buildingRoomName;
          }
          if (buildingParam.buildingId) {
            this.searchParams.buildingId = buildingParam.buildingId;
            this.searchParams.resultName = buildingParam.buildingRoomName;
          }
          if (buildingParam.buildingFloorId) {
            this.searchParams.buildingFloorId = buildingParam.buildingFloorId;
            this.searchParams.resultName = buildingParam.buildingRoomName;
          }
          if (buildingParam.buildingRoomId) {
            this.searchParams.buildingRoomId = buildingParam.buildingRoomId;
            this.searchParams.resultName = buildingParam.buildingRoomName;
          }
        }

      },
      handleDialogDeleteSubmit() {
        this.dialogVisibleDelete = false;
        this.handleDelete()
      },
      //展示新增客户窗口
      handleAdd() {
        this.oprationName = '新增租客'
        this.operation = 0;
        this.emptyObjCurrentRow();
        //将操作类型设置为新增
        this.currentRow.operation = 0;
        this.dialogVisible = true;
      },
      //选取框时，将客户ID加入数组
      handleSelectionChange(val) {
        this.customIdArray = [];
        for (let o in val) {
          this.customIdArray.push(val[o].customerId)
        }
        //this.handleDelete()
      },
      //单个或者批量删除
      handleDelete() {
        this.httpCurrent.post(
          'business/deleteLandlordTenant',
          {
            type: 3,
            customerIdList: this.customIdArray
          }
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.handleSearchRenter()
          }
        })
      },
      //设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.searchParams.pageIndex = index;
        this.handleSearchRenter();
      },
      //显示确认删除窗口
      showDelete() {
        this.dialogVisibleDelete = true;
      },
      //选择房间确定
      handleDialogSubmit() {
        this.dialogVisibleRoom = false;
      },
      //强制刷新组件
      refleshRoomComponent() {
        //强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },

      /*工具方法*/
      //编辑参数列表，将空参数删除
      editObjToParams(obj) {
        var temp = {};
        for (let o in obj) {
          if (obj[o] !== '') {
            temp[o] = obj[o];
          }
        }
        return temp;
      },
      //http请求
      _http(url, type, params, callback200, isWarnNull, callback204) {
        if (isWarnNull) {
          isWarnNull = isWarnNull
        }
        else {
          isWarnNull = true;
        }
        if (type == "get") {
          this.httpCurrent.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isWarnNull) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204();
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

        }

      }
    },
    mounted: function () {
      this.handleSearchRenter()
      //初始化参数的产品ID
      this.currentRow.productId = this.$local.sefetch('prductInfo') ? this.$local.sefetch('prductInfo').productId : '';
    }
  }
</script>

<style scoped lang="less">
  .searchLandlord {
    line-height: 35px;
    width: 1200px;
    form {
      line-height: 40px;
    }
    .clear20 {
      clear: both;
      height: 20px;
      width: 100%;
    }
  }
</style>
<style lang="less">
  .searchLandlord {
    .el-table th {
      text-align: center;
    }
    .cell {
      text-align: center;
    }
  }


</style>

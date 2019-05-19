<template>
  <div id="attendanceGroupManager">
    <el-table
      :data="attendanceGroupList"
      @selection-change="handleSelectionChange"
      style="width: 100%" :empty-text=text>
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <!--<el-table-column
        type="index"
        width="55"
        label="编号">
      </el-table-column>-->
      <el-table-column
        prop="attendanceGroupName"
        label="名称"
        width="90">
      </el-table-column>
      <el-table-column
        prop="attendanceConfigName"
        label="班制"
        width="90">
      </el-table-column>
      <el-table-column
        prop="attendanceType"
        label="考勤方式">
      </el-table-column>
      <el-table-column
        prop="attendanceNum"
        label="考勤人数"
        width="100">
        <template slot-scope="scope">
          {{scope.row.attendanceNum}}人
        </template>
      </el-table-column>
      <el-table-column
        prop="attendanceAddress"
        width="180"
        label="考勤地点">
      </el-table-column>
      <el-table-column label="操作" width="155">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEditClick(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSignalDeleteClick(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page.sync="getAttendanceGroupParams.pageIndex"
        layout="prev, pager, next"
        :page-count="getAttendanceGroupParams.pageTotal">
      </el-pagination>
      <div class="fl lh35"><span>共{{this.getAttendanceGroupParams.pageTotal}}页，当前第{{this.getAttendanceGroupParams.pageIndex}}页，每页{{this.getAttendanceGroupParams.pageSize}}条，共{{this.getAttendanceGroupParams.totalRecord}}条</span></div>
      <div class="bottomOperation">
        <el-button
          type="primary"
          @click="openAddDialog">添加考勤组
        </el-button>
        <el-button
          type="primary"
          @click="handleBatchDeleteClick">批量删除考勤组
        </el-button>
      </div>

    </div>
    <el-dialog
      title="添加考勤组"
      :visible.sync="addAttendanceGroupDialogVisible"
      width="40%">
      <el-form label-width="150px">
        <el-form-item label="考勤组名称">
          <el-input v-model="addAttendanceGroupParams.attendanceGroupName" clearable></el-input>
        </el-form-item>
        <el-form-item label="班制">
          <el-select v-model="addAttendanceGroupParams.attendanceConfigId" placeholder="请选择班制">
            <el-option v-for="attendanceConfig,index in attendanceConfigList" :key="index"
                       :label="attendanceConfig.desc" :value="attendanceConfig.attendanceConfigId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤组人员">
          <el-input v-model="addAttendanceGroupParams.attendanceNum+'人'" readonly
                    @focus="showAddTransfer"></el-input>
        </el-form-item>
        <div class="transferDiv" v-if="addTransferFlag">
          <tree-transfer :title="title" :defaultCheckedKeys=defaultCheckedKeys :from_data='fromAddData' :to_data='toAddData'
                         :leafOnly=false :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' :height="height"
                         @ensureBtn="ensureAddChose"
                         filter openAll>
          </tree-transfer>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addAttendanceGroupDialogVisible = false;addTransferFlag=false;">取 消</el-button>
    <el-button type="primary" @click="addAttendanceGroup" :disabled="addDisabled">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑考勤组"
      :visible.sync="editAttendanceGroupDialogVisible"
      width="40%">
      <el-form label-width="150px">
        <el-form-item label="考勤组名称">
          <el-input v-model="editAttendanceGroupParams.attendanceGroupName" clearable></el-input>
        </el-form-item>
        <el-form-item label="班制">
          <el-select v-model="editAttendanceGroupParams.attendanceConfigId" placeholder="请选择班制">
            <el-option v-for="attendanceConfig,index in attendanceConfigList" :key="index"
                       :label="attendanceConfig.desc" :value="attendanceConfig.attendanceConfigId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤组人员">
          <el-input v-model="editAttendanceGroupParams.attendanceNum+'人'" readonly
                    @focus="showEditTransfer"></el-input>
        </el-form-item>
        <div class="transferDiv" v-if="editTransferFlag">
          <tree-transfer :title="title" :defaultCheckedKeys=defaultCheckedKeys :from_data='fromEditData' :to_data='toEditData'
                         :leafOnly=false :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' :height="height"
                         @ensureBtn="ensureEditChose"
                         filter openAll>
          </tree-transfer>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttendanceGroupDialogVisible = false;editTransferFlag = false">取 消</el-button>
        <el-button type="primary" @click="editAttendanceGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除考勤组" :visible.sync="deleteAttendanceGroupDialogVisible" width="22%">
      <span>您确定要删除吗</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteAttendanceGroupDialogVisible = false;">取 消</el-button>
        <el-button type="primary" @click="deleteBatchAttendanceGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //import treeTransfer from 'el-tree-transfer'
  import treeTransfer from '@/components/public/transfer-tree'

  export default {
    name: "attendance-group",
    components: {
      treeTransfer
    },
    data() {
      return {
      	text:'正在加载',
        action:'',
        shopId: this.$local.sefetch('info').companyId,
        //获取考勤组参数
        getAttendanceGroupParams: {
          shopId: this.$local.sefetch('info').companyId,
          pageIndex: 1,
          totalRecord:0,
          pageSize:10,
          pageTotal: 1,
        },
        //考勤组数据
        attendanceGroupList: [
        ],
        //班制列表，用于添加或者编辑考勤
        attendanceConfigList: [
        ],
        //删除考勤组参数
        delateParams: {
          shopId: this.$local.sefetch('info').companyId,
          attendanceGroupIdList: []
        },
        //当前选择selection
        currentSelection: [],
        //添加考勤组参数
        addAttendanceGroupParams: {
          shopId:this.$local.sefetch('info').companyId,
          attendanceNum:'',
          attendanceGroupName: '',//考勤组名称
          attendanceConfigId: '',//班制ID
          employeeIdList: [],//考勤员工ID列表
        },
        //添加考勤组员工列表
        addEmployeeList: [
        ],
        //编辑考勤组员工列表
        editEmployeeList: [],
        //编辑考勤组参数
        editAttendanceGroupParams: {
          shopId:this.$local.sefetch('info').companyId,
          attendanceGroupId: '',//考勤组ID
          attendanceGroupName: '',//考勤组名称
          attendanceConfigId: '',//班制ID
          employeeIdList: [],//考勤员工ID列表
        },
        //添加确定按钮是否可用，用来限制双击
        addDisabled:false,
        //添加考勤组对话框标记
        addAttendanceGroupDialogVisible: false,
        //编辑考勤组对话框标记
        editAttendanceGroupDialogVisible: false,
        //删除确认框标记
        deleteAttendanceGroupDialogVisible: false,
        //添加考勤组穿梭框控制
        addTransferFlag: false,
        //编辑考勤组穿梭框控制
        editTransferFlag: false,

        /*
        * 穿梭框部分的数据
        * */
        //编辑添加公用
        height: '395px',
        title: ['所有员工', '已选员工'],
        mode: "transfer",
        //编辑部分默认选中的
        defaultCheckedKeys: [],
        //添加考勤组的员工数据
        fromAddData: [
        ],
        toAddData: [],
        //编辑考勤组的员工数据
        fromEditData: [
        ],
        toEditData: []
      }
    },
    methods: {
      //获取考勤组列表
      getAttendanceGroupList() {
        this._httpPasser(
          'attendanceController/getAttendanceGroupList',
          'get',
          this.getAttendanceGroupParams,
          (data) => {
            this.attendanceGroupList = data.result;
            this.getAttendanceGroupParams.pageTotal = data.pageTotal
            this.getAttendanceGroupParams.totalRecord = data.totalRecord
          },
          true,
          () => {
            this.attendanceGroupList = [];
            this.getAttendanceGroupParams.pageTotal = data.pageTotal
            this.getAttendanceGroupParams.totalRecord = data.totalRecord
            this.text ="暂无数据"
          }
        )
      },
      //编辑按钮回调方法
      handleEditClick(row) {
        for (let o in row) {
          this.editAttendanceGroupParams[o] = row[o]
        }
        //console.log('row',editAttendanceGroupParams)
        this.getAttendanceGroupParams.pageIndex = 1;
        this.getEditEmployeeList(row.attendanceGroupId)
        this.editAttendanceGroupDialogVisible = true;
      },
      //单个删除按钮回调方法
      handleSignalDeleteClick(row) {
        this.delateParams.attendanceGroupIdList = [];
        this.delateParams.attendanceGroupIdList.push(row.attendanceGroupId)
        this.deleteAttendanceGroupDialogVisible = true;
      },
      //批量删除按钮回调方法
      handleBatchDeleteClick() {
        this.delateParams.attendanceGroupIdList = [];
        for (let o in this.currentSelection) {
          this.delateParams.attendanceGroupIdList.push(this.currentSelection[o])
        }
        if (this.delateParams.attendanceGroupIdList.length <= 0) {
          this.$message({
            showClose: true,
            message: '请选择考勤组',
            type: 'error'
          });
        }
        else {
          this.deleteAttendanceGroupDialogVisible = true;
        }
      },
      //批量删除考勤组方法
      deleteBatchAttendanceGroup() {
        this._httpPasser(
          'attendanceController/deleteAttendanceGroup',
          'post',
          this.delateParams,
          data => {
            this.getAttendanceGroupParams.pageIndex = 1;
            this.getAttendanceGroupList();
            this.delateParams.attendanceGroupIdList = [];
            this.deleteAttendanceGroupDialogVisible = false;
          }
        )
      },
      //编辑考勤组方法
      editAttendanceGroup() {
        this._httpPasser(
          'attendanceController/editAttendanceGroup',
          'post',
          this.editAttendanceGroupParams,
          data => {
            this.getAttendanceGroupParams.pageIndex = 1;
            this.getAttendanceGroupList();
            this.editAttendanceGroupDialogVisible = false;
          }
        )
      },
      //添加考勤组方法
      addAttendanceGroup() {
        if(!this.addDisabled && this.addAttendanceGroupDialogVisible){
          this.addDisabled = true;
          this._httpPasser(
            'attendanceController/addAttendanceGroup',
            'post',
            this.addAttendanceGroupParams,
            data => {
              this.addDisabled = false;
              this.getAttendanceGroupParams.pageIndex = 1;
              this.getAttendanceGroupList();
              this.addAttendanceGroupDialogVisible = false;
            },
            true,
            ()=>{
              this.addDisabled = false;
            },
            ()=>{
              this.addDisabled = false;
            }
          )
        }
      },
      //在对象数组中，根据一个属性名字，获取相应的对象
      //四个参数分别为对象数组，属性名称，属性值，返回对象
      getObjByAttrFromArray(objArray, attrName, attrValue, obj) {
        re = {};
        for (let o in objArray) {
          if (objArray[o][attrName] == attrValue) {
            re = objArray[o];
            return re;
          }
        }
        return re;
      },
      //获取班制列表
      getAttendanceConfig() {
        this._httpPasser(
          'attendanceController/getAttendanceConfigList',
          'get',
          {shopId: this.shopId},
          data => {
            this.attendanceConfigList = data.result;
          }
        )
      },
      //添加时，获取员工列表
      getAddEmployeeList() {
        this._httpPasser(
          'attendanceController/getAddEmployeeList',
          'get',
          {shopId: this.shopId},
          data => {
            this.addEmployeeList = data.result;
            this.addEmployeeList.forEach((items)=>{
              items.id = items['departmentId'];
              items.label = items['name'];
              items.children = items['employeeList']
              items.children.forEach(
                (item)=>{
                  item.label = item['name'];
                  item.id = item['employeeId'];
                  item.pid = items.id;
                  item.children = [];
                  item.disabled = !(item['ifCanChosed']==='Y')
                }
              )
            })
            this.fromAddData = this.addEmployeeList;
          }
        )
      },
      //编辑时，获取员工列表
      getEditEmployeeList(attendanceGroupId) {
        this._httpPasser(
          'attendanceController/getEditEmployeeList',
          'get',
          {
            shopId: this.shopId,
            attendanceGroupId:attendanceGroupId
          },
          data => {
            //获取编辑员工数据，并且进行处理
            this.editEmployeeList = data.result;
            //定义一个临时的对象，对象的key值是部门ID，value是员工数组，用于设置toEditData
            let tempToDataObj={}
            let tempFromDataObj={}
            this.editEmployeeList.forEach((items)=>{
              items.id = items['departmentId'];
              items.label = items['name'];
              items.children = items['employeeList']
              items.children.forEach(
                (item,index,obj)=>{
                  item.label = item['name'];
                  item.id = item['employeeId'];
                  item.pid = items.id;
                  item.children = [];
                  item.disabled = !(item['ifCanChosed']==='Y')
                  //如果这个员工是已选状态，则把他从源数据中挪动到目标数据中
                  if(item['isChosed']==='Y'){
                    if(tempToDataObj[items.id+'_'+items.label]){
                      tempToDataObj[items.id+'_'+items.label].push(item)
                    }
                    else{
                      tempToDataObj[items.id+'_'+items.label] = [];
                      tempToDataObj[items.id+'_'+items.label].push(item)
                    }
                    //obj.splice(index,1)
                  }
                  else{
                    if(tempFromDataObj[items.id+'_'+items.label]){
                      tempFromDataObj[items.id+'_'+items.label].push(item)
                    }
                    else{
                      tempFromDataObj[items.id+'_'+items.label] = [];
                      tempFromDataObj[items.id+'_'+items.label].push(item)
                    }
                  }
                }
              )
            })
            //设置默认的员工数据
           // this.editAttendanceGroupParams
            this.editAttendanceGroupParams.employeeIdList = [];
            for(let o in tempToDataObj){
              for(let p in tempToDataObj[o]){
                this.editAttendanceGroupParams.employeeIdList.push(tempToDataObj[o][p].id)
              }
            }
            //设置穿梭框右侧数据
            this.toEditData = [];
            console.log('数据啊数据',tempToDataObj)
            //写入右侧数据
            for(let o in tempToDataObj){
              let temp = {};
              temp.id = temp.departmentId = o.split('_')[0]
              temp.label = temp.name = o.split('_')[1]
              temp.children = temp['employeeList'] = tempToDataObj[o]
              this.toEditData.push(temp)
            }
            //重写左侧数据
            this.fromEditData = [];
            for(let o in tempFromDataObj){
              let temp = {};
              temp.id = temp.departmentId = o.split('_')[0]
              temp.label = temp.name = o.split('_')[1]
              temp.children = temp['employeeList'] = tempFromDataObj[o]
              this.fromEditData.push(temp)
            }
          }
        )
      },
      //毫秒转时间
      convertMsToHAndM(ms) {
        re = 0;
        let h = 0;
        let m = 0;
        if (ms > 1000 * 60 * 60) {
          h = Math.floor(ms / (1000 * 60 * 60))
          let temp = ms % (1000 * 60 * 60)
          m = Math.floor(temp / (1000 * 60))
        }
        else if (ms > 1000 * 60) {
          m = Math.floor(ms / (1000 * 60))
        }
        else if (ms > 0) {
          m = 1
        }
        else {
          m = 0
        }
        re = (h == 0 ? '' : h + '小时') + m + '分钟';
        return re;
      },
      //修改表格选项的钩子方法
      handleSelectionChange(selection) {
        //清空参数列表
        this.currentSelection = []
        for (let o in selection) {
          this.currentSelection.push(selection[o].attendanceGroupId)
        }
        console.log(this.currentSelection)
      },
      //分页方法
      handleCurrentChange(index) {
        this.getAttendanceGroupParams.pageIndex = index
        this.getAttendanceGroupList()
      },
      //打开添加对话框
      openAddDialog() {
        for(let o in this.addAttendanceGroupParams){
         this.addAttendanceGroupParams[o]='';
        }
        this.getAddEmployeeList();
        this.addAttendanceGroupParams.shopId = this.$local.sefetch('info').companyId;
        this.addAttendanceGroupDialogVisible = true;
      },
      /*
      *
      * 穿梭框部分的方法
      * */
      //显示编辑穿梭框
      showEditTransfer() {
        this.editTransferFlag = true;
      },
      //显示添加穿梭框
      showAddTransfer() {
        this.addTransferFlag = true;
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log('fromData', fromData);
        console.log('toData', toData);
        console.log('obj', obj);
      },
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log('fromData', fromData);
        console.log('toData', toData);
        console.log('obj', obj);
      },
      //监听添加穿梭框确认
      ensureAddChose(fromData, toData){

        let temp = [];
        for(let o in toData){
          for(let p in toData[o].children){
            temp.push(toData[o].children[p].id)
          }
        }
        this.addAttendanceGroupParams.employeeIdList = temp;
        this.addAttendanceGroupParams.attendanceNum = temp.length;

        this.addTransferFlag = false;
      },
      //监听编辑穿梭框确认
      ensureEditChose(fromData, toData){
        let temp = [];
        for(let o in toData){
          for(let p in toData[o].children){
            temp.push(toData[o].children[p].id)
          }
        }
        this.editAttendanceGroupParams.employeeIdList = temp;
        this.editAttendanceGroupParams.attendanceNum = temp.length;
        this.editTransferFlag = false;
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
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204,callBackAnyCode) {
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
              if(callBackAnyCode){
                callBackAnyCode()
              }
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
              if(callBackAnyCode){
                callBackAnyCode()
              }
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

      }
    },
    created() {
      this.getAttendanceGroupList();
      this.getAttendanceConfig();
    }
  }
</script>

<style scoped lang="less">
  #attendanceGroupManager {
    .bottomOperation {
      float: right;
    }
  }
</style>
<style lang="less">
  #attendanceGroupManager {
    .el-pagination {
      float: left;
    }
    .el-input {
      width: 87%;
    }
    .el-select {
      width: 87%;
      .el-input {
        width: 100%;
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
    .transferDiv {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      .el-input {
        width: 100%;
      }
    }
  }
</style>

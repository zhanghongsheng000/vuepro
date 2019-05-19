<template>
  <div class="mainPart" id="PasserConfig">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">通行客配置</span>
      </div>
    </div>
    <div class="selectPart">
      <div class="buildingLaber">写字楼：</div>
      <div class="choseBuiding">
        <el-select v-model="paramsSubmit.buildingId"  clearable placeholder="请选择写字楼" >
          <el-option
            v-for="building,index in buildingInfo.buildingList"
            :key="index"
            :label="building.buildingName"
            :value="building.buildingId">
          </el-option>
        </el-select>
        <el-button type="primary" @click="getPassConfigByBuilding">配置</el-button>
      </div>
    </div>
    <div class="clear20"></div>
    <div class="configLabel">
      临时人员通行配置：
    </div>
    <div class="configItem">
      <el-radio v-for="(item,index) in configItem.items" :key="index" v-model="paramsSubmit.passconfigId"
                :label="item.passconfigId">
        {{item.passconfigName}}
      </el-radio>
      <div class="clear20"></div>
      <div class="choseUser" v-if="isChoseEmployeeShow">
        <span>物业审批临时通行请求人员</span>
        <el-button type="danger" round @click="handleShowChoseDialog">选择</el-button>
        <div class="devideDiv"></div>
        <div class="userList">
          <span v-for="user,index in userIdObject" :key="index">{{user}}</span>
        </div>
      </div>
    </div>
    <div class="clear20"></div>
    <el-button type="primary" round @click="savePassConfig">保存</el-button>

    <div class="clear20"></div>
    <el-dialog
      title="物业审批临时通行请求人员"
      :visible.sync="choseUserDialog"
      @open="openDialog"
      :modal-append-to-body='false'
      width="60%">
      <div class="forms-cont clearfix">
        <div class="form-item fl">
          <el-select v-model.trim="searchEmployeeParams.departmentId" placeholder="部门">
            <el-option
              v-for="department,index in departmentInfo.departmentList"
              :key="index"
              :label="department.departmentName"
              :value="department.departmentId">
            </el-option>
          </el-select>
        </div>
        <div class="form-item fl">
          <el-input v-model.trim="searchEmployeeParams.name" placeholder="请输入姓名" clearable></el-input>
        </div>
        <!--<div class="form-item fl">
          <el-input v-model.trim="searchEmployeeParams.telPhone" placeholder="手机号"></el-input>
        </div>-->
        <div class="form-item fl">
          <el-button type="primary" @click="handleSearchEmployee">查询</el-button>
        </div>
        <div class="form-item fr">
        </div>
      </div>
      <!--@selection-change="handleSelectionChange"
      @select-all="seleAll"-->
      <div class="tables">
        <el-table
          ref="employeeTable"
          :data="staffInfo.employeeList"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column fixed type="selection"></el-table-column>
          <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
          <el-table-column prop="departmentName" label="部门"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="telphone" label="手机号码"></el-table-column>
        </el-table>
      </div>
      <div class="clearfix">
        <div class="pages fl">
          <el-pagination
            background
            :current-page.sync="staffInfo.pageIndex"
            layout="prev, pager, next"
            :page-count="staffInfo.pageTotal"
            @current-change="pagesChange"
          ></el-pagination>
        </div>
        <div class="fl pagestyle">
          <span>共{{this.staffInfo.pageTotal}}页，当前第{{this.staffInfo.pageIndex}}页,每页30条，共{{this.staffInfo.totalRecord}}条</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelChoseUser">取 消</el-button>
        <el-button type="primary" @click="handleConfirmChoseUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "passer-config",
    data() {
      return {
        companyId: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        },
        //写字楼信息
        buildingInfo: {
          buildingName: '',
          buildingId: '',
          buildingList: [
            /*{
              buildingName: '荣鼎天下A座',
              buildingId: '1'
            },
            {
              buildingName: '荣鼎天下B座',
              buildingId: '2'
            },
            {
              buildingName: '荣鼎天下C座',
              buildingId: '3'
            }*/
          ]
        },
        //配置项信息
        configItem: {
          result: '',
          items: [
            /*{
              "passconfigId": "1",
              "passconfigName": "直接扫码通行"
            },
            {
              "passconfigId": "2",
              "passconfigName": "向物业申请，经物业同意后，扫码通行"
            },
            {
              "passconfigId": "3",
              "passconfigName": "向物业申请，物业自动备案，扫码通行"
            }*/
          ]
        },
        //搜索员工参数
        searchEmployeeParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          pageIndex: 1,
          pageSize: '',
          departmentId: '',
          /*telPhone:'',*/
          name: ''
        },
        //员工信息
        staffInfo: {
          pageIndex: 1,//当前页数
          pageSize: '',//每页条数
          pageTotal: 0,//共页数
          totalRecord: 0,//总条数
          employeeList: []
        },
        //一个对象，会以userId为主键，
        //第一会将服务器获取的数据存储到这个对象，便于显示
        //第二会将用户选择的员工存入此对象，然后再将其中的userId存入paramsSubmit.customerUserId
        //这么做是为了避免查重操作
        //如果用户放弃了选择，那么回滚
        userIdObject:{},
        //如果用户放弃选择，那么需要将用户数组对象回滚
        userIdRollBack:{},
        //保存缴费项需要提交的参数对象
        paramsSubmit: {
          //写字楼ID
          buildingId: '',
          //配置项ID
          passconfigId: '',
          //员工ID数组
          customerUserId: []
        },
        //部门信息
        departmentInfo: {
          departmentList: [
            /*{
              departmentCode: null,
              departmentId: 40,
              departmentName: "技术部",
              type:"部门"
            }*/
          ]
        },
        employeeList: {},
        //选择的员工
        chosedEmployeeList: [],
        //临时选择的员工
        chosedEmployeeListTemp: [],
        choseUserDialog: false
      }
    },
    computed:{
      isChoseEmployeeShow:function(){
        let flag = false;
        if(this.paramsSubmit.passconfigId == 2){
          flag = true;
        }
        return flag;
      }
    },
    methods: {
      indexMethod(index) {//编号
        return (this.staffInfo.pageIndex - 1)*30 + 1 + index;
      },
      getBuildingList() {
        this._httpPasser('building/getBuildingListByCompanyId', 'get', this.companyId, data => {
          this.buildingInfo.buildingList = data.result
          this.paramsSubmit.buildingId = this.buildingInfo.buildingList[0].buildingId;
        })
      },
      //获取部门列表
      getDepartment() {//公司部门列表
        this._httpPasser(
          'company/queryDepartmentDetailByCompanyId',
          'get',
          this.companyId,
          data => {
            this.departmentInfo.departMentList = data.result.departmentList;
          }
        )

      },
      //查询员工钩子方法
      handleSearchEmployee() {
        this.searchEmployeeList();
      },
      //查询员工
      searchEmployeeList(callback) {
        this._httpPasser(
          'employee/getPropertyEmployeeByCondition',
          'get',
          this.editObject(this.searchEmployeeParams),
          data => {
            this.staffInfo = data
            this.staffInfo.employeeList = this.staffInfo.result.employeeList;
            if(callback){
              callback()
            }

          }
        )
      },
      //获取配置项信息
      getPassConfig() {
        this._httpPasser(
          'company/getPassConfig',
          'get',
          {},
          data => {
            this.configItem.items = data.result;
          }
        )
      },
      //保存通行配置
      savePassConfig() {
        this._httpPasser(
          'company/savePassConfig',
          'post',
          this.paramsSubmit,
          data => {
            this.$message.success('配置成功！')
          }
        )
      },
      //显示选择员工对话框
      handleShowChoseDialog() {
        this.choseUserDialog = true;
      },
      //点击页码方法
      pagesChange(index) {
        this.searchEmployeeParams.pageIndex = index;
        this.searchEmployeeList(() => {
          //将以已选中用户渲染到表中
          this.drawInConfigEmployeeToPage()
        });

      },
      //勾选员工表格时的回调
      handleSelectionChange(selection){
        //清空你妹的对象
        //this.userIdObject = {};
        //将选择的用户存入员工主键对象
        console.log('selection',selection)
        for(let o in selection){
          this.userIdObject[selection[o].userId] = selection[o].name;
        }
        //清空参数列表
        this.paramsSubmit.customerUserId = [];
        //将选择的用户存入paramsSubmit.customerUserId
        let index = 0;
        for(let p in this.userIdObject){
          this.paramsSubmit.customerUserId.push(p.toString())
        }
      },
      //根据写字楼获取已配置的配置项
      getPassConfigByBuilding() {
        this._httpPasser(
          'company/getPassConfigByBuilding',
          'get',
          {buildingId: this.paramsSubmit.buildingId},
          data => {
            this.paramsSubmit = data.result;
            //将配置项的userId取出来存入到paramsSubmit的customerUserId
            this.paramsSubmit.customerUserId = [];
            for(let o in data.result.employee){
              this.paramsSubmit.customerUserId.push(data.result.employee[o].custemerUserId.toString())
            }
            console.log('fistGet',this.paramsSubmit.customerUserId)
            //将配置项的用户信息存入到用户对象
            this.userIdObject = {};
            if(data.result.employee.length>0){
              for(let o in data.result.employee){
                this.userIdObject[data.result.employee[o].custemerUserId] = data.result.employee[o].name
              }
            }
            this.userIdRollBack = {}
            //将配置项的用户信息存入到用户回滚对象
            for(let o in data.result.employee){
              this.userIdRollBack[data.result.employee[o].custemerUserId] = data.result.employee[o].name
            }
          },
          //如果为空不提示信息
          false
        )
      },
      //将获取的配置项员工
      drawInConfigEmployeeToPage() {
        //此方法必须在dialog加载完毕的时候进行调用，否则无法获取refs中的table
        this.$nextTick(function () {
          //从服务器获取已经配置了员工列表
          let tempConfigEmployeeList = this.paramsSubmit.customerUserId;
          //所有员工的列表
          let employeeList = this.staffInfo.employeeList
          //首先清除所有勾选
          this.$refs.employeeTable.clearSelection();
          for (let o in employeeList) {
            for (let p in tempConfigEmployeeList) {
              if (employeeList[o].userId == tempConfigEmployeeList[p]) {
                this.$refs.employeeTable.toggleRowSelection(employeeList[o])
              }
            }
          }
        })
      },
      //打开dialog的时候将员工选择情况写入
      openDialog() {
        this.drawInConfigEmployeeToPage()
      },
      //取消用户的员工选择
      handleCancelChoseUser(){
        //回滚数据
        this.userIdObject = {};
        for(let o in this.userIdRollBack){
          this.userIdObject[o] = this.userIdRollBack[o]
        }
        //清空参数列表
        this.paramsSubmit.customerUserId = [];
        //将选择的用户存入paramsSubmit.customerUserId
        let index = 0;
        for(let p in this.userIdObject){
          this.paramsSubmit.customerUserId.push(p.toString())
        }
        //关闭对话框
        this.choseUserDialog = false;
        //重置选项
        this.drawInConfigEmployeeToPage()

      },
      //确认用户的员工选择
      handleConfirmChoseUser(){
        this.choseUserDialog = false;
        //更新回滚数据userId对象
        for(let o in this.userIdObject){
          this.userIdRollBack[o] = this.userIdObject[o].toString()
        }

      },
      /*通行客工具方法*/
      _httpPasser(url, type, params, callback200, isNoWarnNull) {
        //默认提示返回信息为空
        if (typeof isNoWarnNull === 'undefined') {
          isNoWarnNull = true;
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
                if (isNoWarnNull) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
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
                if (isNoWarnNull) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
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

      },
      //处理对象。将对象中的控制或者Null删除
      editObject(obj) {
        let temp = {};
        for (let o in obj) {
          if (obj[o] != '' && obj[o] != undefined && obj[o] != null) {
            temp[o] = obj[o]
          }
        }
        return temp;
      }
    },
    created: function () {
      this.getBuildingList();
      this.getPassConfig();
      this.searchEmployeeList();
      //this.getDepartment();

    }
  }
</script>

<style scoped lang="less">
  #PasserConfig {
    /*width: 800px;*/
    .selectPart {
      width: 100%;
      .buildingLaber {
        width: 60px;
        float: left;
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 14px;
      }
      .choseBuiding {
        margin-left: 15px;
        float: left;
      }
    }
    .configLabel {
      width: 130px;
      float: left;
      height: 40px;
      line-height: 10px;
      text-align: left;
      font-size: 14px;
    }
    .configItem {
      margin-left: 10px;
      float: left;
      label {
        display: block;
      }
      .choseUser {
        position: relative;
        line-height: 50px;
        width: 350px;
        text-indent: 10px;
        background-color: #eeeeee;
        font-size: 14px;
        border: solid 1px #cccccc;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        button {
          position: absolute;
          right: 5px;
          top: 5px;
        }
        .devideDiv{
          width:100%;
          height:1px;
          clear:both;
          background-color:rgb(204,204,204);
        }
        .userList{
          text-indent: 0px;
          span{
            display:inline-block;
            height:50px;
            line-height:50px;
            margin:0px;
            padding:0px;
            text-align:center;
            min-width:65px;
            text-indent:0px;
          }
        }
      }
    }
    .pagestyle{
      line-height: 30px;
    }
  }
</style>
<style lang="less">
  #PasserConfig {
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
    .el-dialog__title {
      font-size: 15px;
    }
    .configItem {
      .el-radio + .el-radio {
        margin-left: 0px;
        margin-top: 8px;
      }
    }

  }
</style>

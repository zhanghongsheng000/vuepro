<template>
  <div class="rscont qiyecontainer">
    <div class="banner">
      <div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
    </div>
    <div class="main-cont">
      <div class="common pt50">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">员工管理</span>
        </div>
        <div class="main-box">
          <div class="tables">
            <el-table :data="staffList" style="width: 100%"
                      @selection-change="handleSelectionChange"
                      @select-all="seleAll"
                      align="left">
              <el-table-column fixed type="selection" width="50" header-align="left" :selectable="isNeedImproveCheckBoxFlag">

              </el-table-column>
              <el-table-column type="index" width="50" header-align="left" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="roleName" label="角色" header-align="left" width="50"></el-table-column>
              <el-table-column prop="departmentName" label="部门" width="90" header-align="left"></el-table-column>
              <el-table-column prop="workCode" label="工号" width="100" header-align="left"></el-table-column>
              <el-table-column prop="name" width="100" label="姓名" header-align="left"></el-table-column>
              <el-table-column prop="sex" width="50" label="性别" header-align="left"></el-table-column>
              <el-table-column prop="position" width="50" label="职位" header-align="left"></el-table-column>
              <el-table-column prop="status" label="状态" header-align="left" width="50"></el-table-column>
              <el-table-column prop="entryTime" label="入职时间" header-align="left"></el-table-column>
              <el-table-column prop="regulartTime" label="转正时间" header-align="left"></el-table-column>
              <el-table-column prop="telphone" label="手机号码" header-align="left"></el-table-column>
              <el-table-column prop="idCard" label="身份证号码" header-align="left" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" header-align="left" width="200">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="outClick(scope.row)" :disabled="scope.row.isNeedImprove">离职</el-button>
                  <el-button @click="stopClick(scope.row)" type="text" size="small" :disabled="scope.row.isNeedImprove">停职</el-button>
                  <el-button type="text" size="small" @click="editClick(scope.row)" :disabled="scope.row.isNeedImprove">编辑</el-button>
                  <el-button v-if="scope.row.isNeedImprove" type="text" size="small" @click="editClick(scope.row)"><span class="improveButton">完善资料</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="btns">
            <el-button type="primary" round @click="outBtn">离职</el-button>
            <el-button type="primary" round @click="stopBtn">停职</el-button>
            <el-button type="primary" round @click="deleteBtn">删除</el-button>
            <el-button type="primary" round @click="dialogFormVisible = true">添加员工</el-button>
          </div>
          <div class="clearfix" v-if="num>0?true:false">
            <div class="pages fl" >
              <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>
            </div>
            <div class="fl pagestyle">
              <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.totalRecord}}条数据</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-box">
      <el-dialog title="添加员工" v-loading="loading2" element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                 :visible.sync="dialogFormVisible" width="464px" top="50px" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">角色：</div>
            <div class="sitemr fl">
              <el-select v-model="rolenow" clearable placeholder="角色">
                <el-option
                  v-for="item,index in roleList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">部门：</div>
            <div class="sitemr fl">
              <el-select v-model="sbumen" clearable placeholder="部门">
                <el-option
                  v-for="item,index in departmentList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">姓名：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newName" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">性别：</div>
            <div class="sitemr fl line-height-40">
              <el-radio v-model="newSex" label="男">男</el-radio>
              <el-radio v-model="newSex" label="女">女</el-radio>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">入职时间：</div>
            <div class="sitemr fl">
              <el-date-picker
                v-model="entryTime"
                type="date"
                placeholder="选择入职日期"
                value-format="yyyy-MM-dd"
                @change='inputentryTime'>
              </el-date-picker>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">转正时间：</div>
            <div class="sitemr fl">
              <el-date-picker
                v-model="formalTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择转正日期"
                @change='inputregularTime'>
              </el-date-picker>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">职位：</div>
            <div class="sitemr fl">
              <el-select v-model="newPosition" clearable placeholder="职位">
                <el-option v-for="item,index in positionList" :key="index" :label="item.dictionariesName"
                           :value="item.dictionariesValue">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">手机号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newPhone" placeholder="请输入手机号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">身份证号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newIdNum" placeholder="请输入身份证号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">密码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="newPassword" placeholder="默认密码123456" clearable></el-input>
            </div>
          </div>
          <p style="color:#ff0000;">提示：转正时间可后期添加</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Preservation" :disabled="istrue">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="员工编辑" :visible.sync="dialogFormVisible2" width="464px" top="50px" :close-on-click-modal="false">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml fl">角色：</div>
            <div class="sitemr fl">
              <el-select v-model="editrole" clearable placeholder="角色">
                <el-option
                  v-for="item,index in roleList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">部门：</div>
            <div class="sitemr fl">
              <el-select v-model="editsbumen" clearable placeholder="部门">
                <el-option v-for="item,index in departmentList" :key="index" :label="item.departmentName"
                           :value="item.departmentId"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">姓名：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editName" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">性别：</div>
            <div class="sitemr fl line-height-40">
              <el-radio v-model="editSex" label="男">男</el-radio>
              <el-radio v-model="editSex" label="女">女</el-radio>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">状态：</div>
            <div class="sitemr fl">
              <el-select v-model="editState" clearable placeholder="请选择状态">
                <el-option v-for="item,index in stateList" :key="index" :label="item.dictionariesName"
                           :value="item.dictionariesValue"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">入职时间：</div>
            <div class="sitemr fl">
              <el-date-picker v-model="editEntryTime" type="date" placeholder="选择入职日期"
                              value-format="yyyy-MM-dd" @change='inputentryTime'></el-date-picker>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">转正时间：</div>
            <div class="sitemr fl">
              <el-date-picker v-model="editFormalTime" type="date" value-format="yyyy-MM-dd"
                              placeholder="选择转正日期" @change='inputregularTime'></el-date-picker>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">职位：</div>
            <div class="sitemr fl">
              <el-select v-model="editPosition" clearable placeholder="职位">
                <el-option v-for="item,index in positionList" :key="index" :label="item.dictionariesName"
                           :value="item.dictionariesValue"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">手机号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editPhone" placeholder="请输入手机号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">身份证号码：</div>
            <div class="sitemr fl">
              <el-input v-model="editIdNum" placeholder="请输入身份证号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">密码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editPassword" placeholder="默认密码123456" clearable></el-input>
            </div>
          </div>
          <p style="color:red;">提示：转正时间可后期添加</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="editPreservation" :disabled="istrue">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading2: false,
        departmentList: [],//部门列表
        stateList: [],//状态列表
        staffList: [],//员工列表
        pagetotal: '',//员工列表总条数
        dialogFormVisible: false,//弹层显示隐藏
        pageNow: 1,//当前页码
        pageTotal:0,//总页数
        totalRecord:0,//总记录数
        roleList: [],//角色列表
        rolenow: '',//入职角色
        editrole: '',//编辑角色
        oldUserRoleId: '',//编辑之前角色id
        sbumen: '',//入职选择的部门
        newName: '',//入职姓名
        newState: '',//入职状态
        newSex: '',//入职性别
        positionList: [],//入职 职位列表
        newPosition: '',//入职职位
        newPhone: '',//入职手机号
        newIdNum: '',//入职身份证号
        newPassword: '123456',//入职密码
        entryTime: '',//入职时间
        formalTime: '',//转正时间

        selectList: [],//选择框时候的数组
        selectNowList: [],//选择框变化的时候所选中的数组id数组//传给后台的时候的数组

        dialogFormVisible2: false,//编辑
        editsbumen: '',//编辑部门当前项
        editsbumenOld: '',//编辑  部门  旧idq
        editName: '',//编辑姓名
        editState: '',//编辑状态
        editSex: '',//编辑性别
        editEntryTime: '',//编辑入职时间
        editFormalTime: '',//编辑转正时间
        editPosition: '',//编辑职位
        editPhone: '',//编辑电话
        editIdNum: '',//编辑身份证号码
        editPassword: '123456',//编辑密码
        yuanGongId: '',//员工id
        istrue: false,//日期正确
        code: '',//20180716 添加的code = 编辑的时候的workCode
        sex: '',//性别

        //员工需检测字段名称数组。如果这些字段没有全，则不可以进行操作
        nonEmptyFiled:['departmentName','roleName','name','sex','status','entryTime','position','telphone','idCard']
      }
    },
    created() {
      this.getDepartment()
      this.getState()
      this.getstaffList(1)
      this.getPositionList()
      //获取企业角色
      this.$http.post('employee/getCustomerRole')
        .then(res => {
          let data = res.data
          // console.log(data)
          if (data.resultCode == '200') {
            this.roleList = data.result
          } else {
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
    methods: {
      inputentryTime(date) {//入职时间
        this.entryTime = date;
        console.log(this.entryTime)
      },
      indexMethod(index) {
        return (this.pageNow - 1)*30 + 1 + index;
      },
      inputregularTime(date) {//转正时间
        this.formalTime = date;
        if (this.entryTime > this.formalTime) {
          this.$message({
            showClose: true,
            message: '转正日期不能在入职之前',
            type: 'error'
          });
          this.istrue = true;
        } else {
          this.istrue = false;
        }
      },
      editClick(row) {//编辑
        console.log(row)
        this.dialogFormVisible2 = true
        for (var m = 0; m < this.departmentList.length; m++) {
          if (this.departmentList[m].departmentName == row.departmentName) {
            this.editsbumenOld = this.departmentList[m].departmentId//编辑时候获取的旧id 没有双向数据绑定
            this.editsbumen = this.departmentList[m].departmentId//编辑  部门 id
          }
        }
        this.editName = row.name
        // console.log(this.stateList)
        for (var i = 0; i < this.stateList.length; i++) {
          if (this.stateList[i].dictionariesName == row.status) {
            this.editState = this.stateList[i].dictionariesValue//状态
          }
        }
        this.editEntryTime = row.entryTime
        this.editFormalTime = row.regulartTime
        for (var j = 0; j < this.positionList.length; j++) {
          if (this.positionList[j].dictionariesName == row.position) {
            this.editPosition = this.positionList[j].dictionariesValue//职位
          }
        }
        this.editSex = row.sex
        console.log(this.editSex)
        this.editPhone = row.telphone
        this.editIdNum = row.idCard
        for (var n = 0; n < this.roleList.length; n++) {
          if (this.roleList[n].roleName == row.roleName) {
            this.oldUserRoleId = this.roleList[n].roleId//编辑角色
            this.editrole = this.roleList[n].roleId
          }
        }
        this.yuanGongId = row.employeeId
        this.code = row.workCode
      },
      editPreservation() {//编辑保存
        if (this.editName == '') {
          this.$message({showClose: true, message: '请输入姓名', type: 'error'})
        } else if (this.editEntryTime == '') {
          this.$message({showClose: true, message: '请选择入职时间', type: 'error'})
        } else if (this.editSex == '') {
          this.$message({showClose: true, message: '请选择性别', type: 'error'})
        }
        else if (this.editPhone == '') {
          this.$message({showClose: true, message: '请输入手机号', type: 'error'})
        } else if (!/^0?1[3456789]\d{9}$/.test(this.editPhone)) {
          this.$message({showClose: true, message: '电话号码格式错误', type: 'error'})
        } else if (this.editIdNum == '') {
          this.$message({showClose: true, message: '请输入身份证号码', type: 'error'})
        } else {
          console.log('编辑了')
          this.loading2 = true
          let gsid = this.$local.sefetch('info').companyId
          let userRoleId = this.$local.sefetch('info').companyId
          this.$http.post('employee/saveEmployee', {
            oldUserRoleId: this.oldUserRoleId,//角色Id
            newUserRoleId: this.editrole,//角色Id
            code: this.code,
            companyId: gsid,//公司id
            customer_employee_id: this.yuanGongId,//员工id
            old_customer_department_id: this.editsbumenOld,//员工原部门Id
            // userRoleId: this.editrole,//编辑下拉选择的角色5中
            sex: this.editSex,//性别
            new_customer_department_id: this.editsbumen,//编辑选择的部门
            name: this.editName,//编辑姓名
            status: this.editState,//编辑状态
            entry_time: this.editEntryTime,//编辑时间
            work_time: this.editFormalTime,//编辑时间
            post: this.editPosition,//编辑职位
            telphone: this.editPhone,//入职手机号
            idcard: this.editIdNum,//入职身份证号
            password: this.editPassword,
          })
            .then(res => {
              let data = res.data
              // console.log(data)
              if (data.resultCode == '200') {
                this.loading2 = false
                this.$message({
                  showClose: true,
                  message: '编辑成功',
                  type: 'success'
                });
                this.dialogFormVisible2 = false
                this.getstaffList(this.pageNow)

              } else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
        }
      },
      stopClick(row) {//单个停职
        console.log(row);
        this.$http.post('employee/batchUpdateEmployee', {
          employeeIdList: row.employeeId,
          status: '2'
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
              this.getstaffList(this.pageNow)
            } else {
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
      outClick(row) {//单个离职
        // console.log(row)
        this.$http.post('employee/batchUpdateEmployee', {
          employeeIdList: [row.employeeId],
          status: '3'
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
              this.getstaffList(this.pageNow)
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
      outBtn() {//多个离职
        if (this.selectNowList < 1) {
          this.$message({
            showClose: true,
            message: '请先选中',
            type: 'error'
          });
        } else {
          this.$http.post('employee/batchUpdateEmployee', {
            employeeIdList: this.selectNowList,
            status: '3'
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });
                this.getstaffList(this.pageNow)
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
      stopBtn() {//
        if (this.selectNowList < 1) {
          this.$message({
            showClose: true,
            message: '请先选中',
            type: 'error'
          });
        } else {
          this.$http.post('employee/batchUpdateEmployee', {
            employeeIdList: this.selectNowList,
            status: '2'
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });
                this.getstaffList(this.pageNow)
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
      deleteBtn() {//多个删除
        if (this.selectNowList < 1) {
          this.$message({
            showClose: true,
            message: '请先选中',
            type: 'error'
          });
        } else {
          let productId = this.$local.sefetch('productInfo').productId//  20180814 1440  标让添加
          this.$http.post('employee/deleteEmployee', {
            employeeIdList: this.selectNowList,
            productId
          })
            .then(res => {
              let data = res.data
              console.log(this.selectNowList)
              if (data.resultCode == '200') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });
                this.getstaffList(this.pageNow)
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
      handleSelectionChange(val) {//复选框选中的时候触发
        this.selectNowList = []
        for (var i = 0; i < val.length; i++) {
          this.selectNowList.push(val[i].employeeId)
        }
        // console.log(this.selectNowList)
        /*console.log(val)
        console.log( this.isNeedImprove(val[0],this.nonEmptyFiled))*/


      },
      seleAll(selection) {//当用户手动勾选全选 Checkbox 时触发的事件
        console.log(selection)
      },
      Preservation() {//添加员工保存
        if (!this.sbumen) {
          this.$message({showClose: true, message: '请选择部门', type: 'error'})
        } else if (this.newName == '') {
          this.$message({showClose: true, message: '请输入姓名', type: 'error'})
        } else if (!this.newSex) {
          this.$message({showClose: true, message: '请选择性别', type: 'error'})
        } else if (!this.entryTime) {
          this.$message({showClose: true, message: '请选择入职时间', type: 'error'})
        } else if (this.newPosition == '') {
          this.$message({showClose: true, message: '请输入职位', type: 'error'})
        } else if (this.rolenow == '') {
          this.$message({showClose: true, message: '请选择角色', type: 'error'})
        } else if (this.newPhone == '') {
          this.$message({showClose: true, message: '请输入手机号', type: 'error'})
        } else if (!/^0?1[3456789]\d{9}$/.test(this.newPhone)) {
          this.$message({showClose: true, message: '电话号码格式错误', type: 'error'})
        } else if (this.newIdNum == '') {
          this.$message({showClose: true, message: '请输入身份证号码', type: 'error'})
        } else {
          let gsid = this.$local.sefetch('info').companyId
          // let roleId=this.$local.sefetch('info').roleList[0].customerRoleId
          this.$http.post('employee/saveEmployee', {
            companyId: gsid,//公司id
            // userRoleId:roleId, //次账号角色id
            newUserRoleId: this.rolenow, //改来改去的 我也不知道是啥了  应该是角色id  20180720 1009
            new_customer_department_id: this.sbumen,//入职选择的部门
            name: this.newName,//入职姓名
            sex: this.newSex,//入职性别
            //新增员工恒定是在职状态
            status: "1",//this.newState,//入职状态
            entry_time: this.entryTime,//入职时间
            work_time: this.formalTime,//转正时间
            post: this.newPosition,//入职职位
            telphone: this.newPhone,//入职手机号
            idcard: this.newIdNum,//入职身份证号
            password: this.newPassword,//密码
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.dialogFormVisible = false
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                })
                this.newIdNum = ''//入职身份证号
                this.newPhone = ''//入职手机号
                this.entryTime = ''//入职时间
                this.formalTime = ''//转正时间
                this.newState = ''//入职状态
                this.newPosition = ''//入职职位
                this.newName = ''//入职姓名
                this.sbumen = ''//入职选择的部门
                this.rolenow = ''//角色置空
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
        console.log(this.entryTime)
      },
      getPositionList() {//获取职位列表
        this.$http.post('company/getDictionaryNamesByDictionariesModule', {
          dictionariesModule: 'position'
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.positionList = data.result
              // console.log(this.positionList)
              // console.log(data)
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
      getstaffList(pagnum) {//获取员工列表
        let gsid = this.$local.sefetch('info').companyId
        let productId = this.$local.sefetch('productInfo').productId
        this.$http.post('employee/getEmployeeByConditions', {//employee/getEmployeeByConditions
          companyId: gsid,
          productId,
          pageIndex: pagnum,
          // pageSize:2
        })
          .then(res => {
            let data = res.data
            // console.log(data)
            if (data.resultCode == '200') {
              this.staffList = data.result.employeeList
              this.pagetotal = parseInt(data.totalRecord)
              this.pageTotal = data.pageTotal;
              this.totalRecord = data.totalRecord;
              //遍历员工列表，如果有未完善资料，则提示完善资料
              for(let o in this.staffList){
                if(this.isNeedImprove(this.staffList[o],this.nonEmptyFiled)){
                  this.staffList[o].isNeedImprove = true;
                }
                else{
                  this.staffList[o].isNeedImprove = false;
                }
              }
              console.log(this.staffList)
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
              this.staffList = data.result.employeeList
              this.pagetotal = parseInt(data.totalRecord)
            } else {
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
      getState() {//获取状态列表
        this.$httpPasser.post('baseDic/getEmployeeStatus')
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.stateList = data.result
              // console.log(this.stateList)
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
      getDepartment() {//公司部门列表
        let gsid = this.$local.sefetch('info').companyId
        this.$http.post('company/queryDepartmentDetailByCompanyId', {
          companyId: gsid
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.departmentList = data.result.departmentList
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
      //判断是否需要完善资料
      //第一个参数是需要判断的对象。第二个参数是需要进行检测的属性数组
      isNeedImprove(obj,paramArr){
        let re = false;
        for(let o in paramArr){
          if(obj[paramArr[o]]=='' || obj[paramArr[o]]==null){
            re = true;
            break;
          }
          else{
            continue;
          }
        }
        return re;
      },
      //判断当前行是否可以选中
      isNeedImproveCheckBoxFlag(row,index){
        let re = true;
        for(let o in this.nonEmptyFiled){
          if(row[this.nonEmptyFiled[o]]=='' || row[this.nonEmptyFiled[o]]==null){
            re = false;
            break;
          }
          else{
            continue;
          }
        }
        return re;
      },
      pagesChange(currentPage) {//分页
        this.pageNow = currentPage
        this.getstaffList(currentPage)
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
    .line-height-40{
      line-height: 40px;
    }
    .improveButton{
      color:#e44f4f;
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
  .qiyecontainer {
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .is-left {
      text-align: left !important;
    }
    .el-table th > .cell {
      text-align: left !important;
    }
  }
</style>

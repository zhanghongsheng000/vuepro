<template>
  <div id="searchRenter" class="mainPart">
    <div>
      <div class="top-title" style="padding-top: 20px;">
        <div class="line"></div>
        <span class="top-text">查询租客</span>
      </div>
    </div>
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="房间">
        <el-input v-model="searchParams.resultName" @change="setPageIndex"  clearable  @clear="clearRoomInput" placeholder="请选择房间"
                  @focus="showChosingSearchDialog"></el-input>
      </el-form-item>
      <el-form-item label="法人姓名">
        <el-input v-model="searchParams.name" @change="setPageIndex" clearable @clear="clearInput('name')" placeholder="请输入法人姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchParams.telphone" @change="setPageIndex" clearable @clear="clearInput('telphone')" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="searchParams.companyName"  @change="setPageIndex" clearable @clear="clearInput('companyName')" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchRenter">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="clear20"></div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        label="选择"
        width="55">
      </el-table-column>
      <el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
      <el-table-column
        label="楼层"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.floorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房间名称"
        width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingRoomName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="法人姓名"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="公司名称"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务联系人"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.linkman }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.linkManPhone }}</span>
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
            @click="handleSingalDelete(scope.$index, scope.row)">搬离
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>

    <div class="clear20"></div>


    <div class="clearfix">
      <div class="fl">
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
          <div class="fl" style="line-height: 30px">
            <span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页{{this.page.pageSize}}条，共{{this.page.totalRecord}}条</span>
          </div>
        </div>
      </div>
      <div class="fr">
        <el-button type="primary" @click="showDelete">搬离</el-button>
      </div>
    </div>
    <el-dialog
      :title="operationName"
      :visible.sync="dialogVisible"
      :modal-append-to-body='false'
      width="30%">

      <el-form :model="currentRow" :rules="rules" ref="currentRow">
        <div class="items clearfix">
          <div class="item-text fl">公司名称</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="currentRow.companyName" placeholder="请输入公司名称"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">公司经营地址</div>
          <div class="item-ipt fl">
            <el-input v-model="currentRow.buildingRoomName" placeholder="请选择公司经营地址"
                      @focus="showChosingDialog('operation')"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">营业执照照片</div>
          <div class="item-ipt fl" id="addrent">
            <el-upload
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs"
              :show-file-list="false"
            >
              <img v-if="currentRow.licensePicture" :src="gImgUrl+currentRow.licensePicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">法人身份证正面照片</div>
          <div class="item-ipt fl" id="addrent2">
            <el-upload
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs2"
              :show-file-list="false">
              <img v-if="currentRow.idcardFrontPicture" :src="gImgUrl+currentRow.idcardFrontPicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">法人身份证反面照片</div>
          <div class="item-ipt fl" id="addrent3">
            <el-upload
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs3"
              :show-file-list="false">
              <img v-if="currentRow.idcardBackPicture" :src="gImgUrl+currentRow.idcardBackPicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">业务联系人</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="currentRow.linkman" placeholder="请输入业务联系人"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">业务联系人电话</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="currentRow.linkManPhone"  placeholder="请输入业务联系人电话"></el-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEdit('currentRow')">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisibleRoom"
      :modal-append-to-body='false'
      width="60%">
      <choseRoomFromMuiltyFloorByBuilding @roomParams="roomParams" isCanAddRoom='false'
                                          :buildingFloorRoomData="tableData"
                                          v-if="hackReset"></choseRoomFromMuiltyFloorByBuilding>
      <!--<el-button type="success" @click="handleDialogSubmit()">确定</el-button>-->
    </el-dialog>

    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisibleRoomSearch"
      :modal-append-to-body='false'
      width="38%">
      <buildingCascader @buildingParam="buildingParam" begainFromBuilding="false" v-if="hackReset"></buildingCascader>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisibleRoomSearch=false">取消</el-button>
         <el-button type="primary" @click="clearRoomInput">清除</el-button>
       <el-button type="primary" @click="handleDialogSubmitSearch()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDelete"
      :modal-append-to-body='false'
      custom-class="deleteRenter"
      width="20%">
      <span>确定要搬离租客吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDelete=false">取消</el-button>
          <el-button type="primary" @click="handleDialogDeleteSubmit()">确定</el-button>
      </span>

    </el-dialog>
  </div>


</template>

<script>
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'
  import buildingCascader from '@/components/public/buildingCascader'
  import gUrl from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import getUrl from '@/assets/js/global'

  export default {
    data() {
      return {
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        //因为添加和修改公用一个弹窗，所以写成活的
        operationName: '添加租客',
        //产品ID
        //productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
        //类型 1 物业 2租客 3,4房东
        type: 2,
        //图片前缀地址
        gImgUrl: "",
        //上传图片接口
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        //图片上传参数
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
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
          companyName:'',
          name: '',
          linkman:'',
          linkManPhone: '',
          pageIndex: '1',
          pageSize:'30',
          telphone:''
        },
        //临时的房间选择结果。用于临时存放dialog选择的房间信息
        tempRoomChoseInfo:{
          buildingGroupId: '',
          buildingId: '',
          buildingFloorId: '',
          buildingRoomId: '',
          resultName: '',
        },
        //当前编辑的行，作为编辑和添加的参数。
        currentRow: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          //房屋信息
          roomInfos: '',
          //多选房间LIST
          roomList: [],
          /*          //房间名称
                    buildingRoomName: '',
                    //房间ID(新增时，这个参数为新房间ID，编辑时为旧房间ID)
                    buildingRoomId: '',
                    //旧房间ID，编辑时用来暂存数据
                    oldBuildingRoomId: '',
                    //新房间ID
                    newBuildingRoomId: '',*/
          //租客姓名
          customerName: '',
          mobilephone: '',
          companyName: '',
          idcardBackPicture: '',
          idcardFrontPicture: '',
          licensePicture: '',
          //0添加、1修改
          operation: 1,
          //类型 1 物业 2租客 3,4房东
          type: 2,
          linkManPhone: '',
        },
        //分页相关属性
        page: {
          //当前页码
          currentPageNum: 0,
          //总页码
          pageTotal: 0,
          totalRecord: 0,//总条数
          pageSize: 30
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
        buildingFloorRoomData: {},
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
        //搜索选择房间
        dialogVisibleRoomSearch: false,
        //是否正在进行清除操作
        isClearRoom:false,
        //临时存储业务联系人
        tempLinkMan:''
      }
    },
    computed: {
      /* httpCurrent: function () {
         if (this.productId == '5') {
           return this.$http;
         }
         else if (this.productId == '6') {
           return this.$httpPasser;
         }
       }*/
      httpCurrent: function () {
        return this.$httpPasser
      }
    },
    components: {
      choseRoomFromMuiltyFloorByBuilding: choseRoomFromMuiltyFloorByBuilding,
      buildingCascader: buildingCascader
    },
    methods: {
      indexMethod(index) {//编号
        return (this.page.currentPageNum - 1) * 30 + 1 + index;
      },
      handleSearchRenter() {
        this._http(
          'business/getLandlordTenantListByConditions',
          'get',
          this.editObjToParams(this.searchParams),
          (data) => {
            this.page.pageTotal = data.pageTotal;
            this.tableData = data.result.landlordTenantList;
            this.page.totalRecord = data.totalRecord;//总记录数
          },
          true,
          () => {
            this.tableData = [];
          }
        )
      },
      //显示选择房间回调
      choseRoomClick() {
        this.dialogVisibleAddress = true;
        this.refleshRoomComponent()
      },
      //显示编辑客户窗口
      handleEdit(index, row) {
        console.log("row" ,row)
        this.operationName = '编辑租客';
        this.currentRow.operation = 1;
        this.dialogVisible = true;
        for (let o in row) {
          this.currentRow[o] = row[o]
        }
        this.tempLinkMan = row.linkman
        //暂存旧房间ID。
        //this.currentRow.oldBuildingRoomId = this.currentRow.roomId ? this.currentRow.roomId : this.currentRow.buildingRoomId;
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
      //显示搜索房间对话框
      showChosingSearchDialog() {
        console.log('focus')
        //强制刷新房间组件
        this.refleshRoomComponent()
        //this.dialogChoseRoomState = state;
        if(!this.isClearRoom){
          this.dialogVisibleRoomSearch = true;
        }

      },
      //隐藏选择房间对话框
      hideChosingDialog() {
        this.dialogVisibleRoom = false;
      },
      //修改客户信息
      handleSubmitEdit(currentRow) {
        this.$refs[currentRow].validate((valid) => {
          //出参入参不一致，所以需修改

          this.currentRow.telphone = this.currentRow.linkManPhone
          this.currentRow.customerName = this.currentRow.linkman
          if (this.currentRow.operation == 0) {
            //设置新房间ID
            this.currentRow.newBuildingRoomId = this.currentRow.buildingRoomId;
          }
          //如果操作类型是编辑，则修改新旧房间ID参数
          else if (this.currentRow.operation == 1) {
            //设置新房间ID
//            this.currentRow.newBuildingRoomId = this.currentRow.buildingRoomId == '' ? this.currentRow.oldBuildingRoomId : this.currentRow.buildingRoomId;
//            this.currentRow.buildingRoomId = this.currentRow.oldBuildingRoomId;
//            console.log('新楼ID', this.currentRow)
          }
          if (valid) {
            this._http('business/saveTenant', 'post', this.currentRow, (data) => {

              this.$message.success('修改成功！')
              this.dialogVisible = false;
              getUrl().then(res => {
                this.gImgUrl = res.gImgUrl
                this.handleSearchRenter()
              })
            })
          } else {
            this.$message.error('请填写必填项！')
            return false;
          }
        });
      },

      //清空当前行
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

      //图片上传成功回调
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          //this.currentRow.licensePicture = URL.createObjectURL(file.raw);
          this.currentRow.licensePicture = response.result;
          this.htimageUrl = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      uploadSuccessgs2(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          //this.currentRow.idcardFrontPicture = URL.createObjectURL(file.raw);
          this.currentRow.idcardFrontPicture = response.result;
          this.htimageUrl2 = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      uploadSuccessgs3(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          //this.currentRow.idcardBackPicture = URL.createObjectURL(file.raw);
          this.currentRow.idcardBackPicture = response.result;
          this.htimageUrl3 = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      //图片上传之前限制
      beforeAvatarUpload(file) { //图片上传之前限制
        this.upLoadData.file = file
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if (!isLt10M) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return (isJPG || isPNG) && isLt10M;
      },
      //获取并处理搜索框选择房间组件返回的数据
      buildingParam(buildingParam) {
        this.tempRoomChoseInfo.buildingGroupId = '';
        this.tempRoomChoseInfo.buildingId = '';
        this.tempRoomChoseInfo.buildingFloorId = '';
        this.tempRoomChoseInfo.buildingRoomId = '';
        this.tempRoomChoseInfo.buildingRoomName = '';
        if (buildingParam.buildingGroupId) {
          this.tempRoomChoseInfo.buildingGroupId = buildingParam.buildingGroupId;
          this.tempRoomChoseInfo.resultName = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingId) {
          this.tempRoomChoseInfo.buildingId = buildingParam.buildingId;
          this.tempRoomChoseInfo.resultName = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingFloorId) {
          this.tempRoomChoseInfo.buildingFloorId = buildingParam.buildingFloorId;
          this.tempRoomChoseInfo.resultName = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingRoomId) {
          this.tempRoomChoseInfo.buildingRoomId = buildingParam.buildingRoomId;
          this.tempRoomChoseInfo.resultName = buildingParam.buildingRoomName;
        }
      },
      //编辑房间租客时，返回的数据
      roomParams(roomParams) {
        /*        //如果是新增选择房间，则修改currentRow中的roomId
                if (this.dialogChoseRoomState == 'operation') {

                }
                //如果是搜索选择房间，则修改搜索参数中的楼盘，写字楼，房间ID
                else if (this.dialogChoseRoomState == 'search') {
                }*/
        if (roomParams.roomResult && roomParams.roomResult.length > 0) {
          this.roomInfos = roomParams.address;
          this.currentRow.roomList = JSON.stringify(roomParams.roomResult)
          this.buildingId = roomParams.buildingId;
          this.currentRow.buildingRoomName =  this.roomInfos
          this.dialogVisibleAddress = false;
          this.dialogVisibleRoom =false;
        }
        else {
          this.roomInfos = '';
          this.$message.error('请选择至少一个房间')
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
            shopId: this.companyId,
            customerIdList: this.customIdArray
          }
        ).then(
          (res) => {
            if (res.data.resultCode == 200) {
              this.$message.success(res.data.resultCodeDesc)
              this.handleSearchRenter()
            }
            else{
              this.$message.error(res.data.resultCodeDesc)
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
        if (this.customIdArray < 1) {
          this.$message({
            showClose: true,
            message: '请先选中',
            type: 'error'
          });
        } else {
          this.dialogVisibleDelete = true;
        }

      },
      //选择房间确定
      handleDialogSubmit() {
        this.dialogVisibleRoom = false;
      },
      //选择房间确定
      handleDialogSubmitSearch() {
        for(let o in this.tempRoomChoseInfo){
          this.searchParams[o] = this.tempRoomChoseInfo[o]
        }
        this.dialogVisibleRoomSearch = false;
      },
      //强制刷新组件
      refleshRoomComponent() {//强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },

      //更换查询条件时，将pageIndex设置为1
      setPageIndex() {
        this.searchParams.pageIndex = 1;
      },
      //清除输入框
      clearInput(attrName){
        this.searchParams[attrName] = '';
      },
      //清除房间选择信息
      clearRoomInput(){
        console.log('clear')
        this.dialogVisibleRoom = false;
        this.isClearRoom = true;
        for(let o in this.tempRoomChoseInfo){
          this.tempRoomChoseInfo[o] = '';
          this.searchParams[o] = '';
        }
        setTimeout(()=>{
          console.log('afterClear')
          this.isClearRoom = false;
        },0)
        this.refleshRoomComponent()
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
          this.httpCurrent.post(
            url,
            params
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

      }
    },
    mounted: function () {
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
        this.handleSearchRenter()
      })

      //初始化参数的产品ID
      //this.currentRow.productId = this.$local.sefetch('prductInfo') ? this.$local.sefetch('prductInfo').productId : '';
    }
  }
</script>

<style scoped lang="less">
  #searchRenter {
    /*form {*/
      /*line-height: 40px;*/
    /*}*/
    .clear20 {
      clear: both;
      height: 20px;
      width: 100%;
    }
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        line-height: 40px;
        width: 140px;
        font-size: 14px;
      }
    }
    .font14 {
      font-size: 14px;
      margin-bottom: 20px;
      color: red;
    }
    .pl50 {
      padding-left: 150px;
    }
    .layers {
      padding-top: 30px;
      .plr20 {
        padding: 0 20px;
        margin-right: 10px;
      }
      .floorbtn {
        cursor: pointer;
        border: solid 1px #dcdfe6;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #606266;
        padding: 12px 20px;
        font-size: 14px;
        line-height: 1;
        border-radius: 4px;
        display: inline-block;
      }
      .floorbtn.active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        background-color: #ecf5ff;
      }
    }
    .floorbtn.active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      background-color: #ecf5ff;
    }
  }
</style>
<style lang="less">
  #searchRenter {
    .demo-form-inline{
      .el-input {
        width: 130px!important;
      }
    }
    .el-table th {
      text-align: center;
    }
    .cell {
      text-align: center;
    }
    #addrent, #addrent2, #addrent3 {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 135px;
        height: 95px;
        line-height: 95px;
        text-align: center;
      }
      .avatar {
        width: 135px;
        height: 95px;
        display: block;
      }
    }
    /*.el-button--primary {*/
      /*border-radius: 20px;*/
    /*}*/
    .deleteRenter{
      height:200px;
      .el-dialog__body{
        padding-top:10px;
        padding-bottom:10px;
      }
    }
    .el-table td, .el-table th{
      padding: 12px 0;
    }
  }

</style>

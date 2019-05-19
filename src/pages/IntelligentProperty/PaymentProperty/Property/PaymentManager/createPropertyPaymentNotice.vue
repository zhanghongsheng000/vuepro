<template>
  <div class="mainPart createPropertyPaymentNotice" id="createPropertyPaymentNotice">
    <div>
      <div class="top-title" style="padding-top: 10px;">
        <div class="line"></div>
        <span class="top-text">生成缴费公告</span>
      </div>
    </div>
    <div class="choseForm">
      <el-form ref="createParams"  :rules="rules"  :model="createParams"><!--:rules="rules"-->
        <el-form-item style="margin-right: 0">
            <el-form-item  required style="width: 167px;">
              <el-select v-model="buildingCascader.buildingGroupId"  placeholder="请选择楼盘" @change="getBuildingList">
                <el-option v-for="(buildingGroup,index) in buildingCascader.buildingGroupList" :key="index"
                           :label="buildingGroup.buildingGroupName" :value="buildingGroup.buildingGroupId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="buildingId"  style="width: 166px;">
              <el-select v-model="buildingCascader.buildingId"
                         placeholder="请选择写字楼" @change="setCreateParams"
                         :disabled="hasBuilding">
                <el-option v-for="(building,index) in buildingCascader.buildingList" :key="index"
                           :label="building.buildingName" :value="building.buildingId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item   style="width: 169px;">
              <el-select v-model="createParams.feeItemId" clearable placeholder="请选择缴费项名称" :disabled=" hasBuild" @change="chengeFeeType">
                <el-option
                  v-for="fees in feeTable"
                  :key="fees.feeItemId"
                  :label="fees.feeItemName"
                  :value="fees.feeItemId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  required style="width: 140px;">
              <div v-if="createParams.type == 'year'">
                <el-date-picker
                  v-model="createParams.startTime"
                  align="right"
                  type="year"
                  value-format="yyyy"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'month'">
                <el-date-picker
                  v-model="createParams.startTime"
                  align="right"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'day'">
                <el-date-picker
                  v-model="createParams.startTime"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'season'">
                <el-date-picker
                  v-model="createParams.year"
                  align="right"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item  required style="width: 140px;">
              <div v-if="createParams.type == 'year'">
                <el-date-picker
                  v-model="createParams.endTime"
                  align="right"
                  type="year"
                  value-format="yyyy"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'month'">
                <el-date-picker
                  v-model="createParams.endTime"
                  align="right"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'day'">
                <el-date-picker
                  v-model="createParams.endTime"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
              <div v-if="createParams.type == 'season'">
                <el-select v-model="createParams.season"  placeholder="请选择季度">
                  <el-option v-for="(season,index) in seasonTable" :key="index"
                             :label="season.seasonName" :value="season.season">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item style="margin-right: 0">
              <el-button type="primary" @click="submitCreatParams()" :disabled="disabled">计算缴费公告</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form-item>
        <el-form-item v-if="createParams.feeItemId == 2||createParams.feeItemId == 3" style="margin-top: 20px">
          <a :href="gUrl+'excel/export?companyId='+companyId.companyId+'&buildingId='+buildingCascader.buildingId+'&feeItemId='+createParams.feeItemId">
            <el-button
              size="small"
              type="primary"
            >下载表底模板</el-button></a>
          <el-upload style="display: inline-block"
            class="upload-demo"
            :action="gUrl+'upload/uploadExcel'"
            :show-file-list="isShowFile"
            :on-success="handleUploadSuccess"
            :beforeUpload="beforeAvatarUpload"
            :file-list="fileList">
            <el-button size="small" type="danger" >上传表底文件</el-button> <!--@click="getCurrentIndex(scope.$index)"-->
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="clear20"></div>
    <!--显示缴费公告表格开始-->
    <div>
      <template>
        <el-table  ref="paymentResults" :data="paymentResults" style="width: 100%"  @expand-change = "handleExpandChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div class="resultTable">
                  <div class="resultTbody" >
                    <el-form-item v-for="(item,index) in feeList" :key="index">
                      <div class="resultBlock managementFee" >
                        <div class="resultContent" >
                          <ul>
                            <li v-if="item.amount">缴费金额：{{item.amount}}元</li>
                            <li v-if="item.date">缴费日期：{{item.amount}}</li>
                            <li v-if="item.feeStandard">缴费标准：{{item.feeStandard}}{{item.unit}}</li>
                            <li v-for="item in item.item">{{item.name}}:{{item.value}}</li>
                            <!--<li>房间面积：{{props.row.managementFeeHouseArea}}㎡</li>-->
                            <!--<li>缴费区间：{{props.row.managementFeeRegion}}</li>-->
                            <!--<li>月份合计：{{props.row.managementFeeMonthSum}}</li>-->
                            <!--<li>应缴物业费：{{props.row.managementFeeStressPayment}}元</li>-->
                          </ul>
                        </div>
                        <div class="typeName">
                          {{item.feeItemName}}
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="写字楼名称" prop="buildingName">
          </el-table-column>
          <el-table-column label="房间名称" prop="buildingRoomName">
          </el-table-column>
          <el-table-column label="房东" prop="landlord">
          </el-table-column>
          <el-table-column label="租客" prop="renter">
          </el-table-column>
          <el-table-column label="总费用" prop="total">
          </el-table-column>
          <el-table-column label="查看明细">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleRowClick(scope.row)">查看明细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix pt20" v-if="createParams.pageTotal>0">
          <div class="clearfix">
            <div class="fl" >
              <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="createParams.pageTotal">
              </el-pagination>
            </div>
            <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
              <span>共{{this.createParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.createParams.totalRecord}}条</span>
            </div>
            <div class="fl" style="margin-top: -8px;margin-left: 60px">
              <el-button type="primary" @click="declear" >发布</el-button>
            </div>
          </div>
        </div>

      </template>
    </div>
  </div>

</template>

<script>
  import axios from '@/assets/js/axios'
  import gUrl from '@/assets/js/gUrl'

  export default {
    name: "search-payment-record",
    //		name: "buildingCascaderModle",
    data() {
      return {
        disabled:false,
        feeList:[],
        //自定义的字典表，第一季度传one,第二季度传two，第三季度传three,第四季度传four
        seasonTable:[
          {
            seasonName: '第一季度',
            season: 'one',
          },
          {
            seasonName: '第二季度',
            season: 'two',
          },
          {
            seasonName: '第三季度',
            season: 'three',
          },
          {
            seasonName: '第四季度',
            season: 'four',
          },
      ],
        options: [],
        gUrl:gUrl,
        feenoticeId:'',//this.$route.query.feenoticeId
        isUnPublish:'',//this.$route.query.isUnPublish
        paymentResults: [],
        //获取楼盘列表参数，物业公司ID
        companyId: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : ''
        },
        //生成物业费参数
        createParams: {
          //公司ID
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          //用户ID
          userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
          //写字楼ID
          buildingId: '',
          //缴费项ID
          feeItemId: '',
          //开始时间
          startTime: '',
          //结束时间
          endTime: '',
          //日期格式，依据缴费项来确定显示年控件 月控件 还是日控件
          dataType:'',
          //计算公式,通过选择收费项获取
          forMulaName:'',
          pageIndex:1,
          //每页条数
          pageSize:30,
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
          type:'',//展示的类型
          path:'',//水费上传时所存储的路径
          season:'',//季度
          year:'',

        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },
        //表单验证
        rules: {
          /*buildingGroupId: [
            {required: true, message: '请选择楼盘', trigger: 'blur'},
          ],*/
          buildingId: [
            {required: true, message: '请选择写字楼', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          endTime: [
            {required: true, message: '请选择结束时间', trigger: 'change'}
          ],
          feeItemId: [
            {required: true, message: '请选择缴费项', trigger: 'change'}
          ]
        },
        //总页数，用来控制是否显示分页
        pageTotal: 0,
        //楼盘级联数据
        buildingCascader: {
          //楼盘列表
          buildingGroupList: [],
          //写字楼列表
          buildingList: [],
          //搜索参数
          //楼盘ID
          buildingGroupId: '',
          //写字楼ID
          buildingId: '',
          //楼层ID'
          pageIndex:1,
          pageSize:30,
          //每页条数
        },
        //上传文件列表
        fileList:[],
        buildingGroupList:[],
        //写字楼列表
        buildingList:[],
        //楼盘ID
        buildingGroupId:'',
        //写字楼Id
        buildingId:'',
        //是否显示上传文件
        isShowFile:false,
        //生成文件Loading
        loadingCreate:false,
        /*
       字典部分
       * */
        //写字楼名称 ID字典对象，主键为写字楼名称.在获取收费标准时初始化
        buildingIdDictionary: {},
        //feeStandardId字典对象。主键为收费项名称_buildingId  形如  物业费_1
        feeStandardIdDictionary: {},
        //feeItem字典对象,主键为收费项名称，存储了feeItemId buildingId
        feeDictionary: {},
        /*
        显示未发布缴费公告部分
        * */
        //未发布缴费公告表格数据
        payMentNoiceTableData: [],
        //未发布缴费公告搜索参数
        searchParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          buildingName: '',
          feeItemId:'',
        },
        //是否显示为发布缴费公告
        isShowPayMentNoiceTableData: false,
        //是否显示删除窗口
        dialogVisibleDelete:false,
        //缴费项目列表
        feeTable:'',
      }
    },
    computed: {
      hasBuilding: function () {
        let flag = true
        if (this.buildingCascader.buildingGroupId !== '') {
          flag = false;
        }
        return flag;
      },
      hasBuild:function () {
        let flag = true
        if (this.buildingCascader.buildingId !== '') {
          flag = false;
        }
        return flag;
      },
      hasPagination: function () {
        let flag = true;
        if (this.pageTotal > 0) {
          flag = false;
        }
        return flag;
      }
    },
    methods: {
      declear(){
        this.$http.post("propertyCompany/publish",{
          buildingId:this.createParams.buildingId,
          companyId:this.createParams.companyId,
          customerUserId:this.createParams.userId,
        }).then((res)=>{
          if(res.data.resultCode == "200"){
            this.$message.success("发布成功");
            this.createParams.pageTotal = 0
            this.paymentResults=[]
          }else{
            this.$message.error(res.data.resultCodeDesc);
            this.getFeeItemList();
          }
        })
      },
      getFeeNoticeRoom(){
        this._http('propertyCompany/getFeeNoticeRoomByBuilding','get',this.createParams,(data)=>{
          this.disabled = false;
          this.paymentResults = data.result;
          this.createParams.pageTotal  = data.pageTotal
          this.createParams.totalRecord =data.totalRecord
          this.createParams.pageIndex = data.pageIndex
          //通过原生JS修改展开按钮
          let temp = document.getElementsByTagName('tr')
          //$nextTick是DOM一次渲染结束之后的回调方法
          //VUE的页面渲染很多是异步的。所以这里需要放到$nextTick中
          this.$nextTick(function () {
            for(let i=1;i<temp.length;i++){
              let temp2 = temp[i].getElementsByTagName('td')[0].getElementsByTagName('div')[0]
              temp2.innerHTML = '<div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div>'
              temp2.getElementsByTagName('div')[0].onclick = function(){
                if(this.style.transform && this.style.transform=='rotate(0deg)'){
                  this.style.transform = 'rotate(90deg)'
                }
                else if(this.style.transform && this.style.transform=='rotate(90deg)'){
                  this.style.transform = 'rotate(0deg)'
                }
                else{
                  this.style.transform = 'rotate(90deg)'
                }
              }
            }
          })
        })
      },
      //row为当前展开行，expandedRows为所有已经展开的行
      handleExpandChange(row, expandedRows){
        if(expandedRows.length>1){
          expandedRows.shift()
        }
        /*//如果所有已展开行包含当前展开行，则说明是展开操作，执行查询。否则不执行
        let index = expandedRows.indexOf(row)
        if(index!==-1 || expandedRows.length==0){
          this.getFeeNoticeRoomDetail(row.feeNoticeRoomId,index)
        }*/
      },
      //获取服务器数据并将其转化为当前展开行的数据。feeNoticeRoomId为当前请求所需的参数。index为当前行在所有数据中的索引值，方便写入
      getFeeNoticeRoomDetail(feeNoticeRoomId,callback){
        this._http('propertyCompany/getFeeNoticeRoomDetail','get',{feeNoticeRoomId:feeNoticeRoomId},(data)=>{
          //服务器数据
          let tempFeeArray = data.result;
          this.feeList = data.result
          //获取当前展开行的数据。以方便添加写入
          let currentRow = null;
          for(let o in this.paymentResults){
            if(feeNoticeRoomId==this.paymentResults[o].feeNoticeRoomId){
              currentRow = this.paymentResults[o];
              break;
            }
          }
          if(currentRow!=null){
            for(let o in tempFeeArray){
              for(let p in tempFeeArray[o]){
                //通过前缀+名字的拼接获取本地数据名称
                let myItemName = this.getFeeNameFromfeeItemId(tempFeeArray[o].feeItemId) + this.changeAjaxDataNameToMine(p);
                //赋值
                if(tempFeeArray[o][p]===null || tempFeeArray[o][p]===''){
                  currentRow[myItemName] = '——'
                }
                else{
                  if(p == 'feeStandard'){
                    currentRow[myItemName] = tempFeeArray[o][p]+tempFeeArray[o].unit;
                  }
                  else{
                    currentRow[myItemName] = tempFeeArray[o][p];
                  }
                }
              }
            }
            callback();
          }
        })
      },
      handleCurrentChange(index) { //分页方法
        this.createParams.pageIndex = index;
        this.getFeeNoticeRoom();
      },
      //发布缴费公告
      publishNoticePayment(){
        this._http(
          'propertyCompany/setPublish',
          'get',
          {ids:this.feenoticeId},
          (data)=>{
            if(data.resultCode==200){
              this.$message.success(data.resultCodeDesc)
            }
            else{
              this.$message.error(data.resultCodeDesc)
            }
          }
        )
      },
      //根据feeItemId为所有缴费项添加前缀
      getFeeNameFromfeeItemId(feeItemId){
        let re = ''
        switch(feeItemId){
          case 1:re = 'managementFee';break;
          case 2:re = 'waterRent';break;
          case 3:re = 'electricFee';break;
          case 4:re = 'heatingFee';break;
          case 5:re = 'airConditioningFee';break;
        }
        return re;
      },
      //将服务器传回缴费项名字转化为本地名字
      changeAjaxDataNameToMine(itemName){
        let re = 'itemName';
        switch(itemName){
          case 'feeStandard':re = 'Standard';break;
          case 'feeOne':re = 'HouseArea';break;
          case 'feetwo':re = 'Region';break;
          case 'feeThree':re = 'MonthSum';break;
          case 'feeFour':re = 'PrevMeterData';break;
          case 'feeFive':re = 'CurrentMeterData';break;
          case 'amount':re = 'StressPayment';break;
        }
        return re;
      },
      //行点击事件
      handleRowClick(row){
        this.getFeeNoticeRoomDetail(row.feeNoticeRoomId,()=>{
          this.$refs.paymentResults.toggleRowExpansion(row)
        })
      },
      //生成缴费公告
      submitCreatParams() {
        this.disabled = true;
        if (parseInt(this.createParams.startTime) > parseInt(this.createParams.endTime)) {
          this.$message.error('截止时间必须大于开始时间')
        }else if(this.createParams.feeItemId == ''){
          this.$message.error("请选择缴费项目")
        }
        else {
          this.disabled = false;
          this._http('propertyCompany/createFeeNotice', 'get', this.createParams,
            data => {
              if(data.resultCode==200){
                this.$message.success(data.resultCodeDesc)
                this.getFeeNoticeRoom()
              }
              else{
                this.$message.error(data.resultCodeDesc)
                this.getFeeNoticeRoom()
              }
            }
          )
        }
      },
      //重置
      resetForm(){
        this.buildingCascader.buildingGroupId ='';
        this.buildingCascader.buildingGroupName ='';
        this.buildingCascader.buildingId ='';
        this.buildingCascader.buildingName ='';
        this.createParams.feeItemId = '';
        this.createParams.startTime = '';
        this.createParams.endTime = '';
        this.createParams.pageTotal = 0;
        this.createParams.year = '';
        this.createParams.season = '';
        this.paymentResults =[];
        this.getBuildingGroupList();
        this.getFeeStandard()
      },
      //改变缴费项
      chengeFeeType(){
        this.createParams.startTime = '';
        this.createParams.endTime ='';
        let num = this.createParams.feeItemId

        for(let o in this.feeTable){
          if(num == this.feeTable[o].feeItemId){
            this.createParams.forMulaName = this.feeTable[o].forMulaName
            this.createParams.type = this.feeTable[o].type
          }
        }
      },
      //设置参数写字楼ID
      setCreateParams() {
        this.getFeeNoticeRoom()
        this.createParams.buildingId = this.buildingCascader.buildingId;
        this.getFeeItemList()//获取收费项列表
      },
      //获取楼盘列表
      getBuildingGroupList() {
        this._http('building/getBuildingGroupListByCompanyId', 'get', this.companyId, data => {
          this.buildingCascader.buildingGroupList = data.result.buildingGroupList
        })
      },
      //获取写字楼列表
      getBuildingList(value) {
        this._http('building/getBuildingListByBuildingGroupId', 'get', {
          buildingGroupId: this.buildingCascader.buildingGroupId
        }, data => {
          //设置下级菜单不可用或者不可见
          this.buildingCascader.buildingId = '';
          this.buildingCascader.buildingList = data.result.buildingList
        })
      },

      //row为当前展开行，expandedRows为所有已经展开的行。展开表格行方法
      handleExpandChange(row, expandedRows) {
        if(expandedRows.length>1){
          expandedRows.shift()
        }
        /*//如果所有已展开行包含当前展开行，则说明是展开操作，执行查询。否则不执行
        let index = expandedRows.indexOf(row)
        if(index!==-1){
          //console.log(row.feeNoticeBuildingId)
          this.getFeeRecordDetial(row.feeNoticeBuildingId)
        }*/
      },
      //删除警告窗口
      handleDelete(index, row) {
        this.dialogVisibleDelete = true;
        //this.currentRow = row;
        this.deletePaymentNoticeParams = [];
        this.deletePaymentNoticeParams.push(row.feenoticeId)
      },
      /*
      * 查找缴费公告部分方法
      * */
      //查找缴费公告
      search() {
        this._http('propertyCompany/getNoPublishFeeNotice', 'get', this.searchParams, (data) => {
          this.isShowPayMentNoiceTableData = true;
          this.payMentNoiceTableData = data.result
        }, false)
      },
      //进入详情页面
      todetails(row) {
        this.$router.push({path: 'paymentNoticeDetail', query: {feenoticeId: row.feenoticeId, isUnPublish: true}});
      },
      //删除未发布缴费公告方法
      deleteFeeStandard() {
        this.$http.post(
          'propertyCompany/deleteNotice',
          {
            feeNoticeId: this.deletePaymentNoticeParams.toString()
          }
        ).then(
          (response) => {
            this.dialogVisibleDelete = false;
            if (response.data.resultCode == 200) {
              this.$message.success(response.data.resultCodeDesc)
              this.search();
            }
            else {
              this.$message.error(response.data.resultCodeDesc)
            }
          }
        ).catch(
          (err) => {
            console.log(err)
          }
        )
      },
      /*缴费项目列表*/
      getFeeItemList(){
        this.$http.post('propertyCompany/getFeeTermByBuilding',{
          buildingId:this.buildingCascader.buildingId,
          companyId:this.companyId.companyId
        }).then(
          (response)=>{
            if(response.data.resultCode==200){
              this.feeTable = response.data.result;
            }
            else if(response.data.resultCode==204){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            }
            else{
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
      },
      getFeeStandard(){
        this._http('propertyCompany/getFeeStandard','get',this.companyId,data =>{
          let dataGetFromService = data.result;
          //提供数据，并且写入返回对象
          //将返回数据写入写字楼ID字典表
          for(let o in dataGetFromService){
            //主键值，形如 物业费_10
            let tempBuildingName = dataGetFromService[o].buildingName
            if(this.buildingIdDictionary[tempBuildingName]){
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
            else{
              this.buildingIdDictionary[tempBuildingName] = {}
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
          }
          //将返回数据以收费项_buildingId为主键，写入收费标准主键字典表,以便后续传参的时候查询调用
          //格式如下
          /*水费_1:
            feeStandardId:5
            buildingId:10
          水费_2:
            feeStandardId:2
            buildingId:10
          物业费_1:
            feeStandardId:4
            buildingId:10
            */
          for(let o in dataGetFromService){
            //主键值，形如 物业费_10
            let temp = dataGetFromService[o].feeItemName+'_'+dataGetFromService[o].buildingId
            if(this.feeStandardIdDictionary[temp]){
              this.feeStandardIdDictionary[temp]['feeStandardId'] = dataGetFromService[o].feeStandardId;
              this.feeStandardIdDictionary[temp]['buildingId'] = dataGetFromService[o].buildingId;
            }
            else{
              this.feeStandardIdDictionary[temp] = {}
              this.feeStandardIdDictionary[temp]['feeStandardId'] = dataGetFromService[o].feeStandardId;
              this.feeStandardIdDictionary[temp]['buildingId'] = dataGetFromService[o].buildingId;
            }
          }
          //console.log(this.feeStandardIdDictionary)
          //将返回数据以名字为主键，写入收费项字典表,以便后续传参的时候查询调用
          //格式如下
          /*物业费:
            feeItemId:1
            feeItemValue:16
            feeUnit:"元/月/平米"
          电费:
            feeItemId:3
            feeItemValue:0.52
            feeUnit:"元/度"*/
          for(let o in dataGetFromService){
            if(this.feeDictionary[dataGetFromService[o].feeItemName]){
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemId'] = dataGetFromService[o].feeItemId;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeUnit'] = dataGetFromService[o].feeUnit;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemValue'] = dataGetFromService[o].feeItemValue;
            }
            else{
              this.feeDictionary[dataGetFromService[o].feeItemName] = {};
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemId'] = dataGetFromService[o].feeItemId;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeUnit'] = dataGetFromService[o].feeUnit;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemValue'] = dataGetFromService[o].feeItemValue;
            }
          }
          //console.log(this.feeDictionary)
          //将返回的数据以写字楼名称为主键进行整理，以方便进一步整理
          //整理结果为如下形式
          /*
          {
            新百广场1号楼:
              水费:"1元/吨"
              物业费:"14元/月/平米"
              电费:"1.5元/度"
            豫港大厦豫港大厦:
              水费:"4元/吨"
              物业费:"16元/月/平米"
              电费:"0.52元/度"
           }
            */
          let tempArray = []
          let tempObj = {};
          for(let o in dataGetFromService){
            if(tempObj[dataGetFromService[o].buildingName]){
              tempObj[dataGetFromService[o].buildingName][dataGetFromService[o].feeItemName] = dataGetFromService[o].feeItemValue + dataGetFromService[o].feeUnit
            }
            else{
              tempObj[dataGetFromService[o].buildingName] = {};
              tempObj[dataGetFromService[o].buildingName][dataGetFromService[o].feeItemName] = dataGetFromService[o].feeItemValue + dataGetFromService[o].feeUnit
            }
          }

          /*
          进一步将数据进行整理。
          1.将收费项名称写入tableData中的theadList,形式如['物业费','水费','电费'],以便于写入表格表头
          2.将表格数据按照elementUI能够使用的格式进行整理，形式如下
          [
            //以如下形式，将服务器返回的数据处理为以下形式，然后存储。
            {
              num:'1',
              buildingName: '荣鼎天下A座',
              '物业费': '12元/㎡/天',
              '水费': '2.6元/吨',
              ...
            }
          ]
          * */
          let index = 0;
          for(let p in tempObj){
            let tempRow = {};
            tempRow = {};
            tempRow.num = index;
            tempRow.buildingName = p;
            for(let q in tempObj[p]){
              let indexHead = 1;
              tempRow[q] = tempObj[p][q]
              //写入表头信息，只在第一行操作一次就可以了，提高效率
              if(index==0){
                this.tableData.theadList.push(q)
              }

              indexHead++;
            }
            tempArray.push(tempRow)
            index++;
          }
          this.tableData.tableData = tempArray;
        })
      },
      //上传文件成功钩子
      handleUploadSuccess(response,fileList){
        let path = response.result
        console.log(path)
        //this.tableData.tableData[this.currentIndex]['path'] = path;
        this.createParams.path = path;
        this.$message.success('上传成功')

      },
      //文件上傳前的鉤子
      beforeAvatarUpload(file){
        {
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
          const extension = testmsg === 'xls'
          const extension2 = testmsg === 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 100
          if(!extension && !extension2) {
            this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
            });
          }
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
          }
          return extension || extension2 && isLt2M
        }
      },
      /*工具方法*/
      _http(url, type, params, callback200) {
        if (type == "get") {
          this.$http.get(
            url, {
              params: params
            }
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (response.data.resultCode == 204) {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
                callback200(data)
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
        } else if (type == "post") {
        }
      }
    },
    mounted() {
      this.getBuildingGroupList();
      this.getFeeStandard()
    }
  }
</script>
<style scoped lang="less">
  /*.mainPart {*/
    /*width: 1200px;*/
    /*.choseForm {*/
      /*width: 650px;*/
    /*}*/
  /*}*/

  .resultTable {
    text-align: left;
  }

  .choseForm {
    padding-bottom: 20px;
  }

  .createPropertyPaymentNotice {
    .resultTable {
      .resultThead {
        height: 45px;
        line-height: 45px;
      }
      background-color: #e8e8e8;
      span {
        display: inline-block;
      }
      .left {
        text-indent: 20px;
      }
      .right {
        float: right;
        margin-right: 20px;
      }
      .resultTbody {
        height: 200px;
        display: table;
        width: 100%;
        .resultBlock {
          position: relative;
          display: table-cell;
          border: solid 1px #cccbcb;
          border-right: none;
          width: 16%;
          overflow: hidden;
          .resultContent {
            margin-right: 15px;
            margin-left: 15px;
            margin-top: 15px;
            font-size: 13px;
            color: rgb(96, 98, 102);
          }
          .typeName {
            position: absolute;
            bottom: 0px;
            right: 0px;
            height: 60px;
            width: 50px;
            background-repeat: no-repeat;
            background-position: 10px 0px;
            line-height: 90px;
            overflow: hidden;
            margin-right: 10px;
            text-align: center;
          }
        }
        .resultBlock:last-child {
          border-right: solid 1px #cccbcb;
        }
        .white {
          background-color: white;
        }
      }
    }
    .clear20 {
      height: 20px;
      clear: both;
      width: 100%;
    }
    .el-pagination {
      text-align: center;
    }
    .resultTable {
      .resultThead {
        height: 45px;
        line-height: 45px;
      }
      background-color:#e8e8e8;
      span {
        display: inline-block;
      }
      .left {
        text-indent: 20px;
      }
      .right {
        float: right;
        margin-right: 20px;
      }
      .resultTbody {
        height: 200px;
        display: table;
        width: 100%;
        .resultBlock {
          position: relative;
          display: table-cell;
          border: solid 1px #cccbcb;
          border-right: none;
          width: 16%;
          overflow: hidden;
          .resultContent {
            margin-right: 15px;
            margin-left: 15px;
            margin-top: 15px;
            font-size: 13px;
            color: rgb(96, 98, 102);
          }
          .typeName {
            position: absolute;
            bottom: 0px;
            right: 0px;
            height: 60px;
            width: 50px;
            background-repeat: no-repeat;
            background-position: 10px 0px;
            line-height: 90px;
            overflow: hidden;
            margin-right: 10px;
            text-align: center;
          }
        }

        .resultBlock:last-child {
          border-right: solid 1px #cccbcb;
        }
        .white {
          background-color: white;
        }
      }
    }
    .clear20 {
      height: 20px;
      clear: both;
      width: 100%;
    }
    .el-pagination {
      text-align: center;
    }
  }
  #createPropertyPaymentNotice{
    width:1040px;
  }
</style>
<style lang="less">
  #createPropertyPaymentNotice {
    .mainPart .el-table {
      text-align: center;
    }
    .el-form-item{
      float:left;
      margin-right: 10px;
      margin-bottom: 7px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 140px;
    }
    .el-table__expanded-cell[class*=cell]{
      padding: 0;
    }
    .el-form-item__content {
      line-height: 30px;
      position: relative;
      font-size: 14px;

    }
    .el-table{
      .el-button{
        margin-top: 5px;
      }
    }
    .el-button+.el-button{
      margin-left: 7px;
    }
     .resultTable .resultTbody .resultBlock:last-child{
      height: 200px;
      width: 208px;
      border: 1px solid #dedede;
      margin: 5px 0;
    }
     .resultTable .resultTbody .resultBlock .resultContent{
      margin: 0;
      padding-left: 6px;
    }
     .el-form-item{
      margin-bottom: 0;
    }
     .el-form--inline .el-form-item {
      margin-right: 0;
    }
     .resultTable .resultTbody .resultBlock{
      border: none;
    }
    .el-table__expand-icon>.el-icon{
      visibility:hidden;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
      padding-left: 0;
      margin-left: -30px;
    }
  }

</style>

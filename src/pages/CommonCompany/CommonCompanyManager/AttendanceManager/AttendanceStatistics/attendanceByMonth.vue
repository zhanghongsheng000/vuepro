<template>
  <div class="attendanceByday fr">
    <div class="fl_section">
      <span style="line-height: 30px;font-size: 14px;">日期：</span>
      <el-date-picker
        v-model="month"
        type="month"
        value-format='yyyy-MM'
        placeholder="选择日期">
      </el-date-picker>
      <span style="line-height: 30px;font-size: 14px;margin-left: 10px">部门：</span>
      <el-select v-model.trim="department" clearable placeholder="部门">
        <el-option
          v-for="item,index in departmentList"
          :key="index"
          :label="item.departmentName"
          :value="item.departmentId">
        </el-option>
      </el-select>
      <span style="line-height: 30px;font-size: 14px;margin-left: 10px">姓名：</span>
      <input v-model="userName" placeholder="请输入员工姓名" class="inputtype">
      <div class="form-item fr" style="margin-left: 30px;">
        <el-button type="primary " @click="queryBtn">查询</el-button>
        <a @click="setDownloadUrl" :href="downloadExcelUrl"><el-button slot="trigger" type="primary">导出报表</el-button></a>
      </div>
    </div>
    <el-table
      :data="attendanceBydayTable"
      v-loading="loading"
      style="width: 100%;" :empty-text=text>
      <el-table-column
        fixed
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        fixed
        label="部门">
      </el-table-column>
      <el-table-column
        fixed
        prop="code"
        label="工号" width="100">
      </el-table-column>
      <el-table-column
        prop="theoryDay"
        label="应出勤天数" width="90">
      </el-table-column>
      <el-table-column
        prop="actualDay"
        label="出勤天数">
      </el-table-column>
      <el-table-column
        prop="lateNum"
        label="迟到次数">
      </el-table-column>
      <el-table-column
        prop="lateTime"
        label="迟到时长">
        <template slot-scope="scope">
          <div v-if="(scope.row.lateTime == null || scope.row.lateTime ==0 )">
            <p  type="text">{{(scope.row.lateTime)}}</p>
          </div>
          <div v-else>
            <p  type="text">{{convertMsToHAndM(scope.row.lateTime)}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="ztNum"
        label="早退次数">
      </el-table-column>
      <el-table-column
        prop="ztTime"
        label="早退时长">
        <template slot-scope="scope">
          <div v-if="(scope.row.ztTime == null || scope.row.ztTime ==0 )">
            <p  type="text">{{(scope.row.ztTime)}}</p>
          </div>
          <div v-else>
            <p  type="text">{{convertMsToHAndM(scope.row.ztTime)}}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="kgNum"
        label="旷工天数">
      </el-table-column>
      <el-table-column
        prop="leaveNum"
        label="请假天数">
      </el-table-column>
      <el-table-column
        prop="travelNum"
        label="外出天数">
      </el-table-column>
      <el-table-column
        prop="overNum"
        label="加班天数">
      </el-table-column>
      <template v-for="(col ,index) in thDectory">
        <el-table-column  :label='col'>
          <template slot-scope="scope">
            <p type="primary">{{getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col).onTime}}</p>
            <p type="primary">{{getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col).offTime}}</p>
            <a class="resultButton"
               :class="getColorByIsHandle(getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col).isHandle)"
               @click="dealresult(getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col))">
              {{getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col).dayResult}}
            </a>
            <p type="primary">{{getObjFormObjarrayByAttr(scope.row.list,'label',col)==null?'':getObjFormObjarrayByAttr(scope.row.list,'label',col).Info}}</p>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--签到的弹框-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="1000"
    >
      <div class="employee_message">
        <span>{{personal.userName}}</span><span>{{personal.departmentName}}</span><span>{{personal.date}}</span>
      </div>
      <div class="dealResult">
        <table  border="1" cellspacing="10" cellpadding="0" style="border-collapse:collapse;border-color: #dcdfe6;">
          <tr>
            <th>考勤时间</th>
            <th>签到时间</th>
            <th>签到结果</th>
            <th>签退时间</th>
            <th>签退结果</th>
            <th>操作</th>
            <th>考勤结果</th>
          </tr>
          <tr>
            <td>{{personal.configTime}}</td>
            <td>{{personal.onTime}}</td>
            <td>{{personal.onResult}}</td>
            <td>{{personal.offTime}}</td>
            <td>{{personal.offResult}}</td>
            <td>
              <el-select v-model="personal.resultId" placeholder="请选择">
                <el-option
                  v-for="handle in HandleResult"
                  :key="handle.resultId"
                  :label="handle.name"
                  :value="handle.resultId">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="personal.Info" placeholder="请输入内容" clearable></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveHandleResult">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {$gPasserUrl} from '@/assets/js/gUrl'
  export default {
    name: "attendance-by-day",
    data() {
      return {
      	text:'正在加载，请稍候',
        getRenterParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        },
        downloadExcelUrl:$gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId,//?shopId'+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month,
        currentMonth:'',
        month: '',//上个月
        department: '',//查询部门id
        departmentList: [],//部门列表
        userName: '',
        //表头字典表，key值就是月考勤中lable的value,value也是。这样是为了更方便的与表中的活数据进行对比
        //看不懂就算了。
        thDectory:{},
        //服务器返回的原始表头数据
        thArray:[],
        HandleResult: [],
        attendanceBydayTable: [],
        dialogVisible: false,//签到的结果
        loading:true,//加载
        personal:{
          customerUserId:this.$local.sefetch("info").userId,
          userName:'',//姓名
          departmentName:"",//部门
          date:"",//日期
          recordId:"",//记录id
          configTime:'',//考勤时间
          onTime:'',//签到时间
          lateTime:'',//迟到时间
          ztTime:"",//早退时间
          onResult:'',//签到结果
          offTime:"",//签退时间
          offResult:'',//签退结果
          handleResultId:'',//原始考勤情况
          handleRecordId:'',//处理记录ID
          Info:'',//备注
          handleResult: '',//操作结果
          resultId:''//操作结果
        },
        value: '',
        input: '',
        cols: [],
        currentRow: {
          departmentName: '',//部门名称
        },
        pagetotal: '',//列表总条数
      }
    },
    created() {
      this.getPreMonth();//获取上个月
      this.getDepartment();//获取部门列表
      this.getMonthAttendance();//获取月考勤表
      this.getHandleResult();//获取处理结果
      this.downloadExcelUrl = $gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
    },
    methods: {
      //获取月考勤表
      getMonthAttendance(){
        this.$httpPasser.post("census/getMonthStatistics",{
          shopId:this.getRenterParams.companyId,
          departmentId:this.department,
          userName:this.userName,
          date:this.month
        }).then((res)=>{
          let data= res.data;
          if(data.resultCode == '200'){
            this.attendanceBydayTable = data.result.tongji
            let temp = data.result.label;
            this.loading =false;
            for(let o in temp){
              this.thDectory[temp[o]] = temp[o]
            }
            this.thArray = data.result.label;
          }else if(data.resultCode =="204"){
            this.attendanceBydayTable =[];
            this.text = "暂无数据"
            this.loading =false;
          }else if(data.resultCode=='406'){
            this.loading =false;
            this.attendanceBydayTable =[];
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'success'
            });
          }
          else{
            this.loading =false;
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      //获取处理结果
      getHandleResult(){
        this.$httpPasser.post("census/getHandleResult",{
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.HandleResult = res.data.result;
          }
        })
      },
      //获取部门列表
      getDepartment() {//公司部门列表
        let gsid = this.$local.sefetch('info').companyId
        this.$httpPasser.post('company/queryDepartmentDetailByCompanyId', {//临时这么写，这里接口有问题
          //this.$httpPasser.post('company/queryDepartmentByCompanyId', {
          companyId: gsid,
          pageIndex: 1
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.departmentList = data.result.departmentList
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
      //查询
      queryBtn(){
        this.getMonthAttendance();
      },
      //保存处理结果
      saveHandleResult(){
        this.$httpPasser.post("census/saveHandleResult",this.personal).then((res)=>{
          if(res.data.resultCode==200){
            this.dialogVisible = false;
            this.$message.success('保存成功');
            this.getMonthAttendance();
          }else{
            this.$message.error(res.data.resultCodeDesc);
          }
        })
      },
      exports() {
        this.$httpPasser.post("census/exportExcel",{
          shopId:this.getRenterParams.companyId,
          departmentId:this.department,
          userName:this.userName,
          date:this.month
        }).then((res)=>{
          console.log(res)
        })
      },
      signInDialog() {//签到
        this.dialogVisible = true;
      },
      leaveInDialog() {//签退
        this.dialogVisible1 = true;
      },
      /*
      * 工具方法
      * */
      //获取当月时间
      getPreMonth(){
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth();
        if(month==0){
          year--;
          month = 12;
        }
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        this.month = year + seperator1 + month ;
        this.currentMonth =this.month;
      },
      //毫秒转时间.将毫秒转换为[HH小时][MM分钟]格式
      convertMsToHAndM(ms){
        let re = 0;
        let h = 0;
        let m = 0;
        if(ms>1000*60*60){
          h = Math.floor(ms/(1000*60*60))
          let temp = ms%(1000*60*60)
          m = Math.floor(temp/(1000*60))
        }
        else if(ms>1000*60){
          m = Math.floor(ms/(1000*60))
        }
        else if(ms>0){
          m=1
        }
        else{
          m=0
        }
        re = (h==0?'':h+'小时')+m+'分钟';
        return re;
      },
      //根据对象数组中的某一个元素的属性，来或者这个元素.
      //参数分别为，对象数组，元素属性名称，元素属性值。
      getObjFormObjarrayByAttr(objArray,attrName,attrValue){
        let re = null;
        if(objArray.length>0){
          for(let o in objArray){
            if(objArray[o][attrName]==attrValue){
              re = objArray[o]
            }
          }
        }
        return re;
      },
      dealresult(row){
        this.dialogVisible =true;
        this.$httpPasser.post("census/getPersonAttendance",{
          recordId:row.recordId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            for(let o in res.data.result){
              this.personal[o]= res.data.result[o]
            }
            for(var i=0;i<this.HandleResult.length;i++){
              if(this.HandleResult[i].resultId==this.personal.handleResultId){
                this.handleResult = this.HandleResult[i].resultId
              }else{
                this.handleResult =  ''
              }
            }
          }
        })
      },
      //根据isHandle的值来返回颜色
      getColorByIsHandle(type){
        let re = ''
        if(type === ''){
          re = ''
        }
        else if(type==null){
          re  =''
        }
        else if(type==='Y'){
          re = 'blue'
        }
        else if(type==='N'){
          re = 'red'
        }
        return re;
      },
      //设置导出地址
      setDownloadUrl(){
        this.downloadExcelUrl = $gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
      }

    },
    watch: {
      month:function(newValue, oldValue){
        if(parseInt(this.month.replace('-',''))>parseInt(this.currentMonth.replace("-",''))){
          this.month = this.currentMonth
          this.$message({
            showClose: true,
            message: '您选择的月份考勤记录暂未生成，请选择本月之前的日期',
            type: 'error'
          });
        }
        this.downloadExcelUrl = $gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
      },
      userName:function(newValue, oldValue){
        this.downloadExcelUrl = $gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
      },
      department:function(newValue, oldValue){
        this.downloadExcelUrl = $gPasserUrl+'census/exportExcel?shopId='+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
      }
    },
    computed: {
      /*downloadExcelUrl:function(){
        $gPasserUrl+'census/exportExcel?shopId'+this.$local.sefetch('info').companyId+'&departmentId='+this.department+'&userName='+this.userName+'&date='+this.month;
      }*/
    }
  }
</script>

<style lang="less" scoped>
  .attendanceByday {
    width: 100%;
    padding: 10px;
    .fl_section {
      float: left;
      margin-left: 20px;
      margin-bottom: 20px;
    }
    .resultButton{
      cursor:pointer;
    }
    .inputtype {
      border: 1px solid #dcdfe6;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
    }
    .tables {
      margin-bottom: 10px;
    }
    .blue{
      color:blue;
    }
    .red{
      color:red;
    }
    .pagination {
      margin-bottom: 10px;
    }
    .buttons {
      padding-bottom: 30px;
    }
    .pagestyle {
      line-height: 30px;
    }
    .danger {
      color: #ff0000;
    }
    .dealResult {
      width: 880px;
      margin: 0 auto;
      table {
        margin-top: 10px;
        th {
          padding: 10px;
          border-right: none;
          border-left: none;
        }
        td {
          padding: 10px;
          border-right: none;
          border-left: none;
        }
      }
    }
  }

</style>
<style lang="less">
  .attendanceByday {
    .el-dialog{
      min-width:1000px;
    }
    .el-table .cell {
      text-align: center;
    }
    .el-dialog__body {
      .employee_message {
        text-align: center;
        span {
          font-size: 16px;
          margin-right: 10px;
          font-weight: 600;
        }
      }
    }
    .el-dialog__footer {
      text-align: center;
      padding-bottom: 50px;
    }
  }
</style>


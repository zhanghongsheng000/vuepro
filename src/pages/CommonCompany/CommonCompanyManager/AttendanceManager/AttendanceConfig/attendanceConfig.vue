<template>
  <div id="attendanceConfig">
    <div class="tables-now" >
      <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange" :empty-text=text>
        <el-table-column type="selection" label="选择" width="55"></el-table-column>
        <el-table-column label="班制名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上班时间" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.singOnTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下班时间" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.singOffTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考勤日期" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.weekdays }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考勤地点" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"  type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleSingalDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix pt20">
      <div class="fl ">
        <div class="fl">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page.sync="page.currentPageNum"
            layout="prev, pager, next"
            :page-count="page.pageTotal">
          </el-pagination>
        </div>
        <div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span>
        </div>
      </div>
      <div class="fr">
        <el-button type="primary" @click="addMask=true">添加班制</el-button>
        <el-button type="primary" @click="delMore">批量删除班制</el-button>
      </div>
    </div>
    <!--添加班制-->
    <el-dialog
      title="新增班制"
      :visible.sync="addMask"
      center
      width="800px">
      <div class="addDatas">
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">班制名称：</div>
          <div class="sitemr fl">
            <el-input v-model.trim="systemName"  placeholder="请输入班制名称"></el-input>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">上班时间：</div>
          <div class="sitemr fl">
            <el-time-picker
              v-model="startTime"
              clearable
              value-format="HH:mm:ss"
              placeholder="上班时间">
            </el-time-picker>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">下班时间：</div>
          <div class="sitemr fl">
            <el-time-picker
              v-model="endTime"
              clearable
              value-format="HH:mm:ss"
              placeholder="下班时间">
            </el-time-picker>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">考勤日期：</div>
          <div class="" style="margin-left:150px;line-height: 40px;">
            <el-checkbox-group v-model="weekList">
              <el-checkbox style="margin-left:2px;margin-right: 10px;" v-for="item,index in weekDay" :key="index"  :label="item.weekdayId">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">考勤地点：</div>
          <div class="sitemr fl" >
            <el-select v-model="place" placeholder="考勤地点">
              <el-option
                v-for="item,index in BuildinList"
                :key="index"
                :label="item.location"
                :value="item.buildingId">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addMask = false">取 消</el-button>
          <el-button type="primary" @click="addSure" :disabled="addDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑班制-->
    <el-dialog
      title="编辑班制"
      :visible.sync="editMask"
      center
      width="800px">
      <div class="addDatas">
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">班制名称：</div>
          <div class="sitemr fl">
            <el-input v-model.trim="editName"  placeholder="请输入班制名称"></el-input>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">上班时间：</div>
          <div class="sitemr fl">
            <el-time-picker
              v-model="editStartTime"
              clearable
              value-format="HH:mm:ss"
              placeholder="上班时间">
            </el-time-picker>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">下班时间：</div>
          <div class="sitemr fl">
            <el-time-picker
              v-model="editEndTime"
              clearable
              value-format="HH:mm:ss"
              placeholder="下班时间">
            </el-time-picker>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">考勤日期：</div>
          <div class="" style="margin-left:150px;line-height: 40px;">
            <el-checkbox-group v-model="editweekList">
              <el-checkbox style="margin-left:2px;margin-right: 10px;" v-for="item,index in weekDay" :key="index" :label="item.weekdayId">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="sitem clearfix">
          <div class="siteml beforesiteml  fl">考勤地点：</div>
          <div class="sitemr fl" >
            <el-select v-model="editplace" placeholder="考勤地点">
              <el-option
                v-for="item,index in BuildinList"
                :key="index"
                :label="item.location"
                :value="item.buildingId">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editMask = false">取 消</el-button>
          <el-button type="primary" @click="editSure">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除的错误提示-->
    <el-dialog
      :visible.sync="errorFlag"
      center
      width="800px">
      <el-alert
        :closable="false"
        show-icon
        center
        title="删除未能完全成功"
        description="您要删除的班制已被考勤组绑定，所以无法删除。与考勤组对应关系如下："
        type="error">
      </el-alert>
      <div class="clear20"></div>
      <el-table
        v-for="table,index in errorTable"
        :key="index"
        :data="table"
        style="width: 100%">
            <el-table-column
              prop="configName"
              label="班制名称">
            </el-table-column>
            <el-table-column
              prop="attendanceGroupName"
              label="考勤组名称">
            </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorFlag=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "attendance-config",
    data() {
      return {
      	text:'正在加载，请稍候',
        addMask: false,//添加班制
        systemName: '',//班制名称
        startTime:'',//上班时间
        endTime:'',//下班时间
        weekList:[],//选中的星期
        weekDay:[],//星期列表,
        place:'',//考勤地点
        BuildinList:[],//
        choice:[],
        //编辑
        editMask:false,
        editName:'',
        editStartTime:'',
        editEndTime:'',
        editweekList:[],
        editplace:'',
        nowId:'',
        //添加确定按钮是否可用，用来限制双击
        addDisabled:false,
        //分页相关属性
        page: {
          currentPageNum: 1,//当前页码
          pageTotal: 0,//总页码0
          totalRecord: 0//总条数0
        },
        tableData: [],
        errorFlag:false,
        errorTable:[]
      }
    },
    created() {
      this.getList(1)
      this.getWeek()
      this.getBuilding()
    },
    methods: {
      delMore(){
        this.errorTable = [];
        if(this.choice.length<1){
          this.$message({showClose: true, message: '请至少选中一项再进行批量删除', type: 'error'});
        }else{
          this.$httpPasser.post('attendanceConfig/bathDelete',{
            ids:this.choice
          })
            .then(res=>{
              let datas=res.data
              if(datas.resultCode == '200'){
                if(datas.result==null  || datas.result.length==0){
                  this.$message({showClose: true, message: '删除成功', type: 'success'});
                }
                else{
                  this.errorTable = datas.result;
                  this.errorFlag = true;
                }
                this.getList(1)
                this.page.currentPageNum=1
              }else{
                this.$message({
                  showClose: true,
                  message: datas.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      handleSelectionChange(val){
        this.choice = []
        for (var i = 0; i < val.length; i++) {
          this.choice.push(val[i].attendanceConfigId)
        }
      },
      compare(val1,val2){
        return val1-val2;
      },
      //删除
      handleSingalDelete(index,row){
        this.errorTable = [];
        this.$httpPasser.post('attendanceConfig/bathDelete',{
          ids:row.attendanceConfigId
        })
          .then(res=>{
            let datas=res.data
            if(datas.resultCode == '200'){
              if(datas.result==null  || datas.result.length==0){
                this.$message({showClose: true, message: '删除成功', type: 'success'});
              }
              else{
                this.errorTable = datas.result;
                this.errorFlag = true;
              }
              this.getList(1)
              this.page.currentPageNum=1
            }else{
              this.$message({
                showClose: true,
                message: datas.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //编辑确定按钮
      editSure(){
        if(this.editName==''){
          this.$message({showClose: true, message: '请输入班制名称', type: 'error'});
        }else if(!this.editStartTime){
          this.$message({showClose: true, message: '请选择上班时间', type: 'error'});
        }else if(!this.editEndTime){
          this.$message({showClose: true, message: '请选择下班时间', type: 'error'});
        }else if(this.editweekList.length<1){
          this.$message({showClose: true, message: '请选择考勤日期', type: 'error'});
        }else if(this.editplace==''){
          this.$message({showClose: true, message: '请选择考勤地点', type: 'error'});
        }else {
          this.$httpPasser.post('attendanceConfig/save', {
            shopId:this.$local.sefetch('info').companyId,
            attendanceConfigId: this.nowId,
            name: this.editName,
            signOnTime: this.editStartTime,
            signOffTime: this.editEndTime,
            buildingId: this.editplace,
            weekdays: this.editweekList.sort(this.compare)
          })
            .then(res => {
              let datas = res.data
              if (datas.resultCode == '200') {
                this.$message({showClose: true, message: '修改成功', type: 'success'});
                this.editMask=false
                this.getList(1)
                this.page.currentPageNum=1
              } else {
                this.$message({
                  showClose: true,
                  message: datas.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      //编辑
      handleEdit(index,row){
        this.editMask=true
        this.$httpPasser.post('attendanceConfig/getOne',{
          attendanceId:row.attendanceConfigId
        })
          .then(res=>{
            let datas=res.data
            if(datas.resultCode == '200'){
              // console.log(datas)
              this.nowId=datas.result.attendanceConfigId
              this.editName=datas.result.name
              this.editStartTime=datas.result.signOnTime
              this.editEndTime=datas.result.signOffTime
              // console.log(datas.result.weekdaysIds.length)
              for(var i=0;i<datas.result.weekdaysIds.length;i++){
                datas.result.weekdaysIds[i]=parseInt(datas.result.weekdaysIds[i])
              }
              this.editweekList=datas.result.weekdaysIds
              this.editplace=datas.result.buildingId.toString()
            }else{
              this.$message({
                showClose: true,
                message: datas.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //获取考勤地点
      getBuilding(){
        this.$httpPasser.post('attendanceConfig/getBuilding',{
          shopId:this.$local.sefetch('info').companyId
        })
          .then(res=>{
            let datas=res.data
            if(datas.resultCode == '200'){
              // console.log(datas)
              this.BuildinList=datas.result
            }else{
              this.$message({
                showClose: true,
                message: datas.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //获取星期
      getWeek(){
        this.$httpPasser.post('baseData/getWeekDay')
          .then(res=>{
            let datas=res.data
            if(datas.resultCode == '200'){
              this.weekDay=datas.result
            }else{
              this.$message({
                showClose: true,
                message: datas.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //添加班制  确定按钮
      addSure(){
        if(!this.addDisabled && this.addMask){
          this.addDisabled = true;
          if(this.systemName==''){
            this.$message({showClose: true, message: '请输入班制名称', type: 'error'});
            this.addDisabled = false;
          }else if(!this.startTime){
            this.$message({showClose: true, message: '请选择上班时间', type: 'error'});
            this.addDisabled = false;
          }else if(!this.endTime){
            this.$message({showClose: true, message: '请选择下班时间', type: 'error'});
            this.addDisabled = false;
          }else if(this.weekList.length<1){
            this.$message({showClose: true, message: '请选择考勤日期', type: 'error'});
            this.addDisabled = false;
          }else if(this.place==''){
            this.$message({showClose: true, message: '请选择考勤地点', type: 'error'});
            this.addDisabled = false;
          }else{
            this.$httpPasser.post('attendanceConfig/save',{//attendanceConfig/save
              shopId:this.$local.sefetch('info').companyId,
              name:this.systemName,
              signOnTime:this.startTime,
              signOffTime:this.endTime,
              weekdays:this.weekList.sort(this.compare),
              buildingId:this.place
            }).then(res=>{
                this.addDisabled = false;
                let datas=res.data
                if(datas.resultCode == '200'){
                  this.$message({showClose: true, message: '添加成功', type: 'success'});
                  this.addMask=false
                  this.systemName=''
                  this.startTime=''
                  this.endTime=''
                  this.weekList=[]
                  this.place=''
                  this.getList(1)
                  this.page.currentPageNum=1
                }else{
                  this.$message({
                    showClose: true,
                    message: datas.resultCodeDesc,
                    type: 'error'
                  });
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }



      },
      //设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.getList(this.page.currentPageNum)//获取班制列表
      },
      //获取班制列表
      getList(pagnum) {
        let gsid = this.$local.sefetch('info').companyId
        this.$httpPasser.post('attendanceConfig/list', {
          shopId: gsid,//公司
          pageIndex: pagnum,//页码
          pageSize:30,
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.tableData = data.result
              this.page.pageTotal = data.pageTotal
              this.page.totalRecord = data.totalRecord
            } else if (data.resultCode == '204') {
              this.tableData = []
              this.text = "暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
              this.page.pageTotal = data.pageTotal
              this.page.totalRecord = data.totalRecord
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
    }
  }
</script>

<style scoped lang="less">
  #attendanceConfig {
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
</style>
<style lang="less">
  #attendanceConfig {
    .tables-now .el-table .cell {
      text-align: center !important;
    }
  }

</style>

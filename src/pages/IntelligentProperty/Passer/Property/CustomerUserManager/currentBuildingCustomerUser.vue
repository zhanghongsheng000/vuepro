<template>
  <div class="mainPart" id="currentBuildingCustomerUser">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">实时大楼人员</span>
      </div>
    </div>
    <div class="clearfix">
      <div class="fl" style="margin-right:5px;">
        <buildingCascader @buildingParam="buildingParam" begainFromBuilding="true"></buildingCascader>
      </div>
      <div class="fl" style="margin-right:5px;">
        <el-input
          clearable
          v-model="searchBuildingCustomerParams.companyName"
          placeholder="公司名称">
        </el-input>
      </div>
      <div class="fl">
        <el-button type="primary" @click="getBuildingPersonnel">查询</el-button>
      </div>
    </div>

    <div class="clear50 currentPasserInfoDetialAbstract">
      <span class="fl">当前楼内共有{{buildingCustomerInfo.result.buildingPeopleNum||0}}人，其中常驻人员{{buildingCustomerInfo.result.permanentNum||0}}人，外来人员{{buildingCustomerInfo.result.extraneousNum||0}}人</span>
      <span class="fr"></span>
    </div>
    <el-table
      :data="buildingCustomerInfo.result.personnelList"
      style="width: 100%" :empty-text=text>
      <el-table-column
        type="index"
        label="编号" :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="buildingName"
        label="写字楼名称">
      </el-table-column>
      <el-table-column
        prop="floorName"
        label="楼层">
      </el-table-column>
      <el-table-column
        prop="roomName"
        label="房间名称">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          {{sex[scope.row.sex]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="passerType"
        label="人员类型">
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="searchBuildingCustomerParams.pageIndex"
          layout="prev, pager, next"
          :page-count="buildingCustomerInfo.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle font12">
        <span>共{{this.buildingCustomerInfo.pageTotal}}页，当前第{{this.buildingCustomerInfo.pageIndex}}页,每页30条，共{{this.buildingCustomerInfo.totalRecord}}条</span>
      </div>
    </div>
    </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'
  export default {
    name: "search-customer-user",
    data(){
      return{
      	text :'正在加载，请稍候',
        searchBuildingCustomerParams:{
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          pageIndex:0,//当前页
          pageSize:30,
          buildingId:'',
          buildingFloorId:'',
          buildingRoomId:'',
          companyName:''
        },
        sex:{
          'F':'女',
          'M':'男'
        },
        buildingCustomerInfo:{
          pageIndex:'',
          pageSize:'',
          pageTotal:0,
          result:{
            buildingPeopleNum:'0',
            extraneousNum:'0',
            permanentNum:'0',
            personnelList:[]
          }
        }
      }
    },
    components:{
      buildingCascader: buildingCascader
    },
    methods:{
      indexMethod(index) {//编号
        return (this.searchBuildingCustomerParams.pageIndex - 1)*30 + 1 + index;
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam){
        console.log(buildingParam)
      },
      //翻页方法
      handleCurrentChange(){
        this.getBuildingPersonnel();
      },
      //查询列表信息
      getBuildingPersonnel() {
        this.$httpPasser.get(
          'WebPropertyCompany/getBuildingPersonnel',
          {params: this.searchBuildingCustomerParams}
        ).then(
          (res) => {
            if (res.data.resultCode == 200) {
              this.buildingCustomerInfo = res.data
            }
            else if (res.data.resultCode == 204) {
            	this.text = '暂无数据'
              this.buildingCustomerInfo = res.data
              this.buildingCustomerInfo.result = {};
              delete(this.buildingCustomerInfo.result.personnelList);
              this.$set(this.buildingCustomerInfo.result,'personnelList',[])
              this.$message.success('暂无实时大楼人员数据')
            }
            else {

            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam){
          this.searchBuildingCustomerParams.buildingGroupId = '';
          this.searchBuildingCustomerParams.buildingId = '';
          this.searchBuildingCustomerParams.buildingFloorId = '';
          this.searchBuildingCustomerParams.buildingRoomId = '';
          this.searchBuildingCustomerParams.buildingRoomName = '';
          if(buildingParam.buildingGroupId){
            this.searchBuildingCustomerParams.buildingGroupId = buildingParam.buildingGroupId;
            this.searchBuildingCustomerParams.resultName = buildingParam.buildingRoomName;
          }
          if(buildingParam.buildingId){
            this.searchBuildingCustomerParams.buildingId = buildingParam.buildingId;
            this.searchBuildingCustomerParams.resultName = buildingParam.buildingRoomName;
          }
          if(buildingParam.buildingFloorId){
            this.searchBuildingCustomerParams.buildingFloorId = buildingParam.buildingFloorId;
            this.searchBuildingCustomerParams.resultName = buildingParam.buildingRoomName;
          }
          if(buildingParam.buildingRoomId){
            this.searchBuildingCustomerParams.buildingRoomId = buildingParam.buildingRoomId;
            this.searchBuildingCustomerParams.resultName = buildingParam.buildingRoomName;
          }

      },
    },
    created:function(){
      this.getBuildingPersonnel();
    }
  }
</script>

<style lang="less" scoped>
  #currentBuildingCustomerUser {
    .currentPasserInfoDetialAbstract{
      line-height:50px;
      font-size:14px;
      .fr{
        display:inline-block;
        floar:right;
        padding-right:15px;
        color:#5c6292;
      }
      .fl{
        display:inline-block;
        floar:left;
        text-indent:15px;
        i{
          color:#5c6292;
        }
      }
    }
  .pagestyle{
    line-height:30px;
  }
  }
</style>
<style lang="less">
  #currentBuildingCustomerUser {
    .el-input__inner{
      max-width:606px;
    }

  }
</style>

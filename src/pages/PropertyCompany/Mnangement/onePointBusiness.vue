<template>
  <div id="onePointBusiness">
    <div class="headNav">
      <ul class="clearfix">
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/onePointBusiness'}" disabled>一键招商</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/rentDateRemind'}" disabled>租期提醒</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/remindDateConfig'}" disabled>提醒日期配置</router-link>
      </ul>
    </div>
    <div class="condition-box clearfix">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">一键招商</span>
      </div>
      <div class="month fl">
        <el-select v-model="getCompanyMessage.buildingId" clearable  placeholder="请选择写字楼" @change="getfloorName">
          <el-option
            v-for="building in getCompanyMessage.buildingName"
            :key="building.buildingId"
            :label="building.buildingName"
            :value="building.buildingId">
          </el-option>
        </el-select>
      </div>
      <div class="month fl">
        <el-select v-model="getCompanyMessage.buildingFloorId" placeholder="请选择楼层" clearable>
          <el-option
            v-for="floor in getCompanyMessage.floorName"
            :key="floor.buildingFloorName"
            :label="floor.buildingFloorName"
            :value="floor.buildingFloorId">
          </el-option>
        </el-select>
      </div>
      <div class="month fl">
        <el-select v-model="getAttractInvestmentListParams.statusId" clearable  placeholder="请选择状态">
          <el-option
            v-for="item in RoomStatusList"
            :key="item.dictionariesValue"
            :label="item.dictionariesName"
            :value="item.dictionariesValue">
          </el-option>
        </el-select>
      </div>
      <div class="btns fl">
        <el-button type="primary" @click="getAttractInvestmentList">查询</el-button>
      </div>
    </div>
    <div class="tables">
      <el-table :data="InvestmentList" style="width: 100%" :row-class-name="tableRowClassName" :empty-text=text> <!--@selection-change="handleSelectionChange" 暂时只能单条一件招商-->
        <!--<el-table-column type="selection" label="选择" width="55"></el-table-column>-->
        <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
        <el-table-column label="公司名称"  prop="shopName" >
        </el-table-column>
        <el-table-column label="写字楼"  prop="buildingName" >
        </el-table-column>
        <el-table-column label="楼层" prop="floorName">
        </el-table-column>
        <el-table-column label="房间" prop="roomName">
        </el-table-column>
        <el-table-column label="面积" prop="areaSize">
        </el-table-column>
        <el-table-column label="装修" prop="fitment" :render-header="renderHeader">
        </el-table-column>
        <el-table-column label="状态" prop="statusName" >
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope" @click="toEditBuildingGroup">
            <el-button size="mini" type="primary" @click="detailsClick(scope.row)" v-if="scope.row.status!='72'">租期管理</el-button>
            <el-button size="mini" type="primary" @click="InvestmentClick(scope.row)" v-if="scope.row.ifAttractInvestment =='N'">一键招商</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix pt20">
      <div class="clearfix">
        <div class="fl" >
          <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="ConfigureParams.pageTotal">
          </el-pagination>
        </div>
        <div class="fl pagestyle" style="line-height: 30px">
          <span>共{{this.ConfigureParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.ConfigureParams.totalRecord}}条</span>
        </div>
      </div>
     <!--<div class="fr mr50">-->
        <!--<el-button type="danger" @click="btnClick" size="medium">一键招商</el-button>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: "index",
    data() {
      return {
        text:"正在加载，请稍候",
        getAttractInvestmentListParams:{
          shopId:this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          statusId:'',
        },
        activeName: 'first',
        flag: 1,
        pathArray: {
          1: 'onePointBusiness',
          2: 'rentDateRemind',
        },
        RoomStatusList:[],//房间状态
        buildNow:'',
        buildList:[
          {value: '1', label: '硅谷广场A座'},
          {value: '2', label: '硅谷广场B座'},
        ],
        ConfigureParams: {
          pageIndex: 1, //当前页
          pageSize: 30, //每页条数
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },
        floorNum:'',
        InvestmentList:[],
        getCompanyMessage:{
          buildingName:'',//写字楼
          buildingId:'',//公司id
          floorName:'',//所在楼层
          buildingFloorId:'',//楼层id
        },
        buildingMessage:{
          buildingGroupId:'',
          buildingId:'',
          buildingFloorId:'',
          buildingRoomId:''
        }
      }
    },
    methods: {
      indexMethod(index) { //编号
        return(this.ConfigureInfo.pageIndex - 1) * 30 + 1 + index;
      },
      tab(index) {
        this.flag = index;
        this.$router.push({
          path: this.pathArray[this.flag]
        });
      },
      detailsClick(row){
        let shopId = row.shopId;
        if(shopId == ''||shopId == null){
          this.$router.push({
            path:'./rentManager',
            query:{
              buildingId:row.buildingId,
              buildingRoomId: row.buildingRoomId,
            }
          })
        }else{
          this.$router.push({
            path:'./rentManager',
            query:{
              buildingId:row.buildingId,
              buildingRoomId: row.buildingRoomId,
              shopId:row.shopId,
              shopName:row.shopName
            }
          })
        }
      },
      tableRowClassName({row, rowIndex}) {
        if(row.status == '7101'){
          return "red"
        }
        return '';
      },
      // render 事件
      renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'div',
          [
            h('span', column.label),
            h('i', {
//              class:'el-icon-location',
//              style:'color:#409eff;margin-left:5px;'
            })
          ],
        );
      },
        btnClick(){},
      toEditBuildingGroup(){},
      getAttractInvestmentList(){//获取一键招商列表
        this.$httpPasser.get("attractInvestment/getAttractInvestmentList",{
          params:{
            shopId:this.getAttractInvestmentListParams.shopId,
            buildingFloorId:this.getCompanyMessage.buildingFloorId,
            buildingId:this.getCompanyMessage.buildingId,
            pageIndex:this.ConfigureInfo.pageIndex,
            pageSize:this.ConfigureParams.pageSize,
            statusId:this.getAttractInvestmentListParams.statusId
          }
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.InvestmentList = res.data.result
            this.ConfigureParams.totalRecord = res.data.totalRecord
            this.ConfigureParams.pageIndex = res.data.pageIndex
            this.ConfigureParams.pageTotal = res.data.pageTotal
          }else if(res.data.resultCode == '204'){
            this.InvestmentList =[];
            this.text ="暂无数据"
            this.ConfigureParams.totalRecord = res.data.totalRecord
            this.ConfigureParams.pageIndex = res.data.pageIndex
            this.ConfigureParams.pageTotal = res.data.pageTotal
          }else{
            this.$message.success(res.data.resultCodeDesc)
          }
        })
      },
      //获取写字楼
      getbuildingName(){//获取写字楼
        this.$httpPasser.post("building/getBuildingListByCompanyId",{
          companyId:this.getAttractInvestmentListParams.shopId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.getCompanyMessage.buildingName = res.data.result;
            this.getCompanyMessage.roomId ='';
            this.getCompanyMessage.shopId='';
          }else if(res.data.resultCode == "406"){
            this.$message.error(res.data.resultCodeDesc);
          }
        })
      },
      getfloorName(){//获取楼层
        this.$httpPasser.post("building/getBuildingFloorListByBuildingId",{
          buildingId:this.getCompanyMessage.buildingId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.getCompanyMessage.floorName = res.data.result.buildingFloorList;
            this.getCompanyMessage.buildingFloorId ='';
            this.getCompanyMessage.roomId ='';
            this.getCompanyMessage.shopId=''
            this.getCompanyMessage.departmentName =''
          }
        })
      },
      getRoomStatus(){//获得房间状态
        this.$httpPasser.get("baseDic/getRoomStatus",{
          params:{}
        }).then(res=>{
          if(res.data.resultCode == '200'){
            this.RoomStatusList = res.data.result
          }
        })
      },
      handleCurrentChange(index) { //分页方法
        this.ConfigureInfo.pageIndex = index;
        this.getAttractInvestmentList();
      },
      InvestmentClick(row){//一键招商
        this.buildingMessage.buildingGroupId = row.buildingGroupId
        this.buildingMessage.buildingId = row.buildingId
        this.buildingMessage.buildingFloorId = row.buildingFloorId
        this.buildingMessage.buildingRoomId = row.buildingRoomId
        this.$local.sesave('buildingMessage', this.buildingMessage)
        this.$httpPasser.post("attractInvestment/keyInvestment",{
          buildingRoomIds:row.buildingRoomId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$router.push({
              path:'editMessage/editBuildingGroup'
            })
          }else{
            this.$router.push({
              path:'editMessage/editBuildingGroup'
            })
          }
        })
      },
    },
    created(){
      this.getbuildingName()
      this.getAttractInvestmentList()
      this.getRoomStatus()
    }
  }
</script>
<style lang="less" scoped="scoped">
  #onePointBusiness {
    .headNav {
      width: 100%;
      height: 37px;
      line-height: 35px;
      border-bottom: solid #e5e5e5 1px;
      margin-bottom: 30px;
      ul {
        li {
          float: left;
          width: 120px;
          text-align: center;
          font-size: 15px;
          cursor: pointer;
        }
        li.active {
          border-bottom: solid #3387f9 2px;
        }
      }
    }
    .condition-box{
      margin-bottom: 30px;
    }
    .month{
      margin-right: 20px;
    }
    .mr50{
      margin-right: 10px;
    }
  }
</style>
<style lang="less">
  #onePointBusiness {
    .el-table .cell {
      text-align: center!important;
    }
    .el-table th {
      text-align: center!important;
    }
    .el-table .warning-row {
      background: oldlace;
    }
    .el-table .success-row {
      background: #f0f9eb;
    }
    .el-table .red .el-table_1_column_7{
      color: red;
    }
    .el-table th div{
      line-height: 1;
    }
    .el-table th{
      padding: 12px 0;
    }
  }
</style>

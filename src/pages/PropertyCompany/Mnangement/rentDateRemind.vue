<template>
  <div id="rentDateRemind">
    <div class="headNav">
      <ul>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/onePointBusiness'}" disabled>一键招商</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/rentDateRemind'}" disabled>租期提醒</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/remindDateConfig'}" disabled>提醒日期配置</router-link>
      </ul>
    </div>
    <div class="top-cont clearfix">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">租期提醒</span>
      </div>
    </div>
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="房间">
        <el-input v-model="searchParams.buildingName" @change="setPageIndex"  clearable  @clear="clearRoomInput" placeholder="请填写写字楼名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchRenter">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%" :empty-text=text>
      <el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
      <el-table-column
        prop="buildingName"
        label="写字楼名称"
        width="280">
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="所在地址"
        width="280">
      </el-table-column>
      <el-table-column
        prop="floorNum"
        width="80"
        label="总层数">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="showDateDetail(scope.row.buildingGroupId,scope.row.buildingId,scope.row.buildingName)"
            >查看租期
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
          <div class="fl pagestyle" style="line-height: 30px"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页{{this.page.pageSize}}条，共{{this.page.totalRecord}}条</span>
          </div>
        </div>
      </div>
      <div class="fr">
        <!--<el-button type="primary" @click="showDelete">搬离</el-button>-->
      </div>
    </div>
  </div>

</template>
<script>
	export default {
		name: "index",
		data() {
			return {
				text:'正在加载，请稍候',
        searchParams:{
          buildingName:'',
          shopId:this.$local.sefetch('info').companyId,
          pageSize:'30',
          pageIndex:'1'
        },
        //分页相关属性
        page: {
          //当前页码
          currentPageNum: 0,
          //总页码
          pageTotal: 0,
          totalRecord: 0,//总条数
          pageSize: '30'
        },
        tableData: []
			}
		},
    created(){
      this.getBuidlingList()
    },
		methods: {
      //更换查询条件时，将pageIndex设置为1
      setPageIndex() {
        this.searchParams.pageIndex = 1;
      },
      //清空写字楼名称
      clearRoomInput(){
        this.searchParams.buildingName = '';
      },
      //提交查询
      handleSearchRenter(){
        this.getBuidlingList()
      },
      //获取楼盘里诶包
      getBuidlingList(){
        this.$httpPasser.get(
          'attractInvestment/getBuildingListByShopId',
          {params:this.searchParams}
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.tableData = res.data.result;
            this.page.pageTotal = Number(res.data.pageTotal);
            this.page.totalRecord = Number(res.data.totalRecord);//总记录数
          }
          else{
          	this.text ="暂无数据"
            this.$message.error(res.data.resultCodeDesc)
            this.tableData = [];
          }
        }).catch((err)=>{

        })
      },
      //设置编号
      indexMethod(index) {//编号
        return (this.page.currentPageNum - 1) * Number(this.page.pageSize) + 1 + index;
      },
      //
      showDateDetail(buildingGroupId,buildingId,buildingName){
        this.$router.push({
          path:'./rentDateDetail',
          query:{
            buildingGroupId:buildingGroupId,
            buildingId:buildingId,
            buildingName:buildingName
          }
        })
      },
      //设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.searchParams.pageIndex = index;
        this.handleSearchRenter();
      },
		}
	}
</script>

<style lang="less" scoped="scoped">
  #rentDateRemind{
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
    .router{
      margin-top: -1px;
      /*padding: 30px;*/
    }
  }
</style>
<style lang="less">
  #rentDateRemind{
    .el-table th, .el-table tr{

    }
  }

</style>

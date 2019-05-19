<template>
  <div id="companyInfo">
    <div class="nav">
      <el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">公司信息</span>
    </div>
    <div style="width:980px;padding-top:30px;padding-left:30px;">
      <el-table :data="companyList" style="width: 100%" :empty-text=text>
        <el-table-column type="index" width="80" label="编号" :index="indexMethod">
        </el-table-column>
        <el-table-column label="写字楼名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.buildingName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼层" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.floorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="房间" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.roomName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" width="245">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务联系人" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.linkman }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务联系人电话" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanTelephone }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleBuildingGroupDetails(scope.$index, scope.row)">详情
            </el-button>
            <el-button size="mini" @click="handleBuildingGroupEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleBuildingGroupDelete(scope.$index, scope.row,true)">删除
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="clearfix pt30">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-info",
    data(){
      return {
      	text:'正在加载，请稍候',
        params:{
          pageIndex:1,
          pageSize:30,
          buildingId:this.$route.query.buildingId
        },
        page:{
          currentPageNum:0,
          pageTotal:0,
          pageSize:30,
          totalRecord:0
        },
        companyList:[
        ]
      }
    },
    methods: {
      //返回楼盘列表方法
      toBuildingGroupList() {
        this.$router.back()
      },
      indexMethod(index) {
        return (this.page.currentPageNum - 1)*30 + 1 + index;
      },
      //设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.params.pageIndex=index;
        this.getCompanyData()
      },
      //获取数据
      getCompanyData(){
        this.$httpPasser.get(
          'newBuilding/getCompanyInfoListByBuildingId',
          {params:this.params}
        ).then(
          (res)=>{
            console.log(res)
            if(res.data.resultCode=='200'){
              this.$message.success(res.data.resultCodeDesc)
              this.page.pageTotal = res.data.pageTotal;
              this.page.totalRecord =res.data.totalRecord;//总记录数
              this.companyList = res.data.result;
            }
            else if(res.data.resultCode=='204'){
              this.$message.success(res.data.resultCodeDesc)
              this.page.pageTotal = 0;
              this.page.totalRecord = 0;//总记录数
              this.companyList = []
              this.text = '暂无数据'
            }
            else{
            	this.text = '暂无数据'
              this.$message.error(res.data.resultCodeDesc)
            }
          }
        )
      }
    },
    created(){
      this.getCompanyData()
    }
  }
</script>

<style lang="less" scoped>
  .pt30 {
    padding-top: 30px;
  }
  .lh35{
    line-height:35px;
  }
</style>
<style lang="less">
  #companyInfo{
    .el-table .cell {
      text-align: center!important;
    }
    .el-table th {
      text-align: center!important;
    }
  }
</style>

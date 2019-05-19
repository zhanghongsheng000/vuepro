<template>
  <div class="mainPart" id="currentPasserInfo">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">实时通行信息</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%" :empty-text=text>
      <el-table-column label="写字楼名称">
        <template slot-scope="scope">
          {{scope.row.buildingGroupName+scope.row.name}}
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="floorName"
        label="楼层">
      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSearchDetail(scope.$index, scope.row)">查询通行人员详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="pageigitionParams.pageIndex"
          layout="prev, pager, next"
          :page-count="pageigitionParams.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle font12">
        <span>总共{{this.pageigitionParams.pageTotal}}页,当前第{{this.pageigitionParams.pageIndex}}页，每页30条，共{{this.pageigitionParams.totalRecord}}条</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search-customer-user",
    data() {
      return {
      	text:'正在加载，请稍候',
        searchParams:{
          shopId:this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          pageIndex:1,
          pageSize:30,
        },
        pageigitionParams:{
          pageSize:30,//每页条数
          pageIndex:1,//当前第几页
          pageTotal:0,//总页数
          totalRecord:0,//总条数
        },
        tableData: [
          {
            reaId: '',
            areaSize: '',
            buildingCustomerElevator: "",
            buildingGoodsElevator: "",
            buildingGroupId: '',
            buildingGroupName: "",
            buildingId: '',
            contact: "",
            elevator: "",
            floorNum: '',
            info: "",
            name: "",
            overgroundFloorNum: '',
            telphone: "",
            undergroundFloorNum: '',
            userId: ''
          }
        ]
      }

    },
    methods: {
      //分页回调方法
      handleCurrentChange(index){
        this.pageigitionParams.pageIndex = index;
        this.entryAndExitRecord();
      },
      //获取通行人员信息
      entryAndExitRecord(){
        console.log(this.searchParams)
        this.$httpPasser.get(
          'WebPropertyCompany/getGroupBuildingByShopId',
          {params:this.searchParams},
        ).then(
          (res)=>{
            if(res.data.resultCode==200){
              this.pageigitionParams.pageTotal = res.data.pageTotal;
              this.tableData = res.data.result;
              this.pageigitionParams.totalRecord = res.data.totalRecord;
            }
            else if(res.data.resultCode==204){
            	this.text = "暂无数据"
              this.tableData = [];
              this.pageigitionParams.pageTotal = 0;
              this.$message.success('查询成功但没有数据！')
            }
            else{
							this.$message.error(res.data.resultCodeDesc)
            }
          }
        )
      },
      //查看详情接口
      handleSearchDetail(index,row){
        console.log(row)
        //this.$router.push({path:'currentPasserInfoDetial'});
        this.$router.push({path:'currentPasserInfoDetial',query:row});
        //this.$route.push({path:'currentPasserInfoDetial',query:{}})
      }
    },
    created:function(){
      this.entryAndExitRecord()
      //console.log(this.$route)
    }
  }
</script>

<style lang="less" scoped>
  #currentPasserInfo {
    .pagestyle{
      line-height: 30px;
    }
  }
  /*.top-title {
    margin-bottom: 20px;
    .line {
      height: 1px;
      background-color: #ccc;
      margin-bottom: -17px;
    }
    .top-text {
      margin-left: 25px;
      font-size: 14px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
  }*/
</style>
<style lang="less">
  #currentPasserInfo {
    .el-input__inner {
      max-width: 606px;
    }

  }
</style>

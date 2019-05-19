<template>
  <div>
    <div class="nav">
      <el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">{{customerName}}</span>
    </div>
    <div class="cusomer-info" id="cusomer-info">
      <el-table :data="tableData"  style="width: 100%" :empty-text=text> 
        <el-table-column type="index" width="80" label="编号" :index="indexMethod">

        </el-table-column>
        <el-table-column label="写字楼名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.buildingName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼层名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.floorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="房间名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.roomName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.departmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.sex=='F'?'女':'男' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.telephone }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix" style="padding-top:20px;">
        <div class="fl">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page.sync="page.currentPageNum"
            layout="prev, pager, next"
            :page-count="page.pageTotal"
            :page-size="pages"
          >
          </el-pagination>
        </div>
        <div class="fl font12" style="line-height: 28px;"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "company-info",
    data(){
      return {
      	text:"正在加载，请稍候",
        customerName:'',//人员名称
        type:this.$route.query.type,
        pages:30,
        tableData:[
          /*{
            customerUserId:'001',
            buildingName:'啦啦写字楼',
            floorName:'20层',
            roomName:'2001',
            companyName:'拉阿拉公司',
            departmentName:'销售部',
            username:'张三',
            sex:'男',
            telephone:'13363858221'
          }*/
        ],
        //分页相关属性
        page: {
          currentPageNum:1,//当前页码
          pageTotal:0,//总页码
          totalRecord:0,//总条数
          pageSize:30
        },
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
      getBuildingList(num){
        if(this.type == 1){
          this.customerName = '常驻人员信息'
        }else if(this.type == 2){
          this.customerName ="实时流动人员信息"
        }else if(this.type == 3){
          this.customerName ='实时特殊人员信息'
        }else{
          this.customerName = '实时黑名单人员信息'
        }
        this.$httpPasser.post('newBuilding/getBuildingEmployeerInfo',{
          buildingId:this.$route.query.buildingId,
          type:this.$route.query.type,
          pageIndex:num,
          pageSize:this.page.pageSize
        })
          .then(res=>{
            const data = res.data
            if (data.resultCode == '200') {
              this.tableData=[];
              for(let o in data.result){
                if(data.result[o]!=null){
                  this.tableData.push(data.result[o])
                }
              }
              this.page.pageTotal = data.pageTotal;
              this.page.totalRecord =data.totalRecord;//总记录数
            }else if(data.resultCode == '204'){
              this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
              this.tableData=[]
              this.page.pageTotal = data.pageTotal;
              this.page.totalRecord =data.totalRecord;//总记录数
              this.text ="暂无数据"
            }
            else if(data.resultCode == 0){
              this.$message({showClose: true, message: data.resultCodeDesc?data.resultCodeDesc:data.result, type: 'success'});
              this.tableData=[]
              this.page.pageTotal = data.pageTotal;
              this.page.totalRecord =data.totalRecord;//总记录数
            }else{
            	this.text ="暂无数据"
              this.$message({showClose: true, message: data.resultCodeDesc?data.resultCodeDesc:data.result, type: 'error'});
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //设置分页
      handleCurrentChange(index){
        this.page.currentPageNum = index;
        this.getBuildingList(this.page.currentPageNum)//写字楼列表
      },
    },
    created(){
      this.getBuildingList(1)
    }
  }
</script>

<style lang="less" scoped>
  .cusomer-info{
    padding:30px 0 30px 30px;
  }
</style>
<style lang="less">
  #cusomer-info{
    .el-table .cell {
      text-align: center!important;
    }
    .el-table th {
      text-align: center!important;
    }
  }
</style>

<template>
	<div id="roomInfo">
		<div class="nav">
			<el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button>
			<span style="margin-left:20px;font-size:15px;">{{state}}</span>
		</div>
		<div class="tables">
			<el-table :data="roomInfoList" style="width: 100%" :empty-text=text>
				<el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
				<el-table-column prop="buildingName" label="写字楼名称"></el-table-column>
				<el-table-column prop="floorNum" label="楼层"></el-table-column>
				<el-table-column prop="roomName" label="房间"></el-table-column>
				<el-table-column prop="areaSize" label="面积"></el-table-column>
				<el-table-column prop="status" label="出租状态"></el-table-column>
				<el-table-column prop="shopName" label="公司名称"></el-table-column>
				<el-table-column prop="linkman" label="业务联系人"></el-table-column>
				<el-table-column prop="linkmanTelephone" label="业务联系人电话"></el-table-column>
			</el-table>
		</div>
		<div class="clearfix pt30">
			<div class="fl">
				<el-pagination @current-change="handleCurrentChange" background :current-page.sync="page.currentPageNum" layout="prev, pager, next" :page-count="page.pageTotal" :page-size="pages">
				</el-pagination>
			</div>
			<div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "company-info",
		data() {
			return {
				text:'正在加载，请稍候',
        condition:this.$route.query.condition,
        state:'',
        pages:30,
				params: {
					pageIndex: 1,
					pageSize: 30,
					buildingId: this.$route.query.buildingId,
					condition:this.$route.query.condition
				},
				page:{
          currentPageNum:1,
          pageTotal:0,
          pageSize:30,
          totalRecord:0
        },
				roomInfoList: [],
			}
		},
		methods: {
			//返回楼盘列表方法
			toBuildingGroupList() {
				this.$router.back()
			},
			//设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.params.pageIndex=index;
        this.getRoomInfo(index)
      },
			getRoomInfo(pageIndex){
			  console.log(this.condition)
        if(this.condition =='0'){
			    this.state = "房间总数";
        }else if(this.condition == '1'){
          this.state = '在租房间'
        }else{
          this.state = "空租房间"
        }
				this.$httpPasser.post('buildingRoom/getBuildingRoomListByCondition',{
					buildingId:this.params.buildingId,
					condition:this.params.condition,
					pageIndex:pageIndex,
					pageSize:30
				}).then((res)=>{
					 if(res.data.resultCode=='200'){
              this.$message.success(res.data.resultCodeDesc)
              this.page.pageTotal = res.data.pageTotal;
              this.page.totalRecord =res.data.totalRecord;
              this.roomInfoList = res.data.result;
            }
            else if(res.data.resultCode=='204'){
              this.$message.success(res.data.resultCodeDesc)
              this.page.pageTotal = 0;
              this.page.totalRecord = 0;//总记录数
              this.companyList = []
              this.text ="暂无数据"
            }
            else{
            	this.text ="暂无数据"
              this.$message.error(res.data.resultCodeDesc)
            }
				})
			},
			indexMethod(index) {
        return (this.page.currentPageNum - 1)*30 + 1 + index;
      },
		},
		 created(){
      this.getRoomInfo(1)
    }
	}
</script>

<style lang="less" scoped>
	#roomInfo {
		.pt30 {
			padding-top: 30px;
		}
		.lh35 {
			line-height: 35px;
		}
	}
</style>
<style lang="less">
	#roomInfo {
		.el-table .cell {
			text-align: center!important;
		}
		.el-table th {
			text-align: center!important;
		}
	}
</style>

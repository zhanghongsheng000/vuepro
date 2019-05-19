<template>
	<div id="repairOrderStatisDetails">
		<div class="main-cont" style="padding-bottom: 0">
			<div class="common">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">报修单统计详情</span>
				</div>
			</div>
		</div>
    <div class="tables" style="padding-top: 0">
      <div class="title">
        <span v-if="condition.startTime == ''||condition.startTime == null ">{{showDate}}</span>
        <span v-if="condition.startTime">{{condition.startTime}}</span>
        <span v-if="condition.endTime"><span>至</span>{{condition.endTime}}</span>
        <span v-if="condition.facilitiesType == '1'">公共设施</span>
        <span v-if="condition.facilitiesType == '2'">租客设施</span>
        <span v-if="condition.servicesPro">{{condition.servicesPro}}</span>
        报修单统计
      </div>
    </div>
		<div class="tables">
			<el-table :data="repairList" style="width: 100%">
				<el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
				<el-table-column prop="repairDocumentsNumber" label="报修单号"></el-table-column>
				<el-table-column prop="buildingName" label="所在写字楼"></el-table-column>
				<el-table-column prop="repairType" label="报修类型"></el-table-column>
				<el-table-column prop="repairRealName" label="报修人"></el-table-column>
				<el-table-column prop="repairPhone" label="报修人电话"></el-table-column>
				<el-table-column prop="repairShopName" label="报修人公司"></el-table-column>
        <el-table-column prop="roomName" label="报修人房间"></el-table-column>
        <el-table-column prop="repairTime" label="报修时间"></el-table-column>
        <el-table-column prop="finishTime" label="完成时间"></el-table-column>
        <el-table-column prop="statusName" label="维修状态"></el-table-column>
				<el-table-column fixed="right" label="操作">
          <template slot-scope="scope" style="text-align: right">
            <el-button type="primary" size="small" v-if="scope.row.statusName=='未接单'" @click="dispatchClick(scope.row)">派单</el-button>
            <el-button type="primary" size="small" v-if="scope.row.statusName=='未接单'||scope.row.statusName=='未确认'" @click="closeClick(scope.row)">关闭</el-button>
            <el-button type="primary" size="small" @click="detailsClick(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="clear20"></div>
			<div class="clearfix">
				<div class="fl">
					<el-pagination @current-change=" handleCurrentChange" background :current-page.sync="servicesConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="servicesConfigureParams.pageTotal">
					</el-pagination>
				</div>
				<div class="fl pagestyle">
					<span>共{{this.servicesConfigureParams.pageTotal}}页，当前第{{this.servicesConfigureParams.pageIndex}}页,每页30条，共{{this.servicesConfigureParams.totalRecord}}条</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import gUrl from '@/assets/js/gUrl'
	import buildingCascader from '@/components/public/buildingCascader'
	import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

	export default {
		name: "repairOrderStatisDetails",
		data() {
			return {
				showDate: this.$local.getDay('yyyy年MM月'),
				condition: {
          startTime: this.$route.query.startTime,
          endTime:this.$route.query.endTime,
          facilitiesType:this.$route.query.facilitiesType,
          servicesPro:this.$route.query.servicesPro,
          employeeId:this.$route.query.employeeId,
				},
				repairState: '',
				repairType: '', //
				reportOrderStatis: [{
					address: 1,
				}],
				servicesConfigureParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					pageIndex: 1, //当前页
					pageSize: 30, //每页条数
					pageTotal: 0, //总页数
					totalRecord: 0, //总条数
					employeeId: '',
				},
				servicesConfigureInfo: {
					pageTotal: 0,
					pageIndex: 1 //当前页
				},

        getEmployeeParams: {
          productId: this.$local.sefetch('productInfo').productId ? this.$local.sefetch('productInfo').productId : '',
          pageIndex: 1,
          pageSize: 30,
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
          userName: '',
          queryState: '' //状态
        },
        getEmployeePageParams: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },

				repairList: []
			}
		},
		created() {
			this.getOrderStatisDetails()
		},
		computed: {},
		methods: {
			indexMethod(index) { //编号
				return(this.servicesConfigureParams.pageIndex - 1) * 30 + 1 + index;
			},
			handleCurrentChange(index) { //分页方法
				//this.servicesConfigureParams.pageIndex = index;
				this.servicesConfigureInfo.pageIndex = index;
				this.getOrderStatisDetails();
			},
			getOrderStatisDetails() { //获取详情
        this.condition.startTime = this.condition.startTime.slice(0,10)
        this.condition.endTime = this.condition.endTime.slice(0,10)
				this.$httpPasser.post("repairStatistics/statisticsListDetail", {
					pageIndex: this.servicesConfigureInfo.pageIndex,
					shopId: this.servicesConfigureParams.companyId,
					employeeId: this.condition.employeeId,
					endTime: this.condition.endTime,
					pageSize: this.servicesConfigureParams.pageSize,
//					repairType: this.condition.facilitiesType,
//					serviceItemId: this.condition.servicesPro,
					startTime: this.condition.startTime,
          serviceItemId:this.$route.query.serviceItemId,
          repairType:this.$route.query.repairType
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.repairList = res.data.result
						this.servicesConfigureParams.totalRecord = res.data.totalRecord
						this.servicesConfigureParams.pageIndex = res.data.pageIndex
						this.servicesConfigureParams.pageTotal = res.data.pageTotal
					} else {
						this.repairList = [];
					}
				})
			},
      detailsClick(row) {
        this.$router.push({
          path:'./repairListDetails',
          query:{
            repairDocumentsId:row.repairDocumentsId
          }
        })
			},
		}
	}
</script>

<style scoped lang="less">
	#repairOrderStatisDetails {
		.main-cont {
			margin-top: 20px;
			padding-bottom: 20px;
		}
		.form-item {
			margin-right: 15px;
		}
		.common {
			width: 100%!important;
		}
		.tables {
			padding-top: 30px;
			.pagestyle {
				line-height: 30px;
			}
		}
		.tables {
			.title {
				text-align: center;
				font-size: 14px;
				line-height: 30px;
				padding-bottom: 10px;
			}
		}
	}
</style>
<style lang="less">

</style>

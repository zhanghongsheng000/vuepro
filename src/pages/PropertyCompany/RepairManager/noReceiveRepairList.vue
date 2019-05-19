<template>
	<div id="noReceiveRepairList">
		<div class="main-cont">
			<div class="common">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">未接单报修列表</span>
				</div>
			</div>
			<div class="main-box">
				<div class="forms-cont clearfix">
					<div class="form-item fl">
						<el-date-picker v-model="repairStartTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择报修开始时间">
						</el-date-picker>
					</div>
					<div class="form-item fl">
						<div class="form-item fl">
							<el-date-picker v-model="repairEndTime" type="date" value-format='yyyy-MM-dd' placeholder="请选择报修结束时间">
							</el-date-picker>
						</div>
					</div>
					<div class="form-item fl">
						<el-input v-model.trim="customerUserPhone" placeholder="请输入报修人电话"></el-input>
					</div>
					<div class="form-item fl">
						<el-button type="primary" @click="searchBtn">搜索</el-button>
					</div>
				</div>
				<div class="tables">
					<el-table :data="getRepairDocuments" style="width: 100%" :empty-text=text>
						<el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
						<el-table-column prop="repairDocumentsNumber" label="报修单号"></el-table-column>
						<el-table-column prop="buildingName" label="所在写字楼" width="90"></el-table-column>
						<el-table-column prop="repairType" label="报修类型"></el-table-column>
						<el-table-column prop="repairRealName" label="报修人"></el-table-column>
						<el-table-column prop="repairPhone" label="报修人电话" width="90"></el-table-column>
						<el-table-column prop="repairShopName" label="报修人公司" width="90"></el-table-column>
						<el-table-column prop="roomName" label="报修人房间" width="90"></el-table-column>
						<el-table-column prop="repairTime" label="报修时间"></el-table-column>
						<el-table-column prop="finishTime" label="完成时间"></el-table-column>
						<el-table-column fixed="right" label="操作" width="240" style="text-align: right">
							<template slot-scope="scope" >
								<el-button type="success" size="small" v-if="scope.row.statusName=='未接单'" @click="dispatchClick(scope.row)">派单</el-button>
								<el-button type="info" size="small" v-if="scope.row.statusName=='未接单'||scope.row.statusName=='未确认'" @click="closeClick(scope.row)">关闭</el-button>
								<el-button type="primary" size="small" @click="detailsClick(scope.row)">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="clear20"></div>
					<div class="clearfix">
						<div class="fl">
							<el-pagination @current-change="handleCurrentChange" background :current-page.sync="servicesConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="servicesConfigureParams.pageTotal">
							</el-pagination>
						</div>
						<div class="fl pagestyle">
							<span>共{{this.servicesConfigureParams.pageTotal}}页，当前第{{this.servicesConfigureInfo.pageIndex}}页,每页30条，共{{this.servicesConfigureParams.totalRecord}}条</span>
						</div>
						<div class="fr">
							<el-button type="primary" size="small" @click="declarationReport">报单登记</el-button>
						</div>
					</div>
				</div>
				<!--派单-->
				<div class="dispatch" style="padding-bottom: 10px">
					<el-dialog title="派单" :visible.sync="dispatch.dispatchDialog" width="640px">
						<div class="form-item clearfix">
							<div class="items clearfix">
								<div class="item-text fl one">接单回复：</div>
								<div class="item-ipt fl">
									<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dispatch.replyMessage" style="width: 515px;">
									</el-input>
								</div>
							</div>
							<div class="items clearfix">
								<div class="item-text fl" style="width: 42px;">部门：</div>
								<div class="item-ipt fl">
									<el-select v-model="dispatch.departmentId" placeholder="请选择部门">
										<el-option v-for="item in dispatch.dapartmentList" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
										</el-option>
									</el-select>
								</div>
								<div class="item-text fl" style="width: 42px;">姓名：</div>
								<div class="item-ipt fl">
									<el-input v-model.trim="getEmployeeParams.userName" placeholder="请输入姓名"></el-input>
								</div>
								<div class="item-text fl" style="width: 42px;margin-left: 12px">
									<el-button type="primary" @click="getEmployeeList">搜索</el-button>
								</div>
							</div>
							<el-table :data="dispatch.employeeList" style="width: 100%" @selection-change="handleSelectionChangeEmployee">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column type="index" width="50" label="编号" :index="indexMethod1"></el-table-column>
								<el-table-column prop="departmentName" label="部门"></el-table-column>
								<el-table-column prop="name" label="员工姓名"></el-table-column>
								<el-table-column prop="telphone" label="手机号码"></el-table-column>
							</el-table>
							<div class="clear20"></div>
							<div class="clearfix">
								<div class="fl">
									<el-pagination @current-change="handleCurrentChange1" background :current-page.sync="getEmployeeParams.pageIndex" layout="prev, pager, next" :page-count="getEmployeeParams.pageTotal">
									</el-pagination>
								</div>
								<div class="fl pagestyle" style="line-height: 30px">
									<span>共{{this.getEmployeeParams.pageTotal}}页，当前第{{this.getEmployeeParams.pageIndex}}页,每页30条，共{{this.getEmployeeParams.totalRecord}}条</span>
								</div>
								<div slot="footer" class="dialog-footer fr" style="padding-top: 40px">
									<el-button @click="dispatch.dispatchDialog = false">取 消</el-button>
									<el-button type="primary" @click="dispatchSure">保 存</el-button>
								</div>
							</div>
						</div>
					</el-dialog>
				</div>
			</div>
			<div class="closeReport" style="padding-bottom: 10px">
				<el-dialog title="关闭报修单" :visible.sync="closeReport.closeReportDialog" width="640px">
					<div class="form-item clearfix">
						<div class="items clearfix">
							<div class="item-text fl two">关闭原因：</div>
							<div class="item-ipt fl">
								<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="closeReport.closeMessage" style="width: 515px;">
								</el-input>
							</div>
						</div>
						<div slot="footer" class="dialog-footer fr" style="padding-top: 40px">
							<el-button @click="closeReport.closeReportDialog = false">取 消</el-button>
							<el-button type="primary" @click="closeSure">保 存</el-button>
						</div>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
	import gUrl from '@/assets/js/gUrl'

	export default {
		name: "noReceiveRepairList",
		data() {
			return {
				text:'正在加载，请稍候',
				companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				repairStartTime: '',
				repairEndTime: '', //报修结束时间
				customerUserPhone: '', //报修人电话
				repairState: [], //维修状态
				statusId: '', //选择的维修状态
				getRepairDocuments: [],
				servicesConfigureParams: {
					pageIndex: 1, //当前页
					pageSize: 30, //每页条数
					pageTotal: 0, //总页数
					totalRecord: 0, //总条数
				},
				servicesConfigureInfo: {
					pageTotal: 0,
					pageIndex: 1 //当前页
				},
				dispatch: {
					customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '', //操作人用户编号
					employeeIds: [], //选择员工的员工id 数组
					repairDocumentsId: "", //报修单编号
					dapartmentList: [], //部门列表
					dispatchDialog: false, //派单
					replyMessage: '', //回复内容
					departmentId: '',
					name: '',
					repairListPerson: '',
					employeeList: [], //维修人员列表
				},
				closeReport: {
					closeReportDialog: false,
					closeMessage: '',
					customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '', //操作人用户编号
					repairDocumentsId: '', //报修单编号
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
				//报单登记
				reportMessage: {
					reportDialog: true, //报单登记
					repairTypeId: '',
					building: '',
				},

			}
		},
		created() {
			this.getRepairDocumentsList()
			this.getRepairDocumentsStatus() //获取维修状态
			this.queryDepartment() //获取部门列表
			this.getEmployeeList() //获取员工列表
		},
		computed: {},
		methods: {
			indexMethod(index) { //编号
				return(this.servicesConfigureInfo.pageIndex - 1) * 30 + 1 + index;
			},
			indexMethod1(index) { //弹层编号
				return(this.getEmployeeParams.pageIndex - 1) * 30 + 1 + index;
			},
			handleCurrentChange(index) { //分页方法
				//this.servicesConfigureParams.pageIndex = index;
				this.servicesConfigureInfo.pageIndex = index;
				this.getRepairDocumentsList();
			},
			handleCurrentChange1(index) { //员工分页
				this.getEmployeeParams.pageIndex = index;
				this.getEmployeePageParams.pageIndex = index;
				this.getEmployeeList();
			},
			getRepairDocumentsStatus() { //获取维修状态
				this.$httpPasser.get("repairDocuments/getRepairDocumentsStatus", {}).then((res) => {
					let data = res.data;
					if(data.resultCode == '200') {
						this.repairState = data.result
					} else {
						this.repairState = []
					}
				})
			},
			queryDepartment() { //获取部门
				this.$httpPasser.post("company/queryDepartmentByCompanyId", {
					companyId: this.companyId,
					pageIndex: 1,
					pageSize: 30,
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.dispatch.dapartmentList = res.data.result.departmentList
					}
				})
			},
			getEmployeeList() { //获取员工（维修人员）
				this.$httpPasser.post("employee/getPropertyEmployeeByCondition", {
					productId: this.productId,
					companyId: this.companyId, //公司
					pageIndex: this.servicesConfigureInfo.pageIndex, //页码
					pageSize: this.getEmployeeParams.pageSize,
					userName: this.getEmployeeParams.userName, //查询姓名
					departmentId: this.dispatch.departmentId, //查询部门
					status: this.getEmployeeParams.queryState, //查询状态
				}).then((res) => {
					let data = res.data;
					if(data.resultCode == '200') {
						this.dispatch.employeeList = data.result.employeeList;
						this.getEmployeeParams.totalRecord = res.data.totalRecord
						this.getEmployeeParams.pageIndex = res.data.pageIndex
						this.getEmployeeParams.pageTotal = res.data.pageTotal
					}
				})
			},
			searchBtn() { //搜索
				this.getRepairDocumentsList()
			},
			getRepairDocumentsList() { //获取维修列表
				this.$httpPasser.get("repairDocuments/getRepairDocumentsList", {
					params: {
						shopId: this.companyId,
						customerUserPhone: this.customerUserPhone,
						pageIndex: this.servicesConfigureInfo.pageIndex,
						pageSize: this.servicesConfigureParams.pageSize,
						repairEndTime: this.repairEndTime,
						repairStartTime: this.repairStartTime,
						statusId: 1,
            roomId:this.roomId
					}
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message.success("查询成功")
						this.getRepairDocuments = res.data.result
						this.servicesConfigureParams.totalRecord = res.data.totalRecord
						this.servicesConfigureParams.pageIndex = res.data.pageIndex
						this.servicesConfigureParams.pageTotal = res.data.pageTotal
					} else if(res.data.resultCode == '204') {
						this.$message.success(res.data.resultCodeDesc)
						this.getRepairDocuments = []
						this.text = "暂无数据"
					} else {
						this.text ="暂无数据"
						this.$message.error(res.data.resultCodeDesc)
					}
				})
			},
			//报单登记
			declarationReport() {

			},
			dispatchClick(row) { //派单
				this.dispatch.dispatchDialog = true;
				this.dispatch.repairDocumentsId = row.repairDocumentsId
			},
			dispatchSure() { //确定派单
				this.$httpPasser.post('repairDocuments/dispatch', {
					customerUserId: this.dispatch.customerUserId,
					employeeIds: this.dispatch.employeeIds,
					repairDocumentsId: this.dispatch.repairDocumentsId,
					replyMessage: this.dispatch.replyMessage
				}).then((res) => {
					if(this.dispatch.replyMessage == '') {
						this.$message.error("请输入回复内容")
					} else if(this.dispatch.employeeIds == '') {
						this.$message.error("请选择维修人员")
					} else {
						if(res.data.resultCode == '200') {
							this.$message.success(res.data.result)
						} else {
							this.$message.error(res.data.resultCodeDesc)
						}
						this.dispatch.dispatchDialog = false;
					}
				})
			},
			handleSelectionChangeEmployee(selection) { //选择员工
				this.dispatch.employeeIds = [];
				for(let o in selection) {
					this.dispatch.employeeIds[o] = selection[o].employeeId
				}
			},
			closeClick(row) {
				this.closeReport.closeReportDialog = true;
				this.closeReport.repairDocumentsId = row.repairDocumentsId
			},
			closeSure() { //确定关闭
				this.$httpPasser.post("repairDocuments/close", {
					closeMessage: this.closeReport.closeMessage,
					customerUserId: this.closeReport.customerUserId,
					repairDocumentsId: this.closeReport.repairDocumentsId
				}).then((res) => {
					let data = res.data
					if(this.closeReport.closeMessage == '') {
						this.$message.error("请输入关闭原因")
					} else {
						if(data.resultCode == '200') {
							this.$message.success(data.result)
						} else {
							this.$message.error(data.resultCodeDesc)
						}
						this.closeReport.closeReportDialog = false;
					}
				})
			},
			detailsClick(row) {
        this.$router.push({
          path:'./repairListDetails',
          query:{
            repairDocumentsId:row.repairDocumentsId,
          }
        })
			}
		}
	}
</script>

<style scoped lang="less">
	#noReceiveRepairList {
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
		.dispatch {
			.items {
				margin-bottom: 10px;
				.item-text {
					line-height: 40px;
					width: 140px;
					font-size: 14px;
				}
			}
			.font14 {
				font-size: 14px;
				margin-bottom: 20px;
				color: red;
			}
		}
		.one {
			width: 70px !important;
		}
		.two {
			line-height: 50px;
		}
		.reportInfo {
			padding-left: 40px;
			.clearfix{
				clear: both;
			}
			.items {
				margin-bottom: 10px;
				.item-text {
					line-height: 40px;
					width: 120px;
					font-size: 14px;
					text-align: right;
				}
			}
		}
	}
</style>
<style lang="less">
	#noReceiveRepairList {
		.reportInfo{
			.el-dialog__body{
				padding-left: 40px;
			}
		}
	}
</style>

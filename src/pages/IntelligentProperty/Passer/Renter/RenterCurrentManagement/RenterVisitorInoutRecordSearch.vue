<template>
	<div class="RenterVisitorRecordSearch">
		<div class="rscont lktxjlcxcontainer">
			<div class="main-cont">
				<div class="pt50">
					<div class="top-title">
						<div class="line"></div>
						<span class="top-text">来客通行记录查询</span>
					</div>
					<div>
						<div class="fl_section">
							<span style="line-height: 30px;font-size: 14px;">部门：</span>
							<el-select v-model="departmentId" clearable placeholder="全部">
								<el-option v-for="item in DepartmentList" :key="item.customerDepartmentId" :label="item.name" :value="item.customerDepartmentId">
								</el-option>
							</el-select>
						</div>
						<div class="fl_section">
							<span style="line-height: 30px;font-size: 14px;">员工姓名：</span>
							<input v-model="employname" placeholder="请输入员工姓名" class="employname">
						</div>
						<div class="fl_section" @click="getVistorRecordList(1)">
							<el-button type="primary">查询</el-button>
						</div>
					</div>
					<div class="main-box">
						<el-table ref="singleTable" :data="vistorRecordList" highlight-current-row style="width:100%;margin-top: 25px;" :empty-text=text>
							<el-table-column type="index" label="编号" width="50" :index="indexMethod">
							</el-table-column>
							<el-table-column property="vistorCompanyName" label="客户公司名称">
							</el-table-column>
							<el-table-column property="vistorDepartmentName" label="客户部门">
							</el-table-column>
							<el-table-column property="vistorName" label="客户姓名">
							</el-table-column>
							<el-table-column property="vistorTelphone" label="客户手机号">
							</el-table-column>
							<el-table-column property="departmentName" label="员工部门">
							</el-table-column>
							<el-table-column property="name" label="员工姓名">
							</el-table-column>
							<el-table-column property="requesttime" label="时间">
							</el-table-column>
							<el-table-column property="buildingName" label="写字楼">
							</el-table-column>
							<el-table-column property="inout1" label="进出">
							</el-table-column>
							<el-table-column property="doorName" label="大门">
							</el-table-column>
							<el-table-column property="passagewayName" label="通道">
							</el-table-column>
						</el-table>
					</div>
					<div class="clearfix">
						<div class="pagination fl">
							<el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange" :page-size="pages"></el-pagination>
						</div>
						<div class="fl pagestyle"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span></div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Footer from '@/components/public/footer'
	export default {
		components: {
			logFooter: Footer
		},
		data() {
			return {
				text:'正在加载，请稍候',
			  	pages:30,
				getRenterParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				pagetotal: 0, //列表总条数
				pageNow: 1, //当前页码
				pageTotal: 0, //总页数
				DepartmentList: [], //部门列表
				employname: '', //用户名（员工姓名）
				departmentId: '', //部门id
				vistorRecordList: [] //来客记录列表
			}
		},
		created() {
			this.getDepartmentList() //获取部门列表
			this.getVistorRecordList(1); //获取来客进出记录列表
		},
		methods: {
			indexMethod(index) { //编号
				return(this.pageNow - 1) * 30 + 1 + index;
			},
			getDepartmentList() { //获取部门列表
				this.$httpPasser.post('company/getDepartmentByCompanyId', {
					businessExtendShopId: this.getRenterParams.companyId
				}).then((res) => {
					console.log(res.data)
					if(res.data.resultCode == '200') {
						this.DepartmentList = res.data.result.departmentList
					} else if(res.data.resultCode == '406') {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getVistorRecordList(pageIndex) { //来客出入记录列表
				this.$httpPasser.post('buildingPasserQueryController/vistorQuery', {
					shopId: this.getRenterParams.companyId,
					departmentId: this.departmentId,
					name: this.employname,
					pageSize: '30',
					pageIndex: pageIndex
				}).then((res) => {
					console.log(res.data)
					if(res.data.resultCode == '200') {
						this.vistorRecordList = res.data.result
						this.pagetotal = res.data.totalRecord;
						this.pageTotal = res.data.pageTotal;
						this.$message({
							showClose: true,
							message: "查询成功",
							type: 'success'
						});
					} else if(res.data.resultCode == '204') {
						this.text = "暂无数据"
						this.vistorRecordList = []
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						});
					} else {
						this.text = "暂无数据"
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			pagesChange(currentPage) { //分页
				this.pageNow = currentPage
				this.getVistorRecordList(currentPage)
			}
		},
		computed: {
			num() {
				return parseInt(this.pagetotal)
			}
		},
	}
</script>
<style lang="less" scoped>
	.RenterVisitorRecordSearch {
		padding: 10px 0 10px 0;
		width: 1060px;
		min-height: 86%;
		.rscont {
			.pt50 {
				padding-top: 10px;
				/*width: 1400px;*/
			}
			.top-title {
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
			}
			.main-box {
				padding-bottom: 80px;
				padding-top: 50px;
				.btn-style {
					padding-bottom: 120px;
				}
			}
			.employname {
				border: 1px solid #dcdfe6;
				padding: 0 15px;
				height: 40px;
				line-height: 40px;
				border-radius: 5px;
			}
			.fl_section {
				float: left;
				margin-left: 20px;
			}
		}
		.pagination {
			padding-bottom: 20px;
		}
		.pagestyle {
			line-height: 30px;
		}
	}
</style>

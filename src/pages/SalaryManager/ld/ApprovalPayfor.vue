<template>
	<div class="ygpayroll ygpayrollcontainer">
		<div class="banner">
			<div class="bantext">
				<p>薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</p>
			</div>
		</div>
		<div class="ygpay-wrap">
			<div class="main common">
				<div class="main-cont">
					<div class="top-title">
						<div class="line"></div>
						<span class="top-text">待审批工资表</span>
					</div>
					<div class="main-box">
						<el-table ref="singleTable" :data="salaryList" style="width: 100%">
							<el-table-column type="index" label="编号" width="50">
							</el-table-column>
							<el-table-column property="date" label="日期">
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="toApprovalxq(scope.row)">详情</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				getBuildingGroupParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				dataList: [],
				labelList: [],
				form: {
					type: [],
					resource: '',
					desc: ''
				},
				monthsalaryId: '',
				total: '',
				salaryList: [],
			}
		},
		created() {
			this.$http.post('salary/getNotAuditSalaryMonthsalaryList', {
				companyId: this.getBuildingGroupParams.companyId
			}).then((res) => {
				console.log(res.data)
				this.salaryList = res.data.result
				this.monthsalaryId=res.data.result.monthsalaryId
			})
		},
		methods: {
			toApprovalxq(row) {
				this.$router.push({
					name: 'ApprovalPayfor_xq',
					query: {
						monthsalaryId:row.monthsalaryId
					}
				})
				this.$http.post('salary/getNotAuditPayroll', {
					companyId: this.getBuildingGroupParams.companyId,
					monthsalaryId: row.monthsalaryId
				}).then((res) => {

					//this.monthsalaryId = res.data.result.monthsalaryId
					this.labelList = res.data.result.labelList;
					this.dataList = res.data.result.dataList;
					this.total = res.data.result.monthsalaryRealpayment;
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.ygpayroll {
		.banner {
			height: 250px;
			background: url("../../../assets/img/SalaryManager/ld_apprvalpayfor.jpg") center center no-repeat;
			-webkit-background-size: cover;
			background-size: cover;
			.bantext {
				text-align: center;
				color: #fff;
				padding-top: 130px;
				p {
					font-size: 60px;
				}
			}
		}
		.ygpay-wrap {
			.main {
				background-color: #fff;
				border-top-left-radius: 20px;
				border-top-right-radius: 20px;
				position: relative;
				top: 0px;
			}
			.main-cont {
				padding: 40px 20px 20px 20px;
				min-height: 300px;
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
					font-size: 18px;
					background-color: #fff;
					padding: 0 4px;
					line-height: 30px;
				}
			}
			.main-middle {
				margin-bottom: 25px;
				.left-cont {
					padding-top: 24px;
					.money-text {
						font-size: 14px;
					}
					.money-num {
						font-size: 48px;
						color: #3681fd;
					}
				}
				.right-cont {
					.link-item {
						display: inline-block;
						width: 120px;
						height: 120px;
						margin-left: 30px;
					}
				}
			}
			.table_title {
				text-align: center;
				p {
					font-size: 18px;
					line-height: 20px;
				}
			}
			.tables {
				padding-bottom: 30px;
			}
		}
	}
</style>
<style>
  .ygpayrollcontainer{
    .el-textarea__inner {
      width: 360px;
      height: 85px;
    }
  }

</style>

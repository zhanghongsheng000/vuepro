<template>
	<div class="rscont cwdgzb cwffgzListcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">发放工资列表</span>
				</div>
				<div class="main-box">
					<el-table ref="singleTable" :data="salaryList" style="width: 100%">
						<el-table-column type="index" label="编号">
						</el-table-column>
						<el-table-column property="date" label="日期">
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="tocwffgz(scope.row)">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
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
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				salaryList: [],
			}
		},
		created() {
			this.$http.post('salary/getShouldPayMonthsalaryList', { //获取列表
				companyId: this.getBuildingGroupParams.companyId,
			}).then((res) => {
				if(res.data.resultCode == "200") {
					this.salaryList = res.data.result
				} else {
					this.$message({
						showClose: true,
						message: '无数据',
						type: 'error'
					});
				}
			})
		},
		methods: {
			tocwffgz(row) { //跳转详情
				this.$router.push({
					name: 'cwffgz',
					query: {
						monthsalaryId: row.monthsalaryId
					}
				})
				this.$http.post('salary/getNotAuditPayroll', { //获取发放工资列表
					companyId: this.getBuildingGroupParams.companyId,
					monthsalaryId: row.monthsalaryId
				}).then((res) => {
					if(res.data.resultCode == '200') {
						//this.monthsalaryId = res.data.result.monthsalaryId
						this.labelList = res.data.result.labelList;
						this.dataList = res.data.result.dataList;
						this.total = res.data.result.monthsalaryRealpayment;
					} else {
						this.$message({
							showClose: true,
							message: data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			}
		},

	}
</script>
<style lang="less" scoped>
	.rscont {
		.banner {
			height: 250px;
			background: url("../../../assets/img/SalaryManager/cwbg.png") center center no-repeat;
			.ban-text {
				padding-top: 100px;
				text-align: center;
				color: #fff;
				font-size: 60px;
			}
		}
		.pt50 {
			padding-top: 50px;
			width: 1400px;
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
		.main-box {
			padding-bottom: 120px;
			padding-top: 50px;
			.btn-style {
				padding-bottom: 120px;
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
		.btn-style {
			padding-bottom: 120px;
		}
		.wages {
			text-align: center;
			p {
				display: inline-block;
			}
			.tip {
				margin-top: -10px;
			}
		}
	}
</style>
<style lang="less">
	.cwffgzListcontainer {
		.el-dialog__header {
			border-bottom: solid 1px #ccc;
		}
		.cwdgzb {
			.el-input {
				width: 69%;
			}
			.inputstyle {
				padding: 5px 10px;
				span {
					display: inline-block;
					width: 80px;
					text-align: right;
				}
			}
			.select {
				display: inline-block;
				width: 80px;
				text-align: right;
			}
			.el-radio {
				padding: 5px 10px;
			}
			.el-dropdown {
				border: 1px solid #dedede;
				padding: 6px 10px;
				border-radius: 5px;
			}
		}
		.el-table .cell,
		.el-table th div {
			padding-right: 0px;
		}
		.radio-bank {
			padding-left: 40px !important;
			padding-right: 10px;
			.el-radio.is-bordered {
				padding: 0;
			}
			.el-radio__input {
				position: absolute;
				top: 12px;
				left: -30px;
			}
			.el-radio__label {
				/*padding-left: 0;*/
			}
			span {
				display: inline-block;
			}
		}
		.section-bank1 {
			margin-left: 10px;
		}
	}
</style>
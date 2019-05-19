<template>
	<div class="ygpayroll alApprcontainer">
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
						<span class="top-text">已审批工资表</span>
					</div>
					<div class="main-box">
						<el-table ref="singleTable" :data="salaryList" style="width: 100%">
							<el-table-column type="index" label="编号" width="100">
							</el-table-column>
							<el-table-column property="date" label="日期">
							</el-table-column>
              <el-table-column property="status" label="状态" >
              </el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="toalApprovalxq(scope.row)">详情</el-button>
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
			this.$http.post('salary/getAuditedMonthsalaryList', {
				companyId: this.getBuildingGroupParams.companyId,
			}).then((res) => {
				this.salaryList = res.data.result
        for(let o in res.data.result){
			    if(res.data.result[o].status ==3){
            res.data.result[o].status = "待发放";
          }else if(res.data.result[o].status ==4){
            res.data.result[o].status = "已发放";
          }else if(res.data.result[o].status ==5){
            res.data.result[o].status = "审批不通过";
          }
        }
			})
		},
		methods: {
			toalApprovalxq(row) {
				this.$router.push({
					name: 'alApprovalPayfor_xq',
					query: {
						monthsalaryId:row.monthsalaryId
					}
				})
				this.$http.post('salary/getNotAuditPayroll', {
					companyId: this.getBuildingGroupParams.companyId,
					monthsalaryId: row.monthsalaryId
				}).then((res) => {
					console.log(res.data)
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
  .alApprcontainer{
    .el-textarea__inner {
      width: 360px;
      height: 85px;
    }
  }
</style>

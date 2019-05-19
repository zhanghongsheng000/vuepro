<template>
	<div class="ygpayroll ygpayrollcontainer_xq">
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
					<div class="main-middle clearfix">
						<div class="left-cont fl">
							<p class="money-text">实际工资总额(元)</p>
							<p class="money-num">{{total}}</p>
						</div>
					</div>
					<div class="table_title">
						<p>{{date}}</p>
					</div>
					<div class="main-box">
						<el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%">
							<el-table-column v-for="(label, index) in labelList" :key="index" :prop="label.key" :label="label.value">
							</el-table-column>
						</el-table>
					</div>
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="审批结果">
							<el-radio-group v-model="form.resource">
								<el-radio label="Y">通过</el-radio>
								<el-radio label="N">退回</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="审批意见">
							<el-input type="textarea" v-model.trim="form.desc" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">确定</el-button>
						</el-form-item>
					</el-form>
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
				date:'',
				total: '',
				salaryList: [],
			}
		},
		created() {
			this.$http.post('salary/getNotAuditPayroll', {
				companyId: this.getBuildingGroupParams.companyId,
				monthsalaryId: this.$route.query.monthsalaryId
			}).then((res) => {
				console.log(res.data)
				this.monthsalaryId = res.data.result.monthsalaryId;
				this.labelList = res.data.result.labelList;
				this.dataList = res.data.result.dataList;
				this.total = res.data.result.monthsalaryRealpayment;
				this.date = res.data.result.date;
			})
		},
		methods: {
			onSubmit() {//提交审批
				this.$http.post('salary/auditPayroll', {
					monthsalaryId: this.monthsalaryId,
					monthsalaryAuditresult: this.form.resource,
					monthsalaryAuditinfo: this.form.desc
				}).then((res) => {
					console.log(res.data)
					if(res.data.resultCode == '200') {
						this.$message.success('操作成功');
            this.$router.push({
              name: 'ApprovalPayfor',
            })
					}else{
					  this.$message.error(res.data.resultCodeDesc)
          }
				})
			},

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
  .ygpayrollcontainer_xq{
    .el-textarea__inner {
      width: 360px;
      height: 85px;
    }
  }
</style>

<template>
	<div class="Renter_container">
		<Renthead></Renthead>
		<div class="Payment_head">
			<div class="content_box">
				<div class="Payment_content">
					<img src="../../../../assets/img/IntelligentProperty/rent_title1.png" />
					<p>省时、省力、简单、快捷 </p>
					<p>动动手指足不出户，没有现金也能缴纳物业费、水费、电费</p>
				</div>
			</div>
		</div>
		<div class="common">
			<div class="optionCon clearfix">
				<div class="usermessage fl">
					<p class="company">物业公司：石家庄昌盛物业管理有限公司</p>
					<p class="balance">账户余额：<span>10000.00</span>元</p>
				</div>
				<div class="option fr">
					<div class="setpsw fl">
						<a href="javascript:;">设置密码</a>
					</div>
					<div class="bandcard fl">
						<a href="javascript:;">绑卡</a>
					</div>
					<div class="withdrawcash fl">
						<a href="javascript:;">提现</a>
					</div>
					<div class="rechage fl">
						<a href="javascript:;">充值</a>
					</div>
				</div>
			</div>
			<div class="tables">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="dates" label="日期">
					</el-table-column>
					<el-table-column prop="reason" label="事由">
					</el-table-column>
					<el-table-column prop="buildingname" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="roomnum" label="房间号">
					</el-table-column>
					<el-table-column prop="money" label="金额">
					</el-table-column>
					<el-table-column prop="letter" label="余额">
					</el-table-column>
				</el-table>
			</div>

		</div>
		
	</div>
</template>

<script>
	import Renthead from '@/components/IntelligentProperty/Renter/header'
	import footer from '@/components/public/footer'
	export default {
		name: "index",
		components: {
			Renthead,
			'v-footer': footer
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				isActive: true,
				tableData: [],
			}
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			enterprisemessage() {
				this.isActive = true
			},
			changepassword() {
				this.isActive = false
			},
		}
	}
</script>

<style lang="less" scoped>
	.Renter_container {
		.Payment_head {
			background: url(../../../../assets/img/IntelligentProperty/AccountManage_bg.png) left top no-repeat;
			background-size: cover;
			min-width: 1200px;
			.content_box {
				padding: 150px 0 220px 0;
				.Payment_content {
					width: 1200px;
					margin: 0 auto;
					img {
						width: 451px;
						height: 37px;
						margin: 62px 0 30px 580px;
					}
					p {
						font-size: 10.5px;
						line-height: 18px;
						margin-left: 580px;
					}
				}
			}
		}
		.optionCon {
			padding-top: 15px;
			.usermessage {
				.company {
					font-size: 14px;
					line-height: 20px;
				}
				.balance {
					font-size: 12px;
					padding-top: 25px;
					span {
						font-size: 36px;
						color: #f18f69;
					}
				}
			}
			.option {
				padding-top: 5px;
				.setpsw {
					width: 119px;
					height: 119px;
					background: url(../../../../assets/img/IntelligentProperty/setpsw.png);
					background-size: cover;
					text-align: center;
					margin-right: 30px;
					a {
						padding-top: 80px;
						font-size: 14px;
						line-height: 16px;
						color: #a51f1a;
						display: inline-block;
					}
				}
				.bandcard {
					width: 119px;
					height: 119px;
					background: url(../../../../assets/img/IntelligentProperty/bandcard.png);
					background-size: cover;
					text-align: center;
					margin-right: 30px;
					a {
						padding-top: 80px;
						font-size: 14px;
						line-height: 16px;
						color: #a51f1a;
						display: inline-block;
					}
				}
				.withdrawcash {
					width: 119px;
					height: 119px;
					background: url(../../../../assets/img/IntelligentProperty/withdrawcash.png);
					background-size: cover;
					text-align: center;
					margin-right: 30px;
					a {
						padding-top: 80px;
						font-size: 14px;
						line-height: 16px;
						color: #1c7664;
						display: inline-block;
					}
				}
				.rechage {
					width: 119px;
					height: 119px;
					background: url(../../../../assets/img/IntelligentProperty/recharge.png);
					background-size: cover;
					text-align: center;
					a {
						padding-top: 80px;
						font-size: 14px;
						line-height: 16px;
						color: #17408b;
						display: inline-block;
					}
				}
			}
		}
		.black {
			background: #3b3b3b;
		}
	}
</style>
<style>
	.el-upload--picture-card {
		width: 156px;
		height: 80px;
		line-height: 84px;
	}

	.tables {
		padding: 20px 0 100px 0;
	}
	.el-table--border th,
	.el-table__fixed-right-patch {
		text-align: center;
		background: #f0f0f0;
		color: #000000;
		font-size: 12px;
	}

	.el-table--enable-row-transition .el-table__body td {
		text-align: center;
		font-size: 10px;
	}
</style>

<template>
	<div class="rscont cwdgzb cwffgzcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">发放工资</span>
				</div>
				<div class="main-middle clearfix">
					<div class="left-cont fl">
						<p class="money-text">实发工资总额(元)</p>
						<p class="money-num">{{total}}</p>
					</div>
				</div>
				<div class="wages clearfix">
					<p>{{date}}</p>
					<div class="fr tip">
						<span>审批通过</span>
						<el-button type="primary" @click="dialogVisible = true">发工资</el-button>
					</div>
				</div>
				<div class="main-box">
					<el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%">
						<el-table-column v-for="(label, index) in labelList" :key='index' :prop="label.key" :label="label.value">
						</el-table-column>
					</el-table>
				</div>
				<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
					<el-form ref="form" label-width="80px">
						<el-form-item label="支付方式">
							<el-radio-group v-model="paytype">
								<el-radio label="" @change='changetype'>余额支付</el-radio>
							</el-radio-group>
							<div class="select-card clearfix">
								<p class="section-left section-bank1">银行卡支付：</p>
								<div class="fl">
									<div class="section-bank">
										<div class="bank-item clearfix" v-for="item,index in bankList">
											<div class="radio-bank fl">
												<el-radio v-model="paytype" :label="item.payUserBankcardId" border @change="changetype(item.payUserBankcardId)">
													<img :src="require('../../../assets/img/bank/'+item.bankNumber+'.png')" alt="">
												</el-radio>
											</div>
											<div class="fl">
												<span class="weihao">尾号 : {{latterFour(item.bankCode)}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<el-input type='password' placeholder='请输入六位交易密码' v-model.trim='password' clearable></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="ensurepay"  :disabled="btn_disabled">确 定</el-button>
				  </span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
	import md5 from 'js-md5';

	export default {
		data() {
			return {
				getBuildingGroupParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				name: '',
				identity: '', //身份标识
				btn_disabled: false, //禁用反复点击确定
				dialogVisible: false,
				idnum: '',
				value: '',
				radio: '1',
				companyId: '1',
				date: '',
				fileList: [],
				bankList: [], //银行卡列表
				payUserBankcardId: '', //银行卡编号
				total: '', //总工资
				payCustomerUserId: '', //法人ID
				monthsalary_Id: '',
				multipleSelection: [],
				labelList: [],
				dataList: [],
				paytype: '', //支付方式
				password: '',
				label: '',
				currentRow: {
					nums: '',
					depart: ' ',
					jobnum: '',
					date: '',
					name: '',
					position: '',
					jobwages: '',
					mansgewages: '',
					subsidy: '',
					jobagewages: '',
					studysubsidy: '',
					shouldwages: ''
				}
			}
		},
		created() {
			this.getSalaryPayrollitem();
			this.getLegalPersonUserId(); //获得法人ID
			//this.getBank(); //获取银行卡
			//this.getmessage();
		},
		methods: {
			getInfo() {
				let times = new Date().getTime();
				let userName = this.$local.sefetch('info').userName;
				let userTel = this.$local.sefetch('info').telPhone;
				let identity = this.identity;
				this.$http2.post('asset/getInfo', { //获取账务信息里面的余额
					identity: identity,
					createtime: times,
					sign: md5(userName + userTel + times + identity + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
				}).then(res => {
					let data = res.data
					console.log(data)
					if(data.resultCode == '200') {
						this.yue = data.result.amount
					} else {
						this.$message({
							showClose: true,
							message: data.resultCodeDesc,
							type: 'error'
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleClick(row) {
				console.log(row);
			},
			handleEditClick(row) {
				for(let o in row) {
					this.currentRow[o] = row[o]
				}
				this.dialogVisible = true;
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			getSalaryPayrollitem() { //获取列表
				this.$http.post(
					'salary/getAuditedPayroll', {
						companyId: this.getBuildingGroupParams.companyId,
						monthsalaryId: this.$route.query.monthsalaryId
					}
				).then((res) => {
					if(res.data.resultCode == '200') {
						this.total = res.data.result.monthsalaryRealpayment
						this.labelList = res.data.result.labelList;
						this.dataList = res.data.result.dataList;
						this.monthsalary_Id = res.data.result.monthsalaryId;
						this.date = res.data.result.date;
					} else {
						this.$message({
							showClose: true,
							message: '无数据',
							type: 'error'
						});
					}
				})
			},
			getBank() { //绑定银行卡 获取列表
				let times = new Date().getTime()
				let userName = this.$local.sefetch('info').userName
				let userTel = this.$local.sefetch('info').telPhone
				//let identity = this.$local.sefetch('identity')
				let identity = this.identity;
				this.$http2.post('userBankCard/getUserBankCard', { //获取银行卡列表
						identity: identity,
						createtime: times,
						sign: md5(userName + userTel + times + identity + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
					})
					.then(res => {
						if(res.data.resultCode == '200') {
							let data = res.data
							this.payUserBankcardId = res.data.result.payUserBankcardId;
							if(data.resultCode == '200') {
								this.bankList = data.result
								if(this.bankList.length == '0') { //如果没有银行卡 到绑卡页面
									this.$router.push({
										name: 'CwBindCardOne'
									})
								}
							} else {
								this.$message({
									showClose: true,
									message: data.resultCodeDesc,
									type: 'error'
								});
							}
						} else {
							this.$message.error('法人未绑定银行卡');
						}

					})
			},
			latterFour(item) { //截取银行卡后四位
				if(item) {
					return item.slice(-4)
				}
			},
			getLegalPersonUserId() { //获取法人信息及银行卡
				this.$http.post('salary/getLegalPersonUserId', {
					companyId: this.getBuildingGroupParams.companyId,
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.payCustomerUserId = res.data.result;
						this.getIdentity(res.data.result);
					} else {
						this.$message({
							showClose: true,
							message: '未获取到法人信息',
							type: 'error'
						});
					}
				})
			},
			getIdentity(payCustomerUserId) { //唯一标识
				this.$http2.post('asset/getIdentity', {
					userId: payCustomerUserId,
				}).then((res) => {
					if(res.data.result == null && res.data.result == "") {
						this.$message.error('法人不存在');
					} else {
						this.identity = res.data.result;
						this.getBank();
						this.getInfo();
						this.getmessage();
					}
				})
			},
			ensurepay() { //确认发放工资
				if(this.password == '') {
					this.$message.error('请输入交易密码')
				} else {
					this.btn_disabled = true;
					this.$http.post('salary/paySalary', {
						monthsalaryId: this.monthsalary_Id,
						companyId: this.getBuildingGroupParams.companyId,
						payCustomerUserId: this.payCustomerUserId,
						loginUserId: this.getBuildingGroupParams.userId,
						identity: this.identity,
						password: this.password,
						cardId: this.payUserBankcardId
					}).then((res) => {
						if(res.data.resultCode == '200') {
							let successUserIds = [];
							let falseUserIds = [];
							this.btn_disabled = false;
							console.log(res.data.result.result);
							res.data.result.result.json.forEach(function(item, index) {
								if(item.result == "success") {
									successUserIds.push(item.userId);
								} else {
									falseUserIds.push(item.userId);
								}
							})
							console.log(successUserIds);
							console.log(falseUserIds);
							this.addPayrollhistory(successUserIds, falseUserIds); //添加历史库
							this.$message.success('发放成功');
							this.dialogVisible = false
						} else {
							this.$message.error(res.data.resultCodeDesc);
							this.btn_disabled = false;
						}
					})
				}
			},
			addPayrollhistory(successUserIds, falseUserIds) { //添加历史库
				this.$http.post('salary/addPayrollhistory', {
					companyId: this.getBuildingGroupParams.companyId,
					successUserIds: successUserIds,
					falseUserIds: falseUserIds,
					loginUserId: this.getBuildingGroupParams.userId,
					monthsalaryId: this.monthsalary_Id,
				}).then((res) => {
					if(res.data.resultCode != 200) {
						this.$message.error(res.data.resultCodeDesc);
					}
				})
			},
			getmessage() {
				let ids = this.$local.sefetch('info').userId
				let times = new Date().getTime()
				let userName = this.$local.sefetch('info').userName
				let userTel = this.$local.sefetch('info').telPhone
				this.$http2.post('asset/register', { //开通支付账号接口
						userId: ids,
						telphone: userTel
					})
					.then(res => {
						if(res.data.resultCode == '200') {
							this.$http2.post('asset/getInfo', { //获取账务信息
									identity: this.identity,
									createtime: times,
									sign: md5(userName + userTel + times + res + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
								})
								.then(respon => {
									let data = respon.data
									console.log(data)
									if(data.resultCode == '200') {
										if(data.result.pwdInit && data.result.isIdCardAuth && data.result.isBankCardAuth) {
											console.log('通过')
										}
									} else if(data.resultCode == '204') {
										this.$message({
											showClose: true,
											message: data.resultCodeDesc,
											type: 'success'
										});
									} else {
										this.$message({
											showClose: true,
											message: data.resultCodeDesc,
											type: 'error'
										});
									}
								})
								.catch(err => {
									console.log(err)
								})
							// return res.data.result
						} else if(data.resultCode == '204') {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'success'
							});
						} else {
							this.$message({
								showClose: true,
								message: res.data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			changetype(cardId) {
				console.log("银行卡", cardId);
				this.payUserBankcardId = cardId;
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
	.cwffgzcontainer {
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
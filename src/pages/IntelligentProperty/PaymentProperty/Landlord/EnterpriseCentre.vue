<template>
	<div class="Renter_container">
		<Renthead></Renthead>
		<div class="Payment_head">
			<div class="content_box">
				<div class="Payment_content">
					<img src="../../../assets/img/IntelligentProperty/rent_title.png" />
					<p>省时、省力、简单、快捷 </p>
					<p>动动手指足不出户，没有现金也能缴纳物业费、水费、电费</p>
				</div>
			</div>
		</div>
		<div class="common">
			<div class="EnterCenter">
				<div class="EnterCenter_cont">
					<div class="title">
						<h5>企业中心</h5>
					</div>
					<div class="con-top clearfix">
						<a href="javascript:;" class="cho-item" :class="{active:isActive}" @click="enterprisemessage">企业信息</a>
						<a href="javascript:;" class="cho-item" :class="{active:!isActive}" @click="changepassword">修改密码</a>
					</div>
					<div class="rent-cont clearfix">
						<div class="rent-l fl">
							<div class="forms">
								<div class="forms-cont" v-show="isActive">
									<div class="for-item">
										<span class="for-type">公司名称</span>
										<input class="inputs" type="text" placeholder="请输入公司名称">

									</div>
									<div class="for-item">
										<span class="for-type">公司地址</span>
										<input type="text" placeholder="请输入公司地址">

									</div>
									<div class="for-item">
										<span class="for-type">社会统一信用代码</span>
										<input type="text" placeholder="请输入社会统一信用代码">

									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">营业执照照片</span>
										<div class="gsinfo fl">
											<!--<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="form.dialogVisible">
												<img width="100%" :src="imageUrls" alt="">
											</el-dialog>-->
											<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item">
										<span class="for-type">法人姓名</span>
										<input type="text" placeholder="请输入法人姓名">
									</div>
									<div class="for-item">
										<span class="for-type">法人身份证号</span>
										<input type="text" placeholder="请输入法人身份证号">
									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">法人身份证正面</span>
										<div class="gsinfo fl">
											<!--<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="form.dialogVisible">
												<img width="100%" :src="imageUrls" alt="">
											</el-dialog>-->
											<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">法人身份证反面</span>
										<div class="gsinfo fl">
											<!--<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="form.dialogVisible">
												<img width="100%" :src="imageUrls" alt="">
											</el-dialog>-->
											<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item">
										<span class="for-type">开户银行</span>
										<input type="text" placeholder="请输入开户银行">
									</div>
									<div class="for-item">
										<span class="for-type">银行卡号</span>
										<input type="text" placeholder="请输入银行卡号">
									</div>
									<div class="for-item">
										<span class="for-type">联系电话</span>
										<input type="text" placeholder="请输入联系电话">
									</div>
								</div>

								<div class="forms-cont" v-show="!isActive">
									<div class="for-item">
										<span class="for-type">输入密码</span>
										<input class="inputs" type="password" placeholder="请输入密码">
									</div>
									<div class="for-item">
										<span class="for-type">确认密码</span>
										<input type="password" placeholder="请再次输入密码">
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="months">
						<a href="javascript:;">保存</a>
					</div>

				</div>
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
				isActive: true
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
			background: url(../../../../assets/img/IntelligentProperty/EnterpriceCenter_bg.png) left top no-repeat;
			background-size: cover;
			min-width: 1200px;
			.content_box {
				padding: 270px 0 100px 0;
				.Payment_content {
					width: 1200px;
					margin: 0 auto;
					img {
						width: 451px;
						height: 37px;
						margin: 62px 0 40px 69px;
					}
					p {
						font-size: 10.5px;
						line-height: 18px;
						margin-left: 69px;
						color: #FFFFFF;
					}
				}
			}
		}
		.EnterCenter {
			.EnterCenter_cont {
				padding-top: 45px;
				.title {
					text-align: center;
					h5 {
						font-size: 22.5px;
						line-height: 36px;
					}
				}
				.con-top {
					text-align: center;
					width: 500px;
					margin: 0 auto;
					padding: 59px 0 30px 0;
					border-bottom: 1px solid #DEDEDE;
					margin-bottom: 32px;
					a {
						padding: 0 40px;
						font-size: 10.5px;
						color: #666666;
						/*a .active{
							color: #5967ff;
						}*/
					}
					.cho-item.active {
						color: #5967ff;
					}
				}
				.rent-cont {
					width: 540px;
					margin: 0 auto;
					.rent-l {
						width: 480px;
						.forms {
							margin-bottom: 20px;
							.form-title {
								line-height: 54px;
								text-align: center;
								h6 {
									font-size: 12px;
									line-height: 36px;
								}
							}
							.forms-cont {
								padding-bottom: 10px;
							}
							.for-item {
								margin-bottom: 18px;
								.for-type {
									display: inline-block;
									width: 100px;
									padding-right: 10px;
									text-align: right;
									line-height: 36px;
									font-size: 10.5px;
									color: #000000;
									vertical-align: middle;
								}
								input {
									height: 30px;
									width: 300px;
									padding: 0 10px;
									border: solid 1px #aeaeae;
									margin-right: 10px;
									vertical-align: middle;
								}
								.xue {
									color: red;
									font-size: 20px;
									vertical-align: middle;
								}
							}
						}
					}
				}
			}
			.months{
				text-align: center;
				padding-bottom: 40px;
				a{
					padding: 10px 40px;
					color: #FFFFFF;
					background: #5967FF;
					border-radius: 5px;
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
</style>
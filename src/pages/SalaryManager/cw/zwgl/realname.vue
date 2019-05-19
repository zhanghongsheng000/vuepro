<template>
	<div class="ygpayroll definerealnamecon">
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
						<span class="top-text">实名认证</span>
					</div>
					<div class="contain">
						<div class="con-item clearfix">
							<div class="con-text fl">姓名</div>
							<div class="con-input fl">
								<el-input v-model="input1" placeholder="请输入姓名" clearable></el-input>
							</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">手机号码</div>
							<div class="con-input fl">
								<el-input v-model="input2" placeholder="请输入手机号码" clearable></el-input>
							</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">身份证号码</div>
							<div class="con-input fl">
								<el-input v-model="input3" placeholder="请确认身份证号码" clearable></el-input>
							</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">身份证反面</div>
							<div class="con-input fl ">
								<div class="codeimg">
									<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs2" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
										<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="imageUrls" alt="">
									</el-dialog>
								</div>
							</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">身份证正面</div>
							<div class="con-input fl ">
								<div class="codeimg">
									<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
										<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="imageUrls" alt="">
									</el-dialog>
								</div>
							</div>
						</div>
					</div>
					<div class="btns">
						<el-button type="primary">保存</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import gUrl from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				dialogVisible: false,
				imgparamgs: '', //成功之后的参数
				imageUrls: '', //放大地址
				input1: '',
				input2: '',
				input3: '',
				importFileUrl: 'https://jsonplaceholder.typicode.com/posts/', //接口地址
				upLoadData: {
					file: '',
					type: 'user',
					objectId: this.$local.fetch('info').usreId
				}, //后台参数

			}
		},
		methods: {
			beforeAvatarUpload(file) { //图片上传之前限制
				this.upLoadData.file = file
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt10M = file.size / 1024 / 1024 < 10
				if(!isJPG && !isPNG) {
					this.$message({
						showClose: true,
						message: '上传照片必须是JPG/PNG格式!',
						type: 'error'
					});
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: '上传图片大小不能超过 10MB!',
						type: 'error'
					})
				}
				return(isJPG || isPNG) && isLt10M;
			},
			handlePictureCardPreview(file) { //放大
				this.dialogVisible = true;
			},
			uploadSuccessgs(response, file, fileList) { //公司
				this.imgparamgs = response.result
				/*if(response.resultCode=='200'){
				  this.$message({
				    showClose: true,
				    message: '上传成功',
				    type: 'success'
				  });
				  this.imgparamgs=response.result
				  console.log(response.result)
				}else{
				  this.$message({
				    showClose: true,
				    message: data.result,
				    type: 'error'
				  });
				}*/
			},
			uploadSuccessgs2() {
			},
			handleExceed() { //限制上传的图片数量
				this.$message({
					showClose: true,
					message: '只能上传一张图片',
					type: 'error'
				});
			},
			handleRemovegs() {

			}
		}
	}
</script>
<style lang="less" scoped>
	.ygpayroll {
		.banner {
			height: 500px;
			background: url("../../../assets/img/SalaryManager/ygzwgl.png") center center no-repeat;
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
			background-color: #eeeeee;
			margin-bottom: -140px;
			.main {
				background-color: #fff;
				border-top-left-radius: 20px;
				border-top-right-radius: 20px;
				position: relative;
				top: -140px;
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
			.contain {
				padding-left: 350px;
				.con-item {
					margin-bottom: 20px;
				}
				.con-text {
					width: 80px;
					text-align: right;
					padding-right: 15px;
					line-height: 40px;
				}
			}
			.btns {
				padding-left: 525px;
			}
		}
	}
</style>
<style lang="less">
	.definerealnamecon {
		.codeimg {
			.el-upload--picture-card {
				width: 150px !important;
				height: 80px !important;
				display: inline-block;
				.el-icon-plus {
					position: relative;
					/*top: -28px;*/
				}
			}
			.el-upload-list__item {
				width: 150px !important;
				height: 80px !important;
			}
			.el-upload.el-upload--picture-card {
				display: inline-block;
			}
		}
		.ygpayroll {
			.el-button--primary {
				width: 132px;
				height: 42px;
			}
		}
	}
</style>
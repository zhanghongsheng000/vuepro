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
						<span class="top-text">修改密码</span>
					</div>
					<div class="contain">
						<div class="con-item clearfix">
							<div class="con-text fl">旧密码</div>
							<div class="con-input fl">
								<el-input v-model.trim="oldPassword" placeholder="请输入旧密码" type='password' clearable></el-input>
							</div>
							<div class="mi fl">*</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">新密码</div>
							<div class="con-input fl">
								<el-input v-model.trim="newPassword" placeholder="请输入新密码" type='password' clearable></el-input>
							</div>
							<div class="mi fl">*</div>
						</div>
						<div class="con-item clearfix">
							<div class="con-text fl">确认密码</div>
							<div class="con-input fl">
								<el-input v-model.trim="rePassword" placeholder="请确认密码" type='password' clearable></el-input>
							</div>
							<div class="mi fl">*</div>
						</div>
					</div>
					<div class="btns">
						<el-button type="primary" @click="modifypsw">保存</el-button>
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
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				oldPassword: '',
				newPassword: '',
				rePassword: ''
			}
		},
		methods: {
      modifypsw() {
        if(this.editPassword.oldPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.editPassword.newPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.editPassword.ensurePassword==''){
          this.$message.error('请输入确认密码');
        }
        else if(this.editPassword.newPassword!=this.editPassword.rePassword){
          this.$message.error('两次输入密码不一致');
        }
        else if(this.editPassword.newPassword.length>20||this.editPassword.newPassword.length<8){
          this.$message.error('密码长度8-20位')
        }
        else{
          this.$http.get('account/update', {
            params: {
              oldPassword: this.editPassword.oldPassword,
              newPassword: this.editPassword.newPassword,
              rePassword: this.editPassword.ensurePassword,
              userId: this.userId
            }
          }).then((res) => {
            if(res.data.resultCode=='200'){
              this.$message.success('修改密码成功');
            }
            else{
              this.$message.error(res.data.resultCodeDesc);
            }
          })
        }

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
				.mi {
					line-height: 40px;
					padding-left: 10px;
					font-size: 24px;
					color: red;
				}
			}
			.btns {
				padding-left: 525px;
			}
		}
		.el-button--primary {
			width: 132px;
			height: 42px;
		}
	}
</style>

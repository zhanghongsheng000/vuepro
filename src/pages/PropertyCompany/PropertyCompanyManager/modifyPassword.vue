<template>
	<div class="ygpayroll">
		<div class="ygpay-wrap">
			<div class="main">
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
        if(this.oldPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.newPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.ensurePassword==''){
          this.$message.error('请输入确认密码');
        }
        else if(this.newPassword!=this.rePassword){
          this.$message.error('两次输入密码不一致');
        }
        else if(this.newPassword.length>20||this.newPassword.length<6){
          this.$message.error('密码长度6-20位')
        }
        else{
          this.$httpPasser.get('account/update', {//20180912 修改 【通行客物业-修改密码-8/8】修改密码的接口调错成了智慧物业的，应该调用通行客修改密码的的接口	激活	李娅	08-08 16:00	张稼
            params: {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
              rePassword: this.rePassword,
              userId: this.getBuildingGroupParams.userId
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
		.ygpay-wrap {
			.main {
				background-color: #fff;
				border-top-left-radius: 20px;
				border-top-right-radius: 20px;
				position: relative;
			}
			.main-cont {
				padding: 30px 0px 20px 0px;
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
					font-size: 14px;
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
				padding-top: 40px;
				padding-left: 466px;
			}
		}
		.el-button--primary {
			width: 132px;
			height: 42px;
		}
	}
</style>

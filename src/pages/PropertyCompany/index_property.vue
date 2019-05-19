<template>
	<div class="Business_container BusinessHome">
		<div class="index_container"  >
			<div class="index_header_container">
				<div class="index_header">
					<div class="logo fl"></div>
					<div class="fr user_login">
						<div class="hello fr">{{companyName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{userName}}&nbsp;&nbsp;&nbsp;
							<a href="javascript:;" @click="toPropertyCompanyMessage">消息<span></span></a>&nbsp;&nbsp;&nbsp;
							<!-- -->
							<a href="javascript:;" @click="quitLogin">退出</a>
						</div>
					</div>
				</div>
			</div>
			<div class="index_container">
				<div class="index_con common clearfix">
					<div class="indexCon_left position_fix">
						<div class="slide_scroll">
							<PropertyHead></PropertyHead>
						</div>

					</div>
          <div class="indexCon_right fr">
            <router-view></router-view>
          </div>
          <!--<el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section">
            <div class="indexCon_right fr">
              <router-view></router-view>
            </div>
          </el-scrollbar>-->

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PropertyHead from '@/components/PropertyCompany/PropertyHeadVertical'
	import footer from '@/components/public/footer'
	import { $gImgUrl } from '@/assets/js/gUrl'
	export default {
		name: "business-home",
		data() {
			return {
				userName: this.$local.sefetch('info') ? this.$local.sefetch('info').userName : '',
				passerger_message: false,
				intelligent_message: false,
				zjyf_message: false,
				salary_message: false,
			}
		},
		computed: {
			companyName: function() {
				return this.$local.sefetch('info').companyName;
			}
		},
		methods: {
			updateOnline(callback) {
				this.$httpPasser.get(
					'updateOnline', {
						params: {
							customerUserId: this.$local.sefetch('info').userId,
							status: 'N'
						}
					}
				).then((res) => {
					// console.log(res.data)
					callback()
				})
			},
			toPropertyCompanyMessage() { //跳转物业消息页面
				this.$router.push({
					path: '/PropertyCompany/PropertyCompanyManager/companyMessage/PropertyCompanyMessage/propertyCompanyMessage_receive',
				})
			},
			show_passerger() { //显示
				this.passerger_message = true;
			},
			show_passerger1() {
				this.passerger_message = false;
			},
			show_intelligent() { //显示
				this.intelligent_message = true;
			},
			show_intelligent1() {
				this.intelligent_message = false;
			},
			show_zjyf() {
				this.zjyf_message = true;
			},
			show_zjyf1() {
				this.zjyf_message = false;
			},
			show_salary() {
				this.salary_message = true;
			},
			show_salary1() {
				this.salary_message = false;
			},
			quitLogin() {
				let that = this;
				this.updateOnline(function() {
					that.$local.sesave("info", null)
					that.$local.sesave("pwdInit", null)
					that.$local.sesave("isID", null)
					that.$local.sesave("isBank", null)
					that.$local.sesave("identity", null)
					that.$router.push("/")
				})
			}
		},
		created() {
			/*window.onbeforeunload = (e)=>{
			  this.updateOnline()
			  e = e || window.event;

			  // 兼容IE8和Firefox 4之前的版本
			  if (e) {
			    e.returnValue = '关闭提示';
			  }

			  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
			  return '关闭提示';
			};*/
		},
		beforeDestroy() {},
		components: {
			PropertyHead,
			'v-footer': footer
		}
	}
</script>

<style lang="less" scoped>
	.index_container {
		width: 100%;
		/*margin-left: calc(100vw - 100%);*/
		.indexCon_right {
			width: 1040px;
			background: #fff;
			margin-top: 10px;
			padding: 10px;
			/*min-height: 90%;*/
			float: right;
			z-index: 100;
			margin-left: 200px;
			margin-top: 75px;
			z-index: 120;
			padding-bottom: 80px;
		}
		/*头部*/
		.index_header_container {
			width: 100%;
			height: 70px;
			border-bottom: 4px solid rgb(52, 135, 250);
			position: fixed;
			z-index: 200;
			.index_header {
				width: 1320px;
				margin: 0 auto;
				height: 70px;
				z-index: 200000;
    		background: #fff
			}
			.logo {
				margin-top: 12px;
				background: url(../../assets/images/index/intellgent_logo.png);
				background-size: 360px 46px;
				background-repeat: no-repeat;
				width: 360px;
				height: 46px;
				cursor: pointer;
			}
			.user_login {
				padding: 30px 0;
				color: #666666;
				margin-right: 18px;
				a {
					font-size: 12px;
					color: #666666;
					span {
						color: #ff0100;
						margin-left: 5px;
						font-weight: 600;
					}
				}
			}
		}
		/*内容部分*/
		.index_container {
			background: #fff;
			width: 100%;
			/*position: fixed;
			overflow: auto;*/
			min-height: 550px;
			height: 92%;
			.index_con {
				height: 100%;
				.indexCon_left {
					position: fixed;
					top: 0;
					bottom: 0;
					z-index: 0;
					width: 220px;
					overflow-x: hidden;
					position: fixed;
					top: 80px;
					bottom: 0;
					z-index: 999;
					overflow: hidden;
					background: #3b7df1;
				}
				.slide_scroll{
					width: 240px;
    			height: 100%;
    			overflow-x: hidden;
				}
			}
		}
	}
</style>

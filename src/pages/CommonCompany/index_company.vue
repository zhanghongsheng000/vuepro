<template>
	<div class="Business_container BusinessHome">
		<div class="index_container">
			<div class="index_header_container">
				<div class="index_header">
					<div class="logo fl"></div>
					<div class="fr user_login">
						<div class="hello fr" v-if="flush">{{companyName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{userName}}&nbsp;&nbsp;&nbsp;
							<a href="javascript:;" @click="toCompanyMessage">消息<span></span></a>&nbsp;&nbsp;&nbsp;
							<!---->
							<a href="javascript:;" @click="quitLogin">退出</a>
						</div>
					</div>
				</div>
			</div>
			<div class="index_container">
				<div class="index_con common clearfix">
					<div class="indexCon_left position_fix">
						<div class="slide_scroll">
							<CompanyHead></CompanyHead>
						</div>
					</div>
					<div class="indexCon_right fr">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CompanyHead from '@/components/CommonCompany/CompanyHeadVertical'
	import footer from '@/components/public/footer'
	import { $gImgUrl } from '@/assets/js/gUrl'
	export default {
		name: "business-home",
		components: {
			CompanyHead,
			'v-footer': footer
		},
		data() {
			return {
				userName: this.$local.sefetch('info') ? this.$local.sefetch('info').userName : '',
				flush: true
			}
		},
		computed: {
			companyName: function() {
				return this.$local.sefetch('info').companyName;
			}
		},
		methods: {
			quitLogin() {
				this.$local.sesave("info", null)
				this.$local.sesave("pwdInit", null)
				this.$local.sesave("isID", null)
				this.$local.sesave("isBank", null)
				this.$local.sesave("identity", null)
				this.$router.push("/")
			},
			toCompanyMessage() {
				this.$router.push({
					path: '/CommonCompany/CommonCompanyCenter/CommonCompanyMessage/CommonCompanyMessage/CommonCompanyMessage_receive',

				})
			}
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
			margin-left: 200px;
			margin-top: 75px;
			z-index: 0;
			padding-bottom: 80px;
		}
		/*头部*/
		.index_header_container {
			width: 100%;
			height: 70px;
			border-bottom: 4px solid #1168e1;
			position: fixed;
			z-index: 1000;
			.index_header {
				width: 1320px;
				margin: 0 auto;
				height: 70px;
				z-index: 200000;
				background: #fff
			}
			.logo {
				margin-top: 7px;
				background: url(../../assets/images/public/logo1.png);
				background-size: 146px 46px;
				background-repeat: no-repeat;
				width: 146px;
				height: 61px;
				cursor: pointer;
				margin-left:10px;
			}
			.user_login {
				padding: 30px 0;
				color: #666666;
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
			/*position: fixed;*/
			/*overflow: auto;*/
			min-height: 550px;
			/*height: 92%;*/
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
				.slide_scroll {
					width: 240px;
					height: 100%;
					overflow-x: hidden;
				}
			}
		}
	}
</style>

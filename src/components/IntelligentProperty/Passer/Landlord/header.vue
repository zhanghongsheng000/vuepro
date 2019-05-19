<template>
	<div class="header_container landlordHeader">
		<div class="clearfix">
			<h1 class="fl"></h1>
			<div class="nav fr">
				<router-link class="link-item" to="/IntelligentProperty/Renter">
					<img src="../../../../assets/img/IntelligentProperty/icon_home.png" class="fl" />
				</router-link>
				<ul class="nav_list fr">
					<li>
						<!--<a href="javascript:;" to="/PropertyPayment"></a>-->
						<router-link class="link-item" to="/IntelligentProperty/PropertyPayment">物业缴费</router-link>
					</li>
					<li>
						<!--<a href="javascript:;" to="/PropertyPayment">财务管理</a>-->
						<router-link class="link-item" to="/IntelligentProperty/AccountManage">财务管理</router-link>
					</li>
					<li>
						<router-link class="link-item" to="/IntelligentProperty/EnterpriseCentre">企业中心</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="rent_message fr">
			<span>荣鼎天下A座</span>-
			<span>1407</span>-
			<span>老王</span>
			<p>代缴费<span>1</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style lang="less" scoped>
	.landlordHeader {
		width: 100%;
		position: absolute;
		min-width: 1200px;
		/*h1 {*/
			/*background: url(../../../../assets/img/IntelligentProperty/rent_logo.png) no-repeat;*/
			/*background-size: 501px 51px;*/
			/*background-position: 59px 46px;*/
			/*width: 560px;*/
			/*height: 97px;*/
		/*}*/
		.nav {
			padding: 36px 0 0 0;
			img {
				width: 20px;
				height: 17px;
			}
			ul {
				margin-left: 33px;
				li {
					float: left;
					margin: 0 10px;
					&:hover {}
					a {
						padding: 10px 20px;
						font-size: 12px;
						color: #000000;
						&:hover {
							color: #FFFFFF;
							background: #000000;
							border-radius: 5px;
						}
					}
				}
			}
		}
		.rent_message{
			margin-top: -20px;
			margin-right: 10px;
			font-size: 12px;
			p{
				display: inline-block;
				padding: 5px 10px;
				background: #ff9100;
				color: #FFFFFF;
				font-size: 12px;
				border-radius: 5px;
				margin-left: 6px;
				cursor: pointer;
			}
		}
	}
</style>

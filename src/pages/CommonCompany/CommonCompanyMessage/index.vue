<template>
	<div id="commonCompanyMessage">
		<div class="headNav">
			<ul>
				<!--<li :class="{active:flag==1}" @click="tab(1)">添加租客</li>
        		<li :class="{active:flag==2}" @click="tab(2)">导入租客</li>
        		<li :class="{active:flag==3}" @click="tab(3)">查询租客</li>-->
				<router-link tag="li" to="/CommonCompany/CommonCompanyCenter/CommonCompanyMessage/CommonCompanyMessage/CommonCompanyMessage_receive">收到的信息</router-link>
				<router-link tag="li" to="/CommonCompany/CommonCompanyCenter/CommonCompanyMessage/CommonCompanyMessage/CommonCompanyMessage_sended">已发消息</router-link>
				<router-link tag="li" to="/CommonCompany/CommonCompanyCenter/CommonCompanyMessage/CommonCompanyMessage/CommonCompanyMessage_send">发消息</router-link>
			</ul>
		</div>
		<div class="clear10"></div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				flag: 1,
				pathArray: {
					1: 'CommonCompanyManager_receive',
					2: 'CommonCompanyManager_sended',
					3: 'CommonCompanyManager_send'
				}
			}
		},
		methods: {
			tab(index) {
				this.flag = index;
				this.$router.push({
					path: this.pathArray[this.flag]
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#commonCompanyMessage{
		.headNav {
			width: 100%;
			height: 35px;
			line-height: 35px;
			border-bottom: solid #e5e5e5 1px;
			ul {
				li {
					float: left;
					width: 120px;
					text-align: center;
					font-size: 15px;
					cursor: pointer;
				}
				li.active {
					border-bottom: solid #3387f9 2px;
				}
			}
		}
	}
</style>
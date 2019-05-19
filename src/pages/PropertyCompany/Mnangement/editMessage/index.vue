<template>
	<div id="houseManager">
		<!--<div class="buildingFingShop">-->
			<!--<span class="buildingTitle">硅谷广场B座</span><span>1405</span>-->
			<!--<el-button type="danger" style="margin-top: -10px;">一键招商</el-button>-->
			<!--<el-button type="primary"  @click="backHandle" style="margin-top: -10px;margin-right: 30px;" class="fr">返回</el-button>-->
		<!--</div>-->
		<div class="headNav">
			<ul>
				<router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/editMessage/editBuildingGroup'}">楼盘信息</router-link>
				<router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/editMessage/editBuilding'}">写字楼信息</router-link>
				<router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/editMessage/editRoom'}">房间信息</router-link>
			</ul>

			<!--<el-tabs v-model="activeName">-->
			<!--<el-tab-pane label="楼盘信息" name="first" disabled>楼盘信息</el-tab-pane>-->
			<!--<el-tab-pane label="写字楼信息" name="second" disabled>写字楼信息</el-tab-pane>-->
			<!--<el-tab-pane label="房间信息" name="third" disabled>房间信息</el-tab-pane>-->
			<!--</el-tabs>-->
		</div>
		<div class="router">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		name: "index",
		data() {
			return {
				activeName: 'first',
				flag: 1,
				pathArray: {
					1: 'editBuildingGroup',
					2: 'editBuilding',
					3: 'editRoom',
				}
			}
		},
		methods: {
			//返回
			backHandle() {
				this.$router.back()
			},
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
	#houseManager {
		.headNav {
			width: 100%;
			height: 35px;
			padding-top: 20px;
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
		.router {
			margin-top: -1px;
			padding: 30px;
		}
		.el-table .cell {
			text-align: center;
		}
		.el-table th {
			white-space: nowrap;
			overflow: hidden;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			text-align: left;
		}
		.buildingFingShop {
			border-bottom: 2px solid #e5e5e5;
			padding-bottom: 5px;
			span {
				float: left;
				margin-top: -4px;
				display: inline-block;
				font-size: 20px;
				color: #000000;
				font-weight: 500;
				margin-right: 20px;
			}
		}
		.block_position {
			width: 1040px;
			height: 40px;
			position: absolute
		}
	}
</style>
<style lang="less">
	#houseManager {
		.el-table .cell {
			text-align: center!important;
		}
		.el-table th {
			text-align: center!important;
		}
	}
</style>

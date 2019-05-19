<template>
	<div id="houseManager">
		<div class="headNav">
			<ul>
				<router-link tag="li" :to="{path:'/PropertyCompany/HouseManager/buildingGroupManager/buildingGroupManager'}">楼盘管理</router-link>
				<router-link tag="li" :to="{path:'/PropertyCompany/HouseManager/buildingGroupManager/buildingManager/buildingManager'}">写字楼管理</router-link>
				<router-link tag="li" :to="{path:'/PropertyCompany/HouseManager/buildingGroupManager/floorManager'}">楼层管理</router-link>
				<router-link tag="li" :to="{path:'/PropertyCompany/HouseManager/buildingGroupManager/roomManager'}">房间管理</router-link>
			</ul>
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
				flag: 1,
				pathArray: {
					1: 'buildingGroupManager',
					2: 'buildingManager',
					3: 'floorManager',
					4: 'roomManager'
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
	#houseManager {
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
		.router{
			margin-top: -1px;
			padding: 30px 0;
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

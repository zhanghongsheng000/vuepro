<template>
	<div id="houseManager">
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
		.router{
			margin-top: -1px;
			/*padding: 30px;*/
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
    .buildingFingShop{
    	border-bottom: 2px solid #e5e5e5;
    	padding-bottom: 5px;
    	span{
    		float: left;
    		margin-top: -4px;
    		display: inline-block;
    		font-size: 20px;
    		color: #000000;
    		font-weight: 500;
    		margin-right: 20px;
    	}
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

<template>
	<div class="mainPart myBuildingGroups">
		<el-tabs v-model="buildingId" type="card" @tab-click="handleClickGetFloorList">
			<el-tab-pane v-for="(building,index) in buildingList" :key="index" :label='building.buildingName' :name="building.buildingId">
				<el-tabs v-model="buildingFloorId" type="card" @tab-click="handleClickGetRoomList">
					<el-tab-pane v-for="(buildingFloor,index) in buildingFloorList" :key="index" :label='buildingFloor.buildingFloorName' :name='buildingFloor.buildingFloorId'>
						<el-tag v-for="(buildingRoom,index) in buildingRoomList" :key="index">
							<span @click="todetails">{{buildingRoom.buildingRoomName}}</span>
						</el-tag>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
		</el-tabs>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				currentName:"gd",
        //产品ID
        productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
				buildingId:'',
				buildingFloorId: '',
				buildingGroupId:this.$route.query.buildingGroupId,
				buildingList:[],
				buildingFloorList:[],
				buildingRoomList:[],
				hasTable: true
			}
		},
		methods: {
			getbuilding(){
				this.httpCurrent.get('building/getBuildingListByBuildingGroupId',
				{
					params:{
						buildingGroupId:this.buildingGroupId
					}
				}).then(response=>{
					this.buildingList=response.data.result.buildingList
				}).catch((err)=>{
					console.log(err)
				})
			},
			Building(){
				this.httpCurrent.get('building/getBuildingFloorListByBuildingId',
				{
					params:{buildingId:this.buildingId}
				}).then(response=>{
					this.buildingFloorList = response.data.result.buildingFloorList;
				})
			},
			Floor(){
				this.httpCurrent.get('building/getBuildingRoomListByBuildingFloorId',
				{params:{buildingFloorId:this.buildingFloorId}}
				).then(response=>{
					this.buildingRoomList = response.data.result.buildingRoomList;
				})
			},
			handleClickGetFloorList(tab,event) {
				this.httpCurrent.get('building/getBuildingFloorListByBuildingId',
				{params:{buildingId:this.buildingId}}
				).then(response=>{
					this.buildingFloorList = response.data.result.buildingFloorList;
				})
				//this.floorId = '1层'
			},
			handleClickGetRoomList(tab, event) {
				this.httpCurrent.get('building/getBuildingRoomListByBuildingFloorId',
				{params:{buildingFloorId:this.buildingFloorId}}
				).then(response=>{
					this.buildingRoomList = response.data.result.buildingRoomList;
				})
			},
			todetails() {
//				console.log('需要传入Id跳转到详情')
			}
		},
    computed:{
      httpCurrent:function(){
        if(this.productId=='5'){
          return this.$http;
        }
        else if(this.productId=='6'){
          return this.$httpPasser;
        }
      }
    },
		mounted() {
		},
		created(){
			this.getbuilding()//获取楼盘
			this.Building();//默认加载
			this.Floor();//默认加载
		}
	}
</script>

<style scoped lang="less">
	.myBuildingGroups {
		/*    padding-left:50px;*/
		width: 1200px;
		min-height: 420px;
		form {
			line-height: 40px;
		}
		.clear20 {
			clear: both;
			height: 20px;
			width: 100%;
		}
	}
</style>
<style lang="less">
	.myBuildingGroups {
		line-height: 40px;
		.el-pagination {
			text-align: center;
			line-height: 40px;
		}
		.el-table th {
			text-align: center;
		}
		.el-table {
			font-size: 12px;
		}
		.cell {
			text-align: center;
		}
		.el-input__inner {
			height: 30px;
		}
		.el-tabs__nav {
			line-height: 40px;
		}
		.el-tag {
			margin-right: 5px;
			cursor: pointer;
		}
	}
</style>

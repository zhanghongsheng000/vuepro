<template>
	<div class="floorManager">
    <div >
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">楼层管理</span>
      </div>
    </div>
		<div class="title clearfix">
			<div class="fl searchbuilding">
				<div class="search_con clearfix">
					<input v-model="buildingGroupName" placeholder="请输入楼盘名称">
					<el-button type="primary" icon="el-icon-search" id="icon" @click="getBuildingList"></el-button>
				</div>
				<div class="building_con">
					<div class="building_floor" v-for="item in buildingGroup">
						<div class="building"><span>{{item.buildingGroupName}}</span></div>
						<div class="buildinggroup">
							<div class="buildinggroup_part " v-for="items in item.buildingList" @click="changestyle(items.buildingId)">
								<span class="normal ">{{items.buildingName}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fr">
				<!--<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addBuildingfloor">添加写字楼</el-button>-->
				<el-button type="danger" icon="el-icon-delete" @click="deleteSelect">删除楼层</el-button>
				<div class="table-cont pt20">
					<el-table :data="buildingfloorList" @selection-change="handleSelectionChange" style="width: 100%" ref="buildingfloorId" :empty-text=text>
						<el-table-column type="selection" label="选择" width="55"></el-table-column>
						<el-table-column type="index" label="编号"></el-table-column>
						<el-table-column prop="floorNum" label="楼层数"></el-table-column>
						<el-table-column prop="floorName" label="楼层名称"></el-table-column>
						<el-table-column prop="floorSize" label="楼层面积" width='100'></el-table-column>
						<el-table-column prop="roomNum" label="房间数量" width='100'></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEditBuildingfloor(scope.$index, scope.row)">编辑
								</el-button>
								<el-button size="mini" type="danger" @click="handleSingalDelete(scope.$index, scope.row)">删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="clearfix pt20">
					<div class="fl">
						<el-pagination @current-change="handleCurrentChange" background :current-page.sync="page.currentPageNum" layout="prev, pager, next" :page-count="page.pageTotal">
						</el-pagination>
					</div>
					<div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span></div>
				</div>
			</div>
			<div class="mask-box">
				<!--编辑楼层-->
				<el-dialog title="编辑楼层" :visible.sync="dialogVisible" width="500px"  >
					<div class="entry-cocnt">
						<div class="sitem clearfix">
							<div class="siteml fl">所在楼层：</div>
							<div class="sitem fl floornum">{{buildingFloor.floorNum}}</div>
						</div>
						<div class="sitem clearfix">
							<div class="siteml fl">楼层名称：</div>
							<div class="sitemr fl">
								<el-input v-model.trim="buildingFloor.floorName" placeholder="请输入楼层名称" clearable></el-input>
							</div>
						</div>
						<div class="sitem clearfix">
							<div class="siteml fl">楼层面积：</div>
							<div class="sitemr fl">
								<el-input v-model.trim="buildingFloor.floorSize" placeholder="请输入楼层面积" clearable></el-input>
							</div>
							<span class="lengthstyle">㎡</span>
						</div>
						<div class="sitem clearfix">
							<div class="siteml fl">房间数量：</div>
							<div class="sitemr fl">
								<el-input v-model.trim="buildingFloor.roomNum" placeholder="请输入房间数量" clearable></el-input>
							</div>
							<span class="lengthstyle">个</span>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
					    <el-button type="primary" @click="editSure">确 定</el-button>
					</span>
				</el-dialog>
			</div>
			<div class="mask-box">
				<!--确定删除楼层-->
				<el-dialog title="确定删除" :visible.sync="dialogVisibleDelete" width="30%">
					<span slot="footer" class="dialog-footer">
					   <el-button type="primary" @click="dialogVisibleDelete=false">取消</el-button>
        				<el-button type="danger" @click="handleDialogDeleteSubmit()">确定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "building-manager",
		data() {
			return {
				text:'正在加载，请稍候',
				getParams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				buildingGroupName: '', //楼盘名称
				buildingId: "",
				pageSize: 30,
				pageIndex: 1,
				buildingGroup: [], //获取左侧楼盘列表
				buildingfloorList: [], //楼层
				page: {
					currentPageNum: 1, //当前页码
					pageTotal: 1, //总页码
					totalRecord: 0 //总条数
				},
				dialogVisibleDelete:false,//删除楼层弹层
				floorIds:[], //要删除楼层的id
				dialogVisible: false, //编辑楼层
				buildingFloor:{
					buildingFloorId:'',//id
					floorNum:'',//楼层数
					floorName:'',//楼层名称
					floorSize:'',//楼层面积
					roomNum:'',//楼层房间数
				}

			}
		},
		methods: {
			//设置分页
			handleCurrentChange(index) {
				this.page.currentPageNum = index;
				this.getFloorList(index)
			},
			//跳转到添加写字楼
			toAddBuilding() {
				// this.$router.push('addBuilding')
			},
			handleEditBuildingfloor(index, row) { //编辑楼层
				this.buildingFloor.buildingFloorId = row.buildFloorId;
				this.buildingFloor.floorNum = row.floorNum;
				this.buildingFloor.floorName = row.floorName;
				this.buildingFloor.floorSize = row.floorSize;
				this.buildingFloor.roomNum = row.roomNum;
				this.dialogVisible = true;
			},
			//选中的floors
			handleSelectionChange(selection) { //选中列
				this.floorIds = [];
				for(let o in selection) {
					this.floorIds.push(selection[o].buildFloorId)
				}
			},
			indexMethod(index) { //编号
				return(this.pageNow - 1) * 30 + 1 + index;
			},
			getBuildingList() { //获取写字楼列表
				this.$httpPasser.post("buildingFloor/searchBuilding", {
					shopId: this.getParams.shopId,
					buildingGroupName: this.buildingGroupName
				}).then((res) => {
					if(res.data.resultCode == "200") {
						this.buildingGroup = res.data.result;
						let temp = {}
						for(let o in res.data.result[o]) {
							if(res.data.result[o] != null) {
								temp[o] = res.data.result[o]
							}
						}

						for(let i in res.data.result) {
							for(let o in res.data.result[i].buildingList) {
								this.buildingId = res.data.result[0].buildingList[0].buildingId
							}
						}
						this.$nextTick(() => {
							let normallist = document.querySelectorAll(".normal");
							normallist[0].className += ' active';
							for(let i = 0; i < normallist.length; i++) {
								normallist[i].onclick = function() {
									for(let j = 0; j < normallist.length; j++) {
										normallist[j].className = 'normal'
									}
									this.className += ' active';
								}
							}
							let buildinggroup_part = document.querySelectorAll(".buildinggroup_part");
							buildinggroup_part[0].className += " hoverstyle"
							for(let a = 0; a < buildinggroup_part.length; a++) {
								buildinggroup_part[a].onclick = function() {
									for(let o = 0; o < buildinggroup_part.length; o++) {
										buildinggroup_part[o].className = 'buildinggroup_part'
									}
									this.className += ' hoverstyle';
								}
							}
						})
						this.getFloorList();
					} else if(res.data.resultCode == "204") {
						this.buildingGroup = res.data.result
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						})
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					}
				})
			},
			getFloorList(pageIndex) { //获取楼层列表
				this.$httpPasser.post('buildingFloor/list', {
					buildingId: this.buildingId,
					pageSize: this.pageSize,
					pageIndex: this.page.currentPageNum
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.buildingfloorList = res.data.result;
						this.$message({
							showClose: true,
							message: "查询成功",
							type: 'success'
						})
						this.page.pageTotal = res.data.pageTotal;
						this.page.totalRecord = res.data.totalRecord
					} else if(res.data.resultCode == "204") {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						})
						this.page.pageTotal = res.data.pageTotal;
						this.page.totalRecord = res.data.totalRecord
						this.buildingfloorList = res.data.result;
						this.text ="暂无数据"
					} else {
						this.text ="暂无数据"
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					}
				})
			},
			changestyle(buildingId) {
				this.buildingId = buildingId;
				this.getFloorList();
			},
			handleSingalDelete(index, row) { //单条删除
				this.floorIds = []
				this.dialogVisibleDelete = true
				this.floorIds.push(row.buildFloorId)
			},
			deleteSelect(){//删除选中的楼盘
				if(this.floorIds.length<1){
					this.$message({
						type:'success',
						message:'请先选中',
						showClose:'error',
					})
				}else{
					this.handleDialogDeleteSubmit()
				}
			},
			handleDialogDeleteSubmit(){//确定删除楼层
				this.$httpPasser.post('buildingFloor/bathDelete',{
					buildingId:this.buildingId,
					shopId: this.getParams.shopId,
					floorIds:this.floorIds
				}).then((res)=>{
					if(res.data.resultCode==200){
						this.$message({
							type:'success',
							message:'删除成功',
							showClose:true
						})
						this.dialogVisibleDelete = false
						this.getFloorList(this.page.currentPageNum)
					}else{
						this.$message({
							type:'error',
							message:res.data.resultCodeDesc,
							showClose:true
						})
						this.dialogVisibleDelete = false
					}
				})
			},
			editSure(){//确定编辑
				this.$httpPasser.post("buildingFloor/save",{
					buildingFloorId:this.buildingFloor.buildingFloorId,
					floorName:this.buildingFloor.floorName,
					floorNum:this.buildingFloor.floorNum,
					floorSize:this.buildingFloor.floorSize,
					roomNum:this.buildingFloor.roomNum,
				}).then((res)=>{
					if(res.data.resultCode=='200'){
						this.$message({
							showClose:'true',
							message:'编辑成功',
							type:'success',
						})
						this.dialogVisible = false;
						this.getFloorList(this.page.currentPageNum)
					}else{
						this.$message({
							type:'error',
							message:res.data.resultCodeDesc,
							showClose:true
						})
						this.dialogVisible = false;
					}
				})
			}
		},
		created() {
			this.getBuildingList()
		},
		computed: {
			num() {
				return parseInt(this.pagetotal)
			}
		},
	}
</script>

<style scoped lang="less">
	.floorManager {
		background: #FFFFFF;
		.title {
			.searchbuilding {
				width: 190px;
				.search_con {
					input {
						border: 1px solid #DEDEDE;
						height: 32px;
						width: 120px;
						padding-left: 10px;
					}
				}
				.building_con {
					margin-top: 20px;
					.building_floor {
						.building {
							background: url(../../../../assets/images/index/building_icon.png);
							background-repeat: no-repeat;
							background-position: 10px 12px;
							background-size: 8px 8px;
							span {
								font-size: 14px;
								line-height: 30px;
								color: #526069;
								padding-left: 30px;
							}
						}
						.buildinggroup {
							padding-bottom: 10px;
							border-bottom: 1px solid #999999;
							.hoverstyle {
								background: #e1f1f9;
							}
							.buildinggroup_part {
								display: block;
								width: 160px;
								height: 30px;
								.normal {
									cursor: pointer;
									background: url(../../../../assets/images/index/buildinggroup_icon.png);
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
									color: #76838f;
								}
								.active {
									background: url(../../../../assets/images/index/buildinggroup_hicon.png);
									color: #3487fa;
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
								}
							}
							.buildinggroup_part:hover {
								background: #e1f1f9;
								span {
									background: url(../../../../assets/images/index/buildinggroup_hicon.png);
									color: #3487fa;
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
								}
							}
						}
					}
				}
			}
			.fr {
				width: 750px;
				.pt20 {
					padding-top: 20px;
				}
				.lh35 {
					line-height: 35px;
				}
			}
			.entry-cocnt {
				.siteml {
					width: 140px;
					text-align: right;
					margin-right: 10px;
					line-height: 40px;
					margin-bottom: 20px;
				}
				.sitemr {
					width: 217px;
				}
				.lengthstyle {
					line-height: 40px;
					padding-left: 5px;
				}
			}
		}
		.floornum{
			line-height: 40px;
		}
	}
</style>
<style lang="less">
	.floorManager {
		#icon {
			padding: 9.5px 16px 9.5px 16px;
			border-radius: 0px;
		}
		.el-button--primary {
			margin-left: -6px;
		}
	}
</style>

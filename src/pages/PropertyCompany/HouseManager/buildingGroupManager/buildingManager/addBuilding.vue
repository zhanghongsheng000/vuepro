<template>
	<div class="addbuilding">
		<div class="back">
			<el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
			<span style="margin-left:20px;font-size:15px;">添加写字楼</span>
		</div>
		<div class="addContent clearfix">
			<div class="fl w450">
				<div class="item clearfix">
					<div class="iten-text beforesiteml fl">楼盘</div>
					<div class="fl w280">
						<el-select class="w280" v-model="buildDisc" placeholder="请选择楼盘" clearable>
							<el-option v-for="item,index in buildDiscList" :key="index" :label="item.buildingGroupName" :value="item.buildingGroupId">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text beforesiteml fl">写字楼名称</div>
					<div class="fl w280">
						<el-input v-model.trim="buildingName" placeholder="请输入写字楼名称" clearable></el-input>
					</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">写字楼经纬度</div>
					<div class="fl w280">
						<el-tooltip v-if="coordinateFlag" class="item" effect="light" :content="coordinateTipContent" placement="top-start">
							<el-input placeholder="经纬度" :disabled=true v-model="coordinate" @focus="getCoordinate"></el-input>
						</el-tooltip>
						<el-input v-if="!coordinateFlag" placeholder="经纬度" v-model="coordinate" @focus="getCoordinate"></el-input>
					</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">写字楼面积</div>
					<div class="fl w280">
						<el-input v-model.trim="buildingAcreage" placeholder="请输入写字楼面积" clearable></el-input>
					</div>
					<div class="company fl">㎡</div>
				</div>

				<div class="item clearfix">
					<div class="iten-text fl">楼层面积</div>
					<div class="fl w280">
						<el-input v-model.trim="buildingLayerAcreage" placeholder="请输入楼层面积" clearable></el-input>
					</div>
					<div class="company fl">㎡</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">地上层数</div>
					<div class="fl w280">
						<el-input v-model.trim="landTopNum" placeholder="请输入地上层数" clearable></el-input>
					</div>
					<div class="company fl">层</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">地下层数</div>
					<div class="fl w280">
						<el-input v-model.trim="landBottomNum" placeholder="请输入地下层数" clearable></el-input>
					</div>
					<div class="company fl">层</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">楼层数</div>
					<div class="fl w280 lh40">
						<!--<el-input v-model.trim="buildingLayerNum" placeholder="请输入楼层数"></el-input>-->
						{{this.Summing()}}
					</div>
					<div class="company fl">层</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">每层房间数</div>
					<div class="fl w280">
						<el-input v-model.trim="layerRoomNum" placeholder="请输入每层房间数" clearable></el-input>
					</div>
					<div class="company fl">个</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">开始层数</div>
					<div class="fl w280">
						<el-input v-model.trim="startRoomNum" placeholder="请输入开始层数" clearable></el-input>
					</div>
					<div class="company fl">层</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">电梯数量</div>
					<div class="fl w280">
						<el-input v-model.trim="elevatorNum" placeholder="请输入电梯数量" clearable></el-input>
					</div>
					<div class="company fl">部</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">客梯数量</div>
					<div class="fl w280">
						<el-input v-model.trim="guestElevatorNum" placeholder="请输入客梯数量" clearable></el-input>
					</div>
					<div class="company fl">部</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">货梯数量</div>
					<div class="fl w280">
						<el-input v-model.trim="goodsElevatorNum" placeholder="请输入货梯数量" clearable></el-input>
					</div>
					<div class="company fl">部</div>
				</div>
			</div>
			<div class="fl w450">
				<div class="item clearfix">
					<div class="iten-text  fl">写字楼描述</div>
					<div class="fl w280">
						<el-input class="w280" type="textarea" :autosize="{ minRows:4, maxRows:4}" placeholder="请输入内容" v-model="textarea" clearable>
						</el-input>
					</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text  fl">大厅图片</div>
					<div class="imgbox">
						<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="10" :on-exceed="handleExceed">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="imageUrls" alt="">
						</el-dialog>
					</div>
				</div>
				<div class="item clearfix">
					<div class="iten-text fl">电梯布局</div>
					<div class="imgbox">
						<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs2" :on-remove="handleRemovegs2" list-type="picture-card" :limit="10" :on-exceed="handleExceed">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="imageUrls" alt="">
						</el-dialog>
					</div>
				</div>
			</div>
		</div>
		<div class="overBtn">
			<el-button type="primary" @click="addClick">添加</el-button>
		</div>
		<el-dialog title="选择楼盘经纬度" :visible.sync="dialogVisibleMap" width="40%" top="22vh" :close-on-click-modal="false" @open="openMapDialog">
			<div>{{mapTips}}</div>
			<div class="clear10"></div>
			<div class="yourLatAndLng">
				您选择的经纬度：
				<el-input placeholder="经度" v-model="tempLngitude" clearable>
					<template slot="prepend">经度</template>
				</el-input>
				<el-input placeholder="纬度" v-model="tempLatitude" clearable>
					<template slot="prepend">纬度</template>
				</el-input>
			</div>
			<div class="clear10"></div>
			<div id="myMap" style="height: 500px;width: 100%;"></div>
			<div slot="footer" class="dialog-footer">
				<!--{{HprovinceName+':'+HcityName+':'+HareaName+':'+HbuildName+':'+Hfloor+'层::'+roomText}}-->
				<el-button @click="cancelMapDialog">取 消</el-button>
				<el-button type="primary" @click="inputCoordinateToBuildingGroup">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import gUrl from '@/assets/js/gUrl'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				buildDisc: '', //楼盘1
				buildingName: '', //写字楼名称2
				buildingAcreage: '', //写字楼面积3
				coordinate: '', //写字楼经纬度，用于显示
				longitude: '', //写字楼经度，用于传参
				latitude: '', //写字楼纬度，用于传参
				buildingLayerNum: '', //楼层数4
				buildingLayerAcreage: '', //楼层面积11
				landTopNum: '', //地上层数5
				landBottomNum: '', //地下层数6
				layerRoomNum: '', //每层房间数7
				elevatorNum: '', //电梯数量8
				guestElevatorNum: '', //客梯数量10
				goodsElevatorNum: '', //货梯数量9
				textarea: '', //大楼描述12
				startRoomNum: '', //开始层数13
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				upLoadData: { //图片上传参数
					file: '',
					type: 'company',
					objectId: 0
				},
				imageUrls: '', //放大 图片存放的地址
				dialogVisible: false, //图片放大
				buildDiscList: [], //楼盘列表,
				hallPath: [], //大厅图片
				elePath: [], //电梯布局
				/*
				 * 地图插件部分变量
				 * */
				imgUrl: require("@/assets/images/public/coordinateIcon.png"),
				//控制地图选择框的差距
				dialogVisibleMap: false,
				//控制经纬度选择框是否能够填写内容。默认为false
				ifCheckNoChange: false,
				//经纬度选择提示语
				coordinateTipContent: '请选择楼盘所在区域',
				//临时纬度
				tempLatitude: '',
				//临时经度
				tempLngitude: '',
				//地图对象
				map: '',
				//地图的标记
				marker: null,
				//地图标题提示语
				mapTips: '根据您所选择的楼盘所在区域以及写字楼名称，为您搜索并定位到以下坐标。您可以点击地图或者拖动图标进行修改',
			}
		},
		created() {
			this.getBuildingGroup() //获取楼盘 下拉框数据
		},
		computed: {
			coordinateFlag: function() {
				let re = false;
				if(this.buildDisc == '' || this.buildDisc == undefined) {
					this.coordinateTipContent = '请选择楼盘';
					re = true;
				} else if(this.buildingName == '' || this.buildingName == undefined) {
					this.coordinateTipContent = '请填写写字楼名称';
					re = true;
				}
				return re;
			},
			currentBuildingGroupInfo: function() {
				let temp = {};
				for(let o in this.buildDiscList) {
					if(this.buildDiscList[o].buildingGroupId == this.buildDisc) {
						temp.buildingGroupId = this.buildDiscList[o].buildingGroupId;
						temp.buildingGroupName = this.buildDiscList[o].buildingGroupName;
						temp.province = this.buildDiscList[o].province ? this.buildDiscList[o].province : '';
						temp.city = this.buildDiscList[o].city ? this.buildDiscList[o].city : '';
						temp.area = this.buildDiscList[o].area ? this.buildDiscList[o].area : '';
					}
				}
				return temp;
			}
		},
		methods: {
			//计算楼层数=地上+地下层数
			Summing() {
				return(Number(this.landTopNum) + Number(this.landBottomNum)) ? (Number(this.landTopNum) + Number(this.landBottomNum)) : 0
			},
			//提交
			addClick() {
				if(this.buildDisc == '') {
					this.$message({
						showClose: true,
						message: '请选择楼盘',
						type: 'error'
					})
				} else if(this.buildingName == '') {
					this.$message({
						showClose: true,
						message: '请输入写字楼名称',
						type: 'error'
					})
				} else {
					this.$httpPasser.post('/newBuilding/addBuilding', {
							buildingGroupId: this.buildDisc, //楼盘Id1
							buildingName: this.buildingName, //写字楼名字2
							latitude: this.latitude, //写字楼坐标
							lngitude: this.lngitude, //写字楼坐标
							areaSize: this.buildingAcreage, //面积3
							floorNum: this.Summing(), //地上+地下
							overNum: this.landTopNum, //地上层数5
							underNum: this.landBottomNum, //地下层数6
							floorRoomNum: this.layerRoomNum, //每层房间数7
							startNum: this.startRoomNum, //自动生成房间开始层数13
							elevator: this.elevatorNum, //电梯总数8
							goodsElevator: this.goodsElevatorNum, //货梯数9
							customerElevator: this.guestElevatorNum, //客梯数10
							floorSize: this.buildingLayerAcreage, //每层面积11
							info: this.textarea, //描述12
							hallPath: this.hallPath, //大厅布局图
							elePath: this.elePath, //电梯布局图
						})
						.then((res) => {
							let data = res.data
							if(data.resultCode == '200') {
								this.$message({
									showClose: true,
									message: '添加成功',
									type: 'success'
								});
								this.backHandle()
							} else {
								this.$message({
									showClose: true,
									message: data.resultCodeDesc,
									type: 'error'
								});
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			//获取楼盘 下拉框数据
			getBuildingGroup() {
				let shopId = this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : ''
				this.$httpPasser.post('/newBuilding/getBuildingGroup', {
						shopId, //公司Id
					})
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.buildDiscList = data.result
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//获取经纬度的方法
			getCoordinate() {
				if(this.buildDisc == '' || this.buildDisc == undefined) {
					this.$message.warning('请先选择楼盘所在区域')
				} else if(this.buildingName == '' || this.buildingName == undefined) {
					this.$message.warning('请先填写楼盘名称')
				} else {
					this.dialogVisibleMap = true;
				}
			},
			//返回
			backHandle() {
				this.$router.back()
			},
			//图片上传之前限制
			beforeAvatarUpload(file) { //图片上传之前限制
				this.upLoadData.file = file
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt10M = file.size / 1024 / 1024 < 10
				if(!isJPG && !isPNG) {
					this.$message({
						showClose: true,
						message: '上传照片必须是JPG/PNG格式!',
						type: 'error'
					});
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: '上传图片大小不能超过 10MB!',
						type: 'error'
					})
				}
				return(isJPG || isPNG) && isLt10M;
			},
			//图片放大
			handlePictureCardPreview(file) {
				this.imageUrls = file.url;
				this.dialogVisible = true;
			},
			//图片上传成功之后的函数 大厅
			uploadSuccessgs(response, file, fileList) {
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.hallPath = []
					for(var i = 0; i < fileList.length; i++) {
						this.hallPath[i] = fileList[i].response.result
					}
					// console.log(this.hallPath)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			//大厅图片删除
			handleRemovegs(file, fileList) {
				this.hallPath = []
				for(var i = 0; i < fileList.length; i++) {
					this.hallPath[i] = fileList[i].response.result
				}
			},
			//图片上传成功之后的函数 电梯
			uploadSuccessgs2(response, file, fileList) {
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.elePath = []
					for(var i = 0; i < fileList.length; i++) {
						this.elePath[i] = fileList[i].response.result
					}
					// console.log(this.hallPath)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			//电梯图片删除
			handleRemovegs2(file, fileList) {
				this.elePath = []
				for(var i = 0; i < fileList.length; i++) {
					this.elePath[i] = fileList[i].response.result
				}
			},
			//限制上传的图片数量
			handleExceed() {
				this.$message({
					showClose: true,
					message: '图片上传数量超过限制',
					type: 'error'
				});
			},
			/*
			 * 地图插件部分的方法
			 * 功能：在用户选择了区域，添加了楼盘地址的情况下才会调用地图插件
			 * 根据用户填写的区域和楼盘地址，给用户一个初步的定位，并且返回坐标信息。
			 * 如果用户认为坐标不准确，可以根据自己的需要再重新选择坐标
			 * */
			/*
			 地图覆盖物部分的核心内容
			 * */
			//打开dialog回调
			openMapDialog() {
				this.$nextTick(() => {
					this.initMap()
				})
			},
			//写入经纬度数据到楼盘对象
			inputCoordinateToBuildingGroup() {
				this.coordinate = this.tempLatitude + "," + this.tempLngitude;
				this.longitude = this.tempLngitude;
				this.latitude = this.tempLatitude;
				this.dialogVisibleMap = false;
			},
			//取消经纬度选择
			cancelMapDialog() {
				this.tempLatitude = '';
				this.tempLngitude = '';
				this.dialogVisibleMap = false;
			},
			//初始化地图
			initMap() {
				this.map = new BMap.Map("myMap", {
					enableMapClick: false
				});
				this.map.centerAndZoom("郑州市", 12);
				this.map.enableScrollWheelZoom(true);
				//添加地图标尺
				/*        let bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
				        let bottom_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});  //左上角，添加默认缩放平移控件
				        let bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL});
				        this.map.addControl(bottom_left_control);
				        this.map.addControl(bottom_left_navigation);
				        this.map.addControl(bottom_right_navigation);*/
				//设置地图可以拖拽
				this.map.enableDragging();
				//根据用户选择获取行政区划边界
				var bdary = new BMap.Boundary()
				let local = new BMap.LocalSearch(this.map, {
					renderOptions: {
						map: this.map
					}
				});
				let marker = null;
				//根据选择的地区和楼盘名称进行搜索
				let content = this.currentBuildingGroupInfo.province + this.currentBuildingGroupInfo.city + this.currentBuildingGroupInfo.area + this.currentBuildingGroupInfo.buildingGroupName + this.buildingName
				console.log('是什么', content);
				local.search(content);
				let myIcon = new BMap.Icon(this.imgUrl, new BMap.Size(60, 60));
				local.setSearchCompleteCallback(() => {
					//将搜索结果赋值给当前搜索结果
					let searchResult = local.getResults().Ar ? local.getResults().Ar : local.getResults().Br;
					if(searchResult) {} else {
						console.error('看看百度是不是又修改参数名称了')
					}
					if(searchResult && searchResult.length > 0) {
						//根据搜索结果的第一条，添加地图标记
						let defaultPoint = searchResult[0].point;
						this.marker = new BMap.Marker(defaultPoint, {
							icon: myIcon
						});
						this.marker.setTop(true)
						this.marker.enableDragging();
						this.tempLngitude = defaultPoint.lng
						this.tempLatitude = defaultPoint.lat
						this.marker.addEventListener('dragend', () => {
							let dragendPoint = this.marker.getPosition();
							this.tempLngitude = dragendPoint.lng
							this.tempLatitude = dragendPoint.lat
						})
						this.map.clearOverlays();
						this.map.addOverlay(this.marker)
					} else {
						this.map.centerAndZoom(this.currentBuildingGroupInfo.city.name, 12);
						this.marker = new BMap.Marker(this.map.getCenter(), {
							icon: myIcon
						});
						this.marker.setTop(true)
						this.marker.enableDragging();
						this.marker.setPosition(this.map.getCenter())
						this.marker.addEventListener('dragend', () => {
							let dragendPoint = this.marker.getPosition();
							this.tempLngitude = dragendPoint.lng
							this.tempLatitude = dragendPoint.lat
						})
						this.map.clearOverlays();
						this.map.addOverlay(this.marker)
						this.mapTips = '无法在您选择的区域内，查询到您所输入的楼盘，自动定位到城市中央。请您点击地图或者拖动图标，选择坐标'
					}

				})
				/*        //添加拖拽事件监听
				        this.map.addEventListener("dragend",(evt)=>{

				        });

				        //添加移动事件监听
				        this.map.addEventListener("moveend", (evt)=>{
				        })
				        //监听缩放开始事件
				        this.map.addEventListener("zoomstart",function(){
				          //that.originalZoom = that.map.getZoom();
				        })
				        //添加缩放事件
				        this.map.addEventListener("zoomend", (evt)=>{
				        });*/
				//添加点击事件
				this.map.addEventListener("click", (evt) => {
					this.marker.setPosition(evt.point)
					this.tempLngitude = evt.point.lng
					this.tempLatitude = evt.point.lat
				});
			},
		}
	}
</script>
<style lang="less" scoped>
	.addbuilding {
		.back {
			margin-bottom: 30px;
			.back-link {
				font-size: 16px;
				margin-right: 18px;
			}
			span {
				font-size: 16px;
			}
		}
		.w450 {
			width: 450px;
		}
		.w280 {
			width: 280px;
		}
		.w320 {
			margin-right: -40px;
		}
		.item {
			margin-bottom: 10px;
		}
		.company {
			line-height: 40px;
			font-size: 14px;
			margin-left: 5px;
		}
		.iten-text {
			line-height: 40px;
			width: 100px;
			text-align: right;
			margin-right: 20px;
			font-size: 14px;
			color: #606266;
		}
		.imgbox {
			margin-left: 120px;
		}
		.overBtn {
			padding-top: 20px;
			padding-left: 120px;
		}
		.lh40 {
			line-height: 40px;
			font-size: 14px;
		}
	}
</style>
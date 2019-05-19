<template>
	<div class="editBuilding">
		<div class="back">
			<el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
			<span style="margin-left:20px;font-size:15px;">编辑写字楼</span>
		</div>
		<div class="edit-build-box clearfix">
			<div class="edit-box clearfix">
				<div class="fl wleft">
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">楼盘</div>
						<div class="fl w280">
							<div class="editinfo fl lh40">{{detailsData.buildingGroupName}}</div>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">写字楼名称</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.buildingName" placeholder="请输入写字楼名称" clearable></el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">写字楼经纬度</div>
						<div class="fl w280">
							<el-tooltip v-if="coordinateFlag" class="item" effect="light" :content="coordinateTipContent" placement="top-start">
								<el-input placeholder="经纬度" :disabled=true v-model="detailsData.coordinate" @focus="getCoordinate"></el-input>
							</el-tooltip>
							<el-input v-if="!coordinateFlag" placeholder="经纬度" v-model="detailsData.coordinate" @focus="getCoordinate"></el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">写字楼面积</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.areaSize" placeholder="请输入内容" clearable></el-input>
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
							<el-input v-model.trim="detailsData.overNum" placeholder="请输入地上层数" clearable></el-input>
						</div>
						<div class="company fl">层</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">地下层数</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.underNum" placeholder="请输入地下层数" clearable></el-input>
						</div>
						<div class="company fl">层</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">楼层数</div>
						<div class="fl w280 lh40">
							{{this.Summing()}}
						</div>
						<div class="company fl">层</div>
					</div>
					<!--<div class="item clearfix">
              <div class="iten-text fl">房间数</div>
              <div class="fl w280">
                <el-input v-model.trim="detailsData.roomNum" placeholder="请输入每层房间数"></el-input>
              </div>
              <div class="company fl">个</div>
            </div>-->
					<!---->
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

					<!---->
					<div class="item clearfix">
						<div class="iten-text fl">电梯数量</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.elevator" placeholder="请输入电梯数量" clearable></el-input>
						</div>
						<div class="company fl">部</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">客梯数量</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.customerElevator" placeholder="请输入客梯数量" clearable></el-input>
						</div>
						<div class="company fl">部</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">货梯数量</div>
						<div class="fl w280">
							<el-input v-model.trim="detailsData.goodsElevator" placeholder="请输入货梯数量" clearable></el-input>
						</div>
						<div class="company fl">部</div>
					</div>
				</div>
				<div class="fl wright">
					<div class="item clearfix">
						<div class="iten-text  fl">写字楼描述</div>
						<div class="fl w280">
							<el-input class="width280" type="textarea" :autosize="{ minRows:4, maxRows:4}" placeholder="请输入内容" v-model="detailsData.info" clearable>
							</el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text  fl">大厅图片</div>
						<div class="imgbox">
							<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="detailsData.hallPath">
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
							<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs2" :on-remove="handleRemovegs2" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="detailsData.elePath">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="imageUrls" alt="">
							</el-dialog>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ele-center">
			<el-button type="primary" @click="sureEdit">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
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
	import getUrl from '@/assets/js/global'
	import gUrl from '@/assets/js/gUrl'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				buildingGroupId: '', //楼盘ID
				layerRoomNum: '',
				startRoomNum: '',
				buildingLayerAcreage: '',
				//写字楼详情
				detailsData: {
					buildingGroupName: '',
					buildingName: '',
					coordinate: '', //写字楼经纬度，用于显示
					longitude: '', //写字楼经度，用于传参
					latitude: '', //写字楼纬度，用于传参
					areaSize: '',
					floorNum: '',
					overNum: '',
					underNum: '',
					roomNum: '',
					elevator: '',
					customerElevator: '',
					goodsElevator: '',
					info: '',
					hallPath: [],
					elePath: []
				},
				newhallPath: [],
				newelePath: [],
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				upLoadData: { //图片上传参数
					file: '',
					type: 'company',
					objectId: 0
				},
				imageUrls: '', //放大 图片存放的地址
				dialogVisible: false, //图片放大
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
			}
		},
		computed: {
			coordinateFlag: function() {
				let re = false;
				if(this.detailsData.latitude !== '' && this.detailsData.longitude !== '') {
					this.detailsData.coordinate = this.detailsData.latitude + ',' + this.detailsData.longitude;
				}
				if(this.detailsData.buildingGroupName == '' || this.detailsData.buildingGroupName == undefined) {
					this.coordinateTipContent = '请选择楼盘';
					re = true;
				} else if(this.detailsData.buildingName == '' || this.detailsData.buildingName == undefined) {
					this.coordinateTipContent = '请填写写字楼名称';
					re = true;
				}
				return re;
			},
			//地图标题提示语
			mapTips: function() {
				let re = '您可以点击地图或者拖动图标来更改写字楼坐标';
				if(this.detailsData.latitude == '' || this.detailsData.longitude == '') {
					re = '根据楼盘所在区域以及写字楼名称，为您搜索并定位到以下坐标。您可以点击地图或者拖动图标进行修改'
				}
				return re;
			}
		},
		methods: {
			//返回
			backHandle() {
				this.$router.back()
			},
			//计算楼层数=地上+地下层数
			Summing() {
				return(Number(this.detailsData.overNum) + Number(this.detailsData.underNum)) ? (Number(this.detailsData.overNum) + Number(this.detailsData.underNum)) : 0
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
			//限制上传的图片数量
			handleExceed() {
				this.$message({
					showClose: true,
					message: '图片上传数量超过限制',
					type: 'error'
				});
			},
			//图片上传成功之后的函数 大厅
			uploadSuccessgs(response, file, fileList) {
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.newhallPath.push(response.result)
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
				this.newhallPath = []
				for(var i = 0; i < fileList.length; i++) {
					if(fileList[i].response) {
						this.newhallPath.push(fileList[i].response.result)
					} else {
						this.newhallPath.push(fileList[i].url.split(this.gImgUrl)[1])
					}
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
					this.newelePath.push(response.result)
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
				this.newelePath = []
				for(var i = 0; i < fileList.length; i++) {
					if(fileList[i].response) {
						this.newelePath.push(fileList[i].response.result)
					} else {
						this.newelePath.push(fileList[i].url.split(this.gImgUrl)[1])
					}
				}
			},
			//编辑保存
			sureEdit() {
				this.$httpPasser.post('/newBuilding/editBuilding', {
						buildingGroupId: this.buildingGroupId,
						buildingId: this.$route.query.buidId,
						buildingName: this.detailsData.buildingName,
						latitude: this.detailsData.latitude,
						longitude: this.detailsData.longitude,
						areaSize: this.detailsData.areaSize,
						floorNum: this.Summing(),
						info: this.detailsData.info,
						overNum: this.detailsData.overNum,
						underNum: this.detailsData.underNum,
						floorRoomNum: this.layerRoomNum, //每层房间数
						startNum: this.startRoomNum, //开始层数
						elevator: this.detailsData.elevator,
						goodsElevator: this.detailsData.goodsElevator,
						customerElevator: this.detailsData.customerElevator,
						hallPath: this.newhallPath,
						elePath: this.newelePath,
						floorSize: this.buildingLayerAcreage,
					})
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.$message({
								showClose: true,
								message: '编辑成功',
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
			//获取经纬度的方法
			getCoordinate() {
				if(this.detailsData.buildingGroupName == '' || this.detailsData.buildingGroupName == undefined) {
					this.$message.warning('请先选择楼盘所在区域')
				} else if(this.detailsData.buildingName == '' || this.detailsData.buildingName == undefined) {
					this.$message.warning('请先填写楼盘名称')
				} else {
					this.dialogVisibleMap = true;
				}
			},
			openMapDialog() {
				this.$nextTick(() => {
					this.initMap()
				})
			},
			//写入经纬度数据到楼盘对象
			inputCoordinateToBuildingGroup() {
				this.detailsData.coordinate = this.tempLatitude + "," + this.tempLngitude;
				this.detailsData.longitude = this.tempLngitude;
				this.detailsData.latitude = this.tempLatitude;
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
				let marker = null;
				let myIcon = new BMap.Icon(this.imgUrl, new BMap.Size(60, 60));
				if(this.detailsData.latitude !== '' && this.detailsData.longitude !== '') {
					this.tempLatitude = this.detailsData.latitude;
					this.tempLngitude = this.detailsData.longitude
					let point = new BMap.Point(parseFloat(this.detailsData.longitude), parseFloat(this.detailsData.latitude));
					this.map.centerAndZoom(point, 16);
					this.marker = new BMap.Marker(point, {
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
				} else {
					let local = new BMap.LocalSearch(this.map, {
						renderOptions: {
							map: this.map
						}
					});
					let content = '';
					//根据选择的地区和楼盘名称进行搜索
					if(this.detailsData.buildingGroupName == this.detailsData.buildingName) {
						content = this.detailsData.province + this.detailsData.city + this.detailsData.area + this.detailsData.buildingGroupName;
					} else {
						content = this.detailsData.province + this.detailsData.city + this.detailsData.area + this.detailsData.buildingGroupName + this.detailsData.buildingName;
					}
					local.search(content);
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
							this.map.centerAndZoom(this.detailsData.city.name, 12);
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
				}

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
		},
		created() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
				let ids = this.$route.query.buidId
				this.$httpPasser.post('/newBuilding/getBuildingInfo', {
						buildingId: ids
					})
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							console.log(data.result)
							this.buildingGroupId = data.result.buildingGroupId
							this.detailsData.buildingGroupName = data.result.buildingGroupName
							this.detailsData.latitude = data.result.latitude
							this.detailsData.longitude = data.result.longitude
							this.detailsData.buildingName = data.result.name
							this.detailsData.province = data.result.province
							this.detailsData.area = data.result.area
							this.detailsData.city = data.result.city
							this.detailsData.areaSize = data.result.areaSize
							this.detailsData.floorNum = data.result.floorNum
							this.detailsData.overNum = data.result.overNum
							this.detailsData.underNum = data.result.underNum
							this.detailsData.roomNum = data.result.roomNum
							this.detailsData.elevator = data.result.elevator
							this.detailsData.customerElevator = data.result.customerElevator
							this.detailsData.goodsElevator = data.result.goodsElevator
							this.detailsData.info = data.result.info

							this.newhallPath = data.result.hallPath
							this.newelePath = data.result.elePath
							for(var i = 0; i < data.result.hallPath.length; i++) {
								this.detailsData.hallPath.push({
									"url": this.gImgUrl + data.result.hallPath[i]
								})
							}

							for(var j = 0; j < data.result.elePath.length; j++) {
								this.detailsData.elePath.push({
									"url": this.gImgUrl + data.result.elePath[j]
								})
							}
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
			})
		},
	}
</script>
<style lang="less" scoped>
	.editBuilding {
		.iten-text {
			font-size: 14px;
			color: #606266;
		}
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
		.edit-build-box {
			.edit-box {
				.wleft {
					width: 400px;
				}
				.wright {
					width: 540px;
				}
				.item {
					margin-bottom: 10px;
				}
				.iten-text {
					width: 100px;
					margin-right: 10px;
					text-align: right;
					line-height: 40px;
				}
				.company {
					line-height: 40px;
				}
				.w280 {
					width: 250px;
				}
				.width280 {
					width: 320px;
				}
				.imgbox {
					margin-left: 120px;
				}
				.company {
					line-height: 40px;
					font-size: 14px;
					margin-left: 5px;
				}
			}
		}
		.editinfo {
			width: 280px;
			margin-left: 20px;
			font-size: 14px;
			line-height: 1.5;
		}
		.lh40 {
			line-height: 40px;
		}
		.ele-center {
			padding: 20px;
			text-align: center;
		}
	}
</style>
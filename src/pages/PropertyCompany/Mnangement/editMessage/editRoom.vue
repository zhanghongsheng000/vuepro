<template>
	<div class="editBuilding">
    <div class="back">
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandle">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">编辑房间</span>
    </div>
		<div class="edit-build-box clearfix">
			<div class="edit-box clearfix">
				<div class="fl wleft">
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">楼层</div>
						<div class="fl w280">
							<div class="editinfo fl lh40">{{roomInfo.floorName}}</div>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">房间名称</div>
						<div class="fl w280">
							<el-input v-model.trim="roomInfo.roomName" placeholder="请输入房间名称" clearable>
								<template slot="append">房间</template>
							</el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">房间面积</div>
						<div class="fl w280">
							<el-input v-model.trim="roomInfo.areaSize" placeholder="请输入房间面积" clearable>
								<template slot="append">㎡</template>
							</el-input>
						</div>
					</div>
					<div class="item  clearfix">
						<div class="iten-text beforesiteml fl">房间租金</div>
						<div class="fl w280">
							<el-input v-model.trim="roomInfo.price" placeholder="请输入房间价格" clearable>
								<template slot="append">元/㎡/天</template>
							</el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">是否特价</div>
						<div class="fl w280 lh40">
							<el-radio v-model="roomInfo.specialPrice" label="Y">是</el-radio>
							<el-radio v-model="roomInfo.specialPrice" label="N">否</el-radio>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">装修状况</div>
						<div class="fl w280">
							<el-select class="w280" v-model="roomInfo.fitment" placeholder="请选择状况">
								<el-option v-for="item,index in xiuList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">房屋朝向</div>
						<div class="fl w280 lh40">
							<el-select class="w280" v-model="roomInfo.orient" placeholder="请选择状况">
                <el-option v-for="item,index in xiangList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
                </el-option>
							</el-select>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text beforesiteml fl">付费方式</div>
						<div class="fl w280">
							<el-select class="w280" v-model="roomInfo.payModelId" placeholder="请选择付费方式">
								<el-option v-for="item,index in feiList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">房屋配置</div>
						<div class="fl w280">
							<el-input type="textarea" :rows="2" placeholder="请输入房屋套配内容" v-model="roomInfo.suite" clearable>
							</el-input>
						</div>
					</div>
				</div>
				<!---->
				<div class="fl wright">
					<div class="item clearfix">
						<div class="iten-text fl">房间详情</div>
						<div class="fl w280">
							<el-input type="textarea" :rows="2" placeholder="请输入房间详情" v-model="roomInfo.info" clearable>
							</el-input>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text  fl">房屋照片</div>
						<div class="imgbox">
							<el-upload ref="uploads1"
                         :action="importFileUrl"
                         :data="upLoadData"
                         :beforeUpload="beforeAvatarUpload"
                         :on-preview="handlePictureCardPreview"
                         :on-success="uploadSuccessgs"
                         :on-remove="handleRemovegs" list-type="picture-card" :limit="10"
                         :on-exceed="handleExceed" :file-list="roomInfo.roomPic">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="imageUrls" alt="">
							</el-dialog>
						</div>
					</div>
					<div class="item clearfix">
						<div class="iten-text fl">户型照片</div>
						<div class="imgbox">
							<el-upload ref="uploads1"
                         :action="importFileUrl"
                         :data="upLoadData"
                         :beforeUpload="beforeAvatarUpload"
                         :on-preview="handlePictureCardPreview"
                         :on-success="uploadSuccessgs2"
                         :on-remove="handleRemovegs2"
                         list-type="picture-card"
                         :limit="10"
                         :on-exceed="handleExceed"
                         :file-list="roomInfo.layoutPic">
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
			<el-button type="danger" @click="onePointBusiness">一键招商</el-button>
		</div>
	</div>
</template>
<script>
	import getUrl from '@/assets/js/global'
	import gUrl from '@/assets/js/gUrl'
	import { $gPasserUrl } from '@/assets/js/gUrl'

	export default {
		data() {
			return {
        roomId: this.$local.sefetch("buildingMessage").buildingRoomId,
        buildingId:this.$local.sefetch("buildingMessage").buildingId,
        buildingFloorId:this.$local.sefetch("buildingMessage").buildingFloorId,
        buildingGroupId:this.$local.sefetch("buildingMessage").buildingGroupId,
				layerRoomNum: '',
				startRoomNum: '',
				buildingLayerAcreage: '',
				//写字楼详情
				detailsData: {
					hallPath: [],
					elePath: [],
          floorNum:''
				},
				roomInfo: {
					buildingFloorNum: '',
					floorName: '',
					roomName: '',
					areaSize: '',
					price: '',
					fitment: '',
					fitmentDesc: '',
					specialPrice: '',
					payModelId: '',
					payModelDesc: '',
					info: '',
					suite: '',
					orient: '',
					orientDesc: '',
					roomPic: [],
					layoutPic: []
				},
				roomPic: [],
				layoutPic: [],
				newhallPath: [],
				newelePath: [],
				xiuList: [], //装修状况
				xiangList: [], //朝向
				feiList: [], //付费方式
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				upLoadData: { //图片上传参数
					file: '',
					type: 'company',
					objectId: 0
				},
				imageUrls: '', //放大 图片存放的地址
				dialogVisible: false, //图片放大
			}
		},
		methods: {
			//返回
			backHandle() {
				this.$router.push("./editBuilding")
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
					this.roomPic.push(response.result)
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
					this.layoutPic.push(response.result)
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
      //编辑确定
      sureEdit() {
        if(this.roomInfo.roomName == '') {
          this.$message({
            showClose: true,
            message: '请输入房名称',
            type: 'error'
          });
        } else {
          this.$httpPasser.post('/buildingRoom/updateBuildingRoom', {
            buildingFloorId: this.buildingFloorId,
            buildingRoomId: this.roomId, //房间id
            buildingFloorNum: this.roomInfo.buildingFloorNum, //楼层号
            roomName: this.roomInfo.roomName, //房间名称
            areaSize: this.roomInfo.areaSize, //房间面积
            price: this.roomInfo.price, //价格
            fitment: this.roomInfo.fitment, //装修情况
            specialPrice: this.roomInfo.specialPrice, //是否特价
            payModelId: this.roomInfo.payModelId, //付费方式
            suite: this.roomInfo.suite, //房间配套
            orient: this.roomInfo.orient, //房间朝向
            roomPic: this.roomPic.length ? this.roomPic : '', //房间照片
            layoutPic: this.layoutPic.length ? this.layoutPic : '', //户型图片
            info: this.roomInfo.info, //房间详情
          })
            .then(res => {
              const data = res.data
              if(data.resultCode == '200') {
                this.$message({
                  showClose: true,
                  message: '编辑成功',
                  type: 'success'
                });
                this.dialogVisible1 = false;
              } else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
                this.dialogVisible1 = false;
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
			//付费方式
			getfei() {
				this.$httpPasser.post('/baseDic/getPayModelId')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.feiList = data.result
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
			//朝向
			getxiang() {
				this.$httpPasser.post('baseDic/getOrient')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.xiangList = data.result
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
			//装修
			getxiu() {
				this.$httpPasser.post('/baseDic/getFitment')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.xiuList = data.result
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
      //根据房间id获取房间信息
      byIdgetRoomIofo() {
        this.$httpPasser.post('buildingRoom/getBuildingRoomDetail', {
          buildingRoomId: this.roomId
        })
          .then(res => {
            const data = res.data
            if(data.resultCode == '200') {
              this.buildingRoomId = data.result.buildingRoomId
              this.buildingFloorId = data.result.buildingFloorId
              this.roomInfo.buildingFloorNum = data.result.buildingFloorNum
              this.roomInfo.floorName = data.result.floorName
              this.roomInfo.roomName = data.result.roomName
              this.roomInfo.areaSize = data.result.areaSize
              this.roomInfo.price = data.result.price
              this.roomInfo.fitment = data.result.fitment ? data.result.fitment.toString() : ''
              this.roomInfo.fitmentDesc = data.result.fitmentDesc

              this.roomInfo.specialPrice = data.result.specialPrice
              this.roomInfo.payModelId = data.result.payModelId ? data.result.payModelId.toString() : '' //付费方式
              this.roomInfo.payModelDesc = data.result.payModelDesc //付费方式
              /*for(var i=0;i<this.feiList.length;i++){
                              if(this.feiList[i].dictionariesValue==data.result.fitment){
                                this.roomInfo.payModelId=this.feiList[i].dictionariesName
                              }
                            }*/
              this.roomInfo.info = data.result.info
              this.roomInfo.suite = data.result.suite
              this.roomInfo.orient = data.result.orient.toString() //朝向
              this.roomInfo.orientDesc = data.result.orientDesc //朝向
              /*for(var i=0;i<this.xiangList.length;i++){
                              if(this.xiangList[i].dictionariesValue==data.result.orient){
                                this.roomInfo.orient=this.xiangList[i].dictionariesName
                              }
                            }*/
              this.roomPic = data.result.roomPic
              //this.roomInfo.roomPic = []
              for(var i = 0; i < data.result.roomPic.length; i++) {
                this.roomInfo.roomPic.push({
                  "url": this.gImgUrl + data.result.roomPic[i]
                })
              }

              this.layoutPic = data.result.layoutPic
              //this.roomInfo.layoutPic = []
              for(var j = 0; j < data.result.layoutPic.length; j++) {
                this.roomInfo.layoutPic.push({
                  "url": this.gImgUrl + data.result.layoutPic[j]
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
      },
			//招商
			onePointBusiness() {
        this.$httpPasser.post("attractInvestment/keyInvestment",{
          buildingRoomId:this.roomId,
          buildingGroupId:this.buildingGroupId,
          buildingId:this.buildingId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success(res.data.result)
          }else{
            this.$message.error(res.data.resultCodeDesc)
          }
        })
			}
		},
		created() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
				this.$httpPasser.post('newBuilding/getBuildingInfo', {
						buildingId: this.buildingId
					})
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.buildingGroupId = data.result.buildingGroupId
							this.detailsData.buildingGroupName = data.result.buildingGroupName
							this.detailsData.buildingName = data.result.name
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
							//							9.21日注释
							//							this.$message({
							//								showClose: true,
							//								message: data.resultCodeDesc,
							//								type: 'error'
							//							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			})
			this.getfei();
			this.getxiang();
			this.getxiu();
      this.byIdgetRoomIofo()
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
					width: 430px;
				}
				.wright {
					margin-top: 10px;
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
					width: 270px;
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

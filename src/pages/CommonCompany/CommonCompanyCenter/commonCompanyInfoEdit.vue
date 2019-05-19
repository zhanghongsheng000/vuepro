<template>
	<div id="commonCompanyInfoEdit">
		<div class="top-title">
			<div class="line"></div>
			<span class="top-text font14">编辑企业信息</span>
		</div>
		<el-form :model="companyInfo" :rules="rules" ref="companyInfo">
			<div class="items clearfix">
				<div class="item-text fl">公司名称:</div>
				<div class="item-ipt fl">
					<el-input v-model.trim="companyInfo.shopName" placeholder="请输入公司名称" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">公司实际经营地址:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.BuildingRoom" placeholder="请选择公司实际经营地址" @focus="showChosingDialog()"></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">营业执照地址:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.address" placeholder="请填写公司经营地址" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">统一社会信用代码:</div>
				<div class="item-ipt fl">
					<el-input v-model.trim="companyInfo.licensenumber" placeholder="请输入公司统一社会信用代码" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">营业执照照片:</div>
				<div class="item-ipt fl" id="addrent">
					<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-success="uploadSuccessgsLegalFront" :show-file-list="false">
						<img v-if="companyInfo.licensenumberPicture" :src="gImgUrl+companyInfo.licensenumberPicture" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">业务联系人:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.linkman" placeholder="请输入业务联系人" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">业务联系人电话:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.linkmanTelephone" placeholder="请输入业务联系人电话" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">法人姓名:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.legalperson" placeholder="请输入业务联系人电话" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">法人手机号:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.mobilephone" placeholder="请输入法人手机号" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">法人身份证号:</div>
				<div class="item-ipt fl">
					<el-input v-model="companyInfo.idcardcode" placeholder="请输入法人身份证号" clearable></el-input>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">法人身份证正面照片:</div>
				<div class="item-ipt fl" id="addrent2">
					<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-success="uploadSuccessgsIdFront" :show-file-list="false">
						<img v-if="companyInfo.idcardFrontPicture" :src="gImgUrl+companyInfo.idcardFrontPicture" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</div>
			<div class="items clearfix">
				<div class="item-text fl">法人身份证反面照片:</div>
				<div class="item-ipt fl" id="addrent3">
					<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-success="uploadSuccessgsIdBack" :show-file-list="false">
						<img v-if="companyInfo.idcardBackPicture" :src="gImgUrl+companyInfo.idcardBackPicture" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</div>
		</el-form>
		<div id="saveButton">
			<el-button type="primary" @click="submitEdit">保存</el-button>
		</div>

		<el-dialog title="选择房间" :visible.sync="dialogVisibleRoom" :modal-append-to-body='false' width="60%">
			<choseRoomFromMuiltyFloorEdit @roomParams="roomParams" isCanAddRoom='true' :buildingFloorRoomData="companyInfo.BuildingRoomList" v-if="hackReset"></choseRoomFromMuiltyFloorEdit>
		</el-dialog>
	</div>
</template>

<script>
	import choseRoomFromMuiltyFloorEdit from '@/components/public/choseRoomFromMuiltyFloorEdit'
	import buildingCascader from '@/components/public/buildingCascader'
	import gUrl from '@/assets/js/gUrl'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	import getUrl from '@/assets/js/global'

	export default {
		name: "common-company-info-edit",
		data() {
			return {
				//图片地址
				gImgUrl: "",
				//上传图片接口
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				//图片上传参数
				upLoadData: {
					file: '',
					type: 'company',
					objectId: 0
				}, //图片上传参数
				companyInfo: {
					buildingRooms: '',
					shopId: '',
					roomList: [],
					shopName: '',
					shortname: '',
					address: '',
					licensenumber: '',
					licenseNumberPicture: '',
					linkman: '',
					linkmanTelephone: '',
					legalperson: '',
					mobilephone: '',
					idcardcode: '',
					idcardFrontPicture: '',
					idcardBackPicture: '',
				},
				hackReset: false,
				//从服务器获取的房间列表数据
				floorRoomList: [],
				rules: {
					customerName: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '姓名长度在 1 到 10 个字符',
							trigger: 'blur'
						}
					],
					buildingRoomName: [{
						required: true,
						message: '请选择房间',
						trigger: 'submit'
					}],
					mobilephone: [{
							required: true,
							message: '输入手机号码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '手机号码长度为11位',
							trigger: 'blur'
						}
					]
				},
				dialogVisibleRoom: false
			}
		},
		components: {
			choseRoomFromMuiltyFloorEdit: choseRoomFromMuiltyFloorEdit,
			buildingCascader: buildingCascader
		},
		methods: {
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
			//图片上传成功回调
			uploadSuccessgsIdFront(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.idcardFrontPicture = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			uploadSuccessgsIdBack(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.idcardBackPicture = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			uploadSuccessgsLegalFront(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.licensenumberPicture = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			showChosingDialog() {
				//强制刷新房间组件
				this.refleshRoomComponent()
				this.dialogVisibleRoom = true;
			},
			//强制刷新组件
			refleshRoomComponent() {
				//强制刷新组件
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
			},
			//编辑房间租客时，返回的数据
			roomParams(roomParams) {
				if(roomParams.roomResult && roomParams.roomResult.length > 0) {
					this.companyInfo.buildingRooms = roomParams.address;
					this.companyInfo.roomList = JSON.stringify(roomParams.roomResult)
					this.companyInfo.buildingId = roomParams.buildingId;
					this.dialogVisibleRoom = false;
				} else {
					this.roomInfos = '';
					this.$message.error('请选择至少一个房间')
				}
			},
			//获取公司详情
			getDetailsFromServer() {
				this._httpPasser(
					'/company/getTenantCompanyInfoByShopId',
					'get', {
						shopId: this.$local.sefetch('info').companyId
					},
					(data) => {
						this.companyInfo = data.result;
						//设置必传字段
						if(data.result.BuildingRoomList.length > 0) {
							let tempRoomListArray = []
							let temp = data.result.BuildingRoomList[0].floorList
							for(let o in temp) {
								for(let p in temp[o].roomList) {
									let tempParams = {};
									tempParams.buildingFloorId = temp[o].buildingFloorId;
									tempParams.buildingRoomId = temp[o].roomList[p].buildingRoomId;
									tempParams.roomName = temp[o].roomList[p].buildingRoomName;
									tempRoomListArray.push(tempParams)
								}
							}
							this.companyInfo.roomList = JSON.stringify(tempRoomListArray)
						}
						this.companyInfo.buildingId = data.result.BuildingRoomList[0].buildingId;

					},
					false,
					() => {

					}
				)
			},
			//提交更改
			submitEdit() {
				this._httpPasser(
					'company/editCompanyInfo',
					'post',
					this.companyInfo,
					(data) => {
						this.$store.state.companyName = this.companyInfo.shopName;
						this.$message.success(data.resultCodeDesc)
						this.$router.push('./commonCompanyInfo')
					},
					false,
					() => {
            this.$message.error(data.resultCodeDesc)
					}
				)
			},

			/*通行客工具方法*/
			/*
			 * url 接口方法
			 * type 请求方式 get post
			 * params请求参数
			 * callback200请求成功回调方法
			 * isNoDataWarn是否提示空数据，默认提示
			 * callback204 请求空数据回调 可以不传
			 * */
			_httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
				//默认提示返回信息为空
				if(typeof isNoDataWarn === 'undefined') {
					isNoDataWarn = true;
				}
				if(type == "get") {
					this.$httpPasser.get(
						url, {
							params: params
						}
					).then(
						(response) => {
							let data = response.data;
							if(data.resultCode == 200) {
								callback200(data)
							} else if(data.resultCode == 204) {
								if(isNoDataWarn) {
									this.$message({
										showClose: true,
										message: data.result ? data.result : data.resultCodeDesc,
										type: 'success'
									});
								}
								if(callback204) {
									callback204()
								}
							} else {
								this.$message({
									showClose: true,
									message: data.result ? data.result : data.resultCodeDesc,
									type: 'error'
								});
							}
						}
					).catch(
						(err) => {
							console.log(err)
						}
					)
				} else if(type == "post") {
					this.$httpPasser.post(
						url,
						params
					).then(
						(response) => {
							let data = response.data;
							if(data.resultCode == 200) {
								callback200(data)
							} else if(data.resultCode == 204) {
								if(isNoDataWarn) {
									this.$message({
										showClose: true,
										message: data.result ? data.result : data.resultCodeDesc,
										type: 'success'
									});
								}
								if(callback204) {
									callback204()
								}
							} else {
								this.$message({
									showClose: true,
									message: data.result ? data.result : data.resultCodeDesc,
									type: 'error'
								});
							}
						}
					).catch(
						(err) => {
							console.log(err)
						}
					)
				}

			}
		},
		mounted() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
				this.getDetailsFromServer();
			})
		}
	}
</script>

<style lang="less" scoped>
	#commonCompanyInfoEdit {
		padding: 30px 20px 20px 0;
		font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
		font-size: 14px;
		.item-text {
			width: 300px;
			height: 45px;
			line-height: 45px;
			text-align: right;
		}
		.item-ipt {
			width: 360px;
			min-height: 45px;
			line-height: 45px;
			text-align: right;
			margin-left: 14px;
		}
	}
</style>
<style lang="less">
	#commonCompanyInfoEdit {
		.avatar-uploader {
			text-align: left!important;
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			margin-top: 5px;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 135px;
			height: 95px;
			line-height: 95px;
			text-align: center;
		}
		.avatar {
			width: 135px;
			height: 95px;
			display: block;
		}
		#saveButton {
			.el-button {
				display: block;
				margin-right: auto;
				margin-left: auto;
			}
		}
	}
</style>

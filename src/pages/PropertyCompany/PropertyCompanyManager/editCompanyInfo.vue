<template>
	<div id="editCompanyInfo">
		<div class="nav">
			<el-button type="text" icon="el-icon-arrow-left" @click="toCompanyInfo">返回</el-button>
			<span style="margin-left:20px;font-size:15px;">编辑企业信息</span>
		</div>
		<div class="clear10"></div>
		<el-form :model="companyInfo" ref="companyInfo" label-width="100px" class="demo-ruleForm">
			<div class="left">
				<el-form-item label="公司名称" prop="companyName">
					<el-input placeholder="公司名称" v-model="companyInfo.properoycompanyName" clearable></el-input>
				</el-form-item>
				<el-form-item label="公司简称" prop="companysmpleName">
					<el-input placeholder="公司简称" v-model="companyInfo.properoycompanyShortname" clearable></el-input>
				</el-form-item>
				<el-form-item label="公司电话" prop="companyTelphone">
					<el-input placeholder="公司电话" v-model="companyInfo.properoycompanyTelphone" clearable></el-input>
				</el-form-item>
				<el-form-item label="实际经营地址" prop="companyAddress">
					<el-input v-model="roomInfos" placeholder="请选择公司经营地址" @focus='choseRoomClick'></el-input>
					<!--<el-input v-model="companyInfo.buildingRoomList.roomName" placeholder="请选择公司经营地址" @focus='choseRoomClick'></el-input>-->
				</el-form-item>
				<el-form-item label="营业执照地址" prop="properoycompanyAddress">
					<el-input placeholder="营业执照地址" v-model="companyInfo.properoycompanyAddress" clearable></el-input>
				</el-form-item>
				<el-form-item label="社会统一信用代码" prop="properoycompanyLicensenumber">
					<el-input placeholder="社会统一信用代码" v-model="companyInfo.properoycompanyLicensenumber" clearable></el-input>
				</el-form-item>
				<el-form-item label="营业执照">
					<div class="item-ipt fl" id="addrent">
						<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :limit="1" :on-success="peripheryPicDelete" :show-file-list="false">
							<img v-if="companyInfo.properoycompanyLicensepic" :src="gImgUrl+companyInfo.properoycompanyLicensepic" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="法人姓名" prop="properoycompanyLegalperson">
					<el-input placeholder="法人姓名" v-model="companyInfo.properoycompanyLegalperson" clearable></el-input>
				</el-form-item>
				<el-form-item label="法人手机号" prop="properoycompanyMobilephone">
					<el-input placeholder="法人手机号" v-model="companyInfo.properoycompanyMobilephone" clearable></el-input>
				</el-form-item>
				<el-form-item label="法人身份证号码" prop="properoycompanyIdcardcode">
					<el-input placeholder="法人身份证号码" v-model="companyInfo.properoycompanyIdcardcode" clearable></el-input>
				</el-form-item>
				<el-form-item label="法人身份证正面">
					<!--<el-upload :action="importFileUrl" :data="upLoadData" :limit="1" list-type="picture-card"
						:file-list="properoycompanyIdcardfrontpic"
						:on-success="IdCardFrontPicSubmit" :on-remove="IdCardFrontPicDelete" multiple>
						<i class="el-icon-plus"></i>
					</el-upload>-->
					<div class="item-ipt fl" id="addrent">
						<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :limit="1" :on-success="IdCardFrontPicSubmit" :show-file-list="false">
							<img v-if="companyInfo.properoycompanyIdcardfrontpic" :src="gImgUrl+companyInfo.properoycompanyIdcardfrontpic" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="法人身份证反面">
					<!--<el-upload :action="importFileUrl" :data="upLoadData" :limit="1" list-type="picture-card"
						:file-list="properoycompanyIdcardbackpic" :on-success="IdCardBackPicSubmit" :on-remove="IdCardBackPicDelete" multiple>
						<i class="el-icon-plus"></i>
					</el-upload>-->
					<div class="item-ipt fl" id="addrent">
						<el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :limit="1" :on-success="IdCardBackPicSubmit" :show-file-list="false">
							<img v-if="companyInfo.properoycompanyIdcardbackpic" :src="gImgUrl+companyInfo.properoycompanyIdcardbackpic" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="业务联系人" prop="linkMan">
					<el-input placeholder="业务联系人" v-model="companyInfo.linkMan" clearable></el-input>
				</el-form-item>
				<el-form-item label="业务联系人电话" prop="linkManTelephone">
					<el-input placeholder="业务联系人电话" v-model="companyInfo.linkManTelephone" clearable></el-input>
				</el-form-item>
			</div>
			<div class="clear10"></div>
			<div style="width:100%;" class="formFooter">
				<div class="formButton">
					<el-button type="primary" @click="sureCompanyInfo">保存</el-button>
				</div>
			</div>
			<el-dialog title="选择经营地址" :visible.sync="dialogVisibleAddress" :modal-append-to-body='false' width="60%">
				<!-- <buildingCascader @buildingParam="buildingParam" v-if="hackReset"></buildingCascader>-->
				<choseRoomFromMuiltyFloorByBuilding @roomParams="roomParams" v-if="hackReset" isCanAddRoom='true' :buildingFloorRoomData="companyInfo.buildingRoomList"></choseRoomFromMuiltyFloorByBuilding>
				<!-- <el-button type="success" @click="handleDialogSubmit()">确定</el-button>-->
			</el-dialog>
		</el-form>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	import buildingCascader from '@/components/public/buildingCascader'
	import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'
	export default {
		name: "add-building-group",
		data() {
			return {
				dialogVisibleAddress: false,
				gImgUrl: '',
				roomInfos: '', //公司经营地址  省市区 写字楼 楼层 房间号
				imgUrl: require("@/assets/images/public/coordinateIcon.png"),
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				buildingGroupId: this.$route.query.buildingGroupId,
				roomList: [],
				getparams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				companyInfo: {
					properoycompanyName: "", //公司名称
					properoycompanyShortname: "", //公司简称
					properoycompanyTelphone: "", //公司电话
					properoycompanyReservedtelephone: "", //公司电话
					properoycompanyAddress: "", //营业执照地址
					buildingRoomList: [{
						buildingFloorId: "",
						buildingRoomId: "",
						roomName: ""
					}], //里面有公司经营地址 有房间id
					buildingRoom: '',
					properoycompanyLicensenumber: "", //社会统一信用代码
					properoycompanyLicensepic: "", //营业执照照片
					//properoycompanyLicensepic: [], //营业执照照片
					properoycompanyLegalperson: "", //法人姓名
					properoycompanyMobilephone: "", //法人手机号
					properoycompanyIdcardcode: "", //法人身份证号
					properoycompanyBranchbankname: "", //银行卡姓名
					properoycompanyIdcardbackpic: "",
					//properoycompanyIdcardfrontpic: [], //法人身份证正面照
					properoycompanyIdcardfrontpic: "",
					//properoycompanyIdcardbackpic: [], //法人身份证反面照片
					linkMan: "", //业务联系人
					linkManTelephone: "", //业务联系人电话

					buildingRoomId: null,
					buildingRoomIds: [],
					buildingRooms: [],
					businessExtendShopId: 13586,
					companytypeId: 1,
					properoycompanyAccountname: "",
					properoycompanyAccountnumber: "",
					properoycompanyAccounttype: null,
					properoycompanyBankcardpic: null,
					properoycompanyBankcode: "",
					properoycompanyBranchbankname: "",
					properoycompanyCity: "",
					properoycompanyId: 62,
					properoycompanyLogo: "/upload/company/propertylogo.png",
					properoycompanyProvince: "",
					properoycompanyStatus: "Y",

				},
				properoycompanyLicensepic: '',
				//营业执照照片
				//properoycompanyLicensepic: [],
				//法人身份证正面照
				properoycompanyIdcardfrontpic: [],
				//法人身份证反面照片
				properoycompanyIdcardbackpic: [],
				dialogFormVisible: false,
				hackReset: false,
				buildingId: '',
				//区域对象
				upLoadData: { //图片上传参数
					file: '',
					type: 'company',
					objectId: 0
				}
			}
		},
		components: {
			buildingCascader: buildingCascader,
			choseRoomFromMuiltyFloorByBuilding: choseRoomFromMuiltyFloorByBuilding
		},
		computed: {

		},
		methods: {
			//返回楼盘列表方法
			toCompanyInfo() {
				this.$router.push({
					path: './companyInfo'
				})
			},
			handleSubmit() {
				this.dialogVisibleAddress = false;
			},
			//获取公司信息详情
			getcompanyInfo() {
				this.$httpPasser.post('propertyCompany/getShopInfo', {
					shopId: this.getparams.companyId
				}).then((res) => {
					if(res.data.resultCode == 200) {
						this.companyInfo = res.data.result;
						this.roomInfos = res.data.result.buildingRoom;
						for(let o in res.data.result.buildingRoomList) {
							this.buildingId = res.data.result.buildingRoomList[o].buildingId;
						}
						if(res.data.result.buildingRoomList.length > 0) {
							let tempRoomListArray = []
							let temp = res.data.result.buildingRoomList[0].floorList
							for(let o in temp) {
								for(let p in temp[o].roomList) {
									let tempParams = {};
									tempParams.buildingFloorId = temp[o].buildingFloorId;
									tempParams.buildingRoomId = temp[o].roomList[p].buildingRoomId;
									tempParams.roomName = temp[o].roomList[p].buildingRoomName;
									tempRoomListArray.push(tempParams)
								}
							}
							this.roomList = JSON.stringify(tempRoomListArray)
						}
					} else if(res.data.resultCode == 204) {
						this.$message.error('用户信息为空')
					} else {
						this.$message.error(res.data.resultCodeDesc)
					}
				}).catch(
					(err) => {
						this.$message.error(err)
					}
				)
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
			//营业执照上传成功回调方法
			peripheryPicSubmit(res, file, fileList) {
				if(res.resultCode == '200') {
					console.log(res);
					let imgUrl = res.result;
					if(this.companyInfo.properoycompanyLicensepic.indexOf(imgUrl) == -1) {
						this.companyInfo.properoycompanyLicensepic.push(imgUrl)
					}
				}
			},
			peripheryPicDelete(response, file, fileList) { //营业执照上传成功回调方法
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.properoycompanyLicensepic = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			IdCardFrontPicSubmit(response, file, fileList) { //身份证正面照片上传成功回调方法
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.properoycompanyIdcardfrontpic = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			IdCardBackPicSubmit(response, file, fileList) { //身份证正面照片上传成功回调方法
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					//this.currentRow.licensePicture = URL.createObjectURL(file.raw);
					this.companyInfo.properoycompanyIdcardbackpic = response.result;
					this.htimageUrl = response.result
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			//确认保存公司信息
			sureCompanyInfo() {
				this.$httpPasser.post("company/editCompanyInfo", {
					shopId: this.getparams.companyId,
					shopName: this.companyInfo.properoycompanyName,
					shortname: this.companyInfo.properoycompanyShortname,
					telphone: this.companyInfo.properoycompanyTelphone,
					buildingId: this.buildingId,
					licensenumber: this.companyInfo.properoycompanyLicensenumber,
					licensenumberPicture: this.companyInfo.properoycompanyLicensepic,
					linkman: this.companyInfo.linkMan,
					address: this.companyInfo.properoycompanyAddress,
					properoycompanyAddress: this.companyInfo.properoycompanyAddress,
					linkmanTelephone: this.companyInfo.linkManTelephone,
					legalperson: this.companyInfo.properoycompanyLegalperson,
					mobilephone: this.companyInfo.properoycompanyMobilephone,
					idcardcode: this.companyInfo.properoycompanyIdcardcode,
					idcardFrontPicture: this.companyInfo.properoycompanyIdcardfrontpic,
					idcardBackPicture: this.companyInfo.properoycompanyIdcardbackpic,
					roomList: this.roomList,
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$store.state.companyName = this.companyInfo.properoycompanyName;
						this.$message.success("编辑成功");
						this.$router.push({
							path: './companyInfo'
						})
					} else {
						this.$message.error(res.data.resultCodeDesc)
					}
				})
			},

			/*
			 * 图片上传部分方法
			 * */
			//楼盘图片上传成功回调方法
			groupPicSubmit(res, file, fileList) {
				if(res.resultCode == '200') {
					let imgUrl = res.result;
					if(this.companyInfo.groupPic.indexOf(imgUrl) == -1) {
						this.companyInfo.groupPic.push(imgUrl)
					}
				}
			},
			//楼盘图片删除回调方法
			groupPicDelete(file, fileList) {
				let tempArr = []
				for(let o in fileList) {
					tempArr.push(fileList[o].name)
				}
				this.companyInfo.groupPic = tempArr
			},

			//从数组中删除某一个元素
			changeBuildingParams(arr, arrElement) {
				for(let o in arr) {
					if(arr[o] == arrElement) {
						arr.splice(o, 1)
					}
				}
			},
			//打开dialog回调
			openMapDialog() {
				this.$nextTick(() => {
					this.initMap()
				})
			},
			//显示选择房间回调
			choseRoomClick() {
				this.dialogVisibleAddress = true;
				this.refleshRoomComponent()
			},
			refleshRoomComponent() {
				//强制刷新组件
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
			},
			//从组件获取房屋信息
			roomParams(roomParams) {
				console.log(roomParams)
				if(roomParams.roomResult && roomParams.roomResult.length > 0) {
					this.roomInfos = roomParams.address;
					this.roomList = JSON.stringify(roomParams.roomResult)
					this.buildingId = roomParams.buildingId;
					this.dialogVisibleAddress = false;
				} else {
					this.roomInfos = '';
					this.$message.error('请选择至少一个房间')
				}
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
										message: data.resultCodeDesc,
										type: 'success'
									});
								}
								if(callback204) {
									callback204()
								}
							} else {
								this.$message({
									showClose: true,
									message: data.resultCodeDesc,
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
										message: data.resultCodeDesc,
										type: 'success'
									});
								}
								if(callback204) {
									callback204()
								}
							} else {
								this.$message({
									showClose: true,
									message: data.resultCodeDesc,
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
		created() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
				this.getcompanyInfo();
			})

		}
	}
</script>

<style lang="less" scoped>
	#editCompanyInfo {
		.left {
			float: left;
		}
		.right {
			float: right;
			/*//background-image:url("../../../../../assets/images/public/coordinateIcon.png")*/
		}
	}
</style>
<style lang="less">
	#editCompanyInfo {
		.el-form-item {
			width: 600px !important;
		}
		.el-form-item__label {
			width: 130px!important;
		}
		.el-form-item__content {
			margin-left: 130px!important;
		}
		.formFooter {
			.el-form-item {
				width: 100%!important;
			}
			.formButton {
				text-align: center;
			}
		}
		.yourLatAndLng {
			text-indent: 10px;
			.el-input-group {
				width: 35%;
				margin-left: 10px;
			}
		}
		.avatar {
			width: 200px;
			height: 120px;
			display: block;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 135px;
			height: 95px;
			line-height: 95px;
			text-align: center;
		}
	}
</style>
<template>
	<div>
		<div style="padding-top: 30px;">
			<div class="top-title">
				<div class="line"></div>
				<span class="top-text">企业信息</span>
			</div>
		</div>
		<div class="mainPart enterpriceInformation">
			<ul>
				<li>
					<span>公司名称:</span> <span>{{propertyInfo.properoycompanyName}}</span>
				</li>
				<li>
					<span>公司简称: </span><span>{{propertyInfo.properoycompanyShortname}}</span>
				</li>
				<li>
					<span>公司电话:</span><span>{{propertyInfo.properoycompanyTelphone}}</span>
				</li>
				<li>
					<span>实际经营地址:</span><span>{{propertyInfo.buildingRoom}}</span>
				</li>
				<li>
					<span>营业执照地址: </span><span>{{propertyInfo.properoycompanyAddress}}</span>
				</li>
				<li>
					<span>社会统一信用代码:</span><span>{{propertyInfo.properoycompanyLicensenumber}}</span>
				</li>
				<li>
					<span>营业执照照片:</span><span><img :src="gImgUrl+propertyInfo.properoycompanyLicensepic" alt=""></span>
				</li>
				<li>
					<span>法人姓名:</span><span>{{propertyInfo.properoycompanyLegalperson}}</span>
				</li>
				<li>
					<span>法人手机号:</span><span>{{propertyInfo.properoycompanyMobilephone}}</span>
				</li>
				<li>
					<span>法人身份证号码:</span><span>{{propertyInfo.properoycompanyIdcardcode}}</span>
				</li>
				<li>
					<span>法人身份证照片正面:</span><span><img :src="gImgUrl+propertyInfo.properoycompanyIdcardfrontpic" alt=""></span>
				</li>
				<li>
					<span>法人身份证照片反面:</span><span><img :src="gImgUrl+propertyInfo.properoycompanyIdcardbackpic" alt=""></span>
				</li>
				<li>
					<span>业务联系人:</span><span>{{propertyInfo.linkMan}}</span>
				</li>
				<li>
					<span>业务联系人电话:</span><span>{{propertyInfo.linkManTelephone}}</span>
				</li>
			</ul>
			<div class="editCompanyInfo" @click="toEditCompanyInfo">
				<el-button type="primary">编辑</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	import gUrl from '@/assets/js/gUrl'
	export default {
		name: "alter-password",
		data() {
			return {
				isShowHeader: false,
				gImgUrl: "",
				//roomInfos:'',
				//产品ID
				productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
				enterpriceInfoForm: [{
					name: '',
					value: '',
					properName: 'companyName'
				}],
				getparams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				propertyInfo: {
					properoycompanyName: "", //公司名称
					properoycompanyShortname: "", //公司简称
					properoycompanyTelphone: "", //公司电话
					properoycompanyReservedtelephone: "", //公司电话
					properoycompanyAddress: "", //营业执照地址
					buildingRoom: '', //实际经营地址
					buildingRoomList: [], //里面有公司经营地址 有房间id
					properoycompanyLicensenumber: "", //社会统一信用代码
					properoycompanyLicensepic: "", //营业执照照片
					properoycompanyLegalperson: "", //法人姓名
					properoycompanyMobilephone: "", //法人手机号
					properoycompanyIdcardcode: "", //法人身份证号
					properoycompanyBranchbankname: "", //银行卡姓名
					properoycompanyIdcardbackpic: "",
					properoycompanyIdcardfrontpic: "",
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

				}
			}
		},
		computed: {
			/*httpCurrent:function(){
			  if(this.productId=='5'){
			    return this.$http;
			  }
			  else if(this.productId=='6'){
			    return this.$httpPasser;
			  }
			}*/

			httpCurrent: function() {
				return this.$httpPasser;
			}
		},
		methods: {
			handleEditEnterpriceInformarion() {
				console.log(this.enterpriceInfoForm)
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
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
			getProperInfo() {
				this.httpCurrent.post('propertyCompany/getShopInfo', {
					shopId: this.getparams.companyId
				}).then(
					res => {
						if(res.data.resultCode == 200) {
							this.propertyInfo = res.data.result;
							this.roomInfos = res.data.result.buildingRoom;
						} else if(res.data.resultCode == 204) {
							this.$message.error('用户信息为空')
						} else {
							this.$message.error(res.data.resultCodeDesc)
						}
					}
				).catch(
					(err) => {
						this.$message.error(err)
					}
				)
			},
			toEditCompanyInfo() {
				this.$router.push({
					path: 'editCompanyInfo'
				})
			}
		},
		mounted() {
			this.getProperInfo()
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
			})
		}
	}
</script>

<style scoped lang="less">
	.enterpriceInformation {
		margin-left: auto;
		margin-right: auto;
		padding-left: 20px;
		width: 800px;
		margin: 0 auto;
		img {
			max-width: 200px;
		}
		.con-top a {
			font-size: 12px !important;
		}
		ul {
			li {
				clear: both;
				line-height: 32px;
				font-size: 14px;
				span:first-child {
					display: inline-block;
					width: 150px;
					text-align: right;
					margin-right: 10px;
					float: left;
				}
				span:last-child {
					display: inline-block;
					text-align: left;
					margin-left: 10px;
					float: left;
					width: 620px;
				}
			}
		}
		.editCompanyInfo {
			padding-top: 20px;
			margin-left: 120px;
		}
	}
</style>
<style lang="less">

</style>
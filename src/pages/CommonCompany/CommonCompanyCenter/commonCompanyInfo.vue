<template>
	<div id="enterpriceInformation">
		<div class="top-title">
			<div class="line"></div>
			<span class="top-text font14">企业信息</span>
		</div>
		<div class="mainPart enterpriceInformation">
			<ul>
				<li>
					<span>公司名称</span>: <span>{{propertyInfo.shopName}}</span>
				</li>
				<li>
					<span>公司实际经营地址</span>: <span>{{propertyInfo.BuildingRoom}}</span>
				</li>
				<li>
					<span>营业执照地址</span>: <span>{{propertyInfo.address}}</span>
				</li>
				<li>
					<span>社会统一信用代码</span>: <span>{{propertyInfo.licensenumber}}</span>
				</li>
				<li>
					<span>营业执照照片</span>: <span><img :src="gImgUrl+propertyInfo.licensenumberPicture" alt=""></span>
				</li>
				<li>
					<span>业务联系人姓名</span>: <span>{{propertyInfo.linkman}}</span>
				</li>
				<li>
					<span>业务联系人电话</span>: <span>{{propertyInfo.linkmanTelephone}}</span>
				</li>
				<li>
					<span>法人姓名</span>: <span>{{propertyInfo.legalperson}}</span>
				</li>
				<li>
					<span>法人身份证号码</span>: <span>{{propertyInfo.idcardcode}}</span>
				</li>
				<li>
					<span>法人身份证照片正面</span>: <span><img :src="gImgUrl+propertyInfo.idcardFrontPicture" alt=""></span>
				</li>
				<li>
					<span>法人身份证照片反面</span>: <span><img :src="gImgUrl+propertyInfo.idcardBackPicture" alt=""></span>
				</li>
				<li>
					<span>法人手机号</span>: <span>{{propertyInfo.mobilephone}}</span>
				</li>
			</ul>
			<el-button type="primary" @click="toEditCompanyInfo">编辑企业信息</el-button>
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
				//产品ID
				productId: this.$local.sefetch('productInfo') ? this.$local.sefetch('productInfo').productId : '',
				enterpriceInfoForm: [{
					name: '',
					value: '',
					properName: 'companyName'
				}],
				companyId: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				propertyInfo: {
					address: "",
					companyName: "",
					idCardCode: "",
					idCardFrontPic: "",
					legalPerson: "",
					licenseNumber: "",
					licensePic: "",
					mobilephone: "",
					properoycompany_idCardBackPic: "",
					telphone: "",
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
				this.$httpPasser.get(
					'company/getTenantCompanyInfoByShopId', {
						params: {
							shopId: this.companyId.companyId,
						},
					}).then(
					res => {
						if(res.data.resultCode == 200) {
							console.log(res.data.result);
							this.propertyInfo = res.data.result;
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
					path: './commonCompanyInfoEdit'
				})
			},
			//转换服务器传回的实际经营地址
			editBuildingRooms(str) {
				return str[0].toString();
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
	#enterpriceInformation {
		width: 1060px;
		padding: 30px 20px 20px 0px;
		.enterpriceInformation {
			margin-left: auto;
			margin-right: auto;
			width: 800px;
			margin:0 auto;
			img {
				max-width: 200px;
			}
			.con-top a {
				font-size: 12px !important;
			}
			ul {
				li {
					line-height: 32px;
					font-size: 14px;
					span:first-child {
						display: inline-block;
						width: 150px;
						text-align: right;
						margin-right: 10px;
					}
					span:last-child {
						display: inline-block;
						text-align: left;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>
<style lang="less">
	#enterpriceInformation {
		.el-button--primary {
			margin-left: auto;
			margin-right: auto;
			display: block;
		}
	}
</style>

<template>
	<div>
		<div class="nav">
			<el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button>
			<span style="margin-left:20px;font-size:15px;">租客公司信息</span>
		</div>
		<div id="renterCompanyInfo">
			<ul>
				<li>
					<span>公司名称</span>: <span>{{propertyInfo.companyName}}</span>
				</li>
				<li>
					<span>公司地址</span>: <span>{{propertyInfo.address}}</span>
				</li>
				<li>
					<span>社会统一信用代码</span>: <span>{{propertyInfo.idCardCode}}</span>
				</li>
				<li>
					<span>营业执照照片</span>: <span><img :src="gImgUrl+propertyInfo.licensePic" alt=""></span>
				</li>
				<li>
					<span>法人姓名</span>: <span>{{propertyInfo.legalPerson}}</span>
				</li>
				<li>
					<span>法人身份证号码</span>: <span>{{propertyInfo.idCardCode}}</span>
				</li>
				<li>
					<span>法人身份证照片正面</span>: <span><img :src="gImgUrl+propertyInfo.idCardFrontPic" alt=""></span>
				</li>
				<li>
					<span>法人身份证照片反面</span>: <span><img :src="gImgUrl+propertyInfo.idCardBackPic" alt=""></span>
				</li>
				<li>
					<span>法人手机号</span>: <span>{{propertyInfo.mobilephone}}</span>
				</li>
				<li>
					<span>公司电话</span>: <span>{{propertyInfo.telphone}}</span>
				</li>
			</ul>
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
					companyId: this.$route.query.companyId
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
					'propertyCompany/getTenantCompanyInfo', {
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
			//返回楼盘列表方法
			toBuildingGroupList() {
				this.$router.back()
			},
		},
		mounted() {

			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
				this.getProperInfo()
			})
		}
	}
</script>

<style scoped lang="less">
	.nav {
		text-align: left;
	}
	
	#renterCompanyInfo {
		margin-left: auto;
		margin-right: auto;
		padding-left: 20px;
		width: 600px;
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
</style>
<style lang="less">

</style>
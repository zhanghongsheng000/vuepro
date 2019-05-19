<template>
  <div style="padding: 30px 0px 20px 0;">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text font14">物业公司信息</span>
    </div>
    <div class="mainPart enterpriceInformation">
      <ul>
        <li>
          <span>公司名称</span>: <span>{{propertyInfo.companyName}}</span>
        </li>
        <li>
          <span>公司地址</span>: <span>{{propertyInfo.address}}</span>
        </li>
        <li>
          <span>社会统一信用代码</span>: <span>{{propertyInfo.licenseNumber}}</span>
        </li>
        <li>
          <span>营业执照照片</span>: <span><img :src="gImgUrl+propertyInfo.licensePic" alt=""></span>
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
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				propertyInfo: {
					address: "",
					companyName: "",
					licenseNumber: "",
					licensePic: "",
					telphone: ""
				}
			}
		},
		computed: {
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
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 10;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 10MB!');
				}
				return isJPG && isLt2M;
			},
			getProperInfo() {
				this.httpCurrent.get('propertyCompany/getPropertyCompanyInfoByTenantShopId', {
					params: {
						shopId: this.companyId.companyId
					}
				}).then(
					res => {
						if(res.data.resultCode == 200) {
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

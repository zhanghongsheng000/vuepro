<template>
	<div class="enterpriseCentre">
		<div class="common">
			<div class="EnterCenter">
				<div class="EnterCenter_cont">
					<div class="title">
						<h5>企业中心</h5>
					</div>
					<div class="con-top clearfix">
						<a href="javascript:;" class="cho-item" :class="{active:isActive}" @click="enterprisemessage">企业信息</a>
						<a href="javascript:;" class="cho-item" :class="{active:!isActive}" @click="changepassword">修改密码</a>
					</div>
					<div class="rent-cont clearfix">
						<div class="rent-l fl">
							<div class="forms">
								<div class="forms-cont" v-show="isActive">
									<div class="for-item">
										<span class="for-type">公司名称</span>
										<input class="inputs" type="text" placeholder="请输入公司名称" v-model.trim="accountInfo.properoycompanyName">

									</div>
									<div class="for-item">
										<span class="for-type">公司地址</span>
										<input type="text" placeholder="请输入公司地址" v-model.trim="accountInfo.properoycompanyAddress">

									</div>
									<div class="for-item">
										<span class="for-type">社会统一信用代码</span>
										<input type="text" placeholder="请输入社会统一信用代码" v-model.trim="accountInfo.properoycompanyLicensenumber">

									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">营业执照照片</span>
										<div class="gsinfo fl">
											<el-upload
                        :action="action"
                        list-type="picture-card"
                        :beforeUpload="beforeAvatarUpload"
                        :on-success="handleProperoycompanyLicensepicUpload"
                        :data="upLoadData"
                        :file-list="fileListLicensepic"
                        :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item">
										<span class="for-type">法人姓名</span>
										<input type="text" placeholder="请输入法人姓名" v-model.trim="accountInfo.properoycompanyLegalperson">
									</div>
									<div class="for-item">
										<span class="for-type">法人身份证号</span>
										<input type="text" placeholder="请输入法人身份证号" v-model.trim="accountInfo.properoycompanyIdcardcode">
									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">法人身份证正面</span>
										<div class="gsinfo fl">
                      <el-upload
                        :action="action"
                        :beforeUpload="beforeAvatarUpload"
                        list-type="picture-card"
                        :on-success="handleProperoycompanyIdcardfrontpicUpload"
                        :data="upLoadData"
                        :file-list="fileListIdcardfrontpic"
                        :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item clearfix">
										<span class="for-type fl">法人身份证反面</span>
										<div class="gsinfo fl">
											<!--<el-upload :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :onSuccess="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="form.dialogVisible">
												<img width="100%" :src="imageUrls" alt="">
											</el-dialog>-->
                      <el-upload
                        :action="action"
                        list-type="picture-card"
                        :beforeUpload="beforeAvatarUpload"
                        :on-success="handleProperoycompanyIdcardbackpicUpload"
                        :data="upLoadData"
                        :file-list="fileListIdcardbackpic"
                        :on-remove="handleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
											<el-dialog :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</div>
									</div>
									<div class="for-item">
										<span class="for-type">开户银行</span>
										<input type="text" placeholder="请输入开户银行" v-model.trim="accountInfo.properoycompanyBankcode">
									</div>
									<div class="for-item">
										<span class="for-type">银行卡号</span>
										<input type="text" placeholder="请输入银行卡号" v-model.trim="accountInfo.properoycompanyAccountnumber">
									</div>
                  <div class="for-item">
                    <span class="for-type">支行名称</span>
                    <input type="text" placeholder="请输入支行名称" v-model.trim="accountInfo.properoycompanyBranchbankname">
                  </div>
                  <!--<div class="for-item">
                    <span class="for-type">支行所在省市</span>
                    <el-select v-model="houseform.provinceCode" placeholder="请选择省份" @change="getCity">
                      <el-option v-for="(province,index) in houseform.provinceList" :key="index" :label="province.name" :value="province.code"></el-option>
                    </el-select>
                    <el-select v-model="houseform.cityCode" placeholder="请选择市" @change="getCounty">
                      <el-option v-for="(city,index) in houseform.cityList" :key="index" :label="city.name" :value="city.code"></el-option>
                    </el-select>
                    <el-select v-model="searchParams.areaId" placeholder="请选择区">
                      <el-option v-for="(county,index) in houseform.countyList" :key="index" :label="county.name" :value="county.code"></el-option>
                    </el-select>
                  </div>-->
									<div class="for-item">
										<span class="for-type">联系电话</span>
										<input type="text" placeholder="请输入联系电话" v-model.trim="accountInfo.properoycompanyReservedtelephone">
									</div>
								</div>

								<div class="forms-cont" v-show="!isActive">
                  <div class="for-item">
                    <span class="for-type">旧密码</span>
                    <input type="password" v-model="editPassword.oldPassword" placeholder="请输入旧密码">
                  </div>
									<div class="for-item">
										<span class="for-type">新密码</span>
										<input  type="password" v-model="editPassword.newPassword" placeholder="请输入新密码">
									</div>
									<div class="for-item">
										<span class="for-type">确认密码</span>
										<input type="password" v-model="editPassword.ensurePassword" placeholder="请再次输入密码">
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="months">
						<a v-show="isActive" @click="submitAccountInfo">保存</a>
					</div>
          <div class="months">
            <a v-show="!isActive" @click="modifypsw">保存</a>
          </div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import footer from '@/components/public/footer'
  import gUrl from '@/assets/js/gUrl'
  import {$gImgUrl} from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
	export default {
		name: "index",
		components: {
			'v-footer': footer
		},
		data() {
			return {
        //获取楼盘列表参数，物业公司ID
        companyId: {
          companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
        },
        //上传图片地址
        action:$gPasserUrl+'upload/singleUpload',
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        },
        dialogImageUrl: '',
				dialogVisible: false,
				isActive: true,
        properoycompanyBankcodeList:[],
        accountInfo:{
				  //物业公司ID
				  properoyCompanyId:'',
          //物业公司名称
          properoycompanyName:'',
          //物业公司地址
          properoyCompanyAddress:'',
          //社会统一信用代码
          properoyCompanyLicensenumber:'',
          //营业执照照片
          properoycompanyLicensepic:'',
          //法人姓名
          properoycompanyLegalperson:'',
          //法人身份证号码
          properoycompanyIdcardcode:'',
          //法人身份证正面
          properoycompanyIdcardfrontpic:'',
          //法人身份证反面
          properoycompanyIdcardbackpic:'',
          //开户银行
          properoycompanyBankcode:'',
          //支行
          properoycompanyBranchbankname:'',
/*          //支行所在省份
          properoycompanyProvince:'',
          //支行所在城市
          properoycompanyCity:'',
          //银行账户名称
          properoycompanyAccountname:'',*/
          //银行卡号
          properoycompanyAccountnumber:'',
          //收款银行预留电话
          properoycompanyReservedtelephone:''

        },
        houseform: { //房源信息
          provinceList: [], //省列表
          cityList: [], //市列表
          countyList: [], //区列表
          provinceCode:'',
          cityCode:'',
          countyCode:'',
        },
        editPassword:{
          oldPassword:"",
          newPassword:"",
          ensurePassword:"",
        },
        userId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
        searchParams:{}
			}
		},
    computed:{
      //营业执照照片显示
      fileListLicensepic: function(){
        let re = [];
        let imgUrlFromServer = this.accountInfo.properoycompanyLicensepic
        if(imgUrlFromServer && imgUrlFromServer!=''){
          let temp = {name: '', url: ''};
          let imgUrlFromServer = this.accountInfo.properoycompanyLicensepic
          let imgName = '';
          let imgUrlFromServerArray = imgUrlFromServer.split('.')
          if(imgUrlFromServerArray>0){
            imgName = imgUrlFromServerArray[imgUrlFromServerArray.length-1]
          }
          let imgUrl = $gImgUrl+imgUrlFromServer;
          temp.name=imgName
          temp.url = imgUrl
          re.push(temp)
        }

        return re;
      },
      //身份证正面照片显示
      fileListIdcardfrontpic: function(){
        let re = [];
        let imgUrlFromServer = this.accountInfo.properoycompanyIdcardfrontpic
        if(imgUrlFromServer && imgUrlFromServer!=''){
          let temp = {name: '', url: ''};
          let imgUrlFromServer = this.accountInfo.properoycompanyIdcardfrontpic
          let imgName = '';
          let imgUrlFromServerArray = imgUrlFromServer.split('.')
          if(imgUrlFromServerArray>0){
            imgName = imgUrlFromServerArray[imgUrlFromServerArray.length-1]
          }
          let imgUrl = $gImgUrl+imgUrlFromServer;
          temp.name=imgName
          temp.url = imgUrl
          re.push(temp)
        }

        return re;
      },
      //身份证反面照片显示
      fileListIdcardbackpic: function(){
        let re = [];
        let imgUrlFromServer = this.accountInfo.properoycompanyIdcardbackpic
        if(imgUrlFromServer && imgUrlFromServer!=''){
          let temp = {name: '', url: ''};
          let imgUrlFromServer = this.accountInfo.properoycompanyIdcardbackpic
          let imgName = '';
          let imgUrlFromServerArray = imgUrlFromServer.split('.')
          if(imgUrlFromServerArray>0){
            imgName = imgUrlFromServerArray[imgUrlFromServerArray.length-1]
          }
          let imgUrl = $gImgUrl+imgUrlFromServer;
          temp.name=imgName
          temp.url = imgUrl
          re.push(temp)
        }

        return re;
      }
    },
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
      //营业执照上传成功回调
      handleProperoycompanyLicensepicUpload(response, file, fileList) {
        if(response.resultCode==200){
          this.accountInfo.properoycompanyLicensepic = response.result;
        }
        else{
          this.$message.error('上传失败')
        }
			},
      //法人正面上传成功回调
      handleProperoycompanyIdcardfrontpicUpload(response, file, fileList) {
        if(response.resultCode==200){
          this.accountInfo.properoycompanyIdcardfrontpic = response.result;
          console.log(this.accountInfo)
        }
        else{
          this.$message.error('上传失败')
        }
      },
      //法人反面上传成功回调
      handleProperoycompanyIdcardbackpicUpload(response, file, fileList) {
        console.log(response)
        if(response.resultCode==200){
          this.accountInfo.properoycompanyIdcardbackpic = response.result;

        }
        else{
          this.$message.error('上传失败')
        }
      },
			enterprisemessage() {
				this.isActive = true
			},
			changepassword() {
				this.isActive = false
			},
      //提交账户完善信息
      submitAccountInfo(){
			  this.$http.get(
			    'business/perfectInformation',
          {params:this.accountInfo}
        ).then(res=>{
          console.log(res.data)
          if(res.data.resultCode==200){
            this.$message.success(res.data.resultCodeDesc)
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }

          }
        )
      },

      //获取用户信息
      getPropertyCompanyById(){
			  this.$http.get(
			    'business/getPropertyCompanyById',
          {params:this.companyId}
        ).then(
          res=>{
            if(res.data.resultCode==200){
              this.accountInfo = res.data.result
            }
            else{
              this.$message.error('未获取到用户信息')
            }
          }

        )
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
      },
      //修改密码
      modifypsw() {
        this.$http.get('account/update', {
          params: {
            oldPassword: this.editPassword.oldPassword,
            newPassword: this.editPassword.newPassword,
            rePassword: this.editPassword.ensurePassword,
            userId: this.userId
          }
        }).then((res) => {
          if(this.newPassword!=this.rePassword){
            this.$message.error('两次输入密码不一致');
          }else if(res.data.resultCode=='200'){
            this.$message.success('修改密码成功');
          }else{
            this.$message.error(res.data.resultCodeDesc);
          }
        })
      },
      getCity(){},
      getCounty(){}
		},
    mounted:function(){
      //this.getPropertyCompanyById();
      console.log($gImgUrl)
    }
	}
</script>

<style lang="less" scoped>
	.enterpriseCentre {
    width:1040px;
    background-color:white;
    .months{
      cursor:pointer;
    }
		.EnterCenter {
			.EnterCenter_cont {
				padding-top: 45px;
				.title {
					text-align: center;
					h5 {
						font-size: 22.5px;
						line-height: 36px;
					}
				}
				.con-top {
					text-align: center;
					width: 500px;
					margin: 0 auto;
					padding: 59px 0 30px 0;
					border-bottom: 1px solid #DEDEDE;
					margin-bottom: 32px;
					a {
						padding: 0 40px;
						font-size: 10.5px;
						color: #666666;
						/*a .active{
							color: #5967ff;
						}*/
					}
					.cho-item.active {
						color: #5967ff;
					}
				}
				.rent-cont {
					width: 540px;
					margin: 0 auto;
					.rent-l {
						width: 480px;
						.forms {
							margin-bottom: 20px;
							.form-title {
								line-height: 54px;
								text-align: center;
								h6 {
									font-size: 12px;
									line-height: 36px;
								}
							}
							.forms-cont {
								padding-bottom: 10px;
							}
							.for-item {
								margin-bottom: 18px;
								.for-type {
									display: inline-block;
									width: 100px;
									padding-right: 10px;
									text-align: right;
									line-height: 36px;
									font-size: 10.5px;
									color: #000000;
									vertical-align: middle;
								}
								input {
									height: 30px;
									width: 300px;
									padding: 0 10px;
									border: solid 1px #aeaeae;
									margin-right: 10px;
									vertical-align: middle;
								}
								.xue {
									color: red;
									font-size: 20px;
									vertical-align: middle;
								}
							}
						}
					}
				}
			}
			.months{
				text-align: center;
				padding-bottom: 40px;
				a{
					padding: 10px 40px;
					color: #FFFFFF;
					background: #5967FF;
					border-radius: 5px;
				}
			}
		}
		.black {
			background: #3b3b3b;
		}
	}
</style>
<style lang="less">
  .enterpriseCentre{
    .el-upload--picture-card {
      width: 156px;
      height: 80px;
      line-height: 84px;
    }
  }

</style>

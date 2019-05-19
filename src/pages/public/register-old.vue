<template>
	<div class="wrap registercontainer">
		<div class="reg-contain">
			<div class="main">
				<div class="main-box">
					<div class="choice">
						<!--<h1 class="logo"><a href="http://www.jiatob.com"><img src="../../assets/img/public/logo.png" alt=""></a></h1>
						<div class="logo-text">注册居金所，开启更顺畅的企业发展</div>-->
						<div class="logos">
							<h1 class="logo"><a href="javascript:;"><img src="../../assets/img/passenger/logotext.png" alt=""></a>
              </h1>
						</div>
						<div class="logo-text">请选择您要注册的企业服务产品，开启更顺畅的企业发展</div>
						<div class="links-items">
							<div class="links-cont clearfix">
								<div class="link-item fl links-bg1" @click="tabClick(0)">
									<div class="bg-link"></div>
								</div>
								<div class="link-item fl links-bg2" @click="tabClick(1)">
									<div class="bg-link " :class="{ 'link-active':isdfgz}"></div>
								</div>
								<div class="link-item fl links-bg3">
									<div class="sm-links sm-link-bg1" @click="tabClick(2)"></div>
									<div class="sm-links sm-link-bg2 " :class="{ 'link-active':iswyf}" @click="tabClick(3)"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-container">
						<div class="forms clearfix">
							<div class="forms-cont fl">
								<div class="for-item">
									<span class="for-type">用户名</span>
									<input type="text" placeholder="请输入用户名" v-model.trim="form.userName">
								</div>
								<div class="for-item">
									<span class="for-type">密码</span>
									<input type="password" placeholder="请输入密码" v-model.trim="form.password">
								</div>
								<div class="for-item">
									<span class="for-type">确认密码</span>
									<input type="password" placeholder="请再次输入密码" v-model.trim="form.repassword">
								</div>
								<div class="for-item">
									<span class="for-type">图片验证码</span>
									<div class="input_con">
										<input type="text" placeholder="请输入验证码" v-model.trim="form.code">
										<div class="figure fr" @click="getImg">
											<img :src="src" alt="">
										</div>
									</div>
								</div>
								<div class="for-item">
									<span class="for-type">公司名称</span>
									<input type="text" placeholder="请输入公司名称" v-model.trim="form.companyName">
								</div>
								<div class="for-item">
									<span class="for-type">公司电话</span>
									<input type="text" placeholder="请输入公司电话" v-model.trim="form.companyphone">
								</div>
								<div class="for-item">
									<span class="for-type">公司地址</span>
									<input type="text" placeholder="请输入公司地址" v-model.trim="form.companyaddress">
								</div>
								<div class="for-item">
									<span class="for-type">社会统一信用代码</span>
									<input type="text" placeholder="请输入社会统一信用代码" v-model.trim="form.companycode">
								</div>
								<div class="for-item bank">
									<span class="for-type">开户银行</span>
									<el-select v-model="openbank" placeholder="请选择开户银行" @change="showMore">
										<el-option v-for="item,index in bankList" :key="index" :label="item.name" :value="item.baseDataId">
										</el-option>
									</el-select>
								</div>
								<div class="for-item" v-if="isActive">
									<span class="for-type">支行名称</span>
									<input type="text" placeholder="请输入支行名称" v-model.trim="form.bankpartname">
								</div>
								<div class="for-item area" v-if="isActive">
									<span class="for-type">支行所在省市</span>
									<el-select v-model="province" placeholder="请选择省份" @change="getCity">
										<el-option v-for="item,index in proList" :key="index" :label="item.name" :value="item.code"></el-option>
									</el-select>
									<el-select v-model="city" placeholder="请选择市">
										<el-option v-for="item ,index in cityList" :key="index" :label="item.name" :value="item.code"></el-option>
									</el-select>
								</div>
								<div class="for-item">
									<span class="for-type">银行账户名称</span>
									<input type="text" placeholder="请输入银行账户名称" v-model.trim="form.zhanghaoname">
								</div>
								<div class="for-item">
									<span class="for-type">银行卡号</span>
									<input type="text" placeholder="请输入银行卡号" v-model.trim="form.bankNum">
								</div>
							</div>
							<div class="forms-cont fl">
								<div class="for-item">
									<span class="for-type">银行预留电话</span>
									<input type="text" placeholder="请输入银行预留电话" v-model.trim="form.connectPhone">
								</div>
								<div class="for-item clearfix">
									<span class="for-type fl">营业执照照片</span>
									<div class="gsinfo fl">
										<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
											<img width="100%" :src="imageUrls" alt="">
										</el-dialog>
									</div>
								</div>
								<div class="for-item">
									<span class="for-type">法人姓名</span>
									<input type="text" placeholder="请输入法人姓名" v-model.trim="form.companyPname">
								</div>
								<div class="for-item">
									<span class="for-type">法人身份证号</span>
									<input type="text" placeholder="请输入法人身份证号" v-model.trim="form.companyPid">
								</div>
								<div class="for-item clearfix">
									<span class="for-type fl">法人身份证正面</span>
									<div class="gsinfo fl">
										<el-upload :action="importFileUrl" :data="upLoadData" ref="uploads2" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs2" :on-remove="handleRemovegs2" list-type="picture-card" :limit="1" clearFiles="clearImg" :on-exceed="handleExceed">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
											<img width="100%" :src="imageUrls" alt="">
										</el-dialog>
									</div>
								</div>
								<div class="for-item clearfix">
									<span class="for-type fl">法人身份证反面</span>
									<div class="gsinfo fl">
										<el-upload ref="uploads3" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs3" :on-remove="handleRemovegs3" list-type="picture-card" :limit="1" :on-exceed="handleExceed">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
											<img width="100%" :src="imageUrls" alt="">
										</el-dialog>
									</div>
								</div>
								<div class="for-item">
									<span class="for-type">手机号码</span>
									<input type="text" placeholder="请输入手机号码" v-model.trim="form.telphone">
								</div>
								<div class="for-item">
									<span class="for-type">手机验证码</span>
									<div class="input_con">
										<input type="text" placeholder="请输入手机验证码" v-model.trim="form.phonecode">
										<div class="figure fr" @click="sendcode">
											<el-button type="primary" :disabled="disabled">{{btntxt}}</el-button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="grey">
					<div class="btn-cont mb20">
						<el-button @click="submit" class="btn" type="primary">注册</el-button>
					</div>
					<div class="ser-box">
						<el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
						<a class="service" href="javascript:;">《居金所许可及服务协议》</a>
					</div>
					<div class="link-login">已有账号，
						<router-link class="colorNow" to="/">登录</router-link>
					</div>
				</div>
			</div>
		</div>
		<div>
			<el-dialog title="提示" :visible.sync="dialogVisible2" width="500px" top="30vh" center @close="closeEvent" :close-on-click-modal="false">
				<span style="font-size:16px;line-height:2;">注册成功，等待居金所审核完成会在第一时间短信通知您。请注意查收短信。</span>
				<span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
			</el-dialog>
		</div>
		<!--<log-footer></log-footer>-->
	</div>
</template>
<script>
	import Footer from '@/components/public/footer'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	import gUrl from '@/assets/js/gUrl'
	export default {
		components: {
			logFooter: Footer
		},
		data() {
			return {
				isdfgz: false, //贷发工资对勾
				iswyf: false, //物业费用在线手缴系统对勾
				dialogVisible2: false,
				isActive: false, //支行名称 支行省市选择 显示隐藏
				checked: true, //阅读并同意 居金所许可服务协议 默认同意
				disabled: false, //禁用获取验证码按钮
				time: 0,
				currentVcode: "", //图形验证码code
				btntxt: "获取验证码",
				openbank: '', //开户银行
				bankList: [], //银行下拉框内容
				form: {
					userName: '', //用户名
					password: '', //密码
					repassword: '', //确认密码
					code: '', //用户输入的图形验证码
					companyName: '', //公司名称
					companyphone: '', //公司电话
					companyaddress: '', //公司地址
					companycode: '', //社会统一信用代码
					bankNum: '', //银行卡号
					zhanghaoname: '', //银行账户名称
					bankpartname: '', //支行名称
					connectPhone: '', //银行预留电话///////////
					companyPname: '', //法人姓名
					// companyPphone: '',//法人电话
					companyPid: '', //法人身份证号
					telphone: '', //手机号码
					phonecode: '', //手机验证码
					msgid: '' //手机验证码code
				},
				proList: [], //省列表
				cityList: [], //市列表
				province: '', //省code
				city: '', //市code
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				upLoadData: {
					file: '',
					type: 'company',
					objectId: 0
				}, //图片上传参数
				dialogVisible: false, //放大之后遮罩
				imgparamgs: '', //营业执照图片上传成功之后的参数
				imgparamgs2: '', //身份证正面上传成功之后的参数
				imgparamgs3: '', //身份证反面上传成功之后的参数
				imageUrls: '', //放大地址
				src: '', //图形验证码 图片地址//
				options: [{ //选择产品
					value: '1',
					label: '智慧物业'
				}, {
					value: '2',
					label: '贷发工资' //企业之家
				}],
				valueType: ''
			}
		},
		created() {
			console.log(this.$route.query.type)
			if(this.$route.query.type == '1') {
				this.isdfgz = true
				this.valueType = 2
			} else {
				this.iswyf = true
				this.valueType = 1
			}
			this.getImg()
			this.getBank()
			this.getproList()
		},
		methods: {
			tabClick(index) {
				if(index == '0') {
					this.$router.push({
						path: '/register-zjyf'
					})
				} else if(index == '1') {
					this.isdfgz = true
					this.iswyf = false
					this.valueType = 2
				} else if(index == '2') {
					this.$router.push({
						path: '/register'
					})
				} else if(index == '3') {
					this.iswyf = true
					this.isdfgz = false
					this.valueType = 1
				}
			},
			/*promptClick() {
			  this.$message({showClose: true, message: '敬请期待', type: 'error'});
			},*/
			showMore() { //是否显示支行名称
				for(var i = 0; i < this.bankList.length; i++) {
					if(this.bankList[i].baseDataId == this.openbank) {
						if(this.bankList[i].bankcardType == 'Y') {
							this.isActive = false
						} else {
							this.isActive = true
						}
					}
				}
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
			handlePictureCardPreview(file) { //图片放大
				this.imageUrls = file.url;
				this.dialogVisible = true;
			},
			uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {

					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.imgparamgs = response.result
					console.log(response.result)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			uploadSuccessgs2(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.imgparamgs2 = response.result
					// console.log(response.result)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			uploadSuccessgs3(response, file, fileList) { //图片上传成功之后的函数
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.imgparamgs3 = response.result
					// console.log(response.result)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			handleRemovegs() { //营业执照图片删除
				this.imgparamgs = ''
			},
			handleRemovegs2() { //身份证正面照图片删除
				this.imgparamgs2 = ''
			},
			handleRemovegs3() { //身份证反面照图片删除
				this.imgparamgs3 = ''
			},
			handleExceed() { //限制上传的图片数量
				this.$message({
					showClose: true,
					message: '只能上传一张图片',
					type: 'error'
				});
			},
			getproList() { //获取省份列表
				this.$http.post('area/getArea', {
						level: 'province',
						areaCode: ''
					})
					.then((res) => {
						// console.log(res.data)
						if(res.data.resultCode == '200') {
							this.proList = res.data.result
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
			getBank() { //获取银行
				this.$http.post('bank/getBank')
					.then(res => {
						let data = res.data
						if(data.resultCode == '200') {
							this.bankList = data.result
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
			getImg() {
				this.$http.get('pictureMessage/getCode').then((response) => {
					const data = response.data
					// console.log(data)
					if(data.resultCode == '200') {
						this.src = 'data:image/png;base64,' + data.result.imagePath
						this.currentVcode = data.result.vcode;
					}
				})
			},
			sendcode() {
				if(!this.disabled) {
					if(this.form.telphone == '') {
						this.$message({
							showClose: true,
							message: '请输入手机号',
							type: 'error'
						});
					} else if(!/^0?1[3456789]\d{9}$/.test(this.form.telphone)) {
						this.$message({
							showClose: true,
							message: '电话号码格式错误',
							type: 'error'
						});
					} else {
						this.disabled = true;
						this.time = 60;
						this.timer();
						this.$http.get('phoneMessage/getCode', {
								params: {
									telphone: this.form.telphone,
									isRegister: 'Y'
								}
							})
							.then((response) => {
								const data = response.data
								console.log(data)
								if(data.resultCode == '200') {
									this.$message({
										showClose: true,
										message: '验证码发送成功',
										type: 'success'
									});
									this.form.msgid = data.result
								} else {
									this.$message({
										showClose: true,
										message: '验证码发送失败',
										type: 'error'
									});
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}
				}
			},
			timer() {
				if(this.time > 0) {
					this.btntxt = this.time + "s后重新获取";
					this.time--;
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "重新获取验证码";
					this.disabled = false;
				}
			},
			getCity() { //切换省份获取市的方法
				// console.log(this.province)
				this.cityList = []
				this.$http.post('area/getArea', {
						areaCode: this.province,
						level: 'city'
					})
					.then((res) => {
						let data = res.data
						if(data.resultCode == '200') {
							console.log(data)
							this.cityList = data.result
						} else {
							this.$message({
								showClose: true,
								message: data.result,
								type: 'error'
							});
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			submit() {
				if(this.checked == false) {
					this.$message({
						showClose: true,
						message: '请确认 我已阅读并同意居金所许可及服务协议',
						type: 'error'
					})
				} else if(this.form.userName == '') {
					this.$message({
						showClose: true,
						message: '请输入用户名',
						type: 'error'
					})
				} else if(this.form.password == '') {
					this.$message({
						showClose: true,
						message: '密码不能为空',
						type: 'error'
					})
				} else if(this.form.repassword == '') {
					this.$message({
						showClose: true,
						message: '确认密码不能为空',
						type: 'error'
					})
				} else if(this.form.password != this.form.repassword) {
					this.$message({
						showClose: true,
						message: '两次密码输入不一致',
						type: 'error'
					})
				} else if(this.form.code == '') {
					this.$message({
						showClose: true,
						message: '请输入图形验证码',
						type: 'error'
					})
				} else if(this.form.companyName == '') {
					this.$message({
						showClose: true,
						message: '请输入公司名称',
						type: 'error'
					})
				} else if(this.form.companyphone == '') {
					this.$message({
						showClose: true,
						message: '请输入公司电话',
						type: 'error'
					})
				} else if(this.form.companyaddress == '') {
					this.$message({
						showClose: true,
						message: '请输入公司地址',
						type: 'error'
					})
				} else if(this.form.companycode == '') {
					this.$message({
						showClose: true,
						message: '请输入社会统一信用代码',
						type: 'error'
					})
				} else if(this.openbank == '') {
					this.$message({
						showClose: true,
						message: '请选择开户银行',
						type: 'error'
					})
				} else if(this.isActive == 'true') {
					if(this.form.bankpartname == '') {
						this.$message({
							showClose: true,
							message: '请输入支行名称',
							type: 'error'
						})
					} else if(this.province == '') {
						this.$message({
							showClose: true,
							message: '请选择支行所在省份',
							type: 'error'
						})
					} else if(this.city == '') {
						this.$message({
							showClose: true,
							message: '请选择支行所在市区',
							type: 'error'
						})
					}
				} else if(this.form.zhanghaoname == '') {
					this.$message({
						showClose: true,
						message: '请输入银行账户名称',
						type: 'error'
					})
				} else if(this.form.bankNum == '') {
					this.$message({
						showClose: true,
						message: '请输入银行卡号',
						type: 'error'
					})
				} else if(this.form.connectPhone == '') {
					this.$message({
						showClose: true,
						message: '请输入银行预留电话',
						type: 'error'
					})
				} else if(this.imgparamgs == '') {
					this.$message({
						showClose: true,
						message: '请上传营业执照照片',
						type: 'error'
					})
				} else if(this.form.companyPname == '') {
					this.$message({
						showClose: true,
						message: '请输入法人姓名',
						type: 'error'
					})
				} else if((/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.form.companyPid) === false) {
					this.$message({
						showClose: true,
						message: '身份证输入不合法',
						type: 'error'
					})
				} else if(this.imgparamgs2 == '') {
					this.$message({
						showClose: true,
						message: '请上传身份证正面照片',
						type: 'error'
					})
				} else if(this.imgparamgs3 == '') {
					this.$message({
						showClose: true,
						message: '请上传身份证反面照片',
						type: 'error'
					})
				} else if(this.form.telphone == '') {
					this.$message({
						showClose: true,
						message: '请输入手机号',
						type: 'error'
					});
				} else if(!/^0?1[3456789]\d{9}$/.test(this.form.telphone)) {
					this.$message({
						showClose: true,
						message: '电话号码格式错误',
						type: 'error'
					});
				} else if(this.form.phonecode == '') {
					this.$message({
						showClose: true,
						message: '请输入手机验证码',
						type: 'error'
					})
				} else {
					this.$http.post('/register', {
							productType: this.valueType,
							username: this.form.userName,
							password: this.form.password, //密 码 20 字母和数字不为空
							confirmPassword: this.form.repassword, //确认密码 20 字母和数字不为空
							imageValidateCode: this.form.code, //图片验证码 4位 不为空
							encryptionImageValidateCode: this.currentVcode, //加密的图片验证码 不为空
							properoycompanyName: this.form.companyName, //'公司名称'
							properoycompanyTelphone: this.form.companyphone, //'公司电话'
							properoycompanyAddress: this.form.companyaddress, //'公司地址'
							properoycompanyLicensenumber: this.form.companycode, //'社会统一信用代码
							properoycompanyBankcode: this.openbank, //'开户银行编号',
							properoycompanyAccountnumber: this.form.bankNum, //'银行卡号',
							properoycompanyBranchbankname: this.form.bankpartname, //'支行名称',
							properoycompanyProvince: this.province, //'省份编码',
							properoycompanyCity: this.city, //'市编码',
							properoycompanyAccountname: this.form.zhanghaoname, //银行账户名称
							properoycompanyReservedtelephone: this.form.connectPhone, /////银行预留电话
							properoycompanyLicensepic: this.imgparamgs, //'营业执照照片'
							properoycompanyLegalperson: this.form.companyPname, //'法人姓名'
							properoycompanyIdcardcode: this.form.companyPid, //'法人身份证号码'
							properoycompanyIdcardfrontpic: this.imgparamgs2, //'智慧物业法人身份证正面照片'
							properoycompanyIdcardbackpic: this.imgparamgs3, //'智慧物业法人身份证反面照片'
							properoycompanyMobilephone: this.form.telphone, //手机号码= 法人电话
							telephoneValidateCode: this.form.phonecode, //手机验证码
							encryptionTelephoneValidateCode: this.form.msgid, //加密手机验证码 不为空
						})
						.then((response) => {
							const data = response.data
							console.log(data)
							if(data.resultCode == '200') {
								////
								this.dialogVisible2 = true
							} else {
								this.$message({
									showClose: true,
									message: data.resultCodeDesc,
									type: 'error'
								});
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			closeEvent() { //关闭弹窗的回调
				this.form.userName = ''
				this.form.password = '' //密 码 20 字母和数字不为空
				this.form.repassword = '' //确认密码 20 字母和数字不为空
				this.form.code = '' //图片验证码 4位 不为空
				this.currentVcode = '' //加密的图片验证码 不为空
				this.form.companyName = '' //'公司名称'
				this.form.companyphone = '' //'公司电话'
				this.form.companyaddress = '' //'公司地址'
				this.form.companycode = '' //'社会统一信用代码
				this.openbank = '' //'开户银行编号',
				this.form.bankNum = '' //'银行卡号',
				this.form.bankpartname = '' //'支行名称',
				this.province = '' //'省份编码',
				this.city = '' //'市编码',
				this.form.zhanghaoname = '' //银行账户名称
				this.form.connectPhone = '' /////银行预留电话
				this.imgparamgs = '' //'营业执照照片'
				this.form.companyPname = '' //'法人姓名'
				this.form.companyPid = '' //'法人身份证号码'
				this.imgparamgs2 = '' //'智慧物业法人身份证正面照片'
				this.imgparamgs3 = '' //'智慧物业法人身份证反面照片'
				this.form.telphone = '' //手机号码= 法人电话
				this.form.phonecode = '' //手机验证码
				this.form.msgid = '' //加密手机验证码 不为空
				this.$refs.uploads1.clearFiles()
				this.$refs.uploads2.clearFiles()
				this.$refs.uploads3.clearFiles()
			},
		}
	}
</script>
<style lang="less" scoped>
	.colorNow {
		color: #0f71ca !important;
	}
	
	.wrap {
		/*background: url("../../assets/img/public/bk.jpg") left top no-repeat;
		background-size: cover;*/
		background: url("../../assets/img/passenger/register-bg.png") left top no-repeat;
		background-size: cover;
		height: 1292px;
		.reg-contain {
			/*width: 1000px;
			padding-top: 50px;
			padding-bottom: 120px;
			margin: 0 auto;*/
			width: 1000px;
			padding-top: 44px;
			padding-bottom: 50px;
			margin: 0 auto;
			.main {
				border-radius: 9px;
				background-color: #fff;
				.reg-title {
					height: 68px;
					line-height: 68px;
					text-align: center;
					font-size: 20px;
					font-weight: bold;
				}
				.main-box {
					padding: 30px 30px 0px 30px;
					margin: 0 auto;
				}
				/*.choice {
					.logo {
						text-align: center;
						margin-bottom: 12px;
					}
					.logo-text {
						line-height: 70px;
						text-align: center;
						font-size: 20px;
						color: #3982c4;
					}
				}*/
				.choice {
					.logos {
						margin-bottom: 10px;
					}
					.logo {
						margin-bottom: 12px;
					}
					.logo-text {
						text-align: center;
						font-size: 18px;
						color: #3d82bc;
						margin-bottom: 30px;
					}
					.links-items {
						margin-bottom: 36px;
						.links-cont {
							margin-right: -20px;
						}
						.link-item {
							width: 300px;
							height: 100px;
							margin-right: 20px;
							position: relative;
						}
						.links-bg1 {
							background: url("../../assets/img/passenger/zjyf.png") left top no-repeat;
						}
						.links-bg2 {
							background: url("../../assets/img/passenger/dfgz.png") left top no-repeat;
							cursor: pointer;
							.bg-link {
								position: absolute;
								right: 0;
								top: 0;
								width: 104px;
								height: 100px;
							}
							.bg-link.link-active {
								background: url("../../assets/img/passenger/link-active.png") right top no-repeat;
							}
						}
						.links-bg3 {
							background: url("../../assets/img/passenger/zhwy.png") left top no-repeat;
						}
						.sm-links {
							width: 200px;
							height: 41px;
							cursor: pointer;
							margin-right: 5px;
						}
						.sm-link-bg1 {
							background: url("../../assets/img/passenger/txk.png") left top no-repeat;
							float: right;
							margin-top: 7px;
							margin-bottom: 5px;
						}
						.sm-link-bg1.link-active {
							background: url("../../assets/img/passenger/txknow.png") left top no-repeat;
						}
						.sm-link-bg2 {
							background: url("../../assets/img/passenger/wyf.png") left top no-repeat;
							float: right;
						}
						.sm-link-bg2.link-active {
							background: url("../../assets/img/passenger/wyfnow.png") left top no-repeat;
						}
					}
				}
				.form-container {
					.forms {
						.input_con {
							display: inline-block;
							.figure {
								position: absolute;
								margin-top: -38px;
								margin-left: 200px;
							}
						}
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
								width: 110px;
								padding-right: 10px;
								text-align: right;
								line-height: 36px;
								font-size: 10.5px;
								color: #000000;
								vertical-align: middle;
							}
							input {
								height: 36px;
								width: 290px;
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
				.btn-cont {
					text-align: center;
				}
				.btn {
					width: 310px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					background-color: #0f71ca;
					font-size: 18px;
					color: #fff;
					border-radius: 3px;
					padding: 0;
				}
			}
			.ser-box {
				text-align: center;
			}
			.link-login {
				text-align: center;
				color: #969696;
				font-size: 16px;
				a {
					color: #969696;
					&:hover {
						color: #0f71ca;
					}
				}
			}
		}
	}
	
	.grey {
		background: #eeeeee;
		padding: 30px 0;
	}
	
	.mb20 {
		margin-bottom: 20px;
	}
	
	.figure {
		height: 34px;
		width: 110px;
		padding: 2px 3px 2px 0;
		cursor: pointer;
		img {
			height: 34px;
			width: 110px;
		}
		.el-button--primary {
			background-color: #0f71ca;
			border-color: #0f71ca;
			height: 34px;
			width: 110px;
			line-height: 34px;
			text-align: center;
			color: #fff;
			padding: 0;
		}
	}
</style>
<style lang="less">
	.registercontainer {
		.ser-box {
			line-height: 40px;
			margin-bottom: 28px;
			.el-checkbox__label {
				color: #000;
				font-size: 12px;
			}
			.el-checkbox__inner {
				border-radius: 50%;
			}
			.el-checkbox__input.is-checked+.el-checkbox__label {
				color: #0f71ca;
			}
			.service {
				color: #57aef4;
				&:hover {
					color: #0f71ca;
				}
			}
		}
		.el-upload--picture-card {
			width: 156px;
			height: 94px;
			line-height: 96px;
		}
		.el-upload-list--picture-card .el-upload-list__item {
			width: 156px;
			height: 94px;
		}
		.bank {
			.el-select>.el-input {
				display: block;
				width: 312px;
			}
		}
		.area {
			.el-select>.el-input {
				display: block;
				width: 156px;
			}
		}
	}
</style>
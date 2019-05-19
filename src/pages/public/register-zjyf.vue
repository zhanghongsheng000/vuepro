<template>
  <div class="wrap registercontainer">
    <div class="reg-contain">
      <div class="main">
        <div class="main-box">
          <div class="choice">
            <div class="logos">
              <h1 class="logo"><a href="javascript:;"><img src="../../assets/img/passenger/logotext.png" alt=""></a>
              </h1>
            </div>
            <div class="logo-text">请选择您要注册的企业服务产品，开启更顺畅的企业发展</div>
            <div class="links-items">
              <div class="links-cont clearfix">
                <div class="link-item fl links-bg1" @click="tabClick(0)">
                  <div class="bg-link" :class="{ 'link-active':iszjyf}"></div>
                </div>
                <div class="link-item fl links-bg2" @click="tabClick(1)">
                  <div class="bg-link"></div>
                </div>
                <div class="link-item fl links-bg3">
                  <div class="sm-links sm-link-bg1" @click="tabClick(2)"></div>
                  <div class="sm-links sm-link-bg2" @click="tabClick(3)"></div>
                </div>
              </div>
            </div>
          </div>
          <!---->
          <div class="zjyf-content">
            <div class="cho-id clearfix">
              <a href="javascript:;" :class="{active:tenant}" @click="isTenant" class="fl cho-item">我是租客</a>
              <a href="javascript:;" :class="{active:!tenant}" @click="isLandlord" class="fr cho-item">我是房东</a>
            </div>
            <div class="infos">
              <div class="in-item mb20">
                <div class="icons icon-user fl"></div>
                <div class="input-cont  fl">
                  <input class="input-big" v-model.trim="form.userName" type="text" placeholder="请输入用户名">
                </div>
              </div>
              <div class="in-item mb20">
                <div class="icons icon_phone fl"></div>
                <div class="input-cont  fl">
                  <input class="input-big" v-model.number.trim="form.phone" type="tel" placeholder="请输入手机号">
                </div>
              </div>
              <div class="in-item mb20">
                <div class="icons icon_password fl"></div>
                <div class="input-cont  fl">
                  <input class="input-sm" v-model.trim="form.codepic" type="text" placeholder="请输入图形验证码">
                </div>
                <div class="figure fr" @click="getImg"><img :src="src" alt=""></div>
              </div>
              <div class="in-item mb20">
                <div class="icons icon_password fl"></div>
                <div class="input-cont  fl">
                  <input class="input-sm" v-model.trim="form.code" type="text"  placeholder="请输入验证码">
                </div>
                <div class="figure fl" @click="sendcode">
                  <el-button type="primary" :disabled="disabled" >{{btntxt}}</el-button>
                </div>
              </div>
              <div class="in-item mb20">
                <div class="icons icon_password fl"></div>
                <div class="input-cont  fl">
                  <input class="input-big" v-model.trim="form.password" type="password" placeholder="设置密码（6-12个字符）">
                </div>
              </div>
              <div class="in-item">
                <div class="icons icon_password fl"></div>
                <div class="input-cont  fl">
                  <input class="input-big" @keyup.enter="submit" v-model.trim="form.confirm" type="password" placeholder="确认密码（6-12个字符）">
                </div>
              </div>
            </div>
          </div>
          <!---->
        </div>
        <div class="grey">
          <div class="btn-cont mb20">
            <el-button @click="submit" class="btn" type="primary">注册</el-button>
          </div>
          <div class="ser-box">
            <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
            <a class="service" href="javascript:;">《居金所企业服务协议》</a>
          </div>
          <div class="link-login">已有账号，
            <a href="http://www.jiatob.com/dist" target="_blank" class="colorNow" >登录</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        iszjyf:true,
        checked: true, //阅读并同意 居金所许可服务协议 默认同意
        checked: true,//阅读并同意 居金所许可服务协议 默认同意
        disabled:false,//禁用获取验证码按钮
        time:0,
        btntxt:"获取验证码",
        tenant:true,//我是租客和我是房东选择 默认租客
        src:'',//图形验证码 图片地址//
        form:{
          roleId:'1',//角色编号 默认租客
          userName:'',//用户名
          phone:'',//手机号
          codepic:'',//图形验证码
          vcode:'',//图形验证码id
          code:'',//验证码
          msgid:'',//验证码id
          password:'',//密码
          confirm:'',//确认密码
        }
      }
    },
    created() {
      this.getImg()
    },
    methods: {
      tabClick(index) {
        if(index == '0'){
          this.$router.push({path:'/register-zjyf'})
        }else if (index == '1') {
          this.$router.push({path:'/registerold',query:{type:'1'}})
        } else if (index == '2') {
          this.$router.push({path:'/register'})
        } else if (index == '3') {
          this.$router.push({path:'/registerold',query:{type:'2'}})
        }
      },
      isTenant(){//选择我是租客 改变角色编号
        this.tenant=true
        this.form.roleId=1
      },
      isLandlord(){//选择我是房东 改变角色编号
        this.tenant=false
        this.form.roleId=2
      },
      getImg(){//获取图形验证码
        this.$zjyfhttp.get('pictureMessage/getCode')
          .then((response)=>{
            const data = response.data
            if(data.resultCode=='200'){
              this.src='data:image/png;base64,'+data.result.imagePath
              this.form.vcode=data.result.vcode
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      sendcode(){//获取验证码
        if(!this.disabled){
          if(this.form.phone==''){
            this.$message({
              showClose: true,
              message: '请输入手机号',
              type: 'error'
            });
          }else if(!/^0?1[3456789]\d{9}$/.test(this.form.phone)){
            this.$message({
              showClose: true,
              message: '电话号码格式错误',
              type: 'error'
            });
          }else{
            this.disabled=true;
            this.time=60;
            this.timer();
            this.$zjyfhttp.get('phoneMessage/getCode',{
              params:{
                phone:this.form.phone,
                register:'Y'
              }
            })
              .then((response)=>{
                // console.log(response)
                const data = response.data
                if(data.resultCode=='200'){
                  this.$message({
                    showClose: true,
                    message: '验证码发送成功',
                    type: 'success'
                  });
                  this.form.msgid=data.result
                }else{
                  this.$message({
                    showClose: true,
                    message: '验证码发送失败',
                    type: 'error'
                  });
                }
              })
              .then((err)=>{
                console.log(err)
              })
          }
        }
      },
      timer(){
        if (this.time > 0) {
          this.time--;
          this.btntxt=this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntxt="重新获取验证码";
          this.disabled=false;
        }
      },
      submit(){
        if(!this.checked){
          this.$message({showClose: true, message: '请确认 我已阅读并同意拘谨所许可服务协议', type: 'error'});
        }else if(this.form.username==''){
          this.$message({showClose: true, message: '请输入用户名', type: 'error'});
        }else if(!/^0?1[3456789]\d{9}$/.test(this.form.phone)){
          this.$message({showClose: true, message: '电话号码格式错误', type: 'error'});
        }else if(this.form.codepic==''){
          this.$message({showClose: true, message: '请输入图形验证码', type: 'error'});
        }else if(this.form.code==''){
          this.$message({showClose: true, message: '请输入验证码', type: 'error'});
        }else if(this.form.password.length<6||this.form.password.length>20){
          this.$message({showClose: true, message: '您输入密码格式不对', type: 'error'});
        }else if(this.form.password!=this.form.confirm){
          this.$message({showClose: true, message: '密码两次输入的不一致', type: 'error'});
        }else{
          this.$zjyfhttp.post('register',{
            userName:this.form.userName,//用户名 userName
            mobilePhone:this.form.phone,//手机号 mobilePhone
            verifyPicCode:this.form.codepic,//图形验证码 verifyPicCode
            vCode:this.form.vcode,//图形验证码id vCode
            verifyCode:this.form.code,//手机验证码 verifyCode
            messageId:this.form.msgid,//手机验证码id messageId
            password:this.form.password,//密码 password
            confirmPassword:this.form.confirm,//确认密码 confirmPassword
            roleId:this.form.roleId//角色编号 roleId
          })
            .then((response)=>{
              console.log(response)
              const data = response.data
              if(data.resultCode=='200'){
                this.$message({
                  showClose: true,
                  message: '注册成功,请登录',
                  type: 'success'
                });
                // this.$router.push({path:'/'})
                window.location.href='http://www.jiatob.com/dist'
              }else{
                this.$message({
                  showClose: true,
                  message: data.result,
                  type: 'error'
                });
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .colorNow {
    color: #0f71ca !important;
  }
  .layers{
    padding-top: 30px;
  }
  .floorbtn{
    cursor: pointer;
    border:solid 1px #dcdfe6;
    margin-right:10px;
    margin-bottom:10px;
    color: #606266;
    padding:12px 20px;
    font-size:14px;
    line-height: 1;
    border-radius: 4px;
    display: inline-block;
  }
  .floorbtn.active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    background-color: #ecf5ff;
  }
  .plr20{padding:0 20px;margin-right:10px;}
  .wrap {
    background: url("../../assets/img/passenger/register-bg.png") left top no-repeat;
    background-size: cover;
    height: 1292px;
    .reg-contain {
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
  .zjyf-content{
    padding: 10px 44px 40px;
    box-sizing: border-box;
    width: 410px;
    margin-left: auto;
    margin-right: auto;
    .cho-id{margin-bottom: 36px;}
    .mb20{margin-bottom: 20px;}
    .cho-item.active{background: url("../../assets/img/zjyf/asdf.png");}
    .cho-item{
      width:144px;
      height:46px;
      line-height: 46px;
      text-align: center;
      background:url("../../assets/img/zjyf/asd.png") left top no-repeat;
      color:#fff;
      font-size:16px;
    }
    .infos{
      .in-item{
        height:38px;
        border:solid 1px #dcdcdc;
      }
      .icons{
        width:38px;
        height:100%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        border-right:solid 1px #dcdcdc;
      }
      .icon-user{background-image: url("../../assets/img/zjyf/icon_user.png")}
      .icon_phone{background-image: url("../../assets/img/zjyf/icon_phone.png")}
      .icon_password{background-image: url("../../assets/img/zjyf/icon_password.png")}
      .input-cont input{
        padding:0 10px;
        height:38px;
        line-height: 38px;
        font-size: 14px;
        /*color:#999;*/
      }
      .input-big{width:258px;}
      .input-sm{width:145px;}
      .figure{
        height: 34px;
        width: 110px;
        padding:2px 3px 2px 0;
        cursor: pointer;
        img{
          height: 34px;
          width: 110px;
        }
        .el-button--primary{
          background-color: #0f71ca;
          border-color:#0f71ca;
          height: 34px;
          width: 110px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          padding: 0;
        }
      }
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
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #0f71ca;
      }
      .service {
        color: #57aef4;
        &:hover {
          color: #0f71ca;
        }
      }
    }

    .layers .el-button{margin:0;margin-bottom:10px;margin-right:10px;}
    .layers .el-button--default.active{background-color: #66b1ff;color:#fff;}
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
      .el-select > .el-input {
        display: block;
        width: 312px;
      }
    }

    .area {
      .el-select > .el-input {
        display: block;
        width: 156px;
      }
    }
  }
</style>


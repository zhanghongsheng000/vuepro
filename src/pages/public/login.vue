<template>
  <div>
    <div v-if="!isShowForFlashNginx" style="font-size:15px;line-height:35px;color:rgb(165, 170, 179);text-align:center;">
      正在跳转。。。
    </div>
    <div id="loginvue" v-if="isShowForFlashNginx">
      <div class="login-box">
        <div class="log-left">
          <a href="http://www.jiatob.com" class="returnToIndex"></a>
          <div class="loginbtn-box">
            <div class="logina" @click="handleClick(2)" :class="{'active':2==itemIndex}"></div>
            <div class="loginb" @click="handleClick(1)" :class="{'active':1==itemIndex}"></div>
            <div class="loginc" @click="handleClick(3)" :class="{'active':3==itemIndex}"></div>
          </div>
        </div>
        <div class="log-right" v-show="login">
          <div class="infos">
            <p class="red-text"><span>居金之地</span><span>享您所想</span></p>
            <div class="forms">
              <div class="forma pt85" v-if="itemIndex==2">
                <div class="form-item mb20">
                  <input type="text" class="bigipt" placeholder="请输入用户名" v-model.trim="userName">
                </div>
                <div class="form-item mb30">
                  <input type="password" class="bigipt" placeholder="请输入密码" v-model.trim="password" @keyup.enter="loginA">
                </div>
                <div class="login-btn">
                  <a href="javascript:;" @click="loginA"></a>
                </div>
              </div>
              <div class="formb pt85" v-if="itemIndex==1">
                <div class="form-item mb20">
                  <input type="text" class="bigipt" placeholder="请输入手机号" v-model.trim="userPhone">
                </div>
                <div class="form-item mb30 clearfix">
                  <input type="text" class="smallipt fl" placeholder="请输入验证码" v-model.trim="phoneCode" @keyup.enter="loginB">
                  <el-button class="fl sendCode" @click="sendCode" type="primary" :disabled="disabled" size="mini">
                    {{btntxt}}
                  </el-button>
                </div>
                <div class="login-btn">
                  <a href="javascript:;" @click="loginB"></a>
                </div>
              </div>
              <div class="formc pt85" v-if="itemIndex==3">
                <div class="codeImg">
                  <img :src="QRCodeAddress" alt="">
                </div>
              </div>
              <p class="red-text"><span>没有账号,</span>
                <router-link to="/register">注册</router-link>
              </p>
            </div>
            <div class="forget_psw" @click="find_password">
              <p class="red-text"><span style="color: #999999;">忘记密码</span></p>
            </div>
          </div>
        </div>
        <div v-show="find_psw">
          <div class="log-right">
            <div class="infos">
              <p class="red-text"><span>找回密码</span></p>
              <div class="forms">
                <div class="forma pt50">
                  <div class="form-item mb10">
                    <input type="text" class="bigipt" placeholder="请输入手机号" v-model.trim="telphoneNum">
                  </div>
                  <div class="form-item mb10">
                    <input type="text" class="bigipt" placeholder="验证码" v-model.trim="idCode">
                    <div class="codeBtn fl" @click="sendCode2">
                      <el-button type="primary" :disabled="disabled" size="mini">{{btntxt}}</el-button>
                    </div>
                  </div>
                  <div class="form-item mb10">
                    <input type="password" class="bigipt" placeholder="请输新密码" v-model.trim="newPassword">
                  </div>
                  <div class="form-item mb10">
                    <input type="password" class="bigipt" placeholder="请再次输入密码" v-model.trim="rePassword">
                  </div>
                  <div class="sure_changePsw">
                    <button type="primary" @click="sure_changePassword">确定</button>
                  </div>
                </div>
              </div>
              <div class="forget_psw" @click="goback_login">
                <p class="red-text"><span style="color: #999999;">返回登录页</span></p>
              </div>
            </div>
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
        //nginx服务器下，使用History模式刷新页面，需要回到这个页面来重新进行路由跳转，这里是为了让跳转回闪这个页面时，不显示登录页本身内容，不要删除
        isShowForFlashNginx: true,
        //登录方式。1为手机号登录，2为手机号登录
        type: 2,
        itemIndex: 2,
        disabled: false,
        btntxt: "获取验证码", //倒计时显示
        time: 0,
        userName: '', //用户名
        password: '', //密码
        userPhone: '', //手机号
        phoneCode: '', //验证码
        messageId: '', //验证码id
        //二维码地址
        QRCodeAddress: '',
        //用户信息，用于写入session

        //				9-19日添加忘记密码功能
        login: true,
        find_psw: false,
        telphoneNum: '',
        idCode: '',
        newPassword: '',
        rePassword: '',
        msgId: '',

        userInfo: {
          login: false,
          companyId: '',
          companyName: '',
          userId: '',
          userName: '',
          userRealName: '',
          telPhone: '',
          btntxt: "获取验证码", //倒计时显示
          roleList: [
            /*{
                          roleId:customerRoleId,
                          roleName:roleName
                        }*/
          ],
          token: ''
        },
        //跳转字典
        toRouter: this.$store.state.toRouter,
        //扫码登录的轮询的setTimeout
        timeOut: '',
      }
    },
    methods: {
      updateOnline(){
        this.$httpPasser.post('updateOnline',
          {
            customerUserId:this.$local.sefetch('info').userId,
            status:'N'
          }
        ).then((res)=>{
          if(res.data.resultCode=='200'){

          }
        })
      },
      //获取验证码
      sendCode() {
        if(!this.disabled) {
          if(this.userPhone == '') {
            this.$message({
              showClose: true,
              message: '请输入手机号',
              type: 'error'
            });
          } else if(!/^0?1[3456789]\d{9}$/.test(this.userPhone)) {
            this.$message({
              showClose: true,
              message: '电话号码格式错误',
              type: 'error'
            });
          } else {
            this.disabled = true;
            this.time = 60;
            this.timer();
            this.$httpPasser.get('/phoneMessage/getCode', {
              params: {
                telphone: this.userPhone
              }
            })
              .then((response) => {
                const data = response.data
                // console.log(data)
                if(data.resultCode == '200') {
                  this.$message({
                    showClose: true,
                    message: '验证码发送成功',
                    type: 'success'
                  });
                  this.messageId = data.result
                } else {
                  this.$message({
                    showClose: true,
                    message: data.result,
                    type: 'error'
                  });
                }
              })
              .catch((err) => {
                this.$message({
                  showClose: true,
                  message: '验证码发送失败',
                  type: 'error'
                });
              })
          }
        }
      },
      timer() { //获取验证码倒计时
        if(this.time > 0) {
          this.btntxt = this.time + "S";
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.btntxt = "获取验证码";
          this.disabled = false;
        }
      },
      handleClick(index) {
        this.login = true;
        this.find_psw = false;
        this.itemIndex = index
        //this.logform.type = index;
        if(index == 1) {
          this.type = index;
          if(this.timeOut != '') {
            clearTimeout(this.timeOut)
          }
        } else if(index == 2) {
          this.type = index;
          if(this.timeOut != '') {
            clearTimeout(this.timeOut)
          }
        } else if(index == 3) {
          this.getQRCode() //获取二维码
        }
      },
      //账号登录
      loginA() {
        if(this.userName == '') {
          this.$message({
            showClose: true,
            message: '请输入用户名',
            type: 'error'
          });
        } else if(this.password == '') {
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'error'
          });
        } else {
          this.$httpPasser.post('webLogin', {
            app: 'web',
            type: this.type,
            telphone: this.userName,
            password: this.password
          }).then((response) => {
            const data = response.data;
            if(data.resultCode == '200') {
              if(this.tempPasserLoginCheck(data.result.userRoleList)) {
                this.userInfo.login = true;
                this.userInfo.companyId = data.result.companyId;
                this.userInfo.companyName = data.result.companyName;
                this.userInfo.userId = data.result.userId;
                this.userInfo.userName = data.result.userName;
                this.userInfo.userRealName = data.result.userRealName;
                this.userInfo.telPhone = data.result.telphone;
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: 'success'
                });
                //将服务器的rolelist写入到用户信息对象
                this.writeRoleList(data.result.userRoleList)
                console.log(data.result.token)
                this.userInfo.token = data.result.token;
                this.$local.sesave('info', this.userInfo)
                this.$store.state.companyName = this.userInfo.companyName;
                //根据角色跳转页面
                this.goToNextByUserRole(data)
              } else {
                this.$message({
                  showClose: true,
                  message: "您没有通行客权限，请您注册通行客产品",
                  type: 'error'
                });
              }
            } else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          }).catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        }
      },
      loginB() { //手机号登录
        if(this.userPhone == '') {
          this.$message({
            showClose: true,
            message: '请输入手机号',
            type: 'error'
          });
        } else if(!/^0?1[3456789]\d{9}$/.test(this.userPhone)) {
          this.$message({
            showClose: true,
            message: '电话号码格式错误',
            type: 'error'
          });
        } else if(this.phoneCode == '') {
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'error'
          });
        } else {
          this.$httpPasser.post('webLogin', {
            type: this.type,
            telphone: this.userPhone,
            telephoneCode: this.phoneCode,
            telephoneMsgId: this.messageId,
            app: 'web'
          }).then((response) => {
            const data = response.data
            // console.log(data)
            if(data.resultCode == '200') {
              if(this.tempPasserLoginCheck(data.result.userRoleList)) {
                this.userInfo.login = true;
                this.userInfo.companyId = data.result.companyId;
                this.userInfo.companyName = data.result.companyName;
                this.userInfo.userId = data.result.userId;
                this.userInfo.userName = data.result.userName;
                this.userInfo.userRealName = data.result.userRealName;
                this.userInfo.telPhone = data.result.telphone;
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: 'success'
                });
                //将服务器的rolelist写入到用户信息对象
                this.writeRoleList(data.result.userRoleList)
                this.userInfo.token = data.result.token;
                this.$local.sesave('info', this.userInfo)
                this.$store.state.companyName = this.userInfo.companyName;
                this.goToNextByUserRole(data)
              } else {
                this.$message({
                  showClose: true,
                  message: "您没有通行客权限，请您点击注册注册通行客产品",
                  type: 'error'
                });
              }
            } else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          }).catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        }
      },
      //轮询登录
      //code为参数，times为调用参数。最多调用300次
      scanLogin(code, times) {
        let that = this;
        if(times <= 300) {
          this.$httpPasser.get(
            'qrCode/scanLogin', {
              params: {
                code: code
              }
            }
          ).then(
            res => {
              if(res.data.resultCode == 200) {
                if(this.tempPasserLoginCheck(res.data.result.userRoleList)) {
                  this.userInfo.login = true;
                  this.userInfo.companyId = res.data.result.companyId;
                  this.userInfo.companyName =  res.data.result.companyName;
                  this.userInfo.userId =  res.data.result.userId;
                  this.userInfo.userName =  res.data.result.userName;
                  this.userInfo.userRealName =  res.data.result.userRealName;
                  this.userInfo.telPhone =  res.data.result.telphone;
                  this.$message({
                    showClose: true,
                    message: "登录成功",
                    type: 'success'
                  });
                  //将服务器的rolelist写入到用户信息对象
                  this.writeRoleList( res.data.result.userRoleList)
                  this.userInfo.token =  res.data.result.token;
                  this.$local.sesave('info', this.userInfo)
                  this.$store.state.companyName = this.userInfo.companyName;
                  //根据角色跳转页面
                  this.goToNextByUserRole(res.data)
                } else {
                  this.$message({
                    showClose: true,
                    message: "您没有通行客权限，请您注册通行客产品",
                    type: 'error'
                  });
                }

              } else {
                if(this.timeOut != '') {
                  clearTimeout(this.timeOut)
                }
                this.timeOut = setTimeout(function() {
                  times++;
                  that.scanLogin(code, times);
                }, 1000)
              }
            }
          ).catch(
            (err) => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            }
          )
        }
      },
      //获取二维码
      getQRCode() {
        this.$httpPasser.get(
          'qrCode/enCode'
        ).then(
          res => {
            if(res.data.result.img) {
              this.QRCodeAddress = 'data:image/png;base64,' + res.data.result.img
              let code = res.data.result.code
              this.scanLogin(code, 0)
            }
          }
        )
      },
      //跳转页面
      goToNextByUserRole(data) {
        let temp = this.$local.sefetch('info').roleList;
        //如果没有角色，进入到居金所页面（普通公司）。
        if(temp.length == 0) {
          this.$router.push('/CommonCompany')
        }
        //如果角色大于1，那么如果有物业，则进入物业界面，没有物业，则进入居金所页面（普通公司）
        if(temp.length >= 1) {
          let tempRouter = ''
          for(let o in temp) {
            let key = temp[o]['baseProductId'] + '_' + temp[o]['customerRoleId'];
            /*//写入产品信息
                        let productInfo = {};
                        productInfo.productId = temp[0]['baseProductId'];
                        productInfo.productName = this.$store.state.productIdNameDectonary[productInfo.productId];
                        this.$local.sesave('productInfo',productInfo)*/
            //跳页
            tempRouter = this.toRouter[key]
            //一旦可以跳转物业页面，则立刻跳转，如果不能跳转页面，则继续循环，一直到结束为止。最后跳入居金所页面
            if(tempRouter == '/PropertyCompany') {
              this.$router.push({
                path: tempRouter
              });
              break;
            } else {
              continue;
            }
          }

          if(tempRouter != '') {
            this.$router.push({
              path: tempRouter
            });
          }
        }
        //this.$router.push('/BusinessHome')
      },
      //写入角色表
      writeRoleList(listFromServer) {
        for(let o in listFromServer) {
          if(listFromServer[o] && listFromServer[o]['customerRoleId'] != 33) {
            let tempRoleInfo = {};
            for(let p in listFromServer[o]) {
              if(listFromServer[o][p] == null && p == "baseProductId") {
                tempRoleInfo[p] = '0'
              } else {
                tempRoleInfo[p] = listFromServer[o][p];
              }

            }

            this.userInfo.roleList.push(tempRoleInfo)
          }
        }
      },
      //临时方法,用于其他产品未上线时，限制只有各类法人可以登录。
      tempPasserLoginCheck(roleList) {
        let re = false;
        for(let o in roleList) {
          if(roleList[o].customerRoleId == 10 || roleList[o].customerRoleId == 20 || roleList[o].customerRoleId == 21 || roleList[o].customerRoleId == 29 || roleList[o].customerRoleId == 30 || roleList[o].customerRoleId == 31) {
            re = true;
          }
        }
        console.log('这里的只是临时办法，产品全部开通之后，需要修改，勿忘！！！！')
        return re;
      },
      //nginx服务器下history地址的正确跳转
      getRealUrlForNginxAndHistory() {
        //nginx配置中需要将404后rewrite的页面中以参数方式传入原始的地址
        //本地获取参数，然后进行本地跳转，以避免404的尴尬~
        //?path=%2Fjujinsuo%2Fregisterold&params=type%3D2&commit=2
        let pathParam = window.location.search;
        //将地址后面的参数分成两部门，第一部分为地址，第二部分为参数
        let tempClassifyArray = pathParam.split('&params=');
        let routerPath = tempClassifyArray[0]; //?path=%2Fjujinsuo%2Fregisterold
        let routerParams = tempClassifyArray[1]; //type%3D2
        //
        if(routerPath != '' && routerPath != undefined && routerPath != null) {
          //如果进入了这个方法，则先隐藏本页面
          this.isShowForFlashNginx = false;
          //根据 = 将字符串转化为数组
          let pathArray = routerPath.split('=');
          let path = pathArray[1]
          //将字符串中的%2F替换成 /
          while(path.match('%2F')) {
            path = path.replace('%2F', '/');
          }
          path = path.replace('/' + path.split('/')[1], '')
          let param = ''
          if(routerParams != '' && routerParams != undefined && routerParams != null) {
            param = routerParams.replace('%3D', '=')
          }
          let routerUrl = path + '?' + param
          //跳页之前放开他
          this.$router.push({
            path: routerUrl
          })
        }

      },
      //非vue页面跳入的处理方法
      fromPageNotVue() {
        let userInfo = this.$local.fetch('info');
        let router = this.$local.fetch('router');
        //为了以后跳页方便，删除本地存储数据
        //window.localStorage.removeItem('info');
        //window.localStorage.removeItem('router');
        window.localStorage.removeItem('flagFromOtherPage');
        this.$local.sesave('info', userInfo)
        this.$store.state.companyName = userInfo.companyName;
        this.$router.push(router)
        //this.isShowForFlashNginx = true;
        //this.$router.push('/CommonCompany')
      },
      //修改密码获取验证码
      sendCode2() {
        if(!this.disabled) {
          if(this.telphoneNum == '') {
            this.$message({
              showClose: true,
              message: '请输入手机号',
              type: 'error'
            });
          } else if(!/^0?1[3456789]\d{9}$/.test(this.telphoneNum)) {
            this.$message({
              showClose: true,
              message: '手机号格式错误',
              type: 'error'
            });
          } else {
            this.disabled = true;
            this.time = 60;
            this.timer();
            this.$httpPasser.get('phoneMessage/getCode', {
              params: {
                telphone: this.telphoneNum,
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
                  this.msgId = data.result
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
      timer() { //获取验证码倒计时
        if(this.time > 0) {
          this.btntxt = this.time + "S";
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.btntxt = "获取验证码";
          this.disabled = false;
        }
      },
      find_password() {
        this.login = false;
        this.find_psw = true;
      },
      //返回登录页
      goback_login() {
        this.login = true;
        this.find_psw = false;
      },
      //确定修改密码
      sure_changePassword() {
        this.$httpPasser.post('account/updatePassword', {
          phone: this.telphoneNum,
          vcode: this.idCode,
          vcodeId: this.msgId,
          password: this.newPassword,
          rePassword: this.rePassword
        }).then((res) => {
          if(this.newPassword != this.rePassword) {
            this.$message.error('两次输入的密码不一致')
          } else {
            if(res.data.resultCode == '200') {
              this.$message.success("密码修改成功");
              this.login = true;
              this.find_psw = false;
              this.telphoneNum = '';
              this.idCode = '';
              this.newPassword = '';
              this.rePassword = '';
              this.disabled = false;
              this.btntxt = "获取验证码";
            } else {
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'success'
              });
            }
          }
        })
      },
    },
    created() {
      //this.isShowForFlashNginx = false;
      let flagFromOtherPage = window.localStorage.getItem('flagFromOtherPage');
      if(flagFromOtherPage) {
        this.isShowForFlashNginx = false;
        this.fromPageNotVue();
      } else {
        this.getRealUrlForNginxAndHistory()
      }
      //this.isShowForFlashNginx = true;
    },
    beforeCreate(){
      /* let userId=this.$local.sefetch('info').userId
       if(userId){
         this.$httpPasser.post('updateOnline',
           {
             customerUserId:this.$local.sefetch('info').userId,
             status:'N'
           }
         ).then((res)=>{
           if(res.data.resultCode=='200'){
             this.$local.sesave("info", null)
             this.$local.sesave("pwdInit", null)
             this.$local.sesave("isID", null)
             this.$local.sesave("isBank", null)
             this.$local.sesave("identity", null)
           }
         })
       }*/
    },
  }
</script>
<style lang="less" scoped>
  input::-webkit-input-placeholder {
    color: #999999;
  }

  #loginvue {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/public/registerbk.png") left top no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    .login-box {
      width: 750px;
      height: 580px;
      position: absolute;
      left: 50%;
      margin-left: -385px;
      top: 50%;
      margin-top: -290px;
    }
    .log-left {
      .returnToIndex {
        position: absolute;
        left: 39px;
        top: 39px;
        height: 50px;
        width: 152px;
      }
      width: 540px;
      height: 403px;
      position: relative;
      top: 88px;
      background: url("../../assets/images/public/loginleft.png") left top no-repeat;
      .loginbtn-box {
        width: 142px;
        height: 200px;
        position: absolute;
        left: 302px;
        top: 110px;
      }
      .logina,
      .loginb,
      .loginc {
        position: absolute;
        height: 45px;
        background-position: left top;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .logina {
        background-image: url(../../assets/images/public/loginA2.png);
        width: 55px;
        left: 75px;
        top: 0;
      }
      .logina.active {
        background-image: url(../../assets/images/public/loginA.png);
        width: 128px;
        left: 0;
      }
      .loginb {
        background-image: url(../../assets/images/public/loginB2.png);
        width: 55px;
        top: 70px;
        left: 75px;
      }
      .loginb.active {
        background-image: url(../../assets/images/public/loginB.png);
        width: 128px;
        left: 0;
      }
      .loginc {
        background-image: url(../../assets/images/public/loginC2.png);
        width: 55px;
        top: 130px;
        left: 75px;
      }
      .loginc.active {
        background-image: url(../../assets/images/public/loginC.png);
        width: 128px;
        left: 0;
      }
    }
    .log-right {
      width: 320px;
      height: 580px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, .3);
      .infos {
        width: 246px;
        height: 400px;
        padding: 80px 27px 80px;
        border: solid 1px #e5e5e5;
        margin: 10px auto 0;
        .red-text {
          color: #f84541;
          font-size: 18px;
          line-height: 1;
          text-align: center;
          font-family: "Microsoft YaHei";
          span {
            margin: 0 7px;
          }
          a {
            color: #f84541;
          }
        }
      }
    }
    .forms {
      .pt85 {
        padding-top: 85px;
      }
      .pt50 {
        padding-top: 50px;
      }
      .mb20 {
        margin-bottom: 20px;
      }
      .mb10 {
        margin-bottom: 10px;
      }
      .mb30 {
        padding-bottom: 30px;
      }
      .form-item {
        width: 248px;
        height: 54px;
        background: url("../../assets/images/public/iptbg.png") left top no-repeat;
      }
      .bigipt {
        width: 248px;
        height: 54px;
        line-height: 52px;
        padding: 7px 15px 10px;
        box-sizing: border-box;
        font-size: 14px;
      }
      .smallipt {
        width: 130px;
        height: 54px;
        line-height: 52px;
        padding: 7px 15px 10px;
        box-sizing: border-box;
        font-size: 14px;
        margin-right: 6px;
      }
      .login-btn {
        width: 176px;
        height: 62px;
        background: url("../../assets/images/public/loginbg.png");
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        a {
          display: inline-block;
          width: 150px;
          height: 36px;
          margin-left: 14px;
          margin-top: 9px;
        }
      }
      .sendCode {
        width: 100px;
        height: 30px;
        margin-top: 10px;
      }
      .codeImg {
        text-align: center;
        margin-bottom: 23px;
        img {
          width: 217px;
          height: 217px;
          vertical-align: middle;
        }
      }
    }
    .forget_psw {
      margin-top: 70px;
      margin-left: 170px;
      p {
        width: 90px;
        span {
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
    .sure_changePsw {
      text-align: center;
      margin-top: 20px;
      button {
        cursor: pointer;
        display: inline-block;
        width: 140px;
        height: 44px;
        background: black;
        border-radius: 40px;
        color: #fff;
        font-size: 16px;
      }
    }
    .codeBtn,
    .figure {
      button {
        width: 92px;
        position: absolute;
        margin-left: 143px;
        margin-top: -43px;
      }
      img {
        width: 92px;
        height: 28px;
        position: relative;
        top: 1px;
      }
    }
  }
</style>

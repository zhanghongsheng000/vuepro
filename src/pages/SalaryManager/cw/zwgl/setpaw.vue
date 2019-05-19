<template>
  <div class="bindcard-contain">
    <div class="bindcard-width">
      <div class="bindcard-title">
        <strong>财务管理</strong>
      </div>
      <div class="bindcard-con">
        <div class="bindcard-con-title">
          <span class="text">设置交易密码1111</span>
          <div class="line"></div>
        </div>
        <div class="bindcard-con-body clearfix">
          <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">手机号码：</label>
              </span>
            <div class="fl input-type">
              <el-input v-model.number.trim="utel" placeholder="请输入手机号" clearable></el-input>
            </div>
          </div>
          <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">验证码：</label>
              </span>
            <div class="fl input-type">
              <el-input v-model.trim="ucode" placeholder="请输入验证码" clearable></el-input>
            </div>
            <div class="btns fl">
              <el-button type="primary" :disabled="disabled" @click="sendcode" >{{btntxt}}</el-button>
            </div>
          </div>
          <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">设置密码：</label>
              </span>
            <div class="fl input-type">
              <el-input v-model.trim="password" type="password" placeholder="请输入6位数的数字密码" clearable></el-input>
            </div>
          </div>
          <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">重复密码：</label>
              </span>
            <div class="fl input-type">
              <el-input v-model.trim="repassword" type="password" placeholder="重复密码" clearable></el-input>
            </div>
          </div>
          <div class="text-tip">
            提示：交易密码设置一次,提现和充值的密码都为此密码。
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="setBtns">设置交易密码</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data(){
      return {
        disabled:false,//获取验证码 按钮禁用状态
        time:0,
        btntxt:"获取验证码",
        utel:'',//手机号
        ucode:'',//用户输入的手机验证码
        ucodeId:'',//获取验证ID
        password:'',//密码
        repassword:''//重复密码
      }
    },
    methods:{
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
      sendcode(){//获取验证码
        if(!this.disabled){
          if(this.utel==''){
            this.$message({
              showClose: true,
              message: '请输入手机号',
              type: 'error'
            });
          }else if(!/^0?1[3456789]\d{9}$/.test(this.utel)){
            this.$message({
              showClose: true,
              message: '电话号码格式错误',
              type: 'error'
            });
          }else{
            this.$http.post('phoneMessage/getCode',{
              telphone:this.utel
            })
              .then(res=>{
                let data = res.data
                if(data.resultCode=='200'){
                  this.time=60;
                  this.disabled=true;
                  this.timer();
                  this.$message({
                    showClose: true,
                    message: '验证码发送成功',
                    type: 'success'
                  });
                  this.ucodeId=data.result
                } else if(data.resultCode == '204'){
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
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
      setBtns(){
        let times=new Date().getTime()
        let userName = this.$local.sefetch('info').userName
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')

        if(this.utel==''){
          this.$message({
            showClose: true,
            message: '请输入手机号',
            type: 'error'
          });
        }else if(!/^0?1[3456789]\d{9}$/.test(this.utel)){
          this.$message({
            showClose: true,
            message: '电话号码格式错误',
            type: 'error'
          });
        }else if(this.password.length!='6'){
          this.$message({
            showClose: true,
            message: '密码格式错误，请设置6位数的数字密码',
            type: 'error'
          });
        }else if(this.password!=this.repassword){
          this.$message({
            showClose: true,
            message: '两次输入的密码不一致',
            type: 'error'
          });
        }else{
          this.$http2.post('asset/setPassword',{
            identity:identity,
            requestno:new Date().getTime()+'123',
            createtime:String(new Date().getTime()),
            sign:md5(userName+userTel+times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
            password:this.password,
            rePassword:this.repassword,
            phoneCode:this.ucode,
            messageId:this.ucodeId
          })
            .then(res=>{
              let data=res.data
              if(data.resultCode=='200'){
                this.$message({
                  showClose: true,
                  message: '设置密码成功',
                  type: 'success'
                });
                this.$router.push({name:'CwAccountsManage'})
              }else{
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
        }
      }
    },
    computed:{},
    created(){
//      console.log(this.$route.params.identity)
      console.log
    },
  }
</script>
<style lang="less" scoped>
  /*背景 公共宽度*/
  .bindcard-contain{
    background: url("../../../../assets/img/public/bk.jpg") left -80px no-repeat;
    height: 810px;
    .bindcard-width{
      width: 1000px;
      margin:0 auto;
    }
  }
  /*标题*/
  .bindcard-title strong{
    font-size: 28px;
    font-weight: 600;
    display: inline-block;
    padding: 40px 0 50px 0;
  }
  /*小标题 带线*/
  .bindcard-con-title{
    font-size: 16px;
    color: #333333;
    margin-bottom: 60px;
  }
  .line{
    height: 1px;
    background-color:#dbdbdb;
    margin-top: -10px;
  }
  .text{
    background-color: #fff;
    padding:0 10px;
    margin-left: 40px;
    line-height: 20px;
  }
  /*大框框*/
  .bindcard-con{
    background:#FFFFFF;
    min-height: 200px;
    padding: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    min-height:500px;
  }
  .block-con{
    margin-bottom: 20px;
  }
  .left-section{
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }
  .same label{
    display: inline-block;
    margin-top: 10px;
    color: #666666;
    font-size: 14px;
  }
  .btn-box{
    padding-top: 20px;
    padding-left: 120px;
  }
  .btns{
    margin-left: 20px;
  }
  .text-tip{
    padding-left: 130px;
    color:red;
  }
</style>

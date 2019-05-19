<template>
  <div class="bindcard-contain bindcardtwocontainer">
    <div class="bindcard-width" >
      <div class="bindcard-title">
        <strong>绑卡</strong>
      </div>
      <div class="bindcard-con">
        <div class="bindcard-con-title">
          <span class="text">储蓄卡</span>
          <div class="line"></div>
        </div>
        <div class="bindcard-con-body">
          <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">手机验证码：</label>
              </span>
            <div class="fl input-type">
              <el-input v-model.trim="codeNum" placeholder="请输入手机验证码" clearable></el-input>
            </div>
            <el-button type="primary" @click="sendcode" :disabled="disabled" class="ml20">{{btntxt}}</el-button>
          </div>

          <div class="btn-box pt30">
            <el-button type="primary" @click="nextTab">下一步</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  export default {
    data(){
      return {
        disabled:false,
        time:0,
        btntxt:"获取验证码",
        codeNum:'',//手机验证码
        requestno:'',
        bankNum:''
      }
    },
    methods: {
      nextTab(){//下一步
        if(this.codeNum==''){
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'error'
          });
        }else{
          let times=new Date().getTime()
          let userName = this.$local.sefetch('info').userName
          let userTel = this.$local.sefetch('info').telPhone
          let identity = this.$local.sefetch('identity')
          this.$http2.post('userBankCard/smsConfirm',{
            identity:identity,//用户唯一标识
            requestno:this.$route.query.requestno,//请求号
            vCode:this.codeNum,//验证码
            bankCode:this.$route.query.bankNum,//银行卡号
            createtime:times,//
            sign:md5(userName+userTel+times+identity+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
          })
            .then(res=>{
              let data=res.data
              if(data.resultCode=='200'){
                console.log(data)
                this.$message({
                  showClose: true,
                  message: '恭喜你绑卡成功',
                  type: 'success'
                });
                this.$router.push({name:'CwBindCardOne'})
              } else if(data.resultCode == '204'){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err)
            })
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
      sendcode(){//重新获取验证码
        if(!this.disabled){
          let times=new Date().getTime()
          let userName = this.$local.sefetch('info').userName
          let userTel = this.$local.sefetch('info').telPhone
          let identity = this.$local.sefetch('identity')
          this.$http2.post('userBankCard/smsReSend',{
            identity:identity,//用户唯一标识
            requestno:this.$route.query.requestno,//请求号
            createtime:times,
            sign:md5(userName+userTel+times+identity+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
          })
            .then(res=>{
              let data = res.data
              if(data.resultCode=='200'){
                this.$message({
                  showClose: true,
                  message: '验证码发送成功',
                  type: 'success'
                });
              } else if(data.resultCode == '204'){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: data.result,
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
      }
    },
    component:{

    },
    created(){

      this.time=60;
      this.disabled=true;
      this.timer();
      /*console.log(this.$route.query.bankNum)
      console.log(this.$route.query.requestno)*/
      // console.log(this.$route.params)
      // this.requestno=this.$route.params.ids
      // this.bankNum=this.$route.params.bank
      // console.log(this.requestno)
      // console.log(this.bankNum)
    }
  }
</script>
<style lang="less" scoped>
  .ml20{
    margin-left: 20px;
  }
  .pt30{
    padding-top: 30px;
  }
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
  .radio-box{
    width: 150px;
    padding-left: 30px;
    position: relative;
    margin-right: 10px;
  }
  .other{
    cursor: pointer;
    margin-left: 10px;
    padding-right: 10px;
    line-height: 40px;
    a{color:#409EFF;
      margin-right: 10px;}
  }
  .bank-imgs{
    padding-top: 20px;
    height: 360px;
    overflow-y: auto;
    .radio-bank{
      margin-bottom: 20px;
    }
  }
  .mi{
    margin-left: 10px;
    padding-top: 8px;
    color:red;
    font-weight:bold;
    font-size: 24px;
  }
  .btn-box{
    text-align: center;
  }
  /**/
  .left-section{
    display: inline-block;
    width: 120px;
    text-align: right;
  }
  .same label{
    display: inline-block;
    margin-top: 10px;
    color: #666666;
    font-size: 14px;
  }
  .block-con{
    margin-bottom: 20px;
  }
  /*.block-con button{
    border: none;
    padding: 5px 8px;
    margin: 8px 0 0 10px;
    border-radius: 5px;
    color: #666666;
    cursor: pointer;
  }*/
  .input-type{
    margin-left: 10px;
  }
  .agree-con{
    text-align: center;
    margin-left: -500px;
  }
  .agree-con button{
    margin-bottom: 10px;
  }
  .agree-con a{
    color: #3a8ee6;
  }
  .age-btn{
    margin-top: 10px;
    background: #3a8ee6;
    color: #FFFFFF;
  }
  .compore{
    margin-top: 15px;
    margin-left: 12.5%;
  }
  .jy-input{
    margin-top: 10px;
  }
</style>
<style lang="less">
  .bindcardtwocontainer{
    /*银行选择按钮*/
    .radio-bank{
      padding-left: 50px !important;
      .el-radio.is-bordered{
        padding:0;
      }
      .el-radio__input{
        position: absolute;
        top: 12px;
        left:-30px;
      }
      .el-radio__label{
        /*padding-left: 0;*/
      }
    }
    .el-upload--picture-card{
      width: 200px;
      height: 120px;
    }
  }

</style>

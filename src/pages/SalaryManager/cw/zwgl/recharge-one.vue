<template>
  <div class="withdraw-contain rechargeonecontain">
    <div class="withdraw-width">
      <div class="withdraw-title">
        <strong>充值</strong>
      </div>
      <div class="withdraw-content-head">
        <span class="withdraw-card">充值金额到居金所</span>
        <span class="yue">余额：</span>
        <span class="money">¥{{yue}}</span>
      </div>
      <div class="withdraw-body">
        <div class="select-card clearfix">
          <span class="section-left fl section-bank1">选择银行卡：</span>
          <div class="fl">
            <div class="section-bank">

              <div class="bank-item clearfix" v-for="item,index in bankList">
                <div class="radio-bank fl">
                  <el-radio v-model="radio" :label="item.payUserBankcardId" border >
                    <img :src="require('../../../../assets/img/bank/'+item.bankNumber+'.png')" alt="">
                  </el-radio>
                </div>
                <div class="fl">
                  <span class="weihao">尾号 : {{latterFour(item.bankCode)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix withdraw-num">
          <span class="section-left fl withdraw-num1">充值金额：</span>
          <div class="fl">
            <el-input v-model.trim.number="money" placeholder="输入金额" clearable></el-input>
          </div>
          <div class="texts fl">元</div>
        </div>
        <div class="clearfix withdraw-num">
          <span class="section-left fl withdraw-num1">输入密码：</span>
          <div class="fl">
            <el-input v-model.trim.number="password" type="password" placeholder="请输入6位数密码" clearable ></el-input>
          </div>
        </div>
        <div class="clearfix arrive-date">
          <span class="section-left fl arrive-date1">到账时间：</span>
          <div class="fl">
            <span class="date-time">次日到账</span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="withdraw-footer">
        <div class="btn-style">
          <el-button type="primary" @click="putForward">充值</el-button>
        </div>
      </div>
      <div class="question">
        <strong>使用遇到的问题</strong>
        <div class="que">
          <p>此处文字未定</p>
          <p>大额充值资金无法一次性提现出去怎么办？</p>
          <p>答：建议使用充值退回功能，将大额充值的金额提现到银行卡上，立即使用</p>
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
        money:'',
        password:'',
        radio:'',
        bankList:[],
        yue:''
      }
    },
    methods:{
      test(){
        console.log(isNaN(this.money))
      },
      getBank(){
        let times=new Date().getTime()
        let userName = this.$local.sefetch('info').userName
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')
        this.$http2.post('userBankCard/getUserBankCard',{
          identity:identity,
          createtime:times,
          sign:md5(userName+userTel+times+identity+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
        })
          .then(res=>{
            let data=res.data
            // console.log(data)
            if(data.resultCode=='200'){
              this.bankList=data.result
              if(this.bankList.length=='0'){//如果没有银行卡 到绑卡页面
                this.$router.push({name:'CwBindCardOne'})
              }
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
      },
      latterFour(item){//截取银行卡后四位
        if(item){
          return item.slice(-4)
        }
      },
      putForward(){//充值按钮
        let times=new Date().getTime()
        let userName = this.$local.sefetch('info').userName
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')
        if(this.radio==''){
          this.$message({
            showClose: true,
            message: '请选择银行卡',
            type: 'error'
          });
        }else if(this.money==''||isNaN(this.money)){
          this.$message({
            showClose: true,
            message: '请输入数字金额',
            type: 'error'
          });
        }else if( this.password==''||isNaN(this.password) ) {
          this.$message({
            showClose: true,
            message: '请输入6位数字密码',
            type: 'error'
          });
        }else{
          this.$http2.post('asset/transaction',{
            identity:identity,
            requestno:times+'321',
            createtime:times,
            sign:md5(userName+userTel+times+identity+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
            password:this.password,
            amount:this.money,
            cardId:this.radio,
            type:'1'
          })
            .then(res=>{
              let data=res.data
              console.log(data)
              if(data.resultCode=='200'){
                this.$router.push({name:'CwExtractTwo'})
                this.$message({
                  showClose: true,
                  message: '充值成功',
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
                  message: data.resultCodeDesc,
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
    computed:{
    },
    created(){
      this.getBank()
      let times=new Date().getTime()
      let userName = this.$local.sefetch('info').userName
      let userTel = this.$local.sefetch('info').telPhone
      let identity = this.$local.sefetch('identity')
      this.$http2.post('asset/getInfo',{//获取账务信息里面的余额
        identity:identity,
        createtime:times,
        sign:md5(userName+userTel+times+identity+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
      })
        .then(res=> {
          let data = res.data
          // console.log(data)
          if (data.resultCode == '200') {
            this.yue=data.result.amount
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
    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
        let isBand=vm.$local.sefetch('pwdInit')
        let isName=vm.$local.sefetch('isID')
        let isBanks=vm.$local.sefetch('isBank')
        if(isName=='false'){//未实名认证不能充值去实名认证页面
          vm.$router.push({name:'CwNameConfirm'})
        }else if(isBand=='false'){//未设置交易密码不能充值去设置交易密码页面
          vm.$router.push({name:'CwSetPaw'})
        }else if(isBanks=='false'){//未绑卡不能充值 去绑卡页面
          vm.$router.push({name:'CwBindCardOne'})
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .weihao{
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;
  }
  .radio-bank{
    margin-bottom: 20px;
  }
  .texts{
    padding-left: 10px;
    line-height: 40px;
    font-size: 16px;
  }
  .withdraw-contain{
    background: url("../../../../assets/img/public/bk.jpg") left -80px no-repeat;
    /*height: 810px;*/
    .withdraw-width{
      width: 1000px;
      margin:0 auto;
    }
  }
  .withdraw-title strong{
    font-size: 28px;
    font-weight: 600;
    display: inline-block;
    padding: 40px 0 50px 0;
  }
  .withdraw-content-head{
    margin-top: 20px;
    height: 70px;
    background: #dbdbdb;
  }
  .withdraw-content-head span{
    vertical-align: bottom;
  }
  .withdraw-card{
    display: inline-block;
    margin:30px 0 0 35px;
    font-size: 18px;
    font-weight: 500;
    color: #333333;
  }
  .yue{
    font-size: 12px;
    color: #a4a4a4;
    margin-left: 20px;
  }
  .money{
    color: #cd0000;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    margin-top: 12px;
  }
  .money label{
    display: inline-block;
    margin-top: 10px;
  }
  .money label i{
    color: #cd0102;
    font-size: 14px;
    font-weight: 400;
  }
  .withdraw-body{
    background: #FFFFFF;
    padding: 80px 0 0 90px;
    min-height: 300px;
  }
  .section-left{
    display: inline-block;
    width: 100px;
    text-align: right;
    font-size: 16px;
    color: #4d4d4d;
    vertical-align: text-bottom;
  }
  .option1{
    border: 1px solid #ececee;
    padding: 10px 5px;
    border-radius: 5px;
    margin-bottom: 10px;
    vertical-align: bottom;
    padding: 10px 20px;
  }
  .option1 img{
    margin-top: 3px;
  }
  .section-bank{
    width: 720px;
  }
  .section-bank1 {
    margin-top: 10px;
  }
  .bank{
    color: #333333;
    margin: 0 10px;
  }
  .quick{
    display: inline-block;
    width: 28px;
    height: 15px;
    background: #74a6cb;
    color: #FFFFFF;
    padding: 3px;
    margin-left: 10px;
  }
  .next-day{
    display: inline-block;
    margin-left: 80px;
  }
  .next-day label{
    display: inline-block;
    margin-left: 120px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-card{
    margin-bottom: 20px;
  }
  .withdraw-num{
    margin-bottom: 30px;
  }
  .withdraw-num1{
    margin-top: 10px;
    margin-right:10px;
  }
  .arrive-date{
    padding-bottom: 30px;
  }
  .arrive-date1{
    margin-top: 10px;
    margin-right: 10px;
  }
  .date-time{
    font-size: 16px;
    color: #606266;
    display: inline-block;
    margin: 10px 0 0 5px;
  }
  .withdraw-footer{
    background: #e6e6e8;
    height:70px ;
  }
  .btn-style{
    text-align: center;
    padding-top: 15px;
  }
  .question{
    margin: 10px 0 20px 0;
    background: #82828c;
    height: 160px;
    color: #FFFFFF;
    text-indent: 40px;
    padding-top: 20px;
    line-height: 18px;
  }
  .que{
    margin-top: 10px;
  }
</style>
<style lang="less">
  .rechargeonecontain{
    /*银行选择按钮*/
    .radio-bank{
      padding-left: 40px !important;
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

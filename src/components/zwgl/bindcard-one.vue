<template>
    <div class="bindcard-contain">
      <div class="bindcard-width">
        <div class="bindcard-title">
          <strong>财务管理</strong>
        </div>
        <div class="bindcard-con">
          <div class="bindcard-con-title">
            <span class="text">我的银行卡</span>
            <div class="line"></div>
          </div>
          <div class="bindcard-con-body clearfix">
            <div class="my-card solid item fl" v-for="(item,index) in cardList" :key="index">
              <div class="my-card-item">
                <img :src="require('../../assets/img/bank/'+item.bankNumber+'.png')" alt="">
                <span>尾号{{latterFour(item.bankCode)}}</span>
              </div>
              <p><a href="javascript:;" @click="manage(item)">管理</a></p>
            </div>
            <div class="card-add dashed item fl" @click="toNext">
              <i class="el-icon-plus"></i>
              <br>
              <a href="javascript:;">添加银行卡</a>
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
        cardList:[],
      }
    },
    methods:{
      toNext(){//添加银行卡 1=>2
        this.$router.push({path:'bindcard-two'})
      },
      getUserBankCard(){//获取用户银行卡信息
        let times=new Date().getTime()
        let userId = this.$local.sefetch('info').userId
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')
        this.$http2.post('userBankCard/getUserBankCard',{
          identity:identity,
          createtime:times,
          sign:md5(userId+identity+times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
        })
          .then(res=>{
            let data=res.data
            if(data.resultCode=='200'){
              // console.log(data)
              this.cardList=data.result
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            } else{
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
      latterFour(item){//截取银行卡后四位
        return item.slice(-4)
      },
      manage(item){
         console.log(item)
        this.$router.push({path:'bindcard-four',query:{items:item} } )
      }
    },
    component:{

    },
    created(){
      this.getUserBankCard()
    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
        let isName=vm.$local.sefetch('isID')
        if(isName=='false'){//未实名认证不能绑卡去实名认证页面
          vm.$router.push({path:'nameConfirm'})
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .clear{
    clear: both;
  }

  /*背景 公共宽度*/
  .bindcard-contain{
    background: url("../../assets/img/public/bk.jpg") left -80px no-repeat;
    height: 810px;
    .bindcard-width{
      width: 100%;
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
  /*虚线*/
  .dashed{
    border-style:dashed;
    &:hover{
      border-color:#0f71ca;
    }
  }
  /*实线*/
  .solid{
    border-style:solid;
  }
  /**/
  .bindcard-con-body{
    padding:0 30px;
  }
  .el-icon-plus{
    font-size: 50px;
    font-weight: bold;
    color:#dbdbdb;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  /**/
  .item{
    height: 120px;
    margin:0 25px 30px;
  }
  .left-section{
    display: inline-block;
    width: 120px;
    text-align: right;
  }

  .my-card{
    width: 200px;
    border: 1px solid #dddddd;
    padding: 10px 20px;
    border-radius: 5px;
  }
  .my-card-item{
    margin-bottom: 30px;
  }
  .my-card-item img{
    vertical-align: middle;
  }
  .my-card-item span{
    font-size: 14px;
    color: #666666;
    margin: 0 10px 0 4px;
    vertical-align: middle;
  }
  .my-card p a{
    color: #0289CD;
    margin:10px 0 0 154px;
    font-size: 14px;
  }
  .card-add{
    width: 200px;
    border-width:1px;
    border-color:#dbdbdbdb;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .card-add img{
    cursor: pointer;
  }
  .card-add a{
    color: #0289CD;
  }
</style>

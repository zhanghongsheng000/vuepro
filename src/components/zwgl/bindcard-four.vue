<template>
    <div class="bindcard-contain">
      <div class="bindcard-width" >
        <div class="bindcard-title">
          <strong>财务管理</strong>
        </div>
        <div class="bindcard-con">
          <div class="bindcard-con-title">
            <span class="text">银行卡详情</span>
            <div class="line"></div>
          </div>
          <div class="bindcard-xq clearfix">
            <div class="bindcard-section fl">
              <img :src="require('../../assets/img/bank/'+itemData.bankNumber+'.png')" alt="">
              <p><span>**** **** **** {{latterFour(itemData.bankCode)}}</span></p>
            </div>
            <div class="fl card-del">
              <el-button @click="delBtn">删除</el-button>
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
        imgs:'',
        itemData:{}
      }
    },
    methods:{
      latterFour(item){//截取银行卡后四位
        if(item){
          return item.slice(-4)
        }
      },
      delBtn(){
        let times=new Date().getTime()
        let userId = this.$local.sefetch('info').userId
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')
        this.$http2.post('userBankCard/delete',{
          identity:identity,
          createtime:times,
          sign:md5(userId+identity+times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
          payUserBankcardId:this.itemData.payUserBankcardId,
        })
          .then(res=>{
            let data=res.data
            // console.log(data)
            if(data.resultCode=='200'){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.$router.push({path:'bindcard-one'})
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
      }
    },
    component:{

    },
    created(){
      if(!this.$route.query.items){
        this.$router.push({path:'bindcard-one'})
      }else{
        this.itemData=this.$route.query.items
        // console.log(this.itemData)
      }
    },
    beforeMount(){
    }
  }
</script>
<style lang="less" scoped>
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
  .bindcard-con{
    background:#FFFFFF;
    min-height: 200px;
    padding: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    min-height:300px;
  }
  .bindcard-section{
    border: 1px solid #dddddd;
    padding: 10px 20px;
    border-radius: 5px;
    width:150px;
    margin-right: 15px;
    p{
      padding-top:20px;
      padding-bottom: 20px;
    }
  }
  .bindcard-section span{
    color: #666666;
  }
  .card-del{
    padding-top: 74px;
  }
  .bindcard-xq{
    padding-left: 100px;
  }
</style>

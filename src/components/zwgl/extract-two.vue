<template>
    <div class="bindcard-contain">
      <div class="bindcard-width">
        <div class="bindcard-title">
          <strong>提现</strong>
        </div>
        <div class="progress">
          <div class="progress-top">
            <img src="../../assets/img/public/shalou.png" />
            <span>提现申请已提交，等待银行处理</span>
          </div>
          <div class="progress-bottom">
            <div class="bindcard-su">
              <img src="../../assets/img/public/bindcard-su.png" /><span>提现成功</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {}
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

  .progress{
    margin-top: 20px;
  }
  .progress-top{
    background: #fff9d9;
    border: 1px solid #e6cbb0;
    padding: 20px 0 20px 50px;
    vertical-align: middle;
  }
  .progress-top span{
    display: inline-block;
    margin: 8px 0 0 12px;
    font-size: 15px;
    font-weight: 500;
  }
  .progress-bottom{
    background: #FFFFFF;
    padding: 20px 0 50px 62px;
  }
  .back{
    font-size: 16px;
    color: #606266;
  }
  .progress-con{
    margin-top: 30px;
    padding: 0 0 50px 0;
  }
  .bank-apply{
    width: 240px;
    padding-left: 10px;
  }
  .bank-apply p{
    margin-left: -10px;
  }
  .bank-chuli{
    padding-left: 10px;
    width: 400px;
    margin-left: -34px;
  }
  .bank-chuli p{
    margin-left: -32px;
  }
  .activ{
    color: #2f7ccc;
    font-size: 15px;
    line-height: 20px;
  }
  .chuli-time{
    margin-bottom: 10px;
  }
  .withdraw-su p{
    margin-left: -66px;
  }
  .withdraw-su p:nth-child(1){
    font-size: 15px;
  }
  .withdraw-su p:nth-child(2){
    font-size: 12px;
  }
  .continue{
    margin-top: 45px;
  }
  .continue a{
    color: #2e7cce;
    font-size: 16px;
    margin: 0 20px 0 0;
  }
  .bindcard-su{
    /*background: #e8ffc6;*/
    padding: 10px 20px;
    margin:5px ;
    margin-bottom: 20px;
  }
  .bindcard-su span{
    display: inline-block;
    color: #666666;
    font-size: 16px;
    line-height: 20px;
    margin-top: 5px;
    margin-left: 15px;
  }
</style>

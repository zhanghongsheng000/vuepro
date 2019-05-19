<template>
  <div class="withdraw-contain">
    <div class="recharge-width">
      <div class="recharge-title">
        <strong>充值</strong>
      </div>

      <div class="recharge-con">
        <div class="recharge-su">
          <img src="../../assets/img/public/recharge-su.png" />
          <span class="pl20">恭喜您已成功充值</span>
        </div>
       <!-- <div class="contin">
          <a href="#">继续充值</a>
          <a href="#">返回账务管理</a>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>

<style lang="less" scoped>
  .withdraw-contain{
    background: url("../../assets/img/public/bk.jpg") left -80px no-repeat;
    height: 800px;
  }
  .pl20{
    padding-left: 20px;
  }
  .recharge-width{
    width: 1000px;
    margin:0 auto;
  }
  .recharge-title strong{
    font-size: 28px;
    font-weight: 600;
    display: inline-block;
    padding: 40px 0 50px 0;
  }
  .recharge-su{
    padding-top: 15px;
    padding-left: 20px;
  }
  .recharge-su span{
    display: inline-block;
    margin-top: 16px;
    font-size: 16px;
    color: #2e7cce;
  }
  .contin{
    text-align: center;
    margin-top: 20px;
  }
  .contin a{
    color: #2B2C32;
    margin-top: 20px;
    margin-right: 15px;
  }
  .contin a:hover{
    color: #2e7cce;
  }
</style>

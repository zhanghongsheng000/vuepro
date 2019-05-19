<template>
  <div class="Property_container">
    <div class="Property_title">
      <img src="../../../../../assets/img/IntelligentProperty/propertytitle.png" />
      <p>省时、省力、简单、快捷</p>
      <p>动动手指足不出户，一键收取物业费、水费、电费</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="less">
  .Property_container {
    background: url(../../../../../assets/img/IntelligentProperty/Intelligent_bg.png) center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding: 120px 0 302px 0;
    .Property_title{
      width: 550px;
      margin: 0 auto;
      border: 4px solid #8d98ba;
      padding-bottom:130px;
      img{
        padding: 85px 0 50px 50px;
      }
      p{
        font-size: 14px;
        line-height: 24px;
        color: #515e93;
        padding-left: 50px;
      }
    }
  }
</style>
<style lang="less">

</style>

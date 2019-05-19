<template>
  <div class="Renter_container">
    <router-view></router-view>
  </div>
  <!--<div style="font-size:15px;line-height:35px;color:rgb(165, 170, 179);text-align:center;">-->
    	<!--智能缴费功能正在完善，敬请期待！-->
  <!--</div>-->
</template>

<script>
  import Renthead from '@/components/IntelligentProperty/PaymentProperty/Renter/header' //IntelligentProperty
  export default {
    name: "index",
    components: {
      Renthead
    }
  }
</script>

<style lang="less" scoped>
  .Renter_container{
    /*background-image:url("../../../../assets/img/IntelligentProperty/renthome_bg.png");*/
  }
</style>

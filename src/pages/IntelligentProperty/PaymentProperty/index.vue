<template>
<!--  <div style="font-size:15px;line-height:35px;color:rgb(165, 170, 179);text-align:center;">
    智能缴费功能正在完善，敬请期待！
  </div>-->
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        isGo:true
      }
    },
    methods:{
      /*goToProperty(){
        this.$router.push({path:"/IntelligentProperty/Property"});
        //console.log("aaa")
      },
      goToRenter(){
        this.$router.push({path:"/IntelligentProperty/Renter"});
      }*/
    }
  }
</script>

<style lang="less" scoped>

</style>
<style lang="less">

</style>

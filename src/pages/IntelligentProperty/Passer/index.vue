<template>
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
    },
    created(){
      //this.$router.push({path:"/IntelligentProperty/Passer/Renter/RenterEmployeeManagement/RenterEmployeeManagement"});
    }
  }
</script>

<style lang="less" scoped>

</style>
<style lang="less">

</style>

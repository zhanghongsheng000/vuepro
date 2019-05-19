<template>
  <div class="Renter_container">
    <router-view></router-view>
  </div>
</template>

<script>
  import Renthead from '@/components/IntelligentProperty/Passer/Renter/header'
  export default {
    name: "index",
    components: {
      Renthead
    }
  }
</script>

<style lang="less" scoped>

</style>

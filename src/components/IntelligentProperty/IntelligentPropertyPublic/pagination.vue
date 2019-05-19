<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    :current-page.sync="currentIndex"
    layout="prev, pager, next"
    :page-count="currentPageTotal">
  </el-pagination>
</template>

<script>
  export default {
    props:{
      pageTotal:[String, Number]
    },
    data(){
      return{
        currentIndex:1,
        currentPageTotal:this.pageTotal
      }
    },
    methods:{
      handleCurrentChange(index){
        this.currentIndex = index;
        this.$emit('currentIndex',this.currentIndex)
      }
    }
  }
</script>

<style scoped>

</style>

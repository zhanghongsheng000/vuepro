<template>
  <div id="app" style="height: 100%;">
   <!-- <router-view/>-->
    <!--img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    updateOnline(){
      this.$httpPasser.get(
        'updateOnline',
        {params:
            {
              customerUserId:this.$local.sefetch('info').userId,
              status:'N'
            }
        }
      ).then((res)=>{
        console.log(res.data)
      })
    }
  },
  beforeDestroy(){

  },
  destroyed(){
    this.updateOnline()
  }
}
</script>
<style lang="less">
  .beforesiteml:before{
    content:'*';
    color: red;
    margin-right: 4px;
  }
  .common{
    width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  .clear50{
    height:50px;
    width:100%;
    clear:both;
  }
  .clear10{
    height:10px;
    width:100%;
    clear:both;
  }
  .clear20{
    height:20px;
    width:100%;
    clear:both;
  }
  .clear30{
    height:30px;
    width:100%;
    clear:both;
  }
  .clear5{
    height:5px;
    width:100%;
    clear:both;
  }
  .clear1{
    height:1px;
    width:100%;
    clear:both;
  }
  .clear40{
    height:40px;
    width:100%;
    clear:both;
  }
  .lh35{
    line-height: 35px;
  }
  .pt20{
    padding-top: 20px;
  }
  .font12{font-size: 12px;}
  .font14{font-size: 14px;}
  .font16{font-size: 16px;}
  .font18{font-size: 18px;}
  .font20{font-size: 20px;}
  .top-title {
    margin-bottom: 20px;
    .line {
      height: 1px;
      background-color: #ccc;
      margin-bottom: -17px;
    }
    .top-text {
      margin-left: 25px;
      font-size: 14px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
  }
  .el-table th {
    text-align: center!important;
    background-color: #e0e0e0!important;
    padding: 0px 0px;
    color: #5a5858!important;
    height:34px!important;
  }
  .el-table__row{
    td{
      text-align:center!important;
    }
  }
  .has-gutter td{
    text-align:center!important;
  }
</style>

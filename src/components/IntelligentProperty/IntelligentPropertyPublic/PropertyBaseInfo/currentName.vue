<template>
  <div class="currentName" v-if="isShow">
    <!--    <hr class="hrLine" style="width:100%;"/>
        <div class="currentNameText">{{currentName}}</div>-->
  </div>
</template>

<script>
  export default {
    name: "current-name",
    data() {
      return {
        currentName: '',
        //是否显示。因为首页不显示
        isShow: true
      };
    },
    watch: {
      '$route'(route) {
        this.currentName = this.$router.history.current.meta.title;
        if (this.currentName !== '物业公司') {
          this.isShow = true;
        }
      }
    },
    mounted: function () {
      this.currentName = this.$router.history.current.meta.title;
      if (this.currentName == '物业公司') {
        this.isShow = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .currentName {
    /*width: 1200px;*/
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    .hrLine {
      vertical-align: middle;
      display: inline-block;
    }
    .currentNameText {
      display: inline-block;
      height: 100%;
      position: relative;
      left: 50px;
      top: -80px;
      text-align: center;
      background-color: #ffffff;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>

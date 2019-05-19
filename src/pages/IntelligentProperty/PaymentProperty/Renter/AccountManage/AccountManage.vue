<template>
  <div class="accountManage">
    <!--<div class="Payment_head">-->
      <!--<div class="content_box">-->
        <!--<div class="Payment_content">-->
          <!--<img src="../../../../../assets/img/IntelligentProperty/rent_title1.png"/>-->
          <!--<p>省时、省力、简单、快捷 </p>-->
          <!--<p>动动手指足不出户，没有现金也能缴纳物业费、水费、电费</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="accountIndex">
      <router-view></router-view>
    </div>


  </div>
</template>

<script>
  import accountIndex from '@/components/zwgl/index'
  import footer from '@/components/public/footer'

  export default {
    name: "index",
    components: {
      accountIndex: accountIndex,
      'v-footer': footer
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .accountManage {
    width: 100%;
    background-color: white;
    .Payment_head {
      background: url(../../../../../assets/img/IntelligentProperty/AccountManage_bg.png) left top no-repeat;
      background-size: cover;
      min-width: 1200px;
      .content_box {
        padding: 150px 0 220px 0;
        .Payment_content {
          width: 1200px;
          margin: 0 auto;
          img {
            width: 451px;
            height: 37px;
            margin: 62px 0 30px 580px;
          }
          p {
            font-size: 10.5px;
            line-height: 18px;
            margin-left: 580px;
          }
        }
      }
    }
    .accountIndex {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
    .black {
      background: #3b3b3b;
    }
  }
</style>
<style lang="less">
  .accountManage {
    .el-upload--picture-card {
      width: 156px;
      height: 80px;
      line-height: 84px;
    }

    .tables {
      padding: 20px 0 100px 0;
    }
    .el-table--border th,
    .el-table__fixed-right-patch {
      text-align: center;
      background: #f0f0f0;
      color: #000000;
      font-size: 12px;
    }

    .el-table--enable-row-transition .el-table__body td {
      text-align: center;
      font-size: 10px;
    }
  }

</style>

<template>
  <div class="mainPart myBuildingList">
    <el-tag v-for="(buildingGroup,index) in buildingGroupList" :key="index">
      <span @click="todetails(buildingGroup.buildingGroupId)">{{buildingGroup.buildingGroupName}}</span>
    </el-tag>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        //产品ID
        productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
        buildingGroupList: []
      }
    },
    computed:{
      httpCurrent:function(){
        if(this.productId=='5'){
          console.log(this.$http)
          return this.$http;
        }
        else if(this.productId=='6'){
          console.log(this.$httpPasser)
          return this.$httpPasser;
        }
      }
    },
    methods: {
      getBuildingGroupList() {
        console.log(this.httpCurrent)
        this.httpCurrent.get('building/getBuildingGroupListByCompanyId', {
          params: {
            companyId: this.companyId
          }
        }).then(response => {
          this.buildingGroupList = response.data.result.buildingGroupList
        }).catch((err) => {
          console.log(err)
        })
      },

      todetails(buildingGroupId) {
        this.$router.push({
          path: 'myBuildingGroups',
          query: {
            buildingGroupId: buildingGroupId
          }
        })
      }
    },
    created() {
     this.getBuildingGroupList() //获取楼盘
    }
  }
</script>

<style scoped lang="less">
  .mainPart {
    /*    padding-left:50px;*/
    width: 1200px;
    min-height: 420px;
    form {
      line-height: 40px;
    }
    .clear20 {
      clear: both;
      height: 20px;
      width: 100%;
    }
  }
</style>
<style lang="less">
  .myBuildingList {
    line-height: 40px;
    .el-pagination {
      text-align: center;
      line-height: 40px;
    }
    .el-table th {
      text-align: center;
    }
    .el-table {
      font-size: 12px;
    }
    .cell {
      text-align: center;
    }
    .el-input__inner {
      height: 30px;
    }
    .el-tabs__nav {
      line-height: 40px;
    }
    .el-tag {
      margin-right: 5px;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="mainPart configPayment">
    <div>
      <div class="top-title" style="padding-top: 10px;">
        <div class="line"></div>
        <span class="top-text">配置缴费项</span>
      </div>
    </div>
    <el-table
      :data="feeTable"
      tooltip-effect="dark"
      :show-header="headerFlag"
      style="width: 100%"
      @selection-change="handleSelectionChange" :empty-text=text>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="feeItemName"
        label="收费项"
        width="120">
      </el-table-column>
      <el-table-column
        prop="feeItemName"
        label="收费ID"
        class-name="notShow"
        width="0">
      </el-table-column>

    </el-table>
    <el-button type="primary" @click="submitFeeItem">保存</el-button>
    <div class="clear20"></div>
  </div>

</template>

<script>
  export default {
    name: "config-payment",
    data() {
      return {
      	text:'正在加载，请稍候',
        headerFlag:false,
        feeTable: [
        ],
        feeIdArraySelection: [],
        companyId:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
        },
      };
    },
    components:{
    },
    methods: {
      handleSelectionChange(selection){
        this.feeIdArraySelection = [];
        for(let o in selection){
          //let temp = {}
          //temp.feeItemId = selection[o].feeItemId
          this.feeIdArraySelection.push(selection[o].feeItemId)
          //console.log(selection)
        }
      },
      getFeeItemList(){
        this.$http.get(
          'propertyCompany/getAllFeeItem',
        ).then(
          (response)=>{
            if(response.data.resultCode==200){
             this.feeTable = response.data.result;
            }
            else if(response.data.resultCode==204){
            	this.text ="暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
              this.feeTable = []
            }
            else{
            	this.text ="暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          }
        ).catch(
          (err) => {
            console.log(err)
          }
        )
      },
      submitFeeItem(){
        this.$http.post(
          'propertyCompany/setFeeItem',
          {
            companyId:this.companyId.companyId,
            feeItemId:this.feeIdArraySelection
          }
        ).then(
          (response)=>{
            if(response.data.resultCode==200){
              this.$message.success(response.data.resultCodeDesc)
            }
            else if(response.data.resultCode==204){
              this.$message.success(response.data.resultCodeDesc)
            }
            else{
              this.$message.error(response.data.resultCodeDesc)
            }
          }
        ).catch(
          (err) => {
            console.log(err)
          }
        )
      }
    },
    mounted(){
       this.getFeeItemList();
    }
  }
</script>

<style scoped lang="less">
  .configPayment{
    width:1040px;
    .addFeeDetail{
      width:100%;
    }
    .clear20{
      width:100%;
      height:20px;
      clear:both;
    }
  }
</style>
<style lang="less">

</style>

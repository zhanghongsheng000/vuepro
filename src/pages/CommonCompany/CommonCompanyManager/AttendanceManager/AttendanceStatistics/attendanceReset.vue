<template>
<div>
  <div>
    <span style="line-height:40px;font-size:14px;">开始日期：</span>
    <el-date-picker
    v-model="dataTime"
    type="date"
    value-format="yyyy-MM-dd"
    placeholder="选择日期">
    </el-date-picker>
    <el-button style="margin-left:5px;" type="primary" @click="handleClick">确定</el-button>
  </div>
</div>
</template>

<script>
    export default {
        name: "attendance-reset",
      data(){
          return {
            dataTime:''
          }
      },
      methods:{
        handleClick(){
          if(this.dataTime==''){
            this.$message({showClose: true, message: '请选择日期', type: 'error'});
          }else{
            this.$httpPasser.post('attendanceController/restart',{
              shopId:this.$local.sefetch('info').companyId,
              startTime:this.dataTime
            })
              .then(res=>{
                let datas=res.data
                if(datas.resultCode == '200'){
                  this.$message({
                    showClose: true,
                    message: '重新计算考勤成功',
                    type: 'success'
                  });
                }else{
                  this.$message({
                    showClose: true,
                    message: datas.resultCodeDesc,
                    type: 'error'
                  });
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      }
    }
</script>

<style scoped>

</style>

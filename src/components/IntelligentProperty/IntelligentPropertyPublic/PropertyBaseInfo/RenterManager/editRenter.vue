<template>
  <div class="mainPart">
    <el-form label-width="80px" :model="renter">
      <el-form-item label="租客姓名">
        <el-input v-model="renter.name"></el-input>
      </el-form-item>
      <el-form-item label="房间">
        <el-input v-model="renter.houseId"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="renter.telephone"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="renter.companyName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "add-renter",
    data(){
      return{
        renter:{
          name:"",
          houseId:"",
          telephone:"",
          companyName:""
        }
      }
    },
    methods:{
      submitForm(){
        console.log(this.renter)
      },
      resetForm(){
        for(let o in this.renter){
          this.renter[o] = "";
        }
      }
    }
  }
</script>

<style scoped lang="less">
</style>

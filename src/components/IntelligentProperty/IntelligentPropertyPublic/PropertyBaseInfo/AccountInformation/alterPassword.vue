<template>
  <div class="mainPart alertPassword">
    <el-form  label-width="80px" :model="editPassword">
      <el-form-item label="旧密码">
        <el-input type="password" v-model.trim="editPassword.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model.trim="editPassword.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model.trim="editPassword.ensurePassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifypsw">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "alter-password",
    data(){
      return{
        //产品ID
        productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
        editPassword:{
          oldPassword:"",
          newPassword:"",
          ensurePassword:"",
        },
        userId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:''
      }
    },
    computed:{
      httpCurrent:function(){
        if(this.productId=='5'){
          return this.$http;
        }
        else if(this.productId=='6'){
          return this.$httpPasser;
        }
      }
    },
    methods:{
      modifypsw() {
        if(this.editPassword.oldPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.editPassword.newPassword==''){
          this.$message.error('请输入旧密码');
        }
        else if(this.editPassword.ensurePassword==''){
          this.$message.error('请输入确认密码');
        }
        else if(this.editPassword.newPassword!=this.editPassword.ensurePassword){
          this.$message.error('两次输入密码不一致');
        }
        else{
          this.httpCurrent.get('account/update', {
            params: {
              oldPassword: this.editPassword.oldPassword,
              newPassword: this.editPassword.newPassword,
              rePassword: this.editPassword.ensurePassword,
              userId: this.userId
            }
          }).then((res) => {
            if(res.data.resultCode=='200'){
              this.$message.success('修改密码成功');
              this.editPassword.oldPassword = '';
              this.editPassword.newPassword = '';
              this.editPassword.ensurePassword = '';
            }
            else{
              this.$message.error(res.data.resultCodeDesc);
            }
          })
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .alertPassword{
    margin-left:auto;
    margin-right:auto;
    width:500px;
  }
</style>

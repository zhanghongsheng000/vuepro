<template>
  <div class="info-set">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text font14">更换管理员</span>
    </div>
    <div class="contain">
      <div class="con-item clearfix">
        <div class="con-text fl beforesiteml">新手机号</div>
        <div class="con-input fl">
          <el-input v-model.trim="telPhone" placeholder="请输入新手机号" clearable></el-input>
        </div>
      </div>
      <div class="con-item clearfix">
        <div class="con-text fl beforesiteml">姓名</div>
        <div class="con-input fl">
          <el-input v-model.trim="names" placeholder="请输入姓名" clearable></el-input>
        </div>
      </div>
      <div class="con-item clearfix">
        <div class="con-text fl ">用户名</div>
        <div class="con-input fl">
          <!--<p style="line-height:40px;font-size: 14px;">{{this.telPhone}}</p>-->
          <el-input v-model.trim="telPhone" placeholder="用户名" :disabled="true" clearable></el-input>
        </div>
      </div>
      <div class="con-item clearfix">
        <div class="con-text fl beforesiteml">密码</div>
        <div class="con-input fl">
          <el-input v-model.trim="password" placeholder="请输入密码" type='password' clearable></el-input>
        </div>
      </div>
      <div class="con-item clearfix">
        <div class="con-text fl beforesiteml">手机验证码</div>
        <div class="con-input fl ">
          <div class="borders clearfix">
            <input type="text" class="codeipt fl" v-model.trim="vcode" placeholder="请输入手机验证码" >
            <div class="fr click-btn" @click="sendCode">
              <el-button type="primary" :disabled="disabled" >{{btntxt}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button type="primary" @click="modifypsw">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-company-info-set",
    data(){
        return {
          telPhone:'',
          password:'',
          vcode:'',
          vcodeId:'',
          btntxt: "获取验证码",//倒计时显示
          time: 0,
          disabled: false,//获取验证码点击状态,
          names:''
        }
    },
    methods:{
      modifypsw(){
        // this.$router.push("/")
        if(this.telPhone==''){
          this.$message({showClose: true, message: '请输入新手机号', type: 'error'});
        }else if(this.names==''){
          this.$message({showClose: true, message: '请输入姓名', type: 'error'});
        }else if(this.password==''){
          this.$message({showClose: true, message: '请输入密码', type: 'error'});
        }else if(this.vcode==''){
          this.$message({showClose: true, message: '请输入验证码', type: 'error'});
        }else{
          this.$httpPasser.post('account/updateManager',{
            shopId:this.$local.sefetch('info').companyId,
            customerUserId:this.$local.sefetch('info').userId,
            username:this.telPhone,
            newPhone:this.telPhone,
            password:this.password,
            vcode:this.vcode,
            vcodeId:this.vcodeId,
            name:this.names
          })
            .then(res=>{
              let data = res.data
              if (data.resultCode == '200') {
                this.$message({message: '保存成功', type: 'success'});
                this.$router.push("/")
              }else{
                this.$message({showClose: true, message:data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      timer() {//获取验证码倒计时
        if (this.time > 0) {
          this.btntxt = this.time + "S";
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.btntxt = "获取验证码";
          this.disabled = false;
        }
      },
      sendCode(){
        if(this.telPhone==''){
          this.$message({showClose: true, message: '请输入手机号', type: 'error'});
        }else if (!/^0?1[3456789]\d{9}$/.test(this.telPhone)) {
          this.$message({showClose: true, message: '手机号码格式错误', type: 'error'});
        }else{
          this.disabled = true;
          this.time = 60;
          this.timer();
          this.$httpPasser.get('phoneMessage/getCode', {
            params: {
              telphone: this.telPhone,
              isRegister:'Y'
            }
          })
            .then((response) => {
              const data = response.data
              if (data.resultCode == '200') {
                this.$message({showClose: true, message: '验证码发送成功', type: 'success'});
                this.vcodeId = data.result
              } else {
                this.$message({showClose: true, message: '验证码发送失败', type: 'error'});
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.info-set{
  padding:30px 0px 20px 0;
  input::-webkit-input-placeholder{
    color:#c0c4cc;
  }
  .contain {
    padding-left: 330px;
    .con-item {
      margin-bottom: 20px;
    }
    .con-text {
      width: 80px;
      text-align: right;
      padding-right: 15px;
      line-height: 40px;
    }
    .con-input{
      width: 280px;
    }
    .mi {
      line-height: 40px;
      padding-left: 10px;
      font-size: 24px;
      color: red;
    }
    .codeipt{
      width: 130px;
      height: 40px;
      padding:0 15px;
      color:#606266;
    }
    .click-btn{
      padding-top: 1px;
      padding-right: 1px;
      height: 38px;
      width: 112px;
      button{
        height: 38px;
        width: 112px;
      }
    }
    .borders{
      border:solid 1px #dcdfe6;
      border-radius: 4px;
    }
  }
  .btns {
    padding-top: 40px;
    padding-left: 466px;
  }
}

</style>

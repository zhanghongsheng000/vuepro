<template>
  <div class="mainPart editLandlord">
    <el-form label-width="80px" :model="landlord" :rules="rules" ref="landlord">
      <el-form-item label="房东姓名" prop="customerName">
        <el-input v-model="landlord.customerName" clearable></el-input>
      </el-form-item>
      <el-form-item label="房间"  prop="buildingRoomId">
        <el-input v-model="landlord.buildingRoomId" @focus="showChosingDialog"></el-input>
      </el-form-item>
      <el-form-item label="手机号"  prop="telphone">
        <el-input v-model="landlord.telphone" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司名称"  prop="companyName">
        <el-input v-model="landlord.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('landlord')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisible"
      width="60%">
      <buildingCascader @buildingParam="buildingParam"></buildingCascader>
      <el-button type="success" @click="handleDialogSubmit()">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'
  export default {
    name: "add-landlord",
    data(){
      return{
        landlord:{
          //物业公司ID，从session中获取
          companyId:this.$local.sefetch('info').companyId?this.$local.sefetch('info').companyId:'1',
          //用户类型，1代表房东，2代表租客
          type:'1',
          //操作类型，1代表添加，2代表修改
          operation:'1',
          //房东或者租客姓名 必填
          customerName  :"",
          //房间ID 非必填
          buildingRoomId:"",
          //电话号码 必填
          telphone:"",
          //公司名称 必填
          companyName:""
        },
        //dialog是否显示标记
        dialogVisible:false,
        rules: {
          customerName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '姓名长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          /*buildingRoomId: [
            { required: true, message: '请选择房间', trigger: 'change' }
          ],*/
          telphone: [
            { required: true, message: '输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 0, max: 50, message: '公司名称长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    components:{
      buildingCascader: buildingCascader
    },
    methods:{
      submitForm(landlord){
        this.$refs[landlord].validate((valid) => {
          if (valid) {
            this._http('/business/saveLandlordTenant','get',this.landlord,(data)=>{
              this.$message.success('添加成功！')
              this.resetForm();
            })
          } else {
            this.$message.error('请填写必填项！')
            return false;
          }
        });
      },
      //显示选择房间对话框
      showChosingDialog(){
        this.dialogVisible = true;
      },
      //隐藏选择房间对话框
      hideChosingDialog(){
        this.dialogVisible = false;
      },
      //重置表单
      resetForm(){
        for(let o in this.landlord){
          this.landlord[o] = "";
        }
        this.landlord.companyId = this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'1';
        this.landlord.type = '1';
        this.landlord.operation = '1';
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam){
        console.log(buildingParam)
        if(buildingParam.buildingRoomId){
          this.landlord.buildingRoomId = buildingParam.buildingRoomId;
        }
        else{
          this.landlord.buildingRoomId = '';
        }
      },
      handleDialogSubmit(){
        this.dialogVisible = false;
      },
      /*工具方法*/
      _http(url,type,params,callback200){
        if(type=="get"){
          this.$http.get(
            url,
            {params:params}
          ).then(
            (response)=>{
              let data = response.data;
              if(data.resultCode==200){
                callback200(data)
              }
              else if(data.resultCode==204){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'warn'
                });
              }
              else{
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
        }
        else if(type=="post"){

        }

      }
    }
  }
</script>

<style scoped lang="less">
  .editLandlord{
    padding-left:50px;
    width:500px;
    line-height:20px;
  }
</style>

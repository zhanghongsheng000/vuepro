<template>
  <div class="mainPart addRenter">
    <el-form label-width="80px" :model="renter" :rules="rules" ref="renter">
      <el-form-item label="租客姓名" prop="customerName">
        <el-input v-model="renter.customerName"></el-input>
      </el-form-item>
      <el-form-item label="房间"  prop="buildingRoomName">
        <el-input v-model="renter.buildingRoomName" @focus="showChosingDialog"></el-input>
      </el-form-item>
      <el-form-item label="手机号"  prop="telphone">
        <el-input v-model="renter.telphone"></el-input>
      </el-form-item>
      <el-form-item label="公司名称"  prop="companyName">
        <el-input v-model="renter.companyName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('renter')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisible"
      width="60%">
      <buildingCascader @buildingParam="buildingParam" v-if="hackReset"></buildingCascader>
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
        renter:{
          //物业公司ID，从session中获取
          companyId:this.$local.sefetch('info').companyId?this.$local.sefetch('info').companyId:'1',
          //产品ID
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
          //用户类型，1代表物业，2代表租客，3,4代表房东
          type:'2',
          //操作类型，0代表添加，1代表修改
          operation:'0',
          //租客或者租客姓名 必填
          customerName  :"",
          //房间ID 非必填
          buildingRoomId:"",
          //电话号码 必填
          telphone:"",
          //公司名称 必填
          companyName:"",
          httpCurrent:null
        },
        //dialog是否显示标记
        dialogVisible:false,
        rules: {
          customerName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '姓名长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          buildingRoomName: [
            { required: true, message: '请选择房间', trigger: 'submit' }
          ],
          telphone: [
            { required: true, message: '输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 0, max: 50, message: '公司名称长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
        //刷新组件标记
        hackReset:false
      }
    },
    components:{
      buildingCascader: buildingCascader
    },
    computed:{
      httpCurrent:function(){
        if(this.renter.productId=='5'){
          return this.$http;
        }
        else if(this.renter.productId=='6'){
          return this.$httpPasser;
        }
      }
    },
    methods:{
      submitForm(renter){
        //转换参数名称
        this.renter.newBuildingRoomId = this.renter.buildingRoomId
        this.$refs[renter].validate((valid) => {
          if (valid) {
            this._http('/business/saveLandlordTenant','get',this.renter,(data)=>{
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
        this.refleshRoomComponent()
        this.dialogVisible = true;
      },
      //隐藏选择房间对话框
      hideChosingDialog(){
        this.dialogVisible = false;
      },
      //重置表单
      resetForm(){
        for(let o in this.renter){
          this.renter[o] = "";
        }
        this.renter.companyId = this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'1';
        this.renter.type = this.type;
        this.renter.operation = this.operation;
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam){
        if(buildingParam.buildingRoomId){
          this.renter.buildingRoomId = buildingParam.buildingRoomId;
          this.renter.buildingRoomName = buildingParam.buildingRoomName;
        }
      },
      handleDialogSubmit(){
        this.dialogVisible = false;
      },
      //强制刷新组件
      refleshRoomComponent(){
        //强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      /*工具方法*/
      _http(url,type,params,callback200){
        if(this.productId=='5'){
          console.log(this.$http)
          this.httpCurrent = this.$http;
        }
        else if(this.productId=='6'){
          console.log(this.$httpPasser)
          this.httpCurrent = this.$httpPasser;
        }
        if(type=="get"){
          this.httpCurrent.get(
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
.addRenter{
  width:500px;
  margin-left:50px;
}
</style>

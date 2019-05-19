<template>
  <div class="mainPart addLandlord">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">添加房东</span>
      </div>
    </div>
    <div class="form-item fl">
      <el-form label-width="80px" :model="landlord" :rules="rules" ref="landlord">
        <el-form-item label="房东姓名" prop="customerName">
          <el-input v-model="landlord.customerName" clearable placeholder="请输入房东姓名"></el-input>
        </el-form-item>
        <el-form-item label="房间"  prop="buildingRoomName">
          <el-input v-model="landlord.buildingRoomName" @focus="showChosingDialog"  placeholder="请选择房间"></el-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="telphone">
          <el-input v-model="landlord.telphone" clearable  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称"  prop="companyName">
          <el-input v-model="landlord.companyName" clearable  placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('landlord')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        title="选择房间"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible"
        width="60%">
        <buildingCascader @buildingParam="buildingParam" v-if="hackReset"></buildingCascader>
        <el-button type="success" @click="handleDialogSubmit()">确定</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'
  export default {
    name: "add-landlord",
    data(){
      return{
        //物业公司ID，从session中获取
        companyId:this.$local.sefetch('info').companyId?this.$local.sefetch('info').companyId:'1',
        //产品ID
        productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
        operation:'0',
        type:'3',
        landlord:{
          //物业公司ID，从session中获取
          companyId:this.$local.sefetch('info').companyId?this.$local.sefetch('info').companyId:'1',
          //产品ID
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
          //用户类型，1代表物业，2代表租客，3,4代表房东
          type:'3',
          //操作类型，0代表添加，1代表修改
          operation:'0',
          //房东或者租客姓名 必填
          customerName  :"",
          //房间ID 必填
          buildingRoomId:"",
          //房间名称
          buildingRoomName:"",
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
            { min: 1, max: 50, message: '姓名长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          buildingRoomName: [
            { required: true, message: '请选择房间', trigger: 'submit' }
          ],
          telphone: [
            { required: true, message: '输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
          ]
        },
        //选择房间是否显示，为了强制刷新组件
        hackReset:false
      }
    },
    computed:{
     /* httpCurrent:function(){
        if(this.productId=='5'){
          return this.$http;
        }
        else if(this.productId=='6'){
          return this.$httpPasser;
        }
      }*/
      httpCurrent:function(){
        return this.$httpPasser;
      }
    },
    components:{
      buildingCascader: buildingCascader
    },
    methods:{
      submitForm(landlord){
        this.$refs[landlord].validate((valid) => {
          if (valid) {
            //转换参数名称
            this.landlord.newBuildingRoomId = this.landlord.buildingRoomId
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
        this.refleshRoomComponent()
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
        this.landlord.type = this.type;
        this.landlord.operation = this.operation;
      },
      //获取并处理子模块回传的数据
      buildingParam(buildingParam){
        if(buildingParam.buildingRoomId){
          this.landlord.buildingRoomId = buildingParam.buildingRoomId;
          this.landlord.buildingRoomName = buildingParam.buildingRoomName;
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
  .addLandlord{
    /*padding-left:50px;*/
    /*width:500px;*/
    /*line-height:20px;*/
    .form-item{
      padding-left: 50px;
      padding-top: 30px;
    }
  }
</style>
<style lang="less">
  .addLandlord{
    .el-form-item__label{
      color: #000;
    }
  }
</style>

<template>
  <div id="materialsConfigureAdd">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">物料配置修改</span>
      </div>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">名称</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="meterielDetail.materielName" placeholder="请输入服务名称"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">计量单位</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="meterielDetail.materielUnit" placeholder="请输入计量单位"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">单价（元）</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="meterielDetail.materielPrice" placeholder="请输入单价"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">物料分类</div>
          <div class="item-ipt fl">
            <el-select v-model="meterielDetail.materielParentId" placeholder="请选择"  clearable>
              <el-option
                v-for="item in materialsList"
                :key="item.materielId"
                :label="item.materielName"
                :value="item.materielId">
              </el-option>
            </el-select>
          </div>
          <div class="item-text fl" style="margin-left: 10px">
            <el-button type="primary" @click="addMaterialsSort">添加物料分类</el-button>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">图片</div>
          <div class="item-ipt fl" id="addrent">
            <el-upload
              ref="uploads1"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :show-file-list="false"
              :on-success="uploadSuccessgs"
              :before-upload="beforeAvatarUpload">
              <img v-if="typeof meterielDetail.materielImgPath=='string'&&meterielDetail.materielImgPath!=''" :src="gImgUrl+meterielDetail.materielImgPath" class="avatar">
              <img v-else-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">备注</div>
          <div class="item-ipt fl" style="width: 220px;">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="meterielDetail.materielRemark">
            </el-input>
          </div>
        </div>
        <div class="items">
          <div class="item-text pl50">
            <el-button type="primary" @click="submitClick">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialogMaterialsSort">
      <el-dialog title="添加物料分类" :visible.sync="servicesAddDialog" width="500px">
        <!--<div class="sitem clearfix">
          <div class="siteml  fl">请选择父类：</div>
          <div class="sitemr fl">
            <el-select v-model="materielId" placeholder="请选择父类">
              <el-option v-for="(item,index) in materialsList"
              	 :key="item.materielId"
              	 :label="item.categroyName"
              	 :value="item.materielId"></el-option>
            </el-select>
          </div>
        </div>-->
        <div class="sitem clearfix">
          <div class="siteml  fl">分类名称：</div>
          <input type="text" v-model.trim="categroyName" class="inputtype" placeholder="请添加分类名称">
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="servicesAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addMaterialsClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import getUrl from '@/assets/js/global'
  import $gPasserUrl from '@/assets/js/gUrl'

  export default {
    name: "materialsConfigureAdd",
    data() {
      return {
        companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        customerUserId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
        materielId:this.$route.query.materielId,//物料分类ID
        gImgUrl:'',//图片地址前缀
        meterielDetail:{
          "shopId":this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          "customerUserId":this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
          "materielPrice": '',
          "materielName": '',
          "shopId": '',
          "materielUnit": '',
          "materielId": '',
          "materielRemark":'',
          "materielImgPath":'',
          "parentId":''
        },
        categroyName:'',
        materielParentId:'',
        dialogVisibleAddress: false,
        servicesAddDialog:false,
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
        imageUrl: '',//图片
        materialsList:[],//物料列表
        meterialsSort:'',
        sortName:'',
      }
    },
    components: {

    },
    created() {
      this.getAllCategroy()
      this.getDetail()
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    },
    computed: {},
    methods: {
      //获取物料详情
      getDetail(){
        this.$httpPasser(
          'materiel/getDetail',
          {
            materielId:this.materielId
          }
        ).then((res)=>{
          var materielDetail = res.data.result;
          this.materielPrice = materielDetail.materielPrice;
          this.materielName = materielDetail.materielPrice;
          this.materielUnit = materielDetail.materielPrice;
          this.id = materielDetail.materielId
        }).catch((err)=>{
          //this.$message(err)
        })
      },
      //提交
      submitClick() {
        if (this.meterielDetail.materielName == '') {
          this.$message({showClose: true, message: '请输入物料名称', type: 'error'})
        } else if (this.meterielDetail.materielUnit == '') {
          this.$message({showClose: true, message: '请输入物料计量单位', type: 'error'})
        }else if(this.meterielDetail.materielParentId == ''){
          this.$message({showClose: true, message: '请选择物料分类', type: 'error'})
        } else {
          this.$httpPasser.post('materiel/save', this.meterielDetail).then(re => {
            if (re.data.resultCode == 200) {
              this.$message.success(re.data.resultCodeDesc)
              this.$router.push({path:'./materialsManagerConfigure'})
            }
            else {
              this.$message.error(re.data.resultCodeDesc)
            }
          }).catch(
            () => {
              this.$message.error(re.data.resultCodeDesc)
            }
          )
        }
      },
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          this.meterielDetail.materielImgPath = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      beforeAvatarUpload(file) { //图片上传之前限制
        this.upLoadData.file = file
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10
        if(!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if(!isLt10M){
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return (isJPG || isPNG) && isLt10M;
      },
      showAddServices(){

      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      addMaterialsSort(){//添加物料分类
        this.servicesAddDialog = true;
      },
      //获取物料分类接口
      getAllCategroy(){
        this.$httpPasser.post("materiel/getAllCategroy",{
          shopId:this.companyId,
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.materialsList = res.data.result;
          }
          else{
            this.materialsList = []
           // this.$message(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          //this.$message(err)
        })
      },
      addMaterialsClick(){//添加物料分类确定
        this.$httpPasser.post("materiel/addCategroy",{
          materielName:this.categroyName,
          shopId:this.companyId,
          //materielParentId:this.materielId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success("添加成功")
            this.getAllCategroy()
            this.materielName ='';
            this.materielParentId =''
          }else{
            this.$message.error(res.data.resultCodeDesc)
            this.materielName ='';
            this.materielParentId =''
          }
          this.servicesAddDialog = false
        })
      },
      //获取物料详情
      getDetail(){
        this.$httpPasser.post(
          'materiel/getDetail',
          {
            materielId:this.materielId
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.meterielDetail = res.data.result;
            this.meterielDetail.shopId = this.companyId;
            this.meterielDetail.customerUserId = this.customerUserId;
          }
          else{
            //this.$message.error(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          //this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #materialsConfigureAdd{
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        line-height: 40px;
        width: 140px;
        font-size: 14px;
      }
    }
    .font14 {
      font-size: 14px;
      margin-bottom: 20px;
      color: red;
    }
    .pl50 {
      padding-left: 150px;
    }
    .layers {
      padding-top: 30px;
      .plr20 {
        padding: 0 20px;
        margin-right: 10px;
      }
      .floorbtn {
        cursor: pointer;
        border: solid 1px #dcdfe6;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #606266;
        padding: 12px 20px;
        font-size: 14px;
        line-height: 1;
        border-radius: 4px;
        display: inline-block;
      }
      .floorbtn.active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        background-color: #ecf5ff;
      }
    }
    .floorbtn.active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      background-color: #ecf5ff;
    }
    .dialogMaterialsSort{
      .siteml {
        width: 140px;
        text-align: right;
        margin-right: 10px;
        line-height: 40px;
        margin-bottom: 20px;
      }
    }
    .sitem {
      .inputtype {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        width: 46%;
      }
    }
  }
</style>
<style lang="less">
  #materialsConfigureAdd{
    #addrent, #addrent2, #addrent3 {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 135px;
        height: 95px;
        line-height: 95px;
        text-align: center;
      }
      .avatar {
        width: 135px;
        height: 95px;
        display: block;
      }
    }
  }
</style>

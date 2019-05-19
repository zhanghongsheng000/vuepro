<template>
  <div id="addRentervue">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">添加租客</span>
      </div>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">公司名称</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="companyName12" placeholder="请输入公司名称" clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">公司经营地址</div>
          <div class="item-ipt fl" style="width: 220px;">
            <el-input v-model="roomInfos" placeholder="请选择公司经营地址" @focus='choseRoomClick'></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">入驻时间</div>
          <div class="item-ipt fl">
            <el-date-picker
              v-model="intime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择入驻时间">
            </el-date-picker>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">营业执照照片</div>
          <div class="item-ipt fl" id="addrent">
            <el-upload
              ref="uploads1"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">法人身份证正面照片</div>
          <div class="item-ipt fl" id="addrent2">
            <el-upload
              ref="uploads2"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs2"
              :show-file-list="false">
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">法人身份证反面照片</div>
          <div class="item-ipt fl" id="addrent3">
            <el-upload
              ref="uploads3"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs3"
              :show-file-list="false">
              <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">业务联系人姓名</div>
          <div class="item-ipt fl" style="width: 220px;">
            <el-input v-model.trim="contactsName" placeholder="请输入业务联系人姓名" clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">业务联系人电话</div>
          <div class="item-ipt fl" style="width: 220px;">
            <el-input v-model.trim="contactsPhone" placeholder="请输入业务联系人电话" clearable></el-input>
          </div>
        </div>
        <p class="font14">默认密码：123456</p>
        <div class="items">
          <div class="item-text pl50">
            <el-button type="primary" @click="submitClick">提交</el-button>
          </div>
        </div>
      </div>
      <el-dialog
        title="选择经营地址"
        :visible.sync="dialogVisibleAddress"
        :modal-append-to-body='false'
        width="60%">
        <!-- <buildingCascader @buildingParam="buildingParam" v-if="hackReset"></buildingCascader>-->
        <choseRoomFromMuiltyFloorByBuilding @roomParams="roomParams"  v-if="hackReset" isCanAddRoom='false'></choseRoomFromMuiltyFloorByBuilding>
       <!-- <el-button type="success" @click="handleDialogSubmit()">确定</el-button>-->
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import buildingCascader from '@/components/public/buildingCascader'
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

  export default {
    name: "add-landlord",
    data() {
      return {
        intime: '',//入驻时间
        dialogVisibleAddress: false,
        companyName12: '',//公司名称
        roomInfos: '',//公司经营地址  省市区 写字楼 楼层 房间号
        importFileUrl: gUrl + 'upload/singleUpload', //图片上传接口地址
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
        imageUrl: '',//营业执照照片
        imageUrl2: '',//法人身份证正面照片
        imageUrl3: '',//法人身份证反面照片
        htimageUrl: '',//营业执照照片
        htimageUrl2: '',//法人身份证正面照片
        htimageUrl3: '',//法人身份证反面照片
        contactsName: '',//业务联系人姓名
        contactsPhone: '',//业务联系人电话
        time: 0,
        //强制刷新选择房间组件
        hackReset: false,
        roomList:[],
        buildingId:''
      }
    },
    components: {
      buildingCascader: buildingCascader,
      choseRoomFromMuiltyFloorByBuilding: choseRoomFromMuiltyFloorByBuilding
    },
    created() {
    },
    computed: {},
    methods: {
      /*test(){
        this.contactsName=''//联系人姓名
        this.roomInfos = ''//
        this.choiceRoomId=''
        this.contactsPhone=''//联系人电话
        this.imageUrl=''
        this.imageUrl2=''
        this.imageUrl3=''
        this.htimageUrl=''
        this.htimageUrl2=''
        this.htimageUrl3=''
        this.companyName12=''//公司名称
        this.$refs.uploads1.clearFiles()
        this.$refs.uploads2.clearFiles()
        this.$refs.uploads3.clearFiles()
      },*/
      //提交
      submitClick() {
        if (this.companyName12 == '') {
          this.$message({showClose: true, message: '请输入公司名称', type: 'error'})
        } else if (this.roomList == '') {
          this.$message({showClose: true, message: '请选择公司经营地址', type: 'error'})
        }/*else if(this.htimageUrl==''){
          this.$message({showClose: true, message: '请上传营业执照照片', type: 'error'})
        }else if(this.htimageUrl2==''){
          this.$message({showClose: true, message: '请上传法人身份证正面照片', type: 'error'})
        }else if(this.htimageUrl3==''){
          this.$message({showClose: true, message: '请上传法人身份证反面照片', type: 'error'})
        }*/ else if (this.contactsName == '') {
          this.$message({showClose: true, message: '请输入业务联系人姓名', type: 'error'})
        } else if (this.contactsPhone == '') {
          this.$message({showClose: true, message: '请输入业务联系人电话', type: 'error'})
        } else if (!/^0?1[3456789]\d{9}$/.test(this.contactsPhone)) {
          this.$message({showClose: true, message: '业务联系人电话号码格式错误', type: 'error'});
        } else {
          this.$httpPasser.post('business/saveTenant', {
            buildingRoomId: this.choiceRoomId,
            newBuildingRoomId: this.choiceRoomId,
            customerName: this.contactsName,
            telphone: this.contactsPhone,
            operation: 0,
            type: 2,
            intime: this.intime,
            address: this.roomInfos,
            licensePicture: this.htimageUrl,
            idcardFrontPicture: this.htimageUrl2,
            idcardBackPicture: this.htimageUrl3,
            companyName: this.companyName12,
            roomList:this.roomList,
            companyId: this.$local.sefetch('info').companyId
          }).then(re => {
            if (re.data.resultCode == 200) {
              this.$message.success('添加成功')
              this.contactsName = ''//联系人姓名
              this.roomInfos = ''//
              this.choiceRoomId = ''
              this.intime =''
              this.contactsPhone = ''//联系人电话
              this.imageUrl = ''
              this.imageUrl2 = ''
              this.imageUrl3 = ''
              this.htimageUrl = ''
              this.htimageUrl2 = ''
              this.htimageUrl3 = ''
              this.companyName12 = ''//公司名称
              this.$refs.uploads1.clearFiles()
              this.$refs.uploads2.clearFiles()
              this.$refs.uploads3.clearFiles()
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
      //显示选择房间回调
      choseRoomClick() {
        this.dialogVisibleAddress = true;
        this.refleshRoomComponent()
      },
      //强制刷新组件
      refleshRoomComponent() {
        //强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          this.htimageUrl = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      uploadSuccessgs2(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl2 = URL.createObjectURL(file.raw);
          this.htimageUrl2 = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      uploadSuccessgs3(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl3 = URL.createObjectURL(file.raw);
          this.htimageUrl3 = response.result
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
      /*//获取并处理子模块回传的数据
      buildingParam(buildingParam) {
        this.roomInfos = ''
        if (buildingParam.buildingGroupId) {
          this.roomInfos = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingId) {
          this.roomInfos = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingFloorId) {
          this.roomInfos = buildingParam.buildingRoomName;
        }
        if (buildingParam.buildingRoomId) {
          this.choiceRoomId = buildingParam.buildingRoomId;
          this.roomInfos = buildingParam.buildingRoomName;
        }
        console.log(buildingParam)
      },*/
     /* //选择房间确定
      handleDialogSubmit() {
        this.dialogVisibleAddress = false;
      },*/
      roomParams(roomParams){
        if(roomParams.roomResult && roomParams.roomResult.length>0){
          this.roomInfos = roomParams.address;
          this.roomList = JSON.stringify(roomParams.roomResult)
          this.buildingId = roomParams.buildingId;
          this.dialogVisibleAddress = false;
        }
        else{
          this.roomInfos = '';
          this.$message.error('请选择至少一个房间')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #addRentervue {
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
  }
</style>
<style lang="less">
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
</style>

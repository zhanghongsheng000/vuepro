<template>
  <div class="wrap registercontainer" id="register">
    <div class="reg-cont clearfix">
      <div class="reg-left fl">
        <a class="returnIndex" href="http://www.jiatob.com"></a>
      </div>
      <div class="reg-right">
        <div class="qyzc"></div>
        <div class="reg-right-cont clearfix">
          <div class="form-item fl">
            <div class="items mb3">
              <div class="item-text beforesiteml">公司名称</div>
              <div class="item-ipt">
                <el-input v-model.trim="companyName" placeholder="请输入公司名称" size="small" clearable></el-input>
              </div>
            </div>
            <div class="items mb3">
              <div class="item-text beforesiteml">公司经营地址</div>
              <div class="item-ipt">
                <el-input v-model="roomInfos" placeholder="请选择公司经营地址" size="small" @focus="showChoseRoomDialog"
                          @click="dialogFormVisible = true"></el-input>
              </div>
            </div>
            <div class="items mb4">
              <div class="item-text">营业执照照片</div>
              <div class="item-ipt" id="businessLicense">
                <el-upload
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
            <div class="clearfix">
              <div class="items mb3 fl">
                <div class="item-text">法人身份证正面照片</div>
                <div class="item-ipt" id="businessLicense2">
                  <el-upload
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
              <div class="items mb3 fr">
                <div class="item-text">法人身份证反面照片</div>
                <div class="item-ipt" id="businessLicense3">
                  <el-upload
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
            </div>
            <!--<div class="items mb3">
              <div class="item-text">入驻时间</div>
              <div class="item-ipt" id="timeChoise">
                <el-date-picker
                  v-model="intime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择入驻时间">
                </el-date-picker>
              </div>
            </div>-->
          </div>
          <div class="form-item-rifht fr">
            <div class="items mb3">
              <div class="item-text beforesiteml">业务联系人姓名</div>
              <div class="item-ipt">
                <el-input v-model.trim="contactsName" placeholder="请输入业务联系人姓名" size="small" clearable></el-input>
              </div>
            </div>
            <div class="items mb3">
              <div class="item-text beforesiteml">业务联系人电话</div>
              <div class="item-ipt">
                <el-input v-model.trim="contactsPhone" placeholder="请输入业务联系人电话" size="small" clearable></el-input>
              </div>
            </div>
            <div class="items mb3">
              <div class="item-text beforesiteml">手机验证码</div>
              <div class="input_con clearfix">
                <input type="text" class="fl phoneCode" placeholder="请输入手机验证码" v-model.trim="phoneCode">
                <div class="codeBtn fl" @click="sendCode">
                  <el-button type="primary" :disabled="disabled" size="mini">{{btntxt}}</el-button>
                </div>
              </div>
            </div>
            <div class="items mb3">
              <div class="item-text beforesiteml">登录密码</div>
              <div class="item-ipt">
                <el-input type="password" v-model.trim="password" placeholder="请输入登录密码" size="small" clearable></el-input>
              </div>
            </div>
            <div class="items mb3">
              <div class="item-text beforesiteml">确认密码</div>
              <div class="item-ipt">
                <el-input type="password" v-model.trim="confirmPassword" placeholder="请确认密码" size="small" clearable></el-input>
              </div>
            </div>
            <div class="items mb20">
              <div class="item-text beforesiteml">图形验证码</div>
              <div class="input_con clearfix">
                <input type="text" class="fl phoneCode" placeholder="请输入图形验证码" v-model.trim="imgCode">
                <div class="figure fl" @click="getImg">
                  <img :src="src" alt="">
                </div>
              </div>
            </div>
            <div class="registerBtn">
              <a href="javascript:;" @click="submitClick" ></a>
            </div>
            <div class="toLogin">
              已有账号，
              <router-link to="/">登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="选择公司经营地址" :visible.sync="dialogFormVisible" width="1000px" top="22vh"
               :close-on-click-modal="false">
      <choseRoomFromMuiltyFloor @roomParams="roomParams" v-if="hackSet"></choseRoomFromMuiltyFloor>
    <!--  <div slot="footer" class="dialog-footer">
        &lt;!&ndash;{{HprovinceName+':'+HcityName+':'+HareaName+':'+HbuildName+':'+Hfloor+'层::'+roomText}}&ndash;&gt;
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>
<script>
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import choseRoomFromMuiltyFloor from '@/components/public/choseRoomFromMuiltyFloor'
  export default {
    data() {
      return {
        // intime:'',//入驻时间
        companyName: '',//公司名称
        roomInfos: '',//公司经营地址  省市区 写字楼 楼层 房间号
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
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
        msgId: '',//验证码id
        phoneCode: '',//验证码
        disabled: false,//获取验证码点击状态
        password: '',//密码
        confirmPassword: '',//重复密码
        src: '', //图形验证码 图片地址//
        imgCode: '',//输入的图形验证码
        srcVcode: '',//图形验证码id
        roomList:[],//房屋列表
        buildingId:'',//注册需要的写字楼ID

        btntxt: "获取验证码",//倒计时显示
        time: 0,
        dialogFormVisible: false,//选择房间的弹窗
        hackSet:true//用于强制刷新弹窗

      }
    },
    components:{
      choseRoomFromMuiltyFloor
    },
    created() {
      this.getImg()//获取图形验证码
      this.getproList()//获取省列表
    },
    methods: {
      submitClick(){
        if(this.companyName==''){
          this.$message({showClose: true, message: '请输入公司名称', type: 'error'})
        }else if(this.roomName==''){
          this.$message({showClose: true, message: '请选择公司经营地址', type: 'error'})
        }/*else if(this.htimageUrl==''){
          this.$message({showClose: true, message: '请上传营业执照照片', type: 'error'})
        }else if(this.htimageUrl2==''){
          this.$message({showClose: true, message: '请上传法人身份证正面照片', type: 'error'})
        }else if(this.htimageUrl2==''){
          this.$message({showClose: true, message: '请上传法人身份证反面照片', type: 'error'})
        }*/else if(this.contactsName==''){
          this.$message({showClose: true, message: '请输入业务联系人姓名', type: 'error'})
        }else if(this.contactsPhone==''){
          this.$message({showClose: true, message: '请输入业务联系人电话', type: 'error'})
        }else if(this.phoneCode==''){
          this.$message({showClose: true, message: '请输入手机验证码', type: 'error'})
        }else if(this.password==''){
          this.$message({showClose: true, message: '请输入登录密码', type: 'error'})
        }else if(this.confirmPassword==''){
          this.$message({showClose: true, message: '请输入确认密码', type: 'error'})
        }else if(this.password != this.confirmPassword){
          this.$message({showClose: true, message: '两次密码输入不一致', type: 'error'})
        } else if(this.imgCode==''){
          this.$message({showClose: true, message: '请输入图形验证码', type: 'error'})
        }else{
          this.$httpPasser.post('/webRegister', {
            shopName:this.companyName,//公司名称,
            //buildingRoomId:this.choiceRoomId,//  公司经营地址房间id
            licensenumberPicture:this.htimageUrl,//   营业执照照片
            idcardFrontPicture:this.htimageUrl2,//  法人身份证正面照片
            idcardBackPicture:this.htimageUrl3,//  法人身份证反面照片
            // intime:this.intime,//入驻时间
            linkman:this.contactsName,//  业务联系人姓名
            linkmanTelephone:this.contactsPhone,//  业务联系人电话
            messageId:this.msgId,//  验证码id
            telephoneCode:this.phoneCode,//  电话验证码
            vCode:this.imgCode,//  验证码
            password:this.password,//  密码
            rePassword:this.confirmPassword,//  重复密码
            vCodeMd5:this.srcVcode,//图形验证码加密
            address:this.roomInfos, ////公司地址
            buildingId:this.buildingId,
            roomList:this.roomList
          })
            .then((response) => {
              const data = response.data
              if (data.resultCode == '200') {
                console.log(data)
                this.$message({
                  showClose: true,
                  message: "注册成功",
                  type: 'success'
                });
                this.$router.push({path:'/'})
              } else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          console.log(file)
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log(this.imageUrl)
          this.htimageUrl=response.result
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
          this.htimageUrl2=response.result
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
          this.htimageUrl3=response.result
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
        if (!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return (isJPG || isPNG) && isLt10M;
      },
      //获取省份列表
      getproList() {
        this.$httpPasser.post('area/getArea', {
          level: 'province',
          areaCode: ''
        })
          .then((res) => {
            // console.log(res.data)
            if (res.data.resultCode == '200') {
              this.proList = res.data.result
            } else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      //输入框 搜索下拉事件
      roomSelect(item){
        // console.log(item+"==="+this.newRoom+"===="+this.roomText);
        /*this.choiceRoomId=item.buildingRoomId;
        this.isNewRoom='N';
        this.newRoom = '';*/
      },
      //输入框 搜索下拉事件
      handleSelect(item) {
        this.HrommList = ''//房间list
        this.HbuildName = item.value
        this.HfloorList = ''//楼层list
        this.HfloorId = ''//选择的楼层id
        this.Hfloor = ''//选择的楼层数字段
        this.itemIndex = ''
        this.roomText = ''//展示用
        this.choiceRoomId = ''//id传给后台用的
        this.roomInfos = ''//省市区写字楼楼层房间号
        this.buildingId = item.buildingId
        // console.log(item)
        this.$httpPasser.post('building/getBuildingFloorListByBuildingId', {
          buildingId: item.buildingId
        })
          .then((res) => {
            let data = res.data
            if (data.resultCode == '200') {
              // console.log(data.result.buildingFloorList)
              this.HfloorList = data.result.buildingFloorList
            } else {
              this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
            }
          })
          .catch((err) => {
            console.log(err)
          })
        /*buildingId:1
        value:"新百广场1号楼"*/
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      newquerySearch(queryString, cb) {
        // var restaurants = this.restaurants;
        var listroom = this.HrommList;
        for(var i=0;i<listroom.length;i++){
          listroom[i].value=listroom[i].buildingRoomName
        }
        var newRoomNum = queryString ? listroom.filter(this.createFilter(queryString)) : listroom;
        // 调用 callback 返回建议列表的数据
        cb(newRoomNum);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //获取验证码
      sendCode() {
        if (!this.disabled) {
          if (this.contactsPhone == '') {
            this.$message({showClose: true, message: '请输入业务联系人手机号', type: 'error'});
          } else if (!/^0?1[3456789]\d{9}$/.test(this.contactsPhone)) {
            this.$message({showClose: true, message: '业务联系人电话号码格式错误', type: 'error'});
          } else {
            this.disabled = true;
            this.time = 60;
            this.timer();
            this.$httpPasser.get('phoneMessage/getCode', {
              params: {
                telphone: this.contactsPhone,
                isRegister: 'Y'
              }
            })
              .then((response) => {
                const data = response.data
                //console.log(data)
                if (data.resultCode == '200') {
                  this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
                  this.msgId = data.result
                } else {
                  this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
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
      //获取图形验证码
      getImg() {
        this.$httpPasser.get('pictureMessage/getCode')
          .then(res => {
            const data = res.data
            // console.log(data)
            if (data.resultCode == '200') {
              this.src = 'data:image/png;base64,' + data.result.imagePath
              this.srcVcode = data.result.vcode;
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      //打开选择房间窗口
      showChoseRoomDialog(){
        this.hackSet = false;
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
          this.hackSet = true;
        })

      },
      //从组件获取房屋信息
      roomParams(roomParams){
        if(roomParams.roomResult && roomParams.roomResult.length>0){
          this.roomInfos = roomParams.address;
          this.roomList = JSON.stringify(roomParams.roomResult)
          this.buildingId = roomParams.buildingId;
          this.dialogFormVisible = false;
        }
        else{
          this.roomInfos = '';
          this.$message.error('请选择至少一个房间')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #register {
    input::-webkit-input-placeholder {
      color: #dcdfe6;
    }
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/public/registerbk.png") left top no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    .mb10{
      margin-bottom: 10px;
    }
    .reg-cont {
      width: 1200px;
      height: 702px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      margin-left: -600px;
      top: 50%;
      margin-top: -351px;
      /*box-shadow: 0px 0px 20px rgba(0,0,0,.5);*/
      box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    }
    .reg-left {
      position:relative;
      width: 483px;
      height: 100%;
      background: url("../../assets/images/public/resbg.png") left top no-repeat;
      .returnIndex{
        height: 50px;
        width: 152px;
        position: absolute;
        right: 61px;
        top: 39px;
      }
    }
    .reg-right {
      position: relative;
      padding-top: 120px;
      margin-left: 483px;
      padding-left: 22px;
      padding-right: 72px;
      .qyzc {
        width: 129px;
        height: 50px;
        background: url("../../assets/images/public/qyzc.png") left top no-repeat;
        position: absolute;
        left: -30px;
        top: 44px;
      }
    }
    .form-item {
      width: 300px;
    }
    .form-item-rifht {
      width: 250px;
    }
    .item-text {
      line-height: 32px;
      color: #666666;
      font-size: 14px;
    }
    .mb3 {
      margin-bottom: 3px;
    }
    .mb4 {
      margin-bottom: 4px;
    }
    .mb20 {
      margin-bottom: 20px;
    }
    .input_con {
      height: 30px;
      border: solid 1px #dcdfe6;
      line-height: 30px;
      .phoneCode {
        width: 155px;
        box-sizing: border-box;
        height: 30px;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 30px;
      }
      .codeBtn, .figure {
        height: 30px;
        width: 92px;
        button {
          width: 92px;
          position: relative;
          top: -1px;
        }
        img {
          width: 92px;
          height: 28px;
          position: relative;
          top: 1px;
        }
      }
    }
    .registerBtn, .toLogin {
      text-align: right;
    }
    .registerBtn {
      a {
        display: inline-block;
        width: 141px;
        height: 54px;
        background: url("../../assets/images/public/regbtn.png") left top no-repeat;
      }
      padding-top: 10px;
    }
    .toLogin {
      padding-top: 10px;
      margin-right: 10px;
      font-size: 16px;
      a {
        color: #000;
        &:hover {
          color: #0f71ca;
        }
      }
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
  }
</style>
<style lang="less">
  #register {
    #timeChoise{
      .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      .el-input__icon.el-icon-date{
        line-height: 32px;
      }
    }
    #businessLicense, #businessLicense2, #businessLicense3 {
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

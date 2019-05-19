<template>
	<div class="main-cont111">
		<div class="ygpayroll">
	    <div class="ygpay-wrap">
	      <div class="main common">
	        <div class="main-cont">
	          <div class="top-title">
	            <div class="line"></div>
	            <span class="top-text" @click="test">实名认证</span>
	          </div>
	          <!--<p>省code：{{provinceCode}}==省名字：{{province}}==市code：{{cityCode}}==市名字：{{city}}==区code：{{areaCode}}==   区名字：{{area}}   </p>-->
	          <div class="contain">
	            <div class="con-item clearfix">
	              <div class="con-text fl">姓名</div>
	              <div class="con-input fl"><el-input v-model.trim="username" placeholder="请输入姓名"></el-input></div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">性别</div>
	              <div class="con-input fl lineh40">
	                <el-radio v-model="sex" label="M">男</el-radio>
	                <el-radio v-model="sex" label="F">女</el-radio>
	              </div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">出生日期</div>
	              <div class="con-input fl">
	                <el-date-picker
	                  v-model="birthday"
	                  type="date"
	                  value-format="yyyy-MM-dd"
	                  placeholder="选择出生日期">
	                </el-date-picker>
	              </div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">民族{{nationNow}}</div>
	              <div class="con-input fl">
	                <el-select v-model="nationNow" clearable placeholder="请选择民族">
	                  <el-option
	                    v-for="item,index in nationList"
	                    :key="index"
	                    :label="item.name"
	                    :value="item.name">
	                  </el-option>
	                </el-select>
	              </div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">住址</div>
	              <div class="con-input fl">
	                <div class="mb20">
	                  <el-select  v-model="provinceCode" placeholder="请选择省份" @change="getCity(provinceCode)">
	                    <el-option v-for="item,index in provinceList" :key="index" :label="item.name" :value="item.code"></el-option>
	                  </el-select>
	                  <el-select v-model="cityCode" placeholder="请选择市" @change="getArea(cityCode)">
	                    <el-option v-for="item ,index in cityList" :key="index" :label="item.name" :value="item.code"></el-option>
	                  </el-select>
	                  <el-select v-model="areaCode" placeholder="请选择区县" @change="getAreaName">
	                    <el-option v-for="item ,index in areaList" :key="index" :label="item.name" :value="item.code"></el-option>
	                  </el-select>
	                </div>
	                <div>
	                  <el-input
	                    type="textarea"
	                    :rows="2"
	                    placeholder="请输入详细地址"
	                    v-model="textarea">
	                  </el-input>
	                </div>
	              </div>
	            </div>

	            <div class="con-item clearfix">
	              <div class="con-text fl">身份证号码</div>
	              <div class="con-input fl"><el-input v-model.trim="idNum" placeholder="请确认身份证号码"></el-input></div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">身份证反面</div>
	              <div class="con-input fl ">
	                <div class="codeimg">
	                  <el-upload
	                    :action="importFileUrl"
	                    :data="upLoadData"
	                    :beforeUpload="beforeAvatarUpload"
	                    :on-preview="handlePictureCardPreview"
	                    :on-success="uploadSuccessgs2"
	                    :on-remove="handleRemovegs2"
	                    list-type="picture-card"
	                    :limit="1"
	                    :on-exceed="handleExceed"
	                    :file-list="fileList"
	                  >
	                    <i class="el-icon-plus"></i>
	                  </el-upload>
	                  <el-dialog :visible.sync="dialogVisible">
	                    <img width="100%" :src="imageUrls" alt="">
	                  </el-dialog>
	                </div>
	              </div>
	            </div>
	            <div class="con-item clearfix">
	              <div class="con-text fl">身份证正面</div>
	              <div class="con-input fl ">
	                <div class="codeimg">
	                  <el-upload
	                    :action="importFileUrl"
	                    :data="upLoadData"
	                    :beforeUpload="beforeAvatarUpload"
	                    :on-preview="handlePictureCardPreview"
	                    :on-success="uploadSuccessgs3"
	                    :on-remove="handleRemovegs3"
	                    list-type="picture-card"
	                    :limit="1"
	                    :on-exceed="handleExceed"
	                    :file-list="fileList2"
	                  >
	                    <i class="el-icon-plus"></i>
	                  </el-upload>
	                  <el-dialog :visible.sync="dialogVisible">
	                    <img width="100%" :src="imageUrls" alt="">
	                  </el-dialog>
	                </div>
	              </div>
	            </div>
	          </div>
	          <div class="btns"><el-button type="primary" @click="baocun">保存</el-button></div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
  import gUrl from '@/assets/js/gUrl'
  import getUrl from'@/assets/js/global'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import md5 from 'js-md5'
  export default {
    data(){
      return {
        dialogVisible:false,//放大遮罩显示隐藏

        username:'',//用户姓名
        sex:'',//性别
        birthday:'',//出生日期
        nationNow:'',//当前选择民族id

        nationList:[],//民族列表
        provinceList:[],//省份列表
        cityList:[],//市列表
        areaList:[],//区列表



        provinceCode:'',//省code
        cityCode:'',//市code
        areaCode:'',//区code

        province:'',//省名字
        city:'',//市名字
        area:'',//区名字

        textarea:'',//详细地址
        idNum:'',//身份证号
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        upLoadData:{file:'',type:'user',objectId:this.$local.sefetch('info').userId},//图片上传参数
        imgparamgs2:'',//身份证正面上传成功之后的参数
        imgparamgs3:'',//身份证反面上传成功之后的参数
        imageUrls:'',//放大地址
        fileList:[],//身份证正面存放地址
        fileList2:[],//身份证反面存放地址
        imgUrl:'',//身份证图片http地址
      }
    },
    created(){
      getUrl().then(res => {
        this.imgUrl=res.gImgUrl
        this.getCard()//获取绑定信息
      })
      this.getNation()//获取民族
      this.getproList()//省

    },
    methods:{
      getNation(){//获取民族
        this.$http.post('baseData/getNation')
          .then(res=>{
            let data = res.data
            if(data.resultCode=='200'){
              this.nationList=data.result
              // console.log(this.nationList)
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: data.result,
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      handleRemovegs2(){//身份证正面照图片删除
        this.imgparamgs2=''
      },
      handleRemovegs3(){//身份证反面照图片删除
        this.imgparamgs3=''
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
      handlePictureCardPreview(file) {//图片放大
        this.imageUrls = file.url;
        this.dialogVisible = true;
      },
      uploadSuccessgs2 (response, file, fileList) {//图片上传成功之后的函数
        if(response.resultCode=='200'){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imgparamgs2=response.result
          // console.log(response.result)
        }else{
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      uploadSuccessgs3 (response, file, fileList) {//图片上传成功之后的函数
        if(response.resultCode=='200'){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imgparamgs3=response.result
          // console.log(response.result)
        }else{
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      handleExceed() {//限制上传的图片数量
        this.$message({showClose: true, message: '只能上传一张图片', type: 'error'});
      },
      baocun() {//保存实名认证
        if(this.username==''){
          this.$message({showClose: true, message: '请输入姓名', type: 'error'});
        }else if(this.birthday==''){
          this.$message({showClose: true, message: '请选择出生日期', type: 'error'});
        }else if(this.provinceCode==''){
          this.$message({showClose: true, message: '请选择省份', type: 'error'});
        }else if(this.cityCode==''){
          this.$message({showClose: true, message: '请选择市', type: 'error'});
        }else if(this.areaCode==''){
          this.$message({showClose: true, message: '请选择区', type: 'error'});
        }else if(this.idNum==''){
          this.$message({showClose: true, message: '请输入身份证号码', type: 'error'});
        }else if(this.imgparamgs2==''){
          this.$message({showClose: true, message: '请上传身份证正面相片', type: 'error'});
        }else if(this.imgparamgs3==''){
          this.$message({showClose: true, message: '请上传身份证反面相片', type: 'error'});
        }else{
          // this.getCity();
          let times=new Date().getTime()
          let userId = this.$local.sefetch('info').userId
          let userTel = this.$local.sefetch('info').telPhone
          let identity = this.$local.sefetch('identity')
          this.$http2.post('userIdCard/web/saveCard',{
            identity:identity,//
            requestno:times+'123',//
            createtime:times,//
            sign:md5(userId+identity+times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),//

            idCardCode:this.idNum,//身份证号码
            idCardPicFront:this.imgparamgs2,//正面
            idCardPicBack:this.imgparamgs3,//反面
            address:this.textarea,//住址
            nation:this.nationNow,//民族id
            name:this.username,//用户名
            sex:this.sex,//性别
            birthday:this.birthday,//生日
            provinceCode:this.provinceCode,//省code
            provinceName:this.province,//省名称
            cityCode:this.cityCode,//市code
            cityName:this.city,//市名称
            countyCode:this.areaCode,//区code
            countyName:this.area//区名称
          })
            .then(res=>{
              let data = res.data
              if(data.resultCode=='200'){
                console.log(data)/////
                this.$message({
                  showClose: true,
                  message: '实名认证成功',
                  type: 'success'
                });
              } else if(data.resultCode == '204'){
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
              }else{
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err=>{console.log(err)})
        }
      },
      getCard(){//获取绑定信息
        let times=new Date().getTime()
        let userId = this.$local.sefetch('info').userId
        let userTel = this.$local.sefetch('info').telPhone
        let identity = this.$local.sefetch('identity')
        this.$http2.post('userIdCard/getCard',{
          identity:identity,
          createtime:times,
          sign:md5(userId + identity + times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
        })
          .then(res=>{
            this.identity = identity;
            let data = res.data
            console.log(res.data)
            if(data.resultCode=='200'){
              // console.log(data)
              this.username=data.result.name//姓名
              this.sex=data.result.sex
              this.birthday=data.result.birthday
              this.nationNow=data.result.nation
              // for(var i=0;i<this.nationList.length;i++){
              //   if(this.nationList[i].name==data.result.nation){
              //     this.nationNow=this.nationList[i].baseDataId
              //   }
              // }
              // console.log(data.result.nation)
              // console.log(this.nationList)
              // console.log(this.nationNow)
              this.address=data.result.address
              this.idNum=data.result.idCardCode
              this.imgparamgs2=data.result.idCardPicFront
              this.imgparamgs3=data.result.idCardPicBack
              this.fileList=[{url:this.imgUrl+data.result.idCardPicFront}]
              this.fileList2=[{url:this.imgUrl+data.result.idCardPicBack}]
              this.textarea=data.result.address
              this.provinceCode=data.result.provinceCode
              this.cityCode=data.result.cityCode
              this.areaCode=data.result.areaCode
              this.getCity(data.result.provinceCode)
              this.getArea(data.result.cityCode)
              // this.getAreaName()
              /*for(var i=0;i<this.areaList.length;i++){
                if(this.areaList[i].code==this.areaCode){
                  this.area=this.areaList[i].name
                }
              }*/
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      getproList(){//获取省份列表
        this.$http.post('area/getArea',{
          level:'province'
        })
          .then(res=>{
            console.log(res.data)
            let data=res.data
            if(data.resultCode=='200'){
              this.provinceList=data.result
              // console.log(this.provinceList)
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      getCity(codes) { //切换省份获取市的方法
        this.cityCode=''
        this.areaList=[]
        this.areaCode=''
        this.$http.post('area/getArea', {
          areaCode: codes,
          level:'city'
        })
          .then((res) => {
            let data = res.data
            if(data.resultCode == '200') {
              for(var i=0;i<this.provinceList.length;i++){
                if(this.provinceList[i].code==this.provinceCode){
                  this.province=this.provinceList[i].name
                }
              }
              this.cityList = data.result
              // console.log(this.cityList)
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: data.result,
                type: 'error'
              });
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getArea(codes){//切换市的时候获取区数据
        this.areaCode=''
        this.$http.post('area/getArea', {
          areaCode: codes,
          level:'county'
        })
          .then((res) => {
            let data = res.data
            if(data.resultCode == '200') {
              this.areaList = data.result
              // console.log(this.areaList)
              for(var i=0;i<this.cityList.length;i++){
                if(this.cityList[i].code==this.cityCode){
                  this.city=this.cityList[i].name
                }
              }
              for(var i=0;i<this.areaList.length;i++){
                if(this.areaList[i].code==this.areaCode){
                  this.area=this.areaList[i].name
                }
              }
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: data.result,
                type: 'error'
              });
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getAreaName(){//区切换的时候获取根据区code获得区name
        for(var i=0;i<this.areaList.length;i++){
          if(this.areaList[i].code==this.areaCode){
            this.area=this.areaList[i].name
          }
        }
      },
      test(){
        console.log(this.provinceCode)
        console.log(this.province)
        console.log(this.cityCode)
        console.log(this.city)
        console.log(this.areaCode)
        console.log(this.area)
      }
    }
  }
</script>
<style lang="less" scoped>
	.main-cont111{
		width: 1040px;
	}
  .lineh40{
    line-height: 40px;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .ygpayroll{
    .ygpay-wrap{
      background-color: #eeeeee;
      /*      margin-bottom: -140px;*/
      .main{
        background-color: #fff;
        position: relative;
        width: 1040px;
      }
      .main-cont{
        padding: 30px 0px 20px 0px;
        min-height: 300px;
      }
      .top-title{
        margin-bottom: 20px;
        .line{
          height: 1px;
          background-color: #ccc;
          margin-bottom: -17px;
        }
        .top-text{
          margin-left: 25px;
          font-size: 14px;
          background-color: #fff;
          padding:0 4px;
          line-height: 30px;
        }
      }
      .contain{
        padding-left: 350px;
        .con-item{
          margin-bottom: 20px;
        }
        .con-text{
          width:80px;
          text-align: right;
          padding-right: 15px;
          line-height: 40px;
        }
      }
      .btns{
        padding-left: 525px;
      }
    }

  }
</style>
<style lang="less">
  .con-input{
    .el-select{
      width: 180px;
    }
  }
  .codeimg{
    .el-upload--picture-card{
      width: 150px !important;
      height: 80px !important;
      display: inline-block;
      .el-icon-plus{
        position: relative;
        /*top: -28px;*/
      }
    }
    .el-upload-list__item{
      width: 150px !important;
      height: 80px !important;
    }
    .el-upload.el-upload--picture-card{
      display:inline-block;
    }
  }
  .ygpayroll{
    .el-button--primary{
      width: 132px;
      height: 42px;
    }
  }
</style>

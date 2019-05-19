<template>
  <div>
    <div v-if="fileType=='image'">
      <el-carousel :interval="5000" arrow="always" style='overflow: hidden;' :height="height" >
        <el-carousel-item v-for="item,index in imagesbox" :key="index" :class="styles" >
          <div v-if="item.fileType =='image'">
            <img :src="item.filePath" class="image" :style="{width,height}" @click="toDetails(item.filePicId,item.fileUrl)">
          </div>
          <div v-else>
          </div>
        </el-carousel-item>
      </el-carousel>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="800"
        :show-close = "false"
      >
        <div id="adDetails">
          <div v-if="fileType == 'image'">
            <img :src="filePath">
          </div>
          <p>{{informationDescription}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
      </el-dialog>
    </div>
    <div v-if="fileType=='video'" :style="{width,height}">
      <video :src="videoPath" class="image"
             @ended="ifEnded"  ref="ovideo" autoplay v-if="flushFlag"
             @click="toVideoDetails" muted="true"
             style="width: 100%;height: 100%;background: #dedede">
      </video>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="800"
      :show-close = "false"
    >
      <div id="adDetail">
        <div style="text-align: center">
          <video :src="videoPathDetails" autoplay loop style="height: 400px;"></video>
        </div>
        <p>{{informationDescription}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVideo">关 闭</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  import getUrl from '@/assets/js/global'
  import gUrl from '@/assets/js/gUrl'

  export default {
    name: "advertisement",
    //currentDay : this.$local.getDay('yyyy年MM月'),
    props: {
      width:'',
      height:'',
      url:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        ovideo:'',
        videoList:[],
        fileUrl:[],//视频的链接
        filePicIdList:[],//视频的Id列表
        videoPathDetails:'',//视频详情的地址
        date:'',
        num:0,
        fileType:'',//文件的类型
        dialogVisible:false,//广告详情弹层
        dialogVisible1:false,//广告详情弹层
        imagesbox:[
          {filePicId:3,fileType:'',filePath:require("../assets/images/index/intelligent_title.png")},
          {filePicId:4,fileType:'',filePath:require("../assets/images/index/intelligent_title.png")},
          {filePicId:5,fileType:'',filePath:require("../assets/images/index/intelligent_title.png")}
        ],
        videoPath:'',
        count:0,
        gImgUrl: "",
        filePath:'',
        fileType:'',//文件类型
        userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        informationDescription:'',//广告描述
        filePicId:'',//文件编号
        informationId:'',//广告编号
        flushFlag:true
      }
    },
    methods:{
      getAdList(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let re = year +'-'+ month +'-' + strDate
//          1 一、通行客App
//          1、启动闪屏页 startup
//          2、首页腰部   index_center
//
//          2二、物业、企业管理平台
//          1、登陆后首页右上角  index_right
        if(this.url!==''){
          this.$httpPasser.post(this.url,{
            platform:2,
            position:'index_right',
            playDate:re,
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.imagesbox = res.data.result.adFileList
              this.informationId = res.data.result.informationId;//广告编号
              for(let j in res.data.result.adFileList){
                this.fileType = res.data.result.adFileList[0].fileType//image 类型
              }
              for(let o in res.data.result.adFileList){
                this.videoList.push(res.data.result.adFileList[o].filePath)
                this.fileType =res.data.result.adFileList[0].fileType//video 类型
                this.fileUrl.push(res.data.result.adFileList[o].fileUrl)
                //video的外部链接
                this.filePicIdList.push(res.data.result.adFileList[o].filePicId)
              }
              this.videoPath = this.videoList[0]
              }else if(res.data.resultCode == '204'){
              this.imagesbox = res.data.result.adFileList
              this.informationId = res.data.result.informationId;//广告编号
            }
          })
        }
      },
      toDetails(filePicId,fileUrl){
        if(fileUrl == '' ||fileUrl ==null){
            this.dialogVisible = true;
            this.$httpPasser.get("ad/getAdInfo",{
              params:{
                customerUserId:this.userId,
                fileId:filePicId,
                informationId:this.informationId
              }
            }).then((res)=>{
              if(res.data.resultCode == '200'){
                this.filePath = res.data.result.filePath;
                this.informationDescription = res.data.result.informationDescription;
              }
            })
        }else{
          window.open(fileUrl,"_blank");
        }
      },
      toVideoDetails(){
        console.log(this.num)
        let filePicId = this.filePicIdList[this.num]
        let fileUrls = this.fileUrl[this.num]
        if(fileUrls === '' ||fileUrls ===null){
          this.dialogVisible1 = true;
          this.$httpPasser.get("ad/getAdInfo",{
            params:{
              customerUserId:this.userId,
              fileId:filePicId,
              informationId:this.informationId
            }
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.videoPathDetails = res.data.result.filePath;
              this.informationDescription = res.data.result.informationDescription;
            }
          })
        }else{
          window.open(fileUrls,"_blank");
        }
      },
      ifEnded(){
        this.flushFlag = false;
        let videolength= this.videoList.length;
        this.num++;
        if(this.num==videolength){
          this.num=0
        }
        this.videoPath = this.videoList[this.num]
        this.$nextTick(()=>{
          this.flushFlag = true;
        })
      },
      cancelVideo(){
        this.dialogVisible1 = false;
        this.videoPathDetails ='';
      }
    },
    created(){
      this.getAdList()
    },
    computed: {
      styles:function(){
        return 'styleWidth'
      },
    },
    mounted(){
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
      this.ovideo = this.$refs.ovideo
    },
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__container{
    .el-carousel__item{}
  }

  /*.el-carousel__item:nth-child(2n) {*/
  /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*background-color: #d3dce6;*/
  /*}*/
</style>

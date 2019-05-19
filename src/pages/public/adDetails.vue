<template>
  <div id="adDetails">
    <img :src="gImgUrl+filePath">
    <p>{{informationDescription}}</p>
  </div>
</template>

<script>
  import getUrl from '@/assets/js/global'
  import gUrl from '@/assets/js/gUrl'

  export default {
    name: "adDetails",

    data() {
      return {
        gImgUrl: "",
        filePath:'',
        userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        informationDescription:'',//广告描述
        filePicId:'',//文件编号
        informationId:'',//广告编号
      }
    },
    computed: {

    },
    watch:{

    },
    methods: {
      getAdInfo(){
        this.$httpPasser.get("ad/getAdInfo",{
          params:{
            customerUserId:this.userId,
            fileId:this.filePicId,
            informationId:this.informationId
          }
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.filePath = res.data.result.filePath;
            this.informationDescription = res.data.result.informationDescription;
          }
        })
      }

    },
    mounted(){
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    }
  }
</script>

<style scoped lang="less">
  #adDetails {
    width:1200px;
    margin:0 auto;
    p{
      font-size: 16px;
      color: #666666;
      line-height: 30px;
    }
  }
</style>

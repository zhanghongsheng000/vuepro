<template>
  <div id="buildingGroupDetails">
    <div class="clear10"></div>
    <el-form  label-width="100px"
             class="demo-ruleForm">
      <div class="left">
        <el-form-item label="楼盘所在区域:" prop="areaId">
         {{buildingGroupInfo.areaName==""?"-":buildingGroupInfo.areaName}}
        </el-form-item>
        <el-form-item label="楼盘名称:" prop="name">
          {{buildingGroupInfo.name==""?"-":buildingGroupInfo.name}}
        </el-form-item>
        <el-form-item label="经纬度:" prop="coordinate">
         {{buildingGroupInfo.coordinate==""?"-":buildingGroupInfo.coordinate}}
        </el-form-item>
        <el-form-item label="楼盘地址:" prop="address">
         {{buildingGroupInfo.address==""?"-":buildingGroupInfo.address}}
        </el-form-item>
        <el-form-item label="楼盘类型:" prop="buildingType">
         {{buildingGroupInfo.fitmentDesc==""?"-":buildingGroupInfo.fitmentDesc}}
        </el-form-item>
        <el-form-item label="占地面积:" prop="area">
          {{buildingGroupInfo.area==''?'-':buildingGroupInfo.area}}㎡
        </el-form-item>
        <el-form-item label="建筑面积:" prop="buildArea">
          {{buildingGroupInfo.buildArea==""?"-":buildingGroupInfo.buildArea}}㎡
        </el-form-item>
        <el-form-item label="建筑年代:" prop="buildYear">
          {{buildingGroupInfo.buildYear==""?"-":buildingGroupInfo.buildYear}}年
        </el-form-item>
        <el-form-item label="建筑类型:" prop="structureType">
          {{buildingGroupInfo.structureTypeDesc==""?"-":buildingGroupInfo.structureTypeDesc}}
        </el-form-item>
        <el-form-item label="开发商:" prop="developer">
          {{buildingGroupInfo.developer==""?"-":buildingGroupInfo.developer}}
        </el-form-item>
        <el-form-item label="产权:" prop="propertyYear">
          {{buildingGroupInfo.propertyYear==""?"-":buildingGroupInfo.propertyYear}}年
        </el-form-item>
        <el-form-item label="绿化率:" prop="greeningRate">
         {{buildingGroupInfo.greeningRate==""?"-":buildingGroupInfo.greeningRate}}%
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item label="容积率:" prop="plotRatio">
         {{buildingGroupInfo.plotRatio==""?"-":buildingGroupInfo.plotRatio}}%
        </el-form-item>
        <el-form-item label="入住时间:" prop="stayInYear">
          {{buildingGroupInfo.stayInYear==""?"-":buildingGroupInfo.stayInYear}}年
        </el-form-item>
        <el-form-item label="层高:" prop="floorHeight">
         {{buildingGroupInfo.floorHeight==""?"-":buildingGroupInfo.floorHeight}}米
        </el-form-item>
        <el-form-item label="噪音:" prop="noise">
          {{buildingGroupInfo.noise==""?"-":buildingGroupInfo.noise}}分贝
        </el-form-item>
        <el-form-item label="装修:" prop="fitment">
          {{buildingGroupInfo.fitmentDesc==""?"-":buildingGroupInfo.fitmentDesc}}
        </el-form-item>
        <el-form-item label="宽带网络:" prop="networkId">
          {{buildingGroupInfo.network_name==""?"-":buildingGroupInfo.network_name}}
        </el-form-item>
        <el-form-item label="空调:" prop="airConditionId">
          {{buildingGroupInfo.airConditionDesc==""?"-":buildingGroupInfo.airConditionDesc}}
        </el-form-item>
        <el-form-item label="地上停车位:" prop="parkingNumUp">
          {{buildingGroupInfo.parkingNumUp==""?"-":buildingGroupInfo.parkingNumUp}}个
        </el-form-item>
        <el-form-item label="地下停车位:" prop="parkingNumDown">
          {{buildingGroupInfo.parkingNumDown==""?"-":buildingGroupInfo.parkingNumDown}}个
        </el-form-item>
        <el-form-item label="物业公司:" prop="manageCompany">
         {{buildingGroupInfo.manageCompany==""?"-":buildingGroupInfo.manageCompany}}
        </el-form-item>
        <el-form-item label="物业费:" prop="manageFee">
          {{buildingGroupInfo.manageFee==""?"-":buildingGroupInfo.manageFee}}元/㎡/月
        </el-form-item>
        <el-form-item label="租赁价格:" prop="actualAverageRentPrice">
          {{buildingGroupInfo.actualAverageRentPrice==""?"-":buildingGroupInfo.actualAverageRentPrice}}元/㎡/月
        </el-form-item>
      </div>
      <div class="clear10"></div>
      <div style="width:100%;" class="formFooter">
        <el-form-item label="交通:">
         {{buildingGroupInfo.traffic==""?"-":buildingGroupInfo.traffic}}
        </el-form-item>
        <el-form-item label="周边环境:">
          <ul class="imgList">
            <li v-for="item,index in peripheryPic">
              <img :src="item.url" alt="">
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="楼盘描述:">
         {{buildingGroupInfo.info==""?"-":buildingGroupInfo.info}}
        </el-form-item>
        <el-form-item label="楼盘外观">
          <ul class="imgList">
            <li v-for="item,index in groupPic">
              <img :src="item.url" alt="">
            </li>
          </ul>
        </el-form-item>
        <div class="formButton">
          <el-button type="primary" @click="handleToEditBuildingGroup()">编辑楼盘</el-button>
          <!-- <el-button>重置</el-button>-->
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import getUrl from '@/assets/js/global'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  export default {
    name: "add-building-group",
    props:['buildingGroupId'],
    data() {
      return {
        gImgUrl:'',
        imgUrl:require("@/assets/images/public/coordinateIcon.png"),
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        //buildingGroupId:this.props.buildingGroupId,
        buildingGroupInfo: {
          //buildingGroupId:this.props.buildingGroupId,
          shopId:this.$local.sefetch('info').companyId,
          areaId: '',//所在地区
          areaName:'',//所在地区名称
          address: '',//地址
          name: '',//楼盘名称
          buildingType: '',//楼盘类型
          area: '',//占地面积
          buildArea: '',//建筑面积
          buildYear: '',//建筑年代
          structureType: '',//建筑类型
          developer: '',//开发商
          propertyYear: '',//产权
          greeningRate: '',//绿化率
          plotRatio: '',//容积率
          coordinate: '',//经纬度，逗号隔开
          //latitude:'',//纬度
          stayInYear: '',//入住时间 单位：年
          floorHeight: '',//层高
          noise: '',//噪音
          fitment: '',//装修
          networkIds: [],//宽带网络
          airConditionId: '',//空调
          parkingNumUp: '',//地上停车位
          parkingNumDown: '',//地下停车位
          manageCompany:this.$local.sefetch('info').companyName,
          manageFee: '',//物业费
          actualAverageRentPrice: '',//租赁价格
          traffic:'',//交通状态
          info:'',//楼盘描述
          peripheryPic:[],//周边环境
          groupPic:[]//楼盘外观
        },
        //周边环境上传插件数据
        peripheryPic:[],
        //楼盘外观上传插件数据
        groupPic:[],
        //空调字典列表
        airConditorList:[],
        //网络字典列表
        networkList:[],
        //建筑类型字典列表
        structureList:[],
        //装修类型字典列表
        fitmentList:[],
        //楼盘类型字典列表
        buildingTypeList:[],
        //控制弹出区域选择框的显示
        dialogVisibleRegion:false,
        //楼盘所在区域获取焦点时，是否需要弹出选择区域弹窗。默认需要
        ifChoseRegionDialog:true,
      }
    },
    computed:{

    },
    methods: {
      //返回楼盘列表方法
      handleToEditBuildingGroup() {
        this.$router.push({path: './editBuildingGroup',query:{buildingGroupId:this.buildingGroupId}})
      },
      //获取楼盘详情
      getGroupDetail(){
        this._httpPasser(
          'buildingGroup/getGroupDetail',
          'get',
          {buildingGroupId:this.buildingGroupId},
          (data)=>{
            for(let o in data.result){
              this.buildingGroupInfo[o] = data.result[o]
            }
            this.buildingGroupInfo.areaId = data.result.countyId;
            this.buildingGroupInfo.areaName = data.result.provinceName+ data.result.cityName+ data.result.countyName
            this.buildingGroupInfo.name = data.result.buildingGroupName;
            this.buildingGroupInfo.parkingNumDown = data.result.parking_num_down;
            this.buildingGroupInfo.parkingNumUp = data.result.parking_num_up;
            this.buildingGroupInfo.actualAverageRentPrice = data.result.perRentAmount;
            this.buildingGroupInfo.airConditionId = data.result.air_condition_id;
           // this.buildingGroupInfo.fitment = data.result.fitment.toString();
            for(let p in data.result.peripheryPic){
              let tempPeripheryPic = {};
              tempPeripheryPic.url = this.gImgUrl + data.result.peripheryPic[p];
              tempPeripheryPic.name = data.result.peripheryPic[p];
              this.peripheryPic.push(tempPeripheryPic)
            }
            for(let q in data.result.groupPic){
              let tempGroupPic = {};
              tempGroupPic.url = this.gImgUrl + data.result.groupPic[q];
              tempGroupPic.name = data.result.groupPic[q];
              this.groupPic.push(tempGroupPic)
            }
          }
        )
      },
      //获取建筑类型
      getStructureType(){
        this._httpPasser(
          'baseData/getStructureType',
          'get',
          {},
          (res)=>{
            this.structureList = res.result;
          },
        )
      },
      //获取楼盘类型
      getBuildingType(){
        this._httpPasser(
          'baseDic/getBuildingType',
          'get',
          {},
          (res)=>{
            this.buildingTypeList = res.result;
          },
        )
      },
      //获取装修类型
      getFitment(){
        this._httpPasser(
          'baseDic/getFitment',
          'get',
          {},
          (res)=>{
            this.fitmentList = res.result;
          },
        )
      },
      //获取空调类型
      getAir(){
        this._httpPasser(
          'baseData/getAir',
          'get',
          {},
          (res)=>{
            if(res.result){
              this.airConditorList = res.result;
            }
          }
        )
      },
      //获取网络类型
      getNetwork(){
        this._httpPasser(
          'baseData/getNetwork',
          'get',
          {},
          (res)=>{
            if(res.result){
              this.networkList = res.result;
            }
          }
        )
      },
      //通过value在对象数组中获取name
      getNameByValueFromObjArray(value,objArray){
        let re="-"
        console.log('数组',objArray)
        if(objArray.length && objArray.length>0){
          for(let o in objArray){
            if(objArray[o].value==value){
              re = objArray[o].name;
              break;
            }
            else{
              continue;
            }
          }
        }
        return re;
      },

      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
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
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
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

      }

    },
    created(){
      this.getAir();
      this.getNetwork();
      this.getStructureType();
      this.getBuildingType();
      this.getFitment();
      getUrl().then(res => {
        this.gImgUrl=res.gImgUrl
        this.getGroupDetail();
      })
    }
  }
</script>

<style lang="less" scoped>
  #buildingGroupDetails {
    .left {
      float: left;
    }
    .right {
      float: right;
/*      //background-image:url("../../../../../assets/images/public/coordinateIcon.png")*/
    }
    .imgList{
      margin-top: 15px;
    }
    .imgList li{
      float:left;
      height:135px;
      width:180px;
      margin-left:20px;
      margin-bottom:15px;
    }
    .imgList li img{
      height:135px;
      width:180px;
    }
  }

  #buildingGroupDetails > div {
    width: 470px;
  }
</style>
<style lang="less">
  #buildingGroupDetails {
    .el-form-item {
      width: 470px !important;
    }
    .el-form-item__label{
      width:110px!important;
    }
    .el-form-item__content{
      margin-left:110px!important;
    }
    .formFooter{
      .el-form-item {
        width: 100%!important;
      }
      .formButton{
        text-align: center;
      }
    }
    .yourLatAndLng{
      text-indent:10px;
      .el-input-group{
        width:35%;
        margin-left:10px;
      }
    }
    .el-form-item{
      margin-bottom:0px;
    }

  }

</style>

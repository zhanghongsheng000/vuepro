<template>
  <div id="editBuildingGroup">
    <div class="nav">
      <el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button>
      <span style="margin-left:20px;font-size:15px;">编辑楼盘</span>
    </div>
    <div class="clear10"></div>
    <el-form :model="buildingGroupInfo" :rules="rules" ref="buildingGroupInfo" label-width="100px"
             class="demo-ruleForm">
      <div class="left">
        <el-form-item label="楼盘所在区域" prop="areaId">
          <el-input placeholder="楼盘所在区域" v-model="buildingGroupInfo.areaName"  @focus="showRegionChose"  clearable></el-input>
        </el-form-item>
        <el-form-item label="楼盘名称" prop="name">
          <el-input placeholder="楼盘名称" v-model="buildingGroupInfo.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="经纬度" prop="coordinate">
          <el-tooltip v-if="coordinateFlag" class="item" effect="light" :content="coordinateTipContent" placement="top-start">
            <el-input placeholder="经纬度" :disabled=true v-model="buildingGroupInfo.coordinate" @focus="getCoordinate"></el-input>
          </el-tooltip>
          <el-input v-if="!coordinateFlag" placeholder="经纬度" v-model="buildingGroupInfo.coordinate" @focus="getCoordinate"></el-input>
        </el-form-item>
        <el-form-item label="楼盘地址" prop="address">
          <el-input placeholder="楼盘地址" v-model="buildingGroupInfo.address" clearable></el-input>
        </el-form-item>
        <el-form-item label="楼盘类型" prop="buildingType">
          <el-select v-model="buildingGroupInfo.buildingType" placeholder="楼盘类型" clearable>
            <el-option v-for="buildingType,index in buildingTypeList" :key="index" :label="buildingType.dictionariesName" :value="buildingType.dictionariesValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="占地面积" prop="area">
          <el-input placeholder="占地面积" v-model="buildingGroupInfo.area" clearable>
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
        <el-form-item label="建筑面积" prop="buildArea">
          <el-input placeholder="建筑面积" v-model="buildingGroupInfo.buildArea" clearable>
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
        <el-form-item label="建筑年代" prop="buildYear">
          <el-date-picker
            v-model="buildingGroupInfo.buildYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="建筑年代">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建筑类型" prop="structureType">
          <el-select v-model="buildingGroupInfo.structureType" placeholder="请选择建筑类型" clearable>
            <el-option v-for="structure,index in structureList" :key="index" :label="structure.name" :value="structure.baseDataId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发商" prop="developer">
          <el-input placeholder="开发商" v-model="buildingGroupInfo.developer" clearable></el-input>
        </el-form-item>
        <el-form-item label="产权" prop="propertyYear">
          <el-input placeholder="产权" v-model="buildingGroupInfo.propertyYear" clearable>
            <template slot="append">年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="绿化率" prop="greeningRate">
          <el-input placeholder="绿化率" v-model="buildingGroupInfo.greeningRate" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item label="容积率" prop="plotRatio">
          <el-input placeholder="容积率" v-model="buildingGroupInfo.plotRatio" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="入住时间" prop="stayInYear">
          <el-date-picker
            v-model="buildingGroupInfo.stayInYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="入住时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="层高" prop="floorHeight">
          <el-input placeholder="层高" v-model="buildingGroupInfo.floorHeight" clearable>
            <template slot="append">米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="噪音" prop="noise">
          <el-input placeholder="噪音" v-model="buildingGroupInfo.noise" clearable>
            <template slot="append">分贝</template>
          </el-input>
        </el-form-item>
        <el-form-item label="装修" prop="fitment">
          <el-select v-model="buildingGroupInfo.fitment" placeholder="装修" clearable>
            <el-option v-for="fitment,index in fitmentList" :key="index" :label="fitment.dictionariesName" :value="fitment.dictionariesValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宽带网络" prop="networkId">
          <el-checkbox-group v-model="buildingGroupInfo.networkIds">
            <el-checkbox v-for="network,index in networkList"  :key="index" :label="network.baseDataId">{{network.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="空调" prop="airConditionId">
          <el-select v-model="buildingGroupInfo.airConditionId" placeholder="空调" clearable>
            <el-option v-for="airConditor,index in airConditorList" :key="index" :label="airConditor.name" :value="airConditor.baseDataId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地上停车位" prop="parkingNumUp">
          <el-input placeholder="地上停车位" v-model="buildingGroupInfo.parkingNumUp" clearable>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="地下停车位" prop="parkingNumDown">
          <el-input placeholder="地下停车位" v-model="buildingGroupInfo.parkingNumDown" clearable>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业公司" prop="manageCompany">
          <el-input placeholder="物业公司" v-model="buildingGroupInfo.manageCompany" :disabled=true clearable></el-input>
        </el-form-item>
        <el-form-item label="物业费" prop="manageFee">
          <el-input placeholder="物业费" v-model="buildingGroupInfo.manageFee" clearable>
            <template slot="append">元/㎡/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="租赁价格" prop="perRentAmount">
          <el-input placeholder="租赁价格" v-model="buildingGroupInfo.perRentAmount" clearable>
            <template slot="append">元/㎡/天</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="clear10"></div>
      <div style="width:100%;" class="formFooter">
        <el-form-item label="交通">
          <el-input type="textarea" v-model="buildingGroupInfo.traffic" clearable></el-input>
        </el-form-item>
        <el-form-item label="周边环境">
          <el-upload
            :action="importFileUrl"
            :data="upLoadData"
            list-type="picture-card"
            :file-list="peripheryPic"
            :on-success="peripheryPicSubmit"
            :on-remove="peripheryPicDelete"
            multiple
          >
            <!--:on-preview="handlePictureCardPreview"
           :on-remove="handleRemove"-->
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="楼盘描述">
          <el-input type="textarea" v-model="buildingGroupInfo.info" clearable></el-input>
        </el-form-item>
        <el-form-item label="楼盘外观">
          <el-upload
            :action="importFileUrl"
            :data="upLoadData"
            list-type="picture-card"
            :file-list="groupPic"
            :on-success="groupPicSubmit"
            :on-remove="groupPicDelete"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <div class="formButton">
          <el-button type="primary" @click="handleSubmitBuildingGroup('buildingGroupInfo')">保存</el-button>
          <!-- <el-button>重置</el-button>-->
        </div>
      </div>

      <el-dialog title="选择楼盘所在区域" :visible.sync="dialogVisibleRegion" width="40%" top="22vh"
                 :close-on-click-modal="false">
        <div class="house">
          <div class="forms">
            <el-select v-model="region.province.code" placeholder="请选择省份" @change="getCityByProvince">
              <el-option v-for="province,index in region.provinceList" :key="index" :label="province.name" :value="province.code"></el-option>
            </el-select>
            <el-select v-model="region.city.code" placeholder="请选择市" :disabled="citySelectFlag" @change="getCountryByProvince">
              <el-option v-for="city ,index in region.cityList" :key="index" :label="city.name"
                         :value="city.code"></el-option>
            </el-select>
            <el-select v-model="region.country.code" :disabled="countrySelectFlag" placeholder="请选择区" @change="changeRegionFlag">
              <el-option v-for="country ,index in region.countryList" :key="index" :label="country.name"
                         :value="country.code"></el-option>
            </el-select>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <!--{{HprovinceName+':'+HcityName+':'+HareaName+':'+HbuildName+':'+Hfloor+'层::'+roomText}}-->
          <el-button @click="clearRegion">清 空</el-button>
          <el-button @click="dialogVisibleRegion=false">取 消</el-button>
          <el-button type="primary" @click="inputAreaIdToParams">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择楼盘经纬度" :visible.sync="dialogVisibleMap" width="40%" top="22vh"
                 :close-on-click-modal="false" @open="openMapDialog">
        <div>{{mapTips}}</div>
        <div class="clear10"></div>
        <div class="yourLatAndLng">
          {{mapInputTitle}}
          <el-input placeholder="经度" v-model="tempLngitude" :readonly=true>
            <template slot="prepend">经度</template>
          </el-input>
          <el-input placeholder="纬度" v-model="tempLatitude" :readonly=true>
            <template slot="prepend">纬度</template>
          </el-input>
        </div>
        <div class="clear10"></div>
        <div id="myMap" style="height: 500px;width: 100%;"></div>
        <div slot="footer" class="dialog-footer">
          <!--{{HprovinceName+':'+HcityName+':'+HareaName+':'+HbuildName+':'+Hfloor+'层::'+roomText}}-->
          <el-button @click="cancelMapDialog">取 消</el-button>
          <el-button type="primary" @click="inputCoordinateToBuildingGroup">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
  import getUrl from '@/assets/js/global'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  export default {
    name: "add-building-group",
    data() {
      return {
        gImgUrl:'',
        imgUrl:require("@/assets/images/public/coordinateIcon.png"),
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        buildingGroupId:this.$route.query.buildingGroupId,
        buildingGroupInfo: {
          buildingGroupId:this.$route.query.buildingGroupId,
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
        //区域对象
        region:{
          provinceList:[
            /*{
              name:'',
              code:''
            }*/
          ],
          cityList:[
            /*{
              name:'',
              code:''
            }*/
          ],
          countryList:[
            /*{
              name:'',
              code:''
            }*/
          ],
          //选中的省份
          province:{
            name:'',
            code:''
          },
          //选中的市
          city:{
            name:'',
            code:''
          },
          //选中的区
          country:{
            name:'',
            code:''
          },
          //是否更新楼盘所在地区数据，默认不更新，只有选择区之后变更为true
          flag:false
        },
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
        //表单验证部分
        rules: {
          areaId: [
            {required: true, message: '请选择楼盘所在区域', trigger: 'change'},
          ],
          coordinate: [
            {required: true, message: '请选择楼盘经纬度', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入楼盘名称', trigger: 'blur'}
          ]
        },
        /*
        * 地图插件部分变量
        * */
        //控制地图选择框的差距
        dialogVisibleMap:false,
        //控制经纬度选择框是否能够填写内容。默认为false
        ifCheckNoChange:false,
        //经纬度选择提示语
        coordinateTipContent:'请选择楼盘所在区域',
        //临时纬度
        tempLatitude:'',
        //临时经度
        tempLngitude:'',
        //地图对象
        map:'',
        //地图的标记b
        marker:null,
        //地图输入框标题
        mapInputTitle:'当前楼盘经纬度：',
        //地图标题提示语
        mapTips:'根据您所选区域和填写的楼盘名称为您定位到以下坐标。您可以点击地图或者拖动图标进行修改',
        /*
        * 上传图片
        * */
        upLoadData: {//图片上传参数
          file: '',
          type: 'company',
          objectId: 0
        },
      }
    },
    computed:{
      citySelectFlag:function(){
        let re = true;
        if(this.region.province.code!=''){
          re = false;
        }
        return re;
      },
      countrySelectFlag:function(){
        let re = true;
        if(this.region.city.code!=''){
          re = false;
        }
        return re;
      },
      coordinateFlag:function(){
        let re = false;
        if(this.buildingGroupInfo.areaId==''||this.buildingGroupInfo.areaId==undefined){
          this.coordinateTipContent = '请选择楼盘所在区域';
          re = true;
        }
        else if(this.buildingGroupInfo.name==''||this.buildingGroupInfo.name==undefined){
          this.coordinateTipContent = '请填写楼盘名称';
          re = true;
        }
        return re;
      }
    },
    methods: {
      //返回楼盘列表方法
      toBuildingGroupList() {
        this.$router.push({path: './buildingGroupManager'})
      },
      //设置更新区域标记为true
      showRegionChose(){
        if(this.ifChoseRegionDialog){
          this.dialogVisibleRegion = true;
        }
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
            this.buildingGroupInfo.airConditionId = data.result.air_condition_id;
            this.buildingGroupInfo.fitment = data.result.fitment.toString();
            this.buildingGroupInfo.buildingType = data.result.buildingType.toString();
            this.buildingGroupInfo.structureType = data.result.structureType-0;
            this.buildingGroupInfo.networkIds = data.result.network_id.split(',')
            for(let o in this.buildingGroupInfo.networkIds){
              this.buildingGroupInfo.networkIds[o] = this.buildingGroupInfo.networkIds[o]-0
            }
            /*this.buildingGroupInfo.buildingType = data.result.buildingType.toString();
            this.buildingGroupInfo.buildingType = data.result.buildingType.toString();*/
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
            //console.log('楼盘信息',this.buildingGroupInfo)
          }
        )
      },
      //清空区域数据
      clearRegion(){
        //清空楼盘数据
        this.buildingGroupInfo.areaId = '';
        this.buildingGroupInfo.areaName = '';
        this.region.province.code = '';
        this.region.city.code = '';
        this.region.country.code = '';
        this.region.cityList = [];
        this.region.countryList = [];
      },
      //获取省份列表
      getProvince(){
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level:'province',
            areaCode:''
          },
          (res)=>{
            this.region.provinceList = res.result;
          },
        )
      },
      //根据省份ID获取城市列表
      getCityByProvince(){
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level:'city',
            areaCode:this.region.province.code
          },
          (res)=>{
            this.region.cityList = res.result;
            this.region.city.code= '';
            this.region.country.code= '';
            this.region.flag = false;
          },
        )
      },
      //根据城市ID获取区域列表
      getCountryByProvince(){
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level:'country',
            areaCode:this.region.city.code
          },
          (res)=>{
            this.region.countryList = res.result;
            this.region.country.code= '';
            this.region.flag = false;
          },
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
            console.log(this.structureList)
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
      changeRegionFlag(){
        //如果选择了区，才要更新数据
        this.region.flag=true;
      },
      inputAreaIdToParams(){
        //只有选择了区，才要更新数据。
        if(this.region.flag){
          this.buildingGroupInfo.areaName = this.getRegionAllName();
          for(let o in this.region.countryList){
            if(this.region.countryList[o].code==this.region.country.code){
              this.buildingGroupInfo.areaId = this.region.countryList[o].areaId;
            }
          }
          this.region.flag = false;
        }
        this.dialogVisibleRegion = false;
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
      //获取经纬度的方法
      getCoordinate(){
        if(this.buildingGroupInfo.areaId==''||this.buildingGroupInfo.areaId==undefined){
          this.$message.warning('请先选择楼盘所在区域')
        }
        else if(this.buildingGroupInfo.name==''||this.buildingGroupInfo.name==undefined){
          this.$message.warning('请先填写楼盘名称')
        }
        else{
          this.dialogVisibleMap = true;
        }
      },
      //获取地区全名的方法
      getRegionAllName(){
        let regionAllName = ''
        if(this.region.province.code!==''){
          for(let o in this.region.provinceList){
            if(this.region.provinceList[o].code==this.region.province.code){
              regionAllName += this.region.provinceList[o].name;
              break;
            }
          }
          if(this.region.city.code!==''){
            for(let o in this.region.cityList){
              if(this.region.cityList[o].code==this.region.city.code){
                regionAllName += this.region.cityList[o].name;
                break;
              }
            }
            if(this.region.country.code!==''){
              //console.log(this.buildingCascader.buildingRoomList,this.buildingCascader.buildingRoomId)
              for(let o in this.region.countryList){
                if(this.region.countryList[o].code==this.region.country.code){
                  regionAllName += this.region.countryList[o].name;
                  break;
                }
              }
            }
          }

        }
        return regionAllName;
      },
      /*
      * 图片上传部分方法
      * */
      //楼盘图片上传成功回调方法
      groupPicSubmit(res,file,fileList){
        if(res.resultCode=='200'){
          let imgUrl = res.result;
          if(this.buildingGroupInfo.groupPic.indexOf(imgUrl)==-1){
            this.buildingGroupInfo.groupPic.push(imgUrl)
          }
        }
      },
      //楼盘图片删除回调方法
      groupPicDelete(file,fileList){
        let tempArr = []
        for(let o in fileList){
          tempArr.push(fileList[o].name)
        }
        this.buildingGroupInfo.groupPic = tempArr
      },
      //楼盘图片上传成功回调方法
      peripheryPicSubmit(res,file,fileList){
        if(res.resultCode=='200'){
          let imgUrl = res.result;
          if(this.buildingGroupInfo.peripheryPic.indexOf(imgUrl)==-1){
            this.buildingGroupInfo.peripheryPic.push(imgUrl)
          }
        }
      },
      //楼盘图片删除回调方法
      peripheryPicDelete(file,fileList){
        let tempArr = []
        for(let o in fileList){
          tempArr.push(fileList[o].name)
        }
        this.buildingGroupInfo.peripheryPic = tempArr
      },
      //从数组中删除某一个元素
      changeBuildingParams(arr,arrElement){
        for(let o in arr){
          if(arr[o]==arrElement){
            arr.splice(o,1)
          }
        }
      },
      /*
      * 地图插件部分的方法
      * 功能：在用户选择了区域，添加了楼盘地址的情况下才会调用地图插件
      * 根据用户填写的区域和楼盘地址，给用户一个初步的定位，并且返回坐标信息。
      * 如果用户认为坐标不准确，可以根据自己的需要再重新选择坐标
      * */
      /*
     地图覆盖物部分的核心内容
     * */
      //打开dialog回调
      openMapDialog(){
        this.$nextTick(()=>{
          this.initMap()
        })
      },
      //写入经纬度数据到楼盘对象
      inputCoordinateToBuildingGroup(){
        this.buildingGroupInfo.coordinate = this.tempLngitude+","+this.tempLatitude;
        this.dialogVisibleMap = false;
      },
      //取消经纬度选择
      cancelMapDialog(){
        this.tempLatitude = '';
        this.tempLngitude = '';
        this.dialogVisibleMap = false;
      },
      //初始化地图
      initMap(){
        this.map = new BMap.Map("myMap",{enableMapClick:false});
       // this.map.centerAndZoom("郑州市",12);
        this.map.enableScrollWheelZoom(true);
        //添加地图标尺
        /*        let bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
                let bottom_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});  //左上角，添加默认缩放平移控件
                let bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL});
                this.map.addControl(bottom_left_control);
                this.map.addControl(bottom_left_navigation);
                this.map.addControl(bottom_right_navigation);*/
        //设置地图可以拖拽
        this.map.enableDragging();
        let myIcon = new BMap.Icon(this.imgUrl, new BMap.Size(60,60));
        //根据用户选择获取行政区划边界
        var bdary = new BMap.Boundary()
        //如果有经纬度，则直接渲染经纬度。
        if(this.buildingGroupInfo.coordinate&&this.buildingGroupInfo.coordinate!==''){
          this.tempLngitude = this.buildingGroupInfo.coordinate.split(',')[0];
          this.tempLatitude = this.buildingGroupInfo.coordinate.split(',')[1];
          let currentPoint = new BMap.Point(this.tempLngitude,this.tempLatitude);
          this.marker = new BMap.Marker(currentPoint,{icon:myIcon});
          this.marker.setTop(true)
          this.marker.enableDragging();
          this.marker.addEventListener('dragend', ()=>{
            let dragendPoint = this.marker.getPosition();
            this.tempLngitude = dragendPoint.lng
            this.tempLatitude = dragendPoint.lat
          })
          this.map.clearOverlays();
          this.map.addOverlay(this.marker)
          this.map.centerAndZoom(currentPoint,11)
        }
        //如果没有经纬度，则根据用户选择搜索经纬度
        else{
          let local = new BMap.LocalSearch(this.map, {
            renderOptions:{map: this.map}
          });
          //根据选择的地区和楼盘名称进行搜索
          let content = this.buildingGroupInfo.areaName+this.buildingGroupInfo.name
          local.search(content);
          local.setSearchCompleteCallback(()=>{
            //将搜索结果赋值给当前搜索结果
            let searchResult =local.getResults().Ar?local.getResults().Ar:local.getResults().Br;
            if(searchResult){}
            else{
              console.error('看看百度是不是又修改参数名称了')
            }
            if(searchResult && searchResult.length>0){
              //根据搜索结果的第一条，添加地图标记
              let defaultPoint = searchResult[0].point;
              this.marker = new BMap.Marker(defaultPoint,{icon:myIcon});
              this.marker.setTop(true)
              this.marker.enableDragging();
              this.tempLngitude = defaultPoint.lng
              this.tempLatitude = defaultPoint.lat
              this.marker.addEventListener('dragend', ()=>{
                let dragendPoint = this.marker.getPosition();
                this.tempLngitude = dragendPoint.lng
                this.tempLatitude = dragendPoint.lat
              })
              this.map.clearOverlays();
              this.map.addOverlay(this.marker)
            }
            else{
              this.map.centerAndZoom(this.region.city.name,12);
              this.marker = new BMap.Marker(this.map.getCenter(),{icon:myIcon});
              this.marker.setTop(true)
              this.marker.enableDragging();
              this.marker.setPosition(this.map.getCenter())
              this.marker.addEventListener('dragend', ()=>{
                let dragendPoint = this.marker.getPosition();
                this.tempLngitude = dragendPoint.lng
                this.tempLatitude = dragendPoint.lat
              })
              this.map.clearOverlays();
              this.map.addOverlay(this.marker)
              this.mapTips = '无法在您选择的区域内，查询到您所输入的楼盘，自动定位到城市中央。请您点击地图或者拖动图标，选择坐标'
            }

          })
        }


        /*        //添加拖拽事件监听
                this.map.addEventListener("dragend",(evt)=>{

                });

                //添加移动事件监听
                this.map.addEventListener("moveend", (evt)=>{
                })
                //监听缩放开始事件
                this.map.addEventListener("zoomstart",function(){
                  //that.originalZoom = that.map.getZoom();
                })
                //添加缩放事件
                this.map.addEventListener("zoomend", (evt)=>{
                });*/
        //添加点击事件
        this.map.addEventListener("click", (evt)=>{
          this.marker.setPosition(evt.point)
          this.tempLngitude = evt.point.lng
          this.tempLatitude = evt.point.lat
        });
      },
      /*
      * 保存楼盘信息
      * */
      handleSubmitBuildingGroup(formName) {
        //将网络参数从a,b转换为数组
        //console.log(this.buildingGroupInfo.networkIds)
        //this.buildingGroupInfo.networkIds = this.buildingGroupInfo.networkIds.split(',')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._httpPasser(
              'buildingGroup/updateGroup',
              'post',
              this.buildingGroupInfo,
              (res)=>{
                this.$message.success(res.resultCodeDesc)
                this.$router.back()
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      this.getProvince();
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
  #editBuildingGroup {
    .left {
      float: left;
    }
    .right {
      float: right;
      //background-image:url("../../../../../assets/images/public/coordinateIcon.png")
    }
  }

  #editBuildingGroup > div {
    width: 470px;
  }
</style>
<style lang="less">
  #editBuildingGroup {
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

  }

</style>

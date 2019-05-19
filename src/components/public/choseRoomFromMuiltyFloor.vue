<template>
  <div id="choseRoomFromMuiltyFloor">
    <div class="inputNav" style="position: absolute">
      <div class="forms">
        <el-select v-model="region.province.code" placeholder="请选择省份" @change="getCityByProvince">
          <el-option v-for="province,index in region.provinceList" :key="index" :label="province.name" :value="province.code"></el-option>
        </el-select>
        <el-select v-model="region.city.code" placeholder="请选择市" :disabled="citySelectFlag" @change="getCountryByProvince">
          <el-option v-for="city ,index in region.cityList" :key="index" :label="city.name"
                     :value="city.code"></el-option>
        </el-select>
        <el-select v-model="region.country.areaId" :disabled="countrySelectFlag" placeholder="请选择区" @change="getBuildingListByCountryId">
          <el-option v-for="country ,index in region.countryList" :key="index" :label="country.name"
                     :value="country.areaId"></el-option>
        </el-select>
        <el-select v-model="region.building.buildingId" :disabled="buildingSelectFlag" placeholder="请选择写字楼" @change="getInfoByBuildingId">
          <el-option v-for="building ,index in region.buildingList" :key="index" :label="building.value"
                     :value="building.buildingId"></el-option>
        </el-select>
        <el-select v-model="region.floor.floorId" clearable :disabled="floorSelectFlag" placeholder="请选择楼层" @clear="clearFloorSearch" @change="changeInfoByFloorId">
          <el-option v-for="floor ,index in region.floorList" :key="index" :label="floor.buildingFloorName"
                     :value="floor.buildingFloorId"></el-option>
        </el-select>
      </div>
    </div>
    <div class="clear20"></div>
    <div class="buildingFloor" v-if="isShowRoomChose&&isShowRoomChoseValue" style="min-height: 20px;overflow: auto;margin-top: 30px;max-height: 500px">
      <div class="floorUnit" v-for="floor,index in getRoomFromServer">
        <div class="floor fl" v-if="flagForResetHeight" v-bind:style="{height:floorHeight[floor.floorName],lineHeight:floorHeight[floor.floorName]}">
          {{floor.floorName}}层
        </div>
        <div class="floor fr" :ref="'roomHeight_'+floor.floorName">
          <div class="clear20" v-if="floor.roomList.length>0"></div>
          <div class="oldRoom">
            <el-tag
              v-for="tag,index in floor.roomList"
              :key="index"
              :disable-transitions="false"
              :choseFlag="tag.choseFlag"
              color="#009688">
              <span class="innerSpan" :class="{oldRoomChosed:tag.choseFlag=='Y'}"  @click="oldRoomClick(floor,tag)">{{tag.roomName}}</span>
            </el-tag>
          </div>
          <div class="clear20" v-if="isCanAddRoomFun"></div>
          <div class="newRoom" v-if="isCanAddRoomFun">
            <el-tag
              v-if="tagFlush"
              v-for="tag,index in roomTagsNew[floor.buildingFloorId]"
              :key="index"
              :disable-transitions="false"
              :hoverFlag="tag.hoverFlag"
              color="#e39e52">
              <!--{{tag.roomName}}-->
              <span
                class="innerSpan"
                @click="handleClose(roomTagsNew[floor.buildingFloorId],floor,tag)"
                @mouseenter="newRoomEnter(tag)"
                @mouseleave="newRoomLeave(tag)">
                <span class="newRoomHover" v-if="tag.hoverFlag=='Y'">X</span>  <!---->
                {{tag.roomName}}
              </span>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="allFlag&&inputVisibleInputFlag[floor.buildingFloorId]"
              v-model="inputValue.roomName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(floor)"
              @blur="handleInputConfirm(floor)">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(floor)">+ 新增房间</el-button>
          </div>
          <div class="clear20"></div>
        </div>
        <div style="clear:both;height:1px;width:100%"></div>
      </div>

    </div>
    <div class="clear20"></div>
    <div class="submitButton">
      <el-button type="primary" @click="clearAllChose">清除</el-button>
      <el-button type="primary" @click="handleSubmit">确定选择</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "chose-room-from-muilty-floor",
    props:['isCanAddRoom'],
    data() {
      return {
        //地区写字楼数据
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
          buildingList:[
            /*{
              name:'',
              code:''
            }*/
          ],
          floorList:[],
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
            areaId:''
          },
          //选中的写字楼
          building:{
            buildingName:'',
            buildingId:''
          },
          //选中的楼层
          floor:{
            floorName:'',
            floorId:''
          },
          //是否更新楼盘所在地区数据，默认不更新，只有选择区之后变更为true
          flag:false
        },

        //从服务器获取的房间数据
        getRoomFromServer: [
          /*{
            buildingFloorId:'2001',
            floorName:'19',
            roomList:[
              {
                roomName:'1901',
                buildingRoomId:'',
                choseFlag:'N',
                hoverFlag:'N'
              }
            ]
          }*/
        ],
        //深拷贝，暂存房间数据，用于前端搜索楼层时作为备份数据。
        originRoomDataForSearchFloor:[],
        //新建的房间分楼层显示数据
        roomTagsNew:{
          /*floorId:[
            {
              roomName:'',
              roomId:'',
            }
          ],*/
        },
        //将要给服务器传递的参数列表
        roomParamsToServer:[
          /*{
            buildingFloorId:'',
            roomName:'',
            buildingRoomId:'',
            choseFlag:'',
            hoverFlag:''
          }*/
        ],
        //新增房间输入框双判定条件之一，会根据楼层ID划分为对象的不同属性。
        inputVisibleInputFlag:{
          /*floorId:false,*/
        },
        //新增房间输入框双判定条件，用于重新加载输入框，以便简介达到监听对象值变化的效果
        allFlag:true,
        inputValue: {
          buildingFloorId:'',
          roomName:'',
          buildingRoomId:'',
          choseFlag:'N',
          hoverFlag:'N',
          buildingFloorName:''
        },
        isShowRoomChoseValue:true,
        //动态加载楼层高度后，强制刷新
        flagForResetHeight:true,
        //楼层的高度
        floorHeight:[],
        //显示删除按钮后，强制刷新TAG
        tagFlush:true
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
      //写字楼选择是否可用
      buildingSelectFlag(){
        let re = true;
        if(this.region.country.areaId!=''){
          re = false;
        }
        return re;
      },
      //楼层选择是否可用
      floorSelectFlag(){
        let re = true;
        if(this.region.building.buildingId!=''){
          re = false;
        }
        return re;
      },
      isShowRoomChose:function(){
        let re = false;
        if(this.getRoomFromServer!={}){
          re = true;
        }
        return re;
      },
      isCanAddRoomFun:function(){
        let flag = true;
        //console.log('flag',this.isCanAddRoom)
        if(this.isCanAddRoom){
          if(this.isCanAddRoom==='false' || !this.isCanAddRoom){
            flag = false;
          }
          else if(this.isCanAddRoom==='true' || this.isCanAddRoom){
            flag = true;
          }
        }
        else{
          flag = true;
        }
        return flag;
      },
    },
    methods: {
      handleClose(tagArray,floor,tag) {
        this.allFlag = false;
        tag.buildingFloorId = floor.buildingFloorId;
        tagArray.splice(tagArray.indexOf(tag), 1);
        this.roomParamsToServer.splice(tagArray.indexOf(tag), 1);
        this.allFlag = true;
        //强制刷新楼层高度
        this.setFloorHeight();
      },
      oldRoomClick(floor,tag){
        //强行刷新一下房间列表。否则VUE无法监听到多层对象内部的数据变化
        this.isShowRoomChoseValue = false;
        if(tag.choseFlag=='Y'){
          //tag.choseFlag='N'
          //this.getRoomFromServer[this.getRoomFromServer.indexOf(tag)].choseFlag='N';
          tag.choseFlag='N'
          //如果有这个tag，则直接删除，找不到的话需要循环遍历这里的房间
          if(this.roomParamsToServer.indexOf(tag)!=-1){
            this.roomParamsToServer.splice(this.roomParamsToServer.indexOf(tag), 1);
          }
          else{
            for(let o in this.roomParamsToServer){
              if(tag.buildingRoomId==this.roomParamsToServer[o].buildingRoomId){
                this.roomParamsToServer.splice(o, 1);
              }
            }
          }
          this.isShowRoomChoseValue = true;
        }
        else if(tag.choseFlag=='N'){
          tag.choseFlag='Y'
          //this.getRoomFromServer[this.getRoomFromServer.indexOf(tag)].choseFlag='Y';
          tag.buildingFloorId = floor.buildingFloorId;
          tag.buildingFloorName = floor.floorName;
          this.roomParamsToServer.push(tag)
          this.isShowRoomChoseValue = true;
        }
      },
      newRoomEnter(tag){
        this.tagFlush = false;
        tag.hoverFlag = 'Y';
        this.tagFlush = true;
      },
      newRoomLeave(tag){
        this.tagFlush = false;
        tag.hoverFlag = 'N';
        this.tagFlush = true;
      },
      showInput(floor) {
        console.log(floor.buildingFloorId)
        this.allFlag = false;
        this.inputVisibleInputFlag[floor.buildingFloorId] = true;
        this.allFlag = true;
        /*this.$nextTick(_ => {
          console.log(this.$refs.saveTagInput)
        });*/
        console.log(this.inputVisibleInputFlag)
      },

      handleInputConfirm(floor) {
        this.inputValue.buildingFloorId = floor.buildingFloorId;
        this.inputValue.buildingFloorName = floor.floorName;
        let inputValue = this.inputValue
        if (inputValue.roomName) {
          if(this.roomTagsNew[floor.buildingFloorId]){
            this.roomTagsNew[floor.buildingFloorId].push(inputValue);
          }
          else{
            this.roomTagsNew[floor.buildingFloorId] = [];
            this.roomTagsNew[floor.buildingFloorId].push(inputValue)
          }
          this.roomParamsToServer.push(inputValue)
          console.log(this.roomParamsToServer)
        }

        this.allFlag = false;
        this.inputVisibleInputFlag[floor.buildingFloorId] = false;
        this.allFlag = true;
        this.inputValue = {
          buildingFloorId:'',
          roomName:'',
          buildingRoomId:'',
          choseFlag:'N',
          hoverFlag:'N'
        };
        //根据房间高度，动态设置楼层高度。
        this.setFloorHeight();
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
            this.region.country.areaId= '';
            this.region.building.buildingId = '';
            this.region.floor.floorId='';
            this.getRoomFromServer={}
            this.originRoomDataForSearchFloor={}
            this.roomParamsToServer = [];
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
            this.region.country.areaId= '';
            this.region.building.buildingId = '';
            this.region.floor.floorId='';
            this.getRoomFromServer={}
            this.originRoomDataForSearchFloor={}
            this.roomParamsToServer = [];
            this.region.flag = false;
          },
        )
      },
      //根据区ID获取写字楼列表
      getBuildingListByCountryId(){
        this._httpPasser(
          'building/getBuildingByAreaId',
          'get',
          {areaId:this.region.country.areaId},
          (res)=>{
            console.log("111",res.result);
            this.region.buildingList = res.result;
            this.region.floor.floorId='';
            this.region.building.buildingId = '';
            this.getRoomFromServer={}
            this.originRoomDataForSearchFloor={}
            this.roomParamsToServer = [];
          }
        )
      },
      getInfoByBuildingId(){
        this._httpPasser(
          'building/getBuildingFloorListByBuildingId',
          'get',
          {buildingId:this.region.building.buildingId},
          (res)=>{
            this.region.floorList = res.result.buildingFloorList;
            this.region.floor.floorId='';
            console.log(this.region.floorList)
            //this.region.floor.floorId='';
          }
        )
        //获取房间数据
        this._httpPasser(
          'newBuilding/getRoomList',
          'get',
          {buildingId:this.region.building.buildingId},
          (res)=>{
            this.getRoomFromServer = res.result;
            for(let o in this.getRoomFromServer){
              //console.log('haha',this.getRoomFromServer[o])
              this.inputVisibleInputFlag[this.getRoomFromServer[o].buildingFloorId]= false;
              for(let p in this.getRoomFromServer[o].roomList){
                this.getRoomFromServer[o].roomList[p].buildingFloorId = this.getRoomFromServer[o].buildingFloorId;
                this.getRoomFromServer[o].roomList[p].choseFlag = 'N';
                this.getRoomFromServer[o].roomList[p].hoverFlag = 'N';
                if(this.getRoomFromServer[o].roomList[p].roomName==null || this.getRoomFromServer[o].roomList[p].roomName==''){
                  this.getRoomFromServer[o].roomList[p].roomName = '-';
                }
              }
            }
            //console.log('new',this.getRoomFromServer)
            //将getRoomFromServer数据深拷贝给originRoomDataForFloorSearch,以方便楼层搜索
            for(let o in this.getRoomFromServer){
              this.originRoomDataForSearchFloor[o]={}
              for(let p in this.getRoomFromServer[o]){
                // console.log('currentP',p)
                if(p!='roomList'){
                  this.originRoomDataForSearchFloor[o][p] = this.getRoomFromServer[o][p];
                  //console.log('noRoomValue',this.originRoomDataForSearchFloor[o])
                }
                else{
                  //console.log('room',p)
                  this.originRoomDataForSearchFloor[o][p] = []
                  for(let q in this.getRoomFromServer[o][p]){
                    this.originRoomDataForSearchFloor[o][p].push(this.getRoomFromServer[o][p][q])
                  }
                }
              }

            }
            this.setFloorHeight();
          },
          true,
          ()=>{
            this.getRoomFromServer = {};
          }
        )
      },
      //根据搜层搜索房间
      changeInfoByFloorId(){
        //this.isShowRoomChose = false;
        this.isShowRoomChoseValue = false;
        let floorSearchParams = this.region.floor.floorId;
        //从数据备份中查询出符合楼层条件的对象，赋值给房间数据
        this.getRoomFromServer = [];
        //此处浅拷贝，会保留之前楼层的选择信息，如果需要清除选择信息，那么需要进行一次深拷贝。根据需求进行修改
        for(let o in this.originRoomDataForSearchFloor){
          if(this.originRoomDataForSearchFloor[o].buildingFloorId==floorSearchParams){
            this.getRoomFromServer.push(this.originRoomDataForSearchFloor[o]);
            break;
          }
          else{
            continue;
          }
        }
        this.isShowRoomChoseValue = true;

      },
      //清除楼层搜索条件
      clearFloorSearch(){
        for(let o in this.originRoomDataForSearchFloor){
          this.getRoomFromServer.push(this.originRoomDataForSearchFloor[o]);
        }

      },
      //清除所有搜索
      clearAllChose(){
        //清除省选择数据
        this.region.province.code=''
        //清除城市数据
        this.region.cityList = [];
        this.region.city.code= '';
        //清除区数据
        this.region.countryList = [];
        this.region.country.areaId= '';
        //清除写字楼数据
        this.region.buildingList = [];
        this.region.building.buildingId = '';
        //清除楼层数据
        this.region.floorList = [];
        this.region.floor.floorId='';
        //清除房间数据
        this.getRoomFromServer={}
        this.originRoomDataForSearchFloor={}
        //清除返回数据
        this.roomParamsToServer = [];
        this.region.flag = false;
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
            if(this.region.country.areaId!==''){
              //console.log(this.buildingCascader.buildingRoomList,this.buildingCascader.buildingRoomId)
              for(let o in this.region.countryList){
                if(this.region.countryList[o].areaId==this.region.country.areaId){
                  regionAllName += this.region.countryList[o].name;
                  break;
                }
              }
              if(this.region.building.buildingId!==''){
                for(let o in this.region.buildingList){
                  if(this.region.buildingList[o].buildingId==this.region.building.buildingId){
                    regionAllName += this.region.buildingList[o].value;
                    break;
                  }
                }
              }
            }
          }

        }
        return regionAllName;
      },
      handleSubmit(){
        let re = {}
        re.address = this.getRegionAllName()
        //楼层房间对象
        let objRoom = {}
        for(let o in this.roomParamsToServer){
          objRoom[this.roomParamsToServer[o].buildingFloorName] = []
        }
        for(let q in this.roomParamsToServer){
          objRoom[this.roomParamsToServer[q].buildingFloorName].push(this.roomParamsToServer[q].roomName)
        }
        //楼层房间字符串
        let stringRoom = ''
        for(let p in objRoom){
          stringRoom+=p+'层'
          for(let r in objRoom[p]){
            if(r!=objRoom[p].length-1){
              stringRoom+=objRoom[p][r]+','
            }
            else{
              stringRoom+=objRoom[p][r]+';'
            }
          }
        }
        re.address+=stringRoom;
        re.buildingId = this.region.building.buildingId;
        re.roomResult = this.roomParamsToServer;
        this.$emit('roomParams',re)
      },
      /*getRoomList(){
        this._httpPasser(
          '/newBuilding/getRoomList',
          'get',
          {}
        )
      },*/
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      //动态设置楼层高度
      setFloorHeight(){
        //强制刷新
        this.flagForResetHeight = false;
        //根据房间高度，动态设置楼层高度。
        this.$refs = [];
        this.$nextTick(() => {
          let ref = this.$refs;
          //刷新ref
          this.floorHeight = {};
          for (let o in ref) {
            if (o.match('roomHeight')) {
              //获取楼层名称
              let floorName = o.split('_')[1]
              if(ref[o][0]){
                let roomOffsetHeight = ref[o][0].offsetHeight;
                this.floorHeight[floorName] = roomOffsetHeight + "px";
              }
            }
          }
          this.flagForResetHeight = true
        })
      },
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
                  callback200(data.result)//2019年1月4日添加 204时清空数据
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
                  callback200(data.result)//2019年1月4日添加 204时清空数据
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
      console.log('路由',this.$router)
      /*this.$nextTick(()=>{
        var newRoomTag = document.querySelectorAll('.newRoom .el-tag');
        newRoomTag.onmouseenter = function(){
          alert(this.className)
        }
      })*/
    }
  }
</script>
<style lang="less" scoped>
  #choseRoomFromMuiltyFloor {
    .submitButton{
      text-align:center;
    }
    .buildingFloor{
      .floorUnit{
        border:solid 1px #e4eaec;
      }

      .fl {
        width: 135px;
        height:224px;
        line-height:224px;
        text-align:center;
        font-size:18px;
        font-weight:bold;
        float:left;
      }
      .fr{
        width:700px;
        float:left;
      }
    }

  }

</style>
<style lang="less">
  #choseRoomFromMuiltyFloor {
    width:925px;
    padding-left:20px;
    padding-right:20px;
    .el-select {
      width: 175px;
    }
    .el-tag + .el-tag {
      /*margin-left: 10px;*/
    }
    .el-tag {
      color: #ffffff;
      height: 50px;
      line-height: 50px;
      width: 92px;
      font-size: 15px;
      text-align: center;
      padding:0px;
      cursor:pointer;
      margin-bottom:7px;
      margin-left:7px;
    }
    .el-tag .el-icon-close {
      border-radius: 50%;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      height: 16px;
      width: 16px;
      line-height: 16px;
      top: -1px;
      right: 20px;
      color: #000000;
      background-color: white;
    }

    .button-new-tag {
      margin-left: 7px!important;
      height: 50px;
      width:90px;
      text-align:center;
      color:#ffffff;
      background-color: rgb(227, 158, 82);
      font-size:14px;
      line-height: 50px;
      padding:0px;
    }

    .input-new-tag {
      height: 45px;
      width:90px;
      text-align:center;
      font-size:14px;
      line-height: 50px;
      margin-left: 7px!important;
      padding:0px;
      vertical-align: middle;
    }
    .input-new-tag input{

    }
    .input-new-tag {
      height: 50px;
      line-height: 50px;
    }
    .oldRoom{
      .el-tag{
        border: 1px solid #08c0af;
        .innerSpan{
          display:inline-block;
          width:100%;
          height:100%;
        }
        .oldRoomChosed{
          background-image:url("../../assets/images/public/choseRoomIcon.png");
          background-repeat: no-repeat;
          background-position:65px 24px;
        }
      }
      .el-tag:hover{
        background-color:#1ab394!important;
        border: 1px solid #009688;
      }
      .el-tag[choseFlag='Y']{
        background-color:#1ab394!important;
        border: 1px solid #009688;
      }
    }
    .newRoom{
      .el-tag{
        position:relative;
        border: 1px solid #f8ac59;
        .innerSpan{
          display:inline-block;
          width:100%;
          height:100%;
        }
      }
      .el-tag:hover{
        background-color:#fcb160!important;
        border: 1px solid #e39e52;
      }
      .newRoomHover{
        display: inline-block;
        z-index: 99;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
        right: 3px;
        top: 18px;
        color:black;
        font-size:12px;
        line-height:16px;
      }

    }
  }

</style>

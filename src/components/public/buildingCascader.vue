<template>
  <div class="buildingCascader">
    <el-form :model="buildingCascader">
      <el-form-item>
        <el-select v-model="buildingCascader.buildingGroupId" v-if="!begainFromBuildingFlag" clearable @clear="clearBuildingSelection('buildingGroup')" placeholder="请选择楼盘" @change="getBuildingList">
          <el-option
            v-for="(buildingGroup,index) in buildingCascader.buildingGroupList"
            :key="index"
            :label="buildingGroup.buildingGroupName"
            :value="buildingGroup.buildingGroupId ">
          </el-option>
        </el-select>
        <el-select v-model="buildingCascader.buildingId" clearable  @clear="clearBuildingSelection('building')" placeholder="请选择写字楼" :disabled="hasBuilding"  @change="getFloorList">
          <el-option
            v-for="(building,index) in buildingCascader.buildingList"
            :key="index"
            :label="building.buildingName"
            :value="building.buildingId">
          </el-option>
        </el-select>
        <el-select v-model="buildingCascader.buildingFloorId" clearable @clear="clearBuildingSelection('floor')" placeholder="请选择楼层" :disabled="hasFloor"  @change="getRoomList">
          <el-option
            v-for="(floor,index) in buildingCascader.buildingFloorList"
            :key="index"
            :label="floor.buildingFloorName"
            :value="floor.buildingFloorId">
          </el-option>
        </el-select>
        <div class="clear20"></div>
        <div class="room" v-if="hasRoom">
          <el-card
            class="box-card"
            body-style="width:100%;min-height:60px;padding:0px">
            <div class="floorName">{{getFloorName}}</div>
            <el-radio-group v-model="buildingCascader.buildingRoomId" size="medium"  @change="handleRoomChange">
              <el-radio-button v-for="(room,index) in buildingCascader.buildingRoomList" :key="index" :label="room.buildingRoomId">{{room.buildingRoomName}}</el-radio-button>
            </el-radio-group>
            <!--<div v-for="(room,index) in roomList" :key="index"   class="roomName" @click="handleRoomClick">{{room.roomName}}</div>-->
          </el-card>
          <div class="clear20"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "buildingCascaderModle",
    props:['begainFromBuilding'],
    data() {
      return {
        //获取楼盘列表参数，物业公司ID
        companyId:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        },
        //楼盘级联数据
        buildingCascader:{
          //楼盘列表
          buildingGroupList:[
          ],
          //写字楼列表
          buildingList:[
          ],
          //楼层列表
          buildingFloorList:[
          ],
          //房间列表
          buildingRoomList:[
          ],
          //搜索参数
          //楼盘ID
          buildingGroupId:'',
          //写字楼ID
          buildingId:'',
          //楼层ID
          buildingFloorId:'',
          //房间ID
          buildingRoomId:''
        },
        //组件返回值
        valueCurrent:'',
        objReturn:{
        }
      };
    },
    computed:{
      //是否直接从写字楼开始检索
      begainFromBuildingFlag:function(){
        let flag = false;
        if(this.begainFromBuilding){
          if(this.begainFromBuilding==='false' || !this.begainFromBuilding){
            flag = false;
          }
          else if(this.begainFromBuilding==='true' || this.begainFromBuilding){
            flag = true;
          }
        }
        else{
          flag = false;
        }
        return flag;
      },
      //是否显示写字楼选择
      hasBuilding:function(){
        let flag = true;
        //如果直接从写字楼开始显示，则直接显示写字楼选择
        if(this.begainFromBuildingFlag){
          flag = false;
        }
        else{
          flag = true
          if(this.buildingCascader.buildingGroupId!==''){
            flag = false;
          }
        }
        return flag;
      },
      //是否显示楼层选择
      hasFloor:function(){
        let flag = true
        if(this.buildingCascader.buildingId!==''){
          flag = false;
        }
        return flag;
      },
      //是否显示房间选择
      hasRoom:function(){
        let flag = false
        if(this.buildingCascader.buildingFloorId!==''){
          flag = true;
        }
        return flag;
      },
      //获取楼层名称
      getFloorName:function(){
        let re = ''
        for(let o in this.buildingCascader.buildingFloorList){
          if(this.buildingCascader.buildingFloorId == this.buildingCascader.buildingFloorList[o].buildingFloorId){
            re = this.buildingCascader.buildingFloorList[o].buildingFloorName;
            break;
          }
        }
        return re;
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getBuildingGroupList(){
        this._http('/building/getBuildingGroupListByCompanyId','get',this.companyId, data => {
          this.buildingCascader.buildingGroupList = data.result.buildingGroupList
        })
      },
      getBuildingList(value){
        //设置下级菜单不可用或者不可见
        this.buildingCascader.buildingId = '';
        this.buildingCascader.buildingFloorId = '';
        this.buildingCascader.buildingRoomId = '';
        this.buildingCascader.buildingBuildingList = [];
        this.buildingCascader.buildingFloorList = [];
        this.buildingCascader.buildingRoomList = [];
        //清空返回对象中的下级数据
        this.deleteProperFromObj(this.objReturn,['buildingId','buildingFloorId','buildingRoomId','buildingRoomName']);
        if(this.buildingCascader.buildingGroupId!=undefined && this.buildingCascader.buildingGroupId!=''){
          this._http('/building/getBuildingListByBuildingGroupId','get',{buildingGroupId:this.buildingCascader.buildingGroupId},data =>{
            //提供数据，并且写入返回对象
            this.valueCurrent = value;
            let roomNameAll = this.getRoomAllName()
            this.objReturn['buildingRoomName'] = roomNameAll;
            this.returnValue('buildingGroupId')
            this.buildingCascader.buildingList = data.result.buildingList
          })
        }

      },
      //根据公司ID获取写字楼
      getBuildingListByCompanyId(){
        //设置下级菜单不可用或者不可见
        this.buildingCascader.buildingId = '';
        this.buildingCascader.buildingFloorId = '';
        this.buildingCascader.buildingRoomId = '';
        this.buildingCascader.buildingBuildingList = [];
        this.buildingCascader.buildingFloorList = [];
        this.buildingCascader.buildingRoomList = [];
        //清空返回对象中的下级数据
        this.deleteProperFromObj(this.objReturn,['buildingId','buildingFloorId','buildingRoomId','buildingRoomName']);
          this._http('/building/getBuildingListByCompanyId','get',{companyId:this.$local.sefetch('info').companyId},data =>{
            //提供数据，并且写入返回对象
            //this.valueCurrent = value;
            let roomNameAll = this.getRoomAllName()
            this.objReturn['buildingRoomName'] = roomNameAll;
            //this.returnValue('buildingGroupId')
            this.buildingCascader.buildingList = data.result
            console.log(data.result)
          })
      },
      getFloorList(value){
        //设置下级菜单不可用或者不可见
        this.buildingCascader.buildingFloorId = '';
        this.buildingCascader.buildingRoomId = '';
        this.buildingCascader.buildingFloorList = [];
        this.buildingCascader.buildingRoomList = [];
        //清空返回对象中的下级数据
        this.deleteProperFromObj(this.objReturn,['buildingFloorId','buildingRoomId','buildingRoomName']);
        //提供数据，并且写入返回对象
        if(this.buildingCascader.buildingId!==''){
          this._http('/building/getBuildingFloorListByBuildingId','get',{buildingId:this.buildingCascader.buildingId},data =>{
            this.valueCurrent = value;
            let roomNameAll = this.getRoomAllName()
            this.objReturn['buildingRoomName'] = roomNameAll;
            this.returnValue('buildingId');
            this.buildingCascader.buildingFloorList = data.result.buildingFloorList
          })
        }
      },
      getRoomList(value){
        this.buildingCascader.buildingRoomId = '';
        //清空返回对象中的下级数据
        this.deleteProperFromObj(this.objReturn,['buildingRoomId','buildingRoomName']);
        this.buildingCascader.buildingRoomList = [];
        if(this.buildingCascader.buildingFloorId!==""){
          this._http('/building/getBuildingRoomListByBuildingFloorId','get',{buildingFloorId:this.buildingCascader.buildingFloorId},data =>{
            //提供数据，并且写入返回对象
            this.valueCurrent = value;
            let roomNameAll = this.getRoomAllName()
            this.objReturn['buildingRoomName'] = roomNameAll;
            this.returnValue('buildingFloorId');
            this.buildingCascader.buildingRoomList = data.result.buildingRoomList
          })
        }

      },
      handleRoomChange(value){
        this.valueCurrent = value;
        let roomNameAll = this.getRoomAllName()
        this.objReturn['buildingRoomName'] = roomNameAll;
        this.returnValue('buildingRoomId')
      },

      //type是当前选中的值的key值
      returnValue(type){
        if(type){
          this.objReturn[type] = this.valueCurrent;
        }
        this.$emit('buildingParam',this.objReturn)
      },
      //清除对象中的属性。参数为需要清除的属性的数组
      deleteProperFromObj(obj,properArray){
        for(let o in properArray){
          if(obj[properArray[o]]){
            delete obj[properArray[o]]
          }
        }
      },
      //获取房间全名
      getRoomAllName(){
        let roomAllName = ''
        if(this.buildingCascader.buildingGroupId!==''){
          for(let o in this.buildingCascader.buildingGroupList){
            if(this.buildingCascader.buildingGroupList[o].buildingGroupId==this.buildingCascader.buildingGroupId){
              roomAllName += this.buildingCascader.buildingGroupList[o].buildingGroupName;
              break;
            }
          }
          if(this.buildingCascader.buildingId!==''){
            for(let o in this.buildingCascader.buildingList){
              if(this.buildingCascader.buildingList[o].buildingId==this.buildingCascader.buildingId){
                roomAllName += this.buildingCascader.buildingList[o].buildingName;
                break;
              }
            }
            if(this.buildingCascader.buildingRoomId!==''){
              //console.log(this.buildingCascader.buildingRoomList,this.buildingCascader.buildingRoomId)
              for(let o in this.buildingCascader.buildingRoomList){
                if(this.buildingCascader.buildingRoomList[o].buildingRoomId==this.buildingCascader.buildingRoomId){
                  roomAllName += this.buildingCascader.buildingRoomList[o].buildingRoomName;
                  break;
                }
              }
            }
          }

        }
        return roomAllName;
      },
      //清除选项回调
      /*
      参数cascader为当前的所清除选项的层级。会根据这个层级来进行相关操作
      * */
      clearBuildingSelection(cascader){
        if(cascader=='buildingGroup'){
          this.buildingCascader.buildingGroupId = '';
          this.buildingCascader.buildingId = '';
          this.buildingCascader.buildingFloorId = '';
          this.buildingCascader.buildingRoomId = '';
          this.buildingCascader.buildingList = [];
          this.buildingCascader.buildingFloorList = [];
          this.buildingCascader.buildingRoomList = [];
          let roomNameAll = this.getRoomAllName()
          this.objReturn['buildingRoomName'] = roomNameAll;
          //清除返回值中的属性
          this.deleteProperFromObj(this.objReturn,['buildingGroupId','buildingId','buildingFloorId','buildingRoomId','buildingRoomName']);
        }
        if(cascader=='building'){
          this.buildingCascader.buildingId = '';
          this.buildingCascader.buildingFloorId = '';
          this.buildingCascader.buildingRoomId = '';
          this.buildingCascader.buildingFloorList = [];
          this.buildingCascader.buildingRoomList = [];
          let roomNameAll = this.getRoomAllName()
          this.objReturn['buildingRoomName'] = roomNameAll;
          //清除返回值中的属性
          this.deleteProperFromObj(this.objReturn,['buildingId','buildingFloorId','buildingRoomId','buildingRoomName']);
        }
        else if(cascader=='floor'){
          this.buildingCascader.buildingFloorId = '';
          this.buildingCascader.buildingRoomId = '';
          this.buildingCascader.buildingRoomList = [];
          let roomNameAll = this.getRoomAllName()
          this.objReturn['buildingRoomName'] = roomNameAll;
          //清除返回值中的属性
          this.deleteProperFromObj(this.objReturn,['buildingFloorId','buildingRoomId','buildingRoomName']);
        }
        this.returnValue()
      },
      /*工具方法*/
      _http(url,type,params,callback200){
        if(type=="get"){
          this.$httpPasser.get(
            url,
            {params:params}
          ).then(
            (response)=>{
              let data = response.data;
              if(data.resultCode==200){
                callback200(data)
              }
              else{
                this.$message({
                  showClose: true,
                  message: data.result?data.result:data.resultCodeDesc,
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
    },
    mounted(){
      if(this.begainFromBuildingFlag){
        this.getBuildingListByCompanyId();
      }
      else{
        this.getBuildingGroupList();
      }

    }
  }
</script>

<style scoped lang="less">
  .buildingCascader{
    width:100%;
  }
  .clear20{
    width:100%;
    height:20px;
    clear:both;
  }
  .box-card{
    padding-top:15px;
  }
  .floorName{
    padding: 5px;
    float: left;
    text-align: center;
    text-indent: 0px;
    min-width: 45px;
    margin-left: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #409eff;
    line-height: 30px;

  }
</style>
<style lang="less">
  .buildingCascader{
    line-height:35px;
    .el-form-item{
      margin-bottom:0px!important;
    }
    .el-input__inner{
      min-width:200px;
    }
    .is-always-shadow{
      width:100%;
    }
  }

</style>

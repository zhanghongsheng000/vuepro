<template>
  <div class="buildingCascader">
    <el-form :model="buildingCascader">
      <el-form-item>
        <el-select v-model="buildingCascader.buildingGroupId" clearable placeholder="请选择" @change="getBuildingList">
          <el-option
            v-for="(buildingGroup,index) in buildingCascader.buildingGroupList"
            :key="index"
            :label="buildingGroup.buildingGroupName"
            :value="buildingGroup.buildingGroupId ">
          </el-option>
        </el-select>
        <el-select v-model="buildingCascader.buildingId" clearable placeholder="请选择" :disabled="hasBuilding"  @change="getFloorList">
          <el-option
            v-for="(building,index) in buildingCascader.buildingList"
            :key="index"
            :label="building.buildingName"
            :value="building.buildingId">
          </el-option>
        </el-select>
        <!--<el-select v-model="buildingCascader.buildingFloorId" placeholder="请选择" :disabled="hasFloor"  @change="getRoomList">
          <el-option
            v-for="(floor,index) in buildingCascader.buildingFloorList"
            :key="index"
            :label="floor.buildingFloorName"
            :value="floor.buildingFloorId">
          </el-option>
        </el-select>-->
        <div class="clear20"></div>
        <!--<div class="room" v-if="hasRoom">
          <el-card
            class="box-card"
            body-style="width:100%;min-height:60px;padding:0px">-->
            <!--<div class="floorName">{{getFloorName}}</div>-->
            <!--<el-radio-group v-model="buildingCascader.buildingRoomId" size="medium"  @change="handleRoomChange">
              <el-radio-button v-for="(room,index) in buildingCascader.buildingRoomList" :key="index" :label="room.buildingRoomName" ></el-radio-button>
            </el-radio-group>-->
            <!--<div v-for="(room,index) in roomList" :key="index"   class="roomName" @click="handleRoomClick">{{room.roomName}}</div>-->
          <!--</el-card>
        </div>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "buildingCascaderModle",
    data() {
      return {
        //获取楼盘列表参数，物业公司ID
        getBuildingGroupParams:{
          companyId:'1'
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
//          buildingFloorId:'',
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
      hasBuilding:function(){
        let flag = true
        if(this.buildingCascader.buildingGroupId!==''){
          flag = false;
        }
        return flag;
      },
      hasFloor:function(){
        let flag = true
        if(this.buildingCascader.buildingId!==''){
          flag = false;
        }
        return flag;
      },
//    hasRoom:function(){
//      let flag = false
//      if(this.buildingCascader.buildingFloorId!==''){
//        flag = true;
//      }
//      return flag;
//    },
//    getFloorName:function(){
//      let re = ''
//      for(let o in this.buildingCascader.buildingFloorList){
//        if(this.buildingCascader.buildingFloorId == this.buildingCascader.buildingFloorList[o].buildingFloorId){
//          re = this.buildingCascader.buildingFloorList[o].buildingFloorName;
//          break;
//        }
//      }
//      return re;
//    }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getBuildingGroupList(){
        this._http('/building/getBuildingGroupListByCompanyId','get',this.getBuildingGroupParams,data => {
          this.buildingCascader.buildingGroupList = data.result.buildingGroupList
        })
      },
      getBuildingList(value){
        this._http('/building/getBuildingListByBuildingGroupId','get',{buildingGroupId:this.buildingCascader.buildingGroupId},data =>{
          //设置下级菜单不可用或者不可见
          this.buildingCascader.buildingId = '';
          this.buildingCascader.buildingFloorId = '';
          //清空返回对象中的下级数据
          this.deleteProperFromObj(this.objReturn,['buildingId','buildingFloorId','buildingRoomId']);
          //提供数据，并且写入返回对象
          this.valueCurrent = value;
          this.returnValue('buildingGroupId')
          this.buildingCascader.buildingList = data.result.buildingList
        })
      },
      getFloorList(value){
        this._http('/building/getBuildingFloorListByBuildingId','get',{buildingId:this.buildingCascader.buildingId},data =>{
          //设置下级菜单不可用或者不可见
          this.buildingCascader.buildingFloorId = '';
          //清空返回对象中的下级数据
          this.deleteProperFromObj(this.objReturn,['buildingFloorId','buildingRoomId']);
          //提供数据，并且写入返回对象
          this.valueCurrent = value;
          this.returnValue('buildingId');
          this.buildingCascader.buildingFloorList = data.result.buildingFloorList
        })
      },
//    getRoomList(value){
//
//      this._http('/building/getBuildingRoomListByBuildingFloorId','get',{buildingFloorId:this.buildingCascader.buildingFloorId},data =>{
//        //清空返回对象中的下级数据
//        this.deleteProperFromObj(this.objReturn,['buildingRoomId']);
//        //提供数据，并且写入返回对象
//        this.valueCurrent = value;
//        this.returnValue('buildingFloorId');
//        this.buildingCascader.buildingRoomList = data.result.buildingRoomList
//      })
//    },
      handleRoomChange(value){
        this.valueCurrent = value;
        this.returnValue('buildingRoomId')
      },
      returnValue(type){
        this.objReturn[type] = this.valueCurrent;
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
      /*工具方法*/
      _http(url,type,params,callback200){
        if(type=="get"){
          this.$http.get(
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
      this.getBuildingGroupList();
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
      margin-bottom:10px;
    }
    .el-input__inner{
      min-width:200px;
    }
    .is-always-shadow{
      width:100%;
    }
  }

</style>

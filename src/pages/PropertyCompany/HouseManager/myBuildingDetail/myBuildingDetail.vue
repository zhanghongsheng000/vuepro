<template>
  <div class="buildingList_show" v-if="allPageFlag">
    <!--名称：{{building.buildingName}}
    ID：{{building.buildingId}}-->
    <div class="header_con">
      <h3 class="buildingName">{{buildingName}}</h3>
      <div class="icon_con">
        <label class="notRent"></label><span>空租</span>
        <label class="rented"></label><span>在租</span>
        <label class='notuse'></label><span>未采集</span>
        <label class="fix"></label><span>报修</span>
        <label class="ownCost"></label><span>欠费</span>
        <label class="residentPerson"></label><span>常驻人员</span>
        <label class="truePerson"></label><span>实时人员</span>
      </div>
      <div class="buildPersonCondition">
        <div class="fl_section fl">
          <p>房间总数：
            <span class="pointer" @click="toRoomInfo(0)">
              {{BuildingDetailNum.roomNum}}
            </span>间（在租
            <span class="pointer" @click="toRoomInfo(1)">
              {{BuildingDetailNum.Renting}}
            </span>间 空租
            <span class="pointer" @click="toRoomInfo(2)">
              {{BuildingDetailNum.emptyRent}}
            </span>间）
          </p>
          <p>公司总数：<span style="cursor:pointer;padding-left:5px;padding-right:5px;" @click="goToCompanyInfo">{{BuildingDetailNum.companyNum}}</span>家
            常驻人口：<span class="pointer" @click="toCustomerInfo(1)">{{BuildingDetailNum.permanent}}</span>人</p>
        </div>
        <div class="fr_section fr">
          <p>大楼实时人群</p>
          <p>常驻人口：<span class="pointer" @click="toCustomerInfo(2)">{{BuildingDetailNum.realTimePermanent}}</span>人 流动人口：<span
            class="pointer" @click="toCustomerInfo(3)">{{BuildingDetailNum.realTimeTemporary}}</span>人 特殊人群：
            <span class="pointer" @click="toCustomerInfo(4)">{{BuildingDetailNum.realTimeEspecial}}</span>人 黑名单：<span
              class="pointer" @click="toCustomerInfo(5)">{{BuildingDetailNum.Blacklist}}</span>人
          </p>
        </div>
      </div>
    </div>
    <div class="floor_details clearfix" v-for="floor,index in buildingDataArray" :key="index">
      <div
        class="floor_num fl"
        v-bind:style="{height:floorHeight[floor.floorName],lineHeight:floorHeight[floor.floorName]}">
        <p>{{floor.floorName}}</p>
        <p class="floor_area">{{floor.floorArea}}</p>
      </div>
      <div class="room_details fl" :floorName="floor.floorName" :ref="'roomHeight_'+floor.floorName">
        <div class="room_num fl" v-for="room in floor.buildingRoomList" :roomStatus="room.roomStatus"
             v-bind:style="{ backgroundColor:roomColor(room.roomStatus),width:roomWidth(room.areaCalcSize,floor.floorCalcArea)}"
             @click="toDetails(room)">
          <div class="clearfix">
            <span
              class="fl roomnum"
              :title="room.roomName"
              v-bind:style="{maxWidth:roomNameWidth(roomWidth(room.areaCalcSize,floor.floorCalcArea))}">{{room.roomName}}</span>
            <!--v-bind:style="{maxWidth:roomNameWidth(roomWidth(room.areaSize,floor.floorArea))}"-->
            <span
              class="fl companyName"
              :title="room.shopName"
              v-bind:style="{maxWidth:companyNameWidth(roomWidth(room.areaCalcSize,floor.floorCalcArea),roomNameWidth(roomWidth(room.areaCalcSize,floor.floorCalcArea)))}">{{room.shopName}}</span>
            <!--v-bind:style="{maxWidth:companyNameWidth(roomWidth(room.areaSize,floor.floorArea))}"-->
            <span class="fr roomarea" v-if="room.isArea">{{room.areaSize}}㎡</span>
          </div>
          <div class="Person">
            <label class="fixed_condition onRepair" v-if="room.ifRepair == 'Y'" @click="toNoReceiveRepairList($event,room)"></label>
            <label class="fixed_condition outRepair" v-else></label>
            <label class="own_condition onArrears" v-if="room.ifArrears == 'Y'"></label>
            <label class="own_condition outArrears" v-else></label>
            <div class="fr persons_con" v-show="room.roomStatus == 'Y'">
              <label class="person_condition"></label><span>{{room.permanentCount}}</span>
              <label class="personrel_conditon"></label><span>{{room.realTimeCount}}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogCompanDetails" top="0">
      <div class="building_room_picture">
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

         <el-dialog title="提示" :visible.sync="dialogVisible" width="430px" top="0">-->
        <div v-if="isCompanyInfo">
          <div class="building_room_header">
            <div class="clearfix">
              <p class="company_name fl">{{companyName}}</p>
            </div>
            <div class="building_room_message">
              <p>{{buildingName}}{{roomInfo.roomName}}</p>
              <p>业务联系人：{{companyInfo.contact}}</p>
              <p>联系电话：{{companyInfo.telephone}}</p>

            </div>
            <div class="search_message">
              <button @click="goToRenterCompanyInfo">查看公司基本信息</button>
            </div>
          </div>
          <div class="building_rent clearfix">
            <div class="building_rent_message fl">
              <p>面积</p>
              <p>{{roomInfo.areaSize}}㎡</p>
            </div>
            <div class="building_rent_message fl">
              <p>起租日期</p>
              <p>{{companyInfo.inTime}}</p>
            </div>
            <div class="building_rent_message fl" id="last">
              <p>结束日期</p>
              <p>{{companyInfo.outTime}}</p>
            </div>
          </div>
          <div class="passenger_con" v-if="isPasser(companyInfo)">
            <div class="pass clearfix">
              <p class="fl title">通行客</p>
              <!-- <p class="fr states">未使用</p>-->
            </div>
            <p class="employ_num">通行员工数量：{{companyInfo.employeeNum}}人</p>
          </div>
          <!--<div class="intelligent_state"  v-if="isSalary(companyInfo)">
            <p>物业缴费情况</p>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="month" label="月份">
              </el-table-column>
              <el-table-column prop="should_salary" label="应缴费（元）" width="110">
              </el-table-column>
              <el-table-column prop="act_salary" label="实缴费（元）" width="110">
              </el-table-column>
              <el-table-column prop="salary_date" label="缴费日期">
              </el-table-column>
            </el-table>
          </div>-->
        </div>

        <div class="room_message">
          <p class="title">房屋基本信息</p>
          <p class="state fr">{{roomInfo.roomStatusDesc}}</p>
          <p class="room_area">房间面积：{{roomInfo.areaSize}}m²</p>
          <div class="room_pic clearfix">
            <p class="fl">户型图：</p>
            <img :src="roomInfo.imgPath" class="fl"/>
          </div>
        </div>
        <div class="center">
          <button @click="dialogCompanDetails=false">确 定</button>
        </div>
        <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  		</span>
        <!--</el-dialog>-->
      </div>
    </el-dialog>
    <!--<div class="floor_details clearfix">
            <div class="floor_num fl">
                <p>20</p>
                <p class="floor_area">90.25㎡</p>
            </div>
            <div class="room_details fl">
                <div class="room_num">
                    <div class="clearfix">
                        <span class="fl">2001</span>
                        <span class="fr">120㎡</span>
                    </div>
                    <p>石家庄大发展科技有限公司</p>
                </div>
            </div>
        </div>-->
  </div>
</template>

<script>
  //import buildingGroupDetals from '@/components/PropertyCompany/companyDetails'
  import getUrl from '@/assets/js/global'

  export default {
    name: "my-building-detail",
    data() {
      return {
        companyName: '',
        buildingName: this.$route.query.buildingName,
        buildingId: this.$route.params.buildingId,
        //房间的最小宽度，如果任意一个房间的宽度小于这个值，就需要对当前楼层的剖面图进行分层
        minWidth: 146.333,
        //房间最大宽度
        maxWidth: 890,
        //房间名称所占房屋宽度比例 xxx%
        roomNameWidthScale: 20,
        //公司名称所占房屋宽度比例 xxx%
        companyNameWidthScale: 30,
        //楼层最小高度
        floorMaxHeight:62,
        buildingDataArray: [
          /*{
                      "floorNum": 4,
                      "roomList": [{
                        "companyId": 127,
                        "buildingRoomLayoutPic": null,
                        "companyName": "贺兰明月租客公司",
                        "roomId": 7814,
                        "roomName": "401",
                        "areaSize": 1000
                      }],
                      "totalArea": 1000
                    }*/
        ],
        dialogCompanDetails: false,
        companyIdDetails: '',
        //公司详细信息
        companyInfo: {
          companyName: '',
          /*//联系人
                    contact:'',
                    //业务联系人手机号
                    telephone:'',
                    //通行客数量
                    employeeNum:'',
                    //月份
                    month:'',
                    //应缴金额
                    total:'',
                    //实缴金额
                    realPayment:'',
                    //缴费日期
                    payDate:''*/
        },
        //当前房间详情
        roomInfo: {},
        dialogTitle: '公司信息',
        //是否显示公司详情
        isCompanyInfo: true,
        //
        tableData: [],
        BuildingDetailNum: {
          buildingName: '', //写字楼名称
          roomNum: '', //		房间数量
          emptyRent: '', //		空租数量
          Renting: '', //		在租数量
          companyNum: '', //		公司数量
          permanent: '', //		常驻人口数量
          realTimePermanent: '', //		实时常驻人口数量
          realTimeTemporary: '', //		实时临时人口数量
          realTimeEspecial: '', //		实时特殊人群数量
          Blacklist: '', //		黑名单数量
        },
        //roomlist的计时器
        timeOutRoomList: '',
        //顶部数据的轮询计时器
        timeOut: '',
        //楼层高度对象，以楼层名称为KEY值存储楼层高度，渲染房间时会写入
        floorHeight: {},
        //刷新页面
        allPageFlag:true
      }
    },
    // components: {buildingGroupDetals},
    methods: {
      //人员信息
      toCustomerInfo(index) {
        this.$router.push({
          path: '../customerInfo',
          query: {
            buildingId: this.buildingId,
            type: index
          }
        })
      },
      //如果返回的数据中的公司ID为null，则说明为空租房间。则颜色为灰色，否则为蓝色
      roomColor(roomStatus) {
        let re = '#009688'
        switch (roomStatus) {
          case "Y":
            re = '#009688';
            break;//已租出
          case "N":
            re = '#bfbfbf';
            break;//空租
          case "W":
            re = '#777777';
            break;//未采集
        }
        return re;
      },
      //判断是否有通行客人
      isPasser(companyInfo) {
        let re = true;
        if (companyInfo.employeeNum) {
          re = false;
        }
        return re;
      },
      //判断是否有代发工资
      isSalary(companyInfo) {
        let re = true;
        if (companyInfo.total) {
          let temp = {};
          temp.month = companyInfo.month;
          temp.total = companyInfo.total;
          temp.realPayment = companyInfo.realPayment;
          temp.payDate = companyInfo.payDate;
          this.tableData.push(temp);
          re = false;
        }
        return re;
      },
      /*//楼层高度
      floorHeight(floorName){
        this.$nextTick(()=>{
          return this.$refs[floorName][0].offsetHeight +'px'
        })

        //return this.$refs[floorName].offsetHeight+'px';
      },*/
      //房间宽度
      roomWidth(roomCalcArea, floorCalcArea) {
        let re = Math.floor((parseInt(roomCalcArea) / parseInt(floorCalcArea.replace('㎡', ''))) * 890 - 2)
        if (re < this.minWidth) {
          re = this.minWidth
        }
        else if (re > this.maxWidth) {
          re = this.maxWidth;
        }
        return re + 'px'
      },
      //跳转到房间详情
      toRoomInfo(condition) { //跳转到房间详情
        console.log(condition)
        this.$router.push({
          path: '../roomInfo',
          query: {
            buildingId: this.buildingId,
            condition:condition,
          }
        })
      },
      //房间名称宽度
      roomNameWidth(roomWidth) {
        let re = 45
        if (roomWidth.match('px')) {
          roomWidth = Number(roomWidth.replace('px', ''));
        }
        re = roomWidth * this.roomNameWidthScale / 100
        re = re>=45?re:45;
        re = re+'px';
        return re;
      },
      //公司名称宽度
      companyNameWidth(roomWidth,roomNameWidth) {
        let re = 40
        if (roomWidth.match('px')) {
          roomWidth = Number(roomWidth.replace('px', ''));
        }
        if(roomNameWidth.match('px')){
          roomNameWidth = Number(roomNameWidth.replace('px',''))
        }
        re =  roomWidth-roomNameWidth-42-10
        re = re>=40?re:40;
        re = re+'px';
        return re;
      },
      getCompanyDetails() {
        this.$httpPasser.get(
          'company/getTenantCompanyDetailByCompanyId', {
            params: {
              shopId: this.companyIdDetails
            }
          },
        ).then(
          res => {
            //清空公司信息
            this.companyInfo = {};
            for (let o in res.data.result) {
              this.companyInfo[o] = res.data.result[o];
            }
          }
        )
      },
      //获取图片地址前缀
      getImgUrl(callBack) {
        getUrl().then(res => {
          this.gImgUrl = res.gImgUrl
          callBack()
        })
      },
      /*//强制刷新组件
            refleshRoomComponent(companyId) {
              //强制刷新组件
              this.hackReset = false
              this.companyIdDetails = companyId;
              this.$nextTick(() => {
                this.hackReset = true
              })
            },*/
      //打开房间详情页面
      toDetails(room) {
        console.log(room)
        this.getImgUrl(() => {
          if (room.roomStatus == 'Y') {
            //查询公司的参数
            this.roomInfo = room;
            this.companyIdDetails = room.shopId;
            //设置公司信息
            this.getCompanyDetails()
            this.companyName = room.shopName;
            //弹出对话框
            this.dialogCompanDetails = true;
            //转换图片地址
            if (this.roomInfo.buildingRoomLayoutPic == null || this.roomInfo.buildingRoomLayoutPic == '') {
              this.roomInfo.imgPath = ''
            } else {
              this.roomInfo.imgPath = this.gImgUrl + this.roomInfo.buildingRoomLayoutPic;
            }
            //修改弹出框名称
            this.dialogTitle = '公司详情'
            //设置显示公司详情
            this.isCompanyInfo = true;
          }
          else if (room.roomStatus == 'N' || room.roomStatus == 'W') {
            //转换图片地址
            this.roomInfo = room;
            //转换图片地址
            if (this.roomInfo.buildingRoomLayoutPic == null || this.roomInfo.buildingRoomLayoutPic == '') {
              this.roomInfo.imgPath = ''
            } else {
              this.roomInfo.imgPath = this.gImgUrl + this.roomInfo.buildingRoomLayoutPic;
            }
            //设置不显示公司详情
            this.isCompanyInfo = false;
            //弹出对话框
            this.dialogCompanDetails = true;
            //修改弹出框名称
            this.dialogTitle = '房间详情'
          }
        })

      },
      toNoReceiveRepairList:function(event,data){//跳转到详情
        event.stopPropagation();
        console.log(data)
        let buildingFloorId = data.building_floor_id;
        let businessShopId = data.shopId;
        this.$router.push({
          path:"../noReceiveRepairList",
          query:{
            buildingFloorId:buildingFloorId,
            businessShopId:businessShopId
          }
        })
      },
      //进入租客公司详情页
      goToRenterCompanyInfo() {
        this.dialogCompanDetails = false;
        this.$router.push({
          path: '../renterCompanyInfo',
          query: {
            companyId: this.companyInfo.shopId
          }
        })
      },
      getBuildingDetailNum() {//获取实时人员
        let that = this;
        this.$httpPasser.post('newBuilding/getBuildingDeatilNum', {
          buildingId: this.buildingId
        }).then((res) => {
          if (res.data.resultCode == '200') {
            let data = res.data.result;
            this.BuildingDetailNum = data;
            if (this.timeOut != '') {
              clearTimeout(this.timeOut)
            }
            this.timeOut = setTimeout(function () {
              that.getBuildingDetailNum();
            }, 60000)
          } else if (res.data.resultCode == "204") {
            if (this.timeOut != '') {
              clearTimeout(this.timeOut)
            }
            this.timeOut = setTimeout(function () {
              that.getBuildingDetailNum();
            }, 60000)
          } else {
            if (this.timeOut != '') {
              clearTimeout(this.timeOut)
            }
            this.timeOut = setTimeout(function () {
              that.getBuildingDetailNum();
            }, 60000)
          }
        }).catch(
          (err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          }
        )
      },
      //跳转到公司详情
      goToCompanyInfo() {
        this.$router.push({path: '../companyInfo', query: {buildingId: this.buildingId}})
      },
      //获取仪表盘信息并且处理数据
      getRoomInfoListByBuildingId() {
        this.$httpPasser.post('newBuilding/getRoomInfoListByBuildingId', {
          buildingId: this.buildingId
        }).then((res) => {
          if (res.data.resultCode == '200') {
            this.buildingDataArray = res.data.result;
            //this.$message.success(res.data.resultCodeDesc)
            this.buildingDataArray = res.data.result;
            for (let o in this.buildingDataArray) {
              //当前楼层总面积
              /*
              *楼层面积和房间面积如果没有则默认值为1
               如果有楼层面积，有房间面积，且楼层面积大于等于房间面积之和；则不做任何操作
               如果有楼层面积，有房间面积，且楼层面积小于房间面积之和；则楼层面积为房间面积之和
               如果无楼层面积，有房间面积；则楼层面积为房间面积之和
               如果无楼层面积，无房间面积； 则楼层面积为房间面积之和
               只有部分房间面积时，无房间面积的房间设置面积为1
               以上均会用areaCalcSize和floorCalcArea来计算。显示依然会显示会原始的面积
              * */
              let sumRoomArea = 0;
              //为楼层计算面积赋初始值
              this.buildingDataArray[o].floorCalcArea = this.buildingDataArray[o].floorArea;
              for (let p in this.buildingDataArray[o].buildingRoomList) {
                this.buildingDataArray[o].buildingRoomList[p].isArea = true;
                //为房间计算面积赋初始值
                this.buildingDataArray[o].buildingRoomList[p].areaCalcSize = this.buildingDataArray[o].buildingRoomList[p].areaSize;
                if (this.buildingDataArray[o].buildingRoomList[p].areaSize == 0 || this.buildingDataArray[o].buildingRoomList[p].areaSize == null) {
                  this.buildingDataArray[o].buildingRoomList[p].areaSize = 0;
                  this.buildingDataArray[o].buildingRoomList[p].areaCalcSize = 1;
                  //this.buildingDataArray[o].buildingRoomList[p].isArea = false;
                  let temp = this.buildingDataArray[o].floorArea;
                  temp.replace('㎡', '');
                  temp = parseInt(temp);
                  temp = temp + 1;
                  temp = temp + '㎡'
                  this.buildingDataArray[o].floorCalcArea = temp;
                }
                else{

                }
                sumRoomArea+=this.buildingDataArray[o].buildingRoomList[p].areaCalcSize;
              }
              if(sumRoomArea>=Number(this.buildingDataArray[o].floorCalcArea.replace('㎡',''))){
                this.buildingDataArray[o].floorCalcArea = sumRoomArea+'㎡'
              }
            }
            //根据房间高度，动态设置楼层高度。
            this.$nextTick(() => {
              //alert('就是这么慢吗')
              let ref = this.$refs;
              for (let o in ref) {
                if (o.match('roomHeight')) {
                  if(ref[o].length>0){
                    //获取楼层名称
                    let floorName = o.split('_')[1]
                    let roomOffsetHeight = ref[o][0].offsetHeight;
                    //设置最小高度
                    if(roomOffsetHeight<this.floorMaxHeight){
                      roomOffsetHeight = this.floorMaxHeight
                    }
                    this.floorHeight[floorName] = roomOffsetHeight + "px";
                  }
                }
              }
            })
            if (this.timeOutRoomList != '') {
              clearTimeout(this.timeOutRoomList)
            }
            this.timeOutRoomList = setTimeout(() => {
              this.getRoomInfoListByBuildingId();
            }, 60000)
          } else if (res.data.resultCode == '204') {
            this.buildingDataArray = [];
            if (this.timeOutRoomList != '') {
              clearTimeout(this.timeOutRoomList)
            }
            this.timeOutRoomList = setTimeout(() => {
              this.getRoomInfoListByBuildingId();
            }, 60000)
            //this.$message.success(res.data.resultCodeDesc)
            //this.buildingDataArray = [];
          } else {
            if (this.timeOutRoomList != '') {
              clearTimeout(this.timeOutRoomList)
            }
            this.timeOutRoomList = setTimeout(() => {
              this.getRoomInfoListByBuildingId();
            }, 60000)
            //this.$message.error(res.data.resultCodeDesc)
          }
        })
      }
    },
    watch: {
      '$route'(to, from) {
        this.buildingId = this.$route.params.buildingId;
        this.buildingName = this.$route.query.buildingName;
        this.getBuildingDetailNum();
        this.getRoomInfoListByBuildingId();
        this.allPageFlag = false;
        this.$nextTick(()=>{
          this.allPageFlag = true;
        })
      }
    },
    created() {
      //this.getFloorList();
      this.getBuildingDetailNum();
      this.getRoomInfoListByBuildingId();
    },
    destroyed() {
      if (this.timeOut != '') {
        clearTimeout(this.timeOut)
      }
      if (this.timeOutRoomList != '') {
        clearTimeout(this.timeOutRoomList)
      }
/*      clearTimeout(this.timeOutRoomList)
      clearTimeout(this.timeOut)*/
    }
  }
</script>

<style lang="less" scoped>
  .buildingList_show {
    width: 1140px;
    position: relative;
    .floor_details {
      margin-bottom: 5px;
      .floor_num {
        width: 110px;
        height: 60px;
        border: 1px solid #DEDEDE;
        p {
          font-weight: 450;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
        }
      }
      .room_details {
        margin-left: 10px;
        width: 890px;
        .room_num {
          color: #FFF;
          width: 20%;
          border: 1px solid #DEDEDE;
          height: 60px;
          background: #85b6fc;
          cursor: pointer;
          /*bfbfbf*/
          .clearfix {
            padding-top: 3px;
          }
          .Person {
            padding-bottom: 2px;
          }
          .roomnum {
            display: inline-block;
            line-height: 30px;
            font-size: 14px;
            margin-left: 5px;
            font-weight: 600;
            height: 30px;
            min-width: 45px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .roomarea {
            display: inline-block;
            line-height: 30px;
            margin-right: 5px;
            font-size: 12px;
            max-width: 42px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 16px;
            padding: 10px;
          }
        }
      }
    }
    .building_room_picture {

      .title {
        font-size: 14px;
        line-height: 27px;
        color: #333333;
        font-weight: 600;
        padding: 0 3px;
      }
      width: 430px;
      .building_room_header {
        padding-bottom: 20px;
        border-bottom: 1px dotted #D9D9D9;
        .company_name {
          line-height: 27px;
          font-size: 16px;
          color: #333333;
          font-weight: 700;
        }
        .state {
          color: #fff;
          background: #ec4141;
          border-radius: 10px;
          padding: 2px 4px;
        }
        .building_room_message {
          p {
            font-size: 14px;
            line-height: 27px;
            color: #333;
          }
        }
        .search_message {
          margin-top: 10px;
          width: 100%;
          background: #428ff9;
          border-radius: 8px;
          text-align: center;
          padding: 10px 0;
          cursor: pointer;
          button {
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .building_rent {
        padding: 12px 0;
        border-bottom: 1px dotted #D9D9D9;
        .building_rent_message {
          padding: 5px 0;
          text-align: center;
          background: #e7f1ff;
          border-radius: 5px;
          width: 99px;
          height: 46px;
          margin-right: 46px;
        }
        #last {
          margin-right: 0px;
        }
      }
      .passenger_con {
        margin-top: 10px;
        border: 1px solid #DEDEDE;
        .pass {
          padding: 10px 3px 5px 3px;
          .title {
            font-size: 14px;
            line-height: 27px;
            color: #333333;
            font-weight: 600;
            padding: 0 3px;
          }
          .states {
            color: #428ff9;
            font-size: 14px;
            line-height: 27px;
            padding: 0 3px;
          }
        }
        .employ_num {
          font-size: 14px;
          line-height: 22px;
          padding: 0 3px;
        }
      }
      .intelligent_state {
        margin-top: 10px;
        padding-bottom: 10px;
        border: 1px solid #DEDEDE;
        p {
          font-size: 14px;
          line-height: 27px;
          color: #333333;
          padding: 0 3px;
          margin-bottom: 10px;
        }
      }
      .room_message {
        .room_pic {
          padding: 0 3px;
          .room_area {
            line-height: 27px;
            font-size: 14px;
            padding: 0 3px;
          }
          p {
            line-height: 27px;
          }
        }
      }
      .center {
        text-align: center;
        background-repeat: no-repeat;
        margin-top: 10px;
        button {
          background: url(../../../../assets/images/index/centure_bg.png);
          background-size: 116px 49px;
          width: 116px;
          height: 49px;
          background-position: 115px 53px;
          cursor: pointer;
          color: #FFF;
        }
      }
    }
    .header_con {
      padding: 10px 10px 10px 0;
      h3.buildingName {
        display: inline-block;
        font-size: 20px;
        line-height: 30px;
        font-size: 22px;
        font-weight: normal;
      }
      .icon_con {
        margin-left: 100px;
        display: inline-block;
        font-weight: bold;
        font-size: 14px;
      }
      .notRent {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: #bfbfbf;
        vertical-align: middle;
        margin-left: 10px;
      }
      .rented {
        display: inline-block;
        background: #009688;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .notuse {
        display: inline-block;
        background: #777777;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .fix {
        background: url(../../../../assets/images/public/fix.png);
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .ownCost {
        background: url(../../../../assets/images/public/ownCost.png);
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .residentPerson {
        background: url(../../../../assets/images/public/residentPerson.png);
        display: inline-block;
        width: 15px;
        height: 15px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .truePerson {
        background: url(../../../../assets/images/public/trueTiemPerson.png);
        display: inline-block;
        width: 17px;
        height: 16px;
        vertical-align: middle;
        margin-left: 10px;
      }
      span {
        margin-top: 2px;
        display: inline-block;
        margin: 2px 10px;
      }
      .buildPersonCondition {
        background: #f2f2f2;
        width: 1010px;
        margin-top: 20px;
        height: 63px;
        margin-bottom: 15px;
        p {
          color: #666666;
          font-size: 14px;
          line-height: 24px;
          span {
            color: #ff0000;
            font-weight: 600;
            padding: 0;
            margin: 0;
          }
        }
        .fl_section {
          width: 420px;
          padding: 10px;
        }
        .fr_section {
          width: 480px;
          padding: 10px;
        }
      }
    }
  }
</style>
<style lang="less">
  .buildingList_show {
    .pointer {
      cursor: pointer;
    }
    .el-dialog {
      position: absolute;
      right: 0px;
      top: 50px;
      width: 470px;
      margin-right: 50px;
    }
    .el-table td,
    .el-table th {
      padding: 0;
    }
    .fixed_condition {
      display: inline-block;
      width: 17px;
      height: 17px;
      margin-left: 7px;
    }
    .onRepair {
      background: url(../../../../assets/images/public/fixed.png);
      background-position: 17px 17px;
      background-size: 17px 17px;
    }
    .outRepair {
      background: url(../../../../assets/images/public/repairOut.png);
      background-position: 17px 17px;
      background-size: 17px 17px;
    }
    .own_condition {
      display: inline-block;
      width: 17px;
      height: 17px;
      margin-left: 5px;
    }
    .onArrears {
      background: url(../../../../assets/images/public/feelcon.png);
      background-position: 17px 17px;
      background-size: 17px 17px;
    }
    .outArrears {
      background: url(../../../../assets/images/public/feeOut.png);
      background-position: 17px 17px;
      background-size: 17px 17px;
    }
    .person_condition {
      display: inline-block;
      background: url(../../../../assets/images/public/person1.png);
      vertical-align: middle;
      width: 12px;
      height: 12px;
      /*margin-top: 12px;*/
      background-position: 12px 12px;
      background-size: 12px 12px;
      margin-left: 8px;
    }
    .personrel_conditon {
      display: inline-block;
      background: url(../../../../assets/images/public/person2.png);
      width: 14px;
      height: 13px;
      /*margin-top: 12px;*/
      background-position: 14px 13px;
      background-size: 14px 13px;
      margin-left: 4px;
      vertical-align: middle;
    }
    .companyName {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      line-height: 30px;
      margin-left: 5px;
    }

    .persons_con {
      display: inline-block;
      margin-right: 4px;
    }
    /*.persons_con {
      margin-top: 8px;
    }*/
    .room_pic img.fl {
      max-width: 450px;
    }
  }
</style>

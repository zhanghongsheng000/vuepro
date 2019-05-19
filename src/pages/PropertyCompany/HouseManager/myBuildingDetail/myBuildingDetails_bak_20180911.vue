<template>
  <div class="buildingList_show">
    <!--名称：{{building.buildingName}}
    ID：{{building.buildingId}}-->
    <div class="floor_details clearfix" v-for="floor,index in buildingDataArray" :key="index">
      <div class="floor_num fl">
        <p>{{floor.floorNum}}层</p>
        <p class="floor_area">{{floor.totalArea}}㎡</p>
      </div>
      <div class="room_details fl" ref="nana">
        <div class="room_num fl"
             v-for="room in floor.roomList"
             v-bind:style="{ backgroundColor:roomColor(room.companyId),width:roomWidth(room.areaSize,floor.totalArea)}"
             @click="toDetails(room)">
          <div class="clearfix">
            <span class="fl roomnum">{{room.roomName}}</span>
            <span class="fr roomarea">{{room.areaSize}}㎡</span>
          </div>
          <p>{{room.companyName}}</p>
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
              <p class="company_name fl">{{companyInfo.companyName}}</p>
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
              <p class="fr states">未使用</p>
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
          <p class="state fr">空租</p>
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
        buildingName:this.$route.query.buildingName,
        buildingId: this.$route.params.buildingId,
        //房间的最小宽度，如果任意一个房间的宽度小于这个值，就需要对当前楼层的剖面图进行分层
        minWidth: 100,
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
        roomInfo:{},
        dialogTitle:'公司信息',
        //是否显示公司详情
        isCompanyInfo:true,
        //
        tableData:[]
      }
    },
    // components: {buildingGroupDetals},
    methods: {
      //如果返回的数据中的公司ID为null，则说明为空租房间。则颜色为灰色，否则为蓝色
      roomColor(companyId) {
        let re = '#85b6fc'
        if (companyId == null) {
          re = '#bfbfbf';
        }
        return re;
      },
      //判断是否有通行客人
      isPasser(companyInfo){
        let re=true;
        if(companyInfo.employeeNum){
          re = false;
        }
        return re;
      },
      //判断是否有代发工资
      isSalary(companyInfo){
        let re=true;
        if(companyInfo.total){
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
      //房间宽度
      roomWidth(roomArea, floorArea) {
        return Math.floor((parseInt(roomArea) / parseInt(floorArea)) * 890 - 2) + 'px'
      },
      //获取房间信息
      getFloorList() {
        this.$httpPasser.get(
          'building/getTenantCompanyByCondition',
          {params: {buildingId: this.buildingId}},
        ).then(res => {
          if (res.data.resultCode == '200') {
            if (res.data.result) {
              this.$message.success(res.data.resultCodeDesc)
              this.buildingDataArray = res.data.result;
              for (let o in this.buildingDataArray) {
                /*if (this.buildingDataArray[o].totalArea == 0) {
                  this.buildingDataArray[o].totalArea = 1
                }*/
                for (let p in this.buildingDataArray[o].roomList) {
                  if (this.buildingDataArray[o].roomList[p].areaSize == 0) {
                    this.buildingDataArray[o].roomList[p].areaSize = 1
                    this.buildingDataArray[o].totalArea++;
                  }
                }
              }
            }
          }
          else if (res.data.resultCode == '204') {
            this.$message.success(res.data.resultCodeDesc)
            this.buildingDataArray = [];
          }
        })
      },
      getCompanyDetails(){
        this.$httpPasser.get(
          'company/getTenantCompanyDetailByCompanyId',
          {params:{companyId:this.companyIdDetails}},
        ).then(
          res=>{
            //清空公司信息
            this.companyInfo = {};
            for(let o in res.data.result){
              this.companyInfo[o] = res.data.result[o];
            }
          }
        )
      },
      //获取图片地址前缀
      getImgUrl(callBack){
        getUrl().then(res => {
          this.gImgUrl=res.gImgUrl
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
        this.getImgUrl(()=>{
          if(room.companyId!=null){
            //设置公司信息
            //查询公司的参数
            this.companyIdDetails = room.companyId;
            this.companyInfo.companyName = room.companyName;
            this.roomInfo = room;
            this.getCompanyDetails()
            //弹出对话框
            this.dialogCompanDetails = true;
            //转换图片地址
            if(this.roomInfo.buildingRoomLayoutPic==null||this.roomInfo.buildingRoomLayoutPic==''){
              this.roomInfo.imgPath=''
            }
            else{
              this.roomInfo.imgPath = this.gImgUrl + this.roomInfo.buildingRoomLayoutPic;
            }
            //修改弹出框名称
            this.dialogTitle = '公司详情'
            //设置显示公司详情
            this.isCompanyInfo = true;
          }
          else{
            //转换图片地址
            this.roomInfo = room;
            //转换图片地址
            if(this.roomInfo.buildingRoomLayoutPic==null||this.roomInfo.buildingRoomLayoutPic==''){
              this.roomInfo.imgPath=''
            }
            else{
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
      //进入租客公司详情页
      goToRenterCompanyInfo(){
        this.dialogCompanDetails = false;
        this.$router.push({path:'../renterCompanyInfo',query:{companyId:this.companyInfo.shopId}})
      }
    },
    watch: {
      '$route'(to, from) {
        this.buildingId = this.$route.params.buildingId;
        this.getFloorList();
      }
    },
    created() {
      this.getFloorList();
    }
  }
</script>

<style lang="less" scoped>
  .buildingList_show {
    width: 1140px;
    position: relative;
    .floor_details {
      margin-bottom: 10px;
      .floor_num {
        width: 110px;
        height: 60px;
        border: 1px solid #DEDEDE;
        p {
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
          cursor:pointer;
          /*bfbfbf*/
          .roomnum {
            display: inline-block;
            margin: 10px 0 0 10px;
            font-size: 14px;
          }
          .roomarea {
            display: inline-block;
            margin: 10px 10px 0 0;
            font-size: 14px;
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
          .room_area{
            line-height: 27px;
            font-size: 14px;
            padding: 0 3px;
          }
          p {
            line-height: 27px;
          }
        }
      }
      .center{
        text-align: center;
        background-repeat: no-repeat;
        margin-top: 10px;
        button{
          background: url(../../../../assets/images/index/centure_bg.png);
          background-size:116px 49px ;
          width: 116px;
          height: 49px;
          background-position: 115px 53px;
          cursor: pointer;
          color: #FFF;
        }
      }
    }
  }
</style>
<style lang="less">
  .buildingList_show {
    .el-dialog {
      position: absolute;
      right: 0px;
      top: 50px;
      width: 470px;
      margin-right:50px;
    }
    .el-table td,
    .el-table th {
      padding: 0;
    }
  }

</style>

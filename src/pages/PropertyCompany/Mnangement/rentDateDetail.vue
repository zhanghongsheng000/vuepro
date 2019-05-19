<template>
  <div id="rentDateDetail">
    <div class="headNav">
      <ul>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/onePointBusiness'}" disabled>一键招商</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/rentDateRemind'}" disabled>租期提醒</router-link>
        <router-link tag="li" :to="{path:'/PropertyCompany/Mnangement/remindDateConfig'}" disabled>提醒日期配置</router-link>
      </ul>
    </div>
    <div class="top-cont clearfix">
      <div class="build-name fl">{{buildingMessage.buildingName}}</div>
      <div class="state-item clearfix">
        <div class="sta-item fl">
          <strong class="color1"></strong>
          <span>空租</span>
        </div>
        <div class="sta-item fl">
          <strong class="color7"></strong>
          <span>招商中</span>
        </div>
        <div class="sta-item fl">
          <strong class="color2"></strong>
          <span>在租</span>
        </div>
        <div class="sta-item fl">
          <strong class="color3"></strong>
          <span>未采集</span>
        </div>
        <div class="sta-item fl">
          <strong class="color4"></strong>
          <span>快到期(1-30天)</span>
        </div>
        <div class="sta-item fl">
          <strong class="color5"></strong>
          <span>逾期</span>
        </div>
        <div class="sta-item fl">
          <strong class="color6"></strong>
          <span>在租(缺租约)</span>
        </div>
      </div>
    </div>
    <div class="main-cont">
      <div class="floor_details clearfix" v-for="floor,index in buildingDataArray" :key="index">
        <!-- v-bind:style="{height:floorHeight[floor.floorName],lineHeight:floorHeight[floor.floorName]}"-->
        <div
          class="floor_num fl">
          <p>{{floor.floorNum}}层</p>
          <!-- <p class="floor_area">{{floor.floorArea}}</p>-->
        </div>
        <div class="room_details fl" :floorName="floor.floorName" :ref="'roomHeight_'+floor.floorName">
          <div v-for="room in floor.roomList">
            <div class="room_num roomBorder roomContent"  v-if="room.statusDesc!==null" :roomStatus="room.status"
                 v-bind:style="{ backgroundColor:roomColor(room.status),width:roomWidth(room.roomArea,floor.floorArea)}">
              <div class="topRoom">
                <div class="roomName">{{room.roomName}}</div>
              </div>
              <div class="bottomRoom">
                <div class="roomArea">{{room.roomArea}}㎡</div>
                <el-tooltip content="一键招商" placement="top">
                  <div class="icon1" v-if="room.status=='70'||room.status=='72'" @click="goToOneKey(floor.floorId,room.roomId)"></div>
                </el-tooltip>
                <el-tooltip content="租期管理" placement="top" v-if="room.status!='72'">
                  <div class="icon2" @click="goToRentManager()"></div>
                </el-tooltip>
              </div>

            </div>
            <div class="room_num roomBorder roomContent"  v-if="room.statusDesc===null&&room.shopList.length==0" :roomStatus="room.status"
                 v-bind:style="{ backgroundColor:roomColor(room.status),width:roomWidth(room.roomArea,floor.floorArea)}">
              <div class="topRoom">
                <div class="roomName">{{room.roomName}}</div>
              </div>
              <div class="bottomRoom">
                <div class="roomArea">{{room.roomArea}}㎡</div>
                <!--<el-tooltip content="一键招商" placement="top">
                  <div class="icon1" v-if="room.status=='70'" @click="goToOneKey(floor.floorId,room.roomId)"></div>
                </el-tooltip>-->
                <el-tooltip content="租期管理" placement="top">
                  <div class="icon2" @click="goToRentManager(room.roomId)"></div>
                </el-tooltip>
              </div>
            </div>
            <div class="roomBorder" v-if="room.statusDesc===null&&room.shopList.length>0" v-bind:style="{maxWidth:roomWidth(room.roomArea,floor.floorArea,room.shopList)}" :roomStatus="room.status">
              <div class="room_num noborder roomContent" v-for="company in room.shopList" v-bind:style="{ backgroundColor:roomColor(company.status),width:roomWidth(room.roomArea,floor.floorArea)}">
                <div class="topRoom">
                  <div class="roomName">{{room.roomName}}</div>
                  <div class="companyName">{{company.shopName}}</div>
                </div>
                <div class="bottomRoom">
                  <div class="roomArea">{{room.roomArea}}㎡</div>
                 <!-- <el-tooltip content="一键招商" placement="top">
                    <div class="icon1" v-if="room.status=='70'" @click="goToOneKey(floor.floorId,room.roomId)"></div>
                  </el-tooltip>-->
                  <el-tooltip content="租期管理" placement="top">
                    <div class="icon2" @click="goToRentManager(room.roomId,company.shopId,company.shopName)"></div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "index",
    data() {
      return {
        buildingMessage:{
          buildingGroupId:this.$route.query.buildingGroupId,
          buildingId:this.$route.query.buildingId,
          buildingName:this.$route.query.buildingName,
          buildingFloorId:'',
          buildingRoomId:'',
        },
        activeName: 'first',
        flag: 1,
        pathArray: {
          1: 'onePointBusiness',
          2: 'rentDateRemind',
        },
        params:{
          buildingId:this.$route.query.buildingId,
          shopId:this.$local.sefetch('info').companyId
        },
        minWidth:145,
        maxWidth:920,
        buildingDataArray:[]
        /*
        * 71在租
        * 7101快到期 7102逾期 7103在租信息不完整
        * 7001招商中
        * 72未采集
        * 70空租
        * */
      }
    },
    methods: {
      //获取租期仪表盘
      leaseRemind(){
        this.$httpPasser.post(
          'attractInvestment/leaseRemind',
          this.params
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.buildingDataArray = res.data.result;
            //处理返回的数据
            for(let o in this.buildingDataArray){
              this.buildingDataArray[o].floorArea = 0;
              for(let p in this.buildingDataArray[o].roomList){
                this.buildingDataArray[o].floorArea+=Number(this.buildingDataArray[o].roomList[p].roomArea)
              }
              this.buildingDataArray[o].floorArea;
            }
          }else{
            this.$message.error(res.data.resultCodeDesc);
            this.buildingDataArray = [];
          }
        }).catch(()=>{

        })
      },
      tab(index) {
        this.flag = index;
        this.$router.push({
          path: this.pathArray[this.flag]
        });
      },
      toEditMessage() {
        this.$router.push({
          path: 'editMessage/editBuildingGroup'
        })
      },
      //前往一键招商页面
      goToOneKey(floorId,roomId){
        this.buildingMessage.buildingFloorId = floorId
        this.buildingMessage.buildingRoomId = roomId
        this.$local.sesave('buildingMessage', this.buildingMessage)
        this.$router.push({
          path:'editMessage/editBuildingGroup'
        })

      },
      goToRentManager(roomId,shopId,shopName){
        if(shopId){
          this.$router.push({
            path:'./rentManager',
            query:{
              buildingRoomId:roomId,
              shopId:shopId,
              shopName:shopName,
              buildingId:this.buildingMessage.buildingId
            }
          })
        }
        else{
          this.$router.push({
            path:'./rentManager',
            query:{
              buildingRoomId:roomId
            }
          })
        }

      },

      //如果返回的数据中的公司ID为null，则说明为空租房间。则颜色为灰色，否则为蓝色
      roomColor(roomStatus) {
        let re = '#f66c6c'
        switch (roomStatus.toString()) {
          case "71":
            re = '#009788';
            break;
          case "7103":
            re = '#017898';
            break;//已租没有租约
          case "7101":
            re = '#f66c6c';
            break;//已租快到期
          case "7102":
            re = '#c0a30a';
            break;//已租逾期
          case "70":
            re = '#bfbfbf';
            break;//空租
          case "7001":
            re = "#97001b";
            break;//招商中
          case "72":
            re = '#777777';
            break;//未采集
        }
        return re;
      },
      //房间宽度
      roomWidth(roomArea, floorArea,shopList) {
        //console.log('aaaa',floorArea.replace('㎡', ''))
        if(floorArea==0){
          floorArea = 1;
        }
        let re = Math.floor((Number(roomArea) / Number(floorArea) * 890 - 2))
        if (re < this.minWidth) {
          re = this.minWidth
        }
        else if (re > this.maxWidth) {
          re = this.maxWidth;
        }
        if(shopList&&shopList.length>0){
          re = (re+2)*(shopList.length)
        }
        return re + 'px'

      },
    },
    created(){
      this.leaseRemind();
    }
  }
</script>

<style lang="less" scoped="scoped">
  #rentDateDetail {
    .headNav {
      width: 100%;
      height: 37px;
      line-height: 35px;
      border-bottom: solid #e5e5e5 1px;
      margin-bottom: 30px;
      ul {
        li {
          float: left;
          width: 120px;
          text-align: center;
          font-size: 15px;
          cursor: pointer;
        }
        li.active {
          border-bottom: solid #3387f9 2px;
        }
      }
    }
    .floor_details {
      margin-bottom: 5px;
      .floor_num {
        width: 90px;
        height: 60px;
        line-height:45px;
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
        width: 920px;
        .roomBorder{
          border:dashed #1168e1 1px!important;
          overflow:hidden;
          float:left;
          margin-right:1px;
        }
        .room_num {
          color: #FFF;
          width: 20%;
          margin:1px;
          height: 60px;
          background: #85b6fc;
          cursor: pointer;
          /*bfbfbf*/
          .clearfix {
            padding-top: 3px;
          }
        }
        .roomContent{
          div{
            font-size:13px;
            height:30px;
            line-height:30px;
            overflow: hidden;
            white-space:nowrap;
          }
          .topRoom{
            .roomName{
              width:48px;
              text-indent:8px;
              float:left;
            }
            .companyName{
              min-width:65px;
              max-width: 80px;
              text-indent:8px;
              float:left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .bottomRoom{
            .roomArea{
              width:48px;
              float:left;
              text-align:left;
              text-indent:8px;
            }
            .icon1{
              height:30px;
              width:22px;
              float:left;
              margin-left:8px;
              background-image:url("../../../assets/images/public/oneKey.png");
              background-repeat: no-repeat;
              background-position: left 2px;
            }
            .icon2{
              height:30px;
              width:22px;
              float:left;
              margin-left:8px;
              background-image:url("../../../assets/images/public/repair.png");
              background-repeat: no-repeat;
              background-position: left 2px;
            }
          }
        }
        .noborder{
          border:none!important;
          margin-right:1px;
        }
      }
    }
    .color1 {
      background-color: #bfbfbf;
    }
    .color2 {
      background-color: #009788;
    }
    .color3 {
      background-color: #777777;
    }
    .color4 {
      background-color: #f66c6c;
    }
    .color5{
      background-color: #c0a30a;
    }
    .color6{
      background-color: #017898;
    }
    .color7{
      background-color: #97001b;
    }
    .top-cont {
      margin-bottom: 20px;
      .build-name {
        font-size: 20px;
        margin-right: 60px;
        font-weight: bold;
      }
      .sta-item {
        margin-right: 22px;
        font-weight: bold;
        strong {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    .main-cont {
      .cont-item {
        margin-bottom: 10px;
      }
      .item-left {
        width: 90px;
        height: 22px;
        padding: 10px;
        border: solid 1px #dcdcdc;
        font-size: 14px;
      }
      .item-right {
        margin-left: 122px;
      }
      .items {
        height: 43px;
        margin-right: 2px;
        margin-bottom: 2px;
        color: #fff;
        line-height: 20px;
        cursor: pointer;
        span {
          margin: 0 5px;
          line-height: 42px;
          font-size: 14px;
        }
      }
    }
    /* .fr {
       width: 750px;
       .pt20 {
         padding-top: 20px;
       }
       .lh35 {
         line-height: 35px;
       }
       .search_con {
         display: inline-block;
         float: right;
         input {
           border: 1px solid #DEDEDE;
           height: 32px;
           width: 150px;
           padding-left: 10px;
         }
       }
       .floor_con {
         margin-top: 10px;
         border: 1px solid #e4eaec;
         padding-top: 10px;
         .floor_part {
           width: 100%;
           border-top: 1px solid #e4eaec;
           border-bottom: 1px solid #e4eaec;
           .floornum_left {
             text-align: center;
             width: 155px;
             padding-top: 7%;
             span {
               font-size: 14px;
               display: inline-block;
             }
           }
           .floornum_right {
             width: 592px;
             padding: 5px 0;
             span {
               cursor: pointer;
               display: inline-block;
               margin: 5px 5px;
               color: #fff;
               background: #009688;
               text-align: center;
               padding: 16px 33px;
             }
             span.rentCondition[flag='是'] {
               background: #fcb160;
               !*box-shadow: 1px 1px 8px 3px #5f827e;*!
             }
           }
         }
         .option {
           border: 1px solid #1168E1;
           margin-left: 80px;
           margin-top: -50px;
           background: #fff;
           padding: 10px 12px;
           position: absolute;
           p {
             cursor: pointer;
             font-size: 12px;
             line-height: 20px;
             color: #526069;
           }
           p:hover {
             color: #3487fa;
           }
         }
         .option:before {
           content: '';
           position: absolute;
           top: 0.9rem;
           left: -0.39rem;
           width: 0;
           height: 0;
           border-top: 0.4rem solid transparent;
           border-bottom: 0.4rem solid transparent;
           border-right: 0.4rem solid #ececec;
         }
       }
     }*/
  }
</style>
<style lang="less">
  #rentDateDetail {
    .el-table .cell {
      text-align: center!important;
    }
    .el-table th {
      text-align: center!important;
    }
    .el-table th{
      padding: 12px 0;
    }
  }
</style>

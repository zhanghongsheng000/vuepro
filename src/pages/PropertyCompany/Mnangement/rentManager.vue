<template>
  <div id="rentManager">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text">租期管理</span>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">公司名称：</div>
          <div class="item-text fl">
            {{rentData.shopName}}
          </div>
          <!--<el-button type="primary" @click="handleSearchRenter" style="margin-left: 10px">更换公司</el-button>-->
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">是否合租：</div>
          <div class="item-text fl">
            <el-radio-group v-model="isJoinRent">
              <el-radio :label=0 value="0">是</el-radio>
              <el-radio :label=1 value="1">否</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">房间信息：</div>
          <div class="item-ipt fl" style="width: 220px;">
            <el-input v-model.trim="rentData.resultDesc" placeholder="请选择公司经营地址"
                      @click="showChosingDialog()" @focus="showChosingDialog()" readonly></el-input>
          </div>
        </div>

        <!--<div class="items clearfix">
          <div class="item-text beforesiteml fl" >业务联系人</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="materielName" placeholder="业务联系人" ></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl" >业务联系人电话</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="materielName" placeholder="业务联系人电话" ></el-input>
          </div>
        </div>-->
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">签约日期：</div>
          <div class="item-ipt fl">
            <el-date-picker v-model="rentData.dateOfContract" type="date" value-format='yyyy-MM-dd'
                            placeholder="请选择签约时间">
            </el-date-picker>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">生效日期：</div>
          <div class="item-ipt fl">
            <el-date-picker v-model="rentData.effectiveDate" type="date" value-format='yyyy-MM-dd'
                            placeholder="请选择生效时间">
            </el-date-picker>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">到期日期：</div>
          <div class="item-ipt fl">
            <el-date-picker v-model="rentData.dueDate" type="date" value-format='yyyy-MM-dd' placeholder="请选择到期时间">
            </el-date-picker>
          </div>
        </div>
        <div class="items clearfix" style="text-align:center">
          <el-button type="primary" @click="goBack">返回</el-button>
          <el-button type="primary" @click="saveLease">保存</el-button>
        </div>
        <!-- <div class="dispatch" style="padding-bottom: 10px">
           <el-dialog title="公司信息" :visible.sync="dispatchDialog" width="640px" :before-close="handleClose">
               <div class="items clearfix">
                 <div class="item-text fl" >公司名称：</div>
                 <div class="item-ipt fl">
                   <el-input v-model.trim="companyMessage.companyName" placeholder="请输入公司名称"></el-input>
                 </div>
                 <div class="item-text fl" style="width: 42px;margin-left: 12px">
                   <el-button type="primary" @click="getCompanyList">搜索</el-button>
                 </div>
               </div>
               <el-table :data="companyMessage.companyList" style="width: 100%" @selection-change="handleSelectionChangecompanyMessage">
                 <el-table-column type="selection" width="55">
                 </el-table-column>
                 <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
                 <el-table-column prop="departmentName" label="公司名称"></el-table-column>
                 <el-table-column prop="name" label="联系人姓名"></el-table-column>
                 <el-table-column prop="name" label="联系人电话"></el-table-column>
               </el-table>
               <div class="clear20"></div>
               <div class="clearfix">
                 <div class="fl" >
                   <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="ConfigureParams.pageTotal">
                   </el-pagination>
                 </div>
                 <div class="fl pagestyle" style="line-height: 30px">
                   <span>共{{this.ConfigureParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.ConfigureParams.totalRecord}}条</span>
                 </div>
                 <div slot="footer" class="dialog-footer fr" style="padding-top: 40px">
                   <el-button @click="cancleDispatch">取 消</el-button>
                   <el-button type="primary" @click="dispatchSure">保 存</el-button>
                 </div>
               </div>
           </el-dialog>
         </div>-->
      </div>
    </div>
    <el-dialog
      title="选择房间"
      :visible.sync="dialogVisibleRoom"
      :modal-append-to-body='false'
      width="53%">
      <choseRoomFromMuiltyFloorByBuilding @roomParams="roomParams" isCanAddRoom='false'
                                          :interfaceString="interfaceString"
                                          :componentStorage="componentStorage"
                                          v-if="hackReset"></choseRoomFromMuiltyFloorByBuilding>
      <!-- <el-button type="success" @click="handleDialogSubmit()">确定</el-button>-->
    </el-dialog>
  </div>
</template>
<script>
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

  export default {
    name: "index",
    data() {
      return {
        //楼盘弹出对话框标记
        dialogVisibleRoom: false,
        //强制刷新选择房间组件
        hackReset: false,
        /*dispatchDialog: false,*/
        companyMessage: {
          companyName: '',
          companyList: [],
        },
       /* ConfigureParams: {
          pageIndex: 1, //当前页
          pageSize: 30, //每页条数
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },*/
        //表格数据
        tableData: [
          //demo 不要删除，是返回数据的DEMO
          //{buildingRoomName: "A座1层101", telphone: "15694861861", companyName: "天际", customerName: "张若曦"}
        ],
        //租约数据
        rentData: {
          "buildingName": '',//"国际企业中心A座",
          "dueDate": '',//"2019-03-31 16:38:02",
          "dateOfContract": '',//null,
          "shopName": '',//"河南企业管理",
          "shopId": '',//14114,
          "effectiveDate": '',//"2019-03-01 16:37:53",
          "roomList":[], /*[
            {
              "buildingRoomId": 7814,
              "roomName": "401"
            }
          ]*/
          resultDesc: '',// '国际企业中心A座401'
        },
        isJoinRent: 2,
        //获取房间的接口地址
        //如果不合租，则attractInvestment/getRoomListByShopIdAndRoomId
        //如果合租，则attractInvestment/getRoomListByShopIdAndRoomIdExceptNowLease
        //默认为不合租
        interfaceString:'attractInvestment/getRoomListByShopIdAndRoomId',
        //要传递给选房间组件的信息
        componentStorage:{
          shopId:this.$route.query.shopId?this.$route.query.shopId:'',
          buildingRoomId:this.$route.query.buildingRoomId?this.$route.query.buildingRoomId:'',
          buildingId:this.$route.query.buildingId?this.$route.query.buildingId:'',
        }
      }
    },
    watch:{
      //根据是否合租，切换接口地址
      isJoinRent:function(){
        if(this.isJoinRent==0){
          this.interfaceString='attractInvestment/getRoomListByShopIdAndRoomIdExceptNowLease'
        }else if(this.isJoinRent==1){
          this.interfaceString = 'attractInvestment/getRoomListByShopIdAndRoomId'
        }
      }
    },
    components: {
      choseRoomFromMuiltyFloorByBuilding: choseRoomFromMuiltyFloorByBuilding,
    },
    methods: {
      indexMethod(index) { //编号
        return (this.ConfigureInfo.pageIndex - 1) * 30 + 1 + index;
      },
      goBack(){
        this.$router.go(-1)
      },
      //显示选择房间对话框
      showChosingDialog() {
        if(this.isJoinRent==2){
          this.$message.warning('请选择是否合租')
        }
        else{
          //强制刷新房间组件
          this.refleshRoomComponent()
          this.dialogVisibleRoom = true;
        }

      },
      //强制刷新组件
      refleshRoomComponent() {//强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      //编辑房间租客时，返回的数据
      roomParams(roomParams) {
        if (roomParams.roomResult && roomParams.roomResult.length > 0) {
          this.rentData.resultDesc = roomParams.address;
          this.rentData.newRoomIdList = [];
          for(let i=0;i<roomParams.roomResult.length;i++){
            this.rentData.newRoomIdList.push(roomParams.roomResult[i].buildingRoomId)
          }
          //this.buildingId = roomParams.buildingId;
          this.dialogVisibleRoom = false;
        }
        else {
          this.rentData.resultDesc = '';
          this.rentData.newRoomIdList = [];
          this.$message.error('请选择至少一个房间')
        }
      },
      //获取租约
      getShopLeaseInfoByShopIdAndRoomId() {
        this.$httpPasser.get(
          'attractInvestment/getShopLeaseInfoByShopIdAndRoomId',
          {
            params: {
              buildingRoomId: this.$route.query.buildingRoomId,
              shopId:this.$route.query.shopId
            }
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.rentData = res.data.result;
            this.rentData.resultDesc = this.rentData.buildingName;
            if(this.rentData.roomList.length&&this.rentData.roomList.length>0){
              for(let o in this.rentData.roomList){
                if(o==this.rentData.roomList.length-1){
                  this.rentData.resultDesc+=this.rentData.roomList[o].roomName;
                }else{
                  this.rentData.resultDesc+=this.rentData.roomList[o].roomName+',';
                }

              }
            }
          }
          else if(res.data.resultCode==204){
            this.rentData.shopName = this.$route.query.shopName
            this.rentData.shopId = this.$route.query.shopId
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      },
      //保存租约
      saveLease(){
        this.rentData.oldRoomId = this.$route.query.buildingRoomId;
        this.rentData.contractDate = this.rentData.dateOfContract;
        this.$httpPasser.post(
          'attractInvestment/saveLease',
          this.rentData
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.$message.success(res.data.resultCodeDesc);
            this.goBack();
          }
          else{
            this.$message.error(res.data.resultCodeDesc);
          }

        }).catch((err)=>{
          this.$message.error(err)
        })
      }
    },
    created(){
      if(this.$route.query.shopId){
        this.getShopLeaseInfoByShopIdAndRoomId();
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  #rentManager {
    padding-top: 30px;
    .headNav {
      width: 100%;
      height: 35px;
      padding-top: 20px;
      line-height: 35px;
      border-bottom: solid #e5e5e5 1px;
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
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        line-height: 40px;
        min-width: 120px;
        font-size: 14px;
        text-align: right;
        margin-right: 20px;
      }
    }
    .font14 {
      font-size: 14px;
      margin-bottom: 20px;
      color: red;
    }
    .pl50 {
      padding-left: 150px;
    }
    .layers {
      padding-top: 30px;
      .plr20 {
        padding: 0 20px;
        margin-right: 10px;
      }
      .floorbtn {
        cursor: pointer;
        border: solid 1px #dcdfe6;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #606266;
        padding: 12px 20px;
        font-size: 14px;
        line-height: 1;
        border-radius: 4px;
        display: inline-block;
      }
    }
    .sitem {
      .inputtype {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        width: 46%;
      }
    }

  }
</style>
<style lang="less">
  #houseManager {
    .el-table .cell {
      text-align: center !important;
    }
    .el-table th {
      text-align: center !important;
    }
  }
</style>

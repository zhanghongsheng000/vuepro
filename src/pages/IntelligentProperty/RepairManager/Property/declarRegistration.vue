<template>
  <div id="declarRegistration">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">报单登记</span>
      </div>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">报修类型：</div>
          <div class="item-ipt fl">
            <el-select v-model="repairData.repairType" placeholder="请选择">
              <el-option
                v-for="item in repairType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">所在写字楼：</div>
          <div class="item-ipt fl">
            <el-select v-model="repairData.buildingId" placeholder="请选择写字楼" @change="choseFloor">
              <el-option
                v-for="item in buildingList"
                :key="item.buildingId"
                :label="item.buildingName"
                :value="item.buildingId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="items clearfix" v-if="repairData.repairType==2">
          <div class="item-text beforesiteml fl">所在房间：</div>
          <div class="item-ipt fl">
            <el-select v-model="repairData.buildingFloorId" placeholder="请选择楼层" @change="choseRoom">
              <el-option
                v-for="item in floorList"
                :key="item.buildingFloorId"
                :label="item.buildingFloorName"
                :value="item.buildingFloorId">
              </el-option>
            </el-select>
            <el-select v-model="repairData.roomId" placeholder="请选择房间" @change="choseCompany">
              <el-option
                v-for="item in roomList"
                :key="item.buildingRoomId"
                :label="item.buildingRoomName"
                :value="item.buildingRoomId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="items clearfix" v-if="repairData.repairType==2">
          <div class="item-text beforesiteml fl">所在公司：</div>
          <div class="item-ipt fl">
            <el-select v-model="repairData.repairShopId" placeholder="请选择公司" >
              <el-option
                v-for="item in companyList"
                :key="item.shopId"
                :label="item.shopName"
                :value="item.shopId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-if="repairData.repairType==2">
          <div class="items clearfix">
            <div class="item-text fl">服务项：</div>
            <div class="item-ipt fl">
              <el-select v-model="repairData.serviceItemId" placeholder="请选择服务项" @change="choseServiceItem">
                <el-option
                  v-for="item in serviceItems"
                  :key="item.serviceItemId"
                  :label="item.serviceItemName"
                  :value="item.serviceItemId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="items clearfix" v-if="repairData.serviceItemId!==''&&repairData.serviceItemId!==undefined">
            <div class="item-text fl"></div>
            <div class="item-ipt fl">
              <el-table
                :data="serviceChoseTable"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="编号"
                  width="50">
                </el-table-column>
                <el-table-column
                  label="图片"
                  width="100">
                  <template slot-scope="scope">
                    <img v-if="typeof scope.row.serviceItemImgPath=='string'&& scope.row.serviceItemImgPath!==''"  :src="gImgUrl+scope.row.serviceItemImgPath" :alt="scope.row.serviceItemName" class="tableImg">
                    <img v-else :src="noImg" class="tableImg">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="serviceItemName"
                  label="名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="serviceItemPrice"
                  width="50"
                  label="单价">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="使用量">
                  <template slot-scope="scope">
                    <numberSet :componentStorage="scope.row" :origin="scope.row.number" @change="serviceNumChange"></numberSet>
                  </template>
                </el-table-column>
                <!--<el-table-column
                  prop="address"
                  label="小计">
                  <template slot-scope="row">
                    {{row.serviceItemPrice*1}}
                  </template>
                </el-table-column>-->
              </el-table>
            </div>
          </div>
          <div class="items clearfix" v-if="repairData.serviceItemId!==''&&repairData.serviceItemId!==undefined">
            <div class="item-text fl">物料：</div>
            <div class="item-ipt fl">
              <el-button type="primary" @click="showAddServices">选择</el-button>
            </div>
          </div>
          <div class="items clearfix" v-if="repairData.serviceItemId!==''&&repairData.serviceItemId!==undefined">
            <div class="item-text fl"></div>
            <div class="item-ipt fl">
              <el-table
                :data="materielChoseTable"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="编号"
                  width="50">
                </el-table-column>
                <el-table-column
                  label="图片"
                  width="100">
                  <template slot-scope="scope">
                    <img v-if="typeof scope.row.materielImgPath=='string'&&scope.row.materielImgPath!==''" :alt="scope.row.materielName" :src="gImgUrl+scope.row.materielImgPath" class="tableImg">
                    <img v-else :src="noImg" class="tableImg">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="materielName"
                  label="名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="materielPrice"
                  width="50"
                  label="单价">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="使用量">
                 <!-- <template slot-scope="scope">{{ scope.row.materielPrice }}</template>-->
                  <template slot-scope="scope">
                    <numberSet :origin="scope.row.number" :componentStorage="scope.row" @change="meterailNumChange" v-if="meterailFlag"></numberSet>
                  </template>
                </el-table-column>
               <!-- <el-table-column
                  prop="address"
                  label="小计">
                </el-table-column>-->
              </el-table>
            </div>
          </div>
        </div>

        <div class="items clearfix">
          <div class="item-text beforesiteml fl">故障描述：</div>
          <div class="item-ipt fl" style="width: 215px;">
            <el-input type="textarea" :rows="3" v-model.trim="repairData.faultDescription" placeholder="故障描述" clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">故障图片：</div>
          <div class="item-ipt fl" id="addrent">
            <!--<el-upload
              ref="uploads1"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <el-upload
              ref="uploads1"
              :action="importFileUrl"
              :data="upLoadData"
              list-type="picture-card"
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">报修人：</div>
          <div class="item-ipt fl" style="width: 215px;">
            <el-input v-model.trim="repairData.linkMan" placeholder="报修人"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">报修电话：</div>
          <div class="item-ipt fl" style="width: 215px;">
            <el-input v-model.trim="repairData.linkPhone" placeholder="报修电话"></el-input>
          </div>
        </div>
        <div class="items">
          <div class="item-text pl50">
            <el-button type="primary" @click="submitClick">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择物料分类" :visible.sync="servicesAddDialog" width="688px" @open="setDialogMeterielTable">
      <div class="materielListDiv" v-for="(category,index) in materielList" :key="index">
        <div class="category">{{category.materielName}}</div>
        <div class="materielList">
          <div class="materielUnit" v-for="(materiel,meterielIndex) in category.repairMaterielList" v-if="dialogMeterailFlag">
            <div class="materielImg borderRed" v-if="materiel.number>0" @mouseover="addActive($event)" @mouseout="removeActive($event)">
              <img v-if="typeof materiel.materielImgPath=='string' && materiel.materielImgPath!==''" :src="gImgUrl+materiel.materielImgPath">
              <img v-else :src="noImg">
              <img v-if="materiel.number>0" :src="deleteImg" alt="" class="deleteImg" @click="deleteMateriel(materiel)">
              <img v-if="materiel.number>0" :src="choseImg" alt="" class="choseImg">
            </div>
            <div class="materielImg" v-else>
              <img v-if="typeof materiel.materielImgPath=='string' && materiel.materielImgPath!==''" :src="gImgUrl+materiel.materielImgPath">
              <img v-else :src="noImg">
            </div>
            <div class="materielName fontRed" v-if="materiel.number>0">{{materiel.materielName}}</div>
            <div class="materielName" v-else>{{materiel.materielName}}</div>
            <div class="materielPrice fontRed" v-if="materiel.number>0">￥{{materiel.materielPrice}}元/{{materiel.materielUnit}}</div>
            <div class="materielPrice" v-else>￥{{materiel.materielPrice}}元/{{materiel.materielUnit}}</div>
            <div class="materielNumber"><numberSet :origin="materiel.number" :componentStorage="materiel" @change="meterailNumChange"></numberSet></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="servicesAddDialog=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import getUrl from '@/assets/js/global'
  export default {
    name: "declarRegistration",
    data() {
      return {
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        noImg:require("../../../../assets/images/public/no_img.png"),
        choseImg:require("../../../../assets/images/public/duigou.png"),
        deleteImg:require("../../../../assets/images/public/guanbi.png"),
        gImgUrl:'',//图片地址前缀
        //报修类型
        repairType: [
          {
            name: '公共设施报修',
            value: '1'
          },
          {
            name: '业主设施报修',
            value: '2'
          }
        ],
        //已选的报修类型，默认为2
        repairTypeForControl: '2',
        //写字楼列表
        buildingList: [],
        //楼层列表
        floorList: [],
        //房间列表
        roomList: [],
        //公司列表
        companyList:[],
        //服务项列表
        serviceItems: [],
        //已选服务项数量
        serviceChoseNum:0,
        //服务项已选列表
        serviceChoseTable: [],
        //物料字典列表
        materielList: [
        ],
        //物料已选列表
        materielChoseTable:[],
        //外部显示的物料数量标记，为了刷新物料显示数量
        meterailFlag:true,
        //dialog中的物料标记，为了刷新对话框中的显示数量
        dialogMeterailFlag:true,
        repairData: {
          repairShopId:'',//根据房间获取的公司id
          buildingId: '',//写字楼编号
          faultDescription: '',//故障描述
          shopId:this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          linkMan: '',//联系人姓名
          linkPhone: '',//联系人联系方式
          serviceItemId: '',//服务项编号
          customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',//用户编号
          repairType:'1',
          roomId: '',//房间编号
          roomName:'',
          materiels:'',
          faultImages:'',//故障图片
          buildingFloorId: '',//楼层ID
//          imgPaths: '',
          total: 0,//合计金额
          serviceItemNumber: '',//服务项数量
          materielList: '',//物料列表字符串（格式：物料编号#数量,物料编号#数量）
        },
        dialogVisibleAddress: false,
        servicesAddDialog: false,
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
        imageUrl: '',//服务项图片
        dialogVisible:false,
      }
    },
    created() {
      this.getServiceItemList();
      this.getBuildingListByCompanyId()
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    },
    computed: {},
    methods: {
      handleRemove(file, fileList) {
        let tempString = '';
        for(let i=0;i<fileList.length;i++){
          if(i==fileList.length-1){
            tempString+=fileList[i].response.result
          }
          else{
            tempString+=fileList[i].response.result+','
          }
        }
        this.repairData.faultImages = tempString;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          let tempString = '';
          for(let i=0;i<fileList.length;i++){
            if(i==fileList.length-1){
              tempString+=fileList[i].response.result
            }
            else{
              tempString+=fileList[i].response.result+','
            }
          }
          this.repairData.faultImages = tempString;
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
      beforeAvatarUpload(file) { //图片上传之前限制
        this.upLoadData.file = file
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if (!isLt10M) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return (isJPG || isPNG) && isLt10M;
      },
      showAddServices() {
        this.servicesAddDialog = true;
      },
      //显示楼层列表
      choseFloor() {
        this.getBuildingFloorListByBuildingId()
      },
      //显示房间列表
      choseRoom() {
        this.getRoomListByShopId();
      },
      //获取服务项
      getServiceItemList() {
        this.$httpPasser.get(
          'serviceitem/getServiceItemList',
          {params: {shopId: this.companyId}}
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.serviceItems = res.data.result;
            for(let o in this.serviceItems){
              this.serviceItems[o].number = 0;
            }
          }
          else {
            this.serviceItems = [];
            //this.$message.error(res.data.resultCodeDesc)
          }
        })
      },
      //选择服务项回调方法
      choseServiceItem(value){
        this.serviceChoseTable = []
        let chosedServiceItem = null
        for(let o in this.serviceItems){
          if(this.serviceItems[o].serviceItemId==value){
            chosedServiceItem = JSON.parse(JSON.stringify(this.serviceItems[o]))
            chosedServiceItem.number = 1;
            this.serviceChoseTable.push(chosedServiceItem)
          }
        }
        this.repairData.serviceItemId=value;
        this.repairData.serviceItemNumber=1;
        this.repairData.total = Number(chosedServiceItem.serviceItemPrice);
        this.getMaterielList()
      },
      //获取写字楼
      getBuildingListByCompanyId() {
        this.$httpPasser.post(
          'building/getBuildingListByCompanyId',
          {companyId: this.companyId}
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.buildingList = res.data.result;
          }
        }).catch((err) => {
          this.buildingList = [];
          //this.$message.error(err)
        })
      },
      //获取楼层
      getBuildingFloorListByBuildingId() {
        this.$httpPasser.get(
          'building/getBuildingFloorListByBuildingId',
          {
            params: {
              buildingId: this.repairData.buildingId,
            }
          }
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.floorList = res.data.result.buildingFloorList;
          }
        }).catch((err) => {
          this.floorList = [];
         // this.$message.error(err)
        })
      },
      //根据楼层ID获取房间
      getRoomListByShopId() {
        this.$httpPasser.get(
          'building/getBuildingRoomListByBuildingFloorId',
          {
            params: {
              buildingFloorId: this.repairData.buildingFloorId,
            }
          }
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.roomList = res.data.result.buildingRoomList;
          }
        }).catch((err) => {
          this.roomList = [];
         // this.$message.error(err)
        })
      },
      //根据房间Id获取公司
      choseCompany(){
        this.$httpPasser.post("ICCard/getShopNameByRoomId",{
          roomId:this.repairData.roomId
        }).then((res)=>{
          if(res.data.resultCode == 200){
            this.companyList = res.data.result;
          }
        })
      },
      //获取物料
      getMaterielList() {
        this.materielList = [];
        this.materielChoseTable = []
        this.$httpPasser.get(
          'employeeRepair/getMaterielList',
          {
            params: {
              shopId: this.companyId,
              serviceItemId: this.repairData.serviceItemId
            }
          }
        ).then((res) => {
          if (res.data.resultCode == 200) {
            this.materielList = res.data.result;
            //为物料增加Number字段
            for(let o in this.materielList){
              if(this.materielList[o].repairMaterielList&&this.materielList[o].repairMaterielList.length>0){
                for(let p in this.materielList[o].repairMaterielList){
                  this.materielList[o].repairMaterielList[p].number = 0;
                }
              }
            }
            console.log(this.materielList)
          }
          else{
            this.materielList = []
          }
        })
      },
      //提交按钮
      submitClick() {
        this.addTenantRepair()
//        if(this.repairTypeForControl=='1'){
//          this.addTenantRepair();
//        }
//        if(this.repairTypeForControl=='2'){
//          this.addPublicRepair();
//        }
      },
      //服务项数量更改
      serviceNumChange(data) {
        //设置当前选中服务项数量
        this.serviceChoseNum = data.numberSet;
        if (data.numberSet == 0) {
          this.repairData.serviceItemId = '';//服务项ID
          this.repairData.serviceItemNumber = '';//服务项数量
          this.repairData.materielList = '';
          //设置总价格
          this.repairData.total = 0;
          this.serviceChoseTable = [];
        }
        else {
          this.repairData.serviceItemNumber = data.numberSet;
          //console.log('总计金额222',data.componentStorage.serviceItemPrice)
          if (data.type == 'plus') {
            this.repairData.total = (Number(this.repairData.total) + Number(data.componentStorage.serviceItemPrice)).toFixed(2)
          }
          else if (data.type == 'minus') {
            this.repairData.total = (Number(this.repairData.total) - Number(data.componentStorage.serviceItemPrice)).toFixed(2)
          }
        }
       // console.log('总计金额',this.repairData.total)
      },
      //外面物料数量更改
      meterailNumChange(data) {
        //存在则返回索引，不存在则会返回false
        let index = this.$local.operateObjArray(
          this.materielChoseTable,
          data.componentStorage,
          ['materielId']
        )
        if (data.numberSet == 0) {
          if (index!==false) {
            this.materielChoseTable.splice(index, 1)
          }
        }
        else {
          if (index!==false) {
            this.materielChoseTable[index].number = data.numberSet;
          }
          else {
            data.componentStorage.number = data.numberSet;
            this.materielChoseTable.push(JSON.parse(JSON.stringify(data.componentStorage)))

          }
        }
        this.setDialogMeterielTable(false);
        //刷新物料数量显示
        this.meterailFlag = false;
        this.$nextTick(()=>{
          this.meterailFlag = true;
        })
        //console.log('总计金额111',this.repairData.total)
        if (data.type == 'plus') {
          this.repairData.total = (Number(this.repairData.total) + Number(data.componentStorage.materielPrice)).toFixed(2)
        }
        else if (data.type == 'minus') {
          this.repairData.total = (Number(this.repairData.total) - Number(data.componentStorage.materielPrice)).toFixed(2)
        }
        //console.log(this.chosedMaterielList)
        this.repairData.materielList = '';
        for (let i = 0; i < this.materielChoseTable.length; i++) {
          if (i == 0) {
            this.repairData.materielList += this.materielChoseTable[i].materielId + '#' + this.materielChoseTable[i].number;
          }
          else {
            this.repairData.materielList += "," + this.materielChoseTable[i].materielId + '#' + this.materielChoseTable[i].number;
          }
        }
       // console.log('总计金额',this.repairData.total)

      },
      //删除一种物料方法
      deleteMateriel(materiel){
        //存在则返回索引，不存在则会返回false
        let index = this.$local.operateObjArray(
          this.materielChoseTable,
          materiel,
          ['materielId']
        )
        console.log('ooo',this.materielChoseTable)
        if (index) {
            this.materielChoseTable.splice(index, 1)
            this.repairData.total = (Number(this.repairData.total) - (Number(materiel.materielPrice)*Number(materiel.number))).toFixed(2);
        }
        this.repairData.materielList = '';
        for (let i = 0; i < this.materielChoseTable.length; i++) {
          if (i == 0) {
            this.repairData.materielList += this.materielChoseTable[i].materielId + '#' + this.materielChoseTable[i].number;
          }
          else {
            this.repairData.materielList += "," + this.materielChoseTable[i].materielId + '#' + this.materielChoseTable[i].number;
          }
        }
        //console.log('aaaa',this.materielChoseTable)
        //console.log('总计金额',this.repairData.total)
        this.setDialogMeterielTable(true)
      },
      //改变物料框样式
      addActive($event){
        $event.currentTarget.className="materielImgOver borderGrey"
      },
      removeActive($event){
        $event.currentTarget.className="materielImg borderRed"
      },
      //设置弹出框数据
      //flashFlag为是否刷新的标记。默认为true
      setDialogMeterielTable(flashFlag){
        if(flashFlag==undefined){flashFlag=true}
        for(let o in this.materielList){
          if(this.materielList[o].repairMaterielList&&this.materielList[o].repairMaterielList.length>0){
            for(let p in this.materielList[o].repairMaterielList){
              this.materielList[o].repairMaterielList[p].number = 0;
              for(let q in this.materielChoseTable){
                if(this.materielChoseTable[q].materielId==this.materielList[o].repairMaterielList[p].materielId){
                  this.materielList[o].repairMaterielList[p].number = this.materielChoseTable[q].number;
                }
              }
            }
          }
        }
        console.log('aaaaa',this.materielList)
        if(flashFlag){
          this.dialogMeterailFlag = false;
          this.$nextTick(()=>{
            this.dialogMeterailFlag = true;
          })
        }

      },
      //遍历多层对象。第一个参数为对象。第二个参数为获取截点后的操作.doSomething会有一个参数，是节点
      //第三个参数为是否只对子节点进行操作，默认为false
      traversalObj(obj, doSomething,isLeaf) {
        if(isLeaf==undefined){
          isLeaf==false;
        }
        if(!isLeaf){
          for (let o in obj) {
            doSomething(obj[o])
            if (obj[o].repairMaterielList && obj[o].repairMaterielList.length > 0) {
              this.traversalObj(obj[o].repairMaterielList, doSomething,isLeaf)
            }
          }
        }
        else{
          for (let o in obj) {
            if (obj[o].repairMaterielList && obj[o].repairMaterielList.length > 0) {
              this.traversalObj(obj[o].repairMaterielList, doSomething,isLeaf)
            }
            else{
              doSomething(obj[o])
            }
          }
        }

      },
      //业主保存报修
      addTenantRepair() {
        if (this.repairData.customerUserId == '') {
          this.$message.error('用户ID不能为空', 'warn')
        } else if (this.repairData.buildingId == '') {
          this.$message.error('请选择所在写字楼', 'warn')
        } else if (this.repairData.linkMan == '') {
          this.$message.error('请填写报修人', 'warn')
        }else if (this.repairData.linkPhone == '') {
          this.$message.error('请填写联系方式', 'warn')
        }else if (!/^0?1[3456789]\d{9}$/.test(this.repairData.linkPhone)) {
          this.$message.error('联系方式格式不正确', 'warn')
        }else {
          this.$httpPasser.post(
            'repairDocuments/saveRepairDocuments',
            this.repairData
          ).then((response) => {
            if (response.data.resultCode == 200) {
              this.$message.success(response.data.resultCodeDesc)
              //清空数据
              for (let o in this.repairData) {
                if (o !== 'customerUserId') {
                  if (o == 'total') {
                    this.repairData[o] = 0;
                  }
                  else {
                    this.repairData[o] = '';
                  }
                }
              }
              //清空数据
              this.serviceChoseTable = [];
              this.materielChoseTable = [];
              //当前选中的服务项的数量，用于控制物料显示
              this.serviceChoseNum = 0;
              this.$refs.upload1.clearFiles();
            }
            else {
              this.$message.error(response.data.resultCodeDesc)
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        }

      },
      //公共设置保存报修
      addPublicRepair() {
        if (this.repairData.customerUserId == '') {
          this.$message.error('用户ID不能为空')
        } else if (this.repairData.buildingId == '') {
          this.$message.error('请选择所在写字楼')
        } else if (this.repairData.roomId == '') {
          this.$message.error('请选择房间')
        } else if (this.repairData.faultDescription == '') {
          this.$message.error('请填写故障描述')
        } else {
          this.$httpPasser.post(
            'repairDocuments/addTenantRepair',
            this.repairData
          ).then((response) => {
            if (response.data.resultCode == 200) {
              this.$message.success('报修成功')
              //清空数据
              for (let o in this.repairData) {
                if (o !== 'customerUserId') {
                  if (o == 'total') {
                    this.repairData[o] = 0;
                  }
                  else {
                    this.repairData[o] = '';
                  }
                }
              }
              //清空数据
              this.serviceChoseTable = [];
              this.materielChoseTable = [];
              //当前选中的服务项的数量，用于控制物料显示
              this.serviceChoseNum = 0;
            }
            else {
              this.$message.error(response.data.resultCodeDesc, 'error')
            }
          }).catch((err) => {
            this.$message.error(err, 'error')
          })
        }

      },

    }
  }
</script>

<style scoped lang="less">
  #declarRegistration {
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    #addrent{
      max-width:550px;
      max-height:310px;
      overflow: hidden;
    }
    .borderRed{
      border:solid 1px red;
    }
    .borderGrey{
      border:solid 1px grey;
    }
    .fontRed{
      color:red!important;
    }
    .tableImg{
      height:30px;
      width:50px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        height:40px;
        line-height: 40px;
        width: 140px;
        font-size: 14px;
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
        line-height: 1px;
        border-radius: 4px;
        display: inline-block;
      }
      .floorbtn.active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        background-color: #ecf5ff;
      }
    }
    .floorbtn.active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      background-color: #ecf5ff;
    }
  }
</style>
<style lang="less">
  #declarRegistration {
    #addrent, #addrent2, #addrent3 {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 135px;
        height: 95px;
        line-height: 95px;
        text-align: center;
      }
      .avatar {
        width: 135px;
        height: 95px;
        display: block;
      }
    }
  }
  .el-dialog{
    border-radius:5px;
    .materielListDiv{
      padding-bottom:20px;
      div{
        text-align:center;
      }
      .category{
        min-height:1px;
        line-height:20px;
        width:50px;
        float:left;
      }
      .materielList{
        float:left;
        .materielUnit{
          float:left;
          margin-left:10px;
          .materielImg{
            position:relative;
            width:135px;
            height:105px;
            background-image: url("../../../../assets/images/public/no_img.png");
            background-position: center center;
            background-size: 100%;
            img{
              width:135px;
              height:105px;
            }
            .deleteImg,.choseImg{
              height:18px;
              width:18px;
              position:absolute;
              top:0px;
              right:0px;
            }
            .deleteImg{
              display:none;
            }
          }
          .materielImgOver{
            position:relative;
            width:135px;
            height:105px;
            background-image: url("../../../../assets/images/public/no_img.png");
            background-position: center center;
            background-size: 100%;
            img{
              width:135px;
              height:105px;
            }
            .deleteImg,.choseImg{
              height:18px;
              width:18px;
              position:absolute;
              top:0px;
              right:0px;
            }
            .choseImg{
              display:none;
            }
          }
          .materielName{
            line-height:20px;
          }
          .materielPrice{
            line-height:20px;
          }
          .materielNumber{
            height:25px;
            position:relative;
            .numberSet{
              position:absolute;
              left:50%;
              transform: translate(-50%,0);
            }
          }
        }
      }
    }
    .materielListDiv::after{
      content:'';
      clear:both;
      width:100%;
      height:1px;
      display:block;
    }
  }
  .el-dialog__header{
    border-bottom:solid 1px #adadad;
  }
</style>


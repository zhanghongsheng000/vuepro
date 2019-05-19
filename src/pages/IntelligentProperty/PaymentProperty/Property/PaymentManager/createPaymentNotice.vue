<template>
  <div
    class="mainPart createPaymentNotice" id="createPaymentNotice"
    v-loading="loadingCreate"
    element-loading-text="正在生成..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--生成缴费公告表格开始-->
    <el-table
      :data="tableData.tableData"
      style="width: 100%">
      <el-table-column
        label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.num+1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="写字楼名称">
        <template slot-scope="scope">
          <span>{{scope.row.buildingName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(headName,index) in tableData.theadList"
        :key="index"
        :label="headName">
        <template slot-scope="scope">
          <span>{{scope.row[headName]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template slot-scope="scope">
          <a :href="gUrl+'excel/export?companyId='+companyId.companyId+'&buildingId='+buildingIdDictionary[scope.row.buildingName].buildingId">
          <el-button
            size="mini"
            type="primary"
            round>下载表底模板</el-button></a>
          <el-upload
            class="upload-demo"
            :action="gUrl+'upload/uploadExcel'"
            :show-file-list="isShowFile"
            :on-success="handleUploadSuccess"
            :beforeUpload="beforeAvatarUpload"
            :file-list="fileList">
            <el-button size="small" type="primary" round @click="getCurrentIndex(scope.$index)">上传表底文件</el-button>
          </el-upload>
          <el-button
            size="mini"
            type="success"
            round
            @click="handleCreatePayMentNotice(scope.$index, scope.row)">生成缴费公告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--生成缴费公告表格结束-->
    <div class="clear20"></div>
    <!--显示缴费公告表格开始-->
    <div v-if="isShowPayMentNoiceTableData">
      <div  class="clear50">未发布缴费公告</div>
      <el-table :data="payMentNoiceTableData" border style="width: 100%">
        <el-table-column prop="feenoticeId" label="编号" width="60">
        </el-table-column>
        <el-table-column prop="propertyCompanyName" label="物业公司">
        </el-table-column>
        <el-table-column prop="buildingName" label="写字楼名称">
        </el-table-column>
        <el-table-column prop="feeNoticeName" label="缴费公告名称">
        </el-table-column>
        <el-table-column prop="createTime" label="发布日期"  width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
            <el-button @click="todetails(scope.row)" type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--显示缴费公告表格开始-->


    <!--警告弹窗开始-->
    <el-dialog
      title="警告"
      :visible.sync="dialogVisibleDelete"
      width="30%">
      <span>确定要删除这条未发布的缴费公告吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleDelete = false">取 消</el-button>
    <el-button type="primary" @click="deleteFeeStandard">确 定</el-button>
  </span>
    </el-dialog>
    <!--警告弹窗结束-->
  </div>

</template>

<script>
  import axios from '@/assets/js/axios'
  import gUrl from '@/assets/js/gUrl'
  export default {
    name: "config-payment",
    data() {
      return {
        /*
        * 公共部分*/
        gUrl:gUrl,
        //从sessionStorage获取物业公司ID
        companyId:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
        },
        //当前操作的行，用来存储当前编辑的行
        currentRow:{},
        //当前操作行的index
        currentIndex:'',
        /*
        字典部分
        * */
        //写字楼名称 ID字典对象，主键为写字楼名称.在获取收费标准时初始化
        buildingIdDictionary:{},
        //feeStandardId字典对象。主键为收费项名称_buildingId  形如  物业费_1
        feeStandardIdDictionary:{},
        //feeItem字典对象,主键为收费项名称，存储了feeItemId buildingId
        feeDictionary:{},

        /*
        生成缴费公告部分
        * */
        //收费项List，用来存储从服务器获取的收费项
        feeItemList:[],
        //楼盘列表
        buildingGroupList:[],
        //写字楼列表
        buildingList:[],
        //楼盘ID
        buildingGroupId:'',
        //写字楼Id
        buildingId:'',
        tempObj:{},
        //设置收费标准提交表单参数列表,是一个对象数组
        setFeeStandardParams:[
          /*{
            //楼盘ID
            buildingGroupId:'',
            //写字楼Id
            buildingId:'',
            //收费项ID
            feeItemId: '',
            //收费项值
            feeItemValue:'',
            //收费项单位
            feeUnit:'',
            //修改需要传的主键ID
            feeStandardId:''
          },*/
        ],
        //生成缴费公告表格数据
        tableData:{
          //存储不确定的表头信息。因为收费项的数据和名称不确定，所以根据返回数据动态添加。
          theadList:[],
          tableData: [
            //以如下形式，将服务器返回的数据处理为以下形式，然后存储。
            /*{
              num:'1',
              buildingName: '荣鼎天下A座',
              '物业费': '12元/㎡/天',
              '水费': '2.6元/吨',
              ...
            }*/
          ]

        },

        /*
        显示未发布缴费公告部分
        * */
        //未发布缴费公告表格数据
        payMentNoiceTableData: [],
        //未发布缴费公告搜索参数
        searchParams:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          buildingName:''
        },
        //删除未发布公告参数
        deletePaymentNoticeParams:[],
        /*页面属性控制部分*/
        //input属性值
        labelPosition: 'right',
        //控制dialog是否显示
        dialogVisible:false,
        //删除确认dialog是否显示
        dialogVisibleDelete:false,
        //上传文件列表
        fileList:[],
        //是否显示上传文件
        isShowFile:false,
        //生成文件Loading
        loadingCreate:false,
        //是否显示为发布缴费公告
        isShowPayMentNoiceTableData:false
      };
    },
    methods: {
      //删除警告窗口
      handleDelete(index, row) {
        this.dialogVisibleDelete = true;
        //this.currentRow = row;
        this.deletePaymentNoticeParams = [];
        this.deletePaymentNoticeParams.push(row.feenoticeId)
      },
      //编辑添加收费标准的参数
      getFeeItemList(){
        this._http('propertyCompany/getFeeItem','get',this.companyId,data => {
          this.feeItemList = data.result
          for(let o in this.feeItemList){
            let tempObj = {};
            for(let p in this.feeItemList[o]){
              if(p!=='feeItemName'){
                tempObj[p] = this.feeItemList[o][p];
              }
              /*              if(p=='unit'){
                              tempObj['feeUnit'] = this.feeItemList[o][p];
                            }*/
            }
            tempObj.feeItemValue = '';
            this.setFeeStandardParams.push(tempObj)
          }
          //console.log(this.setFeeStandardParams)
        })
      },
      getFeeStandard(){
        this._http('propertyCompany/getFeeStandard','get',this.companyId,data =>{
          let dataGetFromService = data.result;
          //提供数据，并且写入返回对象
          //将返回数据写入写字楼ID字典表
          for(let o in dataGetFromService){
            //主键值，形如 物业费_10
            let tempBuildingName = dataGetFromService[o].buildingName
            if(this.buildingIdDictionary[tempBuildingName]){
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
            else{
              this.buildingIdDictionary[tempBuildingName] = {}
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
          }
          //将返回数据以收费项_buildingId为主键，写入收费标准主键字典表,以便后续传参的时候查询调用
          //格式如下
          /*水费_1:
            feeStandardId:5
            buildingId:10
          水费_2:
            feeStandardId:2
            buildingId:10
          物业费_1:
            feeStandardId:4
            buildingId:10
            */
          for(let o in dataGetFromService){
            //主键值，形如 物业费_10
            let temp = dataGetFromService[o].feeItemName+'_'+dataGetFromService[o].buildingId
            if(this.feeStandardIdDictionary[temp]){
              this.feeStandardIdDictionary[temp]['feeStandardId'] = dataGetFromService[o].feeStandardId;
              this.feeStandardIdDictionary[temp]['buildingId'] = dataGetFromService[o].buildingId;
            }
            else{
              this.feeStandardIdDictionary[temp] = {}
              this.feeStandardIdDictionary[temp]['feeStandardId'] = dataGetFromService[o].feeStandardId;
              this.feeStandardIdDictionary[temp]['buildingId'] = dataGetFromService[o].buildingId;
            }
          }
          //console.log(this.feeStandardIdDictionary)
          //将返回数据以名字为主键，写入收费项字典表,以便后续传参的时候查询调用
          //格式如下
          /*物业费:
            feeItemId:1
            feeItemValue:16
            feeUnit:"元/月/平米"
          电费:
            feeItemId:3
            feeItemValue:0.52
            feeUnit:"元/度"*/
          for(let o in dataGetFromService){
            if(this.feeDictionary[dataGetFromService[o].feeItemName]){
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemId'] = dataGetFromService[o].feeItemId;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeUnit'] = dataGetFromService[o].feeUnit;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemValue'] = dataGetFromService[o].feeItemValue;
            }
            else{
              this.feeDictionary[dataGetFromService[o].feeItemName] = {};
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemId'] = dataGetFromService[o].feeItemId;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeUnit'] = dataGetFromService[o].feeUnit;
              this.feeDictionary[dataGetFromService[o].feeItemName]['feeItemValue'] = dataGetFromService[o].feeItemValue;
            }
          }
          //console.log(this.feeDictionary)
          //将返回的数据以写字楼名称为主键进行整理，以方便进一步整理
          //整理结果为如下形式
          /*
          {
            新百广场1号楼:
              水费:"1元/吨"
              物业费:"14元/月/平米"
              电费:"1.5元/度"
            豫港大厦豫港大厦:
              水费:"4元/吨"
              物业费:"16元/月/平米"
              电费:"0.52元/度"
           }
            */
          let tempArray = []
          let tempObj = {};
          for(let o in dataGetFromService){
            if(tempObj[dataGetFromService[o].buildingName]){
              tempObj[dataGetFromService[o].buildingName][dataGetFromService[o].feeItemName] = dataGetFromService[o].feeItemValue + dataGetFromService[o].feeUnit
            }
            else{
              tempObj[dataGetFromService[o].buildingName] = {};
              tempObj[dataGetFromService[o].buildingName][dataGetFromService[o].feeItemName] = dataGetFromService[o].feeItemValue + dataGetFromService[o].feeUnit
            }
          }

          /*
          进一步将数据进行整理。
          1.将收费项名称写入tableData中的theadList,形式如['物业费','水费','电费'],以便于写入表格表头
          2.将表格数据按照elementUI能够使用的格式进行整理，形式如下
          [
            //以如下形式，将服务器返回的数据处理为以下形式，然后存储。
            {
              num:'1',
              buildingName: '荣鼎天下A座',
              '物业费': '12元/㎡/天',
              '水费': '2.6元/吨',
              ...
            }
          ]
          * */
          let index = 0;
          for(let p in tempObj){
            let tempRow = {};
            tempRow = {};
            tempRow.num = index;
            tempRow.buildingName = p;
            for(let q in tempObj[p]){
              let indexHead = 1;
              tempRow[q] = tempObj[p][q]
              //写入表头信息，只在第一行操作一次就可以了，提高效率
              if(index==0){
                this.tableData.theadList.push(q)
              }

              indexHead++;
            }
            tempArray.push(tempRow)
            index++;
          }
          this.tableData.tableData = tempArray;
        })
      },
      //上传文件成功钩子
      handleUploadSuccess(response,fileList){
        let path = response.result
        this.tableData.tableData[this.currentIndex]['path'] = path;
        this.$message.success('上传成功')

      },
      //生成缴费公告钩子
      handleCreatePayMentNotice(index,row){
        this.loadingCreate = true;
        this.$http.get(
          'excel/creatFeenotice',
          {
            params:{
              buildingId:this.buildingIdDictionary[row.buildingName].buildingId,
              companyId:this.companyId.companyId,
              userId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',
              path:row.path
            }
          }
        ).then((res)=>{
          if(res.data.resultCode==406){
            this.loadingCreate = false;
            this.search()
            this.$message.error(res.data.resultCodeDesc)
          }
          if(res.data.resultCode==200){
            this.loadingCreate = false;
            this.search()
            this.$message.success(res.data.resultCodeDesc)
            //this.search()
          }
        })
      },
      //获取并且设置当前点击行index的钩子
      getCurrentIndex(index){
        this.currentIndex = index;
      },
      /*
      * 查找缴费公告部分方法
      * */
      //查找缴费公告
      search() {
        this._http('propertyCompany/getNoPublishFeeNotice','get',this.searchParams,(data)=>{
          this.isShowPayMentNoiceTableData = true;
          this.payMentNoiceTableData = data.result
        },false)
      },
      //进入详情页面
      todetails(row) {
        this.$router.push({path:'paymentNoticeDetail',query:{feenoticeId:row.feenoticeId,isUnPublish:true}});
      },
      //删除未发布缴费公告方法
      deleteFeeStandard(){
        this.$http.post(
          'propertyCompany/deleteNotice',
          {
            feeNoticeId:this.deletePaymentNoticeParams.toString()
          }
        ).then(
          (response)=>{
            this.dialogVisibleDelete = false;
            if(response.data.resultCode==200){
              this.$message.success(response.data.resultCodeDesc)
              this.search();
            }
            else{
              this.$message.error(response.data.resultCodeDesc)
            }
          }
        ).catch(
          (err) => {
            console.log(err)
          }
        )
      },
      //文件上傳前的鉤子
      beforeAvatarUpload(file){
        {
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
          const extension = testmsg === 'xls'
          const extension2 = testmsg === 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 100
          if(!extension && !extension2) {
            this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
            });
          }
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
          }
          return extension || extension2 && isLt2M
        }
      },
      /*工具方法*/
      _http(url,type,params,callback200,isErrorMessage){
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
              else if(data.resultCode==204 && isErrorMessage){
                this.$message({
                  showClose: true,
                  message: data.result?data.result:data.resultCodeDesc,
                  type: 'warn'
                });
              }
              else{
                if(isErrorMessage){
                  this.$message({
                    showClose: true,
                    message: data.result?data.result:data.resultCodeDesc,
                    type: 'error'
                  });
                }

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
    mounted:function(){
      //初始化获取缴费项目列表
      this.getFeeItemList()
      //初始化获取当前物业公司所有收费标准
      this.getFeeStandard()
      this.search();
    }
  }
</script>

<style scoped lang="less">
  .mainPart{
    line-height:35px;
    .addFeeDetail{
      width:500px;
    }
    .clear20{
      width:100%;
      height:20px;
      clear:both;
    }
  }
  #createPaymentNotice{
    width:1040px;
  }
</style>
<style lang="less">
  #createPaymentNotice{
    .el-button{
      margin:0px;
      margin-top:5px;
    }
    .el-form-item{
      margin-bottom:10px;
    }
    .el-table__row{
      text-align:center;
    }
  }

</style>

<template>
  <div class="mainPart setPaymentStandard">
    <div class="addFeeDetail">
      <el-form :label-position="labelPosition" label-width="80px" :model="tempObj">
        <el-form-item label="楼盘">
          <el-select clearable  placeholder="请选择楼盘" v-model = 'buildingGroupId' @change="handleGetBuildingList">
            <el-option v-for="(buildingGroup,index) in buildingGroupList" :key='index' :label="buildingGroup.buildingGroupName" :value="buildingGroup.buildingGroupId"></el-option>
          </el-select>
          <el-select v-model="buildingId" clearable placeholder="请选择写字楼">
            <el-option v-for="(building,index) in buildingList" :key='index' :label="building.buildingName" :value="building.buildingId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for='(feeItem,index) in feeItemList' :key="index" :label="feeItem.feeItemName">
          <el-input placeholder="请输入内容" @change="handleEditFeeStandardParams" v-model="setFeeStandardParams[index].feeItemValue" clearable>
            <template slot="append">{{feeItem.unit}}</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="clear20"></div>
    <el-table
      :data="tableData.tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-dialog
      title="编辑收费标准"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form  label-width="120px"  :model="currentRow">
        <el-form-item label="写字楼名称">
          {{currentRow['buildingName']}}
        </el-form-item>
        <el-form-item v-for="(editRow,index) in tableData.theadList" :key='index' :label="editRow">
          <el-input v-model="currentRow[editRow]" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEditFeeStandard">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="警告"
      :visible.sync="dialogVisibleDelete"
      width="30%">
      <span>确定要删除这个写字楼的收费标准吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleDelete = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteFeeStandard">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import axios from '@/assets/js/axios'
  export default {
    name: "config-payment",
    data() {
      return {
        //从sessionStorage获取物业公司ID
        companyId:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
        },
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
        //写字楼名称 ID字典对象，主键为写字楼名称.在获取收费标准时初始化
        buildingIdDictionary:{},
        //feeStandardId字典对象。主键为收费项名称_buildingId  形如  物业费_1
        feeStandardIdDictionary:{},
        //feeItem字典对象,主键为收费项名称，存储了feeItemId buildingId
        feeDictionary:{},
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
        //底部写字楼数据
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
        //当前操作的行，用来存储当前编辑的行
        currentRow:{},
        //input属性值
        labelPosition: 'right',
        //控制dialog是否显示
        dialogVisible:false,
        //删除确认dialog是否显示
        dialogVisibleDelete:false
      };
    },
    methods: {
      //提交新增收费标准
      onSubmit() {
        //编辑上传的参数
        //需要将buildingId写入setFeeStandardParams
        for(let o in this.setFeeStandardParams){
          this.setFeeStandardParams[o].buildingId = this.buildingId;
          this.setFeeStandardParams[o].companyId = this.companyId.companyId;
          this.setFeeStandardParams[o].feeStandardId = null
        }
        axios.post(
          'propertyCompany/saveFeeItem',
          JSON.stringify(this.setFeeStandardParams),
          {headers: {'token': this.$local.sefetch('info')?this.$local.sefetch('info').token:'','Content-Type':'application/json'},type:'json'},
        ).then(res => {
          if(res.data.resultCode==200){
            //this.getFeeStandard()
            window.location.reload()
            this.$message.success('添加成功')
          }
        });

      },
      handleEdit(index, row) {
        for(let o in row){
          this.currentRow[o] = row[o]
        }
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.dialogVisibleDelete = true;
        for(let o in row){
          this.currentRow[o] = row[o]
        }
      },
      //提交删除收费标准
      handleDeleteFeeStandard(){
        let tempParams = []
        for(let o in this.currentRow){
          if(o !== 'buildingName' && o !== 'num'){
            //feeStandardId字典对象的主键。形如 水费_1
            let keyFeeStandardId = o+'_'+this.buildingIdDictionary[this.currentRow.buildingName].buildingId
            //let tempObj = {};
            //tempObj.feeStandardId = this.feeStandardIdDictionary[keyFeeStandardId].feeStandardId
            tempParams.push(this.feeStandardIdDictionary[keyFeeStandardId].feeStandardId);
          }

        }
        this.$http.post(
          'propertyCompany/deleteStandard',
          {
            companyId:this.companyId.companyId,
            feeStandardId:tempParams.toString()
          }
        ).then(res => {
          if(res.data.resultCode==200){
            //this.getFeeStandard()
            window.location.reload()
            this.dialogVisibleDelete = false;
            this.$message.success('删除成功')
          }
        });
      },
      //提交更改收费标准
      handleEditFeeStandard(){
        let tempParams = []
        for(let o in this.currentRow){
          let tempObj= {};
          let flag = true;
          if(o !== 'buildingName' && o !== 'num'){
            //feeStandardId字典对象的主键。形如 水费_1
            console.log(this.buildingIdDictionary)
            let keyFeeStandardId = o+'_'+this.buildingIdDictionary[this.currentRow.buildingName].buildingId
            tempObj.companyId = this.companyId.companyId;
            tempObj.buildingId = this.feeStandardIdDictionary[keyFeeStandardId].buildingId;
            tempObj.feeItemId = this.feeDictionary[o].feeItemId;
            tempObj.unit = this.feeDictionary[o].feeUnit;
            tempObj.feeItemValue = this.currentRow[o].replace(this.feeDictionary[o].feeUnit,'');
            tempObj.feeStandardId = this.feeStandardIdDictionary[keyFeeStandardId].feeStandardId;
            tempParams.push(tempObj)
          }

        }
        axios.post(
          'propertyCompany/saveFeeItem',
          JSON.stringify(tempParams),
          {headers: {'token': this.$local.sefetch('info')?this.$local.sefetch('info').token:'','Content-Type':'application/json'},type:'json'},
        ).then(res => {
          if(res.data.resultCode==200){
            this.dialogVisible = false;
            window.location.reload()
            //this.getFeeStandard()
            this.$message.success('修改成功')
          }
        });
      },
      handleSelectionChange(){
      },
      //编辑添加收费标准的参数
      handleEditFeeStandardParams(value){
        /*this.currentFormRow.feeItemValue = value;
        //判断是否添加此收费项，如果已经添加，则进行修改，如果没有添加，则直接PUSH
        let flag = false;
        for(let o in this.setFeeStandardParams){
          if(this.setFeeStandardParams[o].feeItemId == this.currentFormRow.feeItemId){
            flag = true;
            break;
          }
        }
        if(flag){

        }
        else{

        }*/
        //console.log(value,index)
        //this.setFeeStandardParams.push[this.currentFormRow]
      },
      getFeeItemList(){
        this._http('propertyCompany/getFeeItem','get',this.companyId,data => {
          this.feeItemList = data.result
          for(let o in this.feeItemList){
            let tempObj = {};
            for(let p in this.feeItemList[o]){
              if(p!=='feeItemName'){
                tempObj[p] = this.feeItemList[o][p];
              }
            }
            tempObj.feeItemValue = '';
            this.setFeeStandardParams.push(tempObj)
          }
        })
      },
      getBuildingGroupList(){
        this._http('building/getBuildingGroupListByCompanyId','get',this.companyId,data => {
          this.buildingGroupList = data.result.buildingGroupList
        })
      },
      handleGetBuildingList(){
        this._http('building/getBuildingListByBuildingGroupId','get',{buildingGroupId:this.buildingGroupId},data =>{
          //提供数据，并且写入返回对象
          this.buildingList = data.result.buildingList;
          this.buildingId = '';
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
              else if(response.data.resultCode==204){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }
              else{
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
        else if(type=="post"){

        }

      }
    },
    mounted:function(){
      //初始化获取楼盘列表
      this.getBuildingGroupList()
      //初始化获取缴费项目列表
      this.getFeeItemList()
      //初始化获取当前物业公司所有收费标准
      this.getFeeStandard()
     // this.$ready(function(){
     // })
    }
  }
</script>

<style scoped lang="less">
  .setPaymentStandard{
    line-height:35px;
    .addFeeDetail{
      width:500px;
    }
    .el-select{
      width:200px;
    }
    .clear20{
      width:100%;
      height:20px;
      clear:both;
    }
  }
</style>
<style lang="less">
  .setPaymentStandard{
    .el-form-item{
      margin-bottom:10px;
    }
    .el-table__row{
      text-align:center;
    }
  }

</style>

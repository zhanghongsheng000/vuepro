<template>
  <div class="mainPart setPaymentStandard">
    <div>
      <div class="top-title" style="padding-top: 10px;">
        <div class="line"></div>
        <span class="top-text">设定缴费标准</span>
      </div>
    </div>
    <div class="addFeeDetail">
      <el-form :label-position="labelPosition" label-width="84px" :model="tempObj">
        <el-form-item label="写字楼">
          <el-button type="primary" @click="openSelectTree">点击选择写字楼</el-button>
          <!--<el-select clearable  placeholder="请选择楼盘" v-model = 'buildingGroupId' @change="handleGetBuildingList">
            <el-option v-for="(buildingGroup,index) in buildingGroupList" :key='index' :label="buildingGroup.buildingGroupName" :value="buildingGroup.buildingGroupId"></el-option>
          </el-select>
          <el-select v-model="buildingId" clearable placeholder="请选择写字楼">
            <el-option v-for="(building,index) in buildingList" :key='index' :label="building.buildingName" :value="building.buildingId"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item v-if="selectedBuidlings.length>0" label="已选写字楼">
          <el-tag
            v-for="tag in selectedBuidlings"
            :key="tag.buildingId"
            @close="deleteBuilding(tag)"
            closable>
            {{tag.buildingName}}
          </el-tag>
        </el-form-item>
        <el-form-item v-for='(feeItem,index) in feeItemListNew' :key="index" :label="feeItem.feeItemName" v-if="setFeeStandardParams[index]!==undefined">
          <el-select clearable  placeholder="请选择缴费项计算公式"  v-model = 'setFeeStandardParams[index].formulaId' @clear="clearUnitAndValue(index)" @change="changeUnit(index)">
            <el-option v-for="(formula,formulaIndex) in feeItem.formulaList" :key='formulaIndex' :label="formula.formula" :value="formula.formulaId"></el-option>
          </el-select>
          <el-input placeholder="请输入数值" @change="handleEditFeeStandardParams"  @clear="clearUnitAndValue(index)" v-model="setFeeStandardParams[index].feeItemValue" clearable>
            <template slot="append">{{feeItem.checkedFormulaUnit}}</template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: 637px">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="clear16"></div>
    <el-table
      :data="tableData.tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="编号" width="60">
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div style="display: inline-block">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </div>
          <div style="margin-top:5px;display: inline-block">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑收费标准"
      :visible.sync="dialogVisible"
      width="48%">
      <el-form  label-width="84px">
        <el-form-item label="写字楼名称">
          {{currentRow['buildingName']}}
        </el-form-item>
        <el-form-item v-for='(feeItem,index) in currentRow' :key="index" :label="feeItem.feeItemName" v-if="editFeeStandardParams[index]!==undefined">
          <el-select clearable  placeholder="请选择缴费项计算公式"  v-model = 'editFeeStandardParams[index].formulaId' @clear="clearEditUnitAndValue(index)" @change="changeEditUnit(index)">
            <el-option v-for="(formula,formulaIndex) in feeItem.formulaList" :key='formulaIndex' :label="formula.formula" :value="formula.formulaId"></el-option>
          </el-select>
          <el-input placeholder="请输入数值" @change="handleEditFeeStandardParams" :disabled="editFeeStandardParams[index].formulaId==''" @clear="clearEditUnitAndValue(index)" v-model="editFeeStandardParams[index].feeItemValue" clearable>
            <template slot="append">{{feeItem.unit}}</template>
          </el-input>
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
    <el-dialog
      title="选择写字楼"
      :visible.sync="dialogTree"
      @open="eidtTree"
      width="30%"
      :before-close="canCelSelectBuilding"
      >
      <el-tree
        :data="buildingTree"
        :props="prop"
        node-key="buildingId"
        ref="buildingTree"
        show-checkbox
        default-expand-all
        @check-change="handleCheckChange">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canCelSelectBuilding">取 消</el-button>
        <el-button type="primary" @click="handleSelectBuilding">确 定</el-button>
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
        feeItemListNew:[
        ],
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
            //写字楼Id字符串
            buildingId:'',
            //收费项ID
            feeItemId: '',
            //收费项值
            feeItemValue:'',
            //收费项单位
            unit:'',
          },*/
        ],
        //编辑收费项参数。
        editFeeStandardParams:[
          /*{
            //写字楼Id字符串
            buildingId:'',
            //收费项ID
            feeItemId: '',
            //收费项值
            feeItemValue:'',
            //收费项单位
            unit:'',
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
        dialogVisibleDelete:false,

        /*
        * 树形选择写字楼部分
        * */
        //属性选择写字楼是否显示
        dialogTree:false,
        buildingTree: [
        ],
        prop: {
          label: 'buildingName',
          id: 'buildingId',
          children: 'buildingList',
        },
        //插件已选的写字楼数组，未确定状态
        selectedBuidlingsTemp:[],
        //已确定选择的写字楼数组
        selectedBuidlings:[]

      };
    },
    methods: {
      //提交新增收费标准
      onSubmit() {
        let buildingString = '';
        for(let index=0;index<this.selectedBuidlings.length;index++){
          if(index==this.selectedBuidlings.length-1){
            buildingString+=this.selectedBuidlings[index].buildingId
          }
          else{
            buildingString+=this.selectedBuidlings[index].buildingId+',';
          }
        }
        //编辑上传的参数
        //需要将buildingId写入setFeeStandardParams
        for(let o in this.setFeeStandardParams){
          this.setFeeStandardParams[o].buildingId = buildingString;
          this.setFeeStandardParams[o].companyId = this.companyId.companyId;
          this.setFeeStandardParams[o].feeStandardId = null
        }
        let dataCheckFlag = true;
        for(let p in this.setFeeStandardParams){
          if(this.setFeeStandardParams[p].buildingId===''){
            this.$message.error('请至少选择一个写字楼')
            dataCheckFlag = false;
            break;
          }
          else if( this.setFeeStandardParams[p].companyId){

          }
          else if(this.setFeeStandardParams[p].formulaId!==''&&this.setFeeStandardParams[p].feeItemValue==''){
            this.$message.error('请填写'+this.setFeeStandardParams[p].feeItemName+'的缴费标准数值')
            dataCheckFlag = false;
            break;
          }
          else if(this.setFeeStandardParams[p].formulaId===''&&this.setFeeStandardParams[p].feeItemValue!==''){
            this.$message.error('请选择'+this.setFeeStandardParams[p].feeItemName+'的缴费标准公式')
            dataCheckFlag = false;
            break;
          }
          else{
            continue;
          }
        }
        //用一个临时局部变量来代替参数变量。用以在参数中删除掉没有选择公式的收费项
        let tempSetFeeStandardParams = []
        for(let q in this.setFeeStandardParams){
          if(this.setFeeStandardParams[q].formulaId===''&&this.setFeeStandardParams[q].feeItemValue===''){
            continue;
          }
          else{
            tempSetFeeStandardParams.push(JSON.parse(JSON.stringify(this.setFeeStandardParams[q])))
          }
        }
        if(dataCheckFlag){
          axios.post(
            'propertyCompany/saveFeeItem',
            JSON.stringify(tempSetFeeStandardParams),
            {headers: {'token': this.$local.sefetch('info')?this.$local.sefetch('info').token:'','Content-Type':'application/json'},type:'json'},
          ).then(res => {
            if(res.data.resultCode==200){
              this.dialogVisible = false;
              window.location.reload()
              //this.getFeeStandard()
              this.$message.success(res.data.resultCodeDesc)
            }
            else{
              this.$message.error(res.data.resultCodeDesc)
            }
          });
        }
      },
      //获取写字楼树
      getBuildingTree(){
        this.$http.post(
          'propertyCompany/getTreeBuilding',
          {
            companyId:this.companyId.companyId
          }
        ).then(res=>{
          if(res.data.resultCode==200){
            this.buildingTree = res.data.result;
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        })
      },
      handleEdit(index, row) {
        let currentBuildingId = this.buildingIdDictionary[row.buildingName].buildingId;
        this.$http.post(
          'propertyCompany/getFeeStandardByBuilding',
          {
            buildingId:currentBuildingId,
            companyId:this.companyId.companyId,
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.currentRow = res.data.result;
            //初始化提交数据
            for(let o in this.currentRow){
              this.currentRow.buildingName = row.buildingName
              if(this.editFeeStandardParams[o]==undefined){
                this.editFeeStandardParams[o] = {};
              }
              this.editFeeStandardParams[o].companyId = this.companyId.companyId;
              this.editFeeStandardParams[o].feeItemId = this.currentRow[o].feeItemId;
              this.editFeeStandardParams[o].buildingId = currentBuildingId;
              this.editFeeStandardParams[o].feeStandardId = this.currentRow[o].feeStandardId;
              this.editFeeStandardParams[o].formulaId = this.currentRow[o].formulaId;
              this.editFeeStandardParams[o].checkedFormulaUnit = this.currentRow[o].unit;
              this.editFeeStandardParams[o].feeItemValue = this.currentRow[o].feeItemValue
              this.editFeeStandardParams[o].unit = this.currentRow[o].unit;
            }
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        })
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
        let dataCheckFlag = true;
        for(let p in this.editFeeStandardParams){
          if(this.editFeeStandardParams[p].buildingId===''){
            this.$message.error('请至少选择一个写字楼')
            dataCheckFlag = false;
            break;
          }
          else if(this.editFeeStandardParams[p].formulaId!==''&&this.editFeeStandardParams[p].feeItemValue==''){
            this.$message.error('请填写'+this.editFeeStandardParams[p].feeItemName+'的缴费标准数值')
            dataCheckFlag = false;
            break;
          }
          else if(this.editFeeStandardParams[p].formulaId===''&&this.editFeeStandardParams[p].feeItemValue!==''){
            this.$message.error('请选择'+this.editFeeStandardParams[p].feeItemName+'的缴费标准公式')
            dataCheckFlag = false;
            break;
          }
          else{
            continue;
          }
        }
        /* //用一个临时局部变量来代替参数变量。用以在参数中删除掉没有选择公式的收费项
         let tempSetFeeStandardParams = []
         for(let q in this.editFeeStandardParams){
           if(this.editFeeStandardParams[q].formulaId===''&&this.editFeeStandardParams[q].feeItemValue===''){
             continue;
           }
           else{
             tempSetFeeStandardParams.push(JSON.parse(JSON.stringify(this.editFeeStandardParams[q])))
           }
         }
         console.log('参数',tempSetFeeStandardParams)*/
        if(dataCheckFlag){
          axios.post(
            'propertyCompany/saveFeeItem',
            JSON.stringify(this.editFeeStandardParams),
            {headers: {'token': this.$local.sefetch('info')?this.$local.sefetch('info').token:'','Content-Type':'application/json'},type:'json'},
          ).then(res => {
            if(res.data.resultCode==200){
              this.dialogVisible = false;
              window.location.reload()
              //this.getFeeStandard()
              this.$message.success('修改成功')
            }
          })
        }
      },
      handleSelectionChange(){
      },
      //编辑添加收费标准的参数
      handleEditFeeStandardParams(value){

      },
      getFeeItemList(){
        this._http('propertyCompany/getFeeItem','get',this.companyId,data => {
          this.feeItemListNew = data.result
          this.initFeeStandardParams()
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
            //主键值为写字楼名称
            let tempBuildingName = dataGetFromService[o].buildingName
            if(this.buildingIdDictionary[tempBuildingName]){
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
            else{
              this.buildingIdDictionary[tempBuildingName] = {}
              this.buildingIdDictionary[tempBuildingName]['buildingId'] = dataGetFromService[o].buildingId;
            }
          }
          console.log('写字楼字典表',this.buildingIdDictionary)
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
          console.log('费用中转表',this.feeStandardIdDictionary)
         /* 1.将返回数据以名字为主键，写入收费项字典表,以便后续传参的时候查询调用
          2.将收费项名称写入tableData中的theadList,形式如['物业费','水费','电费'],以便于写入表格表头*/
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
          //写入表头信息，只在第一行操作一次就可以了，提高效率
          for(let theadIndex in this.feeDictionary){
            this.tableData.theadList.push(theadIndex)
          }
          console.log('收费项字典表',this.feeDictionary)
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
          console.log('tempObj',tempObj)
          /*
          进一步将数据进行整理。
          将表格数据按照elementUI能够使用的格式进行整理，形式如下
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
          let tempArray = []
          let index = 0;
          for(let p in tempObj){
            let tempRow = {};
            tempRow.num = index;
            tempRow.buildingName = p;
            for(let q in tempObj[p]){
              let indexHead = 1;
              tempRow[q] = tempObj[p][q]
              indexHead++;
            }
            tempArray.push(tempRow)
            index++;
          }
          this.tableData.tableData = tempArray;
        })
      },
      //打开写字楼选择页面
      openSelectTree(){
        if(this.selectedBuidlings.length>0){
          this.selectedBuidlingsTemp = JSON.parse(JSON.stringify(this.selectedBuidlings))
        }
        this.dialogTree=true
      },
      //树改变回调
      handleCheckChange() {
        let checkedNodes = this.$refs.buildingTree.getCheckedNodes(true);
        this.selectedBuidlingsTemp = [];
        for(let o in checkedNodes){
          let temp = {};
          temp.buildingId = checkedNodes[o].buildingId;
          temp.buildingName = checkedNodes[o].buildingName;
          this.selectedBuidlingsTemp.push(temp)
        }
      },
      //删除写字楼
      deleteBuilding(tag){
        console.log(this.selectedBuidlings)
        for(let o in this.selectedBuidlings){
          if(this.selectedBuidlings.length>1){
            if(this.selectedBuidlings[o].buildingId==tag.buildingId){
              this.selectedBuidlings.splice(o,1);
            }
          }else{
            this.selectedBuidlings.splice(o,1);
            this.selectedBuidlingsTemp = [];
          }

        }

      },
      //选择公式之后，改变公式
      changeUnit(index){
        let formulaId = this.setFeeStandardParams[index].formulaId
        for(let o in this.feeItemListNew[index].formulaList){
          if(this.feeItemListNew[index].formulaList[o].formulaId == formulaId){
            this.feeItemListNew[index].checkedFormulaUnit = this.feeItemListNew[index].formulaList[o].unit
            this.setFeeStandardParams[index].unit = this.feeItemListNew[index].formulaList[o].unit;
          }
          else{
            continue;
          }
        }
      },
      //清空单位
      clearUnitAndValue(index){
        this.feeItemListNew[index].checkedFormulaUnit = '';
        this.setFeeStandardParams[index].unit = '';
        this.setFeeStandardParams[index].formulaId = '';
        this.setFeeStandardParams[index].feeItemValue = '';
      },
      //选择公式之后，改变公式
      changeEditUnit(index){
        let formulaId = this.editFeeStandardParams[index].formulaId
        for(let o in this.currentRow[index].formulaList){
          if(this.currentRow[index].formulaList[o].formulaId == formulaId){
            this.currentRow[index].checkedFormulaUnit = this.currentRow[index].formulaList[o].unit
            this.currentRow[index].unit = this.currentRow[index].formulaList[o].unit
            this.editFeeStandardParams[index].unit = this.currentRow[index].formulaList[o].unit;
          }
          else{
            continue;
          }
        }
      },
      //清空单位
      clearEditUnitAndValue(index){
        this.currentRow[index].checkedFormulaUnit = '';
        this.currentRow[index].unit = '';
        this.editFeeStandardParams[index].unit = '';
        this.editFeeStandardParams[index].formulaId = '';
        this.editFeeStandardParams[index].feeItemValue = '';
      },
      //把已选的写字楼，渲染到树中
      eidtTree(){
        let selectedKeys = [];
        this.$nextTick(()=>{
          if(this.selectedBuidlingsTemp.length>0){
            for(let o in this.selectedBuidlingsTemp){
              selectedKeys.push(this.selectedBuidlingsTemp[o].buildingId)
            }
          }
          else{
            selectedKeys = [];
          }
          this.$refs.buildingTree.setCheckedKeys(selectedKeys);
        })
      },
      //确定选择写字楼回调
      handleSelectBuilding(){
        if(this.selectedBuidlingsTemp==0){
          this.$message.success("请选择写字楼")
        }else {
          this.selectedBuidlings = JSON.parse(JSON.stringify(this.selectedBuidlingsTemp))
          this.dialogTree = false;
        }
      },
      canCelSelectBuilding(){
        this.selectedBuidlingsTemp = [];
        this.dialogTree = false;
      },
      //获取缴费项数据后，初始化缴费项标准提交的数据。
      initFeeStandardParams(){
        for(let o in this.feeItemListNew){
          let temp = {};
          temp.feeItemId = this.feeItemListNew[o].feeItemId;
          temp.feeItemName = this.feeItemListNew[o].feeItemName;
          temp.formulaId = '';
          temp.feeItemValue = '';
          this.setFeeStandardParams.push(temp)
        }
//        console.log('dddd',JSON.stringify(this.setFeeStandardParams))
      },
      //获取缴费标准详情后，初始化缴费项标准提交的数据。
      initEditFeeStandardParams(){
        for(let o in this.currentRow){
          let temp = {};
          temp.feeItemId = this.currentRow[o].feeItemId;
          temp.feeItemName = this.currentRow[o].feeItemName;
          temp.formulaId = this.currentRow[o].formulaId;
          temp.feeItemValue = '';
          this.editFeeStandardParams.push(temp)
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
    created(){
      //初始化获取楼盘列表
      this.getBuildingTree()
      //初始化获取缴费项目列表
      this.getFeeItemList()
      //初始化获取当前物业公司所有收费标准
      this.getFeeStandard()
    },
  }
</script>

<style scoped lang="less">
  .setPaymentStandard{
    .addFeeDetail{
      width:100%;
    }
    .el-select{
      width:200px;
    }
    .el-input{
      width:500px;
    }
    .el-form-item__label{
      text-indent:20px;
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
    .el-tag {
      margin-right: 10px;
    }
    .el-form-item{
      margin-bottom:16px !important;
    }
    .el-table__row{
      text-align:center;
    }
    .el-input-group__append{
      min-width:88px;
    }
    /*.el-form-item__label{
      text-align:center;
    }*/
    .el-input{
      margin-top: -3px;
    }

  }

</style>

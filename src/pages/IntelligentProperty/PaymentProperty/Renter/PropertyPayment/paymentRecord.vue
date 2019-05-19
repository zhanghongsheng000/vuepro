<template>
  <div class="mainPart paymentRecord" id="paymentRecord">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">缴费记录</span>
      </div>
    </div>
    <el-button type="text" icon="el-icon-arrow-left" @click="goback">返回</el-button>
    <template>
      <el-table :data="paymentResults" style="width: 100%" @expand-change = "handleExpandChange"  ref="paymentResultsTable" row-class-name="get-row-class">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="resultTable">
                <div class="resultTbody">
                  <el-form-item v-for="(item,index) in feeList" :key="index">
                    <div class="resultBlock managementFee" >
                      <div class="resultContent" >
                        <ul>
                          <li v-if="item.amount">缴费金额：{{item.amount}}元</li>
                          <li v-if="item.date">缴费日期：{{item.amount}}</li>
                          <li v-if="item.feeStandard">缴费标准：{{item.feeStandard}}{{item.unit}}</li>
                          <li v-for="item in item.item">{{item.name}}:{{item.value}}</li>
                          <!--<li>房间面积：{{props.row.managementFeeHouseArea}}㎡</li>-->
                          <!--<li>缴费区间：{{props.row.managementFeeRegion}}</li>-->
                          <!--<li>月份合计：{{props.row.managementFeeMonthSum}}</li>-->
                          <!--<li>应缴物业费：{{props.row.managementFeeStressPayment}}元</li>-->
                        </ul>
                      </div>
                      <div class="typeName">
                        {{item.feeItemName}}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="写字楼名称" prop="buildingName">
        </el-table-column>
        <el-table-column label="房间号" prop="buildingRoomName">
        </el-table-column>
        <el-table-column label="缴费日期" prop="payDate">
        </el-table-column>
        <el-table-column label="应缴" prop="total">
        </el-table-column>
        <el-table-column label="实缴" prop="realPay">
        </el-table-column>
        <el-table-column label="查看明细">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRowClick(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="clearfix pt20" v-if="buildingCascader.pageTotal>0" style="padding-bottom: 20px">
      <div class="clearfix">
        <div class="fl" >
          <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="buildingCascader.pageTotal">
          </el-pagination>
        </div>
        <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
          <span>共{{this.buildingCascader.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.buildingCascader.totalRecord}}条</span>
        </div>
      </div>
    </div>
    <!--<el-button type="primary" round @click="goback" style="float: left;margin-top:20px;">返回</el-button>-->
  </div>
</template>

<script>
  export default {
    name: "search-payment-record",
    //		name: "buildingCascaderModle",
    data() {
      return {
        options: [
        ],
        value1: '',

        //获取楼盘列表参数，物业公司ID
        companyId: {
          companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
        },
        feeList:[],
        //总页数，用来控制是否显示分页
        pageTotal:0,
        //楼盘级联数据
        buildingCascader: {
          //楼盘列表
          buildingGroupList: [],
          //写字楼列表
          buildingList: [],
          //搜索参数
          //楼盘ID
          buildingGroupId: '',
          //写字楼ID
          buildingId: '',
          //楼层ID'
          companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          pageIndex:1,
          //每页条数
          pageSize:30,
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },
        //以buildingId为KEY来存储缴费详情
        FeeDetial:{},
        paymentResults: []
      }
    },
    computed: {
      hasBuilding: function() {
        let flag = true
        if(this.buildingCascader.buildingGroupId !== '') {
          flag = false;
        }
        return flag;
      },
      hasPagination: function(){
        let flag = true;
        if(this.pageTotal > 0) {
          flag = false;
        }
        return flag;
      }
    },
    methods: {
      goback(){
        this.$router.push({path: 'PropertyPayment'})
      },
      handleCurrentChange(index) { //分页方法
        this.buildingCascader.pageIndex = index;
        this.handleSelectFeeRecord();
      },
      onSubmit() {
        console.log('submit!');
      },
      getBuildingGroupList() {
        this._http('building/getBuildingGroupListByCompanyId', 'get', this.companyId, data => {
          this.buildingCascader.buildingGroupList = data.result.buildingGroupList
        })
      },
      //查找缴费记录钩子
      handleSelectFeeRecord(){
        let tempParams = {};
        tempParams.companyId = this.companyId.companyId;
        if(this.buildingCascader.buildingId!==''){
          tempParams.buildingId = this.buildingCascader.buildingId;
        }
        tempParams.buildingGroupId = this.buildingCascader.buildingGroupId;
        tempParams.year = 0;
//        this._http('propertyCompany/getPropertyFeeRecord', 'get', tempParams, data => {
//          this.paymentResults = data.result
//        })
        this.$http.post("businessProperty/getBusinessFeeRecord",{
          companyId:this.buildingCascader.companyId,
          buildingGroupId:this.buildingCascader.buildingGroupId,
          buildingId:this.buildingCascader.buildingId,
          pageIndex:this.buildingCascader.pageIndex,
          pageSize:this.buildingCascader.pageSize
        }).then((res)=>{
          let data = res.data;
          if(data.resultCode == '200'){
            this.paymentResults = data.result
            this.buildingCascader.pageTotal  = data.pageTotal
            this.buildingCascader.totalRecord =data.totalRecord
            this.buildingCascader.pageIndex = data.pageIndex
          }else if(data.resultCode == '204'){
            this.paymentResults = []
            this.buildingCascader.pageTotal  = data.pageTotal
            this.buildingCascader.totalRecord =data.totalRecord
            this.buildingCascader.pageIndex = data.pageIndex
          }else{

          }
        })
      },
      //查找所有缴费记录方法，初始化页面时运行
      selectAllFeeRecord(){
        let tempParams = {};
        tempParams.companyId = this.companyId.companyId;
        tempParams.year = 0;
        this._http('propertyCompany/getFeeRecord', 'get', tempParams, data => {
          this.paymentResults = data.result
          //通过原生JS修改展开按钮
          let temp = document.getElementsByTagName('tr')
          //$nextTick是DOM一次渲染结束之后的回调方法
          //VUE的页面渲染很多是异步的。所以这里需要放到$nextTick中
          this.$nextTick(function () {
            for(let i=1;i<temp.length;i++){
              let temp2 = temp[i].getElementsByTagName('td')[0].getElementsByTagName('div')[0]
              temp2.innerHTML = '<div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div>'
              temp2.getElementsByTagName('div')[0].onclick = function(){
                if(this.style.transform && this.style.transform=='rotate(0deg)'){
                  this.style.transform = 'rotate(90deg)'
                }
                else if(this.style.transform && this.style.transform=='rotate(90deg)'){
                  this.style.transform = 'rotate(0deg)'
                }
                else{
                  this.style.transform = 'rotate(90deg)'
                }
              }
            }
          })
        })
      },
      //获取写字楼列表
      getBuildingList(value) {
        this._http('building/getBuildingListByBuildingGroupId', 'get', {
          buildingGroupId: this.buildingCascader.buildingGroupId
        }, data => {
          //设置下级菜单不可用或者不可见
          this.buildingCascader.buildingId = '';
          this.buildingCascader.buildingList = data.result.buildingList
        })
      },
      //row为当前展开行，expandedRows为所有已经展开的行。展开表格行方法
      handleExpandChange(row, expandedRows){
        if(expandedRows.length>1){
          expandedRows.shift()
        }
        /*//如果所有已展开行包含当前展开行，则说明是展开操作，执行查询。否则不执行
        let index = expandedRows.indexOf(row)
        if(index!==-1){
          //console.log(row.feeNoticeBuildingId)
          this.getFeeRecordDetial(row.feeNoticeBuildingId)
        }*/
      },
      //获取缴费详情
      getFeeRecordDetial(feeNoticeRoomId,callBack){
        this._http('propertyCompany/getFeeNoticeRoomDetail', 'get', {
          feeNoticeRoomId: feeNoticeRoomId
        }, data => {
          this.feeList = data.result
          this.FeeDetial[feeNoticeRoomId] = data.result.FeeTerm;
          callBack();
        })
      },
      //根据index判断是否有white类
      getIsWhite(index){
        if(index%2==0){
          return ''
        }
        else{
          return 'white'
        }
      },
      //行点击事件
      handleRowClick(row){
        this.getFeeRecordDetial(row.feeNoticeRoomId,()=>{
          this.$refs.paymentResultsTable.toggleRowExpansion(row)
        })
      },
//      //行点击事件
//      handleRowClick(row){
//        this.getFeeNoticeRoomDetail(row.feeNoticeRoomId,()=>{
//          this.$refs.paymentResults.toggleRowExpansion(row)
//        })
//      },
      /*工具方法*/
      _http(url, type, params, callback200) {
        if(type == "get") {
          this.$http.get(
            url, {
              params: params
            }
          ).then(
            (response) => {
              let data = response.data;
              if(data.resultCode == 200) {
                callback200(data)
              }
              else if(response.data.resultCode==204){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }
              else {
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
        } else if(type == "post") {

        }

      }
    },
    mounted() {
      this.getBuildingGroupList();
      this.handleSelectFeeRecord();
      //this.selectAllFeeRecord();
    }
  }
</script>
<style scoped lang="less">
  .mainPart {
    width: 1200px;
  }

  .resultTable{
    text-align:left;
  }
  .choseForm {
    padding-bottom: 20px;
  }

  .paymentRecord {
    .resultTable {
      .resultThead {
        height: 45px;
        line-height: 45px;
      }
      background-color:#e8e8e8;
      span {
        display: inline-block;
      }
      .left {
        text-indent: 20px;
      }
      .right {
        float: right;
        margin-right: 20px;
      }
      .resultTbody {
        height: 200px;
        display: table;
        width: 100%;
        .resultBlock {
          position: relative;
          display: table-cell;
          border: solid 1px #cccbcb;
          border-right: none;
          width: 16%;
          overflow: hidden;
          .resultContent {
            margin-right: 15px;
            margin-left: 15px;
            margin-top: 15px;
            font-size: 13px;
            color: rgb(96, 98, 102);
          }
          .typeName {
            position: absolute;
            bottom: 0px;
            right: 0px;
            height: 60px;
            width: 50px;
            background-repeat: no-repeat;
            background-position: 10px 0px;
            line-height: 90px;
            overflow: hidden;
            margin-right: 10px;
            text-align: center;
          }
        }
        /*.managementFee .typeName {
                    background-image: url("../../../../assets/img/IntelligentProperty/iconPropertypayment_bg.png");
                }
                .waterRent .typeName {
                    background-image: url("../../../../assets/img/IntelligentProperty/icon_Waterpayment.png");
                }
                .electricFee .typeName {
                    background-image: url("../../../../assets/img/IntelligentProperty/icon_Elecpayment.png");
                }
                .heatingFee .typeName {
                    background-image: url("../../../../assets/img/IntelligentProperty/icon_Warmpayment.png");
                }
                .airConditioningFee .typeName {
                    background-image: url("../../../../assets/img/IntelligentProperty/icon_Mechpayment.png");
                }*/
        .resultBlock:last-child {
          border-right: solid 1px #cccbcb;
        }
        .white {
          background-color: white;
        }
      }
    }
    .clear20 {
      height: 20px;
      clear: both;
      width: 100%;
    }
  }
  #paymentRecord{
    width:1040px;
  }
</style>
<style lang="less">
  #paymentRecord{
    .mainPart .el-table {
      text-align: center;
    }

    .el-table__expanded-cell[class*=cell] {
      padding: 0;
    }

    .el-form-item__content {
      line-height: 30px;
      position: relative;
      font-size: 14px;
    }
    .resultTable .resultTbody .resultBlock:last-child {
      height: 200px;
      width: 208px;
      border: 1px solid #dedede;
      margin: 5px 0;
    }
    .resultTable .resultTbody .resultBlock .resultContent {
      margin: 0;
      padding-left: 6px;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .resultTable .resultTbody .resultBlock {
      border: none;
    }
    .el-table th>.cell{
      text-align: center;
    }
    .el-table__expand-icon>.el-icon{
      visibility:hidden;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
      padding-left: 0;
      margin-left: -30px;
    }
  }

</style>

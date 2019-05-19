<template>
  <div class="mainPart searchArrearsRecord" id="searchArrearsRecord">
    <div>
      <div class="top-title" style="padding-top: 10px;">
        <div class="line"></div>
        <span class="top-text">未缴费记录查询</span>
      </div>
    </div>
    <div class="choseForm">
      <el-form :model="buildingCascader">
        <el-form-item>
          <el-select v-model="buildingCascader.buildingGroupId" clearable placeholder="请选择楼盘" @change="getBuildingList">
            <el-option v-for="(buildingGroup,index) in buildingCascader.buildingGroupList" :key="index"
                       :label="buildingGroup.buildingGroupName" :value="buildingGroup.buildingGroupId ">
            </el-option>
          </el-select>
          <el-select v-model="buildingCascader.buildingId"  clearable placeholder="请选择写字楼" :disabled="hasBuilding">
            <el-option v-for="(building,index) in buildingCascader.buildingList" :key="index"
                       :label="building.buildingName" :value="building.buildingId">
            </el-option>
          </el-select>
          <el-button type="primary"  @click="handleSelectFeeRecord">查询</el-button>
          <div class="clear20"></div>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table :data="paymentResults" style="width: 100%" @expand-change="handleExpandChange"  row-key="feeNoticeRoomId"
               ref="paymentResultsTable" row-class-name="get-row-class"
                :expand-row-keys="expands"
                :empty-text=text
      >
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
        <el-table-column label="房间" prop="buildingRoomName">
        </el-table-column>
        <el-table-column label="房东" prop="landlord">
        </el-table-column>
        <el-table-column label="租客" prop="renter">
        </el-table-column>
        <el-table-column label="应缴合计" prop="total">
        </el-table-column>
        <el-table-column label="实缴合计" prop="realPay">
        </el-table-column>
        <el-table-column label="查看明细">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRowClick(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="clearfix pt20" v-if="buildingCascader.pageTotal>0">
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
  </div>
</template>

<script>
  export default {
    name: "search-payment-record",
    //		name: "buildingCascaderModle",
    data() {
      return {
        text:'正在加载，请稍候',
        //获取楼盘列表参数，物业公司ID
        companyId: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : ''
        },
        feeList:[],
        //总页数，用来控制是否显示分页
        pageTotal: 0,
        //当前页码
        currentPageNum:0,
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
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
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
        FeeDetial: {},
        paymentResults: [],
        text:'展开',
        expands: []
      }
    },
    computed: {
      hasBuilding: function () {
        let flag = true
        if (this.buildingCascader.buildingGroupId !== '') {
          flag = false;
        }
        return flag;
      },
      hasPagination: function () {
        let flag = true;
        if (this.pageTotal > 0) {
          flag = false;
        }
        return flag;
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getBuildingGroupList() {
        this._http('building/getBuildingGroupListByCompanyId', 'get', this.companyId, data => {
          this.buildingCascader.buildingGroupList = data.result.buildingGroupList
        })
      },
      handleCurrentChange(index){
        this.buildingCascader.pageIndex = index;
        this.handleSelectFeeRecord()
      },
      //查找缴费记录钩子
      handleSelectFeeRecord() {
        let tempParams = {};
        tempParams.companyId = this.companyId.companyId;
        if (this.buildingCascader.buildingId !== '') {
          tempParams.buildingId = this.buildingCascader.buildingId;
        }
        tempParams.buildingGroupId = this.buildingCascader.buildingGroupId;
        tempParams.year = 0;
//        this._http('propertyCompany/getUnFeeRecord', 'get', tempParams, data => {
//          this.paymentResults = data.result
//          this.pageTotal = data.pageTotal
//        })
        this.$http.post("propertyCompany/getPropertyUnFeeRecord",{
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
            this.text = '暂无数据'
            this.buildingCascader.pageTotal  = data.pageTotal
            this.buildingCascader.totalRecord =data.totalRecord
            this.buildingCascader.pageIndex = data.pageIndex
          }else{
            this.$message.error(data.resultCodeDesc)
            this.text = '暂无数据'
          }
        })
      },
      //查找所有缴费记录方法，初始化页面时运行
      selectAllFeeRecord() {
        let tempParams = {};
        tempParams.companyId = this.companyId.companyId;
        tempParams.year = 0;
        tempParams.pageIndex = this.currentPageNum;
        this._http('propertyCompany/getUnFeeRecord', 'get', tempParams, data => {
          this.paymentResults = data.result
          this.pageTotal = data.pageTotal
          this.currentPageNum = data.pageIndex;
          //通过原生JS修改展开按钮
          let temp = document.getElementsByTagName('tr')
          //$nextTick是DOM一次渲染结束之后的回调方法
          //VUE的页面渲染很多是异步的。所以这里需要放到$nextTick中
          this.$nextTick(function () {
            for (let i = 1; i < temp.length; i++) {
              let temp2 = temp[i].getElementsByTagName('td')[0].getElementsByTagName('div')[0]
              temp2.innerHTML = '<div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div>'
              temp2.getElementsByTagName('div')[0].onclick = function () {
                if (this.style.transform && this.style.transform == 'rotate(0deg)') {
                  this.style.transform = 'rotate(90deg)'
                }
                else if (this.style.transform && this.style.transform == 'rotate(90deg)') {
                  this.style.transform = 'rotate(0deg)'
                }
                else {
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
      handleExpandChange(row, expandedRows) {
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
      getFeeRecordDetial(feeNoticeRoomId, callBack) {
        this._http('propertyCompany/getFeeNoticeRoomDetail', 'get', {
          feeNoticeRoomId: feeNoticeRoomId
        }, data => {
          this.feeList = data.result
          //this.FeeDetial[feeNoticeBuildingId] = data.result.FeeTerm;
          callBack();
        })
      },
      //根据index判断是否有white类
      getIsWhite(index) {
        if (index % 2 == 0) {
          return ''
        }
        else {
          return 'white'
        }
      },
      //行点击事件
      handleRowClick(row) {
//        Array.prototype.remove = function (val) {
//          console.log("走的这块")
//          console.log("val",val)
//          let index = this.indexOf(val);
//          if (index > -1) {
//            this.splice(index, 1);
//          }
//        };
//
//        if (this.expands.indexOf(row.feeNoticeRoomId) < 0) {
//          this.expands = []
//          this.expands.push(row.feeNoticeRoomId);
//        } else {
//          this.expands.remove(row.feeNoticeRoomId);
//        }
        this.getFeeRecordDetial(row.feeNoticeRoomId, () => {
          this.$refs.paymentResultsTable.toggleRowExpansion(row)
        })

      },
      /*工具方法*/
      _http(url, type, params, callback200) {
        if (type == "get") {
          this.$http.get(
            url, {
              params: params
            }
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
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
        } else if (type == "post") {

        }

      }
    },
    mounted() {
      this.getBuildingGroupList();
      //this.selectAllFeeRecord();
      this.handleSelectFeeRecord();
    }
  }
</script>

<style scoped lang="less">
  .searchArrearsRecord {
    width: 1200px;
  }

  .resultTable {
    text-align: left;
  }

  .choseForm {
    padding-bottom: 20px;
  }

  .searchArrearsRecord {
    line-height: 25px;
    .resultTable {
      .resultThead {
        height: 45px;
        line-height: 45px;
      }
      background-color: #e8e8e8;
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
  #searchArrearsRecord{
    width:1040px;
  }
</style>
<style lang="less">
  #searchArrearsRecord {
    .el-table {
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
    .resultTable {
      .resultTbody {
        .resultBlock:last-child {
          height: 200px;
          width: 208px;
          border: 1px solid #dedede;
          margin: 5px 0;
        }
        .resultBlock {
          border: none;
          .resultContent {
            margin: 0;
            padding-left: 6px;
          }

        }
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .el-table th > .cell {
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

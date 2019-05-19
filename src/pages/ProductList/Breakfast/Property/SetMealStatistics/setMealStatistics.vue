<template>
  <div id="setMeauStatistics">
    <div class="title">
      {{showDate}}套餐销售统计表
    </div>
    <div class="searchForm">
      <div class="fl_section">
        <span class="labelText">开始日期</span>
        <el-date-picker
          v-model="getStatisticsByPeriodOfTimeParams.startDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
      </div>
      <div class="fl_section">
        <span class="labelText">结束日期</span>
        <el-date-picker
          v-model="getStatisticsByPeriodOfTimeParams.endDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="fl_section">
        <span class="labelText">套餐名称</span>
        <el-select
          v-model="getStatisticsByPeriodOfTimeParams.setmealId"
          clearable
          placeholder="请选择">
          <el-option
            v-for="setmeal in setmealList"
            :key="setmeal.setmealId"
            :label="setmeal.setmealName"
            :value="setmeal.setmealId">
          </el-option>
        </el-select>
      </div>
      <div class="fl_section">
        <el-button type="primary" @click="showChoseBuilding">选择写字楼</el-button>
        <el-button type="primary" @click="searchSetmealStatistics">查询</el-button>
      </div>
    </div>
    <div class="clear10"></div>
    <div class="chosedBuilding" v-if="numberFlag&&flushFlag">
      已选写字楼：
      <span
        v-for="building,index in getStatisticsByPeriodOfTimeParams.buildingIdList"
        class="buildingTag"
        :key="index">
        {{buildingDectory[building]}}
        <!--  <i class="el-icon-circle-close-outline" @click="delateSingalBuilding(index)"></i>-->
      </span>
      <el-button type="text" @click="clearBuilding">全部清除</el-button>
    </div>
    <div class="clear10"></div>
    <el-table
      :data="setMeauStatistics"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index"
        width="50">
      </el-table-column>
      <!--:index="indexMethod"-->
      <el-table-column
        prop="setmealName"
        label="套餐名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="setmealCount"
        label="套餐数量(份)"
        width="110">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="合计金额(元)">
      </el-table-column>
      <el-table-column
        prop="propertyProportions"
        label="物业分成比例"
        width="260">
       <!-- <template slot-scope="scope">
          <div v-for="item,index in scope.row.profitsProportion" :key="index">
            {{item.startyearmonth}}至{{item.endyearmonth}},分润比例为{{item.proportions}}
          </div>
        </template>-->
      </el-table-column>
      <el-table-column
        prop="profitsAmount"
        label="物业分润(元)">
      </el-table-column>
      <el-table-column
        label="详情">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="toDetails(scope.row)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear10"></div>
    <div class="clearfix">
      <div class="fl">
        <el-pagination
          @current-change=" handleCurrentChange"
          background
          :current-page.sync="pageParams.pageIndex"
          layout="prev, pager, next"
          :page-count="pageParams.pageTotal">
        </el-pagination>
      </div>
      <div class="fl pagestyle">
        <span>共{{pageParams.pageTotal}}页，当前第{{this.pageParams.pageIndex}}页,每页{{pageParams.pageSize}}条，共{{pageParams.totalRecord}}条</span>
      </div>
    </div>
    <el-dialog
      :visible.sync="choseBuildingFlag"
      width="30%"
      title="选择写字楼"
      show-close
      :before-close="handleClose">
      <div>
        <div class="checkAll">
          <el-button type="text" @click="choseAll">全选</el-button>
        </div>
        <el-checkbox-group v-model="tempChoseBuildingId" v-if="buildingAllFlag">
          <span class="buildingChecbox" v-for="building,index in buildingList">
           <el-checkbox :label="building.buildingId">{{building.buildingName}}</el-checkbox>
        </span>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="choseBuildingFlag = false">取 消</el-button>
    <el-button type="primary" @click="ensureBuildingChose">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "set-meau-statistics",
    data() {
      return {
        //当前日期
        currentDate: this.$local.getDay('yyyy年MM月dd日'),
        //显示的日期，默认为当前日期，如果选择了条件，则为日期段
        showDate: this.$local.getDay('yyyy年MM月dd日'),
        //为了获取套餐列表，在写字楼列表中随意挑选的一个buildingId
        buildingId: '',
        setMeauStatistics: [/* {
          setmealName: '5元营养肉包小米南瓜粥',
          setmealCount: '200',
          price:'5',
          totalPrice:'1000',
          profitsProportion:[],
          profitsAmount:'50'
        }*/],
        //已选写字楼flag，为了刷新已选写字楼
        flushFlag: true,
        //当前公司的套餐列表
        setmealList: [
          /*
           {
             setmealId:'2',
             setmealName:'5元营养肉包小米南瓜粥'
           },*/
        ],
        //当前物业公司下的写字楼ID
        buildingList: [
          /*
          {
            buildingId:'109',
            buildingName:'华林国际D座'
          },*/
        ],
        //写字楼字典。根据写字楼数组生成
        buildingDectory: {
          /* '101':'荣鼎天下A座',
           '109':'华林国际D座',*/
        },
        //临时存储所选写字楼ID
        tempChoseBuildingId: [],
        //按照时间段获取早餐颂参数
        getStatisticsByPeriodOfTimeParams: {
          shopId: this.$local.sefetch('info').companyId,
          buildingIdList: [],//写字楼ID
          setmealId: '',//套餐ID
          startDate: '',//开始日期
          endDate: '',//结束日期
          orderNum: '',//订单号
          pageIndex: '1',
          pageSize: 30,
          totalAmount: '',//合计金额
          totalProfit: '',//物业分润
        },
        //选择写字楼标记
        choseBuildingFlag: false,
        //写字楼选择列表标记
        buildingAllFlag: false,
        pageParams: {
          pageIndex: 1,
          pageTotal: 0,
          totalRecord: 0,
          pageSize: 30
        }
      }
    },
    computed: {
      //已选写字楼flag，如果有选择就显示，没有选择就不显示
      numberFlag: function () {
        let re = false;
        if (this.getStatisticsByPeriodOfTimeParams.buildingIdList.length > 0) {
          re = true;
        }
        return re;
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      toDetails(row) {
        this.$router.push({
          path: './OrderList', query: {
            setmealName: row.setmealName,
            setmealId: row.setmealId,
            currentDate: this.currentDate,
            startDate: this.getStatisticsByPeriodOfTimeParams.startDate,
            endDate: this.getStatisticsByPeriodOfTimeParams.endDate
          }
        })
      },
      showChoseBuilding() {
        //将临时写字楼ID赋值给参数
        for (let o in  this.getStatisticsByPeriodOfTimeParams.buildingIdList) {
          this.tempChoseBuildingId[o] = this.getStatisticsByPeriodOfTimeParams.buildingIdList[o].toString()
        }
        //此处是checkbox的一个诡异BUG，不能跟随他绑定的对象同步刷新。所以我强制刷新一下这个复选框组。
        this.buildingAllFlag = false;
        this.$nextTick(function () {
          this.buildingAllFlag = true;
        })
        this.choseBuildingFlag = true;
      },
      //查询按钮回调方法
      searchSetmealStatistics() {
        this.getStatisticsByPeriodOfTime()
      },
      //清除已选择的写字楼
      clearBuilding() {
        this.getStatisticsByPeriodOfTimeParams.buildingIdList = [];
        this.tempChoseBuildingId = [];
      },
      //删除单个写字楼
      delateSingalBuilding(index) {
        this.getStatisticsByPeriodOfTimeParams.buildingIdList.splice(index, 1);
      },
      //全选写字楼
      choseAll() {
        if(this.tempChoseBuildingId.length<this.buildingList.length){
          for (let o in this.buildingList) {
            this.tempChoseBuildingId[o] = this.buildingList[o].buildingId;
          }
        }
        else if(this.tempChoseBuildingId.length == this.buildingList.length){
          this.tempChoseBuildingId = [];
        }

        //此处是checkbox的一个诡异BUG，不能跟随他绑定的对象同步刷新。所以我强制刷新一下这个复选框组。
        this.buildingAllFlag = false;
        this.$nextTick(function () {
          this.buildingAllFlag = true;
        })
      },
      handleClose() {
        this.choseBuildingFlag = false;
      },
      handleCurrentChange(index) {
        this.getStatisticsByPeriodOfTimeParams.pageIndex = index;
        this.getStatisticsByPeriodOfTime();
      },
      //确认写字楼选择
      ensureBuildingChose() {
        this.flushFlag = false;
        this.getStatisticsByPeriodOfTimeParams.buildingIdList = [];
        //将临时写字楼ID赋值给参数
        for (let o in this.tempChoseBuildingId) {
          this.getStatisticsByPeriodOfTimeParams.buildingIdList[o] = this.tempChoseBuildingId[o].toString()
        }
        this.flushFlag = true;
        //关闭对话框
        this.choseBuildingFlag = false;
        //清空临时
        this.tempChoseBuildingId = []
      },
      //根据时间段获取套餐销售统计（订单统计表）
      getStatisticsByPeriodOfTime() {
        let flag = true;
        if (this.getStatisticsByPeriodOfTimeParams.startDate !== '' && this.getStatisticsByPeriodOfTimeParams.endDate !== '') {
          if (this.getStatisticsByPeriodOfTimeParams.endDate < this.getStatisticsByPeriodOfTimeParams.startDate) {
            flag = false;
            this.$message.error("结束日期要在开始日期之前")
          }
        }
        if (flag) {
          this._httpPasser(
            'orderStatisticsController/getStatisticsByPeriodOfTime',
            'post',
            this.getStatisticsByPeriodOfTimeParams,
            (data) => {
              this.getStatisticsByPeriodOfTimeParams.totalAmount = data.result.totalAmount;
              this.getStatisticsByPeriodOfTimeParams.totalProfit = data.result.totalProfit;
              this.setMeauStatistics = data.result.list;
              this.setMeauStatistics.reverse();
              for (let o in this.setMeauStatistics) {
                this.setMeauStatistics[o].profitsProportion = data.result.proportion;
              }
              //设置日期段
              this.showDate = this.$local.setDateSegment(this.getStatisticsByPeriodOfTimeParams.startDate, this.getStatisticsByPeriodOfTimeParams.endDate)
              this.pageParams.pageTotal = data.pageTotal;
              this.pageParams.totalRecord = data.totalRecord;
            },
            true,
            () => {
              this.setMeauStatistics = []
              //设置日期段
              this.showDate = this.$local.setDateSegment(this.getStatisticsByPeriodOfTimeParams.startDate, this.getStatisticsByPeriodOfTimeParams.endDate)
              this.pageParams.pageIndex = 0;
              this.pageParams.pageTotal = 0;
              this.pageParams.totalRecord = 0;
            }
          )
        }

      },
      //表格合计方法
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          if (index === 3) {
            sums[index] = '-';
            return;
          }
          if (index === 4) {
            sums[index] = this.getStatisticsByPeriodOfTimeParams.totalAmount;
            return;
          }
          if (index === 6) {
            sums[index] = this.getStatisticsByPeriodOfTimeParams.totalProfit;
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      //获取写字楼列表
      getBuildingListByShopId() {
        this._httpPasser(
          'orderStatisticsController/getBuildingsByShopId',
          'get',
          {shopId: this.$local.sefetch('info').companyId},
          (data) => {
            this.buildingList = data.result;
            //生成写字楼字典表
            for (let o in this.buildingList) {
              this.buildingList[o].buildingId = this.buildingList[o].buildingId.toString();
              this.buildingDectory[this.buildingList[o].buildingId] = this.buildingList[o].buildingName;
            }
            //给用来获取套餐列表的参数：builidngId赋值
            this.buildingId = this.buildingList[0].buildingId.toString()
            //获取套餐列表
            this.getsetmealListShopId()
          },
          false,
          () => {
            this.buildingList = [];
            this.buildingDectory = [];
          }
        )
      },
      //获取套餐列表
      getsetmealListShopId() {
        this._httpPasser(
          'orderStatisticsController/getSetmealByShopId',
          'get',
          {
            shopId: this.$local.sefetch('info').companyId,
            buildingId: this.buildingId
          },
          (data) => {
            this.setmealList = data.result;
          },
          false,
          () => {
            this.setmealList = [];
          }
        )
      },
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204, callBackAnyCode) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              if (callBackAnyCode) {
                callBackAnyCode()
              }
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
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
        }
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              if (callBackAnyCode) {
                callBackAnyCode()
              }
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
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
        }

      }
    },
    mounted() {
      this.getBuildingListByShopId()
      this.getStatisticsByPeriodOfTime()
    }

  }
</script>

<style lang="less" scoped>
  #setMeauStatistics {
    .fl_section {
      float: left;
      margin-left: 20px;
    }
    .fl_section:first-child {
      float: left;
      margin-left: 0px;
    }
    .labelText {
      line-height: 30px;
      font-size: 14px;
      font-weight: bold;
      margin-right: 8px;
    }
    .title {
      line-height: 45px;
      height: 45px;
      font-size: 16px;
    }
    .chosedBuilding {
      width: 100%;
      margin: 10px 0px 10px 0px;
      background-color: rgba(242, 242, 242, 0.5);
      border: dashed #4e9cfd 1px;
      line-height: 45px;
      font-size: 14px;
      text-indent: 15px;
      .buildingTag {
        border: solid 1px #e0e0e0;
        margin-right: 8px;
        border-radius: 2px;
        padding: 5px;
      }
    }
    .buildingChecbox {
      margin-right: 15px;
    }
    .pagestyle {
      line-height: 30px;
    }
  }
</style>
<style lang="less">
  #setMeauStatistics {
    .el-input {
      width: 135px;
    }
    .buildingTag {
      i {
        padding: 0px;
        margin: 0px;
        width: 5px !important;
        cursor: pointer;
      }
    }
    .el-input:last-child {
      width: 165px;
    }
    .el-dialog {
      border-radius: 6px;
      line-height: 35px;
      .el-dialog__footer {
        text-align: center;
      }
      .el-dialog__header {
        text-align: center;
        font-size: 15px;
      }
      .checkAll {
        .el-checkbox {
          color: #45a0ff;
        }
      }
      .el-dialog__body {
        padding: 0px 0px 20px 50px;
        color: #0e43af;
        font-size: 14px;
      }
    }

  }
</style>

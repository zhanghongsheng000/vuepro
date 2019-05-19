<template>
  <div id="setMeauStatistics">
    <div class="title">
      <el-button type="text" icon="el-icon-arrow-left" @click="toBuildingGroupList">返回</el-button> <span>{{tableTitle}}订单列表</span>
    </div>
    <div class="clear10"></div>
    <el-table
      :data="setMeauStatistics"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index">
      </el-table-column>
      <!--:index="indexMethod"-->
      <el-table-column
        prop="orderNum"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="下单时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="setmealNum"
        label="订单内套餐总数量(份)">
      </el-table-column>
      <el-table-column
        prop="thisSetmealNum"
        :label="'其中'+getOrderSetmealParams.setmealName+'数量(份)'">
      </el-table-column>
      <el-table-column
        prop="setmealAmount"
        label="订单内套餐总金额(元)">
      </el-table-column>
      <el-table-column
        prop="thisSetmealAmount"
        :label="'其中'+getOrderSetmealParams.setmealName+'金额(元)'">
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
        <span>共{{pageParams.pageTotal}}页，当前第{{pageParams.pageIndex}}页,每页{{pageParams.pageSize}}条，共{{pageParams.totalRecord}}条</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "set-meau-statistics",
    data() {
      return {
        setMeauStatistics: [

        ],
        //选择写字楼标记
        choseBuildingFlag: false,
        pageParams: {
          pageIndex: 0,
          pageTotal: 0,
          totalRecord: 0,
          pageSize:30
        },
        getOrderSetmealParams:{
          shopId:this.$local.sefetch('info').companyId,
          setmealId:this.$route.query.setmealId,
          setmealName:this.$route.query.setmealName,
          startDate:this.$route.query.startDate,
          endDate:this.$route.query.endDate,
          currentDate:this.$local.getDay('yyyy-MM-dd'),
          pageIndex:1,
          pageSize:30
        }
      }
    },
    computed:{
      tableTitle:function(){
        let re = this.getOrderSetmealParams.setmealName+'套餐'
        let dateSegment = this.$local.setDateSegment(this.getOrderSetmealParams.startDate,this.getOrderSetmealParams.endDate)
        if(dateSegment===''){
          re = this.$local.getDay('yyyy年MM月dd')+re;
        }
        else{
          re = dateSegment+re;
        }
        return re;
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      //返回上一页方法
      toBuildingGroupList() {
        this.$router.back()
      },
      handleClose() {
      },
      handleCurrentChange(index) {
        this.getOrderSetmealParams.pageIndex = index;
        this.getOrderSetmealDetail()
      },
      //获取某时间段某套餐订单列表
      getOrderSetmealDetail(){
        if((this.getOrderSetmealParams.startDate==''||this.getOrderSetmealParams.startDate==null)&&(this.getOrderSetmealParams.endDate==''||this.getOrderSetmealParams.endDate==null)){
          this.getOrderSetmealParams.startDate = this.getOrderSetmealParams.currentDate;
          this.getOrderSetmealParams.endDate = this.getOrderSetmealParams.currentDate;
        }
        this._httpPasser(
          'settlement/getOrderSetmealDetail',
          'get',
          this.getOrderSetmealParams,
          (data)=>{
            this.pageParams.pageTotal = data.pageTotal;
            this.pageParams.totalRecord = data.totalRecord;
            this.setMeauStatistics = data.result;
          },
          true,
          ()=>{
            this.pageParams.pageTotal = 0;
            this.pageParams.totalRecord = 0;
            this.setMeauStatistics = [];
          }
        )
      },
      //表格合计方法
      getSummaries(param) {
        const { columns, data } = param;
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
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204,callBackAnyCode) {
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
              if(callBackAnyCode){
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
                    message: data.result ? data.result : data.resultCodeDesc,
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
                  message: data.result ? data.result : data.resultCodeDesc,
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
              if(callBackAnyCode){
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
                    message: data.result ? data.result : data.resultCodeDesc,
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
                  message: data.result ? data.result : data.resultCodeDesc,
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
    mounted(){
      this.tableTitle = this.$local.getDay('yyyy年MM月dd');
      this.getOrderSetmealDetail()
    }

  }
</script>

<style lang="less" scoped>
  #setMeauStatistics {
    .title {
      line-height: 45px;
      height: 45px;
      font-size: 16px;
    }
    .pagestyle {
      line-height: 30px;
    }
  }
</style>
<style lang="less">
  #setMeauStatistics {
  }
</style>

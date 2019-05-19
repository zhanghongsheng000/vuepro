<template>
  <div class="mainPart paymentNoticeDetial" id="paymentNoticeDetial" style="width: 1040px;padding: 0">
    <el-button type="text" icon="el-icon-arrow-left" @click="goback">返回</el-button>
    <template>
      <el-table ref="paymentResults" :data="paymentResults" style="width: 100%"   @expand-change = "handleExpandChange">
        <el-table-column type="expand" >
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
        <el-table-column label="房间名称" prop="buildingRoomName">
        </el-table-column>
        <el-table-column label="房东" prop="landlord">
        </el-table-column>
        <el-table-column label="租客" prop="renter">
        </el-table-column>
        <el-table-column label="总费用" prop="total">
        </el-table-column>
        <el-table-column label="查看明细">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRowClick(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="clear20"></div>
    <el-button v-if="isUnPublish" type="primary" @click="publishNoticePayment">全部发布</el-button>
    <div class="clearfix pt20">
      <div class="clearfix">
        <div class="fl" >
          <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="feeNoticeParams.pageTotal">
          </el-pagination>
        </div>
        <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
          <span>共{{this.feeNoticeParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.feeNoticeParams.totalRecord}}条</span>
        </div>
        <!--<div class="fl" style="margin-top: -6px;margin-left: 40px">-->
          <!--<el-button type="primary" @click="goback">返回</el-button>-->
        <!--</div>-->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search-payment-record",
    data() {
      return {
        feeList:[],
        feeNoticeParams:{
          feenoticeId:this.$route.query.feenoticeId,
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
        isUnPublish:this.$route.query.isUnPublish,
        paymentResults: [
        ]
      }
    },
    methods:{
      getFeeNoticeRoom(){
        this._http('propertyCompany/getFeeNoticeRoom','get',{
          feenoticeId:this.feeNoticeParams.feenoticeId,
          pageIndex:this.feeNoticeParams.pageIndex,
          pageSize:this.feeNoticeParams.pageSize
        },(data)=>{
          this.paymentResults = data.result;
          this.feeNoticeParams.pageTotal  = data.pageTotal
          this.feeNoticeParams.totalRecord =data.totalRecord
          this.feeNoticeParams.pageIndex = data.pageIndex
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
      //row为当前展开行，expandedRows为所有已经展开的行
      handleExpandChange(row, expandedRows){
        if(expandedRows.length>1){
          expandedRows.shift()
        }
        /*//如果所有已展开行包含当前展开行，则说明是展开操作，执行查询。否则不执行
        let index = expandedRows.indexOf(row)
        if(index!==-1 || expandedRows.length==0){
          this.getFeeNoticeRoomDetail(row.feeNoticeRoomId,index)
        }*/
      },
      //获取服务器数据并将其转化为当前展开行的数据。feeNoticeRoomId为当前请求所需的参数。index为当前行在所有数据中的索引值，方便写入
      getFeeNoticeRoomDetail(feeNoticeRoomId,callback){
        this._http('propertyCompany/getFeeNoticeRoomDetail','get',{feeNoticeRoomId:feeNoticeRoomId},(data)=>{
          //服务器数据
          let tempFeeArray = data.result;
          this.feeList = data.result
          //获取当前展开行的数据。以方便添加写入
          let currentRow = null;
          for(let o in this.paymentResults){
            if(feeNoticeRoomId==this.paymentResults[o].feeNoticeRoomId){
              currentRow = this.paymentResults[o];
              break;
            }
          }
          if(currentRow!=null){
            for(let o in tempFeeArray){
              for(let p in tempFeeArray[o]){
                //通过前缀+名字的拼接获取本地数据名称
                let myItemName = this.getFeeNameFromfeeItemId(tempFeeArray[o].feeItemId) + this.changeAjaxDataNameToMine(p);
                //赋值
                if(tempFeeArray[o][p]===null || tempFeeArray[o][p]===''){
                  currentRow[myItemName] = '——'
                }
                else{
                  if(p == 'feeStandard'){
                    currentRow[myItemName] = tempFeeArray[o][p]+tempFeeArray[o].unit;
                  }
                  else{
                    currentRow[myItemName] = tempFeeArray[o][p];
                  }

                }

              }
            }
            callback();
          }
        })
      },
      handleCurrentChange(index){
        this.feeNoticeParams.pageIndex = index;
        this.getFeeNoticeRoom()
      },
      //发布缴费公告
      publishNoticePayment(){
        this._http(
          'propertyCompany/setPublish',
          'get',
          {ids:this.feenoticeId},
          (data)=>{
            if(data.resultCode==200){
              this.$message.success(data.resultCodeDesc)
            }
            else{
              this.$message.error(data.resultCodeDesc)
            }
          }
        )
      },
      //根据feeItemId为所有缴费项添加前缀
      getFeeNameFromfeeItemId(feeItemId){
        let re = ''
        switch(feeItemId){
          case 1:re = 'managementFee';break;
          case 2:re = 'waterRent';break;
          case 3:re = 'electricFee';break;
          case 4:re = 'heatingFee';break;
          case 5:re = 'airConditioningFee';break;
        }
        return re;
      },
      //将服务器传回缴费项名字转化为本地名字
      changeAjaxDataNameToMine(itemName){
        let re = 'itemName';
        switch(itemName){
          case 'feeStandard':re = 'Standard';break;
          case 'feeOne':re = 'HouseArea';break;
          case 'feetwo':re = 'Region';break;
          case 'feeThree':re = 'MonthSum';break;
          case 'feeFour':re = 'PrevMeterData';break;
          case 'feeFive':re = 'CurrentMeterData';break;
          case 'amount':re = 'StressPayment';break;
        }
        return re;
      },
      goback(){
        this.$router.push({path:'searchPaymentNotice'})
      },
      //行点击事件
      handleRowClick(row){
        this.getFeeNoticeRoomDetail(row.feeNoticeRoomId,()=>{
          this.$refs.paymentResults.toggleRowExpansion(row)
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
      this.getFeeNoticeRoom()
    }

  }
</script>

<style scoped lang="less">
  /*.mainPart {*/
    /*width: 1200px;*/
  /*}*/

  .paymentNoticeDetial {
    line-height: 25px;
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
        /*.managementFee .typeName {*/
          /*background-image: url("../../../../../assets/img/IntelligentProperty/iconPropertypayment_bg.png");*/
        /*}*/
        /*.waterRent .typeName {*/
          /*background-image: url("../../../../../assets/img/IntelligentProperty/icon_Waterpayment.png");*/
        /*}*/
        /*.electricFee .typeName {*/
          /*background-image: url("../../../../../assets/img/IntelligentProperty/icon_Elecpayment.png");*/
        /*}*/
        /*.heatingFee .typeName {*/
          /*background-image: url("../../../../../assets/img/IntelligentProperty/icon_Warmpayment.png");*/
        /*}*/
        /*.airConditioningFee .typeName {*/
          /*background-image: url("../../../../../assets/img/IntelligentProperty/icon_Mechpayment.png");*/
        /*}*/
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
    .el-pagination {
      text-align: center;
    }
  }
  #paymentNoticeDetial{
    width:1040px;
  }
</style>
<style lang="less">
  #paymentNoticeDetial{
    .el-form-item__content {
      line-height: 30px;
      position: relative;
      font-size: 14px;
    }
    .resultTable .resultTbody .resultBlock:last-child{
      height: 200px;
      width: 208px;
      border: 1px solid #dedede;
      margin: 5px 0;
    }
    .resultTable .resultTbody .resultBlock .resultContent{
      margin: 0;
      padding-left: 6px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .resultTable .resultTbody .resultBlock{
      border: none;
    }
    .PropertyIndex .el-form-item{
      margin-bottom: 0px;
    }
    .el-table__expanded-cell[class*=cell]{

    }
    .el-table__expanded-cell{
      padding:0;
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

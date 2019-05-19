<template>
  <div class="mainPart paymentNoticeDetial" id="paymentNoticeDetial">
    <template>
      <el-table ref="paymentResults" :data="paymentResults" style="width: 100%" @row-click="handleRowClick" @expand-change = "handleExpandChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="resultTable">
                <div class="resultTbody">
                  <el-form-item >
                    <div class="resultBlock managementFee">
                      <div class="resultContent">
                        <ul>
                          <li>物业费标准：{{props.row.managementFeeStandard}}</li>
                          <li>房间面积：{{props.row.managementFeeHouseArea}}㎡</li>
                          <li>缴费区间：{{props.row.managementFeeRegion}}</li>
                          <li>月份合计：{{props.row.managementFeeMonthSum}}</li>
                          <li>应缴物业费：{{props.row.managementFeeStressPayment}}元</li>
                        </ul>
                      </div>
                      <div class="typeName">
                        物业费
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item >
                    <div class="resultBlock waterRent white">
                      <div class="resultContent">
                        <ul>
                          <li>水费标准：{{props.row.waterRentStandard}}</li>
                          <li>上次表底：{{props.row.waterRentPrevMeterData}}</li>
                          <li>本次表底：{{props.row.waterRentCurrentMeterData}}</li>
                          <li>应交水费：{{props.row.waterRentStressPayment}}元</li>
                        </ul>
                      </div>
                      <div class="typeName">
                        水费
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item >
                    <div class="resultBlock electricFee">
                      <div class="resultContent">
                        <ul>
                          <li>电费标准：{{props.row.electricFeeStandard}}</li>
                          <li>上次表底：{{props.row.electricFeePrevMeterData}}</li>
                          <li>本次表底：{{props.row.electricFeeCurrentMeterData}}</li>
                          <li>应交电费：{{props.row.electricFeeStressPayment}}元</li>
                        </ul>
                      </div>
                      <div class="typeName">
                        电费
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item >
                    <div class="resultBlock heatingFee white">
                      <div class="resultContent">
                        <ul>
                          <li>取暖费标准：{{props.row.heatingFeeStandard}}</li>
                          <li>房间面积：{{props.row.heatingFeeHouseArea}}㎡</li>
                          <li>应缴取暖费：{{props.row.heatingFeeStressPayment}}元</li>
                        </ul>
                      </div>
                      <div class="typeName">
                        取暖费
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item >
                    <div class="resultBlock airConditioningFee">
                      <div class="resultContent">
                        <ul>
                          <li>空调费标准：{{props.row.airConditioningFeeStandard}}</li>
                          <li>房间面积：{{props.row.airConditioningFeeHouseArea}}㎡</li>
                          <li>应交空调费：{{props.row.airConditioningFeeStressPayment}}元</li>
                        </ul>
                      </div>
                      <div class="typeName">
                        空调费
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
      </el-table>
    </template>
    <div class="clear20"></div>
    <el-button v-if="isUnPublish" type="primary" @click="publishNoticePayment">全部发布</el-button>
    <div class="clear20"></div>
<!--    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>-->
  </div>
</template>

<script>
  export default {
    name: "search-payment-record",
    data() {
      return {
        feenoticeId:this.$route.query.feenoticeId,
        isUnPublish:this.$route.query.isUnPublish,
        paymentResults: [
        ]
      }
    },
    methods:{
      getFeeNoticeRoom(){
        this._http('propertyCompany/getFeeNoticeRoom','get',{feenoticeId:this.feenoticeId},(data)=>{
          this.paymentResults = data.result;
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
      //行点击事件
      handleRowClick(row){
        console.log(row)
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
      margin-top: 20px;
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
            opacity: 0.3;
          }
        }
        .managementFee .typeName {
          background-image: url("../../../../../assets/img/IntelligentProperty/iconPropertypayment_bg.png");
        }
        .waterRent .typeName {
          background-image: url("../../../../../assets/img/IntelligentProperty/icon_Waterpayment.png");
        }
        .electricFee .typeName {
          background-image: url("../../../../../assets/img/IntelligentProperty/icon_Elecpayment.png");
        }
        .heatingFee .typeName {
          background-image: url("../../../../../assets/img/IntelligentProperty/icon_Warmpayment.png");
        }
        .airConditioningFee .typeName {
          background-image: url("../../../../../assets/img/IntelligentProperty/icon_Mechpayment.png");
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
    .el-pagination {
      text-align: center;
    }
  }
  #paymentNoticeDetial{
    width:1040px;
  }
</style>
<style>
  #paymentNoticeDetial .el-table th {
    text-align: left;
  
	   .el-table__expanded-cell[class*=cell]{
	    padding: 0;
	  }
	   .el-form-item__content {
	    line-height: 30px;
	    position: relative;
	    font-size: 14px;
	
	  }
	  .resultTable .resultTbody .resultBlock:last-child{
	    height: 200px;
	    width: 236px;
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
  }
</style>

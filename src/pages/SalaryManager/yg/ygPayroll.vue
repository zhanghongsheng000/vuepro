<template>
  <div class="ygpayroll ygpayrollcontainer">
    <div class="banner">
      <div class="bantext">
        <p>薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</p>
      </div>
    </div>
    <div class="ygpay-wrap">
      <div class="main common">
        <div class="main-cont">
          <el-collapse  accordion v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="titles fl">
                  2018  今年实发工资(元)：{{allmoney}}
                </div>
              </template>
              <div class="gz-items" v-for="(item,index) in dataList" :key="index">
                <div class="gz-item">
                  <div class="months"><span>{{item.month}}</span>  月</div>
                  <div class="item-top clearfix">
                    <div class="money fl">
                      <strong>应发工资：{{item.monthsalary_payment}}元</strong>
                      <strong>实发工资：<span>{{item.monthsalary_realpayment}}</span>元</strong>
                    </div>
                    <div class="times fr">{{item.pay_date}}</div>
                  </div>
                  <div class="item-tables">
                    <el-table :data="item.list" style="width: 100%">
                      <el-table-column v-for="items,index in labelList" :key="index" :label="items" :prop="items" ></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        activeNames:['1'],
        labelList:[],//头部
        dataList:[],//内容
        allmoney:'',//全年实发工资
      }
    },
    methods:{

    },
    created(){
      let employeeId = this.$local.sefetch('info').userId
      let companyId = this.$local.sefetch('info').companyId
      this.$http.post('salary/getEmployeePayrollByYear',{
        year:'2018',//年份
        companyId,//公司id
        employeeId//员工id
      })
        .then(res=>{
          let data = res.data
          // console.log(data)
          if (data.resultCode == '200') {
            this.allmoney=data.result.yearsalary_realpayment  //全年实发工资
            this.labelList=data.result.labelList   //头部
            this.dataList=data.result.dataList    //内容
            console.log(this.labelList)
            // console.log(this.dataList)
          } else if(data.resultCode == '204'){
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'success'
            });
          } else{
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
</script>
<style lang="less" scoped>
.ygpayroll{
  .banner{
    height: 500px;
    background:url("../../../assets/img/SalaryManager/yggzt.png") center center no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    .bantext{
      text-align: center;
      color:#fff;
      padding-top: 130px;
      p{
        font-size: 60px;
      }
    }
  }
  .ygpay-wrap{
    /*background-color: #eeeeee;*/
    background-color: #ccc;
    margin-bottom: -140px;
    .main{
      background-color: #fff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      position: relative;
      top: -140px;
    }
    .main-cont{
      padding: 20px;
      min-height: 300px;
    }
    /*1313*/
    .gz-items{
      .gz-item{
        padding:10px;
        position: relative;
        border:solid 1px #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        &:hover{
          /*background-color: #ccc;*/
        }
        .months{
          position:absolute;
          left: 12px;
          top: -2px;
          width: 118px;
          height: 47px;
          background:url("../../../assets/img/SalaryManager/yggz.png") left top no-repeat;
          color:#fff;
          text-align: center;
          line-height: 47px;
          span{
            font-size:22px;
            line-height: 47px;
          }
        }
        .item-top{
          font-size: 14px;
          line-height: 40px;
          .money{
            margin-left:130px;
            strong{
              margin-right: 10px;
              span{
                font-size: 16px;
              }
            }
          }
        }
        .item-tables{
          padding: 1px 1px -1px 1px;
          border:solid 1px #ccc;
          border-radius: 5px;
        }
      }

    }
  }

}
</style>
<style lang="less">
  .ygpayrollcontainer{
    .ygpay-wrap{
      .el-collapse{
        border:none;
      }
      .el-collapse-item__header{
        border-bottom:none;
      }
      .el-collapse-item__wrap{
        border-bottom:none;
      }
      .titles{
        padding-left: 486px;
      }
      .el-collapse-item__header{
        background-color:#3681fd;
        color:#fff;
      }
    }
  }

</style>

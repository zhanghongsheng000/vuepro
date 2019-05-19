<template>
  <div class="main-cont">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text">账务管理</span>
    </div>
    <div class="main-middle clearfix">
      <div class="left-cont fl">
        <p class="money-text">账户余额(元)</p>
        <p class="money-num">{{money}}</p>
      </div>
      <div class="right-cont fr">
        <router-link class="link-item item-icon5" :to="{path:'accountsManage/nameConfirm'}"></router-link>
        <router-link class="link-item item-icon1" :to="{path:'accountsManage/setPaw'}"></router-link>
        <router-link class="link-item item-icon2" :to="{path:'accountsManage/bindcard-one'}"></router-link>
        <router-link class="link-item item-icon3" :to="{path:'accountsManage/extract-one'}"></router-link>
        <router-link class="link-item item-icon4" :to="{path:'accountsManage/recharge-one'}"></router-link>
      </div>
    </div>
    <div class="tables">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="编号" width="80" :index="indexMethod"></el-table-column>
        <el-table-column prop="createtime" label="日期" width="300"></el-table-column>
        <el-table-column prop="info" label="事由"></el-table-column>
        <el-table-column prop="amountDesc" label="交易金额"></el-table-column>
      </el-table>
      <!--<el-pagination
        layout="prev, pager, next"
        @current-change="pagesChange"
        :total="num">
      </el-pagination>-->
    </div>
    <div class="clearfix" v-if="num>0?true:false" style="padding-top:10px;">
      <div class="pages fl" >
        <el-pagination layout="prev, pager, next" background :total="num" @current-change="pagesChange"></el-pagination>
      </div>
      <div class="fl pagestyle">
        <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.totalRecord}}条数据</span>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';

  export default {
    data() {
      return {
        money: '',
        identity: '',
        tableData: [],//table数据
        totalRecord: '',//总条数
        pageTotal:'',//总页数
        pageNow:1,//当前页
      }
    },
    computed: {
      num() {
        return parseInt(this.totalRecord)
      }
    },
    methods: {
      indexMethod(index) {
        return (this.pageNow - 1)*30 + 1 + index;
      },
      openup() {
        let ids = this.$local.sefetch('info').userId
        let tel = this.$local.sefetch('info').telPhone
        return this.$http2.post('asset/register', {//开通支付账号接口
          userId: ids,
          telphone: tel
        })
          .then(res => {
            if (res.data.resultCode == '200') {
              this.identity = res.data.result
              this.$local.sesave('identity', res.data.result)
              return res.data.result
            } else if(res.data.resultCode == '204'){
              this.$message({showClose: true, message: res.data.resultCodeDesc, type: 'success'});
            }else {
              this.$message({showClose: true, message: res.data.resultCodeDesc, type: 'error'});
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getOrderList(nums) {//获取table列表
        let times = new Date().getTime()
        let userId = this.$local.sefetch('info').userId
        let userTel = this.$local.sefetch('info').telPhone
        this.openup().then(res => {
          this.$http2.post('asset/orderList', {
            identity: res,
            createtime: times,
            sign: md5(userId + res  + times + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
            pageIndex: nums
          })
            .then(res => {
              let data = res.data
              if (data.resultCode == '200') {
                this.tableData = data.result
                this.totalRecord = data.totalRecord
                this.pageTotal = data.pageTotal
              } else if(data.resultCode == '204'){
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
              }else {
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err => {console.log(err)})
        })
      },
      pagesChange(currentPage) {//分页
        this.pageNow = currentPage
        this.getOrderList(currentPage)
      }
    },
    created() {
      let times = new Date().getTime()
      let userId = this.$local.sefetch('info').userId
      let userTel = this.$local.sefetch('info').telPhone
      this.openup().then(res => {
        this.$http2.post('asset/getInfo', {//获取账务信息
          identity: res,
          createtime: times,
          sign: md5(userId + res  + times + 'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.money = data.result.amount
              this.$local.sesave('pwdInit', data.result.pwdInit)//是否设置交易密码
              this.$local.sesave('isID', data.result.isIdCardAuth)//是否实名认证 isIdCardAuth
              this.$local.sesave('isBank', data.result.isBankCardAuth)//是否绑卡 isBankCardAuth 4月3日注释
            } else if(data.resultCode == '204'){
              this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
            } else {
              this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
            }
          })
          .catch(err => {console.log(err)})
      })
      this.getOrderList(1)
    }
  }
</script>

<style lang="less" scoped>
  .improveButton{
    color:#e44f4f;
  }
  .pagestyle{
    line-height:30px;
  }
  .main-cont {
    padding: 30px 0px 20px 0px;
    min-height: 300px;
  }

  .top-title {
    margin-bottom: 20px;
    .line {
      height: 1px;
      background-color: #ccc;
      margin-bottom: -17px;
    }
    .top-text {
      margin-left: 25px;
      font-size: 14px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
  }

  .main-middle {
    margin-bottom: 25px;
    .left-cont {
      padding-top: 24px;
      .money-text {
        font-size: 14px;
      }
      .money-num {
        font-size: 48px;
        color: #f18f69;
      }
    }
    .right-cont {
      font-size: 0;
      .link-item {
        display: inline-block;
        width: 120px;
        height: 120px;
        margin-left: 15px;
        font-size: 20px;
      }
      .item-icon1 {
        background: url("../../assets/img/SalaryManager/item-icon1.png");
      }
      .item-icon2 {
        background: url("../../assets/img/SalaryManager/item-icon2.png");
      }
      .item-icon3 {
        background: url("../../assets/img/SalaryManager/item-icon3.png");
      }
      .item-icon4 {
        background: url("../../assets/img/SalaryManager/item-icon4.png");
      }
      .item-icon5 {
        background: url("../../assets/img/SalaryManager/item-icon5.png");
      }
    }
  }
</style>

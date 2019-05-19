<template>
  <div class="ygpayroll ygaccountcontainer">
    <div class="banner">
      <div class="bantext">
        <p>薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</p>
      </div>
    </div>
    <div class="ygpay-wrap">
      <div class="main common">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data(){
      return {
        money:'',
        identity:'',
        tableData: [],//table数据
        totalRecord:'',//总条数
      }
    },
    computed:{
      num(){
        return parseInt(this.totalRecord)
      }
    },
    methods:{
      openup(){
        let ids = this.$local.sefetch('info').userId
        let tel = this.$local.sefetch('info').telPhone
        return this.$http2.post('asset/register',{//开通支付账号接口
          userId:ids,
          telphone:tel
        })
          .then(res=>{
            if(res.data.resultCode=='200'){
              this.identity=res.data.result
              this.$local.sesave('identity',res.data.result)
              return res.data.result
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            } else{
              this.$message({
                showClose: true,
                message: res.data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      getOrderList(nums){//获取table列表
        let times=new Date().getTime()
        let userName = this.$local.sefetch('info').userName
        let userTel = this.$local.sefetch('info').telPhone
        this.openup().then(res=>{
          this.$http2.post('asset/orderList',{
            identity:res,
            createtime:times,
            sign:md5(userName+userTel+times+res+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t'),
            // pageSize:30,
            pageIndex:nums
          })
            .then(res=>{
              let data = res.data
              console.log(data)
              if(data.resultCode=='200'){

                this.tableData=data.result
                this.totalRecord = data.totalRecord
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
        })
      },
      pagesChange(currentPage){//分页
        this.getOrderList(currentPage)
      }
    },
    created(){
      let times=new Date().getTime()
      let userName = this.$local.sefetch('info').userName
      let userTel = this.$local.sefetch('info').telPhone
      ////
      this.openup().then(res=>{
        this.$http2.post('asset/getInfo',{//获取账务信息
          identity:res,
          createtime:times,
          sign:md5(userName+userTel+times+res+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
        })
          .then(res=>{
            let data = res.data
            console.log(data)
            if(data.resultCode=='200'){
              this.money=data.result.amount
              this.$local.sesave('pwdInit',data.result.pwdInit)//是否设置交易密码
              this.$local.sesave('isID',data.result.isIdCardAuth)//是否实名认证 isIdCardAuth
              this.$local.sesave('isBank',data.result.isBankCardAuth)//是否绑卡 isBankCardAuth
            } else if(data.resultCode == '204'){
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
            } else{
              this.$message({
                showClose: true,
                message:data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      })
      this.getOrderList(1)
    }
  }
</script>
<style lang="less" scoped>
  .ygpayroll{
    .banner{
      height: 500px;
      background:url("../../../assets/img/SalaryManager/ygzwgl.png") center center no-repeat;
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
      background-color: #eeeeee;
      margin-bottom: -140px;
      .main{
        background-color: #fff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: relative;
        top: -140px;
      }
      .top-title{
        margin-bottom: 20px;
        .line{
          height: 1px;
          background-color: #ccc;
          margin-bottom: -17px;
        }
        .top-text{
          margin-left: 25px;
          font-size: 18px;
          background-color: #fff;
          padding:0 4px;
          line-height: 30px;
        }
      }
      .main-middle{
        margin-bottom: 25px;
        .left-cont{
          padding-top: 24px;
          .money-text{
            font-size: 14px;
          }
          .money-num{
            font-size:48px;
            color:#f18f69;
          }
        }
        .right-cont{
          font-size:0;
          .link-item{
            display:inline-block;
            width: 120px;
            height: 120px;
            margin-left:15px;
            font-size: 20px;
          }
          .item-icon1{background:url("../../../assets/img/SalaryManager/item-icon1.png");}
          .item-icon2{background:url("../../../assets/img/SalaryManager/item-icon2.png");}
          .item-icon3{background:url("../../../assets/img/SalaryManager/item-icon3.png");}
          .item-icon4{background:url("../../../assets/img/SalaryManager/item-icon4.png");}
          .item-icon5{background:url("../../../assets/img/SalaryManager/item-icon5.png");}
        }
      }
    }
  }
</style>
<style lang="less">
  .ygaccountcontainer{
    .ygpay-wrap{
      .main{
        padding:20px;
      }
    }
  }
</style>

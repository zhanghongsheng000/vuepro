<template>
  <div class="salary-wrap salary-wrapcontainer">
    <div class="sal-top ">
      <div class="common clearfix">
        <!--<div class="back fl">返回居金所</div>-->
        <div class="hello fr">{{companyName}}&nbsp;&nbsp;&nbsp;&nbsp;你好，{{userName  }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="quitLogin">退出</a></div>
      </div>
    </div>
    <div class="nav">
      <div class="common clearfix">
        <h1 class="fl logo-content"><a href="javascript:;" class="logo fl"></a></h1>
        <div class="nav-list fr">
          <router-link class="list-item fl" to="/SalaryManager/cw/home">首页</router-link>
          <!--<a href="javascript:;" class="list-item fl">薪资管理</a>-->
          <div class="mycenter xzgl fl" @mouseover="showSalary" @mouseout="hideSalary">
            <div><a href="javascript:;" class="center-text">薪资管理</a></div>
            <ul class="show-center show-xzgl" v-show="SalaryShow">
              <li><router-link :to="{name:'cwxzsz'}">薪资参数设置</router-link></li>
              <li><router-link :to="{name:'cwygxzgl'}">员工薪资管理</router-link></li>
              <li><router-link :to="{name:'cwzdgzb'}">制定工资表</router-link></li>
              <li><router-link :to="{name:'cwffgzList'}">发放工资</router-link></li>
              <li><router-link :to="{name:'cwgzbcx'}">工资表查询</router-link></li>
            </ul>
          </div>
          <router-link class="list-item fl" :to="{name:'CwAccountsManage'}">账务管理</router-link>
          <div class="mycenter fl" @mouseover="showBox" @mouseout="hideBox">
            <div><a href="javascript:;" class="center-text">个人中心</a></div>
            <ul class="show-center" v-show="isShow">
              <li><router-link :to="{name:'CwmodifyPassword'}">修改密码</router-link> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="fot-black">
      <footer-bar></footer-bar>
    </div>
  </div>
</template>
<script>
  import footerBar from '@/components/SalaryManager/footer'
  export default {
    data(){
      return {
        isShow:false,
        SalaryShow:false,
        companyName:'',
        userName:''
      }
    },
    components:{
      footerBar
    },
    created(){
      this.companyName=this.$local.sefetch('info').companyName
      this.userName = this.$local.sefetch('info').userName
    },
    methods:{
      quitLogin(){
        this.$local.sesave("info", null)
        this.$local.sesave("pwdInit", null)
        this.$local.sesave("isID", null)
        this.$local.sesave("isBank", null)
        this.$local.sesave("identity", null)
        this.$router.push("/")
      },
      showBox(){
        this.isShow=true
      },
      hideBox(){
        this.isShow=false
      },
      showSalary(){
        this.SalaryShow=true
      },
      hideSalary(){
        this.SalaryShow=false
      }
    }
  }
</script>
<style lang="less" scoped>
  .salary-wrap{
    font-size: 14px;
    .sal-top{
      height: 36px;
      line-height: 36px;
      background-color: #000000;
      color:#999999;
      .back{
        padding-left: 23px;
        background:url("../../../assets/img/SalaryManager/back.png") 3px center no-repeat;
        cursor: pointer;
        &:hover{
          color:#3681fd;
        }
      }
      .hello a{
        color:#999999;
        &:hover{
          color:#3681fd;
        }
      }
    }
    .nav{
      height: 80px;
      background-color: #d3cbc4;
      line-height: 80px;
      .logo{
        width: 320px;
        height: 80px;
        background:url("../../../assets/img/SalaryManager/daifgz.png") left center no-repeat;
      }
      .nav-list{
        font-size: 16px;
        .list-item.active{
          color:#3681fd;
        }
        .list-item{
          color:#000000;
          margin-left: 45px;
          &:hover{
            color:#3681fd;
          }
        }
      }
      .center-text{
        color:#000;
        /*margin-right:20px;*/
      }
      .mycenter{
        position: relative;
        margin-left: 45px;
        width: 90px;
        .show-center{
          position: absolute;
          right: 0;
          width: 90px;
          text-align: center;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          li{
            height: 34px;
            line-height: 34px;
            background-color: #fff;
            .active{
              background-color: #3681fd;
              color:#fff;
            }
            a{
              font-size:14px;
              color:#000;
              display:inline-block;
              width: 100%;
              height: 100%;
              position: relative;
              top:-1px;
              &:hover{
                background-color: #3681fd;
                color:#fff;
              }
            }
          }
        }
      }
      .xzgl{
        width: 64px;
        .show-xzgl{
          right:-30px;
          width:126px;
        }
      }
    }

    .fot-black{
      background-color: #3b3b3b;
    }
  }
</style>


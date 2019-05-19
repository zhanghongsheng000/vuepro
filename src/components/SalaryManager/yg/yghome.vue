<template>
  <div class="yghome-cont">
    <div class="banner">
      <div class="describe">
        <h4>什么是薪管家？</h4>
        <p>“薪管家”是居金所推出的一款针对中小微企业代发员工工资，企业员工通过“薪管家”在线查收工资明细。员工利用闲置工资对企业发型的理财产品再次支持企业发展的一款产品。</p>
        <div class="black">
          <span>薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</span>
        </div>
      </div>
      <div class="to-bottom">
        <a href="javascript:;"><i class="el-icon-arrow-down"></i></a>
      </div>
    </div>
    <div class="content">
      <div class="common">
        <h5>在薪管家发现你工资的秘密武器</h5>
        <div class="cont-list clearfix">
          <div class="item fl">
            <img src="../../../assets/img/SalaryManager/h-icon1.png" alt="">
            <h6>一键查看</h6>
            <p>手机下载APP，工资明细秒看懂</p>
          </div>
          <div class="item fl">
            <img src="../../../assets/img/SalaryManager/h-icon2.png" alt="">
            <h6>与企业共发展</h6>
            <p>我的企业我支持</p>
          </div>
          <div class="item fl">
            <img src="../../../assets/img/SalaryManager/h-icon3.png" alt="">
            <h6>方便快捷</h6>
            <p>工资发没发，不问财务也知道</p>
          </div>
          <div class="item fl">
            <img src="../../../assets/img/SalaryManager/h-icon4.png" alt="">
            <h6>钱生钱</h6>
            <p>理财方式谁家好，要选就选薪金宝</p>
          </div>
        </div>
      </div>
    </div>
    <div class="download-cont">
      <div class="common clearfix">
        <div class="qrcode-cont fr">
          <div class="img-code">
            <img src="../../../assets/img/SalaryManager/qyzj.png" alt="">
          </div>
          <p>扫码下载居金所</p>
        </div>
        <div class="qrcode-cont fr">
          <div class="img-code">
            <img src="../../../assets/img/SalaryManager/jjs.png" alt="">
          </div>
          <p>扫码下载薪管家</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="less" scoped>
.yghome-cont{
  .banner{
    height:724px;
    background:url("../../../assets/img/SalaryManager/sal-banner.png") center center no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: 96px;
    .describe{
      width: 386px;
      padding: 76px;
      height: 386px;
      border:solid 6px #958275;
      margin-left: auto;
      margin-right: auto;
      color:#fff;
      margin-bottom: 76px;
      h4{
        font-size: 48px;
        line-height: 1;
        margin-bottom: 50px;
        text-align: center;
        font-weight:normal;
      }
      p{
        font-size: 16px;
        line-height: 36px;
      }
      .black{
        padding-top: 76px;
        text-align: center;
        span{
          display: inline-block;
          width: 240px;
          height: 30px;
          background-color: #000;
          line-height: 30px;
          font-size: 16px;
        }
      }
    }
    .to-bottom{
      text-align: center;
      a{
        display: inline-block;
        width: 42px;
        height: 42px;
        background-color: #3681fd;
        border-radius: 50%;
        i{
          color:#fff;
          font-size: 28px;
          line-height: 42px;
        }
      }
    }
  }
  .content{
    background-color: #eeeeee;
    padding-top: 75px;
    padding-bottom: 100px;
    h5{
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 86px;
    }
    .cont-list{
      margin-right: -26px;
      .item{
        width: 280px;
        height: 300px;
        background-color: #fff;
        margin-right: 26px;
        text-align: center;
        padding-top: 80px;
        cursor: pointer;
        img{
          margin-bottom: 60px;
        }
        h6{
          font-size: 24px;
          line-height:1;
          margin-bottom: 26px;
          font-weight: normal;
        }
        p{
          font-size: 16px;
        }
      }
    }
  }
  .download-cont{
    height: 300px;
    background: url("../../../assets/img/SalaryManager/hbg2.png") center center no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    .qrcode-cont{
      margin-right: 60px;
      padding-top: 58px;
      .img-code{
        width: 142px;
        height: 142px;
        padding: 15px;
        border:solid 1px #7c7c7c;
        img{
          width:142px;
          height:142px;
        }
      }
      p{
        color:#fff;
        text-align: center;
        font-size: 14px;
        line-height: 3;
      }
    }
  }
}
</style>

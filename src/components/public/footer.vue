<template>
    <div class="log-footer">
        <!--<div class="about">
          <a href="javascript:;">关于我们</a>
          <span>-</span>
          <a href="javascript:;">联系我们</a>
          <span>-</span>
          <a href="javascript:;">人才招聘</a>
          <span>-</span>
          <a href="javascript:;">下载居金所APP</a>
        </div>-->
        <div class="phone-num">
          <div class="phone-t"><span><img src="../../assets/img/public/tel.png"/></span><span class="phone">400-010-0371</span></div>
        </div>
        <div class="company">
          <p>Copyright&nbsp;&nbsp;&nbsp©&nbsp;&nbsp;&nbsp2018&nbsp;&nbsp;All&nbsp;&nbsp;Rights&nbsp;&nbsp;河南居金所房地产营销策划有限公司&nbsp;&nbsp;版权所有</p>
          <p style="">地址：郑州市农业路经五路交叉口国际企业中心A座12A  \  东风南路创业路交叉口绿地之窗云峰A座1011</p>
        </div>
    </div>
</template>
<script>
  export default {}
</script>
<style lang="less" scoped>
.log-footer{
	padding-top: 40px;
  text-align: center;
  padding-bottom: 70px;
  color:#888888;
    .about{
      font-size:0;
      margin-bottom: 16px;
      a{
        font-size:12px;
        color:#888888;
        &:hover{
          color:#0f71ca;
        }
      }
      span{
        font-size:12px;
        margin:0 14px;
      }
    }
    .phone-num{
      margin-bottom: 20px;
    }
    .phone-t span{
      vertical-align: middle;
    }
    .phone-t img{
    	margin-top: 8px;
    	vertical-align: middle;
    }
    .phone{
      font-size:40px;
      margin-left: 12px;
    }
  }
  .company p{
  	color: #888888;
  	line-height: 24px;
  }
</style>

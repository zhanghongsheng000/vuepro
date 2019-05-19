<template>
  <div class="Business_container BusinessHome">
    <div class="index_container">
      <div class="index_header_container">
        <div class="index_header">
          <div class="logo fl"></div>
          <div class="fr user_login">
            <div class="hello fr">石家庄的大公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 用户名&nbsp;&nbsp;&nbsp;
              <a href="javascript:;">消息<span>5</span></a>&nbsp;&nbsp;&nbsp;
              <a href="javascript:;">退出</a>
            </div>
          </div>
        </div>
      </div>
      <div class="index_container">
        <div class="index_con common clearfix">
          <div class="indexCon_left fl"></div>
          <div class="indexCon_right fr">
            <div class="index_top clearfix">
              <div class="toBeDone fl">
                <div class="toBeDone_head">
                  <img src="../../assets/img/public/toBedone_icon.png" class="toBeDone_icon" />
                  <span class="toBeDone_title">我的待办</span>
                  <a href="javascript:;" class="fr more">+更多</a>
                </div>
                <div class="toBeDone_body">
                  <ul>
                    <li>
                      <a href="javascript:;">7月工资表等待审核<span class="dates fr">2018年8月20号</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">您的物业费该交了<span class="dates fr">2018年8月20号</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">有7个申请通行通知待处理<span class="dates fr">2018年8月20号</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">荣鼎天下房租待处理<span class="dates fr">2018年8月20号</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="intelligentMessage fl">
                <div class="toBeDone_head">
                  <img src="../../assets/img/public/intellgentMessage_icon.png" class="toBeDone_icon" />
                  <span class="toBeDone_title">我的待办</span>
                  <a href="javascript:;" class="fr more">+更多</a>
                </div>
                <div class="toBeDone_body">
                  <ul>
                    <li>
                      <a href="javascript:;">7月工资表等待审核<span class="dates fr">2018-8-20</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">您的物业费该交了<span class="dates fr">2018-8-20</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">有7个申请通行通知待处理<span class="dates fr">2018-8-20</span></a>
                    </li>
                    <li>
                      <a href="javascript:;">荣鼎天下房租待处理<span class="dates fr">2018-8-20</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="passger fl">
                <img src="../../assets/img/BusinessHome/passanger_title.png" />
              </div>
            </div>
            <div class="index_bottom clearfix">
              <div class="passerger_product fl">
                <div class="passerger_bg" @mousemove="show_passerger" @mouseleave="show_passerger1">
                  <h2>通行客<span>1</span></h2>
                  <div class="passerger_message" v-show="passerger_message">
                    <ul>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="intelligent_product fl">
                <div class="intelligent_bg" @mousemove="show_intelligent" @mouseleave="show_intelligent1">
                  <h2>智慧物业<span>1</span></h2>
                  <div class="intelligent_message" v-show="intelligent_message">
                    <ul>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="zjyf_produce fl">
                <div class="zjyf_bg" @mousemove="show_zjyf" @mouseleave="show_zjyf1">
                  <h2>租金月付<span>5</span></h2>
                  <div class="zjyf_message" v-show="zjyf_message">
                    <ul>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="salary_product fl">
                <div class="salary_bg" @mousemove="show_salary" @mouseleave="show_salary1">
                  <h2>贷发工资<span>4</span></h2>
                  <div class="salary_message" v-show="salary_message">
                    <ul>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                      <li class="fl">
                        <a href="javascript:;">这里面是通知<span class="fr">8-20</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Businessheader from '@/components/BusinessHome/BusinessHome'
  import footer from '@/components/public/footer'
  import { $gImgUrl } from '@/assets/js/gUrl'
  export default {
    name: "business-home",
    data() {
      return {
      }
    },
    components: {
      Businessheader,
      'v-footer': footer

    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .index_container {
    width: 100%;
    /*头部*/
    .index_header_container {
      width: 100%;
      border-bottom: 5px solid #85b6fc;
      .index_header {
        width: 1200px;
        margin: 0 auto;
        height: 70px;
      }
      .logo {
        margin-top: 7px;
        background: url(../../../build/logo.png);
        background-size: 192px 61px;
        width: 192px;
        height: 61px;
        cursor: pointer;
      }
      .user_login {
        padding: 30px 0;
        color: #666666;
        a {
          font-size: 12px;
          color: #666666;
          span {
            color: #ff0100;
            margin-left: 5px;
            font-weight: 600;
          }
        }
      }
    }
    /*内容部分*/
    .index_container {
      background: #f2f2f2;
      width: 100%;
      min-height: 700px;
      .indexCon_left {
        width: 150px;
        background: #0F71CA;
        height: 700px;
      }
      .indexCon_right {
      	padding-bottom: 80px;
        .toBeDone {
          .toBeDone_head {
            .toBeDone_icon {
              vertical-align: middle;
            }
            padding: 20px 0 0 20px;
            .toBeDone_title {
              display: inline-block;
              margin-left: 15px;
              font-size: 18px;
              color: #000000;
            }
          }
          .toBeDone_body {
            ul {
              padding: 10px 20px;
              li a {
                font-size: 14px;
                line-height: 30px;
                color: #666666;
              }
              a:hover {
                color: #1168e1;
              }
            }
          }
          .more {
            font-size: 12px;
            line-height: 26px;
            color: #000000;
            padding: 0px 30px;
          }
        }
        .intelligentMessage {
          .toBeDone_head {
            .toBeDone_icon {
              vertical-align: middle;
            }
            padding: 20px 0 0 20px;
            .toBeDone_title {
              display: inline-block;
              margin-left: 15px;
              font-size: 18px;
              color: #000000;
            }
          }
          .toBeDone_body {
            ul {
              padding: 10px 20px;
              li a {
                font-size: 14px;
                line-height: 30px;
                color: #666666;
              }
              a:hover {
                color: #1168e1;
              }
            }
          }
          .more {
            font-size: 12px;
            line-height: 26px;
            color: #000000;
            padding: 0px 30px;
          }
        }
        .toBeDone,
        .intelligentMessage {
          margin-top: 13px;
          width: 375px;
          height: 190px;
          background: #FFFFFF;
          border-radius: 5px;
        }
        .intelligentMessage,
        .passger {
          margin-left: 13px;
          margin-top: 13px;
        }
        /*下半部分*/
        .index_bottom {
          margin-top: 10px;
          .passerger_product,
          .intelligent_product,
          .zjyf_produce,
          .salary_product {
            text-align: center;
            width: 260px;
            height: 479px;
            background-size: 260px 479px;
            cursor: pointer;
          }
          .passerger_product h2,
          .intelligent_product h2,
          .zjyf_produce h2,
          .salary_product h2 {
            padding-top: 20px;
          }
          .passerger_product h2 span,
          .intelligent_product h2 span,
          .zjyf_produce h2 span,
          .salary_product h2 span {
            display: inline-block;
            font-size: 12px;
            width: 16px;
            height: 16px;
            margin-left: 5px;
            border-radius: 50%;
            background: #FF0100;
            color: #FFFFFF;
          }
          .passerger_product {
            background: url(../../assets/img/BusinessHome/passanger_pic.png);
          }
          .intelligent_product {
            background: url(../../assets/img/BusinessHome/intelligent_pic.png);
          }
          .zjyf_produce {
            background: url(../../assets/img/BusinessHome/zjyf_pic.png);
          }
          .salary_product {
            background: url(../../assets/img/BusinessHome/salary_pic.png);
          }
          .passerger_bg,
          .intelligent_bg,
          .zjyf_bg,
          .salary_bg {
            width: 260px;
            height: 479px;
          }
          .passerger_bg:hover,
          .intelligent_bg:hover,
          .zjyf_bg:hover,
          .salary_bg:hover {
            background: rgba(23, 108, 226, 0.5);
            width: 260px;
            height: 479px;
            background-size: 260px 479px;
            h2 {
              color: #FFFFFF;
            }
          }
          ul {
            padding-top: 30px;
            li {
              display: inline-block;
              text-align: left;
              padding-left: 20px;
              width: 215px;
              font-size: 14px;
              line-height: 30px;
              a {
                color: #FFFFFF;
              }
            }
          }
        }
        .index_top {
          margin-bottom: 220px;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="index_top clarfix">
      <div class="toBeDone fl">
        <div class="toBeDone_head">
          <img src="../../../assets/img/public/toBedone_icon.png" class="toBeDone_icon" />
          <span class="toBeDone_title">我的待办</span>
          <a href="javascript:;" class="fr more">+更多</a>
        </div>
        <div class="toBeDone_body">
          <ul>
            <!--<li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>
            <li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>
            <li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>
            <li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>
            <li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>
            <li>
              <a href="javascript:;"><span class="dates fr"></span></a>
            </li>-->
          </ul>
        </div>
      </div>
      <div class="intelligentMessage fl">
        <div class="toBeDone_head">
          <img src="../../../assets/img/public/intellgentMessage_icon.png" class="toBeDone_icon" />
          <span class="toBeDone_title">物业通知</span>
          <a href="javascript:;" class="fr more" @click="toPropertyCompanyNotice">+更多</a>
        </div>
        <div class="toBeDone_body">
          <ul>
            <li class="clearfix" v-for="(notice,index) in noticeListresult" :key="index" @click="toNoticeDetails(notice.noticeId,notice.sender,notice.title,notice.info,notice.createTime)">
              <a  class="fl noticelength" :title="notice.title">{{notice.title}}</a>
              <span class="dates fr">{{notice.createTime.slice(0,10)}}</span>
              <!--{{notice.create_time.split(' ')[0]}}-->
            </li>
          </ul>
        </div>
      </div>
      <div class="passger fl intelligentMessage">
        <div v-show="noNotice">
          <img src="../../../assets/images/index/intelligent_title.png"  style="margin-left: 52px;"/>
          <!--<JJS-AD :url="url" width="295px" height="230px" style='overflow: hidden;'></JJS-AD>-->
        </div>
        <div v-show="isShow">
          <div class="toBeDone_head">
            <img src="../../../assets/img/public/intellgentMessage_icon.png" class="toBeDone_icon" />
            <span class="toBeDone_title">居金所通知</span>
            <a href="javascript:;" class="fr more" @click="toPropertyCompanyNoticejjs">+更多</a>
          </div>
          <div class="toBeDone_body">
            <ul>
              <li class="clearfix" v-for="(notice,index) in noticeListresultjjs" :key="index" @click="toNoticeDetailsjjs(notice.customer_notice_id,notice.sender,notice.title,notice.info,notice.create_time)">
                <a  class="fl noticelength" :title="notice.title">{{notice.title}}</a>
                <span class="dates fr">{{notice.create_time.slice(0,10)}}</span>
                <!--{{notice.create_time.split(' ')[0]}}-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="index_bottom clearfix">
      <div class="passerger_product fl">
        <div class="passerger_bg" @mousemove="show_passerger" @mouseleave="show_passerger1">
          <h2>物业费在线收缴系统<span>0</span></h2>
          <h3>高效化精准化管理</h3>
          <div class="passerger_message clearfix" v-show="passerger_message">
            <ul>
              <!--<li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>-->
            </ul>
            <div class="know_more" @click="topasserger">
              <button>了解更多</button>
            </div>
          </div>
        </div>
      </div>
      <div class="intelligent_product fl">
        <div class="intelligent_bg" @mousemove="show_intelligent" @mouseleave="show_intelligent1">
          <h2>通行客<span>0</span></h2>
          <h3>为安全高效通行而生</h3>
          <div class="intelligent_message clearfix" v-show="intelligent_message">
            <ul>
              <!--<li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>-->
            </ul>
            <div class="know_more" @click="tointelligent">
              <button>了解更多</button>
            </div>
          </div>
        </div>
      </div>
      <div class="zjyf_produce fl">
        <div class="zjyf_bg" @mousemove="show_zjyf" @mouseleave="show_zjyf1">
          <h2>无感通行<span>0</span></h2>
          <h3>无需扫码自动扣付</h3>
          <div class="zjyf_message clarfix" v-show="zjyf_message">
            <ul>
              <!--<li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>
              <li class="fl">
                <a href="javascript:;"><span class="fr"></span></a>
              </li>-->
            </ul>
            <div class="know_more" @click="tozjyf">
              <button>了解更多</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  /* import videojs from 'video.js'*/
  /*import 'videojs-contrib-hls'*/

  export default {
    name: "index",
    data() {
      return {
        getCompanyNoticeparams: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        },
        url:"ad/getAdList",
        passerger_message: false,
        intelligent_message: false,
        zjyf_message: false,
        salary_message: false,
        noticeList: [], //物业通知列表数据
        noticeListresult: [],
        noticeListjjs: [], //物业通知列表数据
        noticeListresultjjs: [],
        pageIndex: '1',
        pageSize: '30',
        noNotice: false,
        isShow: true,
      }
    },
    methods: {
      toPropertyCompanyNotice() { //跳转到物业发出通知的列表页面
        this.$router.push({
          path: 'noticeList',
        })
      },
      toPropertyCompanyNoticejjs() { //跳转到居金所发出通知的列表页面
        this.$router.push({
          path: 'noticeListjjs',
        })
      },
      myNeed() {
        this.$httpPasser.post('message/getBacklogList', {
          shopId: 13639, //公司id
        })
          .then(res => {
            const data = res.data
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getNoticeBulletin() { //物业通知
        this.$httpPasser.post('message/getSendedNotice', {
          shopId: this.getCompanyNoticeparams.shopId,
          content: this.content,
          start: this.start,
          end: this.end,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          const data = res.data
          console.log(data)
          if(data.resultCode == '200') {
            this.noticeList = data.result;
            this.noticeListresult = this.noticeList.slice(0, 6)
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      getNoticejjs() { //居金所通知
        this.$httpPasser.post('message/getJJSNoticeList', {
          userId: this.getCompanyNoticeparams.userId,
          shopId: this.getCompanyNoticeparams.shopId,
          content: this.content,
          start: this.start,
          end: this.end,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          const data = res.data
          console.log(data)
          if(data.resultCode == '200') {
            this.noticeListjjs = data.result;
            this.noticeListresultjjs = this.noticeListjjs.slice(0, 6)
            this.noNotice = false;
            this.isShow = true;
          }else{
            this.noNotice = true;
            this.isShow = false;
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      toNoticeDetails(noticeId, sender, title, info, createTime) {
        this.$router.push({
          path: 'noticeDetails',
          query: {
            noticeId: noticeId,
            sender: sender,
            title: title,
            info: info,
            createTime: createTime,
          }
        })
      },
      toNoticeDetailsjjs(noticeId, sender, title, info, createTime) {
        this.$router.push({
          path: 'noticeDetailsjjs',
          query: {
            noticeId: noticeId,
            sender: sender,
            title: title,
            info: info,
            createTime: createTime,
          }
        })
      },
      show_passerger() { //显示
        this.passerger_message = true;
      },
      show_passerger1() {
        this.passerger_message = false;
      },
      show_intelligent() { //显示
        this.intelligent_message = true;
      },
      show_intelligent1() {
        this.intelligent_message = false;
      },
      show_zjyf() {
        this.zjyf_message = true;
      },
      show_zjyf1() {
        this.zjyf_message = false;
      },
      show_salary() {
        this.salary_message = true;
      },
      show_salary1() {
        this.salary_message = false;
      },
      topasserger() { //跳转物业缴费
        this.$router.push({
          path: '/PropertyCompany/PropertyManageSystem/IntelligentProperty/PaymentProperty'
        })
      },
      tointelligent() { //跳转通行客
        this.$router.push({
          path: '/PropertyCompany/PropertyManageSystem/IntelligentProperty/Passer'
        })
      },
      tozjyf() { //跳转无感通行
        //this.$router.push({path:'/PropertyCompany/PropertyManageSystem/IntelligentProperty/PaymentProperty/Property'})
      }
    },
    created() {
      this.getNoticeBulletin()
      this.getNoticejjs()//居金所通知
      // this.myNeed()
    }
  }
</script>

<style scoped lang="less">
  .indexCon_right {
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
          padding: 10px 28px;
          list-style: none;
          li {
            /*list-style: url(../../../assets/images/index/list_style.png);*/
            background: url("../../../assets/images/index/list_style.png") left center no-repeat;
            padding-left: 15px;
            a {
              font-size: 14px;
              line-height: 27px;
              color: #666666;
            }
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
        /*&:hover{
          color:#1168e1;
        }*/
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
          padding: 10px 28px;
          span {
            font-size: 14px;
            line-height: 30px;
            color: #666666;
            cursor: pointer;
          }
          li {
            /*list-style: url(../../../assets/images/index/list_style.png);*/
            /*background: url("../../../assets/images/index/list_style.png") left center no-repeat;*/
            list-style: none;
            /*padding-left: 15px;*/
            a {
              font-size: 14px;
              line-height: 27px;
              color: #666666;
            }
            a:hover {
              color: #1168e1;
            }
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
      width: 350px;
      height: 230px;
      background: #FFFFFF;
      border-radius: 5px;
    }
    .intelligentMessage,
    .passger {
      margin-left: 13px;
      margin-top: 13px;
    }
    .intelligentMessage:nth-child(3) {
      width: 300px;
    }
    /*下半部分*/
    .index_bottom {
      margin-top: 10px;
      .know_more {
        position: absolute;
        margin-top: 230px;
        margin-left: 120px;
        background: #badbfc;
        border-radius: 20px;
        button {
          width: 110px;
          height: 36px;
          background: #badbfc;
          border-radius: 20px;
          color: #2d84fc;
          cursor: pointer;
        }
      }
      .intelligent_product,
      .zjyf_produce {
        margin-left: 15px;
      }
      .passerger_product,
      .intelligent_product,
      .zjyf_produce,
      .salary_product {
        text-align: center;
        width: 336px;
        height: 439px;
        cursor: pointer;
      }
      .passerger_product h2,
      .intelligent_product h2,
      .zjyf_produce h2,
      .salary_product h2 {
        padding-top: 20px;
      }
      .passerger_product h3,
      .intelligent_product h3,
      .zjyf_produce h3,
      .salary_product h3 {
        color: #666666;
        line-height: 40px;
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
        background: url(../../../assets/images/index/list_passenger.png);
      }
      .intelligent_product {
        background: url(../../../assets/images/index/list_salaryintell.png);
      }
      .zjyf_produce {
        background: url(../../../assets/images/index/list_passin.png);
      }
      .salary_product {
        background: url(../../../assets/images/index/list_salary.png);
      }
      .passerger_bg,
      .intelligent_bg,
      .zjyf_bg,
      .salary_bg {
        width: 336px;
        height: 439px;
      }
      .passerger_bg:hover,
      .intelligent_bg:hover,
      .zjyf_bg:hover,
      .salary_bg:hover {
        background: rgba(29, 112, 227, 0.9);
        width: 336px;
        height: 439px;
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
          width: 180px;
          font-size: 14px;
          line-height: 30px;
          list-style: none;
          a {
            color: #FFFFFF;
          }
        }
      }
    }
    .noticelength {
      cursor: pointer;
      width: 160px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

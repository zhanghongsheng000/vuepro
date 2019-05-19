<template>
  <div class="Business_container BusinessHome">
    <Businessheader></Businessheader>
    <div class="swiper">
      <div class="welcome">
        <h2>欢迎登录一站式企业服务平台</h2>
        <p>居金所以提供企业服务特别是企业金融服务为己任， 致力于提供“简单、安全、快速”的企业金融服务解决方案，助力企业可持续发展。</p>
      </div>
    </div>
    <div class="nav_container">
      <div class="links-items">
        <div class="links-cont clearfix">
          <div class="link-item fl links-bg1" @click="tonewpage(3)"></div>
          <div class="link-item fl links-bg2" @click="tonewpage(2)">
            <div class="bg-link "></div>
          </div>
          <div class="link-item fl links-bg3">
            <div class="sm-links sm-link-bg1 "  @click="tonewpage(6)"></div>
            <div class="sm-links sm-link-bg2 "  @click="tonewpage(5)"></div>
          </div>
          <!--<div class="nav_part1 fl">-->
          <!--<img src="../../assets/img/BusinessHome/Coming soon.jpg"/>-->
          <!--<p>-->
          <!--<a href="javascript:;">敬请期待</a>-->
          <!--</p>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="Business_content">
      <div class="incontainer">
        <div class="content_title">
          <h3>一站式企业服务平台，强大的功能展现，一步实现多项功能</h3>
        </div>
        <div class="content_cot">
          <p>
            居金所帮企业按月支付（收取）房租，帮助企业按时发放工资，一键缴纳物业费、水费、电费、空调取暖费，私人订制般招聘您所需要的最适合员工。缓解企业资金压力，提升企业资金使用率，盘活企业资金，以企业金融服务为己任，提供多种企业金融服务解决方案，助力企业可持续发展。</p>
        </div>
      </div>
    </div>
    
    <div class="describe-box">
      <el-dialog :title="mes" :visible.sync="dialogVisible" width="1200" :close-on-click-modal="false" top="15vh" center>
        <div class="p_style" v-html="dialogInfo.info"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="applypoduct">立即申请</el-button>
        </span>
      </el-dialog>
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
        getBuildingGroupParams: {
          companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          telPhone: this.$local.sefetch('info') ? this.$local.sefetch('info').telPhone : '',
          userRealName: this.$local.sefetch('info') ? this.$local.sefetch('info').userRealName : '',
        },
        mes: '',
        dialogVisible: false,
        customerRoleId: '',
        roleName: '',
        baseProductId: '',
        currentRouterObj: [],
        description: [], //返回的产品信息
        isdfgz:true,//贷发工资对勾
        istxk:false,//通行客对勾
        iswyf:false,//物业费用在线手缴系统对勾
        gImgUrl: $gImgUrl,
        //产品列表
        productList: [],
        dialogInfo: {
          pic_web: '',
          info: '',
          pic: '',
          baseProductId: '',
          name: ''
        },
        //控制跳转登录的一级跳转 产品_角色-路由 字典 主键为产品_角色
        toRouter: this.$store.state.toRouter,
        //检验是否有权限跳入子页面的 角色-路由  字典 主键为角色。是每个角色的根路由
        permissionRouter: this.$store.state.permissionRouter,
        //实际要跳转进入的页面。角色-路由  字典 主键为角色 是每个角色的首页路由
        businessHomeToRouter: this.$store.state.businessHomeToRouter
      }
    },
    components: {
      Businessheader,
      'v-footer': footer

    },
    methods: {
      /*
      index指的是产品ID，具体字典如下
      '1':'智慧物业',
      '2':'贷发工资',
      '3':'租金月付',
      '5':'智能缴费',
      '6':'通行客',
      * */
      tonewpage(index) {
        let productObj = {};
        productObj.productId = index;
        productObj.productName = this.$store.state.productIdNameDectonary[index];
        this.$local.sesave('productInfo',productObj);
        if(this.currentRouterObj[index]) {
          let key = index + '_' + this.currentRouterObj[index]
          if(this.toRouter[key]) {
            if(this.permissionRouter[this.currentRouterObj[index]] == '/BusinessHome') {
              this.$message.error('您的旅途就只能停留在这个页面了哦，如需进一步探索请切换用户！')
            } else {

              this.$router.push(this.businessHomeToRouter[this.currentRouterObj[index]])
            }
          }
        } else {
          if(index==3){
//           this.dialogInfo = ""
//           let msg = this.dialogInfo.info;
            this.dialogInfo.info = "<p style='text-indent: 2em'>以居金所租赁托管平台为依托，立足“真房源、真房东、真租客”的作业原则，通过租金月付产品实现企业按月付房租、房东按年收房租，改变写字楼企业按季、半年、年支付房租的现状，缓解企业资金压力，简化房东收租过程，实现企业、房东资金双赢。</p>";
            this.mes = this.dialogInfo.name;
            this.dialogInfo.baseProductId=3;
            this.dialogVisible = true;
          }else if(index==2){
            this.dialogInfo.info = "<p style='text-indent: 2em'> 利用支付技术帮助小微企业发放员工工资。通过工资发放考察企业经营水平及能力，实现企业信贷金融产品的贷中监管；通过记录企业工资发放情况形成企业征信数据，银行可向企业发放工资贷款。</p>";
            this.mes = this.dialogInfo.name;
            this.dialogVisible = true;
            this.dialogInfo.baseProductId=2;
            this.dialogVisible = true;
          } else if(index==6){
            this.dialogInfo.info = "<p style='text-indent: 2em'>通行客为写字楼人员出入写字楼的电子通行证，通过下载通行客APP，进行实名认证后生成二维码电子钥匙，在闸机刷码即可打开写字楼闸门。通过物业公司为每个写字楼安装电子闸机，利用物联网技术实现人员在写字楼中实名通行，通过智慧停车场管理实现人员车辆在车库的实名通行。通行客实现物业对写字楼的高效化和精准化管理。通行+支付。</p>";
            this.mes = this.dialogInfo.name;
            this.dialogVisible = true;
            this.dialogInfo.baseProductId=6;
          }
          else if(index==5){
            this.dialogInfo.info = "<p style='text-indent: 2em'>通过智慧物业管理系统帮助写字楼物业公司实现物业费、水电费的代收代缴，通过物业费、水电费的缴纳考察企业运营实力、还款能力</p>"
            this.mes = this.dialogInfo.name;
            this.dialogVisible = true;
            this.dialogInfo.baseProductId=5;
          }
        }
      },
      //获取产品列表接口
      getProductList() {
        this.$http.post('production/selectProdutionBycompanyId', {
          companyId: this.getBuildingGroupParams.companyId
        }).then((res) => {
          if(res.data.resultCode == 200) {
            this.productList = res.data.result;
            /*for(let o in this.description){
                          if(this.description[o].baseProductId ==index ){
                            this.dialogInfo = this.description[o]
                            let msg = this.dialogInfo.info;
                            this.dialogInfo.info =msg.replace(/<\/?[^>]*>/g, '');
                          }
                        }*/
            //this.dialogVisible = true;
          }

        }).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      //补全图片路径
      setAllImgUrl(url) {
        return $gImgUrl + url;
      },
      //申请适用产品
      applypoduct() {
        this.$http.post('baseData/saveClient', {
          telphone: this.getBuildingGroupParams.telPhone,
          name: this.getBuildingGroupParams.userRealName,
          type: this.dialogInfo.baseProductId
        }).then((res) => {
          if(res.data.resultCode == 200) {
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            })
          }
          this.dialogVisible = false;
        })
      },
    },
    mounted() {
      let temp = this.$local.sefetch('info').roleList;
      for(let o in temp) {
        this.currentRouterObj[temp[o]['baseProductId']] = temp[o]['customerRoleId'];
        this.currentRouterObj
      }
      this.getProductList()
//    console.log($gImgUrl)
    }
  }
</script>

<style lang="less" scoped>
  .ceshiceshi {
    a {
      margin: 0 10px;
      font-size: 14px
    }
  }

  .Business_container {
    width: 100%;
    .fl{
      float: left;
    }
    .nav_part1 {
      margin-left: 20px;
      cursor: pointer;
      p {
        position: absolute;
        margin-top: -120px;
        margin-left: 40px;
        a {
          font-size: 18px;
          color: #000000;
        }
      }
    }
    .swiper {
      margin-top: 20px;
      background: url(../../assets/img/BusinessHome/Businesshome.jpg) center;
      width: 100%;
      height: 540px;
      min-width: 1200px;
      padding-top: 100px;
      .welcome {
        margin: 0 auto;
        background: #FFFFFF;
        opacity: 0.8;
        text-align: center;
        width: 736px;
        height: 229px;
        h2 {
          font-size: 43.47px;
          line-height: 108px;
          color: #3d82bc;
          letter-spacing: 2px;
        }
        p {
          padding: 0px 53px;
          font-size: 16px;
          line-height: 30px;
          color: #000000;
        }
      }
    }
    .nav_container {
      width: 1200px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 14px 0;
      border-radius: 5px 5px 0 0;
      position: relative;
      margin-top: -75px;
      cursor: pointer;
      .links-items {
        margin-bottom: 10px;
        .links-cont {
          margin-right: -20px;
        }
        .link-item {
          width: 380px;
          height: 130px;
          margin-left: 15px;
          position: relative;
        }
        .links-bg1 {
          background: url("../../assets/img/BusinessHome/zjyf_bg.png") left top no-repeat;
        }
        .links-bg2 {
          background: url("../../assets/img/BusinessHome/dfzg_bg.png") left top no-repeat;
          cursor: pointer;
          .bg-link {
            position: absolute;
            right: 0;
            top: 0;
            width: 104px;
            height: 100px;
          }
        }
        .links-bg3 {
          background: url("../../assets/img/BusinessHome/zhwy_bg.png") left top no-repeat;
        }
        .sm-links {
          width: 200px;
          height: 41px;
          cursor: pointer;
          margin-right: 5px;
        }
        .sm-link-bg1 {
          background: url("../../assets/img/passenger/txk.png") left top no-repeat;
          float: right;
          margin-top: 20px;
          margin-bottom: 5px;
        }
        .sm-link-bg1.link-active {
          background: url("../../assets/img/passenger/txknow.png") left top no-repeat;
        }
        .sm-link-bg2 {
          background: url("../../assets/img/passenger/wyf.png") left top no-repeat;
          float: right;
        }
        .sm-link-bg2.link-active {
          background: url("../../assets/img/passenger/wyfnow.png") left top no-repeat;
        }
      }
      .nav {
        width: 944px;
        margin: 0 auto;
        background: #FFFFFF;
        padding: 14px 0;
        border-radius: 5px 5px 0 0;
        position: relative;
        margin-top: -100px;
        .nav_part {
          cursor: pointer;
          margin-left: 13px;
          img {
            width: 245px;
            height: 128px;
          }
          p {
            position: relative;
            margin-top: -116px;
            margin-left: 160px;
            a {
              font-size: 18px;
              color: #000000;
            }
          }
        }
        .nav_part1 {
          margin-left: 13px;
          cursor: pointer;
          p {
            position: absolute;
            margin-top: -120px;
            margin-left: 40px;
            a {
              font-size: 18px;
              color: #000000;
            }
          }
        }
      }
    }
    .Business_content {
      background: #f3f3f3;
      width: 100%;
      margin-top: -92px;
      .incontainer {
        width: 1200px;
        margin: 0 auto;
        .Business_bottom {
          padding-bottom: 40px;
        }
        .content_title {
          text-align: center;
          h3 {
            padding-top: 100px;
            font-size: 30px;
            line-height: 60px;
          }
        }
        .content_cot {
          padding-bottom: 120px;
          p {
            padding-top: 20px;
            font-size: 18px;
            line-height: 36px;
            color: #929191;
          }
        }
        .bottom_nav {
          margin-top: 134px;
          .bottom_nav_part {
            width: 140px;
            margin-left: 28px;
            text-align: left;
            ul {
              li {
                a {
                  font-size: 16px;
                  line-height: 36px;
                  color: #000000;
                }
              }
            }
          }
        }
        .apply_con {
          margin-top: 80px;
          .zujin-apply {
            text-align: center;
            width: 280px;
            border: 1px solid #DEDEDE;
            padding-bottom: 20px;
            margin-left: 20px;
          }
          .zjappley-title {
            font-size: 16px;
            margin-top: 25px;
          }
          .zjapply-second-title {
            color: #999999;
            font-size: 14px;
            line-height: 32px;
            font-weight: 500;
          }
          .mb20 {
            margin-bottom: 20px;
          }
          .zujin-apply input {
            border: 1px solid #DEDEDE;
            border-radius: 20px;
            padding: 10px 20px;
            text-indent: 38px;
            font-size: 16px;
            color: #999999;
          }
          .zujin-apply button {
            width: 242px;
            height: 40px;
            border-radius: 20px;
            border: none;
            font-size: 16px;
            color: #FFFFFF;
            background: #3d82bc;
            margin-top: 18px;
            cursor: pointer;
          }
          .apply-num {
            font-size: 16px;
            display: inline-block;
            margin-top: 12px;
          }
        }
      }
    }
    .black {
      background: #3b3b3b;
    }
    .p_style {
      line-height: 30px;
    }
  }
</style>

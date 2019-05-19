<template>
    <div class="bindcard-contain">
      <div class="bindcard-width" >
        <div class="bindcard-title">
          <strong>绑卡</strong>
        </div>
        <div class="bindcard-con">
          <div class="bindcard-con-title">
            <span class="text">储蓄卡</span>
            <div class="line"></div>
          </div>
          <div class="bindcard-con-body">
            <div class="block-con clearfix radio-bank">
              <div class="radio-box fl" v-if="radio">
                <el-radio v-model="radio" :label="radio" border><img :src="require('../../assets/img/bank/'+getNow(radio)+'.png')" alt=""></el-radio>
              </div>
              <div class="other fl"  @click="dialogVisible = true">
                <a href="javascript:;">选择银行</a>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dialog
              title="选择银行"
              :visible.sync="dialogVisible"
              width="1000px"
              :modal-append-to-body='false'>
              <div class="bank-imgs clarfix" v-if="bankList.length">
                <div class="radio-bank fl" v-for="item,index in bankList">
                  <el-radio v-model="radio" :label="item.baseDataId" border >
                    <img :src="require('../../assets/img/bank/'+item.abbr+'.png')" alt="">
                  </el-radio>
                </div>
              </div>
              <div v-else>服务器错误</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">银行卡号：</label>
              </span>
              <div class="fl input-type">
                <el-input v-model.trim="bankNum" placeholder="请输入银行卡号"></el-input>
              </div>
              <span class="mi fl">*</span>
            </div>
            <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">银行预留手机号：</label>
              </span>
              <div class="fl input-type">
                <el-input v-model.trim="bankPhone" placeholder="请输入银行预留手机号"></el-input>
              </div>
              <span class="mi fl">*</span>
            </div>
            <div class="block-con clearfix">
              <span class="left-section fl same">
                <label for="">支行名称：</label>
              </span>
              <div class="fl input-type">
                <el-input v-model.trim="zhiHang" placeholder="请输入支行名称(非必填)"></el-input>
              </div>
            </div>
            <div class="btn-box">
              <el-button type="primary" @click="nextTab">下一步</el-button>
              <!--测试-->
              <!--<router-link :to="{name:'YgBindCardTwos'}" >测试下一步</router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import md5 from 'js-md5'
  export default {
    data(){
      return {
        dialogVisible:false,
        bankNum:'',//银行卡号
        zhiHang:'',//支行名称
        bankPhone:'',//银行预留手机号
        radio:'',//所选银行id
        bankList:[]//银行列表
      }
    },
    methods: {
      getBanks(){//获取银行
        this.$http.post('bank/getBank')
          .then(res=>{
            let data=res.data
            if(data.resultCode=='200'){
              // console.log(data)
              this.bankList=data.result
              // console.log(this.bankList)
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
      },
      getNow(index){
        for(var i=0;i<this.bankList.length;i++){
          if(this.bankList[i].baseDataId==index){
            return this.bankList[i].abbr
          }
        }
      },
      nextTab(){//下一步
        if(!this.radio){
          this.$message({
            showClose: true,
            message: '请选择银行',
            type: 'error'
          });
        }else if(this.bankNum==''){
          this.$message({
            showClose: true,
            message: '请输入银行卡号',
            type: 'error'
          });
        }else if(this.bankPhone==''){
          this.$message({
            showClose: true,
            message: '请输入手机号',
            type: 'error'
          })
        }else if(!/^0?1[3456789]\d{9}$/.test(this.bankPhone)){
          this.$message({
            showClose: true,
            message: '电话号码格式错误',
            type: 'error'
          })
        } else{
          let times=new Date().getTime()
          let userId = this.$local.sefetch('info').userId
          let userTel = this.$local.sefetch('info').telPhone
          let identity = this.$local.sefetch('identity')
          this.$http2.post('userBankCard/saveUserBankCard',{ //11.3 用户绑定银行卡接口
            identity:identity,
            telphone:this.bankPhone,
            bankNumber:this.getNow(this.radio),
            bankCode:this.bankNum,
            subbranch:this.zhiHang,
            createtime:times,
            sign:md5(userId+identity+times+'su1KU96573FKlt580404tU6XJDcA004oD2u75cgA33Q2W7I1542xR38XaI3t')
          })
            .then(res=>{
              let data=res.data
              if(data.resultCode=='200'){
                console.log(data)
                this.$router.push({path:'bindcard-twos',query:{bankNum:this.bankNum,requestno:data.result.requestno} })
                this.$message({
                  showClose: true,
                  message: '验证码发送成功',
                  type: 'success'
                });
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
    },
    component:{

    },
    created(){
      this.getBanks()

    }
  }
</script>
<style lang="less" scoped>
  /*背景 公共宽度*/
  .bindcard-contain{
    background: url("../../assets/img/public/bk.jpg") left -80px no-repeat;
    height: 810px;
    .bindcard-width{
      width: 100%;
      margin:0 auto;
    }
  }
  /*标题*/
  .bindcard-title strong{
    font-size: 28px;
    font-weight: 600;
    display: inline-block;
    padding: 40px 0 50px 0;
  }
  /*小标题 带线*/
  .bindcard-con-title{
    font-size: 16px;
    color: #333333;
    margin-bottom: 60px;
  }
  .line{
    height: 1px;
    background-color:#dbdbdb;
    margin-top: -10px;
  }
  .text{
    background-color: #fff;
    padding:0 10px;
    margin-left: 40px;
    line-height: 20px;
  }
  /*大框框*/
  .bindcard-con{
    background:#FFFFFF;
    min-height: 200px;
    padding: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    min-height:500px;
  }
  .radio-box{
    width: 150px;
    padding-left: 30px;
    position: relative;
    margin-right: 10px;
  }
  .other{
    cursor: pointer;
    margin-left: 10px;
    padding-right: 10px;
    line-height: 40px;
    a{color:#409EFF;
      margin-right: 10px;}
  }
  .bank-imgs{
    padding-top: 20px;
    height: 360px;
    overflow-y: auto;
    .radio-bank{
      margin-bottom: 20px;
    }
  }
  .mi{
    margin-left: 10px;
    padding-top: 8px;
    color:red;
    font-weight:bold;
    font-size: 24px;
  }
  .btn-box{
    text-align: center;
  }
  /**/
  .left-section{
    display: inline-block;
    width: 120px;
    text-align: right;
  }
  .same label{
    display: inline-block;
    margin-top: 10px;
    color: #666666;
    font-size: 14px;
  }
  .block-con{
    margin-bottom: 20px;
  }
  .block-con button{
    border: none;
    padding: 5px 8px;
    margin: 8px 0 0 10px;
    border-radius: 5px;
    color: #666666;
    cursor: pointer;
  }
  .input-type{
    margin-left: 10px;
  }
  .agree-con{
    text-align: center;
    margin-left: -500px;
  }
  .agree-con button{
    margin-bottom: 10px;
  }
  .agree-con a{
    color: #3a8ee6;
  }
  .age-btn{
    margin-top: 10px;
    background: #3a8ee6;
    color: #FFFFFF;
  }
  .compore{
    margin-top: 15px;
    margin-left: 12.5%;
  }
  .jy-input{
    margin-top: 10px;
  }
</style>
<style lang="less">
  /*银行选择按钮*/
.radio-bank{
  padding-left: 50px !important;
  .el-radio.is-bordered{
    padding:0;
  }
  .el-radio__input{
    position: absolute;
    top: 12px;
    left:-30px;
  }
  .el-radio__label{
    /*padding-left: 0;*/
  }
}
  .el-upload--picture-card{
    width: 200px;
    height: 120px;
  }
</style>

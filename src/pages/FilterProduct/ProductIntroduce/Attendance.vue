<template>
  <div id="PasserProductIntroduce">
    <div class="pageTitle">
      <div class="passenger_container">
        <div class="passenger">
          <h2>什么是考勤管理?</h2>
          <div class="clear20"></div>
          <p>
            考勤管理系统是基于物联网技术实现公司员工排班以及考勤报表分析的一款员工考勤产品。
            无需购买任何硬件设备，只需开通产品即可使用，考勤管理系统通过闸机通行记录智能生成员工考勤数据。
            公司考勤管理人员可通过系统灵活设置本公司考勤规则。
          </p>
        </div>
        <div style="text-indent:80px;">
          <el-button round type="primary" @click="openAttendance">立刻开通</el-button>
        </div>
        <div class="clear20"></div>
      </div>

    </div>
    <div class="">

    </div>
  </div>
</template>

<script>
  export default {
    name: "passer",
    data() {
      return {
        openParams: {
          shopId: this.$local.sefetch('info').companyId,
          userId: this.$local.sefetch('info').userId
        },
        info:this.$local.sefetch('info')?this.$local.sefetch('info'):{},
        productPath:this.$route.query.productRouter
      }
    },
    methods: {
      //获取产品列表接口
      getProductList(callBack) {
        this.$httpPasser.get('production/selectProdutionBycompanyId',
          {params:
              {
                companyId:this.openParams.shopId,
                customerUserId:this.openParams.userId
              }
          }

        ).then((res) => {
          if(res.data.resultCode == 200) {
            this.productList = res.data.result;
            if(callBack){
              callBack(res.data)
            }
          }
        }).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      openAttendance() {
        this.$httpPasser.get(
          'attendanceController/openAttendanceSystem',
          {params:this.openParams}
        ).then(
          res=>{
            if(res.data.resultCode == 200) {
              this.$message.success(res.data.resultCodeDesc)
              this.getProductList((data)=>{
                let roleList = data.result.userRoleList;
                delete this.info.roleList;
                this.info.roleList = roleList;
                this.$local.sesave('info',this.info)
                this.$router.push({path:this.productPath})
              })
            } else if(res.data.resultCode == 204) {
              this.$message.warning(res.data.resultCodeDesc)
              this.$router.push({path:this.productPath})
            }
          }
        ).catch(
          (err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          }
        )
      }
    },
    created(){
      console.log(this.productPath)
    }
  }
</script>

<style  lang="less" scoped>
  #PasserProductIntroduce{
    min-height:650px;
    width:100%;
    background: url(../../../assets/images/public/attendance_produce.png) no-repeat;
    background-position: 275px -24px;
    .passenger_container {
      width: 100%;
      .passenger {
        width: 708px;
        min-height: 300px;
        background-size: 708px;
        padding-left: 80px;
        h2 {
          line-height: 80px;
          height:80px;
          font-size:45px;
          font-weight:normal;
        }
        p {
          line-height: 30px;
          font-size:14px;
          width: 400px;
          text-indent: 2em;
        }
        button {
          margin-top: 80px;
          margin-left: 10px;
          background: #1168E1;
          color: #FFFFFF;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
        }
      }
    }
  }

</style>

<template>
  <div class="building_room_picture">
   <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="430px" top="0">-->
      <div class="building_room_header">
        <div class="clearfix">
          <p class="company_name fl">石家庄无线科技有限公司</p>
          <p class="state fr">空租</p>
        </div>
        <div class="building_room_message">
          <p>万达广场A座1702</p>
          <p>业务联系人：王梅</p>
          <p>联系电话：13010265122</p>
        </div>
        <div class="search_message">
          <button>查看公司基本信息</button>
        </div>
      </div>
      <div class="building_rent clearfix">
        <div class="building_rent_message fl">
          <p>面积</p>
          <p>180m2</p>
        </div>
        <div class="building_rent_message fl">
          <p>起租日期</p>
          <p>--</p>
        </div>
        <div class="building_rent_message fl" id="last">
          <p>结束日期</p>
          <p>--</p>
        </div>
      </div>
      <div class="passenger_con">
        <div class="pass clearfix">
          <p class="fl title">通行客</p>
          <p class="fr states">未使用</p>
        </div>
        <p class="employ_num">通行员工数量：45人</p>
      </div>
      <div class="intelligent_state">
        <p>物业缴费情况</p>
        <el-table :data="tableData" style="width: 100%" >
          <el-table-column prop="month" label="月份">
          </el-table-column>
          <el-table-column prop="should_salary" label="应缴费（元）" width="110">
          </el-table-column>
          <el-table-column prop="act_salary" label="实缴费（元）" width="110">
          </el-table-column>
          <el-table-column prop="salary_date" label="缴费日期">
          </el-table-column>
        </el-table>
      </div>
      <div class="room_message">
        <p class="title">房屋基本信息</p>
        <p class="room_area">房间面积：190m²</p>
        <div class="room_pic clearfix">
          <p class="fl">户型图：</p>
          <img src="../../assets/images/index/room_pic.png" class="fl" />
        </div>
      </div>
      <div class="center">
        <button>确 定</button>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  		</span>
    <!--</el-dialog>-->
  </div>

</template>
<script>
  export default {
    props:['companyId'],
    data() {
      return {
      	
        dialogVisible: false,
        tableData: [{
          month: '2018-07',
          should_salary: '2000',
          act_salary: '2000',
          salary_date:''
        },]
      };
    },
    methods: {
      //获取公司详细信息
      getCompanyDetails(){
        this.$httpPasser(
          'company/getTenantCompanyDetailByCompanyId',
          {params:{companyId:this.companyId}},
        ).then(
          res=>{
            console.log('res',res)
          }
        )
      }
    },
    mounted(){
      this.getCompanyDetails();
    }
  };
</script>
<style lang="less" scoped>
  .building_room_picture {
    .title {
      font-size: 14px;
      line-height: 27px;
      color: #333333;
      font-weight: 600;
      padding: 0 3px;
    }
    width: 430px;
    .building_room_header {
      padding-bottom: 20px;
      border-bottom: 1px dotted #D9D9D9;
      .company_name {
        line-height: 27px;
        font-size: 16px;
        color: #333333;
        font-weight: 700;
      }
      .state {
        color: #fff;
        background: #ec4141;
        border-radius: 10px;
        padding: 2px 4px;
      }
      .building_room_message {
        p {
          font-size: 14px;
          line-height: 27px;
          color: #333;
        }
      }
      .search_message {
        margin-top: 10px;
        width: 100%;
        background: #428ff9;
        border-radius: 8px;
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
        button {
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .building_rent {
      padding: 12px 0;
      border-bottom: 1px dotted #D9D9D9;
      .building_rent_message {
        padding: 5px 0;
        text-align: center;
        background: #e7f1ff;
        border-radius: 5px;
        width: 99px;
        height: 46px;
        margin-right: 46px;
      }
      #last {
        margin-right: 0px;
      }
    }
    .passenger_con {
      margin-top: 10px;
      border: 1px solid #DEDEDE;
      .pass {
        padding: 10px 3px 5px 3px;
        .title {
          font-size: 14px;
          line-height: 27px;
          color: #333333;
          font-weight: 600;
          padding: 0 3px;
        }
        .states {
          color: #428ff9;
          font-size: 14px;
          line-height: 27px;
          padding: 0 3px;
        }
      }
      .employ_num {
        font-size: 14px;
        line-height: 22px;
        padding: 0 3px;
      }
    }
    .intelligent_state {
      margin-top: 10px;
      padding-bottom: 10px;
      border: 1px solid #DEDEDE;
      p {
        font-size: 14px;
        line-height: 27px;
        color: #333333;
        padding: 0 3px;
        margin-bottom: 10px;
      }
    }
    .room_message {
      .room_pic {
        padding: 0 3px;
        .room_area{
          line-height: 27px;
          font-size: 14px;
          padding: 0 3px;
        }
        p {
          line-height: 27px;
        }
      }
    }
    .center{
      text-align: center;
      background-repeat: no-repeat;
      margin-top: 10px;
      button{
        background: url(../../assets/images/index/centure_bg.png);
        background-size:116px 49px ;
        width: 116px;
        height: 49px;
        background-position: 115px 53px;
        cursor: pointer;
        color: #FFF;
      }
    }
  }
</style>
<style lang="less">
  .building_room_picture {
    /*.el-dialog {
      position: absolute;
      right: 0;
      width: 430px;
    }
    .el-table td,
    .el-table th {
      padding: 0;
    }*/
  }
</style>

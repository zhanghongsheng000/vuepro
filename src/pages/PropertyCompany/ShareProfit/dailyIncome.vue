<template>
  <div class="monthlyIncome">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text font14">日收益查询</span>
    </div>
    <div class="condition-box clearfix">
      <div class="month fl">
        <el-date-picker
          v-model="startMonth"
          type="date"
          size="large"
          placeholder="开始日期">
        </el-date-picker>
      </div>
      <div class="month fl">
        <el-date-picker
          v-model="endMonth"
          type="date"
          size="large"
          placeholder="截止日期">
        </el-date-picker>
      </div>
      <div class="btns fl">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="tables">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="月份" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.month }}</span>
          </template>
        </el-table-column>
        <el-table-column label="租金月付收益" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.shouyi1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="百步传收益" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.shouyi2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="早餐颂收益" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.shouyi3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="福利社收益" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.shouyi4 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月收益" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.shouyi5 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="detailedClick(scope.$index, scope.row)">收益明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix pt20">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page.currentPageNum"
          layout="prev, pager, next"
          :page-count="page.pageTotal">
        </el-pagination>
      </div>
      <div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page: {//分页相关属性
          currentPageNum:1,//当前页码
          pageTotal:1,//总页码
          totalRecord:2//总条数
        },
        startMonth: '',
        endMonth: '',
        tableData:[
          {
            month:'2018-05-01',
            shouyi1:'98.00',
            shouyi2:'105.00',
            shouyi3:'96.00',
            shouyi4:'43.00',
            shouyi5:'342.00',
          },
          {
            month:'2018-05-02',
            shouyi1:'69.00',
            shouyi2:'86.00',
            shouyi3:'75.00',
            shouyi4:'156.00',
            shouyi5:'386.00',
          },
        ]
      }
    },
    methods:{
      handleCurrentChange(){

      },
      detailedClick(){
        this.$router.push('/PropertyCompany/ShareProfit/IncomeDetails')
      }
    },
    create(){

    }
  }
</script>
<style lang="less" scoped>
  .monthlyIncome {
    padding-top: 30px;
    .condition-box {
      margin-bottom: 30px;
    }
    .month {
      margin-right: 20px;
    }
  }
</style>

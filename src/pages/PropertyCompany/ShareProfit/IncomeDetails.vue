<template>
  <div class="monthlyIncome">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text font14">收益明细查询</span>
    </div>
    <div class="condition-box clearfix">
      <div class="month fl">
        <el-date-picker
          v-model="startMonth"
          type="datetime"
          size="large"
          placeholder="开始日期">
        </el-date-picker>
      </div>
      <div class="month fl">
        <el-date-picker
          v-model="endMonth"
          type="datetime"
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
        <el-table-column label="日期" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.month }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.chanpin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" width="">
          <template slot-scope="scope">
            <span>￥{{ scope.row.jine }}</span>
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
            month:'2018-05-30 15:36',
            chanpin:'租金月付',
            jine:'4090.00',
          },
          {
            month:'2018-06-30 18:40',
            chanpin:'早餐颂',
            jine:'3752.00',
          },
        ]
      }
    },
    methods:{
      handleCurrentChange(){

      },
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

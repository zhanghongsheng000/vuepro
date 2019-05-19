<template>
  <div class="propertyNoticeList">
    <div class="main-cont">
      <div class="line"></div>
      <span class="top-text">收到通知列表</span>
    </div>
    <div class="main-box">
      <div class="forms-cont clearfix">
        <div class="form-item fl">
          <el-input v-model.trim="content" placeholder="请输入标题或者内容" clearable></el-input>
        </div>
        <div class="form-item fl">
          <el-date-picker v-model="start" type="date" value-format='yyyy-MM-dd' placeholder="选择开始时间">
          </el-date-picker>
        </div>
        <div class="form-item fl">
          <el-date-picker v-model="end" type="date" value-format='yyyy-MM-dd' placeholder="选择截止时间">
          </el-date-picker>
        </div>
        <div class="form-item fl" style="width: 70px;">
          <el-button type="primary" @click="queryBtn">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tables">
      <el-table :data="noticeList" style="width: 100%" :empty-text=text>
        <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="sender" label="发布单位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toCommonCompanyNoticeDetailsjjs(scope.$index,scope.row)" round>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix lh35 block">
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
      	text:'正在加载，请稍候',
        getCompanyNoticeparams: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        },
        start: '', //开始时间
        end: '', //结束时间
        totalRecord: 0, //列表总条数
        pageNow: 1, //当前页码
        pageIndex: 1, //分页页码
        pageSize: 30, //每页条数
        commonCompanyNoticeList: [],
        datachoise: '', //选择时间段
        noticeList: [], //通知列表
        fileList:this.$route.query.noticeList,
        content: '', //标题或者内容
        
        page: {//分页
          currentPageNum: 1, //当前页码
          pageTotal: 1, //总页码
          totalRecord: "" //总条数
        },
        gImgUrl:''
      }
    },
    methods: {
      toCommonCompanyNoticeDetailsjjs(index, row) {//跳转详情
        this.$router.push({
          path: 'noticeDetailsjjs',
          query: {
            noticeId: row.customer_notice_id,
            sender: row.sender,
            title: row.title,
            info: row.info,
            createTime: row.create_time,
//            noticeList:
          }
        })
      },
      toNoticeSend() {
        this.$router.push({
          path: 'noticeSend',
          query: {

          }
        })
      },
      handleCurrentChange(index) { //设置分页
        this.page.currentPageNum = index;
        this.getCompanyNoticeList(this.page.currentPageNum)//写字楼列表

      },
      getCompanyNoticeList(index) { //获取居金所公司已发送通知列表
        this.$httpPasser.post("message/getJJSNoticeList", {
          userId: this.getCompanyNoticeparams.userId,
          shopId: this.getCompanyNoticeparams.shopId,
          content:this.content,
          end:this.end,
          start:this.start,
          pageIndex: index,
          pageSize: this.pageSize
        }).then((res) => {
          console.log(this.fileList);
          if(res.data.resultCode == '200') {
            this.noticeList = res.data.result;
            this.page.pageTotal = res.data.pageTotal;
            this.page.totalRecord = res.data.totalRecord;//总记录数
            this.$message({
              showClose: true,
              message: '查询成功',
              type: 'success'
            });
            this.totalRecord = res.data.totalRecord;

          } else if(res.data.resultCode == '204') {
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'success'
            });
            this.text ="暂无数据"
            this.noticeList = [];
          } else {
          	this.text ="暂无数据"
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      },
      queryBtn() {
        this.getCompanyNoticeList(this.page.currentPageNum);
      },
      indexMethod(index){
        return (this.page.currentPageNum - 1)*30 + 1 + index;
      },
    },
    created() {
      this.getCompanyNoticeList(1);
    },
    computed: {
    },
  }
</script>

<style lang="less" scoped>
  .propertyNoticeList {
  	.main-cont{
  		margin-top: 25px;
  	}
    .line {
      height: 1px;
      background-color: #ccc;
      margin-bottom: -17px;
    }
    .top-text {
      margin-left: 25px;
      font-size: 15px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
    .main-box {
      margin-top: 20px;
      .forms-cont {
        padding-bottom: 30px;
        padding-left: 30px;
      }
      .form-item {
        width: 220px;
        margin-right: 15px;
      }
      .btns {
        padding: 20px 20px 20px;
      }
    }
    .block{
      margin-top: 20px;
    }
    .lh35{
      line-height: 35px;
    }
  }
</style>

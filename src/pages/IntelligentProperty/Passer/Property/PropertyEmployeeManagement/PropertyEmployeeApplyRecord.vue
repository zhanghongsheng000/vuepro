<template>
  <div class="RenterDepartmentManagementCon" style="margin-top:-30px;">
    <div id="zk-yggl">
      <div class="w1200">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">员工申请记录</span>
        </div>
        <div class="search-cont clearfix">
          <div class="sea-item fl">
            <div class="sea-condition fl line-height-40">姓名：</div>
            <div class="sea-forms fl">
              <el-input v-model.trim="searchName" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sea-item fl">
            <div class="sea-condition fl line-height-40">手机号：</div>
            <div class="sea-forms fl">
              <el-input v-model.trim="telphone" placeholder="请输入手机号" clearable></el-input>
            </div>
          </div>
          <div class="sea-item fl">
            <el-button type="primary" @click="searchBtn">查询</el-button>
          </div>
        </div>
        <div class="tables">
          <el-table :data="itemlist" style="width: 100%" :empty-text=text>
            <el-table-column type="index" width="80" label="编号"></el-table-column>
            <el-table-column prop="nickname" label="申请人" ></el-table-column>
            <el-table-column prop="telphone" label="手机号码" ></el-table-column>
            <el-table-column prop="verifyName" label="审批人" ></el-table-column>
            <el-table-column prop="applytime" label="申请时间" ></el-table-column>
            <el-table-column prop="handletime" label="审批时间" ></el-table-column>
            <el-table-column prop="resultName" label="审批结果" ></el-table-column>

          </el-table>
        </div>
       <!-- <div class="pagination"  v-if="num>0?true:false">
          <el-pagination layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>
        </div>-->
        <div class="clearfix" v-if="num>0?true:false" style="padding:10px 0">
          <div class="pages pagination fl" >
            <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>
          </div>
          <div class="fl pagestyle font12"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.totalRecord}}条数据</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Footer from '@/components/public/footer'

  export default {
    components: {
      logFooter: Footer
    },
    data() {
      return {
      	text:'正在加载，请稍候',
        searchName:'',//搜索姓名
        telphone:'',//搜索电话
        pageNow:1,//分页当前页
        itemlist:[],
        pageTotal: '',//列表总页数
        totalRecord:'',//列表总条数
      }
    },
    created(){
      this.getList(1)
    },
    methods:{
      searchBtn(){//查询
        this.getList(1)
      },
      getList(pnum){
        let gsid = this.$local.sefetch('info').companyId
        this.$httpPasser.post('staffVerify/verifyRecordList', {
          companyId:gsid,//公司id
          telphone:this.telphone,//手机号
          nickname:this.searchName,////搜索的员工姓名
          pageIndex:pnum,//页码
          pageSize:30
        })
          .then(res => {
            let data = res.data
            if (data.resultCode == '200') {
              this.itemlist = data.result
              this.pageTotal = data.pageTotal
              this.totalRecord=data.totalRecord
              this.$message({
                showClose: true,
                message:'查询成功',
                type: 'success'
              });
            } else if (data.resultCode == '204') {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
              this.staffList = data.result.employeeList
              this.pageTotal = data.pageTotal
              this.totalRecord=data.totalRecord
              this.text ="暂无数据"
            } else {
            	this.text ="暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {console.log(err)})
      },
      pagesChange(currentPage) {//分页
        this.pageNow = currentPage
        this.getList(this.pageNow)
      },
    },
    computed: {
      num() {return parseInt(this.totalRecord)}
    },
  }
</script>
<style lang="less" scoped>
  .pagestyle{
    line-height:30px;
  }
  .improveButton{
    color:#e44f4f;
  }
  .RenterDepartmentManagementCon {
    .w1200{
      padding-top:30px;
    }
    .top-title {
      margin-bottom: 20px;
      .line {
        height: 1px;
        background-color: #ccc;
        margin-bottom: -17px;
      }
      .top-text {
        margin-left: 25px;
        font-size: 14px;
        background-color: #fff;
        padding: 0 4px;
        line-height: 30px;
      }
    }
    .search-cont{
      margin-bottom: 30px;
    }
    .sea-item{
      width: 300px;
    }
    .sea-condition{
      margin-right: 10px;
      font-size: 14px;
    }
    .line-height-40{
      line-height: 40px;
    }
    .tables{
      margin-bottom: 10px;
    }
    .pagination{
      margin-bottom: 10px;
    }
    .buttons{
      padding-bottom: 30px;
    }
    .black{
      background: #3b3b3b;
      min-width: 1200px;
    }
  }
</style>

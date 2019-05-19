<template>
  <div class="RenterDepartmentManagementCon">
    <div id="zk-yggl">
      <div class="w1200">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">员工申请</span>
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
            <el-table-column type="index" label="编号" width="80"></el-table-column>
            <el-table-column prop="nickname" label="姓名" width="180"></el-table-column>
            <el-table-column prop="telphone" label="手机号码"></el-table-column>
            <el-table-column prop="applytime" label="申请时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" round @click="handleClick(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--<div class="pagination"  v-if="num>0?true:false">-->
        <!--<el-pagination layout="prev, pager, next" :total="num" @current-change="pagesChange"></el-pagination>-->
        <!--</div>-->
        <div class="clearfix" v-if="num>0?true:false" style="padding:10px 0">
          <div class="pages fl">
            <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange" :page-size="pages"></el-pagination>
          </div>
          <div class="fl pagestyle font12"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.totalRecord}}条数据</span></div>
        </div>
        <div class="mask-box">
          <el-dialog title="员工申请审批" :visible.sync="dialogVisible" width="500px" :modal-append-to-body="false">
            <div class="entry-cocnt">
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">部门：</div>
                <div class="sitemr fl">
                  <el-select v-model="departmentId" placeholder="请选择部门">
                    <el-option v-for="(item,index) in bmList" :key="index" :label="item.name" :value="item.customerDepartmentId"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml fl">工号：</div>
                <!--<div class="sitemr fl line-height-40">{{nameText}}</div>-->
                <input type="text" v-model.trim="code" class="inputtype">
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">员工姓名：</div>
                <!--<div class="sitemr fl line-height-40">{{nameText}}</div>-->
                <input type="text" v-model.trim="nameText" class="inputtype">
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">性别：</div>
                <div class="sitemr fl line-height-40">
                  <el-radio v-model="sex" label="男">男</el-radio>
                  <el-radio v-model="sex" label="女">女</el-radio>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">入职时间：</div>
                <div class="sitemr fl">
                  <el-date-picker v-model="entryTime" type="date" placeholder="选择入职日期" value-format="yyyy-MM-dd" @change='inputentryTime'>
                  </el-date-picker>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml  fl">转正时间：</div>
                <div class="sitemr fl">
                  <el-date-picker v-model="formalTime" type="date" value-format="yyyy-MM-dd" placeholder="选择转正日期" @change='inputregularTime'>
                  </el-date-picker>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">职位：</div>
                <div class="sitemr fl">
                  <el-select v-model="customerPostId" placeholder="请选择职位">
                    <el-option v-for="(item,index) in positionList" :key="index" :label="item.name" :value="item.customerPostId"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml fl">身份证号：</div>
                <!--<div class="sitemr fl line-height-40">{{nameText}}</div>-->
                <input type="text" v-model.trim="idcard" class="inputtype">
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">手机号：</div>
                <div class="sitemr fl line-height-40">{{telPhoneText}}</div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml beforesiteml fl">审批结果：</div>
                <div class="sitemr fl line-height-40">
                  <el-radio v-model="statusText" label="Y">同意</el-radio>
                  <el-radio v-model="statusText" label="N">拒绝</el-radio>
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Preservation">保 存</el-button>
          </span>
          </el-dialog>
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
      	text:"正在加载，请稍候",
        pages:30,
        departmentId: '', //审批部门id
        customerPostId: '', //职位id
        nameText: '', //审批姓名
        telPhoneText: '', //审批电话
        statusText: '', //审批状态
        customerUserId: '', // 审批 用户id
        searchName: '', //搜索 姓名
        telphone: '', //搜索  手机号
        itemlist: [], //列表页
        dialogVisible: false,
        pageTotal: '', //列表总页数
        totalRecord: '', //列表总条数
        pageNow: 1, //默认分页
        bmList: [], //部门
        positionList: [], //职位
        customerUserId: '', //用户编号
        applyConnectCompanyId: '', //主键id编号
        sex: '', //性别
        code: '', //工号
        entryTime: '', //入职时间
        formalTime: '', //转正时间
        post: '', //职位
        idcard: '', //身份证号
      }
    },
    created() {
      this.getDepartment() //获取部门
      this.getPositonList() //获取职位
      this.getList(1)
    },
    methods: {
      handleClick(row) { //审批
        console.log(row)
        this.dialogVisible = true
        this.telPhoneText = row.telphone
        this.nameText = row.nickname
        this.customerUserId = row.customerUserId
        this.applyConnectCompanyId = row.applyConnectCompanyId
      },
      inputentryTime(date) { //入职时间
        this.entryTime = date;
        console.log(this.entryTime)
      },
      inputregularTime(date) { //转正时间
        this.formalTime = date;
        if(this.entryTime > this.formalTime) {
          this.$message({
            showClose: true,
            message: '转正日期不能在入职之前',
            type: 'error'
          });
          this.istrue = true;
        } else {
          this.istrue = false;
        }
      },
      Preservation() { //保存
        if(this.departmentId == '') {
          this.$message({
            showClose: true,
            message: '请选择部门',
            type: 'error'
          })
        } else if(this.nameText == '') {
          this.$message({
            showClose: true,
            message: '请输入姓名',
            type: 'error'
          })
        } else if(this.sex == '') {
          this.$message({
            showClose: true,
            message: '请选择性别',
            type: 'error'
          })
        } else if(this.statusText == '') {
          this.$message({
            showClose: true,
            message: '请选择审批结果',
            type: 'error'
          })
        } else {
          if(this.sex=='男'){
            this.sex = "M"
          }else{
            this.sex = "F"
          }
          let gsid = this.$local.sefetch('info').companyId
          let userId = this.$local.sefetch('info').userId
          this.$httpPasser.post('staffVerify/verify', {
            properoyCompanyId: gsid, //公司id
            departmentId: this.departmentId, //部门id
            customerUserId: this.customerUserId, //用户id
            opertionUserId: userId,
            customerUserId: this.customerUserId,
            applyConnectCompanyId: this.applyConnectCompanyId, //主键编号id
            status: this.statusText, //审批结果
            username: this.nameText, //姓名
            sex: this.sex, //性别
            code: this.code, //工号
            entryTime: this.entryTime, //入职时间
            workTime: this.formalTime, //转正时间
            post: this.customerPostId, //职位
            idcard: this.idcard, //身份证号
            telphone: this.telPhoneText //手机号
          })
            .then(res => {
              let data = res.data
              if(data.resultCode == '200') {
                this.$message({
                  showClose: true,
                  message: '已审批',
                  type: 'success'
                })
                this.getList(this.pageNow)
                this.dialogVisible = false;
              } else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
                this.dialogVisible = false;
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      searchBtn() { //查询
        this.getList(1)
      },
      getList(pnum) { //4.8
        let companyId = this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '';
        this.$httpPasser.post('staffVerify/verifyList', {
          companyId: companyId, //公司id
          telphone: this.telphone, //手机号
          nickname: this.searchName, ////搜索的员工姓名
          pageIndex: pnum, //页码
          pageSize: 30
        })
          .then(res => {
            let data = res.data
            if(data.resultCode == '200') {
              this.itemlist = data.result;
              this.pageTotal = data.pageTotal
              this.totalRecord = data.totalRecord
              this.$message({
                showClose: true,
                message: '查询成功',
                type: 'success'
              });
            } else if(data.resultCode == '204') {
              this.text ="暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'success'
              });
              this.staffList = data.result
              this.pageTotal = data.pageTotal
              this.totalRecord = data.totalRecord
            } else {
            	this.text ="暂无数据"
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      pagesChange(currentPage) { //分页
        this.pageNow = currentPage
        this.getList(currentPage)
      },
      getDepartment() { //获取部门3.17
        let gsid = this.$local.sefetch('info').companyId
        this.$httpPasser.post('company/getDepartmentByCompanyId', {
          businessExtendShopId: gsid
        })
          .then(res => {
            let data = res.data
            if(data.resultCode == '200') {
              this.bmList = data.result.departmentList
            } else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getPositonList() {
        let gsid = this.$local.sefetch('info').companyId
        this.$httpPasser.post('companyPost/list', {
          shopId: gsid,
        }).then((res) => {
          console.log(res.data)
          if(res.data.resultCode == '200') {
            this.positionList = res.data.result ? res.data.result : ''
          } else {
            this.$message({
              showClose: true,
              message: res.data.resultCodeDesc,
              type: 'error'
            });
          }
        })
      }
    },
    computed: {
      num() {
        return parseInt(this.pageTotal)
      }
    },
  }
</script>
<style lang="less" scoped>
  .pagestyle {
    line-height: 30px;
  }

  .improveButton {
    color: #e44f4f;
  }

  .RenterDepartmentManagementCon {
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
    width: 1060px;
    .w1200 {
      padding-top: 20px;
    ;
    }
    .search-cont {
      margin-bottom: 30px;
    }
    .sea-item {
      width: 300px;
    }
    .sea-condition {
      margin-right: 10px;
      font-size: 14px;
    }
    .line-height-40 {
      line-height: 40px;
    }
    .tables {
      margin-bottom: 10px;
    }
    .pagination {
      margin-bottom: 10px;
    }
    .buttons {
      padding-bottom: 30px;
    }
    .black {
      background: #3b3b3b;
      min-width: 1200px;
    }
    .entry-cocnt {
      .siteml {
        width: 140px;
        text-align: right;
        margin-right: 10px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .sitemr {
        width: 217px;
      }
    }
  }
</style>
<style lang="less">
  .RenterDepartmentManagementCon {
    .sitem1 {
      display: inline-block;
    }
    .sitem {
      .inputtype {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        width: 46%;
      }
    }
  }
</style>

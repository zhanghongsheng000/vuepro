<template>
    <div id="invoiceRecord">
      <div style="padding-top: 30px;">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">发票记录</span>
        </div>
      </div>
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="申请日期">
          <el-date-picker
            v-model="searchParams.startDate"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchParams.endDate"
            type="date"
            placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select v-model="searchParams.typeValue" placeholder="请选择">
            <el-option
              v-for="item in getInvoiceTypeList"
              :key="item.typeValue"
              :label="item.typeName"
              :value="item.typeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票状态">
          <el-select v-model="searchParams.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.status"
              :label="item.statusName"
              :value="item.status">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getInvoiceList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tables">
        <el-table :data="InvestmentList" style="width: 100%"  :empty-text=text>
          <el-table-column label="申请日期"  prop="invoiceTime" >
          </el-table-column>
          <el-table-column label="申请人"  prop="drawerName" >
          </el-table-column>
          <el-table-column label="发票抬头" prop="address">
          </el-table-column>
          <el-table-column label="金额（元）" prop="amount">
          </el-table-column>
          <el-table-column label="发票类型" prop="typeName">
          </el-table-column>
          <el-table-column label="发票状态" prop="status" >
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope" @click="toEditBuildingGroup">
              <el-button size="mini" type="primary" @click="detailsClick(scope.row)">详情</el-button>
              <!--<el-button size="mini" type="primary" @click="deleteClick(scope.row)" >删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix pt20">
        <div class="clearfix">
          <div class="fl" >
            <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="ConfigureParams.pageTotal">
            </el-pagination>
          </div>
          <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
            <span>共{{this.ConfigureParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.ConfigureParams.totalRecord}}条</span>
          </div>
        </div>
      </div>
      <div class="mask-box">
        <el-dialog title="发票记录详情" :visible.sync="dialogVisible" width="500px" :modal-append-to-body="false">
          <div class="entry-cocnt">
            <div class="sitem clearfix">
              <div class="siteml fl">申请日期：</div>
              <div class="sitemr fl">
                {{invoiceDetails.invoiceTime}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml fl">申请人：</div>
              <div class="sitemr fl">
                {{invoiceDetails.drawerName}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">发票抬头：</div>
              <div class="sitemr fl">
                {{invoiceDetails.invoiceTitle}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">发票金额：</div>
              <div class="sitemr fl">
                {{invoiceDetails.amount}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">发票类型：</div>
              <div class="sitemr fl">
                {{invoiceDetails.typeName}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">发票状态：</div>
              <div class="sitemr fl">
                {{invoiceDetails.status}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">收货地址：</div>
              <div class="sitemr fl">
                {{invoiceDetails.address}}
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="mask-box">
        <el-dialog title="是否删除" :visible.sync="dialogVisibleDelete" width="500px" :modal-append-to-body="false">
           <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleDelete = false">取 消</el-button>
            <el-button type="primary" @click="sureDelete">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return{
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          getInvoiceTypeList:[],//发票类型列表
          statusList:[
            {
              statusName:"正在处理",
              status:1
            },
            {
              statusName:'开票完成',
              status:2
            }
          ],//发票状态列表
          searchParams:{
            name:'',
            telphone:'',
            startDate:'',
            endDate:'',
            typeValue:'',//发票类型
            status:'',//发票状态
          },
          invoiceDetails:{
            amount:'',
            address:'',
            invoiceTime:'',
            typeName:'',
            drawerName:'',
            invoiceTitle:'',
            status:''
          },
          InvestmentList:[],
          ConfigureParams: {
            pageIndex: 1, //当前页
            pageSize: 30, //每页条数
            pageTotal: 0, //总页数
            totalRecord: 0, //总条数
          },
          ConfigureInfo: {
            pageTotal: 0,
            pageIndex: 1 //当前页
          },
          text:'正在查询，请稍候',
          dialogVisible:false,
          dialogVisibleDelete:false,
          details:{
          }
        }
      },
      created() {
        this.getInvoiceType()//获取发票类型
        this.getInvoiceList()//获取列表
      },
      methods:{
        handleCurrentChange(index) { //分页方法
          this.ConfigureInfo.pageIndex = index;
          this.getInvoiceList();
        },
        getInvoiceType(){
          this.$httpPasser.post("welfareWeb/getInvoiceType",{
            shopId:this.shopId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.getInvoiceTypeList = res.data.result
            }
          })
        },
        getInvoiceList(){//获取一列表
          this.$httpPasser.get("welfareWeb/getInvoiceList",{ //这块是
            params:{
              shopId:this.shopId,
              pageIndex:this.ConfigureInfo.pageIndex,
              pageSize:this.ConfigureParams.pageSize,
              startDate:this.searchParams.startDate,
              endDate:this.searchParams.endDate,
              status:this.searchParams.status,
              type:this.searchParams.type
            }
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.InvestmentList = res.data.result
              this.ConfigureParams.totalRecord = res.data.totalRecord
              this.ConfigureParams.pageIndex = res.data.pageIndex
              this.ConfigureParams.pageTotal = res.data.pageTotal
            }else if(res.data.resultCode == '204'){
              this.InvestmentList =[];
              this.text ="暂无数据"
              this.ConfigureParams.totalRecord = res.data.totalRecord
              this.ConfigureParams.pageIndex = res.data.pageIndex
              this.ConfigureParams.pageTotal = res.data.pageTotal
            }else{
              this.$message.success(res.data.resultCodeDesc)
            }
          })
        },
        handleSearchRenter(){

        },
        detailsClick(row){//详情
          this.dialogVisible = true
          this.$httpPasser.post("welfareWeb/getInvoiceDetail",{
            invoiceTitleId:row.invoiceRecordId
          }).then((res)=>{
              this.invoiceDetails = res.data.result;
          })
        },
        deleteClick(row){
          this.dialogVisibleDelete = true;
        },
        sureDelete(){

        }
      },
    }
</script>

<style lang="less" scoped>
 #invoiceRecord{
    .entry-cocnt .siteml{
     width: 140px;
     text-align: right;
     margin-right: 10px;
     line-height: 40px;
     margin-bottom: 10px;
   }
   .entry-cocnt .sitemr{
     width: 217px;
     line-height: 40px;
   }
   .pagestyle{
     font-size: 12px;
   }
 }
</style>
<style lang="less">
  #invoiceRecord{
    .el-input{
      width:174px;
    }
  }
</style>

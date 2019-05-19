<template>
    <div id="invoiceRiseManager">
      <div style="padding-top: 30px;">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">发票抬头管理</span>
        </div>
      </div>
      <div>
        <el-button type="primary" plain  @click="toAddNormalInvoice">新增普票抬头</el-button>
        <el-button type="primary" plain  @click="toAddspecialInvoice">新增专票抬头</el-button>
        <!--<el-button type="primary" plain  @click="toImportInvoice">批量导入</el-button>-->
      </div>
      <div class="tables">
        <el-table :data="invoicementList" style="width: 100%"  :empty-text=text>
          <el-table-column label="发票抬头"  prop="invoiceTitle" >
          </el-table-column>
          <el-table-column label="类型"  prop="typeName" >
          </el-table-column>
          <el-table-column label="状态" prop="statusDesc">
            <!--<template slot-scope="scope">-->
              <!--<el-popover  placement="top">-->
                <!--<div slot="reference" v-if="scope.row.status == 'Y'">-->
                  <!--<span>{{ scope.row.statusDesc }}</span>-->
                <!--</div>-->
                <!--<div slot="reference" v-if="scope.row.status == 'N'" @click="toIdentipynoPass(scope.row)">-->
                  <!--<span>{{ scope.row.statusDeac }}<span class="supply">（查看原因）</span></span>-->
                <!--</div>-->
                <!--<div slot="reference" v-else @click="tocheckIdentify(scope.row)">-->
                  <!--<span>{{ scope.row.statusDesc }}<span class="supply">（点击了解需补充资质信息）</span></span>-->
                <!--</div>-->
              <!--</el-popover>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column label="操作" width="240px">
            <template slot-scope="scope">
              <!--<el-button v-if="scope.row.status == '审核通过'" size="mini" type="primary" @click="editClick(scope.row)">编辑</el-button>-->
              <el-button size="mini" type="primary" @click="detailsClick(scope.row)">详情</el-button>
              <el-button size="mini" type="primary" @click="deleteClick(scope.row)" >删除</el-button>
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
        <el-dialog :title="invoicetypeTitle" :visible.sync="AddnormaldialogVisible" width="600px" :modal-append-to-body="false">
          <div class="entry-cocnt">
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">发票抬头：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.invoiceTitle" placeholder="请与公司资质文件上的名称保持一致"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">纳税人识别号：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.identifyNumber" placeholder="可填写统一社会信用代码为15、18或者20位"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl" id="beforesitem">企业开户银行：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.depositBank" placeholder="请填写开户许可证上的银行"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业银行账号：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.bankAccount" placeholder="请填写开户许可证上的银行账号"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业注册地址：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.registeredAddress" placeholder="请填写营业执照上的注册地址"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业固定电话：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.phone" placeholder="请填写企业固定电话"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">营业执照照片：</div>
              <div class="sitemr fl"  id="addrent1">
                <el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData"
                           :beforeUpload="beforeAvatarUpload"
                           :on-success="peripheryPicDelete" :show-file-list="false" :on-remove="handleRemove">
                  <img v-if="normalInvoice.imgPath" :src="gImgUrl+normalInvoice.imgPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="sitem clearfix">
              <span slot="footer" class="dialog-footer fr clearfix" style="padding: 10px 60px 10px 10px">
                <el-button @click="cancelAddInvoice">取 消</el-button>
                <el-button type="primary" @click="sureAddnormalInvoice">确 定</el-button>
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="mask-box">
        <el-dialog :title="invoicetypeTitle" :visible.sync="AddSpecialdialogVisible" width="600px" :modal-append-to-body="false">
          <div class="entry-cocnt">
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">发票抬头：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.invoiceTitle" placeholder="请与公司资质文件上的名称保持一致"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">纳税人识别号：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.identifyNumber" placeholder="可填写统一社会信用代码为15、18或者20位"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl" >企业开户银行：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.depositBank" placeholder="请填写开户许可证上的银行"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">企业银行账号：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.bankAccount" placeholder="请填写开户许可证上的银行账号"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">企业注册地址：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.registeredAddress" placeholder="请填写营业执照上的注册地址"></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">企业固定电话：</div>
              <div class="sitemr fl">
                <el-input v-model="normalInvoice.phone" placeholder="请填写企业固定电话"></el-input>
              </div>
            </div>
            <div class="sitem  clearfix">
              <div class="siteml beforesiteml fl">营业执照照片：</div>
              <div class="sitemr fl"  id="addrent">
                <el-upload class="avatar-uploader" :action="importFileUrl" :data="upLoadData"
                           :beforeUpload="beforeAvatarUpload"
                           :on-success="peripheryPicDelete" :show-file-list="false" :on-remove="handleRemove">
                  <img v-if="normalInvoice.imgPath" :src="gImgUrl+normalInvoice.imgPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="sitem clearfix">
              <span slot="footer" class="dialog-footer fr clearfix" style="padding: 10px 60px 10px 10px">
                <el-button @click="cancelAddInvoice">取 消</el-button>
                <el-button type="primary" @click="sureAddnormalInvoice">确 定</el-button>
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="mask-box">
        <el-dialog title="发票抬头详情" :visible.sync="detailsdialogVisible" width="600px" :modal-append-to-body="false">
          <div class="entry-cocnt">
            <div class="sitem clearfix">
              <div class="siteml fl">发票抬头：</div>
              <div class="sitemr fl">
                {{normalInvoice.invoiceTitle}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml fl">纳税人识别号：</div>
              <div class="sitemr fl">
                {{normalInvoice.identifyNumber}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业开户银行：</div>
              <div class="sitemr fl">
                {{normalInvoice.depositBank}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业银行账号：</div>
              <div class="sitemr fl">
                {{normalInvoice.bankAccount}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业注册地址：</div>
              <div class="sitemr fl">
                {{normalInvoice.registeredAddress}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl">企业固定电话：</div>
              <div class="sitemr fl">
                {{normalInvoice.phone}}
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml fl">营业执照照片：</div>
              <div class="sitemr fl" >
                  <img v-if="normalInvoice.imgPath" :src="gImgUrl+normalInvoice.imgPath" class="avatar">
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

  import getUrl from '@/assets/js/global'
  import { $gPasserUrl } from '@/assets/js/gUrl'

    export default {
      data(){
        return{
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          invoicementList:[//发票抬头列表

          ],
          AddnormaldialogVisible:false,//新增普票抬头的弹框
          AddSpecialdialogVisible:false,
          detailsdialogVisible:false,//详情
          dialogVisibleDelete:false,//删除
          text:'正在加载，请稍候',
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
          invoicetypeTitle:'',//弹层的title
          normalInvoice:{
            bankAccount:'',//银行账户
            depositBank:'',//开户银行
            identifyNumber:'',//纳税人识别号
            invoiceTitle:'',//发票抬头
            invoiceTitleId:'',//发票抬头编号， 编辑时传id
            operation:'',//添加为1，更新为2
            phone:'',//企业固定电话
            registeredAddress:'',//企业注册地址
            shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
            type:'',//普票为1，专票为2
            imgPath:'',
          },
          getInvoiceTitleDetail:{
            bankAccount:'',
            registeredAddress:'',
            identifyNumber:'',
            depositBank:'',
            phone:'',
            invoiceTitle:'',
          },
          company:'公司名称',
          gImgUrl: "",
          importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
          dialogVisible:false,
          upLoadData: { //图片上传参数
            file: '',
            type: 'company',
            objectId: 0
          }
        }
      },
      created() {
        this.getInvoiceTitleList()
      },
      methods:{
        getInvoiceTitleList(){
          this.$httpPasser.post("welfareWeb/getInvoiceTitleListPage",{
            shopId:this.shopId,
            type:this.type,
            pageIndex:this.ConfigureInfo.pageIndex,
            pageSize:this.ConfigureParams.pageSize,
          }).then(res=>{
            if(res.data.resultCode == '200'){
              this.invoicementList = res.data.result
              this.ConfigureParams.totalRecord = res.data.totalRecord
              this.ConfigureParams.pageIndex = res.data.pageIndex
              this.ConfigureParams.pageTotal = res.data.pageTotal
            }else if(res.data.resultCode == '204'){
              this.invoicementList = []
              this.text ="暂无数据"
              this.ConfigureParams.totalRecord = res.data.totalRecord
              this.ConfigureParams.pageIndex = res.data.pageIndex
              this.ConfigureParams.pageTotal = res.data.pageTotal
            }else{
              this.$message.error(res.data.resultCode)
            }
          })
        },
        editClick(row){
          this.AddnormaldialogVisible = true;
          this.normalInvoice.invoiceTitleId = row.invoiceTitleId
          this.invoicetypeTitle = "发票抬头编辑"
          this.$httpPasser.post("welfareWeb/getInvoiceTitleDetail",{
            invoiceTitleId:row.invoiceTitleId
          }).then((res)=>{
            if(res.data.resultCode == 200){
              this.normalInvoice = res.data.result
            }
          })
        },
        detailsClick(row){
          this.detailsdialogVisible = true
          this.$httpPasser.post("welfareWeb/getInvoiceTitleDetail",{
            invoiceTitleId:row.invoiceTitleId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.normalInvoice = res.data.result
            }
          })

        },
        deleteClick(row){
          this.dialogVisibleDelete = true
          this.normalInvoice.invoiceTitleId = row.invoiceTitleId
        },
        sureDelete(){//确定删除
          this.$httpPasser.post("welfareWeb/deleteInvoiceTitle",{
            invoiceTitleId:this.normalInvoice.invoiceTitleId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.$message.success("删除成功")
            }else{
              this.$message.error(res.data.resultCodeDesc)
            }
          })
          this.dialogVisibleDelete = false
          this.getInvoiceTitleList()
        },
        toCompanyIdentify(){

        },
        toAddNormalInvoice(){//新增普票抬头
          this.AddnormaldialogVisible = true;
          this.normalInvoice.type = 1
          this.normalInvoice.operation = 1
          this.invoicetypeTitle = "新增普票抬头"
          this.clearData()
        },
        toAddspecialInvoice(){//新增专票抬头
          this.AddSpecialdialogVisible = true;
          this.normalInvoice.type = 2
          this.normalInvoice.operation = 1
          this.invoicetypeTitle ="新增专票抬头"
          this.clearData()
        },
        clearData(){
            this.normalInvoice.bankAccount='';
            this.normalInvoice.depositBank = '';
            this.normalInvoice.identifyNumber ='';
            this.normalInvoice.invoiceTitle = '';
            this.normalInvoice.phone ='';
            this.normalInvoice.registeredAddress ='';
            this.normalInvoice.imgPath =''
        },
        toImportInvoice(){
          this.$router.push({
            path:'./importInvoicer'
          })
        },
        toIdentipynoPass(){
          this.$router.push({
            path:'./identifyNopass'
          })
        },
        handleCurrentChange(index) { //分页方法
          this.ConfigureInfo.pageIndex = index;
          this.getAttractInvestmentList();
        },
        getAttractInvestmentList(){//获取一列表
          this.$httpPasser.get("attractInvestment/getAttractInvestmentList",{
            params:{
              shopId:this.shopId,
              buildingFloorId:this.getCompanyMessage.buildingFloorId,
              buildingId:this.getCompanyMessage.buildingId,
              pageIndex:this.ConfigureInfo.pageIndex,
              pageSize:this.ConfigureParams.pageSize,
              statusId:this.getAttractInvestmentListParams.statusId
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
        tocheckIdentify(row){
          this.$router.push({
            path:'./supplyQualifice',
            query:{
              invoiceTitle:row.invoiceTitle
            }
          })
        },
        toIdentipynoPass(row){
          this.$router.push({
            path:'./identifyNopassTitle',
            querty:{
              invoiceTitle:row.invoiceTitle
            }
          })
        },
        cancelAddInvoice(){
          this.AddnormaldialogVisible = false
          this.AddSpecialdialogVisible = false
          this.clearData()
        },
        sureAddnormalInvoice(){//新增接口
          this.$httpPasser.post("welfareWeb/addInvoiceTitle",{
            bankAccount:this.normalInvoice.bankAccount,
            depositBank:this.normalInvoice.depositBank,
            identifyNumber:this.normalInvoice.identifyNumber,
            invoiceTitle:this.normalInvoice.invoiceTitle,
            invoiceTitleId:this.normalInvoice.invoiceTitleId,
            operation:this.normalInvoice.operation,
            phone:this.normalInvoice.phone,
            registeredAddress:this.normalInvoice.registeredAddress,
            shopId:this.shopId,
            type:this.normalInvoice.type,
            picUrl:this.normalInvoice.imgPath
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.$message.success("操作成功");
              this.AddnormaldialogVisible = false
              this.AddSpecialdialogVisible = false;
            }else{
              this.$message.error(res.data.resultCodeDesc)
            }
            this.getInvoiceTitleList()
          })
        },
        //图片上传之前限制
        beforeAvatarUpload(file) { //图片上传之前限制
          this.upLoadData.file = file
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt10M = file.size / 1024 / 1024 < 10
          if(!isJPG && !isPNG) {
            this.$message({
              showClose: true,
              message: '上传照片必须是JPG/PNG格式!',
              type: 'error'
            });
          }
          if(!isLt10M) {
            this.$message({
              showClose: true,
              message: '上传图片大小不能超过 10MB!',
              type: 'error'
            })
          }
          return(isJPG || isPNG) && isLt10M;
        },
        handleRemove(){
          console.log(1111)
        },
        peripheryPicDelete(response, file, fileList) { //营业执照上传成功回调方法
          if(response.resultCode == '200') {
            this.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            });
            //this.currentRow.licensePicture = URL.createObjectURL(file.raw);
            this.normalInvoice.imgPath = response.result;
          } else {
            this.$message({
              showClose: true,
              message: data.result,
              type: 'error'
            });
          }
        },
      },
      mounted() {
        getUrl().then(res => {
          this.gImgUrl = res.gImgUrl
        })
      }
    }
</script>

<style lang="less" scoped>
  #invoiceRiseManager{
    .tables{
      margin-top: 30px;
    }
    .entry-cocnt .siteml{
      width: 140px;
      text-align: right;
      margin-right: 10px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .entry-cocnt .sitemr{
      width: 320px;
      line-height: 40px;
    }
    .supply{
      cursor: pointer;
      color: #EB8C83;
    }
  }
</style>
<style lang="less">
  #invoiceRiseManager{
    .el-popover{
      width:0;
      height:0;
      display: none !important;
      top:-1000px !important;
    }
    .el-popper{
      width:0;
      height:0;
      display: none !important;
    }
    .popper__arrow{
      width:0;
      height:0;
    }
    .el-form-item__content{
      display: inline-block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-alert__icon{
      width:32px;
      font-size: 32px;
    }
    .el-alert__content{
      margin-top: -20px;
    }
    .el-alert{
      padding: 18px 16px;
    }
  }
</style>

<template>
  <div class="mainPart" id="companyApprove">
    <el-input
      clearable
      v-model="searchParams.shopName"
      placeholder="公司名称">
    </el-input>
    <el-button type="primary" @click="handleSelect">查询</el-button>
    <div class="clear20"></div>
    <el-table
      :data="companyApprovalInfo.companyApprovalList"
      @selection-change="handleSelectionChange"
      style="width: 100%" :empty-text=text>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="55"
        label="编号">
        <template></template>
      </el-table-column>
      <el-table-column
        prop="buildingName"
        label="写字楼名称">
      </el-table-column>
      <el-table-column
        prop="buildingRoomName"
        width="55"
        label="房间">
      </el-table-column>
      <el-table-column
        prop="properoycompanyLegalperson"
        label="法人名称">
      </el-table-column>
      <el-table-column
        prop="properoycompanyTelphone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="properoycompanyName"
        label="公司名称">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleApprovalSigal(scope.$index, scope.row,'Y')">审批通过
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleApprovalSigal(scope.$index, scope.row,'N')">审批不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
    <el-button
      type="primary"
      round
      @click="handleApprovalBatch('Y')">审批通过
    </el-button>
    <el-button
      type="primary"
      round
      @click="handleApprovalBatch('N')">审批不通过
    </el-button>
    <div class="clear20"></div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      :current-page.sync="companyApprovalInfo.pageIndex"
      layout="prev, pager, next"
      :total="companyApprovalInfo.pageTotal">
    </el-pagination>
  </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'

  export default {
    name: "search-customer-user",
    data() {
      return {
      	text:'正在加载，请稍候',
        //日期快速
        searchParams: {
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          shopName: '',
          pageSize: 30,
          pageIndex: 1
        },
        approvalParams:{
          //产品ID
          productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',
          auditResult:'Y',
          properoycompanyIdList:[]
        },
        companyApprovalInfo: {
          pageTotal:0,
          totalRecord:0,
          companyApprovalList: [
            /*{
              buildingName: "新百广场2号楼",
              buildingRoomName: "902",
              properoycompanyId: 230,
              properoycompanyLegalperson: "李智恩",
              properoycompanyTelphone: 18032015608,
              properoycompanyName: "IU",
              buildingId: 3
            }*/
          ]
        }

      }
    },
    components: {
      buildingCascader: buildingCascader
    },
    methods: {
      //获取并处理子模块回传的数据
      buildingParam(buildingParam) {
        console.log(buildingParam)
      },
      //获取审批公司列表
      enterCompanyApprovalPending() {
        this._httpPasser(
          'WebPropertyCompany/enterCompanyApprovalPending',
          'get',
          this.searchParams,
          data => {
            this.companyApprovalInfo.companyApprovalList = data.result
            if(data.result == []||data.result== ''){
            	this.text = "暂无数据"
            }
          },
          false
        )
      },
      //修改表格选项的钩子方法
      handleSelectionChange(selection){
        //清空参数列表
        this.approvalParams.properoycompanyIdList = []
        for(let o in selection){
          this.approvalParams.properoycompanyIdList.push(selection[o].properoycompanyId)
        }
      },
      //查询按钮钩子方法
      handleSelect(){
        this.enterCompanyApprovalPending()
      },
      //单条审批钩子方法
      //result为Y或者N Y为通过，N为不通过
      handleApprovalSigal(index,row,result){
        this.approvalParams.auditResult = result
        //清空参数列表
        this.approvalParams.properoycompanyIdList = []
        //将当前行添加入参数列表
        this.approvalParams.properoycompanyIdList.push(row.properoycompanyId)
        this.auditEnterCompany()
      },
      //批量审批租客公司钩子
      handleApprovalBatch(result){
        //因为已经在table的selection方法中修改了参数列表，所以这里直接调用方法就好
        this.approvalParams.auditResult = result
        this.auditEnterCompany()
      },
      //审批租客公司方法
      auditEnterCompany(){
        //this.approvalParams.properoycompanyIdList = JSON.stringify(this.approvalParams.properoycompanyIdList)
        this._httpPasser(
          'WebPropertyCompany/auditEnterCompany',
          'post',
          this.approvalParams,
          data=>{
            this.$message.success('审批成功！')
            this.enterCompanyApprovalPending();
          },
          true,
          ()=>{
            this.enterCompanyApprovalPending()
          }

        )
      },
      //点击分页
      handleCurrentChange(index){
        this.searchParams.pageIndex = index;
        this.enterCompanyApprovalPending();
      },
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.result ? data.result : data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.result ? data.result : data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.result ? data.result : data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.result ? data.result : data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }

      }
    },
    created: function () {
      this.enterCompanyApprovalPending();
    }
  }
</script>

<style lang="less" scoped>
  #companyApprove {

  }
</style>
<style lang="less">
  #companyApprove {
    .el-input__inner {
      max-width: 606px;
    }
    .el-input{
      width:auto;
    }

  }
</style>

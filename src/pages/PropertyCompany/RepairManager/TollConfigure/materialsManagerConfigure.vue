<template>
  <div id="materialsManagerConfigure">
    <div class="main-cont">
      <div class="common">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">物料管理配置</span>
        </div>
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item fl">
              <el-input v-model.trim="meterialsName" placeholder="物料名称"></el-input>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="searchList">搜索</el-button>
              <el-button type="primary" @click="addBtn">添加</el-button>
            </div>
          </div>
          <div class="tables">
            <el-table :data="MeterialList" style="width: 100%" :empty-text=text>
              <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="categroyName" label="物料名称" width="180"></el-table-column>
              <el-table-column prop="materielName" label="上级分类"></el-table-column>
              <el-table-column prop="materielUnit" label="计量单位"></el-table-column>
              <el-table-column prop="materielPrice" label="价格(元)">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button  type="primary"  size="small" @click="openDelete(scope.row)">删除</el-button>
                  <el-button  type="primary"  size="small" @click="editClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="clear20"></div>
            <div class="clearfix">
              <div class="fl">
                <el-pagination
                  @current-change=" handleCurrentChange"
                  background
                  :current-page.sync="servicesConfigureParams.pageIndex"
                  layout="prev, pager, next"
                  :page-count="servicesConfigureInfo.pageTotal">
                </el-pagination>
              </div>
              <div class="fl pagestyle">
                <span>共{{this.servicesConfigureParams.pageTotal}}页，当前第{{this.servicesConfigureParams.pageIndex}}页,每页30条，共{{this.servicesConfigureParams.totalRecord}}条</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="确定删除" :visible.sync="dialogVisible2" width="30%" :modal-append-to-body='false'>
							<span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="deleteClick">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import buildingCascader from '@/components/public/buildingCascader'
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

  export default {
    name: "materialsManagerConfigure",
    data() {
      return {
      	text:'正在加载，请稍候',
        servicesConfigureParams: {
          companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          pageIndex:1,//当前页
          pageSize:30,//每页条数
          pageTotal:0,//总页数
          totalRecord:0,//总条数
        },
        servicesConfigureInfo: {
        	pageIndex:1,//当前页
          pageTotal: 0,
        },
        meterialsName:'',//物料名称
        MeterialList: [],//物料列表
        dialogVisible2:false,
        //当前操作行。为了方便删除操作
        currentRow:{}
      }
    },

    created() {
    	this.getMeterialList()
    },
    computed: {},
    methods: {
      indexMethod(index) {//编号
        return (this.servicesConfigureParams.pageIndex - 1)*30 + 1 + index;
      },
      //分页方法
      handleCurrentChange(index) {
        this.servicesConfigureParams.pageIndex = index;
        //this.queryDepartmentByCompanyId();
      },
      getMeterialList(){//获取服务项列表
      	this.$httpPasser.post("materiel/getList",{
      		pageIndex:this.servicesConfigureInfo.pageIndex,
      		shopId:this.servicesConfigureParams.companyId,
      		pageSize:this.servicesConfigureParams.pageSize,
      		materielName:this.meterialsName
      	}).then((res)=>{
      		if(res.data.resultCode == '200'){
      			this.MeterialList = res.data.result;
            this.servicesConfigureParams.pageTotal = res.data.pageTotal;
            this.servicesConfigureParams.totalRecord = res.data.totalRecord;
            this.servicesConfigureParams.pageIndex = res.data.pageIndex
      		}else{
      		this.text ="暂无数据"
            this.MeterialList =[];
          }
      	})
      },
      addBtn(){
        this.$router.push({
          path:'./materialsConfigureAdd'
        })
      },
      searchList(){
        this.getMeterialList()
      },
      deleteClick(){
				this.$httpPasser.post("materiel/delete",{
					materielId:this.currentRow.materielId,
					shopId:this.servicesConfigureParams.companyId,
				}).then((res)=>{
					if(res.data.resultCode == '200'){
						this.$message.success(res.data.resultCodeDesc)
            this.dialogVisible2 = false;
						this.getMeterialList()
					}else{
						this.$message.error(res.data.resultCodeDesc)
            this.MeterialList = [];
					}
				})
      },
      //打开删除对话框
      openDelete(row){
        this.currentRow = row;
        this.dialogVisible2 = true;
      },
      editClick(row){
        this.$router.push({
          path:'./materialsEdit',
          query:{materielId:row.materielId}
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #materialsManagerConfigure{
    .main-cont{
      margin-top: 20px;
      padding-bottom: 20px;
    }
    .form-item {
      margin-right: 15px;
    }
    .common{
      width:100%!important;
    }
    .tables{
      padding-top: 30px;
      .pagestyle{
        line-height:30px;
      }
    }
  }
</style>
<style lang="less">

</style>

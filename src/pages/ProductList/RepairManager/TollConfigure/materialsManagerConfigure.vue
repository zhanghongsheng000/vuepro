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
              <el-input v-model.trim="meterialsName" placeholder="物料名称" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="searchBtn">搜索</el-button>
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
                  <el-button  type="primary"  size="small" @click="deleteClick(scope.row)">删除</el-button>
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
      	text:'暂无数据，请稍候',
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
      		}else{
      			this.text = "暂无数据"
      		}
      	})
      },
      searchBtn(){

      },
      addBtn(){
        this.$router.push({
          path:'./materialsConfigureAdd'
        })
      },
      deleteClick(row){
				this.$httpPasser.post("materiel/delete",{
					materielId:row.materielId,
					shopId:this.servicesConfigureParams.companyId,
				}).then((res)=>{
					if(res.data.resultCode == '200'){
						this.$message.success('删除成功')
						this.getMeterialList()
					}else{
						this.$message.error(res.data.resultCodeDesc)
					}
				})
      },
      editClick(row){
        this.$router.push({
          path:'./materialsEdit',
          materielId:row.materielId
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

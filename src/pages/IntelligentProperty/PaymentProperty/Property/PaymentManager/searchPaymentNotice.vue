<template>
	<div class="mainPart searchPaymentNotice" id="searchPaymentNotice">
    <div>
      <div class="top-title" style="padding-top: 10px;">
        <div class="line"></div>
        <span class="top-text">缴费公告查询</span>
      </div>
    </div>
		<el-form ref="searchParams" :model="searchParams">
			<!--<el-form-item label="区域选择">-->
				<!--<el-select v-model="houseform.provinceCode"  clearable placeholder="请选择省份" @change="getCity">-->
					<!--<el-option v-for="(province,index) in houseform.provinceList" :key="index" :label="province.name" :value="province.code"></el-option>-->
				<!--</el-select>-->
				<!--<el-select v-model="houseform.cityCode"  clearable placeholder="请选择市" @change="getCounty" :disabled="houseform.provinceCode==''">-->
					<!--<el-option v-for="(city,index) in houseform.cityList" :key="index" :label="city.name" :value="city.code"></el-option>-->
				<!--</el-select>-->
				<!--<el-select v-model="searchParams.areaId" clearable placeholder="请选择区" :disabled="houseform.cityCode==''">-->
					<!--<el-option v-for="(county,index) in houseform.countyList" :key="index" :label="county.name" :value="county.code"></el-option>-->
				<!--</el-select>-->
			<!--</el-form-item>-->
			<el-form-item label="楼盘名称">
				<el-input v-model="searchParams.buildingName" placeholder="请输入楼盘名称" class="input_type" clearable></el-input>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>

      <div class="clear20"></div>
		</el-form>
		<el-table :data="tableData"  style="width: 100%">
      <el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
			<el-table-column prop="propertyCompanyName" label="物业公司">
			</el-table-column>
			<el-table-column prop="buildingName" label="写字楼名称">
			</el-table-column>
			<el-table-column prop="feeNoticeName" label="缴费公告名称">
			</el-table-column>
			<el-table-column prop="createTime" label="发布日期">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="todetails(scope.row)" type="text" size="small">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
    <div class="clearfix pt20" v-if="searchParams.pageTotal>0">
      <div class="clearfix">
        <div class="fl" >
          <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex" layout="prev, pager, next" :page-count="searchParams.pageTotal">
          </el-pagination>
        </div>
        <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
          <span>共{{this.searchParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.searchParams.totalRecord}}条</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import pagination from '@/components/IntelligentProperty/IntelligentPropertyPublic/pagination'
	export default {
		data() {
			return {
				input: '',
        //地区列表
				houseform: { //房源信息
          provinceList: [], //省列表
					cityList: [], //市列表
					countyList: [], //区列表
          provinceCode:'',
          cityCode:'',
          countyCode:'',
				},
        //搜索参数
        searchParams:{
				  companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          areaId:'',
          buildingName:'',
          pageIndex:1,
          //每页条数
          pageSize:30,
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },
				tableData: [],
        //分页总页数
        pageTotal:0,
        //当前页码
        currentIndex:1
			}
		},
    components:{
      pagination: pagination
    },
		methods: {
      indexMethod(index) {//编号
        return (this.searchParams.pageIndex - 1)*30 + 1 + index;
      },
      handleCurrentChange(index){
        this.searchParams.pageIndex = index;
        this.search()
      },
		  //获取省列表
		  getProvinceList(){
		    this._http('/area/getArea','get',{level:'province'},(data)=>{
		      this.houseform.provinceList = data.result;
        })

      },
			getCity() { //切换省份获取市的方法
        this._http('/area/getArea','get',{level:'city',areaCode:this.houseform.provinceCode},(data)=>{
          this.houseform.cityList = data.result;
          this.houseform.cityCode = '';
          this.searchParams.areaId = '';
        })
			},
			getCounty() { //切换市的时候 获取区的方法
        this._http('/area/getArea','get',{level:'county',areaCode:this.houseform.cityCode},(data)=>{
          this.houseform.countyList = data.result;
          this.searchParams.areaId = '';
        })
			},
      //查找缴费公告
			search() {
//        this.searchParams.pageIndex = this.currentIndex;
//        this._http('propertyCompany/getFeeNotice','get',this.searchParams,(data)=>{
//          this.tableData = data.result
//        })
        this.$http.post("propertyCompany/getFeeNotice",{
          companyId:this.searchParams.companyId,
          areaId:this.searchParams.areaId,
          buildingName:this.searchParams.buildingName,
          pageIndex:this.searchParams.pageIndex,
          pageSize:this.searchParams.pageSize,
        }).then((res)=>{
          let data = res.data;
          if(data.resultCode == '200'){
            this.tableData = data.result
            this.searchParams.pageTotal  = data.pageTotal
            this.searchParams.totalRecord =data.totalRecord
            this.searchParams.pageIndex = data.pageIndex
          }else if(data.resultCode == '204'){
            this.tableData = []
            this.searchParams.pageTotal  = data.pageTotal
            this.searchParams.totalRecord =data.totalRecord
            this.searchParams.pageIndex = data.pageIndex
          }else{
          }
        })
			},
      //进入详情页面
			todetails(row) {
				this.$router.push({path:'paymentNoticeDetail',query:{feenoticeId:row.feenoticeId,isUnPublish:false}});
			},
      //设置当前页
      getCurrentIndex(currentIndex){
		    this.currentIndex = currentIndex;
      },
      /*工具方法*/
      _http(url,type,params,callback200){
        if(type=="get"){
          this.$http.get(
            url,
            {params:params}
          ).then(
            (response)=>{
              let data = response.data;
              if(data.resultCode==200){
                callback200(data)
              }
              else if(response.data.resultCode==204){
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
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
        else if(type=="post"){

        }

      }
		},
    mounted:function(){
		  this.getProvinceList();
		  this.search()
    }
	}
</script>

<style scoped lang="less">
	.searchPaymentNotice {
    /*line-height:35px;*/
		width: 1200px;
		form {
			line-height: 40px;
		}
		.clear20 {
			clear: both;
			height: 20px;
			width: 100%;
		}
		.input_type {
			width: 200px;
		}
	}
  #searchPaymentNotice{
    width:1040px;
  }
</style>
<style lang="less">
  #searchPaymentNotice{
    .el-table th{
      text-align: center;
    }
    .el-table td{
      text-align: center;
    }
  }

</style>

<template>
	<div id="servicesConfigure">
		<div class="main-cont">
			<div class="common">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">服务项配置</span>
				</div>
				<div class="main-box">
					<div class="forms-cont clearfix">
						<div class="form-item fl">
							<el-input v-model.trim="servicesName" placeholder="服务名称"></el-input>
						</div>
						<div class="form-item fl">
							<el-button type="primary" @click="getServeList">搜索</el-button>
							<el-button type="primary" @click="addBtn">添加</el-button>
						</div>
					</div>
					<div class="tables">
						<el-table :data="ServeList" style="width: 100%" :empty-text=text>
							<el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
							<el-table-column prop="serviceItemName" label="服务名称"></el-table-column>
							<el-table-column prop="serviceItemUnit" label="计量单位"></el-table-column>
							<el-table-column prop="serviceItemPrice" label="价格(元)">
							</el-table-column>
							<el-table-column fixed="right" label="操作" width="150">
								<template slot-scope="scope">
									<el-button type="primary" size="small" @click="deleteClick(scope.row)">删除</el-button>
									<el-button type="primary" size="small" @click="editClick(scope.row)">编辑</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="clear20"></div>
						<div class="clearfix">
							<div class="fl">
								<el-pagination @current-change="handleCurrentChange" background :current-page.sync="servicesConfigureParams.pageIndex" layout="prev, pager, next" :page-count="servicesConfigureInfo.pageTotal">
								</el-pagination>
							</div>
							<div class="fl pagestyle">
								<span>共{{this.servicesConfigureParams.pageTotal}}页，当前第{{this.servicesConfigureParams.pageIndex}}页,每页30条，共{{this.servicesConfigureParams.totalRecord}}条</span>
							</div>
						</div>
						<el-dialog title="确定删除" :visible.sync="dialogVisible2" width="30%" :modal-append-to-body='false'>
							<span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="delete1">确 定</el-button>
          </span>
						</el-dialog>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import gUrl from '@/assets/js/gUrl'

	export default {
		name: "servicesConfigure",
		data() {
			return {
				text:"正在加载，请稍候",
				dialogVisible2:false,//确定删除弹框
				serviceItemId:'',//服务项编号
				servicesConfigureParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					customerUserId:this.$local.sefetch('info') ? this.$local.sefetch('info').ueseName : '',
					pageIndex: 1, //当前页
					pageSize: 30, //每页条数
					pageTotal: 0, //总页数
					totalRecord: 0, //总条数
				},
				servicesConfigureInfo: {
					pageTotal: 0,
					pageIndex: 1,
				},
				servicesName: '',
				ServeList: []
			}
		},

		created() {
			this.getServeList()
		},
		computed: {},
		methods: {
			indexMethod(index) { //编号
				return(this.servicesConfigureParams.pageIndex - 1) * 30 + 1 + index;
			},
			//分页方法
			handleCurrentChange(index) {
				this.servicesConfigureInfo.pageIndex = index;
				this.servicesConfigureParams.pageIndex = index;
				this.getServeList();
				//this.queryDepartmentByCompanyId();
			},
			addBtn() {//添加
				this.$router.push({
					path: './servicesAdd'
				})
			},
			editClick(row){
				this.$router.push({
					path:'./editServices',
          query:{service:row}
				})
			},
			getServeList() { //获取服务项列表
				this.$httpPasser.post("serviceitem/getList", {
					pageIndex: this.servicesConfigureInfo.pageIndex,
					shopId: this.servicesConfigureParams.companyId,
					pageSize: this.servicesConfigureParams.pageSize,
					serviceItemName: this.servicesName
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.ServeList = res.data.result
						this.servicesConfigureParams.pageTotal = res.data.pageTotal;
						this.servicesConfigureParams.totalRecord = res.data.totalRecord;
						this.servicesConfigureParams.pageIndex = res.data.pageIndex
					}
					else if(res.data.result&&res.data.result.length==0){
						this.text = "暂无数据"
					  this.ServeList = res.data.result;
            this.servicesConfigureParams.pageTotal = res.data.pageTotal;
            this.servicesConfigureParams.totalRecord = res.data.totalRecord;
            this.servicesConfigureParams.pageIndex = res.data.pageIndex
          }
				})
			},
			deleteClick(row) {//确定删除弹框
				this.dialogVisible2 = true;
				this.serviceItemId = row.serviceItemId
			},
			delete1(){
				this.$http.post("serviceitem/delete",{
					serviceItemId:this.serviceItemId,
					shopId:this.servicesConfigureParams.companyId
				}).then((res)=>{
					if(res.data.resultCode == '200'){
						this.$message.success("删除成功")
						this.getServeList()
					}else{
						this.$message.error(res.data.resultCodeDesc)
						this.getServeList()
					}
					this.dialogVisible2 = false;
				})
			},
		}
	}
</script>

<style scoped lang="less">
	#servicesConfigure {
		.main-cont {
			margin-top: 20px;
			padding-bottom: 20px;
		}
		.form-item {
			margin-right: 15px;
		}
		.common {
			width: 100%!important;
		}
		.tables {
			padding-top: 30px;
			.pagestyle {
				line-height: 30px;
			}
		}
	}
</style>
<style lang="less">

</style>

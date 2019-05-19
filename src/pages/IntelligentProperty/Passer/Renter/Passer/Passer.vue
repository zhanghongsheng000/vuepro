<template>
	<div class="RenterPasser">
		<div class="rscont lktxjlcxcontainer">
			<div class="main-cont">
				<div class="pt50">
          <div class="top-title font14" style="text-align:left;">
            <div class="line"></div>
            <span class="top-text font14">通行客</span>
          </div>
					<div>
						<div class="fl_section">
							<span style="line-height: 30px;font-size: 14px;">员工姓名：</span>
							<input v-model="userName" placeholder="请输入员工姓名" class="employname">
						</div>
						<div class="fl_section">
							<el-select v-model="flag" placeholder="全部">
								<el-option label="全部" value=""></el-option>
								<el-option label="已开通" value="Y"></el-option>
								<el-option label="未开通" value="N"></el-option>
							</el-select>
						</div>
						<div class="fl_section" @click="getEmployeeByConditionList(1)">
							<el-button type="primary">查询</el-button>
						</div>
					</div>
					<div class="main-box">
						<div class="tables">
							<el-table :data="employeeList"  @selection-change="handleSelectionChange" ref="customerUserIdList" :empty-text=text>
								<!--<el-table-column fixed type="selection" :selectable="isNeedImproveCheckBoxFlag">{{isNeedImproveCheckBoxFlag}}</el-table-column>-->
								<!--<el-table :data="staffList" style="width: 98%" @selection-change="handleSelectionChange" @select-all="seleAll">-->
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column prop="workCode" label="工号"></el-table-column>
								<el-table-column prop="name" label="姓名" width='100'></el-table-column>
								<el-table-column prop="sex" label="性别" width='55'></el-table-column>
								<el-table-column prop="telphone" label="手机号码" width='200'></el-table-column>
								<el-table-column prop="idCard" label="身份证号码"></el-table-column>
								<!--<el-table-column prop="flag" label="通行客"></el-table-column>-->
                <el-table-column label="状态" width='80'>
                  <template slot-scope="scope">
                    <span v-if="scope.row.flag=='N'"
                          size="small">未开通
                    </span>
                    <span v-if="scope.row.flag=='Y'"
                          size="small">已开通
                    </span>
                  </template>
                </el-table-column>
								<el-table-column fixed="right" label="通行客" width="150">
									<template slot-scope="scope">
										<el-button v-if="scope.row.flag=='N'" @click="openClick(scope.$index, scope.row)" type="text" size="small">开通通行客</el-button>
										<span v-if="scope.row.flag=='Y'">已开通</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!--<div class="fr btnstyle" @click="handleopen">
							<el-button type="primary">批量开通</el-button>
						</div>-->

					</div>
          <div class="clearfix">
            <div class="fl">
              <div class="clearfix">
                <div class="pagination fl">
                  <el-pagination background layout="prev, pager, next" :total="num" @current-change="pagesChange"  :page-size="pages"></el-pagination>
                </div>
                <div class="fl pagestyle font12"> <span>共{{this.pageTotal}}页，当前第{{this.pageNow}}页 , 每页30条数据， 总共{{this.pagetotal}}条数据</span></div>
              </div>
            </div>
            <div class="fr">
              <div class="fr " >
                <el-button type="primary" @click="handleopen">批量开通</el-button>
                <el-button type="primary" @click="openAllPasser">全部开通</el-button>
              </div>
            </div>
          </div>

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
        pages:30,
				getRenterParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				departmentId: '', //部门id
				userName: '', //员工姓名
				flag: '', //选择开通未开通的状态
				pagetotal: 0, //列表总条数
				pageNow: 1, //当前页码
				pageTotal: 0, //总页数
				pageIndex: 1,
				employeeList: [], //列表
				customerUserIdList: [], //用户编号
				employname: '', //用户名（员工姓名）
				departmentId: '', //部门id
			}
		},
		created() {
			this.getEmployeeByConditionList(1); //列表
		},
		methods: {
			indexMethod(index) { //编号
				return(this.pageNow - 1) * 30 + 1 + index;
			},
			handleSelectionChange(selection) {//选中列
				console.log(1111)
				this.customerUserIdList = [];
				for(let o in selection) {
					this.customerUserIdList.push(selection[o].customerUserId)
				}
			},
			getEmployeeByConditionList(pageIndex) { //加载列表
				this.$httpPasser.post('employee/getTanentEmployeeByCondition', {
					companyId: this.getRenterParams.companyId,
					departmentId: this.departmentId,
					userName: this.userName,
					pageIndex: pageIndex,
					pageSize: '30',
					flag: this.flag
				}).then((res) => {
					console.log(res.data)
					if(res.data.resultCode == '200') {
						this.employeeList = res.data.result.employeeList
						this.customerUserIdList = [];
						this.pagetotal = res.data.totalRecord;
						this.pageTotal = res.data.pageTotal;
						console.log(this.customerUserIdList)
					} else if(res.data.resultCode == '204') {
						this.text = "暂无数据"
						this.employeeList = res.data.result.employeeList
						this.pagetotal = res.data.totalRecord;
						this.pageTotal = res.data.pageTotal;
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						});
					} else {
						this.text = "暂无数据"
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			openClick(index, row) { //单条开通通行客
				this.customerUserIdList = [];
				this.customerUserIdList.push(row.customerUserId);
				this.$httpPasser.post("production/openPassengerForEmployee", {
					customerUserIdList: this.customerUserIdList,
					shopId: this.getRenterParams.companyId
				}).then((res) => {
					console.log(res.data);
					if(res.data.resultCode == "200") {
						this.$message({
							showClose: true,
							message: "开通成功",
							type: 'success'
						});
					}else{
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
					this.getEmployeeByConditionList(this.pageNow)
				})
			},
			handleopen() {//批量开通通行客
				this.$httpPasser.post("production/openPassengerForEmployee", {
						customerUserIdList: this.customerUserIdList,
					shopId: this.getRenterParams.companyId
					}
				).then((res) => {
					if(res.data.resultCode == 200) {
						this.$message({
							showClose: true,
							message: "选中的员工已全部开通",
							type: 'success'
						});
					}else{
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
					this.getEmployeeByConditionList(this.pageNow)
				})
			},
      openAllPasser(){
			  this.$httpPasser.post(
			    'production/openPassengerForAllEmployee',
          {
            shopId: this.$local.sefetch('info').companyId
          }
          ).then(
          (res)=>{
            if(res.data.resultCode==200){
              this.$message.success(res.data.resultCodeDesc)
              this.getEmployeeByConditionList(1)
            }
            else{
              this.$message.error(res.data.resultCodeDesc)
            }
          }
        )
      },
			pagesChange(currentPage) { //分页
				this.pageNow = currentPage
				this.getEmployeeByConditionList(currentPage)
			},

		},
		computed: {
			num() {
				return parseInt(this.pagetotal)
			}
		},
	}
</script>
<style lang="less" scoped>
	.RenterPasser {
		padding: 10px 0 10px 0;
		width: 1040px;
		min-height: 86%;
		.rscont {
      width:1040px;
			.pt50 {
				padding-top: 10px;
				/*width: 1400px;*/
			}
			/*.top-title {
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
			}*/
			.main-box {
				padding-bottom: 30px;
				padding-top: 50px;
				.btn-style {
					padding-bottom: 120px;
				}
			}
			.employname {
				border: 1px solid #dcdfe6;
				padding: 0 15px;
				height: 40px;
				line-height: 40px;
				border-radius: 5px;
			}
			.fl_section {
				float: left;
				margin-left: 20px;
			}
		}
		.pagination {
			padding-bottom: 20px;
		}
		.pagestyle {
			line-height: 30px;
		}
		.btnstyle {
			margin: 20px 80px 0 0;
		}
	}
</style>

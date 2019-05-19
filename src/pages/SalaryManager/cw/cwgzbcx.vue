<template>
	<div class="rscont cwxzsz cwgzcxcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">工资表查询</span>
				</div>
				<div class="main-box">
					<el-table ref="singleTable" :data="salaryList" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
						<el-table-column type="index" label="编号" width="50">
						</el-table-column>
						<el-table-column property="date" label="月份" >
						</el-table-column>
						<el-table-column property="salaryStatus" label="状态" >
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="tosalaryxq(scope.row)">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				getBuildingGroupParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				name: '',
				idnum: '',
				value: '',
				dialogFormVisible: false,
				dialogVisible: false,
				radio: '1',
				companyId: '',
				salaryList: [],
				currentRow: null,
				multipleSelection: [],
				currentRow: {
					nums: "",
					Referenceitem: "",
					Referencevalue: ""
				}
			}
		},
		created() {
			this.getsalaryList()
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleEditClick(row) {
				for(let o in row) {
					this.currentRow[o] = row[o]
				}
				this.dialogVisible = true;
			},
			getsalaryList() {
				this.$http.get('salary/getSalaryMonthsalary', {
					params: {
						companyId: this.getBuildingGroupParams.companyId
					}
				}).then((res) => {
					if(res.data.resultCode =='200'){
            this.salaryList = res.data.result;
          }else {
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
				})
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			tosalaryxq(row){//跳转到工资详情页面
				console.log("row:", row);
				this.$router.push({
					name: 'salaryxq',
					query: {
						companyId: this.getBuildingGroupParams.companyId,
						monthsalaryId: row.monthsalaryId,
						date:row.date
					}
				})
			}
		},
	}
</script>
<style lang="less" scoped>
	.rscont {
		.banner {
			height: 250px;
			background: url("../../../assets/img/SalaryManager/cwbg.png") center center no-repeat;
			.ban-text {
				padding-top: 100px;
				text-align: center;
				color: #fff;
				font-size: 60px;
			}
		}
		.pt50 {
			padding-top: 50px;
			width: 1400px;
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
				font-size: 18px;
				background-color: #fff;
				padding: 0 4px;
				line-height: 30px;
			}
		}
		.main-box {
			.btn-style {
				padding-bottom: 120px;
			}
		}
	}
</style>
<style lang="less">
  .cwgzcxcontainer{
      .el-dialog__header {
        border-bottom: solid 1px #ccc;
      }
      padding-bottom: 120px;
      .el-input {
        width: 69%;
      }
      .inputstyle {
        padding: 5px 10px;
        span {
          display: inline-block;
          width: 80px;
          text-align: right;
        }
      }
      .select {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .el-radio {
        padding: 5px 10px;
      }
  }
</style>

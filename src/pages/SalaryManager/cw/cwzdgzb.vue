<template>
	<div class="rscont cwdgzb cwdgzbcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">制定工资表</span>
				</div>
				<div class="top_con clearfix" style="padding-bottom: 20px;">
					<div class="fl">
						<div class="inline-block">
							<span>月份：</span>
							<el-date-picker v-model="changeMonth" @change="dateChange" value-format="yyyy-MM" type="month" placeholder="选择月">
							</el-date-picker>
							<span>工资表</span>
						</div>
					</div>

					<div style="display: inline-block;">
						<span class="fl" style="margin-top: 8px;margin-left: 10px;">导入考勤表：</span>
						<el-upload class="upload-demo fl" ref="upload" :action="action + 'salary/importWages'" :data="param" :on-success="importSuccess" style="display: inline-block;">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						</el-upload>
					</div>
					<div style="display: inline-block; float: right;">
						<a :href="action + 'salary/exportDistrictStatistics?companyId=' + getBuildingGroupParams.companyId" class="primary">导出excel模板</a>
					</div>
				</div>

				<div class="main-box">
					<el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%">
						<el-table-column v-for="(label, index) in labelList" :key="index" :prop="label.key" :label="label.value">
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="handleEditClick(scope.row, scope.$index)">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-dialog title="员工薪资管理" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" :before-close="handleClose">
						<div class="demo-input-suffix">
							<div class="inputstyle">
								<span>部门：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.department" disabled></el-input>
							</div>
							<div class="inputstyle">
								<span>工号：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.code" disabled></el-input>
							</div>
							<div class="inputstyle">
								<span>姓名：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.name" disabled></el-input>
							</div>
							<div class="inputstyle">
								<span>职位：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.postName" disabled></el-input>
							</div>
							<div class="inputstyle" v-for="item in wagesList">
								<span>{{item.label}}：</span>
								<el-input placeholder="请输入内容" :data-wages="'wages'" :name="item.name" :value="item.value" clearable></el-input>
							</div>

						</div>
						<span slot="footer" class="dialog-footer">
    						<el-button @click="dialogVisible = false">取 消</el-button>
    						<el-button type="primary" @click="updateSalaryPayrollitemByPayrollId">保 存</el-button>
  						</span>
					</el-dialog>
				</div>
				<div class="main-middle clearfix">
					<div class="left-cont fl">
						<p class="money-text">实发工资总额(元)</p>
						<p class="money-num">{{total}}</p>
					</div>
				</div>
				<div style="margin-top: 20px" class="btn-style">
					<el-button type="primary" @click="submitAudit">提交审核</el-button>
					<el-button type="primary" @click='Preservation'>保存草稿</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {$local} from '@/assets/js/utils'
	import gUrl from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				param: {
					companyId: null,
					year: '',
					month: ''
				},
				action:"",
				monthsalary_id:'', //月份id
				changeMonth: '',
				year: '',
				name: '',
				idnum: '',
				value: '',
				total:'',//总工资
				dialogFormVisible: false,
				dialogVisible: false,
				radio: '1',
				fileList: [],
				getBuildingGroupParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : ''
				},
				multipleSelection: [],
				currentRow: {
					department: '',
					code: '',
					name: '',
					postName: ''
				},
				wagesList: [],
				labelList: [],
				dataList: [],
				param: {
					year: null,
					month: null
				},
				updateParam: {

				},
				year:'',
				month:'',
				payrollId:'',
				employeeId:''
			}
		},
		created() {
			this.action = gUrl;
			this.changeMonth = new Date();
			this.param.year = new Date().getFullYear();
			this.param.month = new Date().getMonth() + 1;
			this.year = new Date().getFullYear();
			this.month = new Date().getMonth() + 1;
			this.param.companyId = this.getBuildingGroupParams.companyId;
			this.param.userId = this.getBuildingGroupParams.userId;
			this.getSalaryPayrollitem();
		},
		methods: {//编辑
			updateSalaryPayrollitemByPayrollId() {
				document.querySelectorAll("input[data-wages='wages']").forEach((el, index) => {
					this.updateParam[el.name] = el.value;
				});
				this.updateParam.payrollId = this.payrollId;
				this.updateParam.employeeId = this.employeeId;
				this.updateParam.companyId = this.getBuildingGroupParams.companyId;
				this.updateParam.monthsalary_id = this.monthsalary_id;
				this.$http.post(
					'salary/updateSalaryPayrollitemByPayrollId',
					this.updateParam
				).then((res) => {
					this.getSalaryPayrollitem();
					this.dialogVisible = false;
					if(res.data.resultCode == '200') {
						this.$message.success('修改成功');
					} else {
						this.$message.error('修改失败')
					}
				})
			},
			getSalaryPayrollitem() {//显示工资表
				this.$http.post(
					'salary/getSalaryPayrollitem', {
						companyId: this.getBuildingGroupParams.companyId,
						year: this.year,
						month: this.month
					}
				).then((res) => {
					if(res.data.resultCode =='200'){
            this.monthsalary_id = res.data.result.monthsalary_id;
            this.total = res.data.result.monthsalaryRealpayment
            this.labelList = res.data.result.labelList;
            this.dataList = res.data.result.dataList;
          }else {
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
				})
			},
			handleClick(row) {
				console.log(row);
			},
			importSuccess(event, file, fileList) {
				console.log(event)
				if(event.resultCode == 204 || event.resultCode == 205){
					this.$message.error(event.resultCodeDesc);
				}else {
					this.getSalaryPayrollitem();
				}
			},
			handleEditClick(row, index) {
				console.log(row);
				this.payrollId = row.payrollId;
				this.employeeId = row.employeeId;
				this.dialogVisible = true;
				for(let o in row) {
					this.currentRow[o] = row[o]
				}
				this.currentIndex = index;
				this.$http.get('salary/getSalaryPayrollitemByEmployeeId', {
					params: {
						employeeId: row.employeeId,
						companyId: this.getBuildingGroupParams.companyId,
						year: this.year,
						month: this.month
					}
				}).then((res) => {
				  if(res.data.resultCode == '200'){
            this.wagesList = res.data.result;
          }else{
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
				})
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			dateChange(date) {
				this.year = date.split("-")[0];
				this.month = date.split("-")[1];
				this.param.year = date.split("-")[0];
				this.param.month = date.split("-")[1];
				this.getSalaryPayrollitem();
			},
			Preservation() { //保存草稿
				this.$http.get('salary/addDraftAttendance', {
					params: {
						monthsalary_id: this.monthsalary_id
					}
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message.success('保存成功');
					} else {
						this.$message.error('保存失败');
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			submitAudit() { //提交审批
        if(this.dataList == ''){
          this.$message.error('请导入工资表')
        }else{
          this.$http.get('salary/submissionReview', {
            params: {
              monthsalary_id: this.monthsalary_id
            }
          }).then((res) => {
            if(res.data.resultCode == '200') {
              this.$message.success('提交审批成功，请等待领导审核');
            } else {
              this.$message({
                showClose: true,
                message: data.resultCodeDesc,
                type: 'error'
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        }
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
			padding-bottom: 120px;
			.btn-style {
				padding-bottom: 120px;
			}
		}
		.main-middle {
			margin-bottom: 25px;
			.left-cont {
				padding-top: 24px;
				.money-text {
					font-size: 14px;
				}
				.money-num {
					font-size: 48px;
					color: #3681fd;
				}
			}
			.right-cont {
				.link-item {
					display: inline-block;
					width: 120px;
					height: 120px;
					margin-left: 30px;
				}
			}
		}
		.btn-style {
			padding-bottom: 120px;
		}
	}
</style>
<style lang="less">
    .cwdgzbcontainer {
      .el-dialog__header {
        border-bottom: solid 1px #ccc;
      }
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
      .el-dropdown {
        border: 1px solid #dedede;
        padding: 6px 10px;
        border-radius: 5px;
      }
      .primary {
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
        padding: 8px 12px;
        border-radius: 5px;
      }
      .el-table .cell,
      .el-table th div {
        padding-right: 8px;
      }
      .inputstyle span {
        width: 85px;
      }
    }
</style>

<template>
	<div class="attendanceByday fr">
		<div class="fl_section">
			<span style="line-height: 30px;font-size: 14px;">日期：</span>
			<el-date-picker v-model="value1" value-format='yyyy-MM-dd' type="date" placeholder="日期">
			</el-date-picker>
			<span style="line-height: 30px;font-size: 14px;margin-left: 10px">部门：</span>
			<el-select v-model.trim="department" clearable placeholder="部门">
				<el-option v-for="item,index in departmentList" :key="index" :label="item.departmentName" :value="item.departmentId">
				</el-option>
			</el-select>
			<span style="line-height: 30px;font-size: 14px;margin-left: 10px">姓名：</span>
			<input v-model="userName" placeholder="请输入员工姓名" class="inputtype">
			<div class="form-item fr" style="margin-left: 30px;">
				<el-button type="primary " @click="getDayAttendance">查询</el-button>
			</div>
		</div>
		<el-table :data="attendanceBydayTable" style="width: 100%"
              v-loading="loading" :empty-text=text>
			<el-table-column prop="userName" label="姓名">
			</el-table-column>
			<el-table-column prop="departmentName" label="部门" width="180">
			</el-table-column>
			<el-table-column prop="code" label="工号">
			</el-table-column>
			<el-table-column prop="configTime" label="班制">
			</el-table-column>
			<el-table-column prop="onTime" label="签到时间">
			</el-table-column>
			<el-table-column prop="onResult" label="签到结果" width="160">
				<template slot-scope="scope">
					<div v-if="!(scope.row.onTime ==''|| scope.row.onTime ==null ||scope.row.onTime ==0||scope.row.onTime =='0')">
						<span v-if="scope.row.lateTime ==''|| scope.row.lateTime ==null ||scope.row.lateTime ==0||scope.row.lateTime =='0'">正常</span>
						<el-button v-else type="text" class="danger" @click="signInDialog(scope.row)">
							迟到{{convertMsToHAndM(scope.row.lateTime)}}
						</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="offTime" label="签退时间">
			</el-table-column>
			<el-table-column prop="offResult" label="签退结果">
				<template slot-scope="scope">
					<div v-if="!(scope.row.offTime ==''|| scope.row.offTime ==null ||scope.row.offTime ==0||scope.row.offTime =='0')">
						<span v-if="scope.row.ztTime==''||scope.row.ztTime==null||scope.row.ztTime=='0'||scope.row.ztTime==0">正常</span>
						<el-button v-else type="text" class="danger" @click="signInDialog(scope.row)">早退{{convertMsToHAndM(scope.row.ztTime)}}</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="dayResult" label="考勤结果">
				<template slot-scope="scope">
					<p>{{scope.row.dayResult}}</p>
					<p>{{scope.row.Info}}</p>
				</template>
			</el-table-column>
		</el-table>

		<!--签到的弹框-->
		<el-dialog title="" :visible.sync="dialogVisible" width="1000">
			<div class="employee_message">
				<span>{{personal.userName}}</span><span>{{personal.departmentName}}</span><span>{{personal.date}}</span>
			</div>
			<div class="dealResult">
				<table border="1" cellspacing="10" cellpadding="0" style="border-collapse:collapse;border-color: #dcdfe6;">
					<tr>
						<th>考勤时间</th>
						<th>签到时间</th>
						<th>签到结果</th>
						<th>签退时间</th>
						<th>签退结果</th>
						<th>操作</th>
						<th>考勤结果</th>
					</tr>
					<tr>
						<td>{{personal.configTime}}</td>
						<td>{{personal.onTime}}</td>
						<td>{{personal.onResult}}</td>
						<td>{{personal.offTime}}</td>
						<td>{{personal.offResult}}</td>
						<td>
							<el-select v-model="personal.resultId" placeholder="请选择">
								<el-option v-for="handle in HandleResult" :key="handle.resultId" :label="handle.name" :value="handle.resultId">
								</el-option>
							</el-select>
						</td>
						<td>
							<el-input v-model="personal.Info" placeholder="请输入内容" clearable></el-input>
						</td>
					</tr>
				</table>
			</div>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveHandleResult">保 存</el-button>
      </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "attendance-by-day",
		data() {
			return {
				text:"正在加载，请稍候",
				getRenterParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				value1: '', //所选日期
				currentDate:'',//当前日期
				department: '', //查询部门id
				departmentList: [], //部门列表
				userName: '', //员工姓名
				attendanceBydayTable: [], //日考勤表
				dialogVisible: false, //签到的结果
				HandleResult: [],
        loading:true,
				dayResult: '', //考勤结果
				currentRow: {
					departmentName: '', //部门名称
				},
				/*        savaResult:{
				          recordId:'',
				          handleRecordId:'',
				          resultId:'',
				          info:'',
				          customerUserId:this.$local.sefetch("info").customerUserId
				        },*/
				pagetotal: '', //列表总条数
				personal: {
					customerUserId: this.$local.sefetch("info").userId,
					userName: '', //姓名
					departmentName: "", //部门
					date: "", //日期
					recordId: "", //记录id
					configTime: '', //考勤时间
					onTime: '', //签到时间
					lateTime: '', //迟到时间
					ztTime: "", //早退时间
					onResult: '', //签到结果
					offTime: "", //签退时间
					offResult: '', //签退结果
					handleResultId: '', //原始考勤情况
					handleRecordId: '', //处理记录Id
					Info: '', //备注
					resultId: '', //操作结果
				}
			}
		},
		created() {
			this.getDay(); //获取当前日期
			this.getDepartment(); //获取部门列表
			this.getDayAttendance(); //获取日考勤表
			this.getHandleResult(); //获取处理结果
		},
		methods: {
			//获取当前日期
			getDay() {
				let date = new Date();
				let seperator1 = "-";
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				this.value1 = year + seperator1 + month + seperator1 + strDate;
				this.currentDate =this.value1;
			},
			//获取部门列表
			getDepartment() { //公司部门列表
				let gsid = this.$local.sefetch('info').companyId
				this.$httpPasser.post('company/queryDepartmentDetailByCompanyId', { //临时这么写，这里接口有问题
						companyId: gsid,
						pageIndex: 1
					})
					.then(res => {
						let data = res.data
						if(data.resultCode == '200') {
							this.departmentList = data.result.departmentList
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//获取日考勤表
			getDayAttendance() {
				this.$httpPasser.post("census/getDayAttendance", {
					shopId: this.getRenterParams.companyId,
					date: this.value1,
					departmentId: this.department,
					userName: this.userName,
				}).then((res) => {
					if(res.data.resultCode == "200") {
						this.attendanceBydayTable = res.data.result;
						this.loading = false;
					} else if(res.data.resultCode == "204") {
						this.attendanceBydayTable = [];
						this.text = '暂无数据'
            this.loading = false;
					} else {
            this.loading = false;
						this.$message({
							type: 'error',
							message: res.data.resultCodeDesc,
							showClose: true,
						})
					}
				})
			},
			//毫秒转时间
			convertMsToHAndM(ms) {
				let re = 0;
				let h = 0;
				let m = 0;
				if(ms > 1000 * 60 * 60) {
					h = Math.floor(ms / (1000 * 60 * 60))
					let temp = ms % (1000 * 60 * 60)
					m = Math.floor(temp / (1000 * 60))
				} else if(ms > 1000 * 60) {
					m = Math.floor(ms / (1000 * 60))
				} else if(ms > 0) {
					m = 1
				} else {
					m = 0
				}
				re = (h == 0 ? '' : h + '小时') + m + '分钟';
				//        console.log(re);
				return re;
			},
			//获取处理结果
			getHandleResult() {
				this.$httpPasser.post("census/getHandleResult", {}).then((res) => {
					if(res.data.resultCode == '200') {
						this.HandleResult = res.data.result;
					}
				})
			},
			//签到
			signInDialog(row) {
				this.$httpPasser.post("census/getPersonAttendance", {
					recordId: row.recordId
				}).then((res) => {
					if(res.data.resultCode == '200') {
						let flag = true;
						this.personal.resultId = '';
						for(let o in res.data.result) {
							this.personal[o] = res.data.result[o]
						}
						let temp = res.data.result.handleResultId
						for(var i = 0; i < this.HandleResult.length; i++) {
							console.log(temp)
							if(this.HandleResult[i].resultId == temp) {
								this.personal.resultId = temp;
								return;
							} else {
								this.personal.resultId = ''
							}
						}
					}
				})
				this.dialogVisible = true;
			},
			//保存备注处理结果
			saveHandleResult() {
				this.$httpPasser.post("census/saveHandleResult", this.personal).then((res) => {
					if(res.data.resultCode == 200) {
						this.dialogVisible = false;
						this.$message.success('保存成功');
						this.getDayAttendance();
					} else {
						this.$message.error(res.data.resultCodeDesc);
					}
				})
			}
		},
		watch: {
			value1: function(newValue, oldValue) {
				if(parseInt(this.value1.replace(/-/g, '')) > parseInt(this.currentDate.replace(/-/g, ''))) {
					this.value1 = this.currentDate
					this.$message({
						showClose: true,
						message: '您选择的日份考勤记录暂未生成，请选择本日之前的日期',
						type: 'error'
					});
				}
			},
		},
		computed: {},
	}
</script>

<style lang="less" scoped>
	.attendanceByday{
		width: 98%;
		padding: 10px;
		.fl_section {
			float: left;
			margin-left: 20px;
			margin-bottom: 20px;
		}
		.inputtype {
			border: 1px solid #dcdfe6;
			padding: 0 15px;
			height: 40px;
			line-height: 40px;
			border-radius: 5px;
		}
		.tables {
			margin-bottom: 10px;
		}
		.pagination {
			margin-bottom: 10px;
		}
		.buttons {
			padding-bottom: 30px;
		}
		.pagestyle {
			line-height: 30px;
		}
		.danger {
			color: #ff0000;
		}
		.dealResult {
			width: 880px;
			margin: 0 auto;
			table {
				margin-top: 10px;
				th {
					padding: 10px;
					border-right: none;
					border-left: none;
				}
				td {
					padding: 10px;
					border-right: none;
					border-left: none;
				}
			}
		}
	}
</style>
<style lang="less">
	.attendanceByday {
    .el-dialog{
      min-width:1000px;
    }
		.el-table .cell {
			text-align: center;
		}
		.el-dialog__body {
			.employee_message {
				text-align: center;
				span {
					font-size: 16px;
					margin-right: 10px;
					font-weight: 600;
				}
			}
		}
		.el-dialog__footer {
			text-align: center;
			padding-bottom: 50px;
		}
	}
</style>

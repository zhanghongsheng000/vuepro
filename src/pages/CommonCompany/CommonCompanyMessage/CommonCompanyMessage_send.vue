<template>
	<div class="commonCompanyNoticeList">
		<div class="main-cont">
			<div class="line"></div>
			<span class="top-text">发送消息</span>
		</div>
		<div class="notice_con">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="消息标题:">
					<el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
				</el-form-item>
				<el-form-item label="消息内容:">
					<el-input type="textarea" v-model="form.info" clearable></el-input>
				</el-form-item>
				<el-form-item label="点击选择:">
					<div class="selectPerson" style="display: inline-block;" readonly>
						<el-button type="primary" @click="choisePerson">员工</el-button>
						<el-button type="primary" @click="choiseDepartment">部门</el-button>
						<el-button type="primary" @click="selectAll">全体成员</el-button>
					</div>
				</el-form-item>
				<el-form-item label="接收人:">
					<span placeholede="请您选择接收人">
            		<span v-for="person,index in selectPerson" :key="index">{{person}}&nbsp;&nbsp;</span>
					</span>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">发送</el-button>
				</el-form-item>
			</el-form>
			<!--员工-->
			<el-dialog title="请选择员工" :visible.sync="dialogVisible" width="1000">
				<div class="tables">
					<el-table :data="EmployeeList" @selection-change="handleSelectionChangeEmployee" ref="employeeSelect" :empty-text=text>
						<el-table-column type="selection"></el-table-column>
						<el-table-column type="index" label="编号" :index="indexMethod"></el-table-column>
						<el-table-column prop="departmentName" label="部门"></el-table-column>
						<el-table-column prop="workCode" label="工号"></el-table-column>
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="sex" label="性别" header-align="left"></el-table-column>
						<el-table-column prop="telphone" label="手机号码"></el-table-column>
					</el-table>
				</div>
				<div class="clearfix pt30">
					<div class="fl">
						<el-pagination @current-change="handleCurrentChangeEmployee" background :current-page.sync="page.currentPageNum" layout="prev, pager, next" :page-count="page.pageTotal">
						</el-pagination>
					</div>
					<div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancleEmployee">取 消</el-button>
					<el-button type="primary" @click="ensureEmployee">确定</el-button>
				</span>
			</el-dialog>
			<!--部门-->
			<el-dialog title="请选择部门" :visible.sync="dialogVisible1" width="400">
				<el-table ref="departmentSelect" :data="DepartmentList" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="80" label="编号" :index="indexMethod"></el-table-column>
					<el-table-column prop="departmentName" label="部门"></el-table-column>
				</el-table>
				<div class="clearfix pt30">
					<div class="fl">
						<el-pagination @current-change="handleCurrentChange" background :current-page.sync="page.currentPageNum" layout="prev, pager, next" :page-count="page.pageTotal">
						</el-pagination>
					</div>
					<div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancleDepartment">取 消</el-button>
					<el-button type="primary" @click="ensureDepartment">确定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	import gUrl from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				text:'正在加载，请稍候',
				getCompanyNoticeparams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				getParams: {
					companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				param: {
					pageIndex: 1,
				},
				page: {
					currentPageNum: 1,
					pageTotal: 0,
					pageSize: 30,
					totalRecord: 0
				},
				form: {
					title: '', //通知标题
					info: '', //通知内容
					sender: '' //发送人
				},
				departmentId: '', //部门id 没什么用，只是单纯获取员工列表的参数
				userName: '', //员工姓名没什么用，只是单纯获取员工列表的参数
				Flag: '', //是否开通通行客 没什么用，只是单纯获取员工列表的参数
				dialogVisible: false, //员工弹框
				dialogVisible1: false, //部门弹框
				staffList: [], //员工列表
				DepartmentList: [], //部门列表
				EmployeeList: [], //员工列表
				// selectDepartListName:[],//选中部门名字
				selectPerson: {},
				selectDepartListNamestr: '',
				module: "company", //
				receiveType: '', //接收人
				objectId: [], //接收对象
				currentArray: [], //存储临时变量
			}
		},
		methods: {
			choisePerson() { //选择个人
				this.dialogVisible = true;
				this.selectPerson = {};
				this.objectId = [];
				this.getEmployeeList(1);
				this.receiveType = "P";
			},
			choiseDepartment() { //选择部门
				this.dialogVisible1 = true;
				this.selectPerson = {};
				this.objectId = [];
				this.getDepartmentList(1)
				this.receiveType = "";
			},
			selectAll() { //全选员工
				this.selectPerson = {};
				this.paramsPersonId = [];
				this.selectPerson.all = '全体员工'
				this.objectId = this.$local.sefetch('info').companyId;
				this.receiveType = "A";
			},
			indexMethod(index) { //编号
				return(this.page.currentPageNum - 1) * 30 + 1 + index;
			},
			getEmployeeList(pageIndex) { //获取员工列表
				let pageIndexParams = 1;
				if(pageIndex) {
					pageIndexParams = pageIndex
				}
				this.$httpPasser.post('employee/getTanentEmployeeByCondition', {
					companyId: this.getParams.companyId,
					departmentId: this.departmentId,
					userName: this.userName,
					Flag: this.Flag,
					pageIndex: pageIndexParams,
					pageSize: 30
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.EmployeeList = res.data.result.employeeList;
						this.page.pageTotal = res.data.pageTotal;
						this.page.totalRecord = res.data.totalRecord; //总记录数
						if(pageIndex) {
							//写入已选择的部门
							this.$nextTick(() => {
								this.$refs.employeeSelect.clearSelection()
								let tempArray = [];
								for(let o in this.EmployeeList) {
									if(this.selectPerson[this.EmployeeList[o].userId]) {
										tempArray.push(this.EmployeeList[o])
									}
								}
								console.log(pageIndex ? pageIndex : 1, tempArray)
								for(let p in tempArray) {
									this.$refs.employeeSelect.toggleRowSelection(tempArray[p]);
								}
							})
						}
					} else {
						this.text = '暂无数据'
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			},
			getDepartmentList(pageIndex) { //获取部门列表
				let pageIndexParams = 1;
				if(pageIndex) {
					pageIndexParams = pageIndex
				}
				this.$httpPasser.post('company/queryDepartmentByCompanyId', {
					companyId: this.getParams.companyId,
					pageSize: '30',
					pageIndex: pageIndexParams
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.DepartmentList = res.data.result ? res.data.result.departmentList : ''
						this.page.pageTotal = res.data.pageTotal;
						this.page.totalRecord = res.data.totalRecord; //总记录数
						this.companyList = res.data.result;
						if(pageIndex) {
							//写入已选择的部门
							this.$nextTick(() => {
								this.$refs.departmentSelect.clearSelection()
								let tempArray = [];
								for(let o in this.DepartmentList) {
									if(this.selectPerson[this.DepartmentList[o].departmentId]) {
										tempArray.push(this.DepartmentList[o])
									}
								}
								console.log(pageIndex ? pageIndex : 1, tempArray)
								for(let p in tempArray) {
									this.$refs.departmentSelect.toggleRowSelection(tempArray[p]);
								}
							})
						}
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			},
			//设置分页
			handleCurrentChange(index) { //部门
				this.page.currentPageNum = index;
				this.param.pageIndex = index;
				this.getDepartmentList(this.page.currentPageNum)
			},
			handleCurrentChangeEmployee(index) { //员工
				this.page.currentPageNum = index;
				this.param.pageIndex = index;
				this.getEmployeeList(this.page.currentPageNum)
			},
			//员工
			handleSelectionChangeEmployee(selection) {
				this.selectPerson = {};
				for(let o in selection) {
					this.selectPerson[selection[o].userId] = selection[o].name;
				}
				console.log('已选结果', this.selectPerson)
			},
			//部门
			handleSelectionChange(selection) { //复选框选中的时候触发
				this.selectPerson = {};
				for(let o in selection) {
					this.selectPerson[selection[o].departmentId] = selection[o].departmentName;
				}
				console.log('已选结果', this.selectPerson)
			},
			//确定部门选择
			ensureDepartment() {
				for(let o in this.selectPerson) {
					this.objectId.push(o)
				}
				this.dialogVisible1 = false
			},
			//取消部门选择
			cancleDepartment() {
				this.selectPerson = {};
				this.paramsPersonId = [];
				this.dialogVisible1 = false
			},
			//确定员工选择
			ensureEmployee() {
				for(let o in this.selectPerson) {
					this.objectId.push(o)
				}
				this.dialogVisible = false
			},
			//取消员工选择
			cancleEmployee() {
				this.selectPerson = {};
				this.paramsPersonId = [];
				this.dialogVisible = false
			},
			onSubmit() { //发布消息
				this.$httpPasser.post('message/sendMessage', {
					title: this.form.title,
					info: this.form.info,
					module: this.module,
					sender: this.getCompanyNoticeparams.userId,
					receiveType: this.receiveType,
					objectId: this.objectId
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message({
							type: 'success',
							message: '发送成功',
							showClose: true
						})
						this.$router.push({
							path: 'CommonCompanymessage_sended',
						})
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			},

		},
		created() {
			this.getDepartmentList();
			console.log(this.$refs)
		},
		computed: {
			num() {
				return parseInt(this.pagetotal)
			}
		},
	}
</script>

<style lang="less" scoped>
	.commonCompanyNoticeList {
		.main-cont {
			margin-top: 20px;
		}
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
		.main-box {
			margin-top: 20px;
			.forms-cont {
				padding-bottom: 30px;
				padding-left: 30px;
			}
			.form-item {
				width: 220px;
				margin-right: 15px;
			}
			.btns {
				padding: 20px 20px 20px;
			}
		}
		.notice_con {
			margin-top: 20px;
			width: 600px;
		}
		.selectPerson {
			/*margin-top: 20px;*/
		}
		.pt30 {
			padding-top: 30px;
		}
		.lh35 {
			line-height: 35px;
		}
	}
</style>

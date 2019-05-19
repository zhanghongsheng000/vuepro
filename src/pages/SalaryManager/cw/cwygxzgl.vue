<template>
	<div class="rscont cwxzsz cwygxzglcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">员工薪资管理</span>
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
					<el-dialog title="员工薪资管理" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" >
						<div class="demo-input-suffix">
							<form id="form">
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
							</form>
						</div>
						<span slot="footer" class="dialog-footer">
    						<el-button @click="dialogVisible = false">取 消</el-button>
    						<el-button type="primary" @click="ensureedit()">保 存</el-button>
  						</span>
					</el-dialog>
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
					companyId:this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
				},
				name: '',
				idnum: '',
				value: '',
				currentIndex:'0',
				dialogFormVisible: false,
				dialogVisible: false,
				input21: '',
				radio: '1',
				multipleSelection: [],
				currentRow: {
					department:'',
					code:'',
					name:'',
					postName:''
				},
				labelList: [],//后台返回的数据
				dataList: [],//后台返回的表头
				test: {},
				wagesList: [],
				param: {
					employeeId: '',
					companyId: ''
				},
			}
		},
		created(){
			this.getBasesalaryitemList();
		},
		methods: {
			getBasesalaryitemList(){//获取列表
				this.$http.post('salary/getSalaryBasesalary',
					{companyId: this.getBuildingGroupParams.companyId}
				).then((res) => {
				  if(res.data.resultCode =='200'){
            this.labelList = res.data.result.labelList;
            this.dataList = res.data.result.dataList;
          }else{
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
			handleEditClick(row,index) {//编辑
				this.param.employeeId = row.employeeId;
				this.param.companyId = this.getBuildingGroupParams.companyId;
				this.currentIndex = index;
				this.dialogVisible = true;
				for(let o in row) {
					this.currentRow[o] = row[o]
				}
				this.$http.get('salary/getBasesalaryitemByEmployeeId', {
					params: {
						employeeId: row.employeeId,
						companyId: this.getBuildingGroupParams.companyId
					}
				}).then((res) => {
				  if(res.data.resultCode =='200'){
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
			ensureedit() {//确认编辑
				document.querySelectorAll("input[data-wages='wages']").forEach((el, index)=>{
					this.param[el.name] = el.value;
				});

				console.log(this.param);
				this.$http.post(
					'salary/updateSalaryBasesalaryitem',
					this.param
				).then((res) => {
					if(res.data.resultCode == '200') {
						this.getBasesalaryitemList();
						this.$message.success('修改成功')
						this.dialogVisible = false;
					} else {
						this.$message.error(res.data.resultCodeDesc)
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
			padding-bottom: 120px;
			.btn-style {
				padding-bottom: 120px;
			}
		}
	}
</style>
<style lang="less">
  .cwygxzglcontainer{
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
          width: 100px;
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

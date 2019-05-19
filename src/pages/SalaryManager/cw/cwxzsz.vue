<template>
	<div class="rscont cwxzsz cwxzszcontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">薪资参数设置</span>
				</div>
				<div class="main-box">
					<el-table ref="multipleTable" :data="SalaryList" tooltip-effect="dark" style="width: 100%" highlight-current-row @selection-change="handleSelectChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" label="编号" width="50"></el-table-column>
						<el-table-column prop="salarytermName" label="参考项"></el-table-column>
						<el-table-column prop="salarytermDescription" label="参数说明"></el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="handleEditClick(scope.$index,scope.row)">编辑</el-button>
								<el-button type="text" size="small" @click="deletaList(scope.row,scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!--添加-->
					<el-dialog title="薪资参数设置" :visible.sync="dialogVisible" width="30%" >
						<div class="demo-input-suffix">
							<div class="inputstyle">
								<span>参数项：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.salarytermName" clearable></el-input>
							</div>
							<div class="inputstyle">
								<span>参数说明：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.salarytermDescription" clearable></el-input>
							</div>
							<div class="inputstyle1">
								<span class="select">加减项：</span>
								<el-radio v-model="currentRow.salarytermGenre" label="Y">Y</el-radio>
								<el-radio v-model="currentRow.salarytermGenre" label="N">N</el-radio>
							</div>
						</div>
						<span slot="footer" class="dialog-footer">
    						<el-button @click="dialogVisible = false">取 消</el-button>
    						<el-button type="primary" @click="ensure()">确 定</el-button>
  						</span>
					</el-dialog>
					<!--编辑-->
					<el-dialog title="薪资参数设置" :visible.sync="dialogVisible1" width="30%" >
						<div class="demo-input-suffix">
							<div class="inputstyle">
								<span>参数项：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.salarytermName"></el-input>
							</div>
							<div class="inputstyle">
								<span>参数说明：</span>
								<el-input placeholder="请输入内容" v-model.trim="currentRow.salarytermDescription"></el-input>
							</div>
							<div class="inputstyle1">
								<span class="select">加减项：</span>
								<el-radio v-model="currentRow.salarytermGenre" label="Y">Y</el-radio>
								<el-radio v-model="currentRow.salarytermGenre" label="N">N</el-radio>
							</div>

						</div>
						<span slot="footer" class="dialog-footer">
								<el-button  @click="dialogVisible1 = false">取消</el-button>
								<el-button type="primary" @click="ensureedit()">确定</el-button>
  						</span>
					</el-dialog>
					<!--删除-->
					<el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" >
						<span>是否确定删除</span>
						<span slot="footer" class="dialog-footer">
						    <el-button @click="dialogVisible2 = false">取 消</el-button>
						    <el-button type="primary" @click="deletesure">确 定</el-button>
						</span>
					</el-dialog>
					<!--删除选中-->
					<el-dialog title="提示" :visible.sync="dialogVisible3" width="30%" >
						<span>是否确定删除选中项</span>
						<span slot="footer" class="dialog-footer">
						    <el-button @click="dialogVisible3 = false">取 消</el-button>
						    <el-button type="primary" @click="deletesureselect">确 定</el-button>
						</span>
					</el-dialog>

					<div style="margin-top: 20px" class="btn-style">
						<el-button type="primary" @click="romoveSelect">删除</el-button>
						<el-button type="primary" @click='addList'>添加</el-button>
					</div>
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
				currentIndex: '0',
				dialogVisible: false,//添加弹框
				dialogVisible1: false,//编辑弹框
				dialogVisible2: false, //删除弹框
				dialogVisible3: false, //删除所选中
				salarytermId: '',
				radio: '',
				salarytermName: '',
				SalaryList: [],
				multipleSelection: [],
				newList: [], //复选框选中的id数组
				currentRow: {
					salarytermId: "",//每一项的id
					salarytermName: "",//参数项
					salarytermDescription: "",//参数说明
					salarytermGenre: ''//Y||N
				}
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleEditClick(index, row) {
				this.dialogVisible1 = true
        this.currentRow.salarytermId=row.salarytermId
        this.currentRow.salarytermName=row.salarytermName
        this.currentRow.salarytermDescription=row.salarytermDescription
        this.currentRow.salarytermGenre=row.salarytermGenre
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			addList() {
				this.dialogVisible = true;
				for(let o in this.currentRow) {
					this.currentRow[o] = ''
				}
			},
			ensure() { //添加工资项
        if(this.currentRow.salarytermName==''){
          this.$message({showClose: true, message: '请输入参数项', type: 'error'})
        }else if(this.currentRow.salarytermDescription==''){
          this.$message({showClose: true, message: '请输入参数说明', type: 'error'})
        }else if(this.currentRow.salarytermGenre==''){
          this.$message({showClose: true, message: '请选择加减项', type: 'error'})
        }else{
          this.$http.get('salary/addCompanySalaryterm', {
            params: {
              salarycompanyId: this.getBuildingGroupParams.companyId,
              salarytermName: this.currentRow.salarytermName,
              salarytermDescription: this.currentRow.salarytermDescription,
              salarytermGenre: this.currentRow.salarytermGenre,
            }
          })
            .then((res) => {
              let data = res.data
              if(data.resultCode == '200') {
                this.$message({showClose: true, message: '添加成功', type: 'success'})
                this.dialogVisible = false;
                this.SalarytermList()
              }else{
                this.$message({showClose: true, message:data.resultCodeDesc, type: 'error'})
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
			},
			//表格选项发生变化钩子函数
			handleSelectChange(sel) {
				this.newList = []
				for(var i = 0; i < sel.length; i++) {
					this.newList.push(sel[i].salarytermId)
				}
			},
			ensureedit() { //编辑确定
        if(this.currentRow.salarytermName==''){
          this.$message({showClose: true, message: '请输入参数项', type: 'error'})
        }else if(this.currentRow.salarytermDescription==''){
          this.$message({showClose: true, message: '请输入参数说明', type: 'error'})
        }else{
          this.$http.get('salary/updateCompanySalaryterm', {
            params: {
              salarycompanyId: this.getBuildingGroupParams.companyId,
              salarytermId: this.currentRow.salarytermId,
              salarytermName: this.currentRow.salarytermName,
              salarytermDescription: this.currentRow.salarytermDescription,
              salarytermGenre: this.currentRow.salarytermGenre,
            }
          }).then((res) => {
            let data = res.data
            if(data.resultCode == '200') {
              this.dialogVisible1 = false;
              this.$message({showClose: true, message: '编辑成功', type: 'success'})
              this.currentRow.salarytermId=''
              this.currentRow.salarytermName=''
              this.currentRow.salarytermDescription=''
              this.currentRow.salarytermGenre=''
              this.SalarytermList()
            } else if(data.resultCode == '204') {
              this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'})
            }else{
              this.$message({showClose: true, message:data.resultCodeDesc, type: 'error'})
            }
          })
        }
			},
			deletaList(row, index) { //删除单行
				for(let o in row) {
					this.currentRow[o] = row[o]
				}
				this.dialogVisible2 = true;
			},
			deletesure() {
				this.$http.get('salary/deleteCompanySalaryterm', {
					params: {
						salarytermId: this.currentRow.salarytermId,
						companyId: this.getBuildingGroupParams.companyId
					}
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						});
            this.dialogVisible2 = false;
            this.SalarytermList();
						this.currentRow = [];
					} else {
						this.$message({
							showClose: true,
							message: '删除失败',
							type: 'error'
						});
            this.dialogVisible2 = false;
						this.currentRow = [];

					}
				})
			},
			romoveSelect() { //批量删除弹框
        if(this.newList==''){
          this.$message({showClose: true, message:"未选中所要删除项", type: 'error'})
        }else{
          this.dialogVisible3 = true;
        }
			},
			deletesureselect() {//批量删除
				this.$http.post('salary/batchDeleteCompanySalaryterm', {
						salarytermIdList: this.newList,
						companyId: this.getBuildingGroupParams.companyId
					})
					.then(res => {
						let data = res.data
						if(data.resultCode == '200') {
							this.$message({
								showClose: true,
								message: '删除成功',
								type: 'success'
							});
							this.SalarytermList();
							this.dialogVisible3 = false;
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
							this.dialogVisible3 = false;
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			SalarytermList() { //加载表格
				this.$http.get('salary/getCompanySalarytermListByCompanyId', {
					params: {
						salarycompanyId: this.getBuildingGroupParams.companyId,
					}
				}).then((res) => {
					if(res.data) {
						this.SalaryList = res.data.result
					}else{
            this.$message({
              showClose: true,
              message: data.resultCodeDesc,
              type: 'error'
            });
          }
				})
			},
		},
		created() {
			this.SalarytermList()
		}
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
    .cwxzszcontainer {
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
    }


</style>

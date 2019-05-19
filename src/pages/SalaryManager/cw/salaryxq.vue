<template>
	<div class="rscont cwdgzb salarycontainer">
		<div class="banner">
			<div class="ban-text">薪之所向&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享你自由</div>
		</div>
		<div class="main-cont">
			<div class="common pt50">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">发放工资详情</span>
				</div>
				<div class="main-middle clearfix">
					<div class="left-cont fl">
						<p class="money-text">实发工资总额(元)</p>
						<p class="money-num">{{monthsalaryRealpayment}}</p>
					</div>
				</div>
				<div class="wages clearfix">
					<p>{{date}}</p>
				</div>
				<div class="main-box">
					<el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%">
						<el-table-column v-for="(label, index) in labelList" :key="index" :prop="label.key" :label="label.value">
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
				name: '',
				idnum: '',
				value: '',
				dialogFormVisible: false,
				dialogVisible: false,
				monthsalaryRealpayment:'',//总工资
				radio: '1',
				fileList: [],
				multipleSelection: [],
				currentRow: {
					nums: '',
					depart: ' ',
					jobnum: '',
					date: '',
					name: '',
					position: '',
					jobwages: '',
					mansgewages: '',
					subsidy: '',
					jobagewages: '',
					studysubsidy: '',
					shouldwages: ''
				},
				labelList: [],
				dataList: [],
			}
		},
		created(){
			console.log(this.$route.query.companyId);
			console.log(this.$route.query.monthsalaryId);
			this.date=this.$route.query.date
			this.$http.post(
				'/salary/getSalaryMonthsalaryInfo',
				{
					companyId: this.$route.query.companyId,
					monthsalaryId: this.$route.query.monthsalaryId
				}
			).then((res) => {
				if(res.data.resultCode == '200'){
          this.labelList = res.data.result.labelList;
          this.dataList = res.data.result.dataList;
          this.monthsalaryRealpayment=res.data.result.monthsalaryRealpayment
        }else{
          this.$message({
            showClose: true,
            message: data.resultCodeDesc,
            type: 'error'
          });
        }
			})
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
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
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
			padding-top: 50px;
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
		.btn-style{
			padding-bottom: 120px;
		}
		.wages{
			text-align: center;
			p{
				display: inline-block;
			}
			.tip{
				margin-top: -10px;
			}
		}
	}
</style>
<style lang="less">
  .salarycontainer{
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
    }
</style>

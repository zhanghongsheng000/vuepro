<template>
	<div class="propertyMessage_sended">
		<div class="main-cont">
			<div class="line"></div>
			<span class="top-text">已收消息</span>
		</div>
		<div class="tables">
			<el-table :data="messageList" style="width: 100%" :empty-text=text>
				<el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="createTime" label="时间"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="toPropertyCompanymessageDetails(scope.$index,scope.row)" round>详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="clearfix lh35 block">
			<div class="fl">
				<el-pagination @current-change="handleCurrentChange" background :current-page.sync="page.currentPageNum" layout="prev, pager, next" :page-count="page.pageTotal">
				</el-pagination>
			</div>
			<div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span></div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	export default {
		data() {
			return {
				text:'正在加载，请稍候',
				getCompanyNoticeparams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
					companyName: this.$local.sefetch('info') ? this.$local.sefetch('info').companyName : '',
				},
				page: { //分页
					currentPageNum: 1, //当前页码
					pageTotal: 1, //总页码
					totalRecord: "" //总条数
				},
				messageList: [], //消息列表
				totalRecord: 0, //列表总条数
				pageNow: 1, //当前页码
				pageIndex: 1, //分页页码
				pageSize: 30, //每页条数
				title:"",
				isRead:"",
			}
		},
		methods: {
			getMessageList(index) { //加载列表
				this.$httpPasser.post("message/getMessageList", {
					customerUserId: this.getCompanyNoticeparams.userId,
					title:this.title,
					isRead:this.isRead,
					pageIndex: 1,
					pageSize: this.pageSize
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message({
							showClose: true,
							message: "查询成功",
							type: 'success'
						});
						this.messageList = res.data.result
						this.page.pageTotal = res.data.pageTotal;
						this.page.totalRecord = res.data.totalRecord; //总记录数
					}else if(res.data.resultCode == '204'){
						this.messageList= [];
						this.text = '暂无数据'
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						});
					}else{
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			},
			handleCurrentChange(index) { //设置分页
				this.page.currentPageNum = index;
				this.getMessageList(this.page.currentPageNum) //加载列表
			},
			indexMethod(index) { //编号
				return(this.page.currentPageNum - 1) * 30 + 1 + index;
			},
			toPropertyCompanymessageDetails(index, row) {//跳转详情
				this.$httpPasser.post('message/editIsRead',{
					messageRecordId:row.messageId
				})
				this.$router.push({
					path: 'PropertyCompanymessageDetails',
					query: {
						noticeId: row.noticeId,
						sender: row.sender,
						title: row.title,
						info: row.info,
						employee:row.employee,
						createTime: row.createTime,
					}
				})
			},
			deletesure(row) { //删除消息
				this.$httpPasser.post("message/deleteMessage", {
					messageId: row.messageId
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message.success("删除成功");
						this.getMessageList(this.page.currentPageNum) //加载列表
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			},
			queryBtn() {
				this.getMessageList(this.page.currentPageNum);
			},
		},
		created() {
			this.getMessageList(1)
		},
		computed: {},
	}
</script>

<style lang="less" scoped>
	.propertyMessage_sended {
    .tables{
      margin-top:20px;
    }
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
		.block {
			margin-top: 20px;
		}
		.lh35 {
			line-height: 35px;
		}
	}
</style>


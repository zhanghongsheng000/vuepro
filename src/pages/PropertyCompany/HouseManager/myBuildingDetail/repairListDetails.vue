<template>
	<div id="repairListDetails">
		<div class="main-cont">
			<div class="common">
				<div class="top-title">
					<div class="line"></div>
					<span class="top-text">报修单详情</span>
				</div>
			</div>
			<div class="baseMessage clearfix">
				<div class="baseMessage_left fl">
					<div><span>报修单号：</span><span>{{baseMessage.documentsNumber}}</span></div>
					<div><span>报修人：</span><span>{{baseMessage.userName}}</span></div>
					<div><span>报修类型：</span><span class="red">{{baseMessage.repairType}}</span></div>
					<div><span>报修时间：</span><span>{{baseMessage.repairTime}}</span></div>
					<div><span>联系人：</span><span class="red">{{baseMessage.linkMan}}</span></div>
				</div>
				<div class="baseMessage_right fr">
					<div><span>所在写字楼：</span><span>{{baseMessage.repairAddress}}</span></div>
					<div><span>报修人电话：</span><span>{{baseMessage.customerUserPhone}}</span></div>
					<div><span>所在房间：</span><span class="red">{{baseMessage.roomName}}</span></div>
					<div><span>联系人电话：</span><span class="red">{{baseMessage.linkPhone}}</span></div>
				</div>
				<div class="clearfix"></div>
				<div class="repair_discribe clearfix" style="padding-bottom: 10px">
					<div class="discribe_con">
						<span>故障描述：</span> {{baseMessage.faultDescription}}
					</div>
				</div>
				<div class="repair_photo clearfix" style="display: inline-block;" v-if="baseMessage.imgList!=''">
					<div class="photo_title">故障照片：</div>
					<div v-for="item in baseMessage.imgList" style="display: inline-block;">
						<img :src="gImgUrl+baseMessage.imgList.imgPath" alt="">
						<!--<img :src="item.imgPath" alt="">-->
					</div>
				</div>
				<!---->
				<div class="repairPerson_style">
					<div class="repair_message clearfix">
						<div class="repairMessage_left fl" v-if="baseMessage.statusName == '已派单'||baseMessage.statusName == '维修中'||baseMessage.statusName == '已完成'">
							<span class="fl repairPerson">维修人员：</span>
							<div class="fl" style="width: 340px;">
								<div v-for="person in baseMessage.employeeList" style="display: inline-block;" class="fl">
									<div style="display: inline-block; width: 160px;margin: 0 0px 10px 0;">
										<span style="background: #ccc;padding: 5px 8px;">{{person.employeeName}}&nbsp;&nbsp;{{person.employeeTelphone}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="repairMessage_right fl" style="width: 478px;">
							<div><span>维修状态：</span><span>{{baseMessage.statusName}}</span></div>
							<div>
								<span v-if="baseMessage.statusName == '已完成'">完成时间：{{baseMessage.finishTime}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="service_message" style="margin-left: 20px">
				<span>服务项明细：</span>
				<el-table :data="baseMessage.seviceItemList" style="width: 100%">
					<el-table-column type="index" label="编号">
					</el-table-column>
					<el-table-column prop="name" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="price" label="单价（元）" width="180">
					</el-table-column>
					<el-table-column prop="number" label="使用量">
					</el-table-column>
          <el-table-column prop="serviceItemSubtotal" label="小计">
          </el-table-column>
				</el-table>
			</div>
			<div class="materialsDetails" style="margin-left: 20px">
				<span>物料明细：</span>
				<el-table :data="baseMessage.materielList" style="width: 100%">
					<el-table-column type="index" label="编号">
					</el-table-column>
					<el-table-column prop="date" label="图片" width="180">
					</el-table-column>
					<el-table-column prop="name" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="price" label="单价（元）">
					</el-table-column>
					<el-table-column prop="number" label="使用量">
					</el-table-column>
          <el-table-column prop="materielSubtotal" label="小计">
          </el-table-column>
				</el-table>
				<div class="fr total">
					<div><span class="red">合计：</span><span class="red">{{baseMessage.total}}</span></div>
				</div>
			</div>
			<div class="close_reason" v-if="baseMessage.statusName == '已拒绝'" style="margin-left: 20px">
				<div><span>关闭原因：</span>{{baseMessage.closeReason}}</div>
			</div>
			<div class="report" v-if="baseMessage.statusName == '已完成' && (baseMessage.evaluate != ''&& baseMessage.evaluate != null)" style="margin-left: 20px">
				<span>报修人评价:{{baseMessage.evaluate}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import gUrl from '@/assets/js/gUrl'
	import getUrl from '@/assets/js/global'

	export default {
		name: "repairList",
		data() {
			return {
				gImgUrl: "",
				baseMessage: {
					customerUserPhone: "", //报修人电话
					evaluateTime: '', //评价时间
					linkPhone: '', //联系人电话
					payWay: '', //支付方式
					linkMan: "", //联系人
					documentsNumber: "", //报修订单号
					total: '', //合计
					materielList: [], //物料列表
					statusName: '', //维修状态
					closeTime: '', //关闭时间
					closeReason: '', //关闭原因
					repairAddress: "", //所在写字楼
					finishTime: "", //完成时间
					repairType: '', //报修类型
					userName: '', //报修人姓名
					roomName: '', //房间名称
					buildingName: "", //写字楼名称
					evaluateType: "", //评价类型
					repairTime: "", //报修时间
					seviceItemList: [], //服务项列表
					faultDescription: '', //故障描述
					evaluate: '', //评价内容
					employeeList: [], //维修人员
          imgList: [], //故障图片
				},
			}
		},

		created() {
			this.getRepairDetail()
		},
		mounted() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
			})
		},
		computed: {},
		methods: {
			indexMethod(index) { //编号
				return(this.servicesConfigureParams.pageIndex - 1) * 30 + 1 + index;
			},
			indexMethod1(index) { //弹层编号
				return(this.servicesConfigureParams.pageIndex - 1) * 30 + 1 + index;
			},
			//分页方法
			handleCurrentChange(index) {
				this.servicesConfigureParams.pageIndex = index;
				//this.queryDepartmentByCompanyId();
			},
			searchBtn() { //搜索

			},
			//报单登记
			declarationReport() {

			},
			dispatchClick(row) { //派单
				this.dispatch.dispatchDialog = true;
			},
			handleSelectionChange() {

			},
			closeClick(row) {
				this.closeReport.closeReportDialog = true;
			},
			getRepairDetail() { //获取详情接口
				this.$httpPasser.get("repairDocuments/getRepairDetail", {
					params: {
						repairDocumentsId: this.$route.query.repairDocumentsId,
					}
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message.success(res.data.resultCodeDesc)
						this.baseMessage = res.data.result
					}else{
					  this.baseMessage = {};
          }
				})
			}
		}
	}
</script>

<style scoped lang="less">
	#repairListDetails {
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
		.baseMessage {
      margin-left: 30px;
			.baseMessage_left {
				width: 500px;
				span {
					display: inline-block;
					line-height: 24px;
					color: #888;
          font-size: 14px;
				}
			}
			.baseMessage_right {
				width: 500px;
				span {
					display: inline-block;
					line-height: 24px;
					color: #888;
					text-align: left;
          font-size: 14px;
				}
			}
			.repair_discribe {
				span {
					display: inline-block;
					line-height: 20px;
					color: #666;
					text-align: left;
				}
				.discribe_con {
          margin-top: 6px;
					display: inline-block;
					border: 1px solid #999;
					padding: 3px 5px;
					background: #f7f7a8;
					-webkit-border-radius: 5px;
					-moz-border-radius: 5px;
					border-radius: 5px;
					width: 996px;
				}
			}
		}
		.repair_photo {
			.photo_title {
				color: #888;
        font-size: 14px;
			}
			height:120px;
			img {
				display: inline-block;
				width: 120px;
				height: 80px;
				margin: 0 10px;
			}
		}
		.repair_message {
			.repairMessage_left {
				width: 500px;
				span {
					display: inline-block;
					color:#888;
					line-height: 20px;
          font-size: 14px;
				}
			}
			.repairMessage_right {
				width: 500px;
				span {
					display: inline-block;
					color: #888;
					display: inline-block;
					line-height: 20px;
          font-size: 14px;
				}
			}
		}
		.service_message {
			margin-top: 10px;
			span {
				line-height: 30px;
			}
		}
		.materialsDetails {
			margin-top: 10px;
			span {
				line-height: 30px;
			}
		}
		.close_reason {
			margin-top: 30px;
			span {
				color: #666;
				line-height: 20px;
			}
			width:1020px;
			border-bottom:1px solid #dedede;
		}
		.report {
			margin-top: 10px;
			span {
				color: #666;
				line-height: 20px;
			}
			width:1020px;
			border-bottom:1px solid #dedede;
		}
		.repairPerson_style {
			border: 1px solid #DEDEDE;
			border-radius: 5px;
			padding: 5px 10px;
		}
    .repairPerson{
      line-height: 30px !important;
    }
    .red{
      color: #ff0011 !important;
    }
	}
</style>
<style lang="less">
	#repairListDetails {}
</style>

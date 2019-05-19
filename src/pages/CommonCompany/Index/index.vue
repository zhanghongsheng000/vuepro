<template>
	<div>
		<div class="index_top clarfix">
			<div class="toBeDone fl">
				<div class="toBeDone_head">
					<img src="../../../assets/img/public/toBedone_icon.png" class="toBeDone_icon" />
					<span class="toBeDone_title">我的待办</span>
					<a href="javascript:;" class="fr more">+更多</a>
				</div>
				<div class="toBeDone_body">
					<ul>
						<!--<li>
				              <a href="javascript:;"><span class="dates fr"></span></a>
				            </li>
				            <li>
				              <a href="javascript:;"><span class="dates fr"></span></a>
				            </li>
				            <li>
				              <a href="javascript:;"><span class="dates fr"></span></a>
				            </li>
				            <li>
				              <a href="javascript:;"><span class="dates fr"></span></a>
				            </li>-->
					</ul>
				</div>
			</div>
			<div class="intelligentMessage fl">
				<div class="toBeDone_head">
					<img src="../../../assets/img/public/intellgentMessage_icon.png" class="toBeDone_icon" />
					<span class="toBeDone_title">物业通知</span>
					<a href="javascript:;" class="fr more" @click="toPropertyCompanyNotice">+更多</a>
				</div>
				<div class="toBeDone_body">
					<ul>
						<li class="clearfix" v-for="(notice,index) in noticeListresult" :key="index" @click="toNoticeDetails(notice.customer_notice_id,notice.sender,notice.title,notice.info,notice.create_time)">
							<a  class="fl titlelength" :title="notice.title">{{notice.title}}</a>
							<span class="dates fr">{{notice.create_time.slice(0,10)}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="passger fl intelligentMessage">
				<div v-show="isShow">
					<div class="toBeDone_head">
						<img src="../../../assets/img/public/intellgentMessage_icon.png" class="toBeDone_icon" />
						<span class="toBeDone_title">居金所通知</span>
						<a href="javascript:;" class="fr more" @click="toPropertyCompanyNotice_jjs">+更多</a>
					</div>
					<div class="toBeDone_body">
						<ul>
							<li class="clearfix" v-for="(notice,index) in noticeListresultjjs" :key="index" @click="toNoticeDetails_jjs(notice.customer_notice_id,notice.sender,notice.title,notice.info,notice.create_time)">
								<a class="fl titlelength" :title="notice.title">{{notice.title}}</a>
								<span class="dates fr">{{notice.create_time.slice(0,10)}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div v-show="noNotice">
					<img src="../../../assets/img/BusinessHome/passanger_title.png"  style="margin-left: 55px;"/>
					<!--<JJS-AD :url="url" width="258px" height="190px"></JJS-AD>-->
				</div>
			</div>
		</div>
		<div class="index_bottom clearfix">
			<div class="passerger_product fl">
				<div class="passerger_bg" @mousemove="show_passerger" @mouseleave="show_passerger1">
					<h2>通行客<span>0</span></h2>
					<div class="passerger_message" v-show="passerger_message">
						<ul>
							<!--<li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"> <span class="fr"> </span></a>
				              </li>-->
						</ul>
						<div class="know_more" @click="toPasserger">
							<button>了解更多</button>
						</div>
					</div>
				</div>
			</div>
			<div class="intelligent_product fl">
				<div class="intelligent_bg" @mousemove="show_intelligent" @mouseleave="show_intelligent1">
					<h2>智能缴费<span>0</span></h2>
					<div class="intelligent_message" v-show="intelligent_message">
						<ul>
							<!--<li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"> <span class="fr"> </span></a>
				              </li>-->
						</ul>
						<div class="know_more" @click="toIntelligent">
							<button>了解更多</button>
						</div>
					</div>
				</div>
			</div>
			<div class="zjyf_produce fl">
				<div class="zjyf_bg" @mousemove="show_zjyf" @mouseleave="show_zjyf1">
					<h2>租金月付<span>0</span></h2>
					<div class="zjyf_message" v-show="zjyf_message">
						<ul>
							<!--<li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"> <span class="fr"> </span></a>
				              </li>-->
						</ul>
						<div class="know_more" @click="toZjyf">
							<button>了解更多</button>
						</div>
					</div>
				</div>
			</div>
			<div class="salary_product fl">
				<div class="salary_bg" @mousemove="show_salary" @mouseleave="show_salary1">
					<h2>贷发工资<span>0</span></h2>
					<div class="salary_message" v-show="salary_message">
						<ul>
							<!--<li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>
				              <li class="fl">
				                <a href="javascript:;"><span class="fr"></span></a>
				              </li>-->
						</ul>
						<div class="know_more" @click="toSalary">
							<button>了解更多</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				getCompanyNoticeparams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				url:"ad/getAdList",
				passerger_message: false,
				intelligent_message: false,
				zjyf_message: false,
				salary_message: false,
				noticeList: [], //收到物业的通知
				noticeListresult: [], //物业通知列表数据
				noticeListjjs: [], //收到物业的通知
				noticeListresultjjs: [], //物业通知列表数据
				pageIndex: '0',
				pageSize: '10',
				content: "",
				start: "",
				end: "",
				isShow:true,
				noNotice:false,
			}
		},
		methods: {
			getNoticeBulletin() { //收到物业通知
				this.$httpPasser.post('message/getNoticeList', {
						userId: this.getCompanyNoticeparams.userId,
						shopId: this.getCompanyNoticeparams.shopId,
						content: this.content,
						start: this.start,
						end: this.end,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then((res) => {
						const data = res.data
						console.log(data)
						if(data.resultCode == '200') {
							this.noticeList = data.result;
							this.noticeListresult = this.noticeList.slice(0, 4)
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getNotice_jjs() { //收到居金所通知
				this.$httpPasser.post('message/getJJSNoticeList', {
						userId: this.getCompanyNoticeparams.userId,
						shopId: this.getCompanyNoticeparams.shopId,
						content: this.content,
						start: this.start,
						end: this.end,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then((res) => {
						const data = res.data
						console.log(data)
						if(data.resultCode == '200') {
							this.noticeListjjs = data.result;
							this.noticeListresultjjs = this.noticeListjjs.slice(0, 4)
							this.isShow=true;
							this.noNotice=false;
						}else{
							this.isShow = false;
							this.noNotice = true;
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toPropertyCompanyNotice() { //跳转到物业发出通知的列表页面
				this.$router.push({
					path: 'CommonCompanyNotice',
				})
			},
			toNoticeDetails(noticeId, sender, title, info, createTime, ) {
				this.$router.push({
					path: 'CommonCompanyNotice/commonCompanyNoticeDetails',
					query: {
						noticeId: noticeId,
						sender: sender,
						title: title,
						info: info,
						createTime: createTime
					}
				})
			},
			toPropertyCompanyNotice_jjs(){
				this.$router.push({
					path: 'CommonCompanyNotice/commonCompanyNoticeListjjs',
				})
			},
			toNoticeDetails_jjs(noticeId, sender, title, info, createTime) {//跳转到居金所详情
				this.$router.push({
					path: 'CommonCompanyNotice/commonCompanyNoticeDetailsjjs',
					query: {
						noticeId: noticeId,
						sender: sender,
						title: title,
						info: info,
						createTime: createTime
					}
				})
			},
			show_passerger() { //显示
				this.passerger_message = true;
			},
			show_passerger1() {
				this.passerger_message = false;
			},
			show_intelligent() { //显示
				this.intelligent_message = true;
			},
			show_intelligent1() {
				this.intelligent_message = false;
			},
			show_zjyf() {
				this.zjyf_message = true;
			},
			show_zjyf1() {
				this.zjyf_message = false;
			},
			show_salary() {
				this.salary_message = true;
			},
			show_salary1() {
				this.salary_message = false;
			},
			toPasserger() { //跳转通行客
				this.$router.push({
					path: '/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer'
				})
			},
			toIntelligent() { //跳转物业
				this.$router.push({
					path: '/CommonCompany/CommonCompanyProduct/IntelligentProperty/PaymentProperty'
				})
			},
			toZjyf() { //跳转租金月付
				this.$router.push({
					path: '/CommonCompany/CommonCompanyProduct/Zjyf'
				})
			},
			toSalary() {
				this.$router.push({
					path: '/CommonCompany/CommonCompanyProduct/SalaryManager'
				})
			}
		},
		created() {
			this.getNoticeBulletin();
			this.getNotice_jjs();//收到居金所通通知
		}
	}
</script>

<style scoped lang="less">
	.indexCon_right {
		padding-bottom: 80px;
		.toBeDone {
			.toBeDone_head {
				.toBeDone_icon {
					vertical-align: middle;
				}
				padding: 20px 0 0 20px;
				.toBeDone_title {
					display: inline-block;
					margin-left: 15px;
					font-size: 18px;
					color: #000000;
				}
			}
			.toBeDone_body {
				ul {
					padding: 10px 20px;
					li a {
						font-size: 14px;
						line-height: 30px;
						color: #666666;
					}
					a:hover {
						color: #1168e1;
					}
				}
			}
			.more {
				font-size: 12px;
				line-height: 26px;
				color: #000000;
				padding: 0px 30px;
			}
		}
		.intelligentMessage {
			.toBeDone_head {
				.toBeDone_icon {
					vertical-align: middle;
				}
				padding: 20px 0 0 20px;
				.toBeDone_title {
					display: inline-block;
					margin-left: 15px;
					font-size: 18px;
					color: #000000;
				}
			}
			.toBeDone_body {
				ul {
					padding: 10px 20px;
					span {
						font-size: 14px;
						line-height: 30px;
						color: #666666;
						cursor: pointer;
					}
					li:hover {
						color: #1168e1;
					}
					li a {
						font-size: 14px;
						line-height: 30px;
						color: #666666;
					}
					a:hover {
						color: #1168e1;
					}
				}
			}
			.more {
				font-size: 12px;
				line-height: 26px;
				color: #000000;
				padding: 0px 30px;
			}
		}
		.toBeDone,
		.intelligentMessage {
			margin-top: 13px;
			width: 350px;
			height: 190px;
			background: #FFFFFF;
			border-radius: 5px;
		}
		.intelligentMessage,
		.passger {
			margin-left: 13px;
			margin-top: 13px;
		}
		.intelligentMessage:nth-child(3){
			width: 300px;
		}
		/*下半部分*/
		.index_bottom {
			margin-top: 10px;
			.know_more {
				position: absolute;
				margin-top: 230px;
				margin-left: 80px;
				background: #badbfc;
				border-radius: 20px;
				button {
					width: 110px;
					height: 36px;
					background: #badbfc;
					border-radius: 20px;
					color: #2d84fc;
					cursor: pointer;
				}
			}
			.passerger_product,
			.intelligent_product,
			.zjyf_produce,
			.salary_product {
				text-align: center;
				width: 260px;
				height: 479px;
				background-size: 260px 479px;
				cursor: pointer;
			}
			.passerger_product h2,
			.intelligent_product h2,
			.zjyf_produce h2,
			.salary_product h2 {
				padding-top: 20px;
			}
			.passerger_product h2 span,
			.intelligent_product h2 span,
			.zjyf_produce h2 span,
			.salary_product h2 span {
				display: inline-block;
				font-size: 12px;
				width: 16px;
				height: 16px;
				margin-left: 5px;
				border-radius: 50%;
				background: #FF0100;
				color: #FFFFFF;
			}
			.passerger_product {
				background: url(../../../assets/images/index/list_passerger.png);
			}
			.intelligent_product {
				background: url(../../../assets/images/index/list_intellgent.png);
			}
			.zjyf_produce {
				background: url(../../../assets/images/index/list_zjyf.png);
			}
			.salary_product {
				background: url(../../../assets/images/index/list_salary.png);
			}
			.passerger_bg,
			.intelligent_bg,
			.zjyf_bg,
			.salary_bg {
				width: 260px;
				height: 479px;
			}
			.passerger_bg:hover,
			.intelligent_bg:hover,
			.zjyf_bg:hover,
			.salary_bg:hover {
				background: rgba(23, 108, 226, 0.5);
				width: 260px;
				height: 479px;
				background-size: 260px 479px;
				h2 {
					color: #FFFFFF;
				}
			}
			ul {
				padding-top: 30px;
				li {
					display: inline-block;
					text-align: left;
					padding-left: 20px;
					width: 180px;
					font-size: 14px;
					line-height: 30px;
					a {
						color: #FFFFFF;
					}
				}
			}
		}
		/*.index_top {
      margin-bottom: 220px;
    }*/
		.titlelength {
      cursor: pointer;
			width: 160px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>

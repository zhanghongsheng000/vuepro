<template>
	<div class="propertyNoticeList">
		<div class="main-cont">
			<div class="line"></div>
			<span class="top-text">通知详情</span>
		</div>
		<div class="main-box">
			<h2>{{title}}</h2>
			<span class="sender">{{sender}}</span>
			<span class="createTime">{{createTime}}</span>
			<p class="info">{{info}}</p>
			<div class="file">
				<a v-for="file,index in pathArray" :key="index" :href="file" download target="_blank">附件{{index+1}}</a>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	export default {
		data() {
			return {
				getCompanyNoticeparams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				noticeId: this.$route.query.noticeId,
				sender: this.$route.query.sender,
				title: this.$route.query.title,
				createTime: this.$route.query.createTime,
				info: this.$route.query.info,
				//noticeList:this.$route.query.noticeList,
				path: this.$route.query.path,
				pathArray: [],
				gImgUrl: ''
			}
		},
		methods: {
			getnoticeDetails() {
				this.$httpPasser.post("message/getNoticeDetail", {
					noticeId: this.noticeId
				}).then((res) => {
					this.path = res.data.result.path;
					this.getpath();
				})
				
			},
			getpath() {
				getUrl().then(res => {
					this.gImgUrl = res.gImgUrl;
					if(this.path) {
						this.pathArray = this.path.split(',');
						for(let o in this.pathArray) {
							this.pathArray[o] = this.gImgUrl + this.pathArray[o]
						}
					}
				})
			}
		},
		created() {
			this.getnoticeDetails()
		},
		computed: {},
	}
</script>

<style lang="less" scoped>
	.propertyNoticeList {
		.main-cont {
			margin-top: 25px;
		}
		.line {
			height: 1px;
			background-color: #ccc;
			margin-bottom: -17px;
		}
		.top-text {
			margin-left: 25px;
			font-size: 15px;
			background-color: #fff;
			padding: 0 4px;
			line-height: 30px;
		}
		.main-box {
			margin-top: 20px;
			text-align: center;
			span {
				line-height: 30px;
				color: #666;
			}
			p {
				text-align: left;
				line-height: 30px;
				text-indent: 2em;
			}
		}
		.file {
			padding-left: 25px;
			line-height: 50px;
		}
	}
</style>
<template>
	<div class="propertyNoticeList">
		<div class="main-cont">
			<div class="line"></div>
			<span class="top-text">消息详情</span>
		</div>
		<div class="main-box">
			<h2>{{title}}</h2>
			<span class="sender">{{send}}</span>
			<span class="createTime">{{createTime}}</span>
			<p class="info">{{info}}</p>
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
        send: this.$route.query.send,
				title: this.$route.query.title,
				createTime: this.$route.query.createTime,
				info: this.$route.query.info,
				//noticeList:this.$route.query.noticeList,
				path: this.$route.query.path,
				employee:this.$route.query.employee,
				pathArray: [],
				gImgUrl: ''
			}
		},
		methods: {
			getmessage(){
				console.log(this.employee)
			}
		},
		created() {
			this.getmessage();
			console.log(this.employee)
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl;
				if(this.path) {
					this.pathArray = this.path.split(',');
					for(let o in this.pathArray) {
						this.pathArray[o] = this.gImgUrl + this.pathArray[o]
					}
				}
			})

		},
		computed: {},
	}
</script>

<style lang="less" scoped>
	.propertyNoticeList {
		.main-cont{
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
			text-align: center;
			span {
				line-height: 30px;
				color: #dedede;
			}
			p {
				text-align: left;
				line-height: 30px;
				text-indent: 2em;
			}
		}
    .info{
      font-size: 14px;
    }
	}
</style>

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
			<a v-for="file,index in pathArray" :key="index" :href="file" download>附件{{index+1}}</a>
			<div class="message">
				<span>接收人：</span><span v-for="employ,index in employee" :key='index' >{{employ}}&nbsp;&nbsp;</span>
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
				this.employee.toString()
			}
		},
		created() {
			this.getmessage();
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
				color: #888888;
			}
			p {
				text-align: left;
				line-height: 30px;
				text-indent: 2em;
			}
		}
		.message{
			text-align: left;
			margin-left: 25px;
			line-height: 40px;
      font-size: 14px;
			span{
				color: #333;
			}
		}
    .info{
      font-size: 14px;
    }
    .el-table th{
      padding: 12px 0;
    }
	}
</style>
<style lang="less">
  .propertyNoticeList {
    .el-table th{
      padding: 12px 0;
    }
  }
</style>

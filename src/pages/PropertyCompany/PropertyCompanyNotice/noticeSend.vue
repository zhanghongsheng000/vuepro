<template>
	<div class="propertyNoticeList">
		<div class="main-cont" style="padding-top:30px;margin-bottom:15px;">
			<div class="line"></div>
			<span class="top-text">发送新通知</span>
		</div>
		<div class="notice_con">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="通知标题:">
					<el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
				</el-form-item>
				<el-form-item label="通知内容:">
					<el-input type="textarea" v-model="form.info" clearable></el-input>
				</el-form-item>
				<el-form-item label=" 发布单位:">
					<el-input v-model="form.sender" clearable></el-input>
				</el-form-item>
				<el-form-item label="上传附件:">
					<!--<el-upload class="upload-demo" ref="upload" :action="action" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" name="file" multiple :auto-upload="false">-->
						<!--<el-button  type="primary">点击上传附件</el-button>-->
					<!--</el-upload>-->
          <el-upload
            :action="action"
            :data="upLoadData"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :on-error="handleError"
            multiple
          >
            <el-button  type="primary">点击上传附件</el-button>
          </el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">发布</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	import $gPasserUrl from '@/assets/js/gUrl'
	export default {
		data() {
			return {
				getCompanyNoticeparams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					userId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				param: {

				},
				form: {
					title: '', //通知标题
					info: '', //通知内容
					sender: '' //发送人
				},
				module: "property",
				action: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址, //上传文件的地址
        attachmentPath:'',
        /*
      * 上传图片
      * */
        upLoadData: {//图片上传参数
          file: '',
          type: 'company',
          objectId: 0
        },
        noticeList:[]//附件列表
			}
		},
		methods: {
			//上传失败
			handleError(err) {
				this.$message.error("上传失败")
			},
      //楼盘图片上传成功回调方法
      handleSuccess(res,file,fileList){
        if(res.resultCode=='200'){
          this.$message.success('上传成功');
          let imgUrl = res.result;
          if(this.noticeList.indexOf(imgUrl)==-1){
            this.noticeList.push(imgUrl)
          }
        }

      },
      //楼盘图片删除回调方法
      handleRemove(file,fileList){
        let tempArr = []
        for(let o in fileList){
          tempArr.push(fileList[o].response.result)
        }
        this.noticeList = tempArr
      },
			onSubmit() {
				this.$httpPasser.post('message/sendNotice', {
					title: this.form.title,
					info: this.form.info,
					module: this.module,
					extendShopId: this.getCompanyNoticeparams.shopId,
					attachmentPath: this.noticeList,
					sender: this.form.sender
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.$message({
							type: 'success',
							message: '发布成功',
							showClose: true
						})
						this.$router.push({
							path: 'noticeList'
						})
					} else {
						this.$message({
							showClose: true,
							message: data.resultCodeDesc,
							type: 'error'
						});
					}
				})
			}

		},
		created() {
		 /*getUrl.then(
       (res)=>{

       }
     ) */
		},
		computed: {
			num() {

			}
		},
	}
</script>

<style lang="less" scoped>
	.propertyNoticeList {
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
			width: 600px;
		}
	}
</style>

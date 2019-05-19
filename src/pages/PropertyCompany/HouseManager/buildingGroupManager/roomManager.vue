<template>
	<div class="floorManager" id="floorManager">
		<div>
			<div class="top-title">
				<div class="line"></div>
				<span class="top-text">房间管理</span>
			</div>
		</div>
		<div class="title clearfix">
			<div class="fl searchbuilding">
				<div class="search_con clearfix">
					<input v-model="buildingGroupName" placeholder="请输入楼盘名称">
					<el-button type="primary" icon="el-icon-search" id="icon" @click="getBuildingList"></el-button>
				</div>
				<div class="building_con">
					<div class="building_floor" v-for="item,index in buildingGroup" :key="index">
						<div class="building"><span>{{item.buildingGroupName}}</span></div>
						<div class="buildinggroup">
							<div class="buildinggroup_part " v-for="(items,indexs) in item.buildingList" :key="indexs" @click="changestyle(items.buildingId)">
								<span class="normal" :title="title" @mouseenter="showTitle(index,indexs)">{{items.buildingName}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fr">
				<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addBuildingfloor">添加房间</el-button>
				<el-button type="danger" icon="el-icon-delete">删除房间</el-button>
				<div class="search_con clearfix">
          <input v-model="shopName" placeholder="公司名称">
					<input v-model="roomName" placeholder="房间号">
					<el-button type="primary" id="icon" @click="searchRoomList">搜索</el-button>
				</div>
				<div class="floor_con ">
					<div class="floor_part clearfix" v-for="item in buildingRoomList">
						<div class="floornum_left fl">
							<span>{{item.floorName}}</span>
							<span>({{item.floorArea}})</span>
						</div>
						<div class="floornum_right fr">
              <div v-if="item.buildingRoomList==''||item.buildingRoomList==null">
                <i style="display: inline-block;margin-top: 30px;color: #ff0100;">该楼层暂无房间</i>
              </div>
							<div v-else style="display: inline-block;" v-for="items in item.buildingRoomList">
								<!--@mouseleave="options1"-->
								<span  class="rentCondition" :flag="items.flag">{{items.roomName}}<!--@mouseover="options(items.roomName)"-->
									<p>
										<a @click="editRoom(items.buildingRoomId)">编辑</a>
										<a @click="roomDetails(items.buildingRoomId)">详情</a>
										<a @click="roomDelete(items.buildingRoomId)">删除</a>
									</p>
								</span>

								<!--<div class="option" v-show="block">
									<p @click="editRoom">编辑</p>
									<p @click="roomDetails">详情</p>
									<p @click="roomDelete(items.buildingRoomId)">删除</p>
								</div>-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<el-dialog title="添加房间" :visible.sync="dialogVisible" width="1000px" :modal-append-to-body="false">
				<div class="details-box clearfix">
					<div class="fl edit-boxs">
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">楼层</div>
							<div class="fl info-texts">
								<el-select class="w280" v-model="roomAdd.buildingFloorId" placeholder="请选择楼层">
									<el-option v-for="item,index in floorNumList" :key="index" :label="item.buildingFloorName" :value="item.buildingFloorId">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间名称</div>
							<div class=" info-texts after-fjmc">
								<el-input v-model.trim="roomAdd.roomName" placeholder="请输入房间名称" clearable></el-input>
							</div>
							<div class="company fl">房间</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间面积</div>
							<div class="info-texts ">
								<el-input v-model.trim="roomAdd.areaSize" placeholder="请输入房间面积" clearable></el-input>
							</div>
							<div class="company fl">㎡</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间租金</div>
							<div class="info-texts">
								<el-input v-model.trim="roomAdd.price" placeholder="请输入房间价格" clearable></el-input>
							</div>
							<div class="company fl">元/㎡/天</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">是否特价</div>
							<div class=" info-text lh40">
								<el-radio v-model="roomAdd.specialPrice" label="Y">是</el-radio>
								<el-radio v-model="roomAdd.specialPrice" label="N">否</el-radio>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">装修状况</div>
							<div class="fl iten-text">
								<el-select class="w280" v-model="roomAdd.fitment" placeholder="请选择状况">
									<el-option v-for="item,index in xiuList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房屋朝向</div>
							<div class="fl info-texts">
								<el-select class="w280" v-model="roomAdd.orient" placeholder="请选择状况">
									<el-option v-for="item,index in xiangList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">付费方式</div>
							<div class="fl info-texts">
								<el-select class="w280" v-model="roomAdd.payModelId" placeholder="请选择付费方式">
									<el-option v-for="item,index in feiList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋套配</div>
							<div class="fl info-texts">
								<el-input type="textarea" :rows="2" placeholder="请输入房屋套配内容" v-model="roomAdd.suite" clearable>
								</el-input>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋详情</div>
							<div class="fl w280">
								<el-input type="textarea" :rows="2" placeholder="请输入房屋套配内容" v-model="roomAdd.info" clearable>
								</el-input>
							</div>
						</div>
					</div>
					<div class="fl info-texts">
						<div class="item clearfix">
							<div class="iten-text fl">房屋照片</div>
							<div class="imgbox">
								<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="roomAdd.roomPic">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="roomMask">
									<img width="100%" :src="imageUrls" alt="">
								</el-dialog>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">户型照片</div>
							<div class="imgbox">
								<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-success="uploadSuccessgs2" :on-remove="handleRemovegs2" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="roomAdd.layoutPic">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible4" :modal-append-to-body="false">
									<img width="100%" :src="imageUrls" alt="">
								</el-dialog>
							</div>
						</div>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
            		<el-button type="primary" @click="sureAdd">保存</el-button>
        		</span>
			</el-dialog>

			<!-- html开始 -->
			<!--编辑-->
			<el-dialog title="房间编辑" :visible.sync="dialogVisible1" width="1000px" center :modal-append-to-body="false" :before-close="handleClose">
				<div class="details-box clearfix">
					<div class="fl edit-boxs">
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">楼层</div>
							<div class="info-texts  afterCeng">{{roomInfo.floorName}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间名称</div>
							<div class=" info-texts after-fjmc">
								<el-input v-model.trim="roomInfo.roomName" placeholder="请输入房间名称" clearable></el-input>
							</div>
							<div class="company fl">房间</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间面积</div>
							<div class="info-texts ">
								<el-input v-model.trim="roomInfo.areaSize" placeholder="请输入房间面积" clearable></el-input>
							</div>
							<div class="company fl">㎡</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房间租金</div>
							<div class="info-texts">
								<el-input v-model.trim="roomInfo.price" placeholder="请输入房间价格" clearable></el-input>
							</div>
							<div class="company fl">元/㎡/天</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">是否特价</div>
							<div class=" info-text lh40">
								<el-radio v-model="roomInfo.specialPrice" label="Y">是</el-radio>
								<el-radio v-model="roomInfo.specialPrice" label="N">否</el-radio>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">装修状况</div>
							<div class="fl iten-text">
								<el-select class="w280" v-model="roomInfo.fitment" placeholder="请选择状况">
									<el-option v-for="item,index in xiuList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">房屋朝向</div>
							<div class="fl info-texts">
								<el-select class="w280" v-model="roomInfo.orient" placeholder="请选择状况">
									<el-option v-for="item,index in xiangList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text beforesiteml fl">付费方式</div>
							<div class="fl info-texts">
								<el-select class="w280" v-model="roomInfo.payModelId" placeholder="请选择付费方式">
									<el-option v-for="item,index in feiList" :key="index" :label="item.dictionariesName" :value="item.dictionariesValue">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋套配</div>
							<div class="fl info-texts">
								<el-input type="textarea" :rows="2" placeholder="请输入房屋套配内容" v-model="roomInfo.suite" clearable>
								</el-input>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋详情</div>
							<div class="fl w280">
								<el-input type="textarea" :rows="2" placeholder="请输入房屋套配内容" v-model="roomInfo.info" clearable>
								</el-input>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋照片</div>
							<div class="imgbox">

								<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-success="uploadSuccessgs" :on-remove="handleRemovegs" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="roomInfo.roomPic">
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">户型照片</div>
							<div class="imgbox">
								<el-upload ref="uploads1" :action="importFileUrl" :data="upLoadData" :beforeUpload="beforeAvatarUpload" :on-success="uploadSuccessgs2" :on-remove="handleRemovegs2" list-type="picture-card" :limit="10" :on-exceed="handleExceed" :file-list="roomInfo.layoutPic">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="imageUrls" alt="">
								</el-dialog>
							</div>
						</div>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
            		<el-button type="primary" @click="sureEdit">保存</el-button>
        		</span>
			</el-dialog>
			<!--详情页面-->
			<el-dialog title="房间详情" :visible.sync="dialogVisible2" width="1000px" center :modal-append-to-body="false">
				<div class="addContent clearfix">
					<div class="details-box">
						<div class="item clearfix">
							<div class="iten-text fl">楼层</div>
							<div class=" info-text">{{roomInfo.floorName}}层</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房间名称</div>
							<div class="info-text">{{roomInfo.roomName}}房间</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房间面积</div>
							<div class=" info-text">{{roomInfo.areaSize}}㎡</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房间价格</div>
							<div class=" info-text">{{roomInfo.price}}元/㎡/天</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">是否特价</div>
							<div class=" info-text">{{roomInfo.specialPrice=="N"?'否':'是'}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">精装修状况</div>
							<div class=" info-text">{{roomInfo.fitmentDesc}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋朝向</div>
							<div class="info-text">{{roomInfo.orientDesc}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">付费方式</div>
							<div class=" info-text">{{roomInfo.payModelDesc}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋套配</div>
							<div class=" info-text">{{roomInfo.suite}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋详情</div>
							<div class=" info-text">{{roomInfo.info}}</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">房屋照片</div>
							<div class="imgbox ml120">
								<img v-for="rooImg in roomInfo.roomPic" :src="rooImg.url" alt="">
							</div>
						</div>
						<div class="item clearfix">
							<div class="iten-text fl">户型照片</div>
							<div class="imgbox ml120">
								<img v-for="huxing in roomInfo.layoutPic" :src="huxing.url" alt="">
							</div>
						</div>
					</div>
				</div>
			</el-dialog>
			<!-- html结束 -->
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/global'
	import gUrl from '@/assets/js/gUrl'
	import { $gPasserUrl } from '@/assets/js/gUrl'
	export default {
		name: "building-manager",
		data() {
			return {
        title:'',//左侧的楼楼盘列表
				buildingFloorId: '', //楼层Id
				buildingRoomId: '', //房间id
				gImgUrl: '', //图片头部地址
				roomInfo: {
					buildingFloorNum: '',
					floorName: '',
					roomName: '',
					areaSize: '',
					price: '',
					fitment: '',
					fitmentDesc: '',
					specialPrice: '',
					payModelId: '',
					payModelDesc: '',
					info: '',
					suite: '',
					orient: '',
					orientDesc: '',
					roomPic: [],
					layoutPic: []
				},
				roomPic: [],
				layoutPic: [],
				xiuList: [],
				xiangList: [],
				feiList: [],
				roomMask: false,
				importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
				upLoadData: { //图片上传参数
					file: '',
					type: 'company',
					objectId: 0
				},
				imageUrls: '', //放大 图片存放的地址

				/////////
				buildingName: '', //楼盘名称
				selectBuild: '', //选择楼盘下拉列表 选中项
				buildingfloorId: [], //批量或者单个删除id
				buildingFloorList: [], //楼层
				buildingList: [], //选择楼盘下拉列表
				//表格选中的row的列表
				buildingFloorIdList: [], //选择的楼层id
				searchCont: '', //搜索输入的写字楼
				dialogVisible: false, //添加楼层
				dialogVisible1: false, //修改
				dialogVisible2: false, //详情
				dialogVisible4: false, //详情
				buildingRoomIdList: [], //房间Id数组
				tableData: [],
				block: false,
				getParams: {
					shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
					customerId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
				},
				buildingGroupName: '', //楼盘名称
				buildingId: "", //写字楼ID
				buildingGroup: [], //获取左侧楼盘列表
				buildingfloorList: [], //楼层
				roomName: '', //房间姓名
        shopName:'',//
				buildingRoomList: [], //房间列表
				roomNameList: [], //房间名字列表
				floorNumList: [], //楼层数
				roomAdd: { //添加房间
					buildingFloorId: '',
					buildingFloorNum: '',
					floorName: '',
					roomName: '',
					areaSize: '',
					price: '',
					fitment: '',
					specialPrice: '',
					payModelId: '',
					info: '',
					suite: '',
					orient: '',
					roomPic: [],
					layoutPic: []
				},
			}
		},
		methods: {
			// 方法开始
      showTitle(index,indexs){
        for(let o in this.buildingGroup){
          for(let b in this.buildingGroup[o].buildingList){
             this.title = this.buildingGroup[index].buildingList[indexs].buildingName
          }
        }
      },
      handleClose(){
        this.dialogVisible1 = false; //修改
      },
			//编辑确定
			sureEdit() {
				if(this.roomInfo.roomName == '') {
					this.$message({
						showClose: true,
						message: '请输入房名称',
						type: 'error'
					});
				} else {
					this.$httpPasser.post('/buildingRoom/updateBuildingRoom', {
							buildingFloorId: this.buildingFloorId,
							buildingRoomId: this.buildingRoomId, //房间id
							buildingFloorNum: this.roomInfo.buildingFloorNum, //楼层号
							roomName: this.roomInfo.roomName, //房间名称
							areaSize: this.roomInfo.areaSize, //房间面积
							price: this.roomInfo.price, //价格
							fitment: this.roomInfo.fitment, //装修情况
							specialPrice: this.roomInfo.specialPrice, //是否特价
							payModelId: this.roomInfo.payModelId, //付费方式
							suite: this.roomInfo.suite, //房间配套
							orient: this.roomInfo.orient, //房间朝向
							roomPic: this.roomPic.length ? this.roomPic : '', //房间照片
							layoutPic: this.layoutPic.length ? this.layoutPic : '', //户型图片
							info: this.roomInfo.info, //房间详情
						})
						.then(res => {
              const data = res.data
              if(this.buildingFloorId == ''||this.buildingFloorId == null){
                this.$message.error('请选择楼层')
              }else if(this.roomInfo.roomName == ''||this.roomInfo.roomName == null){
                this.$message.error('请输入房间名称')
              }else if(this.roomInfo.areaSize === ''||this.roomInfo.areaSize === null){
                  this.$message.error("请输入房间面积")
              }else if(this.roomInfo.price=== ''||this.roomInfo.price=== null){
                this.$message.error("请输入房间租金")
              }else if(this.roomInfo.specialPrice == '' ||this.roomInfo.specialPrice ==null){
                this.$message.error("请选择是否特价")
              }else if(this.roomInfo.fitment == ''||this.roomInfo.fitment==null){
                this.$message.error("请选择装修状况")
              }else if(this.roomInfo.orient == ''||this.roomInfo.orient ==null){
                this.$message.error("请选择房屋朝向")
              }else if(this.roomInfo.payModelId == ''||this.roomInfo.payModelId == null){
                this.$message.error("请选择付费方式")
              }else{
                if(data.resultCode == '200') {
                  this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                  });

                  this.dialogVisible1 = false;
                } else {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'error'
                  });
                  this.dialogVisible1 = false;
                }
              }
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			//图片上传之前限制
			beforeAvatarUpload(file) { //图片上传之前限制
				this.upLoadData.file = file
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt10M = file.size / 1024 / 1024 < 10
				if(!isJPG && !isPNG) {
					this.$message({
						showClose: true,
						message: '上传照片必须是JPG/PNG格式!',
						type: 'error'
					});
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: '上传图片大小不能超过 10MB!',
						type: 'error'
					})
				}
				return(isJPG || isPNG) && isLt10M;
			},
			//图片放大
			handlePictureCardPreview(file) {
				this.imageUrls = file.url;
				this.roomMask = true;
			},
			//限制上传的图片数量
			handleExceed() {
				this.$message({
					showClose: true,
					message: '图片上传数量超过限制',
					type: 'error'
				});
			},
			// 111房屋图片上传成功之后的函数
			uploadSuccessgs(response, file, fileList) {
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.roomPic.push(response.result)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			//111房屋图片删除
			handleRemovegs(file, fileList) {
				this.roomPic = []
				for(var i = 0; i < fileList.length; i++) {
					if(fileList[i].response) {
						this.roomPic.push(fileList[i].response.result)
					} else {
						this.roomPic.push(fileList[i].url.split(this.gImgUrl)[1])
					}
				}
			},
			//222户型图片上传成功之后的函数
			uploadSuccessgs2(response, file, fileList) {
				if(response.resultCode == '200') {
					this.$message({
						showClose: true,
						message: '上传成功',
						type: 'success'
					});
					this.layoutPic.push(response.result)
				} else {
					this.$message({
						showClose: true,
						message: data.result,
						type: 'error'
					});
				}
			},
			//222户型图片删除
			handleRemovegs2(file, fileList) {
				this.layoutPic = []
				for(var i = 0; i < fileList.length; i++) {
					if(fileList[i].response) {
						this.layoutPic.push(fileList[i].response.result)
					} else {
						this.layoutPic.push(fileList[i].url.split(this.gImgUrl)[1])
					}
				}
			},
			//付费方式
			getfei() {
				this.$httpPasser.post('/baseDic/getPayModelId')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.feiList = data.result
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//朝向
			getxiang() {
				this.$httpPasser.post('/baseDic/getOrient')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.xiangList = data.result
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//装修
			getxiu() {
				this.$httpPasser.post('/baseDic/getFitment')
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.xiuList = data.result
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//根据房间id获取房间信息
			byIdgetRoomIofo(roomId) {
				this.$httpPasser.post('/buildingRoom/getBuildingRoomDetail', {
						buildingRoomId: roomId
					})
					.then(res => {
						const data = res.data
						if(data.resultCode == '200') {
							this.buildingRoomId = data.result.buildingRoomId
							this.buildingFloorId = data.result.buildingFloorId
							this.roomInfo.buildingFloorNum = data.result.buildingFloorNum
							this.roomInfo.floorName = data.result.floorName
							this.roomInfo.roomName = data.result.roomName
							this.roomInfo.areaSize = data.result.areaSize
							this.roomInfo.price = data.result.price
							this.roomInfo.fitment = data.result.fitment ? data.result.fitment.toString() : ''
							this.roomInfo.fitmentDesc = data.result.fitmentDesc

							this.roomInfo.specialPrice = data.result.specialPrice
							this.roomInfo.payModelId = data.result.payModelId ? data.result.payModelId.toString() : '' //付费方式
							this.roomInfo.payModelDesc = data.result.payModelDesc //付费方式
							/*for(var i=0;i<this.feiList.length;i++){
							  if(this.feiList[i].dictionariesValue==data.result.fitment){
							    this.roomInfo.payModelId=this.feiList[i].dictionariesName
							  }
							}*/
							this.roomInfo.info = data.result.info
							this.roomInfo.suite = data.result.suite
							this.roomInfo.orient = data.result.orient.toString() //朝向
							this.roomInfo.orientDesc = data.result.orientDesc //朝向
							/*for(var i=0;i<this.xiangList.length;i++){
							  if(this.xiangList[i].dictionariesValue==data.result.orient){
							    this.roomInfo.orient=this.xiangList[i].dictionariesName
							  }
							}*/
							this.roomPic = data.result.roomPic
							this.roomInfo.roomPic = []
							for(var i = 0; i < data.result.roomPic.length; i++) {
								this.roomInfo.roomPic.push({
									"url": this.gImgUrl + data.result.roomPic[i]
								})
							}

							this.layoutPic = data.result.layoutPic
							this.roomInfo.layoutPic = []
							for(var j = 0; j < data.result.layoutPic.length; j++) {
								this.roomInfo.layoutPic.push({
									"url": this.gImgUrl + data.result.layoutPic[j]
								})
							}
							// console.log(this.roomInfo.layoutPic)
						} else {
							this.$message({
								showClose: true,
								message: data.resultCodeDesc,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//房间详情
			roomDetails(rooId) {
				this.dialogVisible2 = true;
				this.byIdgetRoomIofo(rooId)
			},
			//编辑房间
			editRoom(rooId) {
				this.dialogVisible1 = true;
				this.byIdgetRoomIofo(rooId)
			},
			// 方法结束

			///////
			getBuildingList() { //获取楼盘列表
				this.$httpPasser.post("buildingFloor/searchBuilding", {
					shopId: this.getParams.shopId,
					buildingGroupName: this.buildingGroupName
				}).then((res) => {
					if(res.data.resultCode == "200") {
						this.buildingGroup = res.data.result;
						for(let i in res.data.result) {
							for(let o in res.data.result[i].buildingList) {
								this.buildingId = res.data.result[0].buildingList[0].buildingId
							}
						}
						this.$nextTick(() => {
							let normallist = document.querySelectorAll(".normal");
							normallist[0].className += ' active';
							for(let i = 0; i < normallist.length; i++) {
								normallist[i].onclick = function() {
									for(let j = 0; j < normallist.length; j++) {
										normallist[j].className = 'normal'
									}
									this.className += ' active';
								}
							}
							let buildinggroup_part = document.querySelectorAll(".buildinggroup_part");
							buildinggroup_part[0].className += " hoverstyle"
							for(let a = 0; a < buildinggroup_part.length; a++) {
								buildinggroup_part[a].onclick = function() {
									for(let o = 0; o < buildinggroup_part.length; o++) {
										buildinggroup_part[o].className = 'buildinggroup_part'
									}
									this.className += ' hoverstyle';
								}
							}
						})
						this.getRoomList();
					} else if(res.data.resultCode == "204") {
						this.buildingGroup = res.data.result
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'success'
						})
						this.getRoomList();
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					}
				})
			},
			getRoomList() { //获取房间列表
				this.$httpPasser.post('buildingRoom/getBuildingRoomList', {
					roomName: this.roomName,
          shopName:this.shopName,
					buildingId: this.buildingId
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.buildingRoomList = res.data.result
            console.log(this.buildingRoomList)
					} else if(res.data.resultCode == "204") {
						this.buildingRoomList = [];
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					}
				})
			},
			getFloorNum() { //获取楼层数
				this.$httpPasser.post('building/getBuildingFloorListByBuildingId', {
					buildingId: this.buildingId,
				}).then((res) => {
					if(res.data.resultCode == '200') {
						this.floorNumList = res.data.result.buildingFloorList;
					}
				})
			},
			addBuildingfloor() { //添加房间
        this.roomAdd = {};
				this.dialogVisible = true;
				this.getFloorNum(); //获取楼层
			},
			sureAdd() {
				let buildingFloorNum;
				for(let o in this.floorNumList) {
					if(this.floorNumList[o].buildingFloorId == this.roomAdd.buildingFloorId) {
						buildingFloorNum = this.floorNumList[o].buildingFloorNum;
						break;
					}
				}
				/*console.log('楼层列表',this.floorNumList);
				console.log('楼层参数',this.roomAdd);*/
				console.log('楼层叙述', buildingFloorNum);
				this.$httpPasser.post('buildingRoom/addBuildingRoom', { //添加房间
					buildingFloorNum: buildingFloorNum,
					buildingFloorId: this.roomAdd.buildingFloorId, //楼层Id
					buildingRoomId: this.buildingRoomId, //房间id
					buildingId: this.buildingId,
					roomName: this.roomAdd.roomName, //房间名称
					areaSize: this.roomAdd.areaSize, //房间面积
					price: this.roomAdd.price, //价格
					fitment: this.roomAdd.fitment, //装修情况
					specialPrice: this.roomAdd.specialPrice, //是否特价
					payModelId: this.roomAdd.payModelId, //付费方式
					info: this.roomAdd.info, //房间详情
					suite: this.roomAdd.suite, //房间配套
					orient: this.roomAdd.orient, //房间朝向
					roomPic: this.roomPic, //房间照片
					layoutPic: this.layoutPic //户型图片
				}).then((res) => {
          if(this.roomAdd.buildingFloorId == ''||this.roomAdd.buildingFloorId == null){
				      this.$message.error('请选择楼层')
          }else if(this.roomAdd.roomName == ''||this.roomAdd.roomName == null ){
             this.$message.error('请输入房间名称')
          }else if(this.roomAdd.areaSize == ''||this.roomAdd.areaSize == null){
            this.$message.error("请输入房间面积")
          }else if(this.roomAdd.price== ''||this.roomAdd.price == null){
            this.$message.error("请输入房间租金")
           }else if(this.roomAdd.specialPrice == '' ||this.roomAdd.specialPrice ==null){
            this.$message.error("请选择是否特价")
           }else if(this.roomAdd.fitment == ''||this.roomAdd.fitment==null){
             this.$message.error("请选择装修状况")
           }else if(this.roomAdd.orient == ''||this.roomAdd.orient ==null){
             this.$message.error("请选择房屋朝向")
           }else if(this.roomAdd.payModelId == ''||this.roomAdd.payModelId == null){
             this.$message.error("请选择付费方式")
           }else{
             if(res.data.resultCode == "200") {
               this.dialogVisible = false;
               this.$message({
                 type: 'success',
                 message: '添加成功',
                 showClose: true
               });
               this.getRoomList();
               this.clearInput();
             } else if(res.data.resultCode == '204') {
               this.$message({
                 showClose: true,
                 message: res.data.resultCodeDesc,
                 type: 'error'
               })
               this.getRoomList();
               this.dialogVisible = false;
             } else {
               this.dialogVisible = false;
               this.$message({
                 showClose: true,
                 message: res.data.resultCodeDesc,
                 type: 'error'
               })
             }
           }
				})
			},
			options(roomName) { //操作显示
				for(let o in this.roomNameList) {
					if(this.roomNameList[o] == roomName) {
						this.block = true;
					}
				}
			},
			searchRoomList() { //查询房间列表
				this.getRoomList();
			},
			changestyle(buildingId) {
				this.buildingId = buildingId;
				this.getRoomList();
			},
			roomDelete(buildingRoomId) { //删除单个房间
				this.$httpPasser.post('buildingRoom/delteBuildingRoom', {
					buildingRoomIdList: buildingRoomId,
					shopId: this.getParams.shopId,
					buildingId: this.buildingId
				}).then((res) => {
					if(res.data.resultCode == 200 && res.data.result.length ==0 ) {
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						})
						this.getRoomList()
					} else if(res.data.resultCode == 200 && res.data.result.length != 0) {
            this.$message.error(res.data.result[0].errMsg)
//						this.$message({
//							showClose: true,
//							message: res.data.resultCodeDesc,
//							type: 'success'
//						})
						this.getRoomList()
					} else {
						this.$message({
							showClose: true,
							message: res.data.resultCodeDesc,
							type: 'error'
						})
					}
				})
			},
			clearInput() {
				this.roomAdd.roomName = ''; //房间名称
				this.roomAdd.areaSize = ''; //房间面积
				this.roomAdd.price = ''; //价格
				this.roomAdd.fitment = ''; //装修情况
				this.roomAdd.specialPrice = ''; //是否特价
				this.roomAdd.payModelId = ''; //付费方式
				this.roomAdd.info = ''; //房间详情
				this.roomAdd.suite = ''; //房间配套
				this.roomAdd.orient = ''; //房间朝向
				this.roomPic = ''; //房间照片
				this.layoutPic = ''; //户型图片
			}
		},
    watch:{
		  title:function (){

      }
    },
		created() {
			this.getBuildingList()
			this.getxiu() //装修////////////
			this.getxiang() //朝向
			this.getfei() //付费
		},
		beforeCreate() {
			getUrl().then(res => {
				this.gImgUrl = res.gImgUrl
			})
		},
	}
</script>

<style scoped lang="less">
	.details-box {
		.info-text {
			line-height: 40px;
			font-size: 14px;
			margin-left: 120px;
		}
		.ml120 {
			margin-left: 120px;
		}
		.imgbox img {
			width: 148px;
			height: 148px;
			margin-right: 10px;
			margin-bottom: 20px;
		}
		.afterCeng:after {
			content: '层';
			margin-left: 4px;
		}
		.info-texts {
			width: 260px;
			float: left;
			line-height: 40px;
		}
		lh40 {
			line-height: 40px;
			text-align: left;
		}
	}

	.floorManager {
		background: #FFFFFF;
		.title {
			.searchbuilding {
				width: 190px;
				.search_con {
					input {
						border: 1px solid #DEDEDE;
						height: 32px;
						width: 120px;
						padding-left: 10px;
					}
				}
				.building_con {
					margin-top: 20px;
					.building_floor {
						.building {
							background: url(../../../../assets/images/index/building_icon.png);
							background-repeat: no-repeat;
							background-position: 10px 12px;
							background-size: 8px 8px;
							span {
								font-size: 14px;
								line-height: 30px;
								color: #526069;
								padding-left: 30px;
							}
						}
						.buildinggroup {
							padding-bottom: 10px;
							border-bottom: 1px solid #999999;
							.hoverstyle {
								background: #e1f1f9;
							}
							.buildinggroup_part {
								display: block;
								width: 160px;
								height: 30px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
								.normal {
									cursor: pointer;
									background: url(../../../../assets/images/index/buildinggroup_icon.png);
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
									color: #76838f;
								}
								.active {
									background: url(../../../../assets/images/index/buildinggroup_hicon.png);
									color: #3487fa;
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
								}
							}
							.buildinggroup_part:hover {
								background: #e1f1f9;
								span {
									background: url(../../../../assets/images/index/buildinggroup_hicon.png);
									color: #3487fa;
									background-repeat: no-repeat;
									background-position: 10px 4px;
									background-size: 14px 14px;
									padding-left: 30px;
									font-size: 14px;
									line-height: 30px;
								}
							}
						}
					}
				}
			}
			.fr {
				width: 750px;
				.pt20 {
					padding-top: 20px;
				}
				.lh35 {
					line-height: 35px;
				}
				.search_con {
					display: inline-block;
					float: right;
					input {
						border: 1px solid #DEDEDE;
						height: 32px;
						width: 150px;
						padding-left: 10px;
					}
				}
				.floor_con {
					margin-top: 10px;
					border: 1px solid #e4eaec;
					padding-top: 10px;
					.floor_part {
						width: 100%;
						border-top: 1px solid #e4eaec;
						border-bottom: 1px solid #e4eaec;
						.floornum_left {
							text-align: center;
							width: 155px;
							padding-top: 7%;
							span {
								font-size: 14px;
								display: inline-block;
							}
						}
						.floornum_right {
							width: 592px;
							padding: 5px 0;
							span {
								cursor: pointer;
								display: inline-block;
								margin: 5px 5px;
								color: #fff;
								background: #009688;
								text-align: center;
								padding: 16px 33px;
							}
							span.rentCondition[flag='是'] {
								background: #fcb160;
								/*box-shadow: 1px 1px 8px 3px #5f827e;*/
							}
						}
					}
					.option {
						border: 1px solid #1168E1;
						margin-left: 80px;
						margin-top: -50px;
						background: #fff;
						padding: 10px 12px;
						position: absolute;
						p {
							cursor: pointer;
							font-size: 12px;
							line-height: 20px;
							color: #526069;
						}
						p:hover {
							color: #3487fa;
						}
					}
					.option:before {
						content: '';
						position: absolute;
						top: 0.9rem;
						left: -0.39rem;
						width: 0;
						height: 0;
						border-top: 0.4rem solid transparent;
						border-bottom: 0.4rem solid transparent;
						border-right: 0.4rem solid #ececec;
					}
				}
			}
			.entry-cocnt {
				.siteml {
					width: 140px;
					text-align: right;
					margin-right: 10px;
					line-height: 40px;
					margin-bottom: 20px;
				}
				.sitemr {
					width: 217px;
				}
				.lengthstyle {
					line-height: 40px;
					padding-left: 5px;
				}
			}
			.w450 {
				width: 450px;
			}
			.w280 {
				width: 260px;
			}
			.w320 {
				margin-right: -40px;
			}
			.item {
				margin-bottom: 10px;
			}
			.company {
				line-height: 40px;
				font-size: 14px;
				margin-left: 5px;
			}
			.iten-text {
				line-height: 40px;
				width: 100px;
				text-align: right;
				margin-right: 20px;
				font-size: 14px;
			}
			.imgbox {
				margin-left: 120px;
			}
			.overBtn {
				padding-top: 20px;
				padding-left: 120px;
			}
		}
    .v-modal{
      z-index: 1000 !important;
    }
	}
</style>
<style lang="less">
  #floorManager{
		#icon {
			padding: 9px 16px 10px 16px;
			border-radius: 0px;
		}
		.el-button--primary {
			margin-left: -6px;
		}
		.el-dialog {
			width: 500px;
		}
		.el-dialog__footer {
			text-align: center;
		}
    /*.el-dialog__wrapper{*/
      /*z-index:100000 !important;*/
    /*}*/
    .v-modal{
      z-index: 1000 !important;
    }
	}

</style>

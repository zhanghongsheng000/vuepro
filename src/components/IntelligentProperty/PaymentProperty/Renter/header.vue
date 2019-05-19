<template>
	<div class="header_container renterHeader">
		<div class="clearfix">
			<h1 class="fl"></h1>
			<div class="nav fr">
				<!--<router-link class="link-item" to="/IntelligentProperty/Renter">
					<img src="../../../../assets/img/IntelligentProperty/icon_home.png" class="fl" />
				</router-link>-->
				<ul class="nav_list fr">
					<li>
						<!--<a href="javascript:;" to="/PropertyPayment"></a>-->
						<router-link class="link-item" to="../../../CommonCompanyProduct/IntelligentProperty/PaymentProperty/Renter/PropertyPayment">物业缴费</router-link>
					</li>
					<li>
						<!--<a href="javascript:;" to="/PropertyPayment">财务管理</a>-->
						<!--<router-link class="link-item" to="../../../IntelligentProperty/PaymentProperty/Renter/AccountManage/accountsManage">财务管理</router-link>-->
					</li>
					<li>
						<!--<router-link class="link-item" to="../../../IntelligentProperty/PaymentProperty/Renter/EnterpriseCentre">企业中心</router-link>-->
					</li>
				</ul>
			</div>
		</div>
		<div class="rent_message fr">
			<!--<span>{{building.builgingName}}</span>
			<span>{{buildingRoom.roomName}}</span>
			<span>{{userRealName}}</span>
      <span class="quitLogin" @click="quitLogin">退出</span>-->
		<!--	<p>代缴费<span>1</span></p>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
        userRealName:this.$local.sefetch('info')?this.$local.sefetch('info').userRealName:'',
        companyId:{
          companyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        },
        buildingGroup:{},
        building:{},
        buildingFloor:{},
        buildingRoom:{},


			};
		},
		methods: {
			//获取当前用户楼盘
      getBuildingGroup(){
        this._http('building/getBuildingGroupListByCompanyId','get',this.companyId,(data)=>{
          if(data.result.buildingGroupList.length>0){
            this.buildingGroup = data.result.buildingGroupList[0];
            this.getBuilding()
          }

        })
      },
      //获取当前用户写字楼
      getBuilding(){
        this._http('building/getBuildingGroupListByCompanyId','get',{buildingGroupId:this.buildingGroup.buildingGroupId},(data)=>{
          if(data.result.buildingList.length>0){
            this.building = data.result.buildingList[0];
            this.getBuildingFloor();
          }

        })
      },
      //获取当前用户楼层
      getBuildingFloor(){
        this._http('building/getBuildingGroupListByCompanyId','get',{buildingGroupId:this.buildingGroup.buildingGroupId},(data)=>{
          if(data.result.buildingFloorList.length>0){
            this.buildingFloor = data.result.buildingFloorList[0];
            this.getBuildingRoom();
          }

        })
      },
      //获取当前用户房间
      getBuildingRoom(){
        this._http('building/getBuildingGroupListByCompanyId','get',{buildingId:this.building.buildingId},(data)=>{
          if(data.result.buildingRoomList.length>0){
            this.buildingRoom = data.result.buildingRoomList[0];
          }

        })
      },
      //退出登录
      quitLogin(){
        this.$local.sesave("info", null)
        this.$local.sesave("pwdInit", null)
        this.$local.sesave("isID", null)
        this.$local.sesave("isBank", null)
        this.$local.sesave("identity", null)
        this.$router.push("/")
      },
      /*工具方法*/
      _http(url,type,params,callback200){
        if(type=="get"){
          this.$http.get(
            url,
            {params:params}
          ).then(
            (response)=>{
              let data = response.data;
              if(data.resultCode==200){
                callback200(data)
              }
              else if(data.resultCode==204){

              }
              else{
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }
        else if(type=="post"){

        }
      }

		},
    mounted:function(){
      //this.getBuildingGroup()
    }
	}
</script>

<style lang="less" scoped>
	.renterHeader {
    .rent_message{
      padding-right:20px;
      span{
        padding-right:10px;
      }
    }
    .quitLogin{
      cursor:pointer;
    }

		/*h1 {
			background: url(../../../../assets/img/IntelligentProperty/rent_logo.png) no-repeat;
			background-size: 501px 51px;
			background-position: 59px 46px;
			width: 560px;
			height: 97px;
		}*/
		.nav {
			padding: 36px 0 0 0;
			img {
				width: 20px;
				height: 17px;
			}
			ul {
				margin-left: 33px;
				li {
					float: left;
					margin: 0 10px;
					&:hover {}
					a {
						padding: 10px 20px;
						font-size: 12px;
						color: #000000;
						&:hover {
							color: #FFFFFF;
							background: #000000;
							border-radius: 5px;
						}
					}
				}
			}
		}
		.rent_message{
			margin-top: -20px;
			margin-right: 10px;
			font-size: 12px;
			p{
				display: inline-block;
				padding: 5px 10px;
				background: #ff9100;
				color: #FFFFFF;
				font-size: 12px;
				border-radius: 5px;
				margin-left: 6px;
				cursor: pointer;
			}
		}
	}
</style>

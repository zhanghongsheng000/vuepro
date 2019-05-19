<template>
  <div id="repairOrderStatis">
    <div class="main-cont">
      <div class="common">
        <div class="top-title">
          <div class="line"></div>
          <span class="top-text">报修单统计</span>
        </div>
      </div>
      <div class="main-box">
        <div class="forms-cont clearfix">
          <div class="form-item fl">
            <el-date-picker
              v-model="condition.startTime"
              type="date"
               value-format='yyyy-MM-dd'
              placeholder="请选择报修开始时间"  clearable>
            </el-date-picker>
          </div>
          <div class="form-item fl" style="margin-right: 0px;">
            <div class="form-item fl">
              <el-date-picker
                v-model="condition.endTime"
                type="date"
                 value-format='yyyy-MM-dd'
                placeholder="请选择报修结束时间"  clearable>
              </el-date-picker>
            </div>
          </div>
          <div class="form-item fl" style="width: 148px;">
            <el-select v-model="condition.facilitiesType" placeholder="设施类型"  clearable>
              <el-option
                v-for="item in repairType"
                :key="item.dictionariesValue"
                :label="item.dictionariesName"
                :value="item.dictionariesValue">
              </el-option>
            </el-select>
          </div>
          <div class="form-item fl" style="width: 146px;">
            <el-select v-model="condition.serviceItemId" placeholder="服务项"  clearable>
              <el-option
                v-for="item in ServicesItemList"
                :key="item.serviceItemId"
                :label="item.serviceItemName"
                :value="item.serviceItemId">
              </el-option>
            </el-select>
          </div>
          <div class="form-item fl" style="width: 146px;">
            <el-select v-model="condition.employeeId" placeholder="维修人员" clearable>
              <el-option
                v-for="item in employeeList"
                :key="item.employee_id"
                :label="item.name"
                :value="item.employee_id">
              </el-option>
            </el-select>
          </div>
          <div class="form-item fl">
            <el-button type="primary" @click="getOrderStatisList">统计</el-button>
          </div>
        </div>
      </div>
    </div>
   <div class="tables">
     <div class="title" v-if="more">
       <span>{{showDate}}</span>
       报修单统计
     </div>
     <div class="title" v-if="more1">
       <span v-if="condition.startTime == ''||condition.startTime == null ">{{showDate}}</span>
       <span v-if="condition.startTime">{{condition.startTime}}</span>
       <span v-if="condition.endTime"><span>至</span>{{condition.endTime}}</span>
       <span v-if="condition.facilitiesType == '1'">公共设施</span>
       <span v-if="condition.facilitiesType == '2'">租客设施</span>
       <span v-if="condition.servicesPro">{{condition.servicesPro}}</span>
       报修单统计
     </div>
     <el-table :data="statisticsList" style="width: 100%" show-summary :summary-method="getSummaries">
       <el-table-column
         prop="repairTypeName"
         label="设施类型"
         width="180">
       </el-table-column>
       <el-table-column
         prop="serviceItemName"
         label="服务项"
         width="180">
       </el-table-column>
       <el-table-column
         prop="number"
         label="数量">
       </el-table-column>
       <el-table-column
         prop="total"
         label="金额">
       </el-table-column>
       <el-table-column v-if="condition.employeeId != ''&& condition.employeeId !=null"
         prop="employIds"
         label="维修人员">
       </el-table-column>
       <el-table-column fixed="right" label="操作" width="240">
         <template slot-scope="scope">
           <el-button  type="primary"  size="small" @click="details(scope.row)">详情</el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
  </div>
</template>

<script>
  import gUrl from '@/assets/js/gUrl'
  import buildingCascader from '@/components/public/buildingCascader'
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

  export default {
    name: "repairOrderStatis",
    data() {
      return {
        more:true,
        more1:false,
        showDate: this.$local.getDay('yyyy年MM月'),
        companyId: this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        productId:this.$local.sefetch('productInfo').productId?this.$local.sefetch('productInfo').productId:'',
        employeeList:[],//维修人员列表
        ServicesItemList:[],//服务项列表
        repairType:[],//设施类型
        tempStartTime:"",
        tempEndTime:'',
        condition:{
        	employeeId:'',//维修人员ID
          serviceItemId:'',//服务项Id
          startTime:'',
          endTime:'' ,
          facilitiesType:'',//设施类型
          servicesPro:'',//服务项
          repairPerson:''//维修人员
        },
        repairState:'',
        statisticsList:[
        ],
				repairListType:[],
      }
    },

    created() {
    	this.getOrderStatisList()
    	this.getEmployeeList()
    	this.getServicesList()
      this.getServiceItemList()//获取服务项列表
      this.getRepairType()//获取设施类型接口
    },
    computed: {},
    methods: {
    	getEmployeeList(){//获取维修人员
        this.$httpPasser.post("repairStatistics/getRepairEmployee",{
          shopId:this.companyId,
        }).then((res)=>{
          let data = res.data;
          if(data.resultCode == '200'){
            this.employeeList = data.result;
          }else{
          	this.employeeList = [];
          }
        })
      },
      getServicesList(){//获取服务项列表
      	this.$httpPasser.get("serviceitem/getServiceItemList",{
      		params:{
      			shopId:this.companyId
      		}
      	}).then((res)=>{
      		if(res.data.resultCode == '200'){
      			this.ServicesItemList = res.data.result
      		}else{
      			this.ServicesItemList =[];
      		}
      	})
      },
      getRepairType(){//获取设施类型接口
        this.$httpPasser.get('baseDic/getRepairType',{
          params:{}
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.repairType = res.data.result;
          }else{
            this.repairType =[]
          }
        })
      },
      getServiceItemList(){//获取服务项列表
        this.$httpPasser.get("serviceitem/getServiceItemList",{
          params:{
            shopId:this.companyId
          }
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.ServicesItemList = res.data.result
          }else{
            this.ServicesItemList = []
          }
        })
      },
      getOrderStatisList(){
				this.$httpPasser.post("repairStatistics/statisticsList",{
					shopId:this.companyId,
					employeeId:this.condition.employeeId,
					endTime:this.condition.endTime,
					repairType:this.condition.facilitiesType,
          serviceItemId:this.condition.serviceItemId,
					startTime:this.condition.startTime,
				}).then((res)=>{
					if(res.data.resultCode=='200'){
						this.statisticsList = res.data.result.data;
						this.tempStartTime = res.data.param.startTime;
						this.tempEndTime = res.data.param.endTime;
					}else{
						this.statisticsList=[];
					}
					this.more = false;
					this.more1 = true;
				})
      },
      details(row){
        this.$router.push({
          path:'./repairOrderStatisDetails',
          query: {
            startTime: this.condition.startTime?this.condition.startTime:this.tempStartTime,
            endTime:this.condition.endTime?this.condition.endTime:this.tempEndTime,
            facilitiesType:this.condition.facilitiesType,
            servicesPro:this.condition.servicesPro,
            employeeId:row.employeeId,
            serviceItemId:row.serviceItemId,
            repairType:row.repairType
          }
        })
      },
      getSummaries(param) {//合计
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] = "-";
            return;
          }
          if (index === 5) {
            sums[index] = '-';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
    }
  }
</script>

<style scoped lang="less">
  #repairOrderStatis{
    .main-cont{
      margin-top: 20px;
      padding-bottom: 20px;
    }
    .form-item {
      margin-right: 15px;
    }
    .common{
      width:100%!important;
    }
    .tables{
      padding-top: 30px;
      .pagestyle{
        line-height:30px;
      }
    }
    .tables{
      .title{
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        padding-bottom: 10px;
      }
    }
  }
</style>
<style lang="less">

</style>

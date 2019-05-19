<template>
  <div class="mainPart" id="currentPasserInfoDetial">
    <div>
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">实时通行信息详情</span>
      </div>
    </div>
    <div class="clear50 currentPasserInfoDetialAbstract">
      <span class="fl"><!--河北省石家庄市裕华区- -->{{buildingName}}<i></i>（{{companyName}}）</span>
      <span class="fr">当前楼内共有{{newData.totalNum}}人，其中常驻人员{{newData.innerTotalNum}}人，外来人员{{newData.outTotalNum}}人</span>
    </div>
    <el-table
      :data="alwaysConstNumRecord"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="floorName"
        label="楼层">
      </el-table-column>
      <el-table-column
        prop="roomName"
        label="房间">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="departName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{sex[scope.row.sex]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="dateTime"
        width="120px"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="进出">
      </el-table-column>
      <el-table-column
        prop="doorName"
        label="大门">
      </el-table-column>
      <el-table-column
        prop="passageWay"
        label="通道">
      </el-table-column>
    </el-table>
    <div class="clear20"></div>
<!--    <el-pagination
      @current-change="handleCurrentChange"
      background
      :current-page.sync="searchCustomerParams.pageIndex"
      layout="prev, pager, next"
      :total="customerInfo.pageTotal">
    </el-pagination>-->
  </div>
</template>

<script>
  import buildingCascader from '@/components/public/buildingCascader'
  export default {
    name: "search-customer-user",
    data(){
      return{
        buildingId:this.$route.query.buildingId,
        companyName:this.$local.sefetch('info')?this.$local.sefetch('info').companyName:'',
        buildingName:this.$route.query.buildingGroupName+this.$route.query.name,
        newData:{
          data: [],
          innerTotalNum: 0,
          outTotalNum: 0,
          totalNum: 0,
          //默认为0，得到返回值以后重写
          requestTime:0
        },
        //性别字典对象
        sex:{
          'F':'女',
          'M':'男'
        },
        //固定要显示的信息数
        constNum:10,
        alwaysConstNumRecord: [],
        //轮询
        timer:null
      }
    },
    methods:{
      //ajax轮询获取信息
      scanGetDetailInfo(){
        this.$httpPasser.get(
          'WebPropertyCompany/getPassInfoByBuildingId',
          {params:{buildingId:this.$route.query.buildingId,requestTime:this.newData.requestTime}}
        ).then((res)=>{
          this.newData = res.data.result;
          this.writeNewDataToalwaysConstNumRecord();
          //防止高速刷新页面导致的重复计时
          if(this.timer != null){
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(()=>{
            this.scanGetDetailInfo()
          },5000)

        })
      },
      //将新数据写入页面数据中，注意页面一次只能显示10条
      writeNewDataToalwaysConstNumRecord(){
        //console.log('写入方法',this.newData.data)
        if(this.newData.data && this.newData.data.length>0){

          let dataArray = this.newData.data;
          let newDataLength = dataArray.length;
          //先通过循环倒叙将新数添加到页面数组中去
          for(let index=newDataLength-1; index >= 0; index--){
            this.alwaysConstNumRecord.unshift(dataArray[index])
          }

          //若当前页面数据的数量大于10
          if(this.alwaysConstNumRecord.length>10){
            //删除第10项之后的数据，删除量为newData的长度
            this.alwaysConstNumRecord.splice(this.constNum,this.alwaysConstNumRecord.length-10)
          }
        }
      }
    },
    created:function(){
      //console.log(this.$route.query.buildingId)
     this.scanGetDetailInfo()
    },
    beforeDestroy:function(){
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="less" scoped>
  #currentPasserInfoDetial {
    .currentPasserInfoDetialAbstract{
      line-height:50px;
      font-size:14px;
      .fr{
        display:inline-block;
        floar:right;
        padding-right:15px;
        color:#5c6292;
      }
      .fl{
        display:inline-block;
        floar:left;
        text-indent:15px;
        i{
          color:#5c6292;
        }
      }
    }

  }
</style>
<style lang="less">
  #currentPasserInfoDetial {
    .el-input__inner{
      max-width:606px;
    }

  }
</style>

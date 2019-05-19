<template>
  <div class="buildingManager">
    <div >
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">写字楼管理</span>
      </div>
    </div>
    <div class="title clearfix">
      <div class="fl">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddBuilding">添加写字楼</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="allDelete">删除写字楼</el-button>
        <!--<a href="javascript:;" @click="toEditLink">编辑写字楼</a>-->
      </div>
      <div class="fr">
        <div class="w176 fl mr10">
          <el-select v-model="selectBuild" placeholder="选择楼盘" clearable>
            <el-option
              v-for="item,index in buildingList"
              :key="index"
              :label="item.buildingGroupName"
              :value="item.buildingGroupId">
            </el-option>
          </el-select>
        </div>
        <div class="fl w230 mr10">
          <el-input
            clearable
            placeholder="搜索写字楼"
            prefix-icon="el-icon-search"
            v-model="searchCont">
          </el-input>
        </div>
        <div class="fl">
          <el-button type="primary" @click="searchClick">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="table-cont pt20">
      <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" :empty-text=text> 
        <el-table-column type="selection" label="选择" width="55"></el-table-column>
        <el-table-column label="写字楼" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.buildingName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="写字楼层数" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.floorNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="房间数量" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.roomNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="detailsClick(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleSingalDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix pt20">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page.currentPageNum"
          layout="prev, pager, next"
          :page-count="page.pageTotal"
          :page-size="pages"
        >
        </el-pagination>
      </div>
      <div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span></div>
    </div>
    <!--详情弹窗-->
    <el-dialog
      title="写字楼详情"
      :visible.sync="detailsdialogVisible"
      width="1000px"
      :modal-append-to-body='false'
      center
    >
      <div class="inputstyle clearfix">
        <div class="editcont fl wsmall">
          <div class="edit-item clearfix">
            <div class="edittext fl">楼盘：</div>
            <div class="editinfo fl">{{detailsData.buildingGroupName}}</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">写字楼名称：</div>
            <div class="editinfo fl">{{detailsData.buildingName}}</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">写字楼面积：</div>
            <div class="editinfo fl">{{detailsData.areaSize}}㎡</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">地上层数：</div>
            <div class="editinfo fl">{{detailsData.overNum}}层</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">地下层数：</div>
            <div class="editinfo fl">{{detailsData.underNum}}层</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">楼层数：</div>
            <div class="editinfo fl">{{detailsData.floorNum}}层</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">房间数：</div>
            <div class="editinfo fl">{{detailsData.roomNum}}个</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">电梯数量：</div>
            <div class="editinfo fl">{{detailsData.elevator}}个</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">客梯数量：</div>
            <div class="editinfo fl">{{detailsData.customerElevator}}个</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">货梯数量：</div>
            <div class="editinfo fl">{{detailsData.goodsElevator}}个</div>
          </div>
        </div>
        <div class="editcont fr wbig">
          <div class="edit-item clearfix">
            <div class="edittext fl">写字楼描述：</div>
            <div class="editinfo fl">{{detailsData.info}}</div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">大厅图片：</div>
            <div class="editimgs fl">
              <img v-for="item in detailsData.hallPath" :src="item.url" alt="">
            </div>
          </div>
          <div class="edit-item clearfix">
            <div class="edittext fl">电梯布局：</div>
            <div class="editimgs fl">
              <!--<img v-for="item in detailsData.elePath" :src="gImgUrl+item.url" alt="">-->
              <img v-for="item in detailsData.elePath" :src="item.url" alt="">
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <a href="javascript:;" class="editBg" @click="detailsBtn"></a>
      </span>
    </el-dialog>
    <el-dialog
      title="确定要删除吗？"
      :visible.sync="dialogVisibleDelete"
      :modal-append-to-body='false'
      center
      width="500px">
      <p style="text-align: center;">
        <el-button type="primary" @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="danger" @click="handleDialogDeleteSubmit()">确定</el-button>
      </p>

    </el-dialog>
  </div>
</template>

<script>
    import getUrl from '@/assets/js/global'
    import gUrl from '@/assets/js/gUrl'
    import {$gPasserUrl} from '@/assets/js/gUrl'
    export default {
      name: "building-manager",
      data(){
          return {
          	text : '正在加载，请稍候',
            pages:30,
            buidId:'',//详情到编辑传的参数
            gImgUrl:'',//图片http地址
            detailsdialogVisible:false,//详情
            editdialogVisible:false,//编辑
            dialogVisibleDelete:false,//删除弹窗
            //分页相关属性
            page: {
              currentPageNum:1,//当前页码
              pageTotal:0,//总页码
              totalRecord:0,//总条数
              pageSize:30
            },
            selectBuild:'',//选择楼盘下拉列表 选中项
            buildingList:[],//选择楼盘下拉列表
            searchCont:'',//搜索输入的写字楼
            tableData:[],//table列表
            detailsData:{
              buildingGroupName:'',
              buildingName:'',
              areaSize:'',
              floorNum:'',
              overNum:'',
              underNum:'',
              roomNum:'',
              elevator:'',
              customerElevator:'',
              goodsElevator:'',
              info:'',
              hallPath:[],
              elePath:[]
            },//写字楼详情
            delIdList:[],
            importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
            upLoadData: {//图片上传参数
              file: '',
              type: 'company',
              objectId: 0
            },
            imageUrls:'',//放大 图片存放的地址
            dialogVisible:false,//图片放大
          }
      },

      created(){
        this.getBuildingGroup()//下拉框
        this.getBuildingList(1)//写字楼列表
      },
      beforeCreate(){
        getUrl().then(res => {
          this.gImgUrl=res.gImgUrl
        })
      },
      methods:{
        //详情到编辑页面
        detailsBtn(){
          this.$router.push({path:'./editBuilding',query:{'buidId':this.buidId}})
        },
        //搜索按钮
        searchClick(){
          this.getBuildingList(1)//写字楼列表
        },
        //获取楼盘 下拉框数据
        getBuildingGroup(){
          let shopId=this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
          this.$httpPasser.post('/newBuilding/getBuildingGroup',{
            shopId,//公司Id
          })
            .then(res=>{
              const data = res.data
              if (data.resultCode == '200') {
                this.buildingList=data.result
              }else{
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
        //获取写字楼列表
        getBuildingList(num){
          let shopId=this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
          this.$httpPasser.post('/newBuilding/getBuildingList',{
            shopId,//公司Id
            buildingGroupId:this.selectBuild,//楼盘Id
            name:this.searchCont,//写字楼名字
            pageIndex:num,
            pageSize:30,
          })
            .then(res=>{
              const data = res.data
              if (data.resultCode == '200') {
                this.$message({showClose: true, message: '查询成功', type: 'success'});
                this.tableData=data.result
                this.page.pageTotal = data.pageTotal;
                this.page.totalRecord =data.totalRecord;//总记录数
              }else if(data.resultCode == '204'){
              	this.text = '暂无数据'
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'success'});
                this.tableData=[]
                this.page.pageTotal = data.pageTotal;
                this.page.totalRecord =data.totalRecord;//总记录数
              } else{
              	this.text = '暂无数据'
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
        //设置分页
        handleCurrentChange(index){
          this.page.currentPageNum = index;
          this.getBuildingList(this.page.currentPageNum)//写字楼列表
        },
        //跳转到添加写字楼
        toAddBuilding(){
          this.$router.push('./addBuilding')
        },
        //详情
        detailsClick(index, row){
          // console.log(row)
          this.buidId=row.buildingId
          this.dataSwitch(row,()=>{
            this.detailsdialogVisible=true
          })
        },
        //详情和编辑的时候数据转换
        dataSwitch(row,callback){
          this.$httpPasser.post('/newBuilding/getBuildingInfo',{
            buildingId:row.buildingId
          })
            .then(res=>{
              const data = res.data
              if (data.resultCode == '200') {
                this.detailsData.buildingGroupName=data.result.buildingGroupName
                this.detailsData.buildingName=data.result.buildingName
                this.detailsData.areaSize=data.result.areaSize
                this.detailsData.floorNum=data.result.floorNum
                this.detailsData.overNum=data.result.overNum
                this.detailsData.underNum=data.result.underNum
                this.detailsData.roomNum=data.result.roomNum
                this.detailsData.elevator=data.result.elevator
                this.detailsData.customerElevator=data.result.customerElevator
                this.detailsData.goodsElevator=data.result.goodsElevator
                this.detailsData.info=data.result.info
                for(var i=0;i<data.result.hallPath.length;i++){
                  this.detailsData.hallPath[i]={"url":this.gImgUrl+data.result.hallPath[i]}
                }
                // console.log(this.detailsData.hallPath)
                for(var j=0;j<data.result.elePath.length;j++){
                  this.detailsData.elePath[j]={"url":this.gImgUrl+data.result.elePath[j]}
                }
                callback()
              }else{
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
        //编辑
        handleEdit(index, row){
          this.$router.push({path:'./editBuilding',query:{'buidId':row.buildingId}})
        },
        //单个删除按钮
        handleSingalDelete(index,row){
          this.delIdList = []
          this.dialogVisibleDelete=true
          this.delIdList.push(row.buildingId)
        },
        //删除事件
        deleteEnent(){
          let shopId=this.$local.sefetch('info')?this.$local.sefetch('info').companyId:''
          this.$httpPasser.post('/newBuilding/deleteBuilding',{
            shopId,//公司Id
            buildingId:this.delIdList
          })
            .then(res=>{
              const data = res.data
              if (data.resultCode == '200') {
                this.$message({showClose: true, message: '删除成功', type: 'success'});
                this.dialogVisibleDelete=false
                this.getBuildingList(this.page.currentPageNum)//写字楼列表
              }else{
                this.$message({showClose: true, message: data.resultCodeDesc, type: 'error'});
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
        //确定删除
        handleDialogDeleteSubmit(){
          this.deleteEnent()
        },
        //多个删除
        allDelete(){
          if(this.delIdList.length<1){
            this.$message({showClose: true, message: '请先选择要删除的写字楼', type: 'error'})
          }else{
            this.deleteEnent()
          }
        },
        //选取框时，写字楼ID加入数组
        handleSelectionChange(val) {
          this.delIdList = []
          for (let o in val) {
            this.delIdList.push(val[o].buildingId)
          }
        },

      }
    }
</script>

<style scoped lang="less">
.buildingManager{
  .title{
    .w176{
      width: 176px;
    }
    .w230{
      width: 230px;
    }
    .mr10{
      margin-right: 10px;
    }
  }
  .pt20{
    padding-top: 20px;
  }
  .lh35{
    line-height: 35px;
  }
  .wsmall{
    width: 400px;
  }
  .wbig{
    width: 540px;
  }
  .editcont{
    .edit-item{
      margin-bottom: 15px;
    }
    .edittext{
      width: 100px;
      text-align: right;
      font-size: 14px;
      line-height: 1.5;
    }
    .editinfo{
      width: 280px;
      margin-left: 20px;
      font-size: 14px;
      line-height: 1.5;
    }
    .editimgs img{
      width: 120px;
      height: 80px;
      margin-right: 10px;
    }
  }
  .edit-box{
    .wleft{
      width: 400px;
    }
    .wright{
      width: 540px;
    }
    .item{
      margin-bottom: 10px;
    }
    .iten-text{
      width: 100px;
      margin-right: 10px;
      text-align: right;
      line-height: 40px;
    }
    .company{
      line-height: 40px;
    }
    .w280{
      width: 250px;
    }
    .width280{
      width: 320px;
    }
    .imgbox{
      margin-left: 120px;
    }
    .company{
      line-height: 40px;
      font-size: 14px;
      margin-left: 5px;
    }
  }
  .editBg{
    display:inline-block;
    width: 114px;
    height: 30px;
    background: url("../../../../../assets/images/public/editbg.png") left top no-repeat;
  }
  .lh40{line-height: 40px;}
}
</style>

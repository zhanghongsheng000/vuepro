<template>
  <div class="buildingManager">
    <div >
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">楼盘管理</span>
      </div>
    </div>
    <div class="title clearfix">
      <div class="fl">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddBuildingGroup">添加楼盘</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleBuildingGroupDelete">删除楼盘</el-button>
      </div>
      <div class="fr">
        <div class="fl w230 mr10">
          <el-input
            placeholder="搜索写字楼"
            prefix-icon="el-icon-search"
            v-model="buildingGroupSearchParams.buildingGroupName" clearable>
          </el-input>
        </div>
        <div class="fl">
          <el-button type="primary" @click="searchBuildingGroup">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="table-cont pt20">
      <el-table :data="buildingGroupList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" label="选择" width="55"></el-table-column>
        <el-table-column label="楼盘" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="写字楼数量" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.buildingNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleBuildingGroupDetails(scope.$index, scope.row)">详情
            </el-button>
            <el-button size="mini" @click="handleBuildingGroupEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleBuildingGroupDelete(scope.$index, scope.row,true)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="楼盘详情"
      :visible.sync="dialogVisibleBuildingDetails"
      width="52%">
      <buildingGroupDetals v-if="hackReset" :buildingGroupId="detialsBuildingGroupId"></buildingGroupDetals>
      <span slot="footer" class="dialog-footer">
   <!-- <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
    <div class="clearfix pt20">
      <div class="fl">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page.currentPageNum"
          layout="prev, pager, next"
          :page-count="page.pageTotal">
        </el-pagination>
      </div>
      <div class="fl lh35"><span>共{{this.page.pageTotal}}页，当前第{{this.page.currentPageNum}}页，每页30条，共{{this.page.totalRecord}}条</span>
      </div>
    </div>
  </div>
</template>

<script>
  import buildingGroupDetals from './buildingGroupDetials'
  export default {
    name: "building-manager",
    data() {
      return {
        shopId:this.$local.sefetch('info').companyId,
        //分页相关属性
        page: {
          currentPageNum: 1,//当前页码
          pageTotal: 0,//总页码
          totalRecord: 0//总条数
        },
        buildingGroupList: [
        ],
        buildingGroupSearchParams: {
          shopId: this.$local.sefetch('info').companyId,
          buildingGroupName: '',
          pageSize: 30,
          pageIndex: 1
        },
        buildingGroupDeleteIds:[],
        dialogVisibleBuildingDetails:false,
        //强制刷新选择房间组件
        hackReset: false,
        detialsBuildingGroupId:''
      }
    },
    components:{buildingGroupDetals},
    methods: {
      //设置分页
      handleCurrentChange(index) {
        this.page.currentPageNum = index;
        this.buildingGroupSearchParams.pageIndex=index
        this.searchBuildingGroup(index)//写字楼列表
      },
      //强制刷新组件
      refleshRoomComponent() {
        //强制刷新组件
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      //跳转到添加写字楼
      toAddBuildingGroup() {
        this.$router.push('./addBuildingGroup')
      },
      //条件搜索楼盘
      searchBuildingGroup() {
        this._httpPasser(
          'buildingGroup/getGroupList',
          'get',
          this.buildingGroupSearchParams,
          (data)=>{
            this.page.pageTotal = data.pageTotal;
            this.page.totalRecord =data.totalRecord;//总记录数
            this.buildingGroupList = data.result;
          },
          true,
          ()=>{
            this.buildingGroupList = [];
          }
        )
      },
      handleSelectionChange(selection){
        this.buildingGroupDeleteIds = [];
        for(let o in selection){
          this.buildingGroupDeleteIds.push(selection[o].building_group_id)
        }
      },
      //弹出楼盘详情页面
      handleBuildingGroupDetails(index,row) {
        this.detialsBuildingGroupId = row.building_group_id;
        this.refleshRoomComponent()
        this.dialogVisibleBuildingDetails = true;

      },
      //进入楼盘编辑页面
      handleBuildingGroupEdit(index,row) {
        this.$router.push({path:'editBuildingGroup',query:{'buildingGroupId':row.building_group_id}})
      },
      //删除楼盘
      handleBuildingGroupDelete(index,row,isSignal) {
        if(isSignal){
          this.buildingGroupDeleteIds = [];
          this.buildingGroupDeleteIds.push(row.building_group_id)
        }
        if(this.buildingGroupDeleteIds.length==0){
          this.$message.error('请选择至少一个楼盘')
        }
        else{
          this._httpPasser(
            'buildingGroup/deleteBatchGroup',
            'post',
            {
              shopId:this.shopId,
              buildingGroupId:this.buildingGroupDeleteIds,
            },

            (data)=>{
              this.$message.success(data.resultCodeDesc)
              this.searchBuildingGroup();
            }
          )
        }
      },
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
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
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if (callback204) {
                  callback204()
                }
              }
              else {
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

      }
    },
    created(){
      this.searchBuildingGroup();
    }
  }
</script>

<style scoped lang="less">
  .buildingManager {
    .title {
      .w176 {
        width: 176px;
      }
      .w230 {
        width: 230px;
      }
      .mr10 {
        margin-right: 10px;
      }
    }
    .pt20 {
      padding-top: 20px;
    }
    .lh35 {
      line-height: 35px;
    }
  }
</style>

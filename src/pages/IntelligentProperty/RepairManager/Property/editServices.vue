<template>
  <div id="servicesEdit">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">服务项修改</span>
      </div>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">名称</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceDetail.serviceItemName" placeholder="请输入服务名称"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">计量单位</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceDetail.serviceItemUnit" placeholder="请输入计量单位"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">单价（元）</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceDetail.serviceItemPrice" placeholder="请输入单价"  clearable></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">物料分类</div>
          <div class="item-ipt fl">
            <el-button type="primary" @click="showAddServices">编辑物料</el-button>
          </div>
        </div>
        <div class="items clearfix" v-if="this.treeChoseNodes.length>0">
          <div class="item-text fl" style="height:40px;"></div>
          <div class="item-ipt fl">
            <el-tag
              v-for="tag in treeChoseNodes"
              :key="tag.materielName"
              closable
              color="#ffffff"
              @close="deleteMaterail(tag)"
              type="danger">
              {{tag.materielName}}
            </el-tag>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">图片</div>
          <div class="item-ipt fl" id="addrent">
            <el-upload
              ref="uploads1"
              class="avatar-uploader"
              :action="importFileUrl"
              :data="upLoadData"
              :show-file-list="false"
              :on-success="uploadSuccessgs"
              :before-upload="beforeAvatarUpload">
              <img v-if="typeof serviceDetail.serviceItemImgPath=='string'&&serviceDetail.serviceItemImgPath!=''" :src="gImgUrl+serviceDetail.serviceItemImgPath" class="avatar">
              <img v-else-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">备注</div>
          <div class="item-ipt fl">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="serviceDetail.serviceItemRemark"  clearable>
            </el-input>
          </div>
        </div>
        <div class="items">
          <div class="item-text pl50">
            <el-button type="primary" @click="submitClick">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择物料分类" :visible.sync="servicesAddDialog" width="500px" @open="setTreeData">
      <el-tree
        :data="treeData"
        show-checkbox
        ref="tree"
        highlight-current
        :check-strictly="false"
        node-key="materielId"
        :props="treeProps"
        @check-change="handleCheckChange">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="treeDialogCancel">取 消</el-button>
        <el-button type="primary" @click="treeDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import getUrl from '@/assets/js/global'

  export default {
    name: "servicesEdit",
    data() {
      return {
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userName : '',
        importFileUrl: $gPasserUrl + 'upload/singleUpload', //图片上传接口地址
        serviceItemId:this.$route.query.service.serviceItemId,
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
        imageUrl: '',//上传插件的本地图片
        gImgUrl:'',//网络图片前缀
        serviceDetail: {
          serviceItemId: '',
          shopId: '',
          serviceItemName: '',
          serviceItemUnit: '',
          serviceItemPrice: '',
          serviceItemImgPath: '',
          serviceItemRemark: '',
          status: '',
          createTime: '',
          materielIds: [
          ]
        },
        //强制刷新选择房间组件
        hackReset: false,
        roomList:[],
        buildingId:'',
        //树的别名
        treeProps: {
          children: 'repairMaterielList',
          label: 'materielName',
          id:'materielId'
        },
        //物料数的原始字典数据
        treeData: [
        ],
        //物料树的已选ID
        treeChoseKeys: [],
        //操作状态下的临时物料树已选ID
        tempTreeChoseKeys: [],
        //操作状态下的临时物料树已选的node
        tempTreeChoseNodes: [],
        //用于显示的已选物料
        treeChoseNodes: [],
        //选择物料对话框
        servicesAddDialog:false
      }
    },
    components: {

    },
    created() {
      //获取物料
      this.getAllCategroy()
      getUrl().then(res => {
        this.gImgUrl = res.gImgUrl
      })
    },
    computed: {},
    methods: {
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          this.serviceDetail.serviceItemImgPath = response.result
        } else {
          this.$message({
            showClose: true,
            message: data.result,
            type: 'error'
          });
        }
      },
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
        if(!isLt10M){
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return (isJPG || isPNG) && isLt10M;
      },
      showAddServices(){
        this.servicesAddDialog = true;
      },
      /*
      * 树相关
      * */
      //获取选中的key的数组
      //参数isLeaf为是否只获取子节点。默认为false。
      getTreeKeys(isLeaf) {
        if(isLeaf==undefined){
          isLeaf=false;
        }
        for(let o in this.serviceDetail.materielIds){
          this.treeChoseKeys.push(this.serviceDetail.materielIds[o])
        }
        this.traversalObj(this.treeData, (obj) => {
          for(let o in this.serviceDetail.materielIds){
            if(this.serviceDetail.materielIds[o]==obj.materielId){
              this.treeChoseNodes.push(obj)
            }
          }
        },isLeaf)
      },
      //遍历多层对象。第一个参数为对象。第二个参数为获取截点后的操作.doSomething会有一个参数，是节点
      //第三个参数为是否只对子节点进行操作，默认为false
      traversalObj(obj, doSomething,isLeaf) {
        if(isLeaf==undefined){
          isLeaf==false;
        }
        if(!isLeaf){
          for (let o in obj) {
            doSomething(obj[o])
            if (obj[o].repairMaterielList && obj[o].repairMaterielList.length > 0) {
              this.traversalObj(obj[o].repairMaterielList, doSomething,isLeaf)
            }
          }
        }
        else{
          for (let o in obj) {
            if (obj[o].repairMaterielList && obj[o].repairMaterielList.length > 0) {
              this.traversalObj(obj[o].repairMaterielList, doSomething,isLeaf)
            }
            else{
              doSomething(obj[o])
            }
          }
        }

      },
      //树选择回调
      handleCheckChange(data, checked, indeterminate) {
        //console.log(data, checked, indeterminate);
        this.tempTreeChoseKeys = this.$refs.tree.getCheckedKeys(true);
        this.tempTreeChoseNodes = this.$refs.tree.getCheckedNodes(true)
      },
      //对话框取消关闭
      treeDialogCancel(){
        this.tempTreeChoseKeys = [];
        this.tempTreeChoseNodes = [];
        this.servicesAddDialog = false;
      },
      //对话框确定关闭
      treeDialogConfirm(){
        this.treeChoseKeys = JSON.parse(JSON.stringify(this.tempTreeChoseKeys));
        this.treeChoseNodes = JSON.parse(JSON.stringify(this.tempTreeChoseNodes));
        this.serviceDetail.materielIds = [];
        for(let o in this.treeChoseKeys){
          this.serviceDetail.materielIds.push(this.treeChoseKeys[o])
        }
        this.servicesAddDialog = false;
      },
      //对话框打开时，设置树的数据
      setTreeData() {
        this.$nextTick(()=>{
          this.$refs.tree.setCheckedKeys(this.treeChoseKeys);
        })

      },
      //删除已选择的物料
      deleteMaterail(tag) {
        for (let o in this.treeChoseNodes) {
          if (this.treeChoseNodes[o].materielId == tag.materielId) {
            this.treeChoseNodes.splice(o, 1);
          }
        }
        for(let p in this.treeChoseKeys){
          if(this.treeChoseKeys[p]==tag.materielId){
            this.treeChoseKeys.splice(p,1);
          }
        }
        this.serviceDetail.materielIds = [];
        for(let c in this.treeChoseKeys){
          this.serviceDetail.materielIds[c] = this.treeChoseKeys[c]
        }
      },
      /*
      * 接口类的方法
      * */
      //获取物料分类
      getAllCategroy(){
        this.$httpPasser.post(
          'materiel/getAllCategroy',
          {shopId:this.companyId}
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.treeData = res.data.result;
            //获取物料详情。之所以写到这个回调中，是因为需要有了物料字典，才能显示服务项所关联的物料的名称
            this.getDetail()
          }
          else{
            this.treeData = []
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      },
      //获取物料详情
      getDetail(){
        this.$httpPasser.post(
          'serviceitem/getDetail',
          {
            shopId:this.companyId,
            serviceItemId:this.serviceItemId
          }
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.serviceDetail = res.data.result;
            //根据服务项详情，设置显示已选物料类别
            this.getTreeKeys(false)
          }
          else{
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      },
      //提交
      submitClick() {
        if (this.serviceDetail.serviceItemName == '') {
          this.$message({showClose: true, message: '请填写服务项名称', type: 'error'})
        } else if (this.serviceDetail.serviceItemUnit == '') {
          this.$message({showClose: true, message: '请填写服务项计量单位', type: 'error'})
        } /*else if (!/^0?1[3456789]\d{9}$/.test(this.contactsPhone)) {
          this.$message({showClose: true, message: '业务联系人电话号码格式错误', type: 'error'});
        }*/ else {
          this.serviceDetail.shopId = this.companyId;
          this.serviceDetail.customerUserId = this.customerUserId;
          if(this.serviceDetail.materielIds.length==0){
            delete(this.serviceDetail.materielIds)
          }
          delete(this.serviceDetail.createTime)
          delete(this.serviceDetail.status)
          //this.serviceDetail.materielIds = JSON.stringify(this.serviceDetail.materielIds)
          this.$httpPasser.post(
            'serviceitem/save',
            this.serviceDetail
          ).then((res) => {
            if (res.data.resultCode == 200) {
              this.$message.success(res.data.resultCodeDesc)
             /* for(let o in this.serviceDetail){
                this.serviceDetail[o]= '';
              }
              this.serviceDetail.shopId = this.companyId;
              this.serviceDetail.customerUserId = this.customerUserId;
              this.treeChoseNodes = [];
              this.$refs.uploads1.clearFiles();*/
            }
            else {
              this.$message.error(re.data.resultCodeDesc)
            }
          }).catch(
            () => {
              this.$message.error(re.data.resultCodeDesc)
            }
          )
        }
      },
    }
  }
</script>

<style scoped lang="less">
  #servicesEdit {
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        line-height: 40px;
        width: 140px;
        font-size: 14px;
      }
    }
    .font14 {
      font-size: 14px;
      margin-bottom: 20px;
      color: red;
    }
    .pl50 {
      padding-left: 150px;
    }
    .layers {
      padding-top: 30px;
      .plr20 {
        padding: 0 20px;
        margin-right: 10px;
      }
      .floorbtn {
        cursor: pointer;
        border: solid 1px #dcdfe6;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #606266;
        padding: 12px 20px;
        font-size: 14px;
        line-height: 1;
        border-radius: 4px;
        display: inline-block;
      }
      .floorbtn.active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        background-color: #ecf5ff;
      }
    }
    .floorbtn.active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      background-color: #ecf5ff;
    }
  }
</style>
<style lang="less">
  #servicesEdit{
    #addrent, #addrent2, #addrent3 {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 135px;
        height: 95px;
        line-height: 95px;
        text-align: center;
      }
      .avatar {
        width: 135px;
        height: 95px;
        display: block;
      }
    }
    .el-tag {
      margin-right: 10px;
    }
    .el-tree-node__content {
      height: 38px !important;
    }
  }

</style>

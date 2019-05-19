<template>
  <div id="servicesAdd">
    <div style="padding-top:20px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">服务项添加</span>
      </div>
    </div>
    <div class="reg-right-cont ">
      <div class="form-item fl">
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">名称</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceItemName" placeholder="请输入服务项名称"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text beforesiteml fl">计量单位</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceItemUnit" placeholder="请输入计量单位"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">单价（元）</div>
          <div class="item-ipt fl">
            <el-input v-model.trim="serviceItemPrice" placeholder="请输入单价"></el-input>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">物料分类</div>
          <div class="item-ipt fl">
            <el-button type="primary" @click="showAddServices">选择</el-button>
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
              :beforeUpload="beforeAvatarUpload"
              :on-success="uploadSuccessgs"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="items clearfix">
          <div class="item-text fl">备注</div>
          <div class="item-ipt fl" style="width: 202px;">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="serviceItemRemark">
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
      <!--<el-tree
        :data="treeData"
        show-checkbox
        ref="tree"
        highlight-current
        :check-strictly="false"
        node-key="id"
        @check-change="handleCheckChange">
        <div slot-scope="{ node, data}">
          <span v-if="data.children===null">
            {{data.label}}
            <el-tag
              v-for="tag in data.repairMaterielList" :key="tag.materielName">
              {{tag.materielName}}
            </el-tag>
          </span>
          <span v-if="data.children!==null">
            {{data.label}}
          </span>
        </div>

      </el-tree>-->
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
  import gUrl from '@/assets/js/gUrl'
  import buildingCascader from '@/components/public/buildingCascader'
  import choseRoomFromMuiltyFloorByBuilding from '@/components/public/choseRoomFromMuiltyFloorByBuilding'

  export default {
    name: "servicesAdd",
    data() {
      return {
        companyId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        customerUserId: this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        serviceItemName: '',//服务项名称
        serviceItemUnit: '',//服务项单位
        materielIds: '',//物料分类Ids
        serviceItemId: '',//服务项编号(这个在哪里获取)
        serviceItemPrice: "",//服务项单价
        serviceItemRemark: '',//服务项备注
        dialogVisibleAddress: false,
        servicesAddDialog: false,
        importFileUrl: gUrl + 'upload/singleUpload', //图片上传接口地址
        upLoadData: {
          file: '',
          type: 'company',
          objectId: 0
        }, //图片上传参数
        imageUrl: '',//服务项图片
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        //物料数的原始字典数据
        treeData: [
          {
            "materielId": 1,
            "shopId": 13579,
            "materielParentId": 0,
            "materielName": "灯具",
            "materielUnit": null,
            "materielPrice": null,
            "materielRemark": null,
            "materielImgPath": null,
            "isType": "Y",
            "repairMaterielList": []
          },
          {
            "materielId": 2,
            "shopId": 13579,
            "materielParentId": 0,
            "materielName": "墙面",
            "materielUnit": null,
            "materielPrice": null,
            "materielRemark": null,
            "materielImgPath": null,
            "isType": "Y",
            "repairMaterielList": []
          }
        ],
        //树的别名
        treeProps: {
          children: 'repairMaterielList',
          label: 'materielName',
          id:'materielId'
        },
        //物料树的已选ID
        treeChoseKeys: [],
        //操作状态下的临时物料树已选ID
        tempTreeChoseKeys: [],
        //操作状态下的临时物料树已选的node
        tempTreeChoseNodes: [],
        //用于显示的已选物料
        treeChoseNodes: [],
      }
    },
    created() {
      this.getAllCategroy()
    },
    mounted() {
    },
    methods: {
      uploadSuccessgs(response, file, fileList) { //图片上传成功之后的函数
        if (response.resultCode == '200') {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          this.htimageUrl = response.result
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
        if (!isJPG && !isPNG) {
          this.$message({
            showClose: true,
            message: '上传照片必须是JPG/PNG格式!',
            type: 'error'
          });
        }
        if (!isLt10M) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 10MB!',
            type: 'error'
          })
        }
        return (isJPG || isPNG) && isLt10M;
      },
      showAddServices() {
        this.servicesAddDialog = true;
      },
      /*
      * 树相关
      * */
      //树选择回调
      handleCheckChange(data, checked, indeterminate) {
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
        this.servicesAddDialog = false;
        console.log('选择树',this.treeChoseKeys)
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
        for(let o in this.treeChoseKeys){
          if(this.treeChoseKeys[o]==tag.materielId){
            this.treeChoseKeys.splice(o,1);
          }
        }
        console.log('编辑后的已选节点',this.treeChoseKeys)
      },
      //提交服务项
      submitClick() {
        this.serviceitemAdd()
      },
      /*
      * 接口类方法
      * */
      serviceitemAdd() {
        if (this.shopId == '') {
          this.$message({showClose: true, message: '公司ID不能为空', type: 'error'})
        } else if (this.customerUserId == '') {
          this.$message({showClose: true, message: '用户ID不能为空', type: 'error'})
        } else if (this.serviceItemName == '') {
          this.$message({showClose: true, message: '请填写服务项名称', type: 'error'})
        } else if (this.serviceItemUnit == '') {
          this.$message({showClose: true, message: '请填写服务项计量单位', type: 'error'})
        } /*else if (!/^0?1[3456789]\d{9}$/.test(this.contactsPhone)) {
          this.$message({showClose: true, message: '业务联系人电话号码格式错误', type: 'error'});
        }*/ else {
          this.$httpPasser.post('serviceitem/save', {
            shopId:this.companyId,
            customerUserId: this.customerUserId,
            serviceItemName: this.serviceItemName,
            serviceItemUnit: this.serviceItemUnit,
            materielIds: this.treeChoseKeys,
            serviceItemId: this.serviceItemId,
            serviceItemRemark: this.serviceItemRemark,
            serviceItemPrice:this.serviceItemPrice,
            serviceItemImgPath:this.htimageUrl
          }).then(re => {
            if (re.data.resultCode == 200) {
              this.$message.success('添加成功')
              this.serviceItemName = ''//联系人姓名
              this.serviceItemUnit = ''//
              this.materielIds = ''
              this.serviceItemId = ''//联系人电话
              this.serviceItemRemark = ''
              this.serviceItemPrice = ''
              this.serviceItemImgPath = ''
              this.imageUrl = ''
              this.htimageUrl = ''
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
      //获取物料分类
      getAllCategroy(){
        this.$httpPasser.post(
          'materiel/getAllCategroy',
          {shopId:this.companyId}
        ).then((res)=>{
          if(res.data.resultCode==200){
            this.treeData = res.data.result;
          }
          else{
            this.treeData = []
            this.$message.error(res.data.resultCodeDesc)
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      }
    },
    computed: {
      treeShowData: () => {
        return this.treeData;
      }
    }
  }
</script>

<style scoped lang="less">
  #servicesAdd {
    .reg-right-cont {
      padding-left: 50px;
      padding-top: 30px;
    }
    .items {
      margin-bottom: 10px;
      .item-text {
        line-height: 40px;
        width: 120px;
        font-size: 14px;
        text-align: right;
        margin-right: 20px;
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
  #servicesAdd {
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

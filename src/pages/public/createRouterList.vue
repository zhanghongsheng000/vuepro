<template>
  <div class="transferDiv" id="leftNav">
    <!-- <tree-transfer :title="title" :defaultCheckedKeys=defaultCheckedKeys :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"     @addBtn='add' @removeBtn='remove' :mode='mode' height='540px'  filter openAll>
     </tree-transfer>-->
    <!-- <el-tree
       :data="routerTree"
       show-checkbox
       node-key="id"
       default-expand-all
       :expand-on-click-node="false">
       <span class="custom-tree-node" slot-scope="{ node, data }">
         <span>{{ node.label }}</span>
         <span>
           <el-button
             type="text"
             size="mini"
             @click="() => append(data)">
             Append
           </el-button>
           <el-button
             type="text"
             size="mini"
             @click="() => remove(node, data)">
             Delete
           </el-button>
         </span>
       </span>
     </el-tree>-->


    <el-tree
      :data="routerTree"
      show-checkbox
      ref="tree"
      highlight-current
      node-key="id">
    </el-tree>
    <el-button @click="getCheckedKeys">获取节点</el-button>
    <!-- :default-checked-keys="[5]"
    :props="defaultProps"
     :default-expanded-keys="[2, 3]"-->


    <!--<el-menu
      background-color="#3487fa"
      text-color="#ffffff"
      class="el-menu-demo"
      mode="vertical"
      menu-trigger="click"
      active-text-color="#ffffff"
      :unique-opened=true
      :router=true
      @open="handleOpen">
      <el-menu-item index="/CommonCompany" id="index"><span class="nav_returnIndex"></span>首页</el-menu-item>
      <span v-for="item,index in routerTree" :key="index">
        <el-submenu v-if="item.children" :index="item.url">
          <template slot="title">{{item.name}}</template>
           <span v-for="sonItem,sonIndex in item.children" :key="sonIndex">
              <el-submenu v-if="sonItem.children" :index="sonItem.url">
                <template slot="title">{{sonItem.name}}</template>
                <el-menu-item v-for="sonsItem,sonsIndex in sonItem.children" :key="sonsIndex" :index="sonsItem.url">{{sonsItem.name}}</el-menu-item>
                &lt;!&ndash;<el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyImportingEmployees')">导入员工</el-menu-item>&ndash;&gt;
              </el-submenu>
              <el-menu-item v-else :index="sonItem.url">{{sonItem.name}}</el-menu-item>
            </span>
        </el-submenu>
        <el-menu-item v-else :index="item.url">{{item.name}}</el-menu-item>
      </span>
    </el-menu>-->
  </div>
</template>

<script>
  /*import treeTransfer from 'el-tree-transfer' // 引入*/
  import treeTransfer from '@/components/public/transfer-tree'
  export default {
    name: "create-router-list",
    components:{
      treeTransfer
    },
    data() {
      return {
        routerTree:[],
        //左侧树过滤数组
        leftTreeFilter:[
          '/CommonCompany/CommonCompanyManager',
          '/CommonCompany/CommonCompanyManager/CommonCompanyDepartmentManager',
          '/CommonCompany/CommonCompanyManager/CommonCompanyPositionManager',
          '/CommonCompany/CommonCompanyManager/CommonCompanyEmployeeManager',
          '/CommonCompany/CommonCompanyManager/AttendanceManager',
          '/CommonCompany/CommonCompanyProduct',
          '/CommonCompany/CommonCompanyProduct/Zjyf',
          '/CommonCompany/CommonCompanyProduct/SalaryManager',
          '/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer',
          '/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer',
          '/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer',
          '/CommonCompany/CommonCompanyProduct/IntelligentProperty/PaymentProperty',
          '/CommonCompany/accountsManage',
          '/CommonCompany/CommonCompanyNotice',
          '/CommonCompany/CommonCompanyCenter',
          '/CommonCompany/CommonCompanyCenter/CommonCompanyInfo',
          '/CommonCompany/CommonCompanyCenter/CommonCompanyInfoSet',
          '/CommonCompany/CommonCompanyCenter/CommonCompanyModifyPassword',
          '/CommonCompany/CommonCompanyPropertyInfo',
          '/PropertyCompany/HouseManager',
          '/PropertyCompany/HouseManager/myBuildingList',
          '/PropertyCompany/HouseManager/buildingGroupManager',
          '/PropertyCompany/HouseManager/importBuildingGroup',
          '/PropertyCompany/CustomerManager',
          '/PropertyCompany/CustomerManager/RenterManager',
          '/PropertyCompany/CustomerManager/LandlordManager',
          '/PropertyCompany/CustomerManager/importRenterAndBuildingGroup',
          '/PropertyCompany/PropertyManageSystem',
          '/PropertyCompany/PropertyManageSystem/IntelligentProperty/Passer',
          '/PropertyCompany/PropertyManageSystem/IntelligentProperty/PaymentProperty',
          '/PropertyCompany/PropertyManageSystem/Breakfast',
          '/PropertyCompany/accountsManage',
          '/PropertyCompany/PropertyCompanyManager',
          '/PropertyCompany/PropertyCompanyManager/companyInfo',
          '/PropertyCompany/PropertyCompanyManager/departmentManager',
          '/PropertyCompany/PropertyCompanyManager/positionManager',
          '/PropertyCompany/PropertyCompanyManager/PropertyCompanyEmployeeManager',
          '/PropertyCompany/PropertyCompanyManager/accountSett',
          '/PropertyCompany/PropertyCompanyManager/modifyPassword',
          '/PropertyCompany/Mnangement',
          '/PropertyCompany/ThirdPartyBusiness',
          '/PropertyCompany/ShareProfit',
          '/PropertyCompany/StatisticalAnalysis',
        ]
      }
    },
    methods: {
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      //从原始路由表中整理路由数据。理论上来说只会用到一次。但是可以保存出来。
      recursiveCreateRouter(beginId,parentId,parentUrl,routerList) {
        let re = [];
        for (let i = 0; i < routerList.length; i++) {
          let temp = {}
          if(routerList[i].path[0]=='/'){
            temp.url = parentUrl+routerList[i].path;
          }
          else{
            temp.url = parentUrl+'/'+routerList[i].path;
          }
          temp.parentId = parentId;
          //设置本身ID
          if(beginId!=''){
            temp.id = parseInt(beginId) + parseInt(i)
          }
          //设置本身ID
          else if(parentId!=''){
            temp.id = parentId+'_'+i;
          }
          else{
            temp.id=i;
          }
          temp.name = routerList[i].meta ? routerList[i].meta.title : routerList[i].name
          temp.label = temp.name;
          //是否显示默认设置为Y
          temp.isShow = 'Y';
          //是否左侧树默认设置为'N'
          if(this.leftTreeFilter.indexOf(temp.label)!=-1){
            temp.isLeftTree = 'Y'
          }
          else{
            temp.isLeftTree = 'N';
          }

          //获取文件路径
          //非懒加载的路由，直接能够获取文件，替换字符即可
          if(routerList[i].component['__file']){
            temp.filePath = routerList[i].component['__file']
            temp.filePath = temp.filePath.replace(/\\/g,'/')
            temp.filePath = temp.filePath.replace(/src\//g,'@')
          }
          else{
            //当路由中的文件路径是懒加载时，temp.component就是一个promise函数体了，这时候就需要用正则表达式从函数体中将路径取出来
            var componentString = routerList[i].component.toString();
            var pathREX_1 = /__webpack_require__.bind\(null, \"(.*)\"\)\)/
            var pathREX_2 = /\[__webpack_require__\("(.*)\"\)\]/
            if(componentString.match('__webpack_require__.bind')){
              temp.filePath = pathREX_1.exec(routerList[i].component.toString())[1]
            }
            else{
              temp.filePath = pathREX_2.exec(routerList[i].component.toString())[1]
            }
            temp.filePath = temp.filePath.replace(/.\/src\//g,'@')
          }
          if(routerList[i].redirect){
            temp.redirect = routerList[i].redirect
          }
          else{
            temp.redirect = ''
          }
          if (routerList[i].children) {
            temp.children = this.recursiveCreateRouter('',temp.id,temp.url,routerList[i].children)
          }
          re.push(temp)
        }
        return re;
      },
      //遍历多层对象。第一个参数为对象。第二个参数为获取截点后的操作.doSomething会有一个参数，是截点
      traversalObj(obj,doSomething){
        for(let o in obj){
          doSomething(obj[o])
          if(obj[o].children && obj[o].children.length>0){
            this.traversalObj(obj[o].children,doSomething)
          }
        }
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    },
    mounted() {
      //let routerList = this.$store.state.allRouterList;
      let routerList = this.$router.options.routes

      /*
      * 将原始的路由生成SQL
      * */
      this.routerTree = this.recursiveCreateRouter(0,'','',routerList)
      let objStringArray = []
      this.traversalObj(this.routerTree,(obj)=>{
        objStringArray.push(obj)
      })
      //遍历对象，为他们添加自增长SQLID
      for(let i=0;i<objStringArray.length;i++){
        objStringArray[i].sqlId = 423+parseInt(i);
      }
      //再次遍历对象，根据parentId来获取父级的SQLID作为parentSqlId
      for(let p=0;p<objStringArray.length;p++){
        objStringArray[p].parentSqlId = 0;
        if(objStringArray[p].parentId!=''){
          for(let m=0;m<objStringArray.length;m++){
            if(objStringArray[m].id==objStringArray[p].parentId){
              objStringArray[p].parentSqlId = objStringArray[m].sqlId;
            }
          }
        }
      }
      let sql = ""
      //获取当前日期
      let currentDay = this.$local.getDay('yyyy-MM-dd')
      //获取当前时分秒
      let currentTime = new Date().toString().split(' ')[4]
      //当前时间字符串
      let currentTimeString = currentDay+' '+currentTime
      //生成SQL
      for(let s=0;s<objStringArray.length;s++){
        let temp = "INSERT INTO `customer_permission` VALUES ('"+objStringArray[s].sqlId+"', '"+objStringArray[s].url+"', '"+objStringArray[s].name+"', '"+objStringArray[s].parentSqlId+"', '"+objStringArray[s].isShow+"', '0','0','"+currentTimeString+"','"+objStringArray[s].isLeftTree+"','"+objStringArray[s].filePath+"','"+objStringArray[s].redirect+"');\n"
        sql+=temp;
      }
      console.log('sql',sql)

      this.$local._httpPasser(
        this.$httpPasser,
        'permission/getMenuList',
        'get',
        {
          customerUserId:this.$local.sefetch('info').userId,
          parentId:0,
          isShowAll:'Y'
        },
        function(re){
          console.log('hah',re)
        }
      )


      //let temp =
      console.log('ccc',objStringArray)
      console.log('aaa',this.$local.changeMeauDataStructure(objStringArray,0))
    }
  }
</script>

<style scoped lang="less">
  .transferDiv{
    width:200px;
  }
  .leftNav{
    width:151px;
    float:left;
  }
</style>
<style lang="less">
  /*修改组件样式，所以放到全局中*/
  #leftNav{
    margin-top:10px;
    width:220px;
    background-color: #1168e1;
    .el-submenu .el-menu-item{
      min-width:100px;
    }
    .el-menu--horizontal {
      /*background-color: #515e93;*/
    }
    .el-menu-item, .el-submenu__title{
      height:45px;
      line-height:45px;
    }
    .el-menu--horizontal{
      border-bottom:none;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
      background-color:#3487fa;
    }
    a:visited{
      color:white;
    }
    .el-menu-item{
      padding:0px 5px;
    }
    /*风格颜色部分*/
    /*被选中菜单的颜色*/
    .el-menu-item .is-active{
      background-color: #ffffff!important;
      color:#1168e1!important;
    }
    .el-submenu__title i{
      color:#fff;
    }
    ul[role='menubar']>li,ul[role='menubar']>span>li{
      font-size:16px;
      background-color:#1168e1!important;
      border-bottom:solid #ffffff 1px;
    }
    ul[role='menubar']>li,ul[role='menubar']>span>li>div,ul[role='menu']>span>li>div{
      font-size:16px;
      background-color:#1168e1!important;
    }
    ul[role='menu']>span>li>div{
      font-size:14px;
      background-color:#1168e1!important;
      border-bottom:solid #3487fa 1px;
    }
    ul[role='menu']>span>li{
      font-size: 14px;
      color: #ffffff!important;
      background-color: #3b7df1!important;
      border-bottom: solid 1px #fff;
    }
    ul[role='menu']>span:last-child>li{
      border-bottom: none;
    }
    ul[role='menu']>span>li>ul[role='menu']>span>li{
      font-size:14px;
      color:#bfd4fd!important;
      background-color:#3487fa!important;
    }
    ul[role='menu']>span>li:hover{
      background-color:#e8eaff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    ul[role='menu']>span>li>ul[role='menu']>span>li:hover{
      background-color: #e8eaff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*一级菜单选中效果*/
    ul[role='menubar']>span>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
    /*二级菜单选中效果*/
    ul[role='menu']>span>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
    }
    /*三级菜单选中效果*/
    ul[role='menu']>span>li>ul[role='menu']>span>li.is-active{
      background-color:#fff!important;
      color:#1168e1!important;
      box-shadow: 0px 0px 13px 2px #888888;
    }
  }
  /*  #index{
      background: linear-gradient(#86b7fc,#3b8bfa);
      height:55px;
      line-height:55px;
    }*/
</style>

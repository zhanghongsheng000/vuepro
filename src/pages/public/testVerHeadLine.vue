<template>
  <div class="header">
    <div class="nav_wraper">
      <div class="proper_nav" id="proper_nav">
        <div class="index_nav_container">
          <el-menu
            background-color="#fff"
            text-color="#666"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="hover"
            active-text-color="#1168e1"
            :router=true
            @open="handleOpen">
            <span v-for="item,index in routerTree" :key="index">
              <el-submenu v-if="item.children" :index="item.url">
                <template slot="title">{{item.name}}</template>
                 <span v-for="sonItem,sonIndex in item.children" :key="sonIndex">
                    <el-submenu v-if="sonItem.children" :index="sonItem.url">
                      <template slot="title">{{sonItem.name}}</template>
                      <el-menu-item v-for="sonsItem,sonsIndex in sonItem.children" :key="sonsIndex" :index="sonsItem.url">{{sonsItem.name}}</el-menu-item>
                      <!--<el-menu-item :index="getFullPath('/CommonCompanyManager/CommonCompanyImportingEmployees')">导入员工</el-menu-item>-->
                    </el-submenu>
                    <el-menu-item v-else :index="sonItem.url">{{sonItem.name}}</el-menu-item>
                  </span>
              </el-submenu>
              <el-menu-item v-else :index="item.url">{{item.name}}</el-menu-item>
            </span>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="clear10"></div>
  </div>

</template>

<script>
  export default {
    name: "PropertyHead",
    data() {
      return {
        //基本路由
        base:"/CommonCompany/CommonCompanyProduct/IntelligentProperty/Passer/Renter",
        //默认活动路由
        activeIndex: '',
        //面包屑导航
        crumbList:[],
        //公司名称
        companyName:this.$local.sefetch('info')?this.$local.sefetch('info').companyName:'',
        //用户真实姓名
        userRealName:this.$local.sefetch('info')?this.$local.sefetch('info').userRealName:'',
        isShow:true,
        routerTree:[]
      };
    },
    computed:{
      // getter
      get: function () {
        return this.base
      },
      // setter
      set: function (currentPath) {
        this.base += currentPath;
      }
    },
    watch: {
      '$route' (route) {
        this.getRoutePath()
        if(this.$router.history.current.meta.title!=='租客公司'){
          this.isShow = true;
        }
      }
    },
    methods: {
      handleOpen(key, keyPath){
        console.log(key, keyPath);
      },
      getRoutePath() {
        var router = this.$store.state.currentRouter
        //var router = this.$router.history
        this.crumbList = [];
        for(let o in router.matched){
          let temp = {};
          temp.path = router.matched[o].path;
          temp.name = router.matched[o].meta.title;
          this.crumbList.push(temp)
        }
      },
      recursiveCreateRouter(parentId,parentUrl,routerList) {
        let re = [];
        for (let i = 0; i < routerList.length; i++) {
          let temp = {}
          if(routerList[i].path[0]=='/'){
            temp.url = parentUrl+routerList[i].path;
          }
          else{
            temp.url = parentUrl+'/'+routerList[i].path;
          }
          if(parentId!=''){
            temp.id = parentId+'_'+i;
          }
          else{
            temp.id=i;
          }
          temp.name = routerList[i].meta ? routerList[i].meta.title : routerList[i].name
          temp.label = temp.url;
          if (routerList[i].children) {
            temp.children = this.recursiveCreateRouter(temp.id,temp.url,routerList[i].children)
          }
          re.push(temp)
        }
        return re;
      },
      getFullPath(currentPath){
        return this.base + currentPath;
      },
      handleCircular() {
        let cache = [];
        let keyCache = []
        return function(key, value) {
          if (typeof value === 'object' && value !== null) {
            var index = cache.indexOf(value);
            if (index !== -1) {
              return '[Circular ' + keyCache[index] + ']';
            }
            cache.push(value);
            keyCache.push(key || 'root');
          }
          return value;
        }
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
      //返回首页
      returnToBusinessHome(){
        this.$router.push({path:'/BusinessHome'})
      }
    },
    mounted:function(){
      this.getRoutePath()
      if(this.$router.history.current.meta.title=='租客公司'){
        this.isShow = false;
      }
      this.activeIndex = this.$router.history.current.fullPath;

      let routerList = this.$router.options.routes;
      this.routerTree = this.recursiveCreateRouter('','',routerList)
      console.log(this.routerTree);
    }
  }
</script>

<style lang="less" scoped>
  .header{
    background: #fff;
    .quitLogin{
      cursor:pointer;
    }
    .el-menu-demo{
      background-color: #ffffff;
      background-size: 100% 60px;
    }
    .returnIndex{
      display:block;
      height:60px;
      position:absolute;
      width:160px;
      cursor:pointer;
    }
    width:100%;
    .top_wraper{
      width:100%;
      background-color:#ffffff;
      box-shadow: 0 0 1px #777777;
      .proper_top{
        width:1200px;
        height:32px;
        margin-left:auto;
        margin-right:auto;
        line-height:32px;
      }
      .top_left{
        text-indent:20px;
        display:inline-block;
        float:left;
        color:#515e93;
      }
      .top_right{
        display:inline-block;
        float:right;
        color:#515e93;
        padding-right:20px;
        span{
          display:inline-block;
          height:32px;
          line-height:32px;
          margin-left:20px;
        }
        .downloadApp{
          background-image:url("../../assets/img/IntelligentProperty/downAppLogo.png");
          background-repeat: no-repeat;
          background-position:0px 8px;
          padding-left:13px;
        }
      }
    }
    .nav_wraper{
      width:100%;
      height:35px;
      background-color: #ffffff;
      background-size: 100% 60px;
      .proper_nav{
        .index_nav_container{
          width:1040px;
          float:left;
        }
        .nav_returnIndex{
          display:inline-block;
          height:35px;
          line-height:35px;
          width:20px;
          float:left;
          cursor:pointer;
          background-image:url('../../assets/img/IntelligentProperty/returnIndex.png');
          background-repeat:no-repeat;
          background-position:0px 22px;
          padding-right: 12px;
        }
        /*width:1200px;*/
        margin-left:auto;
        margin-right:auto;
      }
    }
    .crumbsNav_wraper{
      width:100%;
      .crubsNav{
        /*width:1200px;*/
        margin-left:auto;
        margin-right:auto;
        border-bottom:solid 1px grey;
        .el-breadcrumb {
          font-size:12px;
          height: 32px;
          line-height: 32px;
          padding-left:20px;
        }
      }
    }
  }
</style>
<style lang="less">
  /*修改组件样式，所以放到全局中*/
  #proper_nav {
    ul>span{
      float:left;
      margin:0px;
      padding:0px;
    }
    .el-menu--horizontal>span>.el-submenu .el-submenu__icon-arrow {
      position: static;
      vertical-align: middle;
      margin-left: 8px;
      margin-top: -3px;
    }
    ul[role='menubar'] {
      height: 36px;
      font-size:16px!important;
    }
    ul[role='menubar'] > span> li {
      height: 35px;
      line-height:35px;
    }
    ul[role='menubar']> span>li:hover {
      border-bottom: solid 2px #1168e1 !important;
      background-color: rgb(204, 204, 204)!important;
      /*        color:white!important;*/
    }
    ul[role='menubar'] > span> li.is-active {
      border-bottom: solid 2px #1168e1 !important;
    }
    ul[role='menubar'] > span>li.is-active>div {
      border:none!important;
    }
    ul[role='menubar'] > span> li > div {
      height: 35px !important;
      line-height: 35px !important;
      border:none!important;
    }
    ul[role="menu"]> span>li:hover{
      background-color: rgb(204, 204, 204)!important;
      color:white!important;
    }
  }
</style>

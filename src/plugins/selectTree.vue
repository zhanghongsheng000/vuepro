<template>
  <div>
    <el-select v-model="value5" multiple placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input placeholder="选择写字楼" ref="selectTree" @focus="showSelectOption"></el-input>
    <transition name="el-zoom-in-top">
      <div v-show="showTreeFlag" ref="selectTreeOption" class="el-select-dropdown el-popper"
           style="min-width: 200px; transform-origin: center top 0px; z-index: 2003;padding:20px;padding-top:0px;"
           :style="{
                backgroundColor:'#ffffff',
                position:'fixed',
                top:inputTop,
                left:inputLeft,
                zIndex:'2001',
                boxShadow:'0px 0px 8px 0px #bdbdbd'}"
           x-placement="bottom-start">
        <div class="el-scrollbar" style="display: none;">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
            <ul class="el-scrollbar__view el-select-dropdown__list"></ul>
          </div>
          <div class="el-scrollbar__bar is-horizontal">
            <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
          </div>
          <div class="el-scrollbar__bar is-vertical">
            <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
          </div>
        </div>
        <p class="el-select-dropdown__empty">
          <el-tree
            :data="buildingTree"
            :props="prop"
            show-checkbox
            default-expand-all
            @check-change="handleCheckChange">
          </el-tree>
          <el-button @click="showTreeFlag = false" type="primary">确定</el-button>
          <el-button @click="showTreeFlag = false" type="primary">取消</el-button>
        </p>
        <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
      </div>

    </transition>
  </div>
</template>

<script>
  export default {
    name: "select-tree",
    props: [],
    data() {
      return {
        //写字楼树
        buildingTree: [
          {
            buildingId: 56,
            buildingName: '国际企业中心',
            buildingList: [
              {
                buildingId: 78,
                buildingName: "A座"
              },
              {
                buildingId: 79,
                buildingName: "B座"
              },
              {
                buildingId: 403,
                buildingName: "国际企业中心C座"
              }
            ]
          },
          {
            buildingId: 250,
            buildingName: 'e时代广场',
            buildingList: [
              {
                buildingId: 395,
                buildingName: "A座"
              },
              {
                buildingId: 396,
                buildingName: "B座"
              }
            ]
          },
          {
            buildingId: 250,
            buildingName: 'e时代广场',
            buildingList: [
              {
                buildingId: 395,
                buildingName: "A座"
              },
              {
                buildingId: 396,
                buildingName: "B座"
              }
            ]
          },
          {
            buildingId: 250,
            buildingName: 'e时代广场',
            buildingList: [
              {
                buildingId: 395,
                buildingName: "A座"
              },
              {
                buildingId: 396,
                buildingName: "B座"
              }
            ]
          }
        ],
        showTreeFlag: false,
        prop: {
          label: 'buildingName',
          id: 'buildingId',
          children: 'buildingList',
        },
        //input的offsetTop
        inputTop: 0,
        //input的offsetLeft
        inputLeft: 0,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶ddddddddddddddddddddddddddddddddddddd'
        }, {
          value: '选项3',
          label: '蚵仔煎dddddddddddddddddd'
        }, {
          value: '选项4',
          label: '龙须面ddddddddddddddddddddddddddddddddddddddd'
        }, {
          value: '选项5',
          label: '北京烤鸭dddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        }],
        value5: ['选项1', '选项2'],
      }
    },
    methods: {
      handleCheckChange() {
      },
      showSelectOption() {
        //获取input标签的元素位置
        this.inputTop = this.$refs.selectTree.$el.offsetTop + 40;
        this.inputLeft = this.$refs.selectTree.$el.offsetLeft;
        this.$refs['selectTreeOption'].style.left = this.inputLeft + 'px';
        this.$refs['selectTreeOption'].style.top = this.inputTop + 'px';
        console.log('haha', this.$refs['selectTreeOption'].style.left)
        this.showTreeFlag = true
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>

<template>
  <div class="numberSet" :class="classChosed">
    <div class="left" :class="minusClass" @click="numberMinus"></div>
    <div class="middle" :class="classChosed">{{numberSet}}</div>
    <div class="right" :class="plusClass" @click="numberPlus"></div>
  </div>
</template>

<script>
  export default {
    name: "nuber-set",
    props: {
      //数字选择控件的初始值
      origin:{
        type:Number,
        default:0
      },
      //父级组件传入的值，会原封不动返回给父级控件，主要是为了让控件可以携带值。
      componentStorage:{
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return null;
        }
      }


      /*numberSetProp: {
          type: Number,
          default: 0
      },
      max: {
          type: Number,
          default: 10000
      },
      min: {
          type: Number,
          default: 0
      },
      incrementProp: {
          type: Number,
          default: 1
      },
     */
    },
    data() {
      return {
        numberSet:parseInt(this.origin),
        numberRange:{
          max:10000,
          min:0
        },
        increment:1,
      }
    },
    computed: {
      classChosed:function(){
        if(this.numberSet>0){
          return 'notZeroState'
        }
        else{
          return 'zeroState'
        }
      },
      plusClass:function(){
        if(this.numberSet>0){
          return 'notZeroState notZeroBgPlus'
        }
        else{
          return 'zeroState'
        }
      },
      minusClass:function(){
        if(this.numberSet>0){
          return 'notZeroState notZeroBgMinus'
        }
        else{
          return 'zeroState'
        }
      }
      /*numberSet: function () {
          return this.numberSetProp
      },
      numberRange: function () {
          return {
             /!* origin:this.origin,*!/
              max: this.max,
              min: this.min
          }
      },
      increment: function () {
          return this.incrementProp
      },*/
    },
    watch:{
      value:function(){
        this.numberSet = this.value
      }
    },
    methods: {
      numberPlus() {
        if (this.numberSet + this.increment <= this.numberRange.max) {
          this.numberSet += this.increment;
          this.$emit("change",{numberSet:this.numberSet,componentStorage:this.componentStorage,type:'plus'})
        }
      },
      numberMinus() {
        if (this.numberSet - this.increment >= this.numberRange.min) {
          this.numberSet -= this.increment;
          this.$emit("change",{numberSet:this.numberSet,componentStorage:this.componentStorage,type:'minus'})
        }
      },
    },
    mounted(){
      //this.numberSet = this.value
    }
  }
</script>

<style scoped lang="less">
  .numberSet {
    width:68px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    border: solid 1px;
    div {
      height: 100%;
      float: left;
    }
    .left {
      width: 27.5%;
      border-right: solid 1px;
      background-image: url("../assets/images/public/minus.png");
      background-repeat: no-repeat;
      background-size: 50%;
      background-position: center center;
    }
    .middle {
      width: 42%;
      font-size: 0.46rem;
      font-family: PingFangSC-Semibold, pf-bold, sans-serif;
      text-align: center;
      color: #7f7f7f;
    }
    .right {
      width: 27.5%;
      border-left: solid 1px;
      background-image: url("../assets/images/public/plus.png");
      background-repeat: no-repeat;
      background-size: 50%;
      background-position: center center;
    }
  }
  .zeroState{
    border-color:#bfbfbf!important;
  }
  .notZeroState{
    border-color:#3487fa!important;
    color:#0461e1!important;
  }
  .notZeroBgPlus{
    background-image: url("../assets/images/public/plus_blue.png")!important;
  }
  .notZeroBgMinus{
    background-image: url("../assets/images/public/minus_blue.png")!important;
  }
</style>

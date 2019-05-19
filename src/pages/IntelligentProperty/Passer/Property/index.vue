<template>
	<div class="wraper propertycon">
		<PropertyHead></PropertyHead>
		<div class="content PropertyIndex">
			<currentName></currentName>
			<router-view></router-view>
		</div>
<!--		<div class="clear50"></div>
		<div class="black">
			<footPart></footPart>
		</div>-->

	</div>
</template>

<script>
	import PropertyHead from '@/components/IntelligentProperty/Passer/Property/PropertyHead'
	import footer from '@/components/public/footer'
	import currentName from '@/components/IntelligentProperty/IntelligentPropertyPublic/PropertyBaseInfo/currentName'
	export default {
		name: "IntelligentProperty",
		data() {
			return {
				currentName: "新增房东"
			}
		},
		components: {
			PropertyHead: PropertyHead,
			footPart: footer,
			currentName: currentName
		},
		methods: {},
		mounted: function() {

		}
	}
</script>

<style scoped lang="less">
  .wraper {
    width: 100%;
    .content {
     /* width: 1200px;*/
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      font-size: 16px;
      .currentName {
        line-height: 80px;
      }
    }
  }

  .black {
    background: #3b3b3b;
  }
</style>
<style lang="less">
  .propertycon {
    height:100%;
    .notShow {
      display: none;
    }
    .content{
      min-height:420px;
    }
    .PropertyIndex {
      .el-form-item {
        margin-bottom: 22px;
      }
      .el-table th {
        text-align: center;
        background-color: #e0e0e0;
        padding: 12px 0px;
        color: #5a5858;
      }
      .el-dialog {
        border-radius: 10px;
      }
      .el-table::before {
        background-color: white;
      }
      .el-upload__tip {
        float: right;
        color: #0a36e8;
      }
      .el-table th {
        text-align: center;
      }
      .cell {
        text-align: center;
      }
    }
  }
</style>

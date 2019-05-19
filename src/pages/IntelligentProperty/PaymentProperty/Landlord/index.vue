<template>
<div class="Renter_container">
	<Renthead></Renthead>
	<div class="content_box">
		<div class="renter_content fr">
			<img src="../../../../assets/img/IntelligentProperty/rent_title.png" />
			<p>省时、省力、简单、快捷  </p>
			<p>动动手指足不出户，没有现金也能缴纳物业费、水费、电费</p>
		</div>
	</div>
	
</div>
</template>

<script>
	import Renthead from '@/components/IntelligentProperty/Renter/header' //IntelligentProperty
    export default {
        name: "index",
        components: {
			Renthead,
		},
    }
</script>

<style  lang="less" scoped>
	.Renter_container{
		background: url(../../../../assets/img/IntelligentProperty/renthome_bg.png) left top no-repeat;
		background-size: cover;
		min-width: 1200px;
		.content_box{
			padding: 150px 0 823px 0;
			.renter_content{
				width: 50%;
				height: 314px;
				background: rgba(111,122,243,0.8);
				img{
					width: 451px;
					height: 37px;
					margin: 62px 0 40px 69px;
				}
				p{
					font-size: 10.5px;
					line-height: 18px;
					margin-left: 69px;
					color: #FFFFFF;
				}
			}
		}
	}
</style>

<template>
	<div class="Renter_container">
		<Renthead></Renthead>
		<div class="Payment_head">
			<div class="content_box">
				<div class="Payment_content">
					<img src="../../../../assets/img/IntelligentProperty/rent_title.png" />
					<p>省时、省力、简单、快捷 </p>
					<p>动动手指足不出户，没有现金也能缴纳物业费、水费、电费</p>
				</div>
			</div>
		</div>
		<div class="common">
			<p class="company1">物业公司：石家庄昌盛物业管理有限公司</p>
			<div class="Payment_part">
				<div class="icon">
					<img src="../../../../assets/img/IntelligentProperty/iconPropertypayment_bg.png" />
					<span>物业费</span>
				</div>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="building_name" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="room" label="房间">
					</el-table-column>
					<el-table-column prop="roomhost" label="房东">
					</el-table-column>
					<el-table-column prop="renter" label="租客">
					</el-table-column>
					<el-table-column prop="paymen" label="缴费人">
					</el-table-column>
					<el-table-column prop="paydate" label="缴费日期">
					</el-table-column>
					<el-table-column prop="payruler" label="缴费标准">
					</el-table-column>
					<el-table-column prop="roomarea" label="房间面积">
					</el-table-column>
					<el-table-column prop="startmonth" label="开始月份">
					</el-table-column>
					<el-table-column prop="endmonth" label="终止月份">
					</el-table-column>
					<el-table-column prop="totalmonth" label="月份合计">
					</el-table-column>
					<el-table-column prop="shouldpay" label="应缴物业费">
					</el-table-column>
					<el-table-column prop="actualpay" label="实缴物业费">
					</el-table-column>
				</el-table>
			</div>
			<div class="Payment_part">
				<div class="icon">
					<img src="../../../../assets/img/IntelligentProperty/icon_Waterpayment.png" />
					<span>水费</span>
				</div>
				<el-table :data="tableData1" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="building_name" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="room" label="房间">
					</el-table-column>
					<el-table-column prop="roomhost" label="房东">
					</el-table-column>
					<el-table-column prop="renter" label="租客">
					</el-table-column>
					<el-table-column prop="paymen" label="缴费人">
					</el-table-column>
					<el-table-column prop="paydate" label="缴费日期">
					</el-table-column>
					<el-table-column prop="prenum" label="上次表底">
					</el-table-column>
					<el-table-column prop="thisnum" label="本次表底 ">
					</el-table-column>
					<el-table-column prop="waterpayrule" label="水费标准">
					</el-table-column>
					<el-table-column prop="shouldpaywater" label="应缴水费 ">
					</el-table-column>
					<el-table-column prop="actualpaywater" label="实缴水费">
					</el-table-column>
				</el-table>
			</div>
			<div class="Payment_part">
				<div class="icon">
					<img src="../../../../assets/img/IntelligentProperty/icon_Elecpayment.png" />
					<span>电费</span>
				</div>
				<el-table :data="tableData2" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="building_name" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="room" label="房间">
					</el-table-column>
					<el-table-column prop="roomhost" label="房东">
					</el-table-column>
					<el-table-column prop="renter" label="租客">
					</el-table-column>
					<el-table-column prop="paymen" label="缴费人">
					</el-table-column>
					<el-table-column prop="paydate" label="缴费日期">
					</el-table-column>
					<el-table-column prop="prenum" label="上次表底">
					</el-table-column>
					<el-table-column prop="thisnum" label="本次表底 ">
					</el-table-column>
					<el-table-column prop="elecpayrule" label="电费标准">
					</el-table-column>
					<el-table-column prop="shouldpayelec" label="应缴电费 ">
					</el-table-column>
					<el-table-column prop="actualpayelec" label="实缴电费">
					</el-table-column>
				</el-table>
			</div>
			<div class="Payment_part">
				<div class="icon">
					<img src="../../../../assets/img/IntelligentProperty/icon_Warmpayment.png" />
					<span>取暖费</span>
				</div>
				<el-table :data="tableData3" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="building_name" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="room" label="房间">
					</el-table-column>
					<el-table-column prop="roomhost" label="房东">
					</el-table-column>
					<el-table-column prop="renter" label="租客">
					</el-table-column>
					<el-table-column prop="paymen" label="缴费人">
					</el-table-column>
					<el-table-column prop="paydate" label="缴费日期">
					</el-table-column>
					<el-table-column prop="warmpayyear" label="取暖费年份">
					</el-table-column>
					<el-table-column prop="roomarea" label="房间面积 ">
					</el-table-column>
					<el-table-column prop="warmpayrule" label="取暖费标准">
					</el-table-column>
					<el-table-column prop="shouldpaywarm" label="应缴取暖费">
					</el-table-column>
					<el-table-column prop="actualpaywarm" label="实缴取暖费">
					</el-table-column>
				</el-table>
			</div>
			<div class="Payment_part">
				<div class="icon">
					<img src="../../../../assets/img/IntelligentProperty/icon_Mechpayment.png" />
					<span>空调费</span>
				</div>
				<el-table :data="tableData4" border style="width: 100%">
					<el-table-column prop="num" label="编号">
					</el-table-column>
					<el-table-column prop="building_name" label="写字楼名称">
					</el-table-column>
					<el-table-column prop="room" label="房间">
					</el-table-column>
					<el-table-column prop="roomhost" label="房东">
					</el-table-column>
					<el-table-column prop="renter" label="租客">
					</el-table-column>
					<el-table-column prop="paymen" label="缴费人">
					</el-table-column>
					<el-table-column prop="paydate" label="缴费日期">
					</el-table-column>
					<el-table-column prop="roomarea" label="房间面积">
					</el-table-column>
					<el-table-column prop="startmonth" label="开始月份">
					</el-table-column>
					<el-table-column prop="endmonth" label="终止月份">
					</el-table-column>
					<el-table-column prop="totalmonth" label="月份合计">
					</el-table-column>
					<el-table-column prop="mechineruler" label="空调费标准">
					</el-table-column>
					<el-table-column prop="shouldpaymechaine" label="应缴空调费">
					</el-table-column>
					<el-table-column prop="actualpaymechine" label="实缴空调费">
					</el-table-column>
				</el-table>
			</div>
			<div class="pagin">
				<el-pagination background layout="prev, pager, next" :total="100">
				</el-pagination>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Renthead from '@/components/IntelligentProperty/Renter/header'
	import footer from '@/components/public/footer'
	export default {
		name: "index",
		components: {
			Renthead,
			'v-footer': footer
		},
		data() {
			return {
				tableData: [{
					num: '1',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					payruler: '1元/m²/天 ',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					shouldpay: '1000元',
					actualpay: '1000元'
				}, {
					num: '2',
					building_name: '荣鼎天下',
					room: '0102',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					payruler: '1元/m²/天 ',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					shouldpay: '1000元',
					actualpay: '1000元'
				}, {
					num: '3',
					building_name: '荣鼎天下',
					room: '0103',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					payruler: '1元/m²/天 ',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					shouldpay: '1000元',
					actualpay: '1000元'
				}, {
					num: '4',
					building_name: '荣鼎天下',
					room: '0104',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					payruler: '1元/m²/天 ',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					shouldpay: '1000元',
					actualpay: '1000元'
				}],
				tableData1: [{
					num: '1',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					waterpayrule: '2.2元/吨',
					shouldpaywater: '100元  ',
					actualpaywater: '100元'

				}, {
					num: '2',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					waterpayrule: '2.2元/吨',
					shouldpaywater: '100元  ',
					actualpaywater: '100元'
				}, {
					num: '3',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					waterpayrule: '2.2元/吨',
					shouldpaywater: '100元  ',
					actualpaywater: '100元'
				}, {
					num: '4',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					waterpayrule: '2.2元/吨',
					shouldpaywater: '100元  ',
					actualpaywater: '100元'
				}],
				tableData2: [{
					num: '1',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					elecpayrule: '1.2元/度',
					shouldpayelec: '100元  ',
					actualpayelec: '100元'

				}, {
					num: '2',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					elecpayrule: '1.2元/度',
					shouldpayelec: '100元  ',
					actualpayelec: '100元'
				}, {
					num: '3',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					elecpayrule: '1.2元/度',
					shouldpayelec: '100元  ',
					actualpayelec: '100元'
				}, {
					num: '4',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					prenum: '152',
					thisnum: '180',
					elecpayrule: '1.2元/度',
					shouldpayelec: '100元  ',
					actualpayelec: '100元'
				}],
				tableData3: [{
					num: '1',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					warmpayyear: '2017年',
					roomarea: '180',
					warmpayrule: '22元/㎡/季',
					shouldpaywarm: '2200元  ',
					actualpaywarm: '2200元 '
				}, {
					num: '2',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					warmpayyear: '2017年',
					roomarea: '180',
					warmpayrule: '22元/㎡/季',
					shouldpaywarm: '2200元  ',
					actualpaywarm: '2200元 '
				}, {
					num: '3',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					warmpayyear: '2017年',
					roomarea: '180',
					warmpayrule: '22元/㎡/季',
					shouldpaywarm: '2200元  ',
					actualpaywarm: '2200元 '
				}, {
					num: '4',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					warmpayyear: '2017年',
					roomarea: '180',
					warmpayrule: '22元/㎡/季',
					shouldpaywarm: '2200元  ',
					actualpaywarm: '2200元 '
				}],
				tableData4: [{
					num: '1',
					building_name: '荣鼎天下',
					room: '0101',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					mechineruler: '10元/㎡  ',
					shouldpaymechaine: '1000元',
					actualpaymechine: '1000元'
				}, {
					num: '2',
					building_name: '荣鼎天下',
					room: '0102',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					mechineruler: '10元/㎡  ',
					shouldpaymechaine: '1000元',
					actualpaymechine: '1000元'
				}, {
					num: '3',
					building_name: '荣鼎天下',
					room: '0103',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					mechineruler: '10元/㎡  ',
					shouldpaymechaine: '1000元',
					actualpaymechine: '1000元'
				}, {
					num: '4',
					building_name: '荣鼎天下',
					room: '0104',
					renter: '创客公司',
					roomhost: '老财主',
					paymen: '老李',
					paydate: '2018-5-1',
					roomarea: '100/m²',
					startmonth: '2017-8',
					endmonth: '2018-5',
					totalmonth: '5',
					mechineruler: '10元/㎡  ',
					shouldpaymechaine: '1000元',
					actualpaymechine: '1000元'
				}]
			}
		}
	}
</script>

<style lang="less" scoped>
	.Renter_container {
		.Payment_head {
			background: url(../../../../assets/img/IntelligentProperty/Propertypayment_bg.png) left top no-repeat;
			background-size: cover;
			min-width: 1200px;
			.content_box {
				padding: 270px 0 100px 0;
				.Payment_content {
					width: 1200px;
					margin: 0 auto;
					img {
						width: 451px;
						height: 37px;
						margin: 62px 0 40px 69px;
					}
					p {
						font-size: 10.5px;
						line-height: 18px;
						margin-left: 69px;
						color: #FFFFFF;
					}
				}
			}
		}
		.company1 {
			font-size: 14px;
			padding: 27px 0 20px 0;
		}
		.Payment_part {
			padding: 20px 0 0 0;
			.icon {
				padding-bottom: 10px;
				img {
					vertical-align: middle;
				}
				span {
					padding: 3px 0 0 4px;
				}
			}
		}
		.pagin {
			text-align: center;
			padding: 20px 0;
		}
		.black {
			background: #3b3b3b;
		}
	}
</style>
<style>
	.el-table--border th,
	.el-table__fixed-right-patch {
		text-align: center;
		background: #f0f0f0;
		color: #000000;
		font-size: 12px;
	}

	.el-table--enable-row-transition .el-table__body td {
		text-align: center;
		font-size: 10px;
	}
</style>

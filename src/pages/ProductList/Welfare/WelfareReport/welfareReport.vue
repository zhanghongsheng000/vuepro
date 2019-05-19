<template>
  <div id="welfareReport">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">消费报告</span>
      </div>
    </div>
    <div class="choseDate common">
      <el-select v-model="rangeValue" @change="initDate" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="dateValue.begin"
        @change="setDate('begin')"
        value-format="yyyy-MM-dd"
        type="date"
        :picker-options="pickerOption"
        placeholder="选择日期">
      </el-date-picker>
      <div class="dateLine"></div>
      <el-date-picker
        v-model="dateValue.end"
        :picker-options="pickerOption"
        value-format="yyyy-MM-dd"
        @change="setDate('end')"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="acountReview common">
      <div class="title">
        账户预览
      </div>
      <div class="reviewCells">
        <div class="contentCell">
          <div class="cellName">用餐金额</div>
          <div class="cellValue"><span class="valueBig">{{overview.consumptionAmount[0]}}</span><span class="valueSmall">.{{overview.consumptionAmount[1]}}</span><span class="valueUnit">元</span></div>
        </div>
        <div class="contentCell">
          <div class="cellName">用餐次数</div>
          <div class="cellValue"><span class="valueBig">{{overview.mealCount}}</span><span class="valueUnit">次</span></div>
        </div>
        <div class="contentCell">
          <div class="cellName">用餐人数</div>
          <div class="cellValue"><span class="valueBig">{{overview.personCount}}</span><span class="valueUnit">人</span></div>
        </div>
      </div>
      <div class="clear1"></div>
    </div>
    <div class="welGridBox common">
      <div class="title">
        账户资金变动
        <div class="dateRange">
          报告期间：{{dateValue.begin}}至{{dateValue.end}}
        </div>
      </div>
      <div class="gridLeft">
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">期初余额</span>
          <span class="gridLeftThRight">￥{{chartMap1.balance}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">本期消费</span>
          <span class="gridLeftThRight">￥{{chartMap1.consumption}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">期间充值</span>
          <span class="gridLeftThRight">￥{{chartMap1.recharge}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">期间退款</span>
          <span class="gridLeftThRight">￥{{chartMap1.refund}}</span>
        </div>
      </div>
      <div class="welfareGrid" id="moneyChangeGrid"></div>
      <div class="clear1"></div>
    </div>
    <div class="welGridBox common">
      <div class="title">
        每{{rangeValue=='month'?'天':'月'}}订单量及消费金额
        <div class="dateRange">
          报告期间：{{dateValue.begin}}至{{dateValue.end}}
        </div>
      </div>
      <div class="gridLeft">
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">总单量</span>
          <span class="gridLeftThRight">{{chartMap2.totalOrder}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">总消费金额</span>
          <span class="gridLeftThRight">￥{{chartMap2.totalConsumption}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">单均消费金额</span>
          <span class="gridLeftThRight">￥{{chartMap2.averageConsumption}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">{{rangeValue=='month'?'日':'月'}}均单量</span>
          <span class="gridLeftThRight">{{chartMap2.totalOrder / listNum}}</span>
        </div>
        <div class="gridLeftTh">
          <span class="gridLeftThLeft">{{rangeValue=='month'?'日':'月'}}均消费金额</span>
          <span class="gridLeftThRight">￥{{chartMap2.avergeDayConsumption}}</span>
        </div>
      </div>
      <div class="welGridBox common">
        <div class="welfareGrid" id="orderAndMoneyGrid"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import getUrl from '@/assets/js/global'
  import { $gPasserUrl } from '@/assets/js/gUrl'
  export default {
    data() {
      return {
        options: [
          {
            value: 'month',
            label: '月报'
          },
          {
            value: 'year',
            label: '年报'
          },
        ],
        rangeValue: 'month',
        dateValue: {
          'begin': '',
          'end': ''
        },
        //控制日期选择器不能选择当天以后的日期
        pickerOption: {
          disabledDate: (time) => {
            //return false;
            return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
          }
        },
        //年报的月份X轴，后续会根据具体的月份调整
        xAxisMonth:[],
        //月报的日期X轴，后续会根据具体的日期调整
        xAxisDay:[],
        //账户资金变动表格数据
        gridOptionMG:{
          textStyle:{
            color:'#4c4c4c',
            fontWeight:'normal',
            fontSize:14
          },
          title: {
            text: '    账户资金变动',
            textStyle:{
              color:'#4c4c4c',
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['消费额','期初余额','本期消费','期间充值','期间退款']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              //saveAsImage: {}
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              position:'top',
              data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisLabel: {
                color: '#0f0f0f'
              },
              axisLine:{
                lineStyle:{
                  color:'#eeeeee'
                }
              }
            },
            {
              type: 'category',
              position:'bottom',
              boundaryGap: true,
              data: ['期初余额','本期消费','期间充值','期间退款'],
              axisLabel: {
                color: '#0f0f0f'
              },
              axisLine:{
                lineStyle:{
                  color:'#eeeeee'
                }
              }
            },
          ],
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#0f0f0f'
            },
            axisLine:{
              lineStyle:{
                color:'#eeeeee'
              }
            }
          },
          series: [
            {
              name:'消费额',
              type:'line',
              stack: '消费额',
              data:[],
              itemStyle: {
                normal: {
                  color: '#fd7e7e'
                }
              }
            },
            {
              name:'期初余额',
              type:'bar',
              barWidth:'30px',
              stack: '期初余额',
              barGap:'-100%',
              xAxisIndex:1,
              data:[0, 0, 0, 0],
              itemStyle: {
                normal: {
                  color: '#187ee4'
                }
              }
            },
            {
              name:'本期消费',
              type:'bar',
              barWidth:'30px',
              stack: '本期消费',
              barGap:'-100%',
              xAxisIndex:1,
              data:[0, 0, 0, 0],
              itemStyle: {
                normal: {
                  color: '#fdc346'
                }
              }
            },
            {
              name:'期间充值',
              type:'bar',
              barWidth:'30px',
              stack: '期间充值',
              barGap:'-100%',
              xAxisIndex:1,
              data:[0, 0, 0, 0],
              itemStyle: {
                normal: {
                  color: '#1bd7a4'
                }
              }
            },
            {
              name:'期间退款',
              type:'bar',
              barWidth:'30px',
              stack: '期间退款',
              barGap:'-100%',
              xAxisIndex:1,
              data:[0, 0, 0, 0],
              itemStyle: {
                normal: {
                  color: '#c796c3'
                }
              }
            }
          ]
        },
        //账户资金变动表格
        moneyChangeCharts:null,
        //每月订单量以及消费金额表格数据
        gridOptionOAM:{
          textStyle:{
            color:'#4c4c4c',
            fontWeight:'normal',
            fontSize:14
          },
          title: {
            text: '    每月订单量以及消费金额',
            textStyle:{
              color:'#4c4c4c',
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['消费金额','订单量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              //saveAsImage: {}
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisLabel: {
                color: '#0f0f0f'
              },
              axisLine:{
                lineStyle:{
                  color:'#eeeeee'
                }
              }
            },
          ],
          yAxis: [
            {
              type: 'value',
              name:'消费金额',
              axisLabel: {
                color: '#0f0f0f'
              },
              axisLine:{
                lineStyle:{
                  color:'#eeeeee'
                }
              }
            },
            {
              type: 'value',
              name:'单量',
              position:'right',
              axisLabel: {
                color: '#0f0f0f'
              },
              axisLine:{
                lineStyle:{
                  color:'#eeeeee'
                }
              }
            }
          ],
          series: [
            {
              name:'消费金额',
              type:'bar',
              stack: '消费金额',
              barMaxWidth:'15px',
              data:[],
              itemStyle: {
                normal: {
                  color: '#187ee4'
                }
              }
            },
            {
              name:'订单量',
              type:'line',
              stack: '订单量',
              yAxisIndex:1,
              data:[],
              itemStyle: {
                normal: {
                  color: '#fd7e7e'
                }
              }
            }
          ]
        },
        //每月订单量以及消费金额表格
        orderAndMoneyCharts:null,
        //当前日期需要的数据条目数(天数或者月数)
        listNum:0,
        //页面数据
        //预览数据
        overview: {
          consumptionAmount: 0,
          mealCount: 0,
          personCount: 0
        },
        //统计表1系统列表数据
        chartMap1:{},
        //表格2数据
        chartMap2:{}
      }
    },
    methods: {
      //获取消费报告数据
      getConsumptionReport(){
        //根据截至日期获取条目数
        if(this.rangeValue=='year'){
          this.listNum = this.getMonthsNumber(this.dateValue.begin,this.dateValue.end)
        }
        else{
          this.listNum = this.getDaysNumber(this.dateValue.begin,this.dateValue.end)
        }
        console.log()
        this.$httpPasser.post(
          'welfareWeb/getConsumptionReport',
          {
            count:this.listNum,
            startDate:this.dateValue.begin,
            endDate:this.dateValue.end,
            type:this.rangeValue=='year'?1:2,
            shopId:this.$local.sefetch('info').companyId
          }
        ).then(
          res=>{
            if(res.data.resultCode==200){
              this.overview = res.data.result.overview;
              if(this.overview.consumptionAmount===null){
                this.overview.consumptionAmount = ['0','00']
              }
              else{
                this.overview.consumptionAmount = this.overview.consumptionAmount.toString().split('.')
                if(this.overview.consumptionAmount[1]==='' || this.overview.consumptionAmount[1]===undefined){
                  this.overview.consumptionAmount[1]='00'
                }
              }

              //设置图表1数据
              this.chartMap1 = res.data.result.chartMap1;
              this.gridOptionMG.series[0].data = this.chartMap1.dayConsumptionList;
              //期初余额
              this.gridOptionMG.series[1].data[0] = this.chartMap1.balance;
              //本期消费
              this.gridOptionMG.series[2].data[1] = this.chartMap1.consumption;
              //期间充值
              this.gridOptionMG.series[3].data[2] = this.chartMap1.recharge;
              //期间退款
              this.gridOptionMG.series[4].data[3] = this.chartMap1.refund;

              //设置图表2数据
              this.chartMap2 = res.data.result.chartMap2;
              this.gridOptionOAM.series[0].data = this.chartMap2.dayConsumptionList;
              this.gridOptionOAM.series[1].data = this.chartMap2.dayOrderList;
              this.initCharts()
            }

          }
        ).catch(err=>{
          this.$message.error(err)
        })
      },
      /*
      * 日期段选择部分方法
      * */
      //初始化日期
      initDate() {
        this.dateValue.end = this.getCurrentDate()
        if (this.rangeValue == 'year') {
          this.dateValue.begin = this.subtractOneYear(this.dateValue.end)
          this.gridOptionOAM.title.text = '    每月订单量以及消费金额'
          //设置X轴
          this.initXAxis()
        }
        else {
          this.dateValue.begin = this.subtractOneMonth(this.dateValue.end)
          this.gridOptionOAM.title.text = '    每天订单量以及消费金额'
          //设置X轴
          this.initXAxis()
        }
        this.getConsumptionReport()
      },
      //初始化表格
      initCharts(){
        /*
         * echarts图表部分
         * */
        if(this.moneyChangeCharts==null){
          // 基于准备好的dom，初始化echarts实例
          this.moneyChangeCharts = this.$echarts.init(document.getElementById('moneyChangeGrid'));
          // 使用刚指定的配置项和数据显示图表。
          this.moneyChangeCharts.setOption(this.gridOptionMG);
        }
        else{
          this.moneyChangeCharts.setOption(this.gridOptionMG);
        }
        if(this.orderAndMoneyCharts==null){
          // 基于准备好的dom，初始化echarts实例
          this.orderAndMoneyCharts = this.$echarts.init(document.getElementById('orderAndMoneyGrid'));
          // 使用刚指定的配置项和数据显示图表。
          this.orderAndMoneyCharts.setOption(this.gridOptionOAM);
        }
        else{
          this.orderAndMoneyCharts.setOption(this.gridOptionOAM);
        }
      },
      setDate(flag) {
        if (flag === "begin") {
          if (this.rangeValue == 'year') {
            this.dateValue.end = this.getSmallDate([this.addOneYear(this.dateValue[flag]), this.getCurrentDate()])
          }
          else {
            this.dateValue.end = this.getSmallDate([this.addOneMonth(this.dateValue[flag]), this.getCurrentDate()])
          }
          //设置X轴
          this.initXAxis()
        }
        else if (flag === 'end') {
          if (this.rangeValue == 'year') {
            this.dateValue.begin = this.subtractOneYear(this.dateValue[flag])
          }
          else {
            this.dateValue.begin = this.subtractOneMonth(this.dateValue[flag])
          }
          //设置X轴
          this.initXAxis()
        }
        //获取数据，并且设置表格
        this.getConsumptionReport()
        /*else if(flag==='type'){
          console.log('为啥')
          this.dateValue.end = this.getCurrentDate()
          if(this.rangeValue=='year'){
            this.dateValue.begin = this.subtractOneYear(this.dateValue.end)
          }
          else{
            this.dateValue.begin = this.subtractOneMonth(this.dateValue.end)
          }
        }*/
      },
      //为'yyyy-MM-dd'格式的时间加一年
      addOneYear(dateString) {
        let dateArray = dateString.split('-')
        let year = dateArray[0]
        let month = dateArray[1]
        let day = dateArray[2]
        //如果选择的开始日期为1月1号，则返回年末一天
        if (month == '01' && day == '01') {
          return year + '-12-31'
        }
        else {
          year = (Number(year) + 1).toString();
          if (day == '01') {
            month = (Number(month) - 1) < 10 ? '0' + (Number(month) - 1).toString() : (Number(month) - 1).toString()
            day = this.getLastDayOfMonth(year, month)
          }
          else {
            month = month.toString();
            day = Number(day) - 1 < 10 ? '0' + (Number(day) - 1).toString() : (Number(day) - 1).toString()
          }
          return year + '-' + month + '-' + day;
        }
      },
      //为'yyyy-MM-dd'格式的时间减一年
      subtractOneYear(dateString) {
        let dateArray = dateString.split('-')
        let year = dateArray[0]
        let month = dateArray[1]
        let day = dateArray[2]
        if (year == (new Date()).getFullYear()) {
          return year + '-01-01'
        }
        //如果选择的开始日期为1月1号，则返回年末一天
        else if (month == '12' && day == '31') {
          return year + '-01-01'
        }
        else {
          year = (Number(year) - 1).toString();
          if (day == this.getLastDayOfMonth(year, month)) {
            month = (Number(month) + 1) < 10 ? '0' + (Number(month) + 1).toString() : (Number(month) + 1).toString()
            day = '01'
          }
          else {
            month = month.toString();
            day = Number(day) + 1 < 10 ? '0' + (Number(day) + 1).toString() : (Number(day) + 1).toString()
          }
          return year + '-' + month + '-' + day;
        }
      },
      //为'yyyy-MM-dd'格式的时间加一月
      addOneMonth(dateString) {
        let dateArray = dateString.split('-')
        let year = dateArray[0]
        let month = dateArray[1]
        let day = dateArray[2]
        if (day === '01') {
          day = this.getLastDayOfMonth(year, month)
        }
        else {
          if (month == '12') {
            year = (Number(year) + 1).toString();
            month = '01';
            day = Number(day) - 1 < 10 ? '0' + (Number(day) - 1).toString() : (Number(day) - 1).toString();
          } else {
            month = Number(month) + 1 < 10 ? '0' + (Number(month) + 1).toString() : (Number(month) + 1).toString()
            day = Number(day) - 1 < 10 ? '0' + (Number(day) - 1).toString() : (Number(day) - 1).toString();
          }
        }
        return year + '-' + month + '-' + day;
      },
      //为'yyyy-MM-dd'格式的时间减一月
      subtractOneMonth(dateString) {
        let dateArray = dateString.split('-')
        let year = dateArray[0]
        let month = dateArray[1]
        let day = dateArray[2]
        if (day === this.getLastDayOfMonth(year, month)) {
          day = '01'
        }
        else {
          if (month == '01') {
            year = (Number(year) - 1).toString();
            month = '12';
            day = Number(day) + 1 < 10 ? '0' + (Number(day) + 1).toString() : (Number(day) + 1).toString();
          } else {
            month = Number(month) - 1 < 10 ? '0' + (Number(month) - 1).toString() : (Number(month) - 1).toString()
            day = Number(day) + 1 < 10 ? '0' + (Number(day) + 1).toString() : (Number(day) + 1).toString();
          }
        }
        return year + '-' + month + '-' + day;
      },
      //判断年份是否为闰年
      ifLeapYear(year) {
        let re = false;
        let yearNum = Number(year);
        if (yearNum % 4 === 0 && yearNum % 100 !== 0) {
          re = true;
        }
        return re;
      },
      //获得某一年某一个月的月末是几号
      getLastDayOfMonth(year, month) {
        let day = '31'
        if (Number(month) == 2) {
          if (this.ifLeapYear(year)) {
            day = '29'
          }
          else {
            day = '28'
          }
        }
        else if ([1, 3, 5, 7, 8, 10, 12].indexOf(Number(month)) !== -1) {
          day = '31'
        }
        else {
          day = '30'
        }
        return day;
      },
      //判断'yyyy-MM-dd'格式的时间的大小
      getSmallDate(dateArray) {
        let tempArray = [];
        if (dateArray && dateArray.length && dateArray.length > 0) {
          for (let o in dateArray) {
            tempArray.push(Number(dateArray[o].replace(/-/g, '')))
          }
        }
        let maxOne = tempArray.sort()[0];
        if (maxOne) {
          maxOne = maxOne.toString().substring(0, 4) + '-' + maxOne.toString().substring(4, 6) + '-' + maxOne.toString().substring(6, 8)
        }
        return maxOne;
      },
      //获取当前时间,格式为'yyyy-MM-dd'
      getCurrentDate() {
        let date = new Date();
        let month = (Number(date.getMonth()) + 1) < 10 ? '0' + (Number(date.getMonth()) + 1).toString() : (Number(date.getMonth()) + 1).toString()
        let day = Number(date.getDate()) < 10 ? '0' + Number(date.getDate()).toString() : Number(date.getDate()).toString();
        return date.getFullYear() + '-' + month + '-' + day;
      },
      //获取两个相邻月的日期或者同月日期(格式为'yyyy-MM-dd')之间相隔的天数
      getDaysNumber(dateStringBegin,dateStringEnd){
        let re = 31;
        let dateArrayBegin = dateStringBegin.split('-')
        let yearBegain = dateArrayBegin[0]
        let monthBegain = dateArrayBegin[1]
        let dayBegain = dateArrayBegin[2]

        let dateArrayEnd = dateStringEnd.split('-')
        let monthEnd = dateArrayEnd[1]
        let dayEnd = dateArrayEnd[2]

        //如果结束月和开始月一样，即当月的话，那天数就是当前月份已经过去的所有天数
        if(monthEnd==monthBegain){
          re =  Number(dayEnd);
        }
        //如果跨月了，那么天数就是已经过去的那个月份的所有天数。
        else{
          re =  Number(this.getLastDayOfMonth(yearBegain,monthBegain))
        }
        return re;
      },
      //获取两个相邻年日期或者同年日期(格式为'yyyy-MM-dd')之间相隔的月数
      getMonthsNumber(dateStringBegin,dateStringEnd){
        let re = 12;
        let dateArrayBegin = dateStringBegin.split('-')
        let yearBegain = dateArrayBegin[0]

        let dateArrayEnd = dateStringEnd.split('-')
        let yearEnd = dateArrayEnd[0]
        let monthEnd = dateArrayEnd[1]
        //如果是当年，则直接返回当前月份
        if(yearBegain==yearEnd){
          re = Number(monthEnd);
        }
        else{
          re = 12
        }
        return re;
      },
      //获取两个相邻月的日期或者同月日期(格式为'yyyy-MM-dd')之间相隔的日期的字符串数组，格式为'M.dd'
      getDayArray(dateStringBegin,dateStringEnd){
        let re = [];
        let dateArrayBegin = dateStringBegin.split('-')
        let yearBegain = dateArrayBegin[0]
        let monthBegain = dateArrayBegin[1]
        let dayBegain = dateArrayBegin[2]

        let dateArrayEnd = dateStringEnd.split('-')
        let yearEnd = dateArrayEnd[0]
        let monthEnd = dateArrayEnd[1]
        let dayEnd = dateArrayEnd[2]
        //如果是当年
        if(yearBegain==yearEnd){
          if(monthEnd==monthBegain){
            re = [];
            //游标日期
            let cursorDay = Number(dayBegain)
            for(let index=0;index<Number(dayEnd);index++){
              //游标日期小于当前月的最后一天
              if(cursorDay<=Number(this.getLastDayOfMonth(yearBegain,monthBegain))){
                re.push(monthBegain+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
                cursorDay++
              }
            }
            return re;
          }
          else{
            re = []
            //游标日期
            let cursorDay = Number(dayBegain)
            let cursorMonth = Number(monthBegain)
            for(let index=0;index<this.getDaysNumber(dateStringBegin,dateStringEnd);index++){
              //如果还是开始月，游标日期小于当前月的最后一天，则月份不变，日期+1
              if(cursorDay<Number(this.getLastDayOfMonth(yearBegain,monthBegain)) && cursorMonth==Number(monthBegain)){
                re.push(monthBegain+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
                cursorDay++
              }
              //如果还是开始月，游标日期等于当前月的最后一天，则月份+1，日期变为1
              else if(cursorDay==Number(this.getLastDayOfMonth(yearBegain,monthBegain)) && cursorMonth==Number(monthBegain)){
                re.push(monthBegain+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
                cursorDay=1
                cursorMonth = Number(monthEnd)
              }
              //如果进入了结束月
              else if(cursorDay<=Number(dayEnd) && cursorMonth==Number(monthEnd)){
                re.push(monthEnd+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
                cursorDay++
              }
            }
            return re;
          }

        }
        //如果产生了跨年
        else{
          //因为默认是相邻月份的，所以跨年就只考虑12月份跨年
          re = []
          //游标日期
          let cursorDay = Number(dayBegain)
          let cursorMonth = Number(monthBegain)
          for(let index=0;index<this.getDaysNumber(dateStringBegin,dateStringEnd);index++){
            //如果还是开始月，游标日期小于当前月的最后一天，则月份不变，日期+1
            if(cursorDay<Number(this.getLastDayOfMonth(yearBegain,monthBegain)) && cursorMonth==Number(monthBegain)){
              re.push(yearBegain+'.'+monthBegain+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
              cursorDay++
            }
            //如果还是开始月，游标日期等于当前月的最后一天，则月份+1，日期变为1
            else if(cursorDay==Number(this.getLastDayOfMonth(yearBegain,monthBegain)) && cursorMonth==Number(monthBegain)){
              re.push(yearBegain+'.'+monthBegain+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
              cursorDay=1
              cursorMonth = Number(monthEnd)
            }
            //如果进入了结束月
            else if(cursorDay<=Number(dayEnd) && cursorMonth==Number(monthEnd)){
              re.push(yearEnd+'.'+monthEnd+'.'+(cursorDay<10?'0'+cursorDay.toString():cursorDay.toString()))
              cursorDay++
            }
          }
          return re;
        }


      },
      //获取两个相邻年的月份或者同年(格式为'yyyy-MM-dd')之间相隔的月份的字符串数组，格式为'yyyy-MM'
      getMonthArray(dateStringBegin,dateStringEnd){
        let re = [];
        let dateArrayBegin = dateStringBegin.split('-')
        let yearBegain = dateArrayBegin[0]
        let monthBegain = dateArrayBegin[1]
        let dayBegain = dateArrayBegin[2]

        let dateArrayEnd = dateStringEnd.split('-')
        let yearEnd = dateArrayEnd[0]
        let monthEnd = dateArrayEnd[1]
        let dayEnd = dateArrayEnd[2]
        //如果是当年
        if(yearBegain==yearEnd){
          re = []
          let cursorMonth = Number(monthBegain)
          for(let index=0;index<Number(monthEnd);index++){
            if(cursorMonth<=Number(monthEnd)){
              re.push(yearEnd+'.'+(cursorMonth<0?'0'+cursorMonth.toString():cursorMonth.toString()))
              cursorMonth++
            }
          }
          return re;
        }
        //如果产生了跨年
        else{
          //因为默认是相邻月份的，所以跨年就只考虑12月份跨年
          re = []
          let cursorMonth = Number(monthBegain)
          let cursorYear = Number(yearBegain)
          for(let index=0;index<this.getMonthsNumber(dateStringBegin,dateStringEnd);index++){
            if(cursorMonth<12 && cursorYear==Number(yearBegain)){
              re.push(yearBegain+'.'+(cursorMonth<0?'0'+cursorMonth.toString():cursorMonth.toString()))
              cursorMonth++;
            }
            else if(cursorMonth==12 && cursorYear==Number(yearBegain)){
              re.push(yearBegain+'.'+(cursorMonth<0?'0'+cursorMonth.toString():cursorMonth.toString()))
              cursorMonth=1;
              cursorYear=Number(yearEnd)
            }
            else if(cursorMonth <= Number(monthEnd) && cursorYear==Number(yearEnd)){
              re.push(yearEnd+'.'+(cursorMonth<0?'0'+cursorMonth.toString():cursorMonth.toString()))
              cursorMonth++
            }
          }
          return re;
        }


      },
      //初始化图标X轴
      initXAxis(){
        if (this.rangeValue == 'year') {
          //设置X轴
          this.gridOptionMG.xAxis[0].data =this.getMonthArray(this.dateValue.begin,this.dateValue.end)
          this.gridOptionOAM.xAxis[0].data =this.getMonthArray(this.dateValue.begin,this.dateValue.end)
        }
        else {
          //设置X轴
          this.gridOptionMG.xAxis[0].data =this.getDayArray(this.dateValue.begin,this.dateValue.end)
          this.gridOptionOAM.xAxis[0].data =this.getDayArray(this.dateValue.begin,this.dateValue.end)
        }
      }
    },
    created() {

    },
    mounted() {
      this.initDate();
    },
  }
</script>
<style lang="less" scoped>
  #welfareReport{
    .common{
      margin-left: 25px;
      background-color: #fff;
      padding: 0 4px;
      line-height: 30px;
    }
    .choseDate{
      height:45px;
      div{
        float:left;
      }
      .dateLine{
        background-image:url("../../../../assets/images/public/dateLine.png");
        background-repeat: no-repeat;
        height:40px;
        width:28px;
        background-position: center center;
        float:left;
      }
      .el-select{
        width:80px;
        margin-right:10px;
      }
    }
    .acountReview{
      .title{
        font-size: 20px;
        line-height: 50px;
        margin-bottom: 10px;
        margin-top: 19px;
      }
      .reviewCells{
        .contentCell{
          border:dashed 1px #dbdbdb;
          float:left;
          width:200px;
          height:70px;
          border-left:none;
          padding-left:30px;
          padding-top:6px;
          .cellName{
            font-size:16px;
            line-height:28px;
          }
          .cellValue{
            color: #0a69da;
            line-height:30px;
            .valueBig{
              font-size:30px;
            }
            .valueSmall{
              font-size:13px;
              left:-10px
            }
            .valueUnit{
              font-size:13px;
              margin-left:10px;
            }
          }
        }
        div.contentCell:first-child{
          border-left:dashed 1px #dbdbdb;
        }
      }
    }
    .welGridBox{
      .title{
        font-size: 20px;
        line-height: 50px;
        margin-bottom: 10px;
        margin-top: 19px;
        width:1000px;
        position:relative;
        .dateRange{
          background-image:url("../../../../assets/images/public/dateIcon.png");
          background-repeat: no-repeat;
          background-position:left center;
          background-size:16px;
          padding-left:25px;
          position:absolute;
          right:0px;
          bottom:5px;
          font-size:14px;
          color: #848484;
          height:20px;
          line-height:20px;
        }
      }
      .gridLeft{
        float:left;
        width:280px;
        height:345px;
        border:solid 1px #dbdbdb;
        margin-right:15px;
        .gridLeftTh{
          height:57px;
          line-height:57px;
          font-size:14px;
          margin-left:auto;
          margin-right:auto;
          width:250px;
          border-bottom:solid 1px #dbdbdb;
          .gridLeftThLeft{
            float:left;
            text-align:left;
          }
          .gridLeftThRight{
            float:right;
            text-align:right;
            color: #6c6d40;
          }
        }
      }
      .welfareGrid{
        padding-top:16px;
        float:left;
        height:329px;
        width:705px;
        border:solid 1px #dbdbdb;
      }
    }
  }
</style>
<style lang="less">
  #welfareReport{
    .welfareGrid{
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:160px!important;
      }
      .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: none;
        color: #606266;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding-left:30px;
        padding-right:30px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100%;
      }
    }
  }
</style>

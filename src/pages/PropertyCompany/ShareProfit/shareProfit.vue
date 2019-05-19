<template>
  <!--<div style="font-size:15px;line-height:35px;color:rgb(165, 170, 179);text-align:center;">
    功能正在完善，敬请期待！
  </div>-->
  <div id="shareProfit">
    <div class="top-title">
      <div class="line"></div>
      <span class="top-text">分润管理</span>
    </div>
    <div class="topPart">
      <div class="totalProfit">
        <div class="totalLogo">
        </div>
        <div class="totalText">
          收益总额(元)
        </div>
        <div class="totalNum">
          100000.00
        </div>
      </div>
      <div class="productList">
        <div class="prduct">
          <div class="productLogo zjyfLogo"></div>
          <div class="productText">
            租金月付
          </div>
          <div class="productProfit">
            ￥25000.00
          </div>
        </div>
        <div class="prduct">
          <div class="productLogo hundredFeetLogo"></div>
          <div class="productText">
            百步传
          </div>
          <div class="productProfit">
            ￥50000.00
          </div>
        </div>
        <div class="prduct">
          <div class="productLogo breakfastLogo"></div>
          <div class="productText">
            早餐颂
          </div>
          <div class="productProfit">
            ￥10000.00
          </div>
        </div>
        <div class="prduct">
          <div class="productLogo wealLogo"></div>
          <div class="productText">
            福利社
          </div>
          <div class="productProfit">
            ￥15000.00
          </div>
        </div>
      </div>
    </div>
    <div class="bottomPart">
      <div class="classifyProfit">
        <div class="dayTotal">
          <span class="totalDesc">今日收益总额(元)</span>
          <span class="totalValue">100.00</span>
        </div>
        <ul class="productProfitList">
          <li>
            <span class="title">租金月付</span>
            <span class="value">￥0.00</span>
          </li>
          <li>
            <span class="title">百步传</span>
            <span class="value">￥30.00</span>
          </li>
          <li>
            <span class="title">早餐颂</span>
            <span class="value">￥50.00</span>
          </li>
          <li>
            <span class="title">福利社</span>
            <span class="value">￥20.00</span>
          </li>
        </ul>
        <div class="dayProfitLink"><router-link :to="{path:'./dailyIncome'}">日收益查询</router-link></div>
      </div>
      <div class="profitGrid">
        <div class="nav">
          <span class="yearPick">
             <el-date-picker
               v-model="year"
               type="year"
               placeholder="选择年">
    </el-date-picker>
          </span>
          <span>
            <router-link :to="{path:'./monthlyIncome'}">月收益查询</router-link>
          </span>
        </div>
        <!--<div style="clear:both;height:1px;"></div>-->
        <div id="shareProfitGrid"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "share-profit",
    data() {
      return {
        ds: [
          {category: 1, zjyf: 3000, hundredFeet: 3000, breakfast: 1000,weal:1000, total: 8000},
          {category: 2, zjyf: 4200, hundredFeet: 4870, breakfast: 1700,weal:3000, total: 13770},
          {category: 3, zjyf: 1500, hundredFeet: 7200, breakfast: 900, weal:1350,total: 10950},
          {category: 4, zjyf: 3300, hundredFeet: 4000, breakfast: 2700,weal:1900, total: 11900},
          {category: 5, zjyf: 1720, hundredFeet: 9000, breakfast: 1200,weal:2760, total: 14680},
          {category: 6, zjyf: 2780, hundredFeet: 5500, breakfast: 900,weal:2000, total: 11180},
          {category: 7, zjyf: 4558, hundredFeet: 7200, breakfast: 800, weal:2300,total: 14858},
          {category: 8, zjyf: 3942, hundredFeet: 9230, breakfast: 800, weal:2040,total: 16012}
        ],
        option:{
          textStyle:{
            color:'#4c4c4c',
            fontWeight:'normal',
            fontSize:14
          },
          title: {
            text: '    月收益折线图',
            textStyle:{
              color:'#4c4c4c',
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['租金月付','百步传','早餐颂','福利社','当月总收益']
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
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月'],
            axisLabel: {
              color: '#2c78e4'
            },
            axisLine:{
              lineStyle:{
                color:'#eeeeee'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#2c78e4'
            },
            axisLine:{
              lineStyle:{
                color:'#eeeeee'
              }
            }
          },
          series: [
            {
              name:'租金月付',
              type:'line',
              stack: '租金月付',
              data:[3000, 4200, 1500, 3300, 1720, 2780, 4558,3942],
              itemStyle: {
                normal: {
                  color: '#2575e4'
                }
              }
            },
            {
              name:'百步传',
              type:'line',
              stack: '百步传',
              data:[3000, 4870, 7200, 4000, 9000, 5500, 7200,9230],
              itemStyle: {
                normal: {
                  color: '#fdc346'
                }
              }
            },
            {
              name:'早餐颂',
              type:'line',
              stack: '早餐颂',
              data:[1000, 1700, 900, 2700, 1200, 900, 800,800],
              itemStyle: {
                normal: {
                  color: '#1bd7a4'
                }
              }
            },
            {
              name:'福利社',
              type:'line',
              stack: '福利社',
              data:[1000, 3000, 1350, 1900, 2760, 2000, 2300,2040],
              itemStyle: {
                normal: {
                  color: '#fd7e7e'
                }
              }
            },
            {
              name:'当月总收益',
              type:'line',
              stack: '当月总收益',
              data:[8000, 13770, 10950, 11900, 14680, 11180, 14858,16012],
              itemStyle: {
                normal: {
                  color: '#c796c3'
                }
              }
            }
          ]
        },

        //画布大小
        //图标宽度
        width: 400,
        //图标高度
        height: 400,
        //画布周边的空白
        padding: {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        },
        //默认的年份
        year:'2018'
      }
    },
    methods: {
      //第一个参数为对象数组，第二个参数为需要转化的对象属性名称,
      changeObjArrayToStringArray(obj, attr) {
        let temp = [];
        for (let o in obj) {
          if (obj[o][attr]) {
            temp.push(obj[o][attr])
          }
        }

        return temp;
      },
      //柱状图
      createZZT() {
        //柱状图
        //在 制定元素中添加一个 SVG 画布
        let svg = d3.select("#shareProfit")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);


        //x轴的比例尺
        let xScale = d3.scale.ordinal()
          .domain(d3.range(this.ds.length))
          .rangeRoundBands([0, this.width - this.padding.left - this.padding.right]);

        //y轴的比例尺
        let yScale = d3.scale.linear()
          .domain([0, d3.max(this.changeObjArrayToStringArray(this.ds, 'total'))])
          .range([this.height - this.padding.top - this.padding.bottom, 0]);

        //定义x轴
        var xAxis = d3.svg.axis()
          .scale(xScale)
          /* .tickValues(this.changeObjArrayToStringArray(ds, 'category'))*/
          .orient("bottom");

        //定义y轴
        var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");

        //矩形之间的空白
        var rectPadding = 10;

        //添加矩形元素
        var rects = svg.selectAll(".MyRect")
          .data(this.changeObjArrayToStringArray(this.ds, 'passer'))
          .enter()
          .append("rect")
          .attr("class", "MyRect")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .attr("x", function (d, i) {
            return xScale(i) + rectPadding / 2;
          })
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("width", (xScale.rangeBand() - rectPadding) / 4)
          .attr("height", (d) => {
            return this.height - this.padding.top - this.padding.bottom - yScale(d);
          });
        //添加矩形元素
        var rects = svg.selectAll(".MyRect1")
          .data(this.changeObjArrayToStringArray(this.ds, 'zjyf'))
          .enter()
          .append("rect")
          .attr("class", "MyRect1")
          .attr("fill", "red")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .attr("x", (d, i) => {
            return xScale(i) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 4
          })
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("width", (xScale.rangeBand() - rectPadding) / 4)
          .attr("height", (d) => {
            return this.height - this.padding.top - this.padding.bottom - yScale(d);
          });
        //添加矩形元素
        var rects = svg.selectAll(".MyRect2")
          .data(this.changeObjArrayToStringArray(this.ds, 'breakfast'))
          .enter()
          .append("rect")
          .attr("class", "MyRect2")
          .attr("fill", "green")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .attr("x", (d, i) => {
            return xScale(i) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 2
          })
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("width", (xScale.rangeBand() - rectPadding) / 4)
          .attr("height", (d) => {
            return this.height - this.padding.top - this.padding.bottom - yScale(d);
          });
        //添加矩形元素
        var rects = svg.selectAll(".MyRect3")
          .data(this.changeObjArrayToStringArray(this.ds, 'total'))
          .enter()
          .append("rect")
          .attr("class", "MyRect3")
          .attr("fill", "orange")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .attr("x", (d, i) => {
            return xScale(i) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 4 * 3
          })
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("width", (xScale.rangeBand() - rectPadding) / 4)
          .attr("height", (d) => {
            return this.height - this.padding.top - this.padding.bottom - yScale(d);
          });

        //添加文字元素
        var texts = svg.selectAll(".MyText")
          .data(this.changeObjArrayToStringArray(this.ds, 'amount'))
          .enter()
          .append("text")
          .attr("class", "MyText")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .attr("x", function (d, i) {
            return xScale(i) + rectPadding / 2;
          })
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("dx", function () {
            return (xScale.rangeBand() - rectPadding) / 2;
          })
          .attr("dy", function (d) {
            return 20;
          })
          .text(function (d) {
            return d;
          });

        //添加x轴
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + this.padding.left + "," + (this.height - this.padding.bottom) + ")")
          .call(xAxis);

        //添加y轴
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
          .call(yAxis);
      },
      //折线图
      createZXT() {
        //折线图
        let vis = d3.select("#shareProfitGrid").append('svg').attr("width", 650)
          .attr("height", 350);
        let WIDTH = 650;
        let HEIGHT = 350;
        let MARGINS = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 50
        };
        //x轴的比例尺
        let xScale = d3.scale.ordinal()
          .domain(d3.range(this.ds.length))
          .rangeRoundBands([0, WIDTH - MARGINS.left - MARGINS.right]);

        //y轴的比例尺
        let yScale = d3.scale.linear()
          .domain([0, d3.max(this.changeObjArrayToStringArray(this.ds, 'total'))])
          .range([HEIGHT - MARGINS.top - MARGINS.bottom, 0]);

        /*let xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1,7]);
        let yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,360]);*/
        let xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        let yAxis = d3.svg.axis().scale(yScale).orient("left");
        vis.append("svg:g")
          .attr("class", "axis")
          .attr("transform", "translate(" + MARGINS.left + "," + (HEIGHT - MARGINS.bottom) + ")")
          .call(xAxis);
        vis.append("svg:g")
          .attr("class", "axis")
          .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
          .call(yAxis);
        let lineGen = d3.svg.line()
          .x(function (d) {
            return xScale(d.category);
          })
          .y(function (d) {
            return yScale(d.zjyf);
          });
        let lineGen1 = d3.svg.line()
          .x(function (d) {
            return xScale(d.category);
          })
          .y(function (d) {
            return yScale(d.hundredFeet);
          });
        let lineGen2 = d3.svg.line()
          .x(function (d) {
            return xScale(d.category);
          })
          .y(function (d) {
            return yScale(d.breakfast);
          });
        let lineGen3 = d3.svg.line()
          .x(function (d) {
            return xScale(d.category);
          })
          .y(function (d) {
            return yScale(d.weal);
          });
        let lineGen4 = d3.svg.line()
          .x(function (d) {
            return xScale(d.category);
          })
          .y(function (d) {
            return yScale(d.total);
          });


        vis.append('svg:path')
          .attr('d', lineGen(this.ds))
          .attr('stroke', '#fdc346')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        vis.append('svg:path')
          .attr('d', lineGen1(this.ds))
          .attr('stroke', '#1bd7a4')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        vis.append('svg:path')
          .attr('d', lineGen2(this.ds))
          .attr('stroke', '#fd7e7e')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        vis.append('svg:path')
          .attr('d', lineGen3(this.ds))
          .attr('stroke', '#c796c3')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        vis.append('svg:path')
          .attr('d', lineGen4(this.ds))
          .attr('stroke', '#c796c3')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        //给SVG添加分组，并设置样式类，样式见<style>标签中的设置
        var grid = vis.selectAll(".grid")
          .data(xScale.ticks(this.ds.length))
          .enter().append("g")
          .attr("class", "grid");
        //(5) 添加线条，设置起始坐标(x1,y1)和结束坐标(x2,y2)的值即可
        //竖线
/*        grid.append("line")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", p)
          .attr("y2", h - p - 1);*/

        //横线
        grid.append("line")
          .attr("y1", yScale)
          .attr("y2", yScale)
          .attr("x1", MARGINS.left)
          .attr("x2", WIDTH - MARGINS.left - MARGINS.right);

      },
      //动画效果柱状图
      createZZTwithAnimate() {
        //定义数据
        var ds = [
          {category: "一月", amount: 20},
          {category: "二月", amount: 90},
          {category: "三月", amount: 50},
          {category: "四月", amount: 33},
          {category: "五月", amount: 172},
          {category: "六月", amount: 20},
          {category: "七月", amount: 120},
          {category: "八月", amount: 180}
        ];


        //随机的amount属性用于模拟动态变化的数据
        ds = ds.map(function (d) {
          return {
            category: d.category,
            amount: Math.floor(Math.random() * (Math.random() * 100 + 100))
          };
        });
        //使用enter()及append()可视化元素，追加元素总是使用经enter()初始化过的selection[s]
        var enter = d3.selectAll("#visualisation").data([ds]).enter().append("#visualisation").attr({
          width: w,
          height: h
        });

        //选取被可视化后的元素（非追加元素的操作使用）
        var svg = d3.select("#visualisation");

        //category作为自变量(横轴)
        var xd = ds.map(function (d) {
          return d.category;
        });
        //amount作为因变量(纵轴)
        var yd = ds.map(function (d) {
          return d.amount;
        });

        //自变量映射定义（category到画布的映射），用于横轴，其中参数0.5可实现category宽度与category间距呈1:1的映射
        //真实画布为去掉左、右内补，也就是映射到[padding.left, w - padding.right]区间
        var x = d3.scale.ordinal().domain(xd).rangeBands([padding.left, w - padding.right], 0.5);
        //因变量映射定义（amount到画布的映射），用于纵轴
        //真实画布为去掉上、下内补，映射到[padding.top，h - padding.bottom]，为了与常用笛卡尔坐标系统一，最终映射到[h - padding.bottom, padding.top]
        var y = d3.scale.linear().domain([0, d3.max(yd, function (d) {
          return d;
        })])
          .range([h - padding.bottom, padding.top]);

        //定义横轴
        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        //定义纵轴
        var yAxis = d3.svg.axis().scale(y).orient("left");
        //取得自变量映射后每个category对应的宽度，用于定义bar的宽度
        var band = x.rangeBand();
        //取得自变量映射后每个category在真实画布上的X值，用于定位bar的位置
        var ranges = x.range();
        //!******以下开始可视化矩形(bar)******!/
        //正如前面据说，为了实现数据驱动的可视化，元素追加必须要在enter()之后
        //初始化bar宽度为0
        var rects = svg.selectAll("rect").data(yd);
        rects.enter().append("rect").attr("x", function (d, i) {
          return ranges[i];
        }).attr("y", function (d) {
          return y(d);
        }).attr("width", 0).attr("height", function (d) {
          return h - y(d) - padding.bottom;
        }).attr("fill", "#4682b4");
        //简单的动画效果，宽度置为band
        rects.transition().duration(500).attr("x", function (d, i) {
          return ranges[i];
        }).attr("y", function (d) {
          return y(d);
        }).attr("width", band).attr("height", function (d) {
          return h - y(d) - padding.bottom;
        }).attr("fill", "#4682b4").style("opacity", 0.75);
        //如果用于可视化的数据长度变化，使用exit()取得退出可视化的元素并使用remove方法将其移除
        rects.exit().transition()
          .duration(500)
          .style('opacity', 0)
          .remove();


        //!******以下开始绘制坐标轴******!//
        //!******新元素的绘制总是使用经enter()初始化过的selection[s]
        //绘制两条直接与坐标轴复合（当放大或缩小浏览器窗口时，不知道何原因原生坐标轴的path可能会消失）
        enter.append("line").attr({
          "x1": padding.left,
          "y1": padding.top,
          "x2": padding.left,
          "y2": h - padding.bottom
        }).classed("referline", true);

        enter.append("line").attr({
          "x1": padding.left,
          "y1": h - padding.bottom,
          "x2": w - padding.right,
          "y2": h - padding.bottom
        }).classed("referline", true);

        //绘制横轴，纵向移动 h - padding.bottom
        enter.append("g").attr("class", "x axis")
          .attr("transform", "translate(0," + (h - padding.bottom) + ")");
        //绘制纵轴，横向移动 padding.left，并绘制文本信息
        enter.append("g").attr("class", "y axis")
          .attr("transform", "translate(" + padding.left + ",0)")
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 16)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("amount (t)");
        ;
        //实现坐标轴的简单动画效果，执行非元素追加操作（此处是元素选取）使用已被初始化后的元素
        svg.select('.x.axis').transition().duration(500).call(xAxis);
        svg.select('.y.axis').transition().duration(500).call(yAxis);
      }
    },
    mounted() {
      /*
      * D3折线图部分*/
      //柱状图
      //this.createZZT();
      //折线图
      //this.createZXT();
      //console.log(this.$router)
      /*
      * echarts图表部分
      * */
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('shareProfitGrid'));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
  }
</script>

<style lang="less" scoped>
  #shareProfit{
    padding-top:30px;
    .topPart{
      width:1038px;
      height:222px;
      border:solid 1px #eeeeee;
      border-top-width:5px;
      .totalProfit{
        float:left;
        width:296px;
        height:195px;
        margin-top:14px;
        border-right:solid #eeeeee 1px;
        .totalLogo{
          height:54px;
          width:54px;
          margin-left:auto;
          margin-right:auto;
          background-image: url("../../../assets/img/passenger/total_profit_icon.png");
          background-repeat: no-repeat;
          margin-top:25px;
        }
        .totalText{
          height:16px;
          line-height:16px;
          font-size:16px;
          font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          color:#1168e1;
          text-align:center;
          margin-top:34px;
        }
        .totalNum{
          height:30px;
          line-height:30px;
          font-size:30px;
          font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          font-weight:bold;
          color:#1168e1;
          text-align:center;
          margin-top:24px;
        }
      }
      .productList{
        float:left;
        .prduct{
          width:185px;
          float:left;
          margin-top:35px;
          .productLogo{
            height:90px;
            width:90px;
            margin-left:auto;
            margin-right:auto;
            /*background-color:red;*/
          }
          .productText{
            height:16px;
            line-height:16px;
            font-size:16px;
            color:#606266;
            font-weight:bold;
            text-align:center;
            margin-top:15px;
          }
          .productProfit{
            height:14px;
            line-height:14px;
            font-size:14px;
            color:#606266;
            text-align:center;
            margin-top:21px;
            text-indent:-5px;
          }
          .zjyfLogo{
            background-image: url("../../../assets/img/passenger/zjyf_logo.png");
            background-repeat: no-repeat;
          }
          .hundredFeetLogo{
            background-image: url("../../../assets/img/passenger/hundredFeet.png");
            background-repeat: no-repeat;
          }
          .breakfastLogo{
            background-image: url("../../../assets/img/passenger/breakfast.png");
            background-repeat: no-repeat;
          }
          .wealLogo{
            background-image: url("../../../assets/img/passenger/weal_club.png");
            background-repeat: no-repeat;
          }
        }
      }
    }
    .bottomPart{
      width:1040px;
      height:396px;
      position:relative;
      top:17px;
      .classifyProfit{
        float:left;
        width:298px;
        height:394px;
        border:solid 1px #eeeeee;
        font-size:14px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color:#606626;
        background-image: url("../../../assets/img/passenger/day_profit_bg.png");
        background-repeat: no-repeat;
        .dayTotal{
          height:24px;
          line-height:24px;
          margin-top:35px;
          text-align:left;
          text-indent:12px;
          .totalDesc{
            height:24px;
            line-height:24px;
            display:inline-block;
            float:left;
          }
          .totalValue{
            font-size:24px;
            font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            color:#1168e1;
            font-weight:bold;
            margin-left:11px;
          }
        }
        .productProfitList{
          padding-left:13px;
          padding-right:13px;
          margin-top:20px;
          li{
            height:61px;
            line-height:61px;
            border-bottom:solid 1px #eeeeee;
            .value{
              float:right;
            }
          }
          li:last-child{
            border-bottom:none;
          }
        }
        .dayProfitLink{
          text-indent:13px;
          a{
            color:#1168e1;
            text-decoration:underline;
          }
        }
      }
      .profitGrid{
        float:left;
        width:720px;
        height:379px;
        border:solid 1px #eeeeee;
        position:relative;
        left:18px;
        padding-top:10px;
        padding-bottom:5px;
        .nav{
          height:40px;
          line-height:40px;
          font-size:14px;
          font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          .yearPick{
            display: inline-block;
            padding-left:17px;
            width:100px;
          }
          a{
            color:#1168e1;
            text-decoration:underline;
            padding-right:17px;
            float:right;
          }
        }
        #shareProfitGrid{
          height:329px;
        }
      }
    }
  }
</style>
<style lang="less">
  .axis path,
  .axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
  }

  .axis text {
    font-family: sans-serif;
    font-size: 11px;
  }

  .MyRect {
    fill: steelblue;
  }

  .MyText {
    fill: white;
    text-anchor: middle;
  }
  #shareProfit{
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
</style>

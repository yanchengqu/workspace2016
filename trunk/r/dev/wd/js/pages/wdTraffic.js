/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function(window, $, undefined) {

	// 构造可视化数据： 
	
	var chart  = window['pageConfig'] &&window['pageConfig']['pvData'],
		chart1 = window['pageConfig'] &&window['pageConfig']['sourceData'];

	function formatPvData() {
		var tmp = {};
		tmp['labels'] = [];
		tmp['data'] = [];
		
		if ( chart.length > 0 ) {
			for ( var i=0, len = chart.length; i < len;  i ++ ) {
				tmp['labels'].push(chart[i]['dimTime']);
				tmp['data'].push(chart[i]['pv']);
			}
		}
		return tmp;
	}

	function formatShareData() {
		var tmp = [];
		if ( chart1.length > 0 ) {
			for ( var i=0, len = chart1.length; i < len;  i ++ ) {
				tmp.push({
					label: chart1[i]['source_name'],
					value: chart1[i]['countNum']
				});
			}
		}
		return tmp;
	}

	chart = formatPvData();
	
	var lineChartData = {
		labels : chart ? chart['labels'] : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				label: "revenue",
				fillColor : "rgba(55,191,255,0.2)",
				strokeColor : "rgba(55,191,255,1)",
				pointColor : "rgba(255,255,255,1)",
				pointStrokeColor : "#37bfff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(151,187,205,1)",
				data : chart ? chart['data'] : [1000, 1300, 800, 1200,1500, 2000, 1000]
			}
		]

	};
	
	var doughnutData = [
				{
					value: 1,
					color:"#ea5762",
					label: "新浪微博"
				},
				{
					value: 2,
					color: "#62ce5a",
					label: "微信好友"
				},
				{
					value: 3,
					color: "#68e2be",
					label: "微信朋友圈"
				},
				{
					value: 4,
					color: "#f7bb36",
					label: "QQ空间"
				},
				{
					value: 12,
					color: "#5ec2f3",
					label: "QQ好友"
				}

			];

	
	doughnutData = formatShareData();

	// 数据可视化

	$(function(){

		var ctx = document.getElementById("canvas").getContext("2d"),
			ctx1 =  document.getElementById("canvas1").getContext("2d");

		window.myLine = new Chart(ctx).Line(lineChartData, {
			scaleGridLineColor : "rgb(255,255,255)",
			scaleShowHorizontalLines: false,
			bezierCurve : false,
			responsive: true
		});
		
		window.myDoughnut = new Chart(ctx1).Doughnut(doughnutData, {
			// responsive : true
			// animation: false,
			onAnimationComplete: function() {
				$(this.generateLegend()).appendTo('.doughnut')
			},
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%>:<%=segments[i].value%><%}%></li><%}%></ul>"
			
		});

	});

}(this, this.Zepto);

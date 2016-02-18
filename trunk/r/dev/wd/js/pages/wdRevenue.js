/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function(window, $, undefined) {


	// 构造可视化数据： 
	
	var chart = window['pageConfig'] &&window['pageConfig']['chart'];
	
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


	// 数据可视化

	$(function(){

		var ctx = document.getElementById("canvas").getContext("2d");

		window.myLine = new Chart(ctx).Line(lineChartData, {
			scaleGridLineColor : "rgb(255,255,255)",
			scaleShowHorizontalLines: false,
			bezierCurve : false,
			responsive: true
		});


	});

}(this, this.Zepto);

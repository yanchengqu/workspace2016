! function (window, $,undefined) {
	
	var Page = {
		hideBar : function () {			
				setTimeout(function(){ window.scrollTo(0, 1); }, 100);				
		},
		bootSwiper: function () {
			var slideSwiper = new Swiper('#J_homeSwiper',{
				pagination: '.pagination',
				loop: true,
				autoplay:4000,
				grabCursor: true,
				paginationClickable: true,
				calculateHeight: true,
			  });
		},		
		init: function () {
			this.hideBar();
			this.bootSwiper();
		}
	};
	
	$(function () {		
		Page.init();
	});
}(this, $)

!function(){ 

	/*
    var START = "ontouchstart" in window ? "touchstart" : "mousedown",
    	MOVE  = "ontouchstart" in window ? "touchmove" : "mousemove",
		END  =  "ontouchstart" in window ? "touchmend" : "mouseup";

    var isT = false;
    var isInMove = false;
    var container = $('.container');

    container.on(START,function(e){ 
    	isT = true;
    	window.isloadImg = false;
    });

    container.on(MOVE,function(){ 
    	if(!isT) return;
    	isInMove = true;
    });

    container.on(END,function(){ 
    	isT = false;
    	isInMove=false;
    });
	*/

	var loadingEl = $('.viewMoreloading');

	function applyTemplate(data,templateId,el){ 
		var scriptTemplate = document.getElementById(templateId).innerHTML,
			compiled = _.template(scriptTemplate),
			html = compiled(data);
		$(html).insertBefore(el);
	}

	var data = JSON.parse($('#homeData').val());
	var data_main_bottom = data.data_main_bottom;
	var process_main_bottom = data.process_main_bottom;
	if(data_main_bottom && process_main_bottom && data_main_bottom.length){
		showPictures(data_main_bottom);
	}

	function showPictures(data){ 
		var count = data.length,
    		imgIndex = 0,
    		showSize = 2;

		
		//window.isloadImg = false;
	    var body = document.body,html = document.documentElement,isOK = true;
		window.onscroll=function(){
			if(!isOK) return;
			loadingEl.hide();
			isOK=false;
			var a = Math.max(body.clientHeight,html.clientHeight),
				b = Math.max(body.scrollTop,html.scrollTop),
				c = Math.max(body.scrollHeight,html.scrollHeight);
			if(a+b>=c-200){
			//if(a+b>=c-200 && isInMove && !window.isloadImg && imgIndex<count){
				//window.isloadImg = true;
				loadingEl.show();
				var mdata = data.slice(imgIndex,imgIndex+showSize);
				applyTemplate({ 
					'data_main_bottom':mdata,
					'process_main_bottom':process_main_bottom
				},'dataMainRepeateTemplate',loadingEl);
				imgIndex+=showSize;
				updatePrice('.showPricelb');
			}
			if(imgIndex>=count){ 
				loadingEl.hide();
			}
			isOK=true;
		}
	}

	//当刷新时在页面下方，主动触发加载
	//window.onscroll();

  
  	function resetPrice(price){ 
		var sum = parseFloat(price),
			tailPrice = sum.toFixed(2).split('.')[1],
			priceSumStrOrg = parseInt(sum).toString(),
			priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return '&yen;'+priceSumStr+'.'+tailPrice;
	}
	
	function updatePrice(selector){ 
		var elements = document.querySelectorAll(selector);
		for(var i=0,l=elements.length;i<l;i++){ 
			var el = elements[i];
			var value = el.getAttribute('data-value');
			if(value){ 
				var priceSumStr = resetPrice(value);
				el.innerHTML = priceSumStr;
			}
		}
	}

	updatePrice('.showPricelb');

}();

!function(){ 
	var clickEvent = "ontouchstart" in window ? "touchstart" : "click",
		detBox = { 
			H2 : $('#details-box h2'),
			btn: $('#details-box .btn'),
			moreBtn : $('.viewMore'),
			replyBtn : $('.reply'),
			rebackBtn : $('.rebackBtn'),
			summarybox : $('.summary-box')
		}
		detBox.H2.on(clickEvent,function(evt){ //统帅冰箱标题
        	evt.preventDefault();
        	evt.stopPropagation();
        	var pNode = $(this).parent();
        	if(pNode.is('.active')){ 
        		pNode.toggleClass('noactive');
        		pNode.toggleClass('active');
    			setTimeout(function(){ 
    				detBox.H2.next().hide();	
    			},600);
        	}
        	else{
            	detBox.H2.next().show();
            	pNode.toggleClass('active');
            	if(pNode.is('.noactive')){ 
            		pNode.toggleClass('noactive');
            	}
            }
        });

		detBox.btn.on(clickEvent,function(evt){ //我要购买
        	//evt.preventDefault();
        	evt.stopPropagation();
        });

/*
        var START = "ontouchstart" in window ? "touchstart" : "mousedown",
        	MOVE  = "ontouchstart" in window ? "touchmove" : "mousemove",
			END  =  "ontouchstart" in window ? "touchmend" : "mouseup";

        var isT = false;
        var isInMove = false;
        detBox.summarybox.on(START,function(e){ 
        	isT = true;
        	window.isloadImg = false;
        });

        detBox.summarybox.on(MOVE,function(){ 
        	if(!isT) return;
        	isInMove = true;
        });

        detBox.summarybox.on(END,function(){ 
        	isT = false;
        	isInMove=false;
        });
*/

    function queryPageImages(callback){ 
    	var id = $('#productId').val();
    	var mdata = {'productId':id};
    	$.ajax({ 
    		url:'/mobile/product/detail.html',
    		type:'get',
    		data: mdata,
    		dataType:'json',
    		success:function(data){
    			data && data.data && data.data.length && callback && callback(data.data);	 
                updatePrice('.showPricelb');
    		}
    	});
    }

    queryPageImages(function(data){ 
    	var count = data.length,
    		imgIndex = 0,
    		showSize = 2;
    
    	var loadingEl = $('.viewMoreloading');

    	function showImages(){ 
    		var mdata = data.slice(imgIndex,imgIndex+showSize);
    		var fragment = document.createDocumentFragment();
    		for(var i=0,l=mdata.length;i<l;i++){ 
    			var item = mdata[i];
    			fragment.appendChild($(item)[0]);
    		}
    		$(fragment).insertBefore(loadingEl);
    	}

	    var body = document.body,html = document.documentElement,isOK = true;
		window.onscroll=function(){
			if(!isOK) return;
			var a = Math.max(body.clientHeight,html.clientHeight),
				b = Math.max(body.scrollTop,html.scrollTop),
				c = Math.max(body.scrollHeight,html.scrollHeight);
            if(a+b>=c){
                loadingEl.show();
			//if(a+b>=c-200 && isInMove && !window.isloadImg && imgIndex<count){
				//window.isloadImg = true;
				showImages();
				imgIndex+=showSize;
			}
			if(imgIndex>=count){ 
				loadingEl.hide();
			}
		}	
    });

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

	updatePrice('.showPricelb,.shorPricelb');

}();


HTMLElement.prototype.appendHTML = function(html) {
    var divTemp = document.createElement("div"), nodes = null
        // 文档片段，一次性append，提高性能
        , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    // 据说下面这样子世界会更清净
    nodes = null;
    fragment = null;
}

!function(){ 
	var container = document.querySelector('.container');
	if(!container) return;

	var ajaxUrl = { 
		orderQuery:{ 
			url:'/mobile/order/orderListJson.html',
			type:'get'
		}
	};

	var pageIndex = 0;
	var pageSize =2;

	var orderCount = parseInt($('#orderCount').val() || 0);

	//支付订单点击事件
	function paymentOrder(url) {
		//window.location.href = "/mobile/alipay/pay.html?orderSn="+orderSn;
		window.location.href = url;
	}

	//追踪订单点击事件
	function trackOrder(orderSn) {
		window.location.href = "/mobile/order/orderProduct.html?orderSn="+orderSn;
	}

	//取消订单点击事件
	function cancelOrderConfirm(orderSn) {
		$.ajax({
			type : "GET",
			url : "/mobile/order/cancelOrder.html",
			dataType : "json",
			data: {
				orderSn : orderSn
			},
		    cache:false,
			success : function(data) {
				if(data.success == true) {
					layer.open({
					    content: '取消订单成功',
					    btn: ['确认'],
					    yes: function(){
					    	window.location.href = "/mobile/order/orderList.html";
					    }
					});
				}else{
					layer.open({
					    content: data.message,
					    btn: ['确认']
					});
				}
			}
		});
	}

	function cancelOrder(orderSn){ 
		layer.open({
		    content: '是否取消订单【'+orderSn+'】',
		    btn: ['确认', '取消'],
		    shadeClose: false,
		    yes: function(){
		        cancelOrderConfirm(orderSn);
		    }, no: function(){
		        
		    }
		});
	}

	EventObj.tapClick(function(dom,e){ 
		var $target = $(e.target),
		 	$order = $target.closest('.order'),
		 	orderId = $order.attr('orderId'),
		 	payUrl = $order.attr('payUrl');

		if(!$target.is('.btn.btn-line')) return;
		if($target.is('.paymentOrderBtn')) { 
			paymentOrder(payUrl);
			return;
		}
		if($target.is('.trackOrderBtn')) { 
			trackOrder(orderId);
			return;
		}
		if($target.is('.cancelOrderBtn')) { 
			cancelOrder(orderId);
			return;
		}
	},container)


	function queryOrderData(reData,callback){ 
		$.ajax({ 
			url:ajaxUrl.orderQuery.url,
			type:ajaxUrl.orderQuery.type,
			dataType:'json',
			data:reData,
			success:function(data){ 
				if(!data.success) return;
				callback && callback(data);
			},
			error:function(info){
				console.log(info); 
			}
		});
	}

	function applyTemplate(data,templateId,el){ 
		var scriptTemplate = document.getElementById(templateId).innerHTML,
			compiled = _.template(scriptTemplate),
			html = compiled(data);
		el.appendHTML(html);
	} 
	
	var body = document.body, html = document.documentElement;

	var isOK = true;
	window.onscroll=function(){
		if(!isOK) return;
		var a = Math.max(body.clientHeight,html.clientHeight),
			b = Math.max(body.scrollTop,html.scrollTop),
			c = Math.max(body.scrollHeight,html.scrollHeight);
		if(a+b==c){
			var currentCount = $('.container .order').length;
			if(currentCount<orderCount){ 
				var data = {'pageSize':pageSize,'pageIndex':pageIndex+1};
				queryOrderData(data,function(data){
					 applyTemplate(data,'order_list_template',container);
					 isOK = true;
					 pageIndex++;
				});
			}
		}
	}

	window.onscroll();


	function resetPrice(price){ 
		var sum = parseFloat(price),
			tailPrice = sum.toFixed(2).split('.')[1],
			priceSumStrOrg = parseInt(sum).toString(),
			priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return '&yen;'+priceSumStr+'.'+tailPrice;
	}

	window.resetPrice=resetPrice;

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
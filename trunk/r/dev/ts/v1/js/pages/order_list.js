!function(win){ 

	var ajaxUrl = { 
		orderQuery:{ 
			url:'/pc/order/orderListJson.html',
			type:'get'
		}
	};

	var pageSize = 10;
	var orderPageCount = Number($('#orderCount').val() || 0);
	if(orderPageCount>=1){
		var paging = new Paging({ 
			containerId:'pagination',
			//总页数
			pageCount:orderPageCount,
			//显示页数
			showItemCount:5,
			//头数量
			headCount:1,
			//当前页数（初使化页数）
			currentPage:0,

			pageUrl:ajaxUrl.orderQuery.url,
			//pageUrl:'data.json',
			//分页数据请求方式
			requestType:ajaxUrl.orderQuery.type,
			//分页数据参数
			requestParam:{'pageSize':pageSize},
			//pageIndex名称
			requestPageIndexName:'pageIndex',
			//处理数据
			resetData:function(data){ 
				if(data.success && data.data){ 
					return {'data':data.data};
				}
			},
			//-----------模样相关参数---------
			itemTemplateId:'orderListScriptTemplate',
			itemContainerId:'rptContainer'
		});
	}

}(window);



//支付订单点击事件
function paymentOrder(url) {
	//window.location.href = "/pc/alipay/pay.html?orderSn="+orderSn;
	window.location.href = url;
}

//追踪订单点击事件
function trackOrder(orderSn) {
	window.location.href = "/pc/order/orderProduct.html?orderSn="+orderSn;
}

//取消订单点击事件
function cancelOrderConfirm(orderSn) {
	$.ajax({
		type : "GET",
		url : "/pc/order/cancelOrder.html",
		dataType : "json",
		data: {
			orderSn : orderSn
		},
	    cache:false,
		success : function(data) {
			if(data.success == true) {
				/*
				layer.open({
				    content: '取消订单成功',
				    btn: ['确认'],
				    yes: function(){
				    	window.location.href = "/pc/order/orderList.html";
				    }
				});
				*/
				if(window.confirm('取消订单成功')){ 
					window.location.href = "/pc/order/orderList.html";
				}
			}else{
				/*
				layer.open({
				    content: data.message,
				    btn: ['确认']
				});
				*/
				alert(data.message);
			}
		}
	});
}

function cancelOrder(orderSn){ 
	/*
	layer.open({
	    content: '是否取消订单【'+orderSn+'】',
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(){
	        cancelOrderConfirm(orderSn);
	    }, no: function(){
	        
	    }
	});
	*/
	if(window.isToLogin){ 
		var islogin = window.isToLogin();
		if(!islogin) return;

		}else {
			return;
	}

	if(window.confirm('是否取消订单【'+orderSn+'】')){ 
		cancelOrderConfirm(orderSn);
	}
}

function deleteOrderConfirm(orderSn){ 
	$.ajax({
		type : "GET",
		url : "/pc/order/deleteOrder.html",
		dataType : "json",
		data: {
			orderSn : orderSn
		},
	    cache:false,
		success : function(data) {
			if(data.success == true) {
				/*
				layer.open({
				    content: '删除订单成功',
				    btn: ['确认'],
				    yes: function(){
				    	window.location.href = "/pc/order/orderList.html";
				    }
				});
				*/
				alert('删除订单成功');
				window.location.href = "/pc/order/orderList.html";
			}else{
				/*
				layer.open({
				    content: data.message,
				    btn: ['确认']
				});
				*/
				alert(data.message);
			}
		}
	});
}

function deleteOrder(orderSn){ 
	/*
	layer.open({
	    content: '是否删除订单【'+orderSn+'】',
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(){
	        deleteOrderConfirm(orderSn);
	    }, no: function(){
	        
	    }
	});	
	*/
	if(window.isToLogin){ 
		var islogin = window.isToLogin();
		if(!islogin) return;

		}else {
			return;
	}
	if(window.confirm('是否删除订单【'+orderSn+'】')){ 
		
		deleteOrderConfirm(orderSn);
	}
}